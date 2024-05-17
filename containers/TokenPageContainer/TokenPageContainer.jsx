'use client';
import React, { useState, useEffect, useRef, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "tippy.js/dist/tippy.css";
import styles from "../../styles/createPage/style.module.scss";
import Meta from "../../components/Meta";
import Image from "next/image";
import { useAddress, useBalance, Web3Button, useContract, useContractRead, useContractWrite, useStorageUpload } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import SliderForm from "../../components/sliderForm/sliderForm.jsx";
import Step_1_Mint from "../../components/sliderForm/PageMint/Step_1_Mint";
import Step_2_Mint from "../../components/sliderForm/PageMint/Step_2_Mint";
import Step_3_Mint from "../../components/sliderForm/PageMint/Step_3_Mint";
import PreviewModal from "../../components/modal/previewModal";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { ItemsTabs } from "../../components/component";
import { fetchDataFromIPFS } from "../../data/services/ipfsService";
import BuyModal from "../../components/modal/buyModal";
import adminInstance from "../../utils/sdkProvider";
import { toast } from "react-toastify";
import OfferSkeleton from "../../components/skeleton/offerSkeleton.jsx";
import { GetTokenAdOffer } from "../../data/services/TokenOffersService";
import { Divider } from "@nextui-org/react";
import Validation from "../../components/offer-section/validation.jsx";
import { protocolFees } from "../../utils/constUtils";

import contractABI from "../../abi/dsponsorAdmin.json";

import "react-toastify/dist/ReactToastify.css";
import ModalHelper from "../../components/Helper/modalHelper.jsx";
import ItemDetails from "../../components/item/ItemDetails";

const TokenPageContainer = ({offerId, tokenId, offer, listings}) => {
    const router = useRouter();

    // const offerId = router.query.offer;
    // const tokenId = router.query?.item;

    const [tokenIdString, setTokenIdString] = useState(null);

    const [data, setData] = useState([]);
    const [offerData, setOfferData] = useState(null);
    const address = useAddress();
    const [isOwner, setIsOwner] = useState(false);
    const [files, setFiles] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [imageModal, setImageModal] = useState(false);
    const [link, setLink] = useState("");
    const [amountToApprove, setAmountToApprove] = useState(null);
    const [royalties, setRoyalties] = useState(null);
    const [errors, setErrors] = useState({});
    const [finalPrice, setFinalPrice] = useState(null);
    const [successFullUpload, setSuccessFullUpload] = useState(false);
    const { contract: DsponsorAdminContract } = useContract("0xE442802706F3603d58F34418Eac50C78C7B4E8b3", contractABI);
    const { contract: DsponsorNFTContract } = useContract(offer?.nftContract?.id);
    const { mutateAsync: uploadToIPFS, isLoading: isUploading } = useStorageUpload();
    const { mutateAsync: mintAndSubmit } = useContractWrite(DsponsorAdminContract, "mintAndSubmit");
    const { mutateAsync: submitAd } = useContractWrite(DsponsorAdminContract, "submitAdProposals");
    const { contract: tokenContract } = useContract(offer?.nftContract?.prices?.[0]?.currency, "token");
    const { data: symbolContract } = useContractRead(tokenContract, "symbol");
    const { data: decimalsContract } = useContractRead(tokenContract, "decimals");
    const { data: tokenBalance, isLoading, error } = useBalance(offer?.nftContract?.prices?.[0]?.currency);
    const { mutateAsync: approve, isLoading: isLoadingApprove } = useContractWrite(tokenContract, "approve");
    // const { data: bps } = useContractRead(DsponsorAdminContract, "feeBps");
    const bps = ethers.BigNumber.from(4000);
    const { data: isAllowedToMint, isLoading: isLoadingAllowedToMint } = useContractRead(DsponsorNFTContract, "tokenIdIsAllowedToMint", [tokenIdString]);
    const { data: isUserOwner } = useContractRead(DsponsorNFTContract, "ownerOf", [tokenIdString]);
    const { data: royaltiesInfo } = useContractRead(DsponsorNFTContract, "royaltyInfo", [tokenIdString, 100]);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [validate, setValidate] = useState(false);
    const [currency, setCurrency] = useState(null);
    const [adStatut, setAdStatut] = useState(null);
    const [offerNotFormated, setOfferNotFormated] = useState(false);
    const [price, setPrice] = useState(null);
    const [buyModal, setBuyModal] = useState(false);
    const [buyMethod, setBuyMethod] = useState(false);

    const [submitAdFormated, setSubmitAdFormated] = useState({});
    const [tokenData, setTokenData] = useState(null);
    const [tokenMetaData, setTokenMetaData] = useState("");
    const [allowanceTrue, setAllowanceTrue] = useState(false);
    const [adParameters, setAdParameters] = useState([]);
    const [imageURLSteps, setImageURLSteps] = useState([]);
    const stepsRef = useRef([]);
    const [numSteps, setNumSteps] = useState(2);

    useEffect(() => {
        if (offerId && tokenId && address) {
            // const fetchAdsOffers = async () => {
                // const offer = await GetTokenAdOffer(offerId, tokenId);

                // const destructuredIPFSResult = await fetchDataFromIPFS(offer.metadataURL);

                // const combinedData = {
                //     ...offer,
                //     ...destructuredIPFSResult,
                // };

                // console.log(combinedData, "combinedData");
                setOfferData(offer);
            // };

            // fetchAdsOffers();
        }

        setTokenIdString(tokenId?.toString());
    }, [offerId, address, tokenId, successFullUpload, offer]);

    useEffect(() => {
        if (!offerData || !address || !isUserOwner) return;

        console.log(isUserOwner, address, "isUserOwner");
        if (isUserOwner === address) {
            setIsOwner(true);
        }
    }, [offerData, address, tokenId, isUserOwner]);

    useEffect(() => {
        if (!tokenId || !offerData) return;
        if (tokenId.length > 6) {
            const url = new URL(window.location.href);
            const tokenData = url.searchParams.get("tokenData");
            setTokenData(tokenData);
            console.log(offerData, "offerData");
            let tokenMetaData = {};
            if (offerData.offer.token_metadata) {
                tokenMetaData.description = offerData.offer.token_metadata.description.replace(/{tokenData}/g, `${tokenData}`);
                tokenMetaData.image = offerData.offer.token_metadata.image.replace(/{tokenData}/g, `${tokenData}`);
                tokenMetaData.name = offerData.offer.token_metadata.name.replace(/{tokenData}/g, `${tokenData}`);
            }
            setTokenMetaData(tokenMetaData);
        }
    }, [tokenId, offerData]);

    useEffect(() => {
        if (!offerData) return;
        setImageURLSteps([]);
        setNumSteps(2);
        const uniqueIds = new Set();
        for (const param of offerData.adParameters) {
            if (param.adParameter.id && param.adParameter.id !== "xSpaceId" && param.adParameter.id !== "xCreatorHandle") {
                uniqueIds.add(param.adParameter.id);
            }
        }
        const imageURLSteps = [];
        const uniqueIdsArray = Array.from(uniqueIds);
        setAdParameters(uniqueIdsArray);

        uniqueIdsArray
            .filter((id) => id.startsWith("imageURL"))
            .map((id) => {
                const variant = id.slice("imageURL-".length);

                imageURLSteps.push(variant);
            });
        const totalNumSteps = numSteps + imageURLSteps.length;
        console.log(imageURLSteps, numSteps, totalNumSteps, "imageURLSteps");

        setImageURLSteps(imageURLSteps);
        setNumSteps(totalNumSteps);
    }, [offerData]);

    useEffect(() => {
        if (!offerData) return;
        try {
            const currencyTokenObject = {};
            if (!decimalsContract && !symbolContract) {
                const currencyToken = adminInstance.chain.getCurrencyByAddress(offerData.nftContract.prices[0].currency);
                currencyTokenObject.symbol = currencyToken.symbol;
                currencyTokenObject.decimals = currencyToken.decimals;
            } else {
                currencyTokenObject.symbol = symbolContract;
                currencyTokenObject.decimals = decimalsContract;
            }

            const formatPrice = offerData.nftContract.prices[0].amount / 10 ** currencyTokenObject.decimals;
            setPrice(formatPrice);
            setCurrency(currencyTokenObject);
            setOfferNotFormated(false);
        } catch (e) {
            console.error("Error: Currency not found for address", offerData?.nftContract?.prices[0]);
            setOfferNotFormated(true);
        }
    }, [symbolContract, decimalsContract, offerData, address, tokenId]);

    useEffect(() => {
        if (!offerData || !adParameters) return;
        try {
            const params = [];
            const tokenIdArray = [];
            const offerIdArray = [];
            for (const element of adParameters) {
                params.push(element);
                tokenIdArray.push(tokenId);
                offerIdArray.push(offerId);
            }
            const submitAdFormated = {};
            submitAdFormated.params = params;
            submitAdFormated.tokenId = tokenIdArray;
            submitAdFormated.offerId = offerIdArray;
            setSubmitAdFormated(submitAdFormated);
        } catch (e) {
            console.error(e, "Error: Ad parameters not found for offer");
        }
    }, [tokenId, offerId, offerData, adParameters]);

    useEffect(() => {
        const fetchStatusOffers = async () => {
            if (!offerData) return;
            const tokenData = offerData?.nftContract?.tokens[0];
            if (tokenData?.mint === null || offerData.nftContract?.tokens.length === 0) {
                setAdStatut(0);
            } else {
                setAdStatut(1);
            }
        };

        fetchStatusOffers();
    }, [offerId, tokenId, successFullUpload, offerData]);

    useEffect(() => {
        if (offerData?.nftContract?.royaltyBps) setRoyalties(offerData?.nftContract?.royaltyBps / 100);
    }, [offerData]);

    const validateInputs = () => {
        let isValid = true;
        let newErrors = {};

        if (files.length === 0) {
            newErrors.imageError = "Image is missing.";
            isValid = false;
        }

        if (!link || !isValidURL(link)) {
            newErrors.linkError = "The link is missing or invalid.";
            isValid = false;
        }
        setValidate(isValid);
        setErrors(newErrors);
        return isValid;
    };

    const isValidURL = (url) => {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    };

    const handleLogoUpload = (file, index) => {
        if (file) {
            const newFiles = [...files];
            const newPreviewImages = [...previewImages];
            newFiles[index] = { file: file, index: index };
            newPreviewImages[index] = URL.createObjectURL(file);

            setFiles(newFiles);
            setPreviewImages(newPreviewImages);
        }
    };

    useEffect(() => {
        if (price && bps) {
            const bpsValueHex = bps._hex;
            const bpsValueDecimal = ethers.BigNumber.from(bpsValueHex).toNumber();
            const bpsValuePercentage = bpsValueDecimal / 10000;

            const priceAsNumber = price * bpsValuePercentage + price;

            const priceAsNumberString = priceAsNumber.toString();

            setFinalPrice(priceAsNumberString);
            const amountToApprove = ethers.utils.parseUnits(priceAsNumberString, currency.decimals);

            setAmountToApprove(amountToApprove);
        }
    }, [data, bps, offerData, currency, price]);

    const checkAllowance = async () => {
        if (offerData?.nftContract.prices[0].currency !== "0x0000000000000000000000000000000000000000") {
            const allowance = await tokenContract.call("allowance", [address, "0xE442802706F3603d58F34418Eac50C78C7B4E8b3"]);

            const allowanceBigNumber = ethers.BigNumber.from(allowance._hex);
            const amountToApproveBigNumber = ethers.BigNumber.from(amountToApprove._hex);

            if (allowanceBigNumber.gt(amountToApproveBigNumber)) return;

            setAllowanceTrue(true);
        }
    };

    const handleApprove = async () => {
        try {
            const hasEnoughBalance = checkUserBalance(tokenBalance, price);
            if (!hasEnoughBalance) {
                throw new Error("Not enough balance for approval.");
            }

            await approve({ args: ["0xE442802706F3603d58F34418Eac50C78C7B4E8b3", amountToApprove] });
            setAllowanceTrue(false);
        } catch (error) {
            console.error("Approval failed:", error.message);
            throw new Error("Approval failed.");
        }
    };

    const handleSubmit = async () => {
        if (!buyMethod) {
            if (!validateInputs()) {
                return;
            }
        }
        const hasEnoughBalance = checkUserBalance(tokenBalance, price);
        if (!hasEnoughBalance) {
            throw new Error("Not enough balance for approval.");
        }

        // IPFS upload

        let uploadUrl = [];

        if (isOwner) {
            try {
                uploadUrl = await uploadToIPFS({
                    data: [files[0].file],
                    options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
                });
            } catch (error) {
                console.error("Erreur lors de l'upload à IPFS:", error);
                throw new Error("Upload to IPFS failed.");
            }
        }
        try {
            const argsMintAndSubmit = {
                tokenId: tokenIdString,
                to: address,
                currency: offerData?.nftContract.prices[0].currency,
                tokenData: tokenData ? tokenData : "",
                offerId: offerId,
                adParameters: [],
                adDatas: [],
                referralAdditionalInformation: "",
            };
            const argsAdSubmited = {
                offerId: submitAdFormated.offerId,
                tokenId: submitAdFormated.tokenId,
                adParameters: submitAdFormated.params,
                data: [uploadUrl[0], link],
            };

            const isEthCurrency = offerData?.nftContract.prices[0].currency === "0x0000000000000000000000000000000000000000";
            const functionWithPossibleArgs = adStatut !== 0 && !isAllowedToMint ? Object.values(argsAdSubmited) : argsMintAndSubmit;
            const argsWithPossibleOverrides = isEthCurrency ? { args: [functionWithPossibleArgs], overrides: { value: amountToApprove } } : { args: [functionWithPossibleArgs] };

            if (adStatut !== 0 && !isAllowedToMint) {
                console.log("ici", functionWithPossibleArgs);
                await submitAd({ args: functionWithPossibleArgs });
                setSuccessFullUpload(true);
            } else {
                console.log("mintAndSubmit", argsWithPossibleOverrides);
                await mintAndSubmit(argsWithPossibleOverrides);
            }

            setSuccessFullUpload(true);
        } catch (error) {
            console.error("Erreur de soumission du token:", error);
            setSuccessFullUpload(false);
            throw error;
        }
    };

    const checkUserBalance = (tokenAddressBalance, priceToken) => {
        try {
            const parsedTokenBalance = parseFloat(tokenAddressBalance.displayValue);
            const parsedPriceToken = parseFloat(priceToken);
            console.log(parsedTokenBalance, parsedPriceToken, "parsedTokenBalance, parsedPriceToken");
            if (parsedTokenBalance >= parsedPriceToken) {
                return true;
            } else {
                toast.error("You have not enough balance to confirm checkout", { autoClose: false });
                return false;
            }
        } catch (error) {
            toast.error("Error while checking user balance");
            console.error("Failed to fetch token balance:", error);
            throw new Error("Failed to fetch token balance");
        }
    };
    function formatTokenId(str) {
        if (str?.length <= 6) {
            return str;
        }
        return str?.slice(0, 3) + "..." + str?.slice(-3);
    }

    const handleBuyModal = () => {
        checkAllowance();
        setSuccessFullUpload(false);

        setBuyModal(!buyModal);
        setBuyMethod(true);
    };
    const handlePreviewModal = () => {
        setSuccessFullUpload(false);
        setShowPreviewModal(!showPreviewModal);
        validateInputs();
    };
    const successFullUploadModal = {
        title: "Ad Space",
        body: "Congratulations, you proposed an ad space.",
        subBody: "The media still has the power to validate or reject ad assets.",
        buttonTitle: "Manage Spaces",
        hrefButton: `/manage/${address}`,
    };
    const successFullBuyModal = {
        title: "Checkout",
        body: "Congratulations, you purchase this ad space.",
        subBody: "Check your ad space in your manage section to submit your ad.",
        buttonTitle: "Manage Spaces",
        hrefButton: `/manage/${address}`,
    };
    const statutAds = {
        pending: "🔍 Your ad is pending, wait the validation of the creator",
        rejected: "❌ Your ad has been rejected, you can submit an other ads below",
        accepted: "🎉 Congratulations ! Your ad has been accepted by the creator ! ",
    };

    if (!offerData || offerData.length === 0) {
        return (
            <div>
                <OfferSkeleton />
            </div>
        );
    }
    const modalHelper = {
        title: "Protocol Fees",
        body: `The protocol fees (${protocolFees}%) are used to maintain the platform and the services provided. The fees are calculated based on the price of the ad space and are automatically deducted from the total amount paid by the buyer.`,
    };

    const { description = "description not found", id = "1", image = ["/images/gradient_creative.jpg"], name = "DefaultName" } = Object.keys(offerData.offer.token_metadata).length > 0 ? tokenMetaData : offerData.offer;

    return (
        <>
            <Meta title={` || d>sponsor | Media sponsor Marketplace `} />
            {/*  <!-- Item --> */}
            <section className="relative lg:mt-24 lg:pt-12  mt-24 pt-12 pb-8">
                <div className="mb-8 container flex justify-center flex-col items-center ">
                    <div className=" flex justify-center ">
                        <h1 className="text-jacarta-700 font-bold font-display mb-6 text-center text-5xl dark:text-white md:text-left lg:text-6xl xl:text-6xl">{isOwner ? "Your Ad Space" : "Buy Ad Space"} </h1>
                        {/* <span className={`ml-2 text-sm font-bold ${isOwner ? (adStatut === 0 ? "text-red" : adStatut === 1 ? "text-green" : adStatut === 2 ? "text-accent" : "hidden") : "hidden"}`}>
              {adStatut === 0 ? "Rejected" : adStatut === 1 ? "Accepted" : adStatut === 2 ? "Pending" : ""}
            </span> */}
                    </div>
                    {/* <p className={`${isOwner ? (adStatut === 0 ? "text-red" : adStatut === 1 ? "text-green" : adStatut === 2 ? "text-accent" : "hidden") : "hidden"} text-sm font-bold`}>
            {adStatut === 0 ? statutAds.rejected : adStatut === 1 ? statutAds.accepted : statutAds.pending}
          </p> */}
                </div>

                <div className="container">
                    {/* <!-- Item --> */}

                    <div className="md:flex md:flex-wrap" key={id}>
                        {/* <!-- Image --> */}
                        <figure className="mb-8 md:mb-0 md:w-2/5 md:flex-shrink-0 md:flex-grow-0 md:basis-auto lg:w-1/2 w-full flex justify-center relative">
                            <button className=" w-full" onClick={() => setImageModal(true)} style={{ height: "450px" }}>
                                <Image width={585} height={726} src={image ? image : "/images/gradient_creative.jpg"} alt="image" className="rounded-2xl cursor-pointer h-full object-contain w-full" />
                            </button>

                            {/* <!-- Modal --> */}
                            <div className={imageModal ? "modal fade show block" : "modal fade"}>
                                <div className="modal-dialog !my-0 flex h-full max-w-4xl items-center justify-center">
                                    <Image width={582} height={722} src={image && image} alt="image" className="h-full object-cover w-full rounded-2xl" />
                                </div>

                                <button type="button" className="btn-close absolute top-6 right-6" onClick={() => setImageModal(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="h-6 w-6 fill-white">
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                                    </svg>
                                </button>
                            </div>
                            {/* <!-- end modal --> */}
                        </figure>

                        {/* <!-- Details --> */}
                        <div className="md:w-3/5 md:basis-auto md:pl-8 lg:w-1/2 lg:pl-[3.75rem]">
                            {/* <!-- Collection / Likes / Actions --> */}
                            <div className="mb-3 flex">
                                {/* <!-- Collection --> */}
                                <div className="flex items-center">
                                    <Link href={`/manage/${offerData?.initialCreator}`} className="text-accent mr-2 text-sm font-bold">
                                        {offerData?.initialCreator}
                                    </Link>
                                    <span className="dark:border-jacarta-600 bg-green inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white" data-tippy-content="Verified Collection">
                    <Tippy content={<span>Verified Collection</span>}>
                      <svg className="icon h-[.875rem] w-[.875rem] fill-white">
                        <use xlinkHref="/icons.svg#icon-right-sign"></use>
                      </svg>
                    </Tippy>
                  </span>
                                </div>
                            </div>

                            <Link href={`/offer/${offerId}`} className="flex">
                                <h1 className="font-display text-jacarta-700 mb-4 dark:hover:text-accent text-4xl font-semibold dark:text-white">{name}</h1>
                            </Link>

                            <div className="mb-8 flex items-center  whitespace-nowrap flex-wrap">
                                <div className="flex items-center mr-4">
                  <span className="text-green text-sm font-medium tracking-tight mr-2">
                    {(price * protocolFees) / 100 + price} {currency?.symbol ? currency?.symbol : "N/A"}
                  </span>
                                    <ModalHelper {...modalHelper} size="small" />
                                </div>

                                <span className="dark:text-jacarta-300 text-jacarta-400 text-sm mr-4">
                  Space # <strong className="dark:text-white">{tokenData ? tokenData : formatTokenId(tokenId)}</strong>{" "}
                </span>
                                <span className="text-jacarta-300 block text-sm ">
                  Creator <strong className="dark:text-white">{royalties}% royalties</strong>
                </span>
                            </div>

                            <p className="dark:text-jacarta-300 mb-10">{description}</p>
                            {!isOwner && !offerNotFormated && !offerData.nftContract?.tokens[0]?.mint && isAllowedToMint !== null && (
                                <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-2lg border flex flex-col gap-4 bg-white p-8">
                                    <div className=" sm:flex sm:flex-wrap">
                    <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
                      Buying the ad space give you the exclusive right to submit an ad. The media still has the power to validate or reject ad assets. You re free to change the ad at anytime. And free to resell on the
                      open market your ad space.{" "}
                    </span>
                                    </div>
                                    <div className="w-full flex justify-center">
                                        {address ? (
                                            <button type="button" className="bg-accent shadow-accent-volume hover:bg-accent-dark w-36 rounded-full py-3 px-8 text-center font-semibold text-white transition-all" onClick={handleBuyModal}>
                                                Buy
                                            </button>
                                        ) : (
                                            <Web3Button className={` !rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all  !bg-accent !cursor-pointer `}>Connect wallet</Web3Button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- end item --> */}


            {!listings || listings.length === 0 && (
                <Validation offer={offerData} offerId={offerId} isOwner={isOwner} isToken={true} successFullUploadModal={successFullUploadModal} />
            )}



            <div>
                {isOwner && !offerNotFormated ? (
                    <div className="container">
                        <Divider className="my-4" />
                        <h2 className="text-jacarta-700 font-bold font-display mb-6 text-center text-3xl dark:text-white ">Submission </h2>
                        <SliderForm styles={styles} handlePreviewModal={handlePreviewModal} stepsRef={stepsRef} numSteps={numSteps}>
                            <Step_1_Mint stepsRef={stepsRef} styles={styles} adParameters={adParameters} />
                            <Step_2_Mint stepsRef={stepsRef} styles={styles} setLink={setLink} link={link} />
                            {imageURLSteps.map((id, index) => (
                                <Step_3_Mint
                                    key={id}
                                    stepsRef={stepsRef}
                                    currentStep={index + 2}
                                    id={id}
                                    styles={styles}
                                    file={files[index]}
                                    previewImage={previewImages[index]}
                                    handleLogoUpload={(file) => handleLogoUpload(file, index)}
                                />
                            ))}
                        </SliderForm>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <p>
                            {offerNotFormated
                                ?  <ItemDetails assetContract={offer.nftContract.id} tokenId={tokenId}/>
                                : offerData.nftContract?.tokens === 0
                                    ? "Sorry, tokenId unavailable, please provide a tokenId valid "
                                    : offerData.nftContract?.tokens[0]?.mint && !isOwner
                                        ? "Sorry, someone already own this NFT "
                                        : ""}
                        </p>
                    </div>
                )}
            </div>

            {/* <ItemsTabs /> */}
            <div className="container mb-12">
                <ItemsTabs contractAddress={offerData?.nftContract.id} offerId={offerId} />
            </div>
            {showPreviewModal && (
                <div className="modal fade show bloc">
                    <PreviewModal
                        handlePreviewModal={handlePreviewModal}
                        handleSubmit={handleSubmit}
                        link={link}
                        name={true}
                        description={true}
                        previewImage={previewImages}
                        imageURLSteps={imageURLSteps}
                        errors={errors}
                        successFullUpload={successFullUpload}
                        validate={validate}
                        buttonTitle="Submit"
                        modalTitle="Ad Space Preview"
                        successFullUploadModal={successFullUploadModal}
                    />
                </div>
            )}
            {buyModal && (
                <div className="modal fade show block">
                    <BuyModal
                        finalPrice={finalPrice}
                        allowanceTrue={allowanceTrue}
                        handleApprove={handleApprove}
                        successFullUpload={successFullUpload}
                        successFullBuyModal={successFullBuyModal}
                        price={price}
                        initialCreator={offerData?.initialCreator}
                        handleSubmit={handleSubmit}
                        handleBuyModal={handleBuyModal}
                        name={name}
                        image={image}
                        selectedCurrency={currency.symbol}
                        selectedRoyalties={royalties}
                        tokenId={tokenId}
                        tokenData={tokenData}
                        formatTokenId={formatTokenId}
                    />
                </div>
            )}
        </>

    );
};

export default TokenPageContainer;
