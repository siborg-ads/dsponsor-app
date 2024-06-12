import Link from "next/link";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { buyModalHide } from "../../redux/counterSlice";
import Image from "next/image";
import {
  useAddress,
  useSwitchChain,
  useContract,
  useContractWrite,
  Web3Button,
  useContractRead,
  useStorageUpload,
  useTokenDecimals,
  CheckoutWithCard,
  CheckoutWithEth,
  EndDateSchema
} from "@thirdweb-dev/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { protocolFeesBigNumber } from "../../utils/constUtils";
import { Divider } from "@nextui-org/react";
import { ethers } from "ethers";
import { Spinner } from "@nextui-org/spinner";
import DatePicker from "react-datepicker";
import ModalHelper from "../Helper/modalHelper";
import PreviewModal from "../modal/previewModal";

import { useChainContext } from "../../contexts/hooks/useChainContext";

const ItemManageModal = ({
  handleListingModal,
  offerData,
  setSuccessFullListing,
  successFullListing,
  marketplaceListings,
  royalties,
  dsponsorNFTContract,
  dsponsorMpContract
}) => {
  const [selectedListingType, setSelectedListingType] = useState([]);
  const { currentChainObject } = useChainContext();
  const [selectedUnitPrice, setSelectedUnitPrice] = useState(0);
  const [selectedStartingPrice, setSelectedStartingPrice] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("USDC");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 7)));
  const [errors, setErrors] = useState({});
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [validate, setValidate] = useState(false);
  const address = useAddress();

  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [customContract, setCustomContract] = useState(null);
  const [tokenDecimals, setTokenDecimals] = useState(18);
  const [symbolContract, setSymbolContract] = useState("USDC");
  const [tokenContract, setTokenContract] = useState("");
  const [customTokenContract, setCustomTokenContract] = useState("");
  const USDCCurrency = currentChainObject?.smartContracts?.USDC;
  const WETHCurrency = currentChainObject?.smartContracts?.WETH;
  const USDTCurrency = currentChainObject?.smartContracts?.USDT;
  const NATIVECurrency = currentChainObject?.smartContracts?.NATIVE;
  const [selectedCurrencyContract, setSelectedCurrencyContract] = useState(USDCCurrency?.address);
  const { contract: tokenContractAsync } = useContract(selectedCurrencyContract, "token");
  const { data: symbolContractAsync } = useContractRead(tokenContractAsync, "symbol");
  const { data: decimalsContractAsync } = useContractRead(tokenContractAsync, "decimals");
  const [approvalForAllToken, setApprovalForAllToken] = useState(false);

  const { mutateAsync: setApprovalForAll } = useContractWrite(
    dsponsorNFTContract,
    "setApprovalForAll"
  );
  const { mutateAsync: createListing } = useContractWrite(dsponsorMpContract, "createListing");

  useEffect(() => {
    setSymbolContract(symbolContractAsync);
    setTokenDecimals(decimalsContractAsync);
    setTokenContract(selectedCurrencyContract);
    setCustomTokenContract(tokenContractAsync);
  }, [
    decimalsContractAsync,
    symbolContractAsync,
    selectedCurrencyContract,
    tokenContractAsync,
    currentChainObject,
    setSymbolContract,
    setTokenDecimals,
    setTokenContract,
    setCustomTokenContract
  ]);

  const handlePreviewModal = async () => {
    const isApprovedForAll = await dsponsorNFTContract.call("isApprovedForAll", [
      address,
      currentChainObject?.smartContracts?.DSPONSORMP?.address
    ]);
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
        setIsLoadingButton(true);
        const startDateFormated = Math.floor(startDate.getTime() / 1000);
        const endDateFormated = Math.floor(endDate.getTime() / 1000);
        const secondsUntilEndTime = endDateFormated - startDateFormated;
        const startingPriceWithTaxes = calculatePriceWithTaxes(selectedStartingPrice, true);
        const startingPrice = ethers.utils
          .parseUnits(startingPriceWithTaxes.toString(), tokenDecimals)
          .toString();
        const isAuction = selectedListingType[0] === 1;
        const priceWithTaxes = calculatePriceWithTaxes(selectedUnitPrice, true);
        const price = ethers.utils.parseUnits(priceWithTaxes.toString(), tokenDecimals).toString();
        const args = {
          assetContract: offerData?.nftContract?.id,
          tokenId: offerData?.nftContract?.tokens[0].tokenId,
          startTime: startDateFormated,
          secondsUntilEndTime: secondsUntilEndTime,
          quantityToList: 1,
          currencyToAccept: tokenContract,
          reservePricePerToken: isAuction ? startingPrice : price,
          buyoutPricePerToken: price,
          transferType: 1,
          rentalExpirationTimestamp: startDateFormated + secondsUntilEndTime,
          listingType: selectedListingType[0]
        };
        await createListing({ args: [args] });
        setSuccessFullListing(true);
      } catch (error) {
        setIsLoadingButton(false);
        console.error(error);
        throw error;
      } finally {
        setIsLoadingButton(false);
      }
    }
  };
  const handleApprove = async () => {
    try {
      setIsLoadingButton(true);
      await setApprovalForAll({
        args: [currentChainObject?.smartContracts?.DSPONSORMP?.address, true]
      });
      setApprovalForAllToken(true);
    } catch (error) {
      setIsLoadingButton(false);
      console.error(error);
      setApprovalForAllToken(false);
      throw error;
    } finally {
      setIsLoadingButton(false);
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
    setSelectedCurrency(event.target.value);
    if (event.target.value === "custom") {
      setSelectedCurrencyContract("f");
    } else {
      setSelectedCurrencyContract(selectedCurrencyContractObject[event.target.value]);
      setCustomContract(null);
    }
  };
  const handleCustomContractChange = (event) => {
    if (event.target.value === NATIVECurrency.address) {
      setCustomContract(NATIVECurrency.address);
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
    let newErrors = {};
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
    if (parseFloat(selectedUnitPrice) <= parseFloat(selectedStartingPrice)) {
      newErrors.unitPriceError = `Unit price must be higher than the unit starting price.`;
      isValid = false;
    }
    if (
      parseFloat(selectedUnitPrice) < 1 * 10 ** -tokenDecimals ||
      isNaN(selectedUnitPrice) ||
      selectedUnitPrice === null
    ) {
      newErrors.unitPriceError = `Unit price must be at least ${1 * 10 ** -tokenDecimals}.`;
      isValid = false;
    }

    if (
      (selectedListingType[0] === 1 &&
        parseFloat(selectedStartingPrice) < 1 * 10 ** -tokenDecimals) ||
      isNaN(selectedStartingPrice) ||
      selectedStartingPrice === null
    ) {
      newErrors.startingPriceError = `Unit starting price must be at least ${1 * 10 ** -tokenDecimals}.`;
      isValid = false;
    }

    if (selectedCurrency === "custom" && customTokenContract === undefined) {
      newErrors.currencyError = "Custom contract is missing or invalid.";
      isValid = false;
    }
    console.log(selectedCurrency);

    if (!selectedCurrency) {
      newErrors.currencyError = "Currency is missing or invalid.";
      isValid = false;
    }

    setValidate(isValid);
    setErrors(newErrors);
    return isValid;
  };
  const calculatePriceWithTaxes = (price, smartContract = false) => {
    let grossPrice = price;
    const fees = [0.04, royalties / 100];
    for (let i = 0; i < fees.length; i++) {
      grossPrice /= 1 - fees[i];
    }
    if (smartContract) {
      console.log(grossPrice.toFixed(tokenDecimals));
      return grossPrice.toFixed(tokenDecimals);
    } else {
      return grossPrice.toFixed(3);
    }
  };

  const selectedCurrencyContractObject = {
    USDC: USDCCurrency?.address,
    WETH: WETHCurrency?.address,
    USDT: USDTCurrency?.address,
    custom: customContract
  };
  const listingType = [
    {
      title: "Direct Listing",

      picture: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm64 320H64V320c35.3 0 64 28.7 64 64zM64 192V128h64c0 35.3-28.7 64-64 64zM448 384c0-35.3 28.7-64 64-64v64H448zm64-192c-35.3 0-64-28.7-64-64h64v64zM288 160a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
        </svg>
      ),
      body: "This listing allows anyone to purchase the ad space at the set price. The ad space is immediately available for the buyer to use."
    },
    {
      title: "Auction Listing",

      picture: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M318.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-120 120c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l4-4L325.4 293.4l-4 4c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l120-120c12.5-12.5 12.5-32.8 0-45.3l-16-16c-12.5-12.5-32.8-12.5-45.3 0l-4 4L330.6 74.6l4-4c12.5-12.5 12.5-32.8 0-45.3l-16-16zm-152 288c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l48 48c12.5 12.5 32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-1.4-1.4L272 285.3 226.7 240 168 298.7l-1.4-1.4z" />
        </svg>
      ),
      body: "This listing allows anyone to bid on the ad space. The highest bidder at the end of the auction wins the ad space. The ad space is immediately available for the buyer to use."
    }
  ];
  const successFullListingModal = {
    body: "Your listing has been created successfully",
    subBody: "You can see your listing on the martketplace page.",
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
    body: `The fees are calculated on the final price. The fees are 4% for the platform and ${royalties} % royalties for the creator. We have calculated the price for you to get the exact amount you put in the listing. 
    e.g. If you put 100 USDC, the buyer will pay 100 USDC + 4% fees + ${royalties} % royalties = 114 USDC. You will receive 100 USDC.
    `,
    size: "small"
  };

  return (
    <div>
      {/* <!-- Buy Now Modal --> */}
      <div className="modal-dialog max-w-2xl">
        <div className="modal-content !bg-secondaryBlack">
          <div className="modal-header">
            <h5 className="modal-title mr-8" id="buyNowModalLabel">
              Create a listing
            </h5>
            <button type="button" className="btn-close" onClick={handleListingModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="fill-jacarta-700 h-6 w-6 dark:fill-white"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
              </svg>
            </button>
          </div>
          <div className="modal-body p-6 flex gap-4 items-center justify-center">
            <div className="flex items-center justify-center space-x-4">
              <div className="mb-6 flex flex-col justify-center items-center gap-4">
                <div className="flex flex-col items-center">
                  <label
                    htmlFor="item-description"
                    className="font-display text-jacarta-900 mb-2 block dark:text-white "
                  >
                    Type of ad spaces for this offer
                    <span className="text-red">*</span>
                  </label>
                  <p className="dark:text-jacarta-100 text-jacarta-100 text-2xs mb-3">
                    Select the appropriate type:
                  </p>
                  <div className="flex flex-col gap-4 justify-center items-center w-full text-jacarta-900 dark:text-white">
                    <div id="adsType" className="flex flex-wrap justify-center gap-2">
                      {listingType.map((listing, index) => (
                        <div key={index} className="relative ">
                          <div
                            className={`card relative ${selectedListingType.includes(index) ? "bg-primaryPurple" : "bg-white"} ${selectedListingType[0] !== index && selectedListingType.length > 0 ? "closed" : "open"}`}
                            onClick={() => {
                              document.getElementById(`checkbox-${index}`).click();
                            }}
                          >
                            {selectedListingType.includes(index) && (
                              <span className="absolute border-2 border-green rounded-2xl -right-3 text-green font-bold -bottom-2 z-30 w-6 h-6 flex justify-center items-center">
                                ✓
                              </span>
                            )}
                            <input
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
                                  document.getElementById(`checkbox-${index}`).click();
                                }}
                              >
                                {selectedListingType[0] !== index &&
                                selectedListingType.length > 0 ? (
                                  listing.picture
                                ) : (
                                  <div className="flex gap-2 justify-center">
                                    <span>{listing.title}</span>{" "}
                                    <ModalHelper dark={false} {...listing} />
                                  </div>
                                )}
                              </label>
                            </div>
                            {selectedListingType.includes(index) && (
                              <div className="mb-6 flex flex-col items-center">
                                <label
                                  htmlFor="item-description"
                                  className="font-display mt-2 text-jacarta-900 text-sm mb-2 block dark:text-white"
                                >
                                  Validity period<span className="text-red">*</span>
                                </label>
                                <p className="dark:text-jacarta-100 text-jacarta-100 text-2xs mb-3">
                                  Set the validity period for the spaces.
                                </p>
                                <div className="flex flex-col gap-4 items-center text-jacarta-900 dark:text-white mb-3">
                                  <div className="flex flex-col justify-center items-center gap-1">
                                    <DatePicker
                                      selected={startDate}
                                      onChange={(date) => setStartDate(date)}
                                      showMonthDropdown
                                      popperPlacement="bottom-start"
                                      showYearDropdown
                                      showTimeSelect
                                      dateFormat="MMMM d, yyyy h:mm aa"
                                      className="dark:bg-secondaryBlack border-jacarta-100 hover:ring-primaryPurple/10 focus:ring-primaryPurple dark:border-jacarta-600 dark:placeholder:text-jacarta-100 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                                      style={{ width: "357px" }}
                                    />
                                    <div className="flex gap-2 justify-center items-center">
                                      <span className="text-jacarta-900 dark:text-white">
                                        Start date
                                      </span>
                                      {/* <ModalHelper title={helperStartDate.title} body={helperStartDate.body} size="small" /> */}
                                    </div>
                                  </div>
                                  <div className="flex flex-col justify-center items-center gap-1">
                                    <DatePicker
                                      selected={endDate}
                                      onChange={(date) => setEndDate(date)}
                                      showMonthDropdown
                                      popperPlacement="bottom-end"
                                      showYearDropdown
                                      showTimeSelect
                                      dateFormat="MMMM d, yyyy h:mm aa"
                                      className="dark:bg-secondaryBlack border-jacarta-100 hover:ring-primaryPurple/10 focus:ring-primaryPurple dark:border-jacarta-600 dark:placeholder:text-jacarta-100 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                                    />
                                    <div className="flex gap-2 justify-center items-center">
                                      <span className="text-jacarta-900 dark:text-white">
                                        End date
                                      </span>
                                      {/* <ModalHelper title={helperEndDate.title} body={helperEndDate.body} size="small" /> */}
                                    </div>
                                  </div>
                                </div>
                                {selectedListingType[0] === 1 && (
                                  <div className="text-center  mb-2">
                                    <div className="flex gap-2 justify-center items-center">
                                      <label
                                        htmlFor="item-description"
                                        className="font-display text-jacarta-900 text-sm mb-2 block dark:text-white"
                                      >
                                        Unit starting price <span className="text-red">*</span>
                                        <ModalHelper {...helperSartingPrice} size="small" />
                                      </label>
                                    </div>
                                    <div className="flex  flex-wrap   gap-4 items-center text-jacarta-900 dark:text-white">
                                      <input
                                        id="numberInput"
                                        type="number"
                                        step="0.1"
                                        value={selectedStartingPrice}
                                        onChange={handleStartingPriceChange}
                                        placeholder="Unit selling price"
                                        className="dark:bg-secondaryBlack flex-grow border-jacarta-100 hover:ring-primaryPurple/10 focus:ring-primaryPurple dark:border-jacarta-600 dark:placeholder:text-jacarta-100  rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                                      />
                                    </div>
                                    <p className="dark:text-jacarta-100 text-jacarta-100 text-2xs ">
                                      Starting price display :{" "}
                                      {calculatePriceWithTaxes(selectedStartingPrice)}{" "}
                                      {selectedCurrency}
                                    </p>
                                  </div>
                                )}
                                <div className="text-center mb-2">
                                  <div className="flex gap-2 justify-center items-center">
                                    <label
                                      htmlFor="item-description"
                                      className="font-display text-jacarta-900 mb-2 text-sm block dark:text-white"
                                    >
                                      Unit selling price <span className="text-red">*</span>
                                      <ModalHelper {...helperBuyoutPrice} size="small" />
                                    </label>
                                  </div>

                                  <div className="flex  flex-col items-center text-jacarta-900 dark:text-white">
                                    <input
                                      id="numberInput"
                                      type="number"
                                      step="0.1"
                                      value={selectedUnitPrice}
                                      onChange={handleUnitPriceChange}
                                      placeholder="Unit selling price"
                                      className="dark:bg-secondaryBlack flex-grow border-jacarta-100 hover:ring-primaryPurple/10 focus:ring-primaryPurple dark:border-jacarta-600 dark:placeholder:text-jacarta-100  rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                                    />
                                    <p className="dark:text-jacarta-100 text-jacarta-100 text-2xs ">
                                      Selling price display :{" "}
                                      {calculatePriceWithTaxes(selectedUnitPrice)}{" "}
                                      {selectedCurrency}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-start gap-4 mt-2">
                                  <select
                                    id="currency"
                                    value={selectedCurrency}
                                    onChange={handleCurrencyChange}
                                    className="dark:bg-secondaryBlack min-w-[110px] border-jacarta-100 hover:ring-primaryPurple/10 focus:ring-primaryPurple dark:border-jacarta-600 dark:placeholder:text-jacarta-100 w-full rounded-lg py-3 px-5 hover:ring-2 dark:text-white"
                                  >
                                    <option value="USDC">USDC</option>
                                    <option value="WETH">WETH</option>
                                    <option value="USDT">USDT</option>
                                    <option value="custom">Custom</option>
                                  </select>
                                  {selectedCurrency === "custom" && (
                                    <input
                                      type="text"
                                      value={customContract}
                                      onChange={handleCustomContractChange}
                                      placeholder="Contract address"
                                      className={`dark:bg-secondaryBlack  hover:ring-primaryPurple/10 ${
                                        tokenContractAsync && customContract
                                          ? "border-green"
                                          : "border-red"
                                      } focus:ring-primaryPurple  dark:placeholder:text-jacarta-100 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white`}
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
              className="bg-primaryPurple hover:bg-opacity-80 cursor-pointer rounded-full py-3 px-3 text-end font-semibold text-white transition-all"
              onClick={handlePreviewModal}
            >
              Show preview
            </button>
            {showPreviewModal && (
              <div className="modal fade show bloc">
                <PreviewModal
                  handlePreviewModal={handlePreviewModal}
                  handleSubmit={handleSubmit}
                  startDate={startDate}
                  endDate={endDate}
                  name={true}
                  description={true}
                  link={true}
                  helperFeesListing={helperFeesListing}
                  protocolFees={4}
                  selectedUnitPrice={calculatePriceWithTaxes(selectedUnitPrice)}
                  selectedStartingPrice={
                    selectedListingType[0] === 1 && calculatePriceWithTaxes(selectedStartingPrice)
                  }
                  selectedRoyalties={royalties}
                  selectedCurrency={selectedCurrency}
                  validate={validate}
                  symbolContract={symbolContract}
                  errors={errors}
                  successFullUpload={successFullListing}
                  buttonTitle="Create listing"
                  modalTitle="Listing preview"
                  successFullUploadModal={successFullListingModal}
                  isLoadingButton={isLoadingButton}
                  approvalForAllToken={approvalForAllToken}
                  handleApprove={handleApprove}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemManageModal;