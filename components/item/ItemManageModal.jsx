import Link from "next/link";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { buyModalHide } from "../../redux/counterSlice";
import Image from "next/image";
import { useAddress, useSwitchChain, useContract, useContractWrite, Web3Button, useContractRead, useStorageUpload, useTokenDecimals, CheckoutWithCard, CheckoutWithEth, EndDateSchema } from "@thirdweb-dev/react";
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
import adminInstance from "../../utils/sdkProvider";


const ItemManageModal = ({ handleListingModal, offerData, marketplaceListings }) => {
  const [selectedListingType, setSelectedListingType] = useState([]);
  const [selectedUnitPrice, setSelectedUnitPrice] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("USDC");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
  const [errors, setErrors] = useState({});
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [validate, setValidate] = useState(false);
  const [successFullUpload, setSuccessFullUpload] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [customContract, setCustomContract] = useState(null);
  const [tokenDecimals, setTokenDecimals] = useState(18);
  const [symbolContract, setSymbolContract] = useState("USDC");
  const [tokenContract, setTokenContract] = useState("");
  const [customTokenContract, setCustomTokenContract] = useState("");
  const USDCCurrency = adminInstance.chain.getCurrencyAddress("USDC");
  const ETHCurrency = adminInstance.chain.getCurrencyAddress("ETH");
  const WETHCurrency = adminInstance.chain.getCurrencyAddress("WETH");
  const USDTCurrency = adminInstance.chain.getCurrencyAddress("USDT");
  const [approvalForAllToken, setApprovalForAllToken] = useState(false);

  const address = useAddress();

  const { contract: dsponsorMpContract } = useContract("0xac03b675fa9644279b92f060bf542eed54f75599");
  const { contract: nftContract } = useContract(offerData?.nftContract?.id);
  const { mutateAsync: setApprovalForAll } = useContractWrite(nftContract, "setApprovalForAll");
  const { mutateAsync: createListing } = useContractWrite(dsponsorMpContract, "createListing");

  const [selectedCurrencyContract, setSelectedCurrencyContract] = useState(USDCCurrency.contract);
  const { contract: tokenContractAsync } = useContract(selectedCurrencyContract, "token");
  const { data: symbolContractAsync } = useContractRead(tokenContractAsync, "symbol");
  const { data: decimalsContractAsync } = useContractRead(tokenContractAsync, "decimals");

  useEffect(() => {
    setSymbolContract(symbolContractAsync);
    setTokenDecimals(decimalsContractAsync);
    setTokenContract(selectedCurrencyContract);
    setCustomTokenContract(tokenContractAsync);
  }, [decimalsContractAsync, symbolContractAsync, setTokenDecimals, setSymbolContract, setTokenContract, selectedCurrencyContract, tokenContractAsync, setCustomTokenContract]);

  const handlePreviewModal = async () => {
    const isApprovedForAll = await nftContract.call("isApprovedForAll", [address, "0xac03b675fa9644279b92f060bf542eed54f75599"]);
    setApprovalForAllToken(isApprovedForAll);

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
        const isAuction = selectedListingType[0] === 1;
        const price = ethers.utils.parseUnits(selectedUnitPrice.toString(), tokenDecimals).toString();
        const args = {
          assetContract: offerData?.nftContract?.id,
          tokenId: offerData?.nftContract?.tokens[0].tokenId,
          startTime: startDateFormated,
          secondsUntilEndTime: secondsUntilEndTime,
          quantityToList: 1, //quantity
          currencyToAccept: tokenContract,
          reservePricePerToken: price,
          buyoutPricePerToken: isAuction ? price * 10000 : price,
          transferType: 1,
          rentalExpirationTimestamp: startDateFormated + secondsUntilEndTime,
          listingType: selectedListingType[0],
        };
        console.log(args);
        await createListing({ args: [args] });
        setSuccessFullUpload(true);
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setIsLoadingButton(false);
      }
    }
  };
  const handleApprove = async () => {
    setIsLoadingButton(true);
    try {
      await setApprovalForAll({ args: ["0xac03b675fa9644279b92f060bf542eed54f75599", true] });
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsLoadingButton(false);
    }
  };

  const handleUnitPriceChange = (e) => {
    const { value } = e.target;

    const price = value;

    console.log(price);

    setSelectedUnitPrice(value === "" ? null : price);
  };
  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
    if (event.target.value === "ETH") {
      setTokenDecimals(ETHCurrency.decimals);
      setSymbolContract(ETHCurrency.symbol);
      setTokenContract(ETHCurrency.contract);
    } else if (event.target.value === "custom") {
      setSelectedCurrencyContract("f");
    } else {
      console.log("ici");
      setSelectedCurrencyContract(selectedCurrencyContractObject[event.target.value]);
      setCustomContract(null);
    }
  };
  const handleCustomContractChange = (event) => {
    if (event.target.value === ETHCurrency.contract) {
      setTokenDecimals(ETHCurrency.decimals);
      setSymbolContract(ETHCurrency.symbol);
      setTokenContract(ETHCurrency.contract);
      setCustomTokenContract(ETHCurrency.contract);
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
    const yesterday = new Date(currentDate.setDate(currentDate.getDate() - 1));

    if (!startDate) {
      newErrors.startDateError = "Start date is missing.";
      isValid = false;
    } else if (new Date(startDate) < yesterday) {
      newErrors.startDateError = "Start date cannot be in the past.";
      isValid = false;
    }

    if (!endDate) {
      newErrors.endDateError = "End date is missing.";
      isValid = false;
    } else if (new Date(endDate) < yesterday) {
      newErrors.endDateError = "End date cannot be in the past.";
      isValid = false;
    }
    if (parseFloat(selectedUnitPrice) < 1 * 10 ** -tokenDecimals || isNaN(selectedUnitPrice) || selectedUnitPrice === null) {
      console.log("là");
      newErrors.unitPriceError = `Unit price must be at least ${1 * 10 ** -tokenDecimals}.`;
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
  const selectedCurrencyContractObject = {
    USDC: USDCCurrency.contract,
    ETH: ETHCurrency.contract,
    WETH: WETHCurrency.contract,
    USDT: USDTCurrency.contract,
    custom: customContract,
  };
  const listingType = [
    {
      name: "Direct Listing",

      image: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M318.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-120 120c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l4-4L325.4 293.4l-4 4c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l120-120c12.5-12.5 12.5-32.8 0-45.3l-16-16c-12.5-12.5-32.8-12.5-45.3 0l-4 4L330.6 74.6l4-4c12.5-12.5 12.5-32.8 0-45.3l-16-16zm-152 288c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l48 48c12.5 12.5 32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-1.4-1.4L272 285.3 226.7 240 168 298.7l-1.4-1.4z" />
        </svg>
      ),
      body: "This integration allows you to display a grid of clickable logos. Each logo can redirect to a different URL. You can choose the number of logos to display and the image ratio for each logo.",
    },
    {
      name: "Auction Listing",

      image: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M318.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-120 120c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l4-4L325.4 293.4l-4 4c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l120-120c12.5-12.5 12.5-32.8 0-45.3l-16-16c-12.5-12.5-32.8-12.5-45.3 0l-4 4L330.6 74.6l4-4c12.5-12.5 12.5-32.8 0-45.3l-16-16zm-152 288c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l48 48c12.5 12.5 32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-1.4-1.4L272 285.3 226.7 240 168 298.7l-1.4-1.4z" />
        </svg>
      ),
      body: "This integration lets you display a randomly selected ad from those submitted by sponsors (ad space token owners), with a new ad randomly selected at each request. You can choose the banner's image ratio. The banner displays an ad image and redirects to a URL provided by the selected sponsor.",
    },
  ];
  const successFullUploadModal = {
    body: "Your offer has been created successfully",
    subBody: "❕❕ On your offer management page, you will find the integration code to copy/paste onto your platform.",
    buttonTitle: "Manage Spaces",
    hrefButton: `/manage/${address}`,
  };
  return (
    <div>
      {/* <!-- Buy Now Modal --> */}
      <div className="modal-dialog max-w-2xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title mr-8" id="buyNowModalLabel">
              Create a listing
            </h5>
            <button type="button" className="btn-close" onClick={handleListingModal}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="fill-jacarta-700 h-6 w-6 dark:fill-white">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
              </svg>
            </button>
          </div>

          <div className="modal-footer">
            <div className="flex items-center justify-center space-x-4">
              <div className="mb-6 flex  flex-col justify-center items-center gap-4">
                <div className="flex flex-col items-center">
                  <label htmlFor="item-description" className="font-display text-jacarta-700 mb-2 block dark:text-white ">
                    Type of ad spaces for this offer
                    <span className="text-red">*</span>
                  </label>
                  <p className="dark:text-jacarta-300 text-jacarta-400 text-2xs mb-3">Select the appropriate type:</p>
                  <div className="flex flex-col gap-4 justify-center items-center w-full text-jacarta-700 dark:text-white">
                    <div id="adsType" className="flex flex-wrap justify-center gap-2">
                      {listingType.map((listing, index) => (
                        <div key={index} className="relative ">
                          <div
                            className={`card relative ${selectedListingType.includes(index) ? "bg-accent-dark" : ""} ${selectedListingType[0] !== index && selectedListingType.length > 0 ? "closed" : "open"}`}
                            onClick={() => {
                              document.getElementById(`checkbox-${index}`).click();
                            }}
                          >
                            {selectedListingType.includes(index) && (
                              <span className="absolute border-2 border-green rounded-2xl -right-3 text-green font-bold -bottom-2 z-30 w-6 h-6 flex justify-center items-center">✓</span>
                            )}
                            <input id={`checkbox-${index}`} type="checkbox" value={index} checked={selectedListingType.includes(index)} onChange={handleListingTypeChange} className="hidden" />
                            <div className="flex gap-3">
                              <label
                                htmlFor={`checkbox-${index}`}
                                className={`card-label ${selectedListingType.includes(index) ? "text-white" : "text-jacarta-700"}`}
                                onClick={() => {
                                  document.getElementById(`checkbox-${index}`).click();
                                }}
                              >
                                {selectedListingType[0] !== index && selectedListingType.length > 0 && listing.image}
                                {listing.name}
                              </label>
                              {/* <ModalHelper dark={true} title={integration.integrationName} body={integration.bodyDescription} image={integration.imageExemple} /> */}
                            </div>
                            {selectedListingType.includes(index) && (
                              <div className="mb-6 flex flex-col items-center">
                                <label htmlFor="item-description" className="font-display text-jacarta-700 mb-2 block dark:text-white">
                                  Validity period<span className="text-red">*</span>
                                </label>
                                <p className="dark:text-jacarta-300 text-jacarta-400 text-2xs mb-3">Set the validity period for the spaces.</p>
                                <div className="flex gap-4 items-center text-jacarta-700 dark:text-white mb-3">
                                  <div className="flex flex-col justify-center items-center gap-1">
                                    <DatePicker
                                      selected={startDate}
                                      onChange={(date) => setStartDate(date)}
                                      showMonthDropdown
                                      popperPlacement="bottom-end"
                                      showYearDropdown
                                      className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                                    />
                                    <div className="flex gap-2 justify-center items-center">
                                      <span className="text-jacarta-700 dark:text-white">Start date</span>
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
                                      className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                                    />
                                    <div className="flex gap-2 justify-center items-center">
                                      <span className="text-jacarta-700 dark:text-white">End date</span>
                                      {/* <ModalHelper title={helperEndDate.title} body={helperEndDate.body} size="small" /> */}
                                    </div>
                                  </div>
                                </div>
                                <label htmlFor="item-description" className="font-display text-jacarta-700 mb-2 block dark:text-white">
                                  {selectedListingType[0] === 0 ? "Unit selling price" : "Unit starting price"}
                                  <span className="text-red">*</span>
                                </label>
                                <p className="dark:text-jacarta-300 text-jacarta-400 text-2xs mb-3">USD payment</p>
                                <div className="flex  flex-wrap   gap-4 items-center text-jacarta-700 dark:text-white">
                                  <input
                                    id="numberInput"
                                    type="number"
                                    step="0.1"
                                    value={selectedUnitPrice}
                                    onChange={handleUnitPriceChange}
                                    placeholder="Unit selling price"
                                    className="dark:bg-jacarta-700 flex-grow border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300  rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                                  />

                                  <div className="flex gap-4">
                                    <select
                                      id="currency"
                                      value={selectedCurrency}
                                      onChange={handleCurrencyChange}
                                      className="dark:bg-jacarta-700 min-w-[110px] border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-5 hover:ring-2 dark:text-white"
                                    >
                                      <option value="USDC">USDC</option>
                                      <option value="ETH">ETH</option>
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
                                        className={`dark:bg-jacarta-700  hover:ring-accent/10 ${
                                          tokenContractAsync && customContract ? "border-green" : "border-red"
                                        } focus:ring-accent  dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white`}
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <button type="button" className="bg-accent cursor-pointer rounded-full py-3 px-3 text-end font-semibold text-white transition-all" onClick={handlePreviewModal}>
                      Show preview
                    </button>
                    {showPreviewModal && (
                      <div className="modal fade show bloc">
                        <PreviewModal
                          handlePreviewModal={handlePreviewModal}
                          handleSubmit={handleSubmit}
                          startDate={startDate}
                          endDate={endDate}
                          selectedUnitPrice={selectedUnitPrice}
                          selectedCurrency={selectedCurrency}
                          validate={validate}
                          symbolContract={symbolContract}
                          errors={errors}
                          successFullUpload={successFullUpload}
                          buttonTitle="Create ad space offer"
                          modalTitle="Ad Space Offer "
                          successFullUploadModal={successFullUploadModal}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemManageModal;