import React, { useState, useEffect, useMemo } from "react";
import { features } from "@/data/features";
import "react-toastify/dist/ReactToastify.css";
import { ethers } from "ethers";
import { DatePicker } from "@nextui-org/react";
import ModalHelper from "@/components/ui/modals/Helper";
import AdSubmission from "@/components/features/token/accordion/AdSubmission";
import Input from "@/components/ui/Input";
import { Address, ContractOptions, getContract, prepareContractCall, readContract } from "thirdweb";
import config from "@/config/config";
import { Currency } from "@/components/layout/CreateOffer";
import { getLocalTimeZone, today, parseDate, parseAbsoluteToLocal } from "@internationalized/date";

import { useActiveAccount, useReadContract, useSendAndConfirmTransaction } from "thirdweb/react";
import { client } from "@/data/services/client";
import { ChainObject, ChainsConfig } from "@/types/chain";
import { ERC20ABI } from "@/abi/ERC20";

const CreateListing = ({
  chainConfig,
  handleListingModal,
  offerData,
  setSuccessFullListing,
  successFullListing,
  royalties,
  dsponsorNFTContract,
  dsponsorMpContract,
  tokenId,
  setListingCreated,
  fetchOffers
}: {
  chainConfig: ChainObject;
  handleListingModal: () => void;
  offerData: any;
  setSuccessFullListing: any;
  successFullListing: any;
  royalties: any;
  dsponsorNFTContract: ContractOptions;
  dsponsorMpContract: ContractOptions;
  tokenId: any;
  setListingCreated: any;
  fetchOffers: any;
}) => {
  const chainId = chainConfig?.chainId;

  const initialCurrencies = useMemo(
    () => config[chainId as number]?.smartContracts?.currencies || {},
    [chainId]
  ) as { [key: string]: Currency };

  const currencies = Object?.entries(initialCurrencies)
    ?.map((currency) => {
      if (!features?.canAcceptNativeTokens && currency[0] === "NATIVE") {
        return null;
      }

      return currency?.[1];
    })
    ?.filter((currency) => currency !== null);

  const [selectedListingType, setSelectedListingType] = useState<any[]>([]);
  const [selectedUnitPrice, setSelectedUnitPrice] = useState<number>(0);
  const [selectedStartingPrice, setSelectedStartingPrice] = useState<number>(0);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[0]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() + 7))
  );
  const [errors, setErrors] = useState<any>({});
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
  const [validate, setValidate] = useState<boolean>(false);
  const [isCustomEnabled, setIsCustomEnabled] = useState<boolean>(false);

  const wallet = useActiveAccount();
  const address = wallet?.address;

  const relayerURL = chainConfig?.relayerURL;

  const [customContract, setCustomContract] = useState<Address | null>(null);
  const [tokenContract, setTokenContract] = useState<string>("");
  const [customTokenContract, setCustomTokenContract] = useState<any | null>(null);
  const [selectedCurrencyContract, setSelectedCurrencyContract] = useState<Address | string>(
    currencies[0].address
  );
  //   const { contract: tokenContractAsync } = useContract(selectedCurrencyContract, ERC20ABI);

  const tokenContractAsync = getContract({
    client: client,
    address: selectedCurrencyContract,
    chain: chainConfig?.chainObject,
    abi: ERC20ABI
  });

  //   const { data: symbolContractAsync } = useContractRead(tokenContractAsync, "symbol");
  const { data: symbolContractAsync } = useReadContract({
    contract: tokenContractAsync,
    method: "symbol"
  });

  //   const { data: decimalsContractAsync } = useContractRead(tokenContractAsync, "decimals");
  const { data: decimalsContractAsync } = useReadContract({
    contract: tokenContractAsync,
    method: "decimals"
  });

  const [approvalForAllToken, setApprovalForAllToken] = useState(false);
  const [currencySymbol, setCurrencySymbol] = useState<string | null>(currencies[0].symbol);
  const [currencyDecimals, setCurrencyDecimals] = useState<number | null>(currencies[0].decimals);

  //   const { mutateAsync: setApprovalForAll } = useContractWrite(
  //     dsponsorNFTContract,
  //     "setApprovalForAll"
  //   );
  const { mutateAsync: setApprovalForAll } = useSendAndConfirmTransaction();

  //   const { mutateAsync: createListing } = useContractWrite(dsponsorMpContract, "createListing");
  const { mutateAsync: createListing } = useSendAndConfirmTransaction();

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleListingModal();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [handleListingModal]);

  useEffect(() => {
    const currencies = Object.entries(
      config[chainId as number]?.smartContracts?.currencies || {}
    ) as any;

    const [, { symbol, decimals }] = currencies.find(
      ([, value]) => value?.address?.toLowerCase() === selectedCurrencyContract?.toLowerCase()
    ) ?? ["", {}];

    if (symbol && decimals) {
      setCurrencySymbol(symbol);
      setCurrencyDecimals(decimals);
    } else {
      if (symbolContractAsync) {
        setCurrencySymbol(symbolContractAsync);
      } else {
        setCurrencySymbol(null);
      }

      if (decimalsContractAsync) {
        setCurrencyDecimals(decimalsContractAsync);
      } else {
        setCurrencyDecimals(null);
      }
    }
  }, [chainId, selectedCurrencyContract, symbolContractAsync, decimalsContractAsync]);

  useEffect(() => {
    setTokenContract(selectedCurrencyContract as string);
    setCustomTokenContract(tokenContractAsync);
  }, [
    decimalsContractAsync,
    symbolContractAsync,
    selectedCurrencyContract,
    tokenContractAsync,
    chainConfig,
    setTokenContract,
    setCustomTokenContract
  ]);

  useEffect(() => {
    // update start date every seconds to avoid the user to set a start date in the past
    const interval = setInterval(() => {
      if (startDate < new Date()) {
        setStartDate(new Date());
      }

      if (endDate < new Date()) {
        setEndDate(new Date());
      }

      return () => clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate, endDate]);

  const handlePreviewModal = async () => {
    // const isApprovedForAll = await dsponsorNFTContract.call("isApprovedForAll", [
    //   address,
    //   chainConfig?.smartContracts?.DSPONSORMP?.address
    // ]);
    const isApprovedForAll = await readContract({
      contract: dsponsorNFTContract,
      // @ts-ignore
      method: "isApprovedForAll",
      args: [address, chainConfig?.smartContracts?.DSPONSORMP?.address]
    });
    // @ts-ignore
    setApprovalForAllToken(isApprovedForAll);
    if (successFullListing) {
      handleListingModal();
      setSuccessFullListing(false);
    }
    setShowPreviewModal(!showPreviewModal);
    validateInputs();
  };
  const handleSubmit = async () => {
    const isValid = validateInputs();
    if (isValid) {
      try {
        const startDateFormated = Math.floor(startDate.getTime() / 1000);
        const nowFormated = Math.floor(new Date().getTime() / 1000);
        const startTime = Math.max(startDateFormated, nowFormated);
        const endDateFormated = Math.floor(endDate.getTime() / 1000);
        const secondsUntilEndTime = endDateFormated - startTime;

        const startingPrice = ethers.utils
          .parseUnits(
            parseFloat(selectedStartingPrice.toString()).toFixed(currencyDecimals as number),
            currencyDecimals as number
          )
          .toString();

        const isAuction = selectedListingType[0] === 1;
        const price = ethers.utils
          .parseUnits(
            parseFloat(selectedUnitPrice.toString()).toFixed(currencyDecimals as number),
            currencyDecimals as number
          )
          .toString();
        const assetContract = offerData?.nftContract?.id;

        const args = {
          assetContract: assetContract,
          tokenId: tokenId,
          startTime: startTime,
          secondsUntilEndTime: secondsUntilEndTime,
          quantityToList: 1,
          currencyToAccept: tokenContract,
          reservePricePerToken: isAuction ? startingPrice : price,
          buyoutPricePerToken: price,
          transferType: 1,
          rentalExpirationTimestamp: startTime + secondsUntilEndTime,
          listingType: selectedListingType[0]
        };
        // await createListing({
        //   args: [args],
        //   overrides: {
        //     gasLimit: 10000000
        //   }
        // });

        const tx = prepareContractCall({
          contract: dsponsorMpContract,
          //@ts-ignore
          method: "createListing",
          params: [args]
        });

        await createListing(tx);

        const tags = [
          `${chainId}-userAddress-${address}`,
          `${chainId}-nftContract-${assetContract}`
        ];

        await fetch(`${relayerURL}/api/revalidate`, {
          method: "POST",
          body: JSON.stringify({
            tags
          })
        });

        setSuccessFullListing(true);
        setListingCreated(true);

        await fetchOffers();
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  };
  const handleApprove = async () => {
    try {
      //   await setApprovalForAll({
      //     args: [chainConfig?.smartContracts?.DSPONSORMP?.address, true]
      //   });
      const tx = prepareContractCall({
        contract: dsponsorNFTContract,
        //@ts-ignore
        method: "setApprovalForAll",
        params: [chainConfig?.smartContracts?.DSPONSORMP?.address, true]
      });

      await setApprovalForAll(tx);

      setApprovalForAllToken(true);
    } catch (error) {
      console.error(error);
      setApprovalForAllToken(false);
      throw error;
    }
  };

  const handleUnitPriceChange = (e) => {
    const { value } = e.target;

    const price = value;

    setSelectedUnitPrice(value === "" ? null : price);
  };
  const handleStartingPriceChange = (e) => {
    const { value } = e.target;

    const price = value;

    setSelectedStartingPrice(value === "" ? null : price);
  };
  const handleCurrencyChange = (event) => {
    if (event.target.value === "custom") {
      setSelectedCurrencyContract(event.target.value);
      setIsCustomEnabled(true);
      setSelectedCurrency(event.target.value);
    } else {
      const currency = currencies?.find((currency) => currency.address === event.target.value);

      setSelectedCurrencyContract(currency?.address as Address);
      setCustomContract(null);
      setIsCustomEnabled(false);
      setSelectedCurrency(currency as Currency);
    }
  };

  const handleCustomContractChange = (event) => {
    if (event.target.value === currencies?.["NATIVE"]?.address) {
      setCustomContract(currencies?.["NATIVE"].address);
    } else {
      setCustomContract(event.target.value);
      setSelectedCurrencyContract(event.target.value);
      setCustomTokenContract(tokenContractAsync);
    }
  };

  const handleListingTypeChange = (e) => {
    const value = parseInt(e.target.value);
    setSelectedListingType([value]);
  };

  const validateInputs = () => {
    let isValid = true;
    let newErrors: any = {};
    const currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() - 1);

    if (!startDate) {
      newErrors.startDateError = "Start date is missing.";
      isValid = false;
    } else if (new Date(startDate) < currentDate) {
      newErrors.startDateError = "Start date cannot be in the past.";
      isValid = false;
    } else if (startDate > endDate) {
      newErrors.startDateError = "Start date cannot be after the end date.";
      isValid = false;
    }

    if (!endDate) {
      newErrors.endDateError = "End date is missing.";
      isValid = false;
    } else if (new Date(endDate) < currentDate) {
      newErrors.endDateError = "End date cannot be in the past.";
      isValid = false;
    } else if (endDate < startDate) {
      newErrors.endDateError = "End date cannot be before the start date.";
      isValid = false;
    }
    if (parseFloat(selectedUnitPrice.toString()) <= parseFloat(selectedStartingPrice.toString())) {
      newErrors.unitPriceError = `Unit price must be higher than the unit starting price.`;
      isValid = false;
    }

    if (!currencyDecimals || !currencySymbol) {
      newErrors.currencyError = "Currency is missing or invalid.";
      isValid = false;
    }

    if (currencyDecimals) {
      if (
        selectedUnitPrice < 1 * 10 ** -currencyDecimals ||
        isNaN(selectedUnitPrice) ||
        selectedUnitPrice === null
      ) {
        newErrors.unitPriceError = `Unit price must be at least ${1 * 10 ** -currencyDecimals}.`;
        isValid = false;
      }

      if (
        (selectedListingType[0] === 1 && selectedStartingPrice < 1 * 10 ** -currencyDecimals) ||
        isNaN(selectedStartingPrice) ||
        selectedStartingPrice === null
      ) {
        newErrors.startingPriceError = `Unit starting price must be at least ${1 * 10 ** -currencyDecimals}.`;
        isValid = false;
      }
    }

    if (selectedCurrency?.address === "custom" && customTokenContract === undefined) {
      newErrors.currencyError = "Custom contract is missing or invalid.";
      isValid = false;
    }

    if (!selectedCurrency) {
      newErrors.currencyError = "Currency is missing or invalid.";
      isValid = false;
    }

    setValidate(isValid);
    setErrors(newErrors);
    return isValid;
  };
  const calculatePriceWithTaxes = (price, smartContract = false) => {
    const fees = [0.04, royalties / 100];

    const finalPrice = price - price * (fees[0] + fees[1]);

    if (smartContract && currencyDecimals) {
      return Number(finalPrice).toFixed(currencyDecimals);
    } else {
      return Number(finalPrice).toFixed(3);
    }
  };

  const listingType = [
    {
      title: "Direct Listing",

      picture: (color) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill={color}>
          <path d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm64 320H64V320c35.3 0 64 28.7 64 64zM64 192V128h64c0 35.3-28.7 64-64 64zM448 384c0-35.3 28.7-64 64-64v64H448zm64-192c-35.3 0-64-28.7-64-64h64v64zM288 160a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
        </svg>
      ),
      body: "This listing allows anyone to purchase the ad space at the set price. The ad space is immediately available for the buyer to use."
    },
    {
      title: "Auction Listing",

      picture: (color) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill={color}>
          <path d="M318.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-120 120c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l4-4L325.4 293.4l-4 4c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l120-120c12.5-12.5 12.5-32.8 0-45.3l-16-16c-12.5-12.5-32.8-12.5-45.3 0l-4 4L330.6 74.6l4-4c12.5-12.5 12.5-32.8 0-45.3l-16-16zm-152 288c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l48 48c12.5 12.5 32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-1.4-1.4L272 285.3 226.7 240 168 298.7l-1.4-1.4z" />
        </svg>
      ),
      body: "This listing allows anyone to bid on the ad space. The highest bidder at the end of the auction wins the ad space. The ad space is immediately available for the buyer to use."
    }
  ];
  const successFullListingModal = {
    body: "Your listing has been created successfully",
    subBody: "Check this page regularly to stay updated on the progress of this listing!",
    buttonTitle: "Manage Spaces",
    hrefButton: null
  };
  const helperSartingPrice = {
    title: "Starting price",
    body: "This is the minimum price that a buyer must pay to purchase the ad space. You can set a starting price for the auction or the fixed price for the direct listing.",
    size: "small"
  };
  const helperBuyoutPrice = {
    title: "Buyout price",
    body: "This is the price that a buyer must pay to purchase the ad space immediately.",
    size: "small"
  };

  const helperFeesListing = {
    title: "Fees",
    body: `The fees are calculated on the final price. The fees are 4% for the platform and ${royalties} % royalties for the creator.  
    e.g. If you put 100 ${currencySymbol}, the buyer will pay 100 ${currencySymbol}. You will receive 100 - 4%  (protocol fees) - ${royalties}% (royalties fees) ${currencySymbol}.
    `,
    size: "small"
  };

  return (
    <div className="w-full">
      {/* <!-- Buy Now Modal --> */}
      <div className="max-w-3xl modal-dialog">
        <div className="modal-content !bg-secondaryBlack">
          <div className="modal-header">
            <h5 className="mr-8 modal-title" id="buyNowModalLabel">
              Create a listing
            </h5>
            <button type="button" className="btn-close" onClick={handleListingModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="w-6 h-6 fill-jacarta-700 dark:fill-white"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-center gap-4 p-6 modal-body">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex flex-col items-center justify-center gap-4 mb-6">
                <div className="flex flex-col items-center">
                  <label
                    htmlFor="item-description"
                    className="block mb-2 font-display text-jacarta-900 dark:text-white "
                  >
                    Type of listing for this ad space
                    <span className="text-red">*</span>
                  </label>
                  <p className="mb-3 dark:text-jacarta-100 text-jacarta-100 text-2xs">
                    Select the appropriate type:
                  </p>
                  <div className="flex flex-col-reverse items-center justify-center w-full gap-4 text-jacarta-900 dark:text-white">
                    <div id="adsType" className={`grid grid-cols-1 md:grid-cols-2 gap-2`}>
                      {listingType?.map((listing: any, index: number) => (
                        <div key={index} className="relative">
                          <div
                            className={`card z-0 relative ${selectedListingType.includes(index) ? "bg-primaryPurple" : "bg-white"} open`}
                            onClick={() => {
                              document?.getElementById(`checkbox-${index}`)?.click();
                            }}
                          >
                            {selectedListingType.includes(index) && (
                              <span className="absolute z-30 flex items-center justify-center w-6 h-6 font-bold border-2 border-green rounded-2xl -right-3 text-green -bottom-2">
                                ✓
                              </span>
                            )}
                            <Input
                              id={`checkbox-${index}`}
                              type="checkbox"
                              value={index}
                              checked={selectedListingType.includes(index)}
                              onChange={handleListingTypeChange}
                              className="hidden"
                            />
                            <div className="flex gap-3">
                              <label
                                htmlFor={`checkbox-${index}`}
                                className={`card-label  ${selectedListingType.includes(index) ? "text-white" : "text-jacarta-900"}`}
                                onClick={() => {
                                  document?.getElementById(`checkbox-${index}`)?.click();
                                }}
                              >
                                {selectedListingType[0] !== index ? (
                                  <div className="flex items-center justify-center gap-2">
                                    <span className="w-[25px]">{listing.picture("black")}</span>
                                    <span>{listing.title}</span>
                                    <ModalHelper dark={true} {...listing} />
                                  </div>
                                ) : (
                                  <div className="flex justify-center gap-2">
                                    <span className="w-[25px]">{listing.picture("white")}</span>
                                    <span>{listing.title}</span>
                                    <ModalHelper dark={false} {...listing} />
                                  </div>
                                )}
                              </label>
                            </div>
                            {selectedListingType?.includes(index) && (
                              <div className="flex flex-col items-center mb-6">
                                <label
                                  htmlFor="item-description"
                                  className="block mt-2 mb-2 text-sm font-display text-jacarta-900 dark:text-white"
                                >
                                  Validity period<span className="text-red">*</span>
                                </label>
                                <p className="mb-3 dark:text-jacarta-100 text-jacarta-100 text-2xs">
                                  Set the validity period for this listing.
                                </p>
                                <div className="flex flex-col items-center gap-4 mb-3 text-jacarta-900 dark:text-white">
                                  <div className="flex flex-col items-center justify-center gap-1">
                                    <DatePicker
                                      minValue={today(getLocalTimeZone())}
                                      value={parseAbsoluteToLocal(
                                        new Date(startDate).toISOString()
                                      )}
                                      onChange={(date) => {
                                        if (date < parseAbsoluteToLocal(new Date().toISOString())) {
                                          setStartDate(new Date());
                                        } else {
                                          setStartDate(
                                            new Date(
                                              date.year,
                                              date.month - 1,
                                              date.day,
                                              date.hour,
                                              date.minute
                                            )
                                          );
                                        }
                                      }}
                                      showMonthAndYearPickers
                                      hideTimeZone
                                      hourCycle={24}
                                    />

                                    <div className="flex items-center justify-center gap-2">
                                      <span className="text-jacarta-900 dark:text-white">
                                        Start date
                                      </span>
                                      {/* <ModalHelper title={helperStartDate.title} body={helperStartDate.body} size="small" /> */}
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-center justify-center gap-1">
                                    <DatePicker
                                      minValue={today(getLocalTimeZone())}
                                      value={parseAbsoluteToLocal(new Date(endDate).toISOString())}
                                      onChange={(date) => {
                                        if (date < parseAbsoluteToLocal(new Date().toISOString())) {
                                          setEndDate(endDate);
                                        } else {
                                          setEndDate(
                                            new Date(
                                              date.year,
                                              date.month - 1,
                                              date.day,
                                              date.hour,
                                              date.minute
                                            )
                                          );
                                        }
                                      }}
                                      showMonthAndYearPickers
                                      hideTimeZone
                                      hourCycle={24}
                                    />
                                    <div className="flex items-center justify-center gap-2">
                                      <span className="text-jacarta-900 dark:text-white">
                                        End date
                                      </span>
                                      {/* <ModalHelper title={helperEndDate.title} body={helperEndDate.body} size="small" /> */}
                                    </div>
                                  </div>
                                </div>
                                {selectedListingType[0] === 1 && (
                                  <div className="mb-2 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                      <label
                                        htmlFor="item-description"
                                        className="block mb-2 text-sm font-display text-jacarta-900 dark:text-white"
                                      >
                                        Unit starting price <span className="text-red">*</span>
                                        <ModalHelper {...helperSartingPrice} size="small" />
                                      </label>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-4 text-jacarta-900 dark:text-white">
                                      <Input
                                        type="number"
                                        id="numberInput"
                                        step={0.1}
                                        value={selectedStartingPrice}
                                        onChange={handleStartingPriceChange}
                                        placeholder="Unit selling price"
                                        className="flex-grow px-3 py-3 rounded-lg border-jacarta-100 hover:ring-primaryPurple/10 focus:ring-primaryPurple dark:border-jacarta-800 dark:placeholder:text-jacarta-100 hover:ring-2 dark:text-white"
                                      />
                                    </div>
                                    <p className="dark:text-jacarta-100 text-jacarta-100 text-2xs ">
                                      You will receive :{" "}
                                      {calculatePriceWithTaxes(selectedStartingPrice)}{" "}
                                      {selectedCurrency?.symbol}
                                    </p>
                                  </div>
                                )}
                                <div className="mb-2 text-center">
                                  <div className="flex items-center justify-center gap-2">
                                    <label
                                      htmlFor="item-description"
                                      className="block mb-2 text-sm font-display text-jacarta-900 dark:text-white"
                                    >
                                      Direct selling price <span className="text-red">*</span>
                                      <ModalHelper {...helperBuyoutPrice} size="small" />
                                    </label>
                                  </div>

                                  <div className="flex flex-col items-center text-jacarta-900 dark:text-white">
                                    <Input
                                      type="number"
                                      id="numberInput"
                                      step={0.1}
                                      value={selectedUnitPrice}
                                      onChange={handleUnitPriceChange}
                                      placeholder="Direct selling price"
                                      className="flex-grow px-3 py-3 rounded-lg border-jacarta-100 hover:ring-primaryPurple/10 focus:ring-primaryPurple dark:border-jacarta-800 dark:placeholder:text-jacarta-100 hover:ring-2 dark:text-white"
                                    />
                                    <p className="dark:text-jacarta-100 text-jacarta-100 text-2xs ">
                                      You will receive :{" "}
                                      {calculatePriceWithTaxes(selectedUnitPrice)}{" "}
                                      {selectedCurrency?.symbol}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex gap-4 mt-2 flex-start">
                                  <select
                                    id="currency"
                                    value={selectedCurrency?.address}
                                    onChange={handleCurrencyChange}
                                    className="dark:bg-secondaryBlack min-w-[110px] border-jacarta-100 hover:ring-primaryPurple/10 focus:ring-primaryPurple dark:border-jacarta-800 dark:placeholder:text-jacarta-100 w-full rounded-lg py-3 px-5 hover:ring-2 dark:text-white"
                                  >
                                    {currencies.map((currency) => (
                                      <option key={currency.address} value={currency.address}>
                                        {currency.symbol}
                                      </option>
                                    ))}
                                    <option value="custom">Custom</option>
                                  </select>
                                  {isCustomEnabled && (
                                    <Input
                                      type="text"
                                      value={customContract}
                                      onChange={handleCustomContractChange}
                                      placeholder="Contract address"
                                      className={`hover:ring-primaryPurple/10 ${tokenContractAsync && customContract ? "border-green" : "border-red"} focus:ring-primaryPurple  dark:placeholder:text-jacarta-100 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white`}
                                    />
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              disabled={selectedListingType.length <= 0}
              className={` !rounded-full !py-3 !px-8 !text-center !font-semibold !text-black  !transition-all ${selectedListingType.length <= 0 ? "btn-disabled !bg-white !text-black opacity-30 cursor-not-allowed" : "!text-white !bg-primaryPurple hover:!bg-opacity-80 !cursor-pointer"} `}
              onClick={handlePreviewModal}
            >
              Show {selectedListingType[0] === 1 ? "Auction" : "Listing"} Preview
            </button>
            {showPreviewModal && (
              <div className="modal fade show bloc">
                <AdSubmission
                  chainConfig={chainConfig}
                  handlePreviewModal={handlePreviewModal}
                  isListing={true}
                  handleSubmit={handleSubmit}
                  startDate={startDate}
                  endDate={endDate}
                  name={true}
                  description={true}
                  link={true}
                  helperFeesListing={helperFeesListing}
                  protocolFees={4}
                  selectedUnitPrice={selectedUnitPrice}
                  selectedStartingPrice={selectedListingType[0] === 1 ? selectedStartingPrice : 0}
                  selectedRoyalties={royalties}
                  validate={validate}
                  errors={errors}
                  successFullUpload={successFullListing}
                  buttonTitle="Create listing 🎉 (2/2)"
                  modalTitle="Listing preview"
                  successFullUploadModal={successFullListingModal}
                  approvalForAllToken={approvalForAllToken}
                  handleApprove={handleApprove}
                  tokenSymbol={currencySymbol as string}
                  tokenDecimals={currencyDecimals as number}
                  tokenAddress={selectedCurrency?.address as Address}
                  terms={false}
                  steps={[]}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;
