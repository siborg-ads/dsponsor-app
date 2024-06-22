import {
  Web3Button,
  useAddress,
  useBalance,
  useContract,
  useContractRead,
  useContractWrite,
  useStorageUpload
} from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { use, useEffect, useRef, useState } from "react";
import "tippy.js/dist/tippy.css";
import Meta from "../../components/Meta.jsx";
import PreviewModal from "../../components/modal/previewModal.jsx";
import Step1Mint from "../../components/sliderForm/PageMint/Step_1_Mint.jsx";
import Step2Mint from "../../components/sliderForm/PageMint/Step_2_Mint.jsx";
import Step3Mint from "../../components/sliderForm/PageMint/Step_3_Mint.jsx";
import SliderForm from "../../components/sliderForm/sliderForm.jsx";
import styles from "../../styles/createPage/style.module.scss";
import Timer from "../../components/item/Timer.jsx";

import { getCookie } from "cookies-next";
import { ItemsTabs } from "../../components/component.js";

import BuyModal from "../../components/modal/buyModal.jsx";

import { toast } from "react-toastify";
import OfferSkeleton from "../../components/skeleton/offerSkeleton.jsx";

import { Divider } from "@nextui-org/react";
import Validation from "../../components/offer-section/validation.jsx";

import ItemBids from "../../components/item/ItemBids.jsx";
import ItemManage from "../../components/item/ItemManage.jsx";
import { useSwitchChainContext } from "../../contexts/hooks/useSwitchChainContext.js";
import { fetchOfferToken } from "../../providers/methods/fetchOfferToken.js";
// import { fetchAllTokenListedByListingId } from "../../providers/methods/fetchAllTokenListedByListingId.js";
import config from "../../config/config.js";
import stringToUint256 from "../../utils/stringToUnit256.js";
import { formatUnits, getAddress, parseUnits } from "ethers/lib/utils";

import "react-toastify/dist/ReactToastify.css";
import ItemLastBids from "../../components/tables/ItemLastBids";
import { activated_features } from "../../data/activated_features.js";

const TokenPageContainer = () => {
  const router = useRouter();

  const offerId = router.query?.offerId;
  const tokenId = router.query?.tokenId;
  const chainId = router.query?.chainName;

  const [tokenIdString, setTokenIdString] = useState(null);
  const [offerData, setOfferData] = useState(null);
  const address = useAddress();
  const [isOwner, setIsOwner] = useState(false);
  const [firstSelectedListing, setFirstSelectedListing] = useState({});
  const [files, setFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [imageModal, setImageModal] = useState(false);
  const [link, setLink] = useState("");
  const [amountToApprove, setAmountToApprove] = useState(null);
  const [buyTokenEtherPrice, setBuyTokenEtherPrice] = useState(null);
  const [royalties, setRoyalties] = useState(null);
  const [errors, setErrors] = useState({});
  const [marketplaceListings, setMarketplaceListings] = useState([]);
  const [finalPrice, setFinalPrice] = useState(null);
  const [finalPriceNotFormatted, setFinalPriceNotFormatted] = useState(null);
  const [successFullUpload, setSuccessFullUpload] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [validate, setValidate] = useState(false);
  const [currency, setCurrency] = useState(null);
  const [, setAdStatut] = useState(null);
  const [offerNotFormated] = useState(false);
  const [price, setPrice] = useState(null);
  const [buyModal, setBuyModal] = useState(false);
  const [buyMethod, setBuyMethod] = useState(false);
  const [feesAmount, setFeesAmount] = useState(null);
  const [imageUrlVariants, setImageUrlVariants] = useState([]);
  const [submitAdFormated, setSubmitAdFormated] = useState({});
  const [tokenData, setTokenData] = useState(null);
  const [tokenMetaData, setTokenMetaData] = useState("");
  const [allowanceTrue, setAllowanceTrue] = useState(false);
  const [adParameters, setAdParameters] = useState([]);
  const [imageURLSteps, setImageURLSteps] = useState([]);
  const [isValidId, setIsValidId] = useState(true);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const stepsRef = useRef([]);
  const [numSteps, setNumSteps] = useState(2);
  const [tokenStatut, setTokenStatut] = useState(null);
  const [tokenCurrencyAddress, setTokenCurrencyAddress] = useState(null);
  const [, setTokenBigIntPrice] = useState(null);
  const [successFullBid, setSuccessFullBid] = useState(false);
  const [isTokenInAuction, setIsTokenInAuction] = useState(false);
  const [successFullListing, setSuccessFullListing] = useState(false);
  const [buyoutPriceAmount] = useState(null);
  const [royaltiesFeesAmount, setRoyaltiesFeesAmount] = useState(null);
  const [bidsAmount, setBidsAmount] = useState(null);
  const [currencyDecimals, setCurrencyDecimals] = useState(null);
  const [isLister, setIsLister] = useState(false);
  const [, setSelectedItems] = useState([]);
  const [bids, setBids] = useState([]);
  const [insufficentBalance, setInsufficentBalance] = useState(false);
  const [canPayWithNativeToken, setCanPayWithNativeToken] = useState(false);

  const [offerDO, setOfferDO] = useState({
    offerId: null
  });
  const [tokenDO, setTokenDO] = useState({
    // Required
    tokenId: null,
    currency: null,
    tokenData: null,

    price: null,
    fee: null,

    royalties: null
  });

  const [userDO, setUserDO] = useState({
    address: address
  });

  useEffect(() => {
    if (address !== userDO.address) {
      setUserDO({
        address: address
      });
    }
  }, [address, userDO]);

  const { contract: DsponsorAdminContract } = useContract(
    config[chainId]?.smartContracts?.DSPONSORADMIN?.address,
    config[chainId]?.smartContracts?.DSPONSORADMIN?.abi
  );
  const { contract: DsponsorNFTContract } = useContract(offerData?.nftContract?.id);
  const { mutateAsync: uploadToIPFS } = useStorageUpload();
  const { mutateAsync: mintAndSubmit } = useContractWrite(DsponsorAdminContract, "mintAndSubmit");
  const { mutateAsync: submitAd } = useContractWrite(DsponsorAdminContract, "submitAdProposals");
  const { contract: tokenContract } = useContract(tokenCurrencyAddress, "token");
  const { data: tokenBalance } = useBalance(tokenCurrencyAddress);
  const { mutateAsync: approve } = useContractWrite(tokenContract, "approve");

  const { data: isAllowedToMint } = useContractRead(
    DsponsorNFTContract,
    "tokenIdIsAllowedToMint",
    tokenIdString
  );
  const { data: isUserOwner } = useContractRead(DsponsorNFTContract, "ownerOf", [tokenIdString]);

  const { contract: dsponsorMpContract } = useContract(
    config[chainId]?.smartContracts?.DSPONSORMP?.address
  );
  const { mutateAsync: directBuy } = useContractWrite(dsponsorMpContract, "buy");
  const { setSelectedChain } = useSwitchChainContext();

  const now = Math.floor(new Date().getTime() / 1000);

  const { data: nativeTokenBalance } = useBalance();

  // referralAddress is the address of the ?_rid= parameter in the URL
  const referralAddress = getCookie("_rid") || "";

  useEffect(() => {
    const fetchBuyEtherPrice = async () => {
      const finalPriceDecimals = BigNumber.from(finalPriceNotFormatted.toString());

      const tokenEtherPrice = await fetch(
        `https://relayer.dsponsor.com/api/${chainId}/prices?token=${tokenCurrencyAddress}&amount=${finalPriceDecimals}&slippage=0.3`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
        .catch((error) => {
          return error;
        });

      const tokenEtherPriceDecimals = formatUnits(tokenEtherPrice?.amountInEthWithSlippage, 18);

      setBuyTokenEtherPrice(tokenEtherPriceDecimals);
    };

    if (finalPriceNotFormatted && finalPriceNotFormatted > 0 && chainId) {
      fetchBuyEtherPrice();
    }
  }, [finalPriceNotFormatted, chainId, tokenCurrencyAddress, currencyDecimals]);

  useEffect(() => {
    if (offerId && tokenId && chainId) {
      const fetchAdsOffers = async () => {
        const offer = await fetchOfferToken(offerId, tokenId, chainId);

        const combinedData = {
          ...offer
        };
        console.log("combinedData", combinedData);
        setOfferData(combinedData);
      };
      setSelectedChain(config[chainId]?.chainNameProvider);
      fetchAdsOffers();
    }

    setTokenIdString(tokenId?.toString());
  }, [
    offerId,
    tokenId,
    successFullUpload,
    successFullBid,
    successFullListing,
    address,
    chainId,
    setSelectedChain
  ]);

  useEffect(() => {
    if (offerData?.nftContract?.tokens.length > 0) {
      setMarketplaceListings(
        offerData?.nftContract?.tokens[0]?.marketplaceListings.sort((a, b) => b.id - a.id)
      );
    }
  }, [offerData]);

  useEffect(() => {
    let bids = [];

    if (marketplaceListings.length > 0) {
      marketplaceListings.map((listing) => {
        if (listing?.bids) {
          // bids is an array of arrays of bids + currency symbol and decimals
          // bids is [{bid1, currency, listing}, {bid2, currency, listing}] with currency = {symbol, decimals} and listing = {id, listingType}
          bids = [
            ...bids,
            ...listing.bids.map((bid) => ({
              bid: bid,
              currency: {
                contract: listing.currency,
                currencySymbol: listing.currencySymbol,
                currencyDecimals: listing.currencyDecimals
              },
              listing: {
                id: listing.id,
                listingType: listing.listingType
              }
            }))
          ];
        }
      });
    }

    // regroup by listing id so we have a final array of [[bid1, bid2], [bid3, bid4], ...] with currency = {symbol, decimals} and listing = {id, listingType}
    bids = bids.reduce((acc, bid) => {
      const listingIndex = acc.findIndex((listing) => listing[0].listing.id === bid.listing.id);
      if (listingIndex === -1) {
        acc.push([bid]);
      } else {
        acc[listingIndex].push(bid);
      }
      return acc;
    }, []);

    setBids(bids);
  }, [marketplaceListings]);

  useEffect(() => {
    if (!offerData) return;
    setOfferDO({
      offerId: offerId
    });
    setTokenDO({
      currency:
        offerData?.nftContract?.prices[0]?.currency ??
        offerData?.nftContract?.tokens[0]?.marketplaceListings[0]?.currency,
      tokenId: tokenId,
      tokenData: null,

      fee: offerData?.nftContract?.prices[0]?.protocolFeeAmount,
      price:
        offerData?.nftContract?.prices[0]?.amount ??
        offerData?.nftContract?.tokens[0]?.marketplaceListings[0]?.pricePerToken,
      protocolFeeBPS: offerData?.nftContract?.prices[0]?.protocolFeeBps,
      royaltiesBPS: offerData?.nftContract?.royalty.bps,

      isListed: offerData?.nftContract?.tokens[0]?.marketplaceListings[0]?.status === "CREATED",
      listingId: offerData?.nftContract?.tokens[0]?.marketplaceListings[0]?.id,
      minimalBidBps: offerData?.nftContract?.tokens[0]?.marketplaceListings[0]?.minimalBidBps,
      buyoutPricePerToken:
        offerData?.nftContract?.tokens[0]?.marketplaceListings[0]?.buyoutPricePerToken
    });

    if (
      !isOwner &&
      !offerNotFormated &&
      (offerData?.nftContract?.tokens[0]?.mint === null ||
        offerData?.nftContract?.tokens?.length <= 0) &&
      isAllowedToMint !== null &&
      offerData?.nftContract?.prices[0]?.currency
    ) {
      setTokenStatut("MINTABLE");
      setTokenCurrencyAddress(offerData?.nftContract?.prices[0]?.currency);
      // setTokenBigIntPrice(offerData?.nftContract?.prices[0]?.amount);
      setPrice(offerData?.nftContract?.prices[0]?.mintPriceStructureFormatted.creatorAmount);
      setFeesAmount(
        offerData?.nftContract?.prices[0]?.mintPriceStructureFormatted.protocolFeeAmount
      );
      setFinalPrice(offerData?.nftContract?.prices[0]?.mintPriceStructureFormatted.totalAmount);
      setFinalPriceNotFormatted(offerData?.nftContract?.prices[0]?.mintPriceStructure.totalAmount);
      setAmountToApprove(
        offerData?.nftContract?.prices[0]?.mintPriceStructure.totalAmount &&
          BigInt(offerData?.nftContract?.prices[0]?.mintPriceStructure.totalAmount)
      );
      setCurrency(offerData?.nftContract?.prices[0]?.currencySymbol);
      return;
    }
    if (offerData?.nftContract?.tokens[0]?.marketplaceListings[0]?.status === "CREATED") {
      if (offerData?.nftContract?.tokens[0]?.marketplaceListings[0]?.listingType === "Direct") {
        setTokenBigIntPrice(
          offerData?.nftContract?.tokens[0]?.marketplaceListings[0]?.buyoutPricePerToken
        );
        setTokenStatut("DIRECT");
        setPrice(
          offerData?.nftContract?.tokens[0]?.marketplaceListings[0]?.buyPriceStructureFormatted
            .listerBuyAmount
        );
        setFeesAmount(
          offerData?.nftContract?.tokens[0]?.marketplaceListings[0]?.buyPriceStructureFormatted
            .protocolFeeBuyAmount
        );
        setRoyaltiesFeesAmount(
          offerData?.nftContract?.tokens[0]?.marketplaceListings[0]?.buyPriceStructureFormatted
            .royaltiesBuyAmount
        );
        setFinalPrice(
          offerData?.nftContract?.tokens[0]?.marketplaceListings[0]?.buyPriceStructureFormatted
            .buyoutPricePerToken
        );
        setFinalPriceNotFormatted(
          offerData?.nftContract?.tokens[0]?.marketplaceListings[0]?.buyPriceStructure
            .buyoutPricePerToken
        );
        setAmountToApprove(
          BigInt(
            offerData?.nftContract?.tokens[0]?.marketplaceListings[0]?.buyPriceStructure
              .buyoutPricePerToken
          )
        );
      }
      if (offerData?.nftContract?.tokens[0]?.marketplaceListings[0]?.listingType === "Auction") {
        setTokenBigIntPrice(
          offerData?.nftContract?.tokens[0]?.marketplaceListings[0]?.bids[0]?.totalBidAmount
        );

        setPrice(
          offerData?.nftContract?.tokens[0]?.marketplaceListings[0]?.bidPriceStructureFormatted
            .minimalBidPerToken
        );
        setFeesAmount(
          offerData?.nftContract?.tokens[0]?.marketplaceListings[0]?.bidPriceStructureFormatted
            .protocolFeeAmount
        );
        setRoyaltiesFeesAmount(
          offerData?.nftContract?.tokens[0]?.marketplaceListings[0]?.bidPriceStructureFormatted
            .royaltyAmount
        );
        setFinalPrice(
          offerData?.nftContract?.tokens[0]?.marketplaceListings[0]?.bidPriceStructureFormatted
            .minimalBidPerToken
        );
        setFinalPriceNotFormatted(
          offerData?.nftContract?.tokens[0]?.marketplaceListings[0]?.bidPriceStructure
            .minimalBidPerToken
        );

        setAmountToApprove(
          BigInt(
            offerData?.nftContract?.tokens[0]?.marketplaceListings[0]?.bidPriceStructure
              .minimalBidPerToken
          )
        );
        if (offerData?.nftContract?.tokens[0]?.marketplaceListings[0]?.bids.length <= 0) {
          setTokenBigIntPrice(
            offerData?.nftContract?.tokens[0]?.marketplaceListings[0]?.reservePricePerToken
          );
        }
        setTokenStatut("AUCTION");
      }
      setCurrencyDecimals(
        offerData?.nftContract?.tokens[0]?.marketplaceListings[0]?.currencyDecimals
      );
      setTokenCurrencyAddress(offerData?.nftContract?.tokens[0]?.marketplaceListings[0]?.currency);
      setCurrency(offerData?.nftContract?.tokens[0]?.marketplaceListings[0]?.currencySymbol);
      return;
    }
    if (offerData?.nftContract?.tokens[0]?.marketplaceListings[0]?.status === "COMPLETED") {
      setTokenStatut("COMPLETED");
      setTokenCurrencyAddress(offerData?.nftContract?.prices[0]?.currency);
      setCurrency(offerData?.nftContract?.prices[0]?.currencySymbol);
      setCurrencyDecimals(offerData?.nftContract?.prices[0]?.currencyDecimals);
      return;
    }
    if (
      offerData?.nftContract?.tokens[0]?.mint !== null &&
      offerData?.nftContract?.tokens[0]?.marketplaceListings[0]?.length === 0
    ) {
      setTokenStatut("MINTED");
      setTokenCurrencyAddress(offerData?.nftContract?.prices[0]?.currency);
      setTokenBigIntPrice(offerData?.nftContract?.prices[0]?.amount);
    }
  }, [
    offerData,
    isAllowedToMint,
    isOwner,
    offerNotFormated,
    tokenId,
    successFullUpload,
    marketplaceListings,
    offerId
  ]);

  useEffect(() => {
    if (!isUserOwner || !marketplaceListings || !address) return;
    if (
      firstSelectedListing?.listingType === "Auction" &&
      firstSelectedListing?.status === "CREATED" &&
      address?.toLowerCase() === firstSelectedListing?.lister
    ) {
      setIsOwner(true);
      setIsTokenInAuction(true);
    }

    if (isUserOwner) {
      if (isUserOwner === address) {
        setIsOwner(true);
      }
    }
  }, [isUserOwner, address, marketplaceListings, firstSelectedListing]);

  useEffect(() => {
    if (!tokenId || !offerData) return;
    if (tokenId.length > 6) {
      const url = new URL(window.location.href);
      const tokenData = url.searchParams.get("tokenData");
      setTokenData(tokenData);
      let isValidId = false;
      if (tokenData) {
        const stringToUnit = stringToUint256(tokenData);

        if (BigInt(stringToUnit) === BigInt(tokenId)) {
          isValidId = true;
          setIsValidId(true);
        } else {
          setIsValidId(false);
        }
      }

      let tokenMetaData = {};
      if (offerData?.metadata.offer?.token_metadata && isValidId) {
        tokenMetaData.description = offerData.metadata.offer.token_metadata.description.replace(
          /{tokenData}/g,
          `${tokenData}`
        );
        tokenMetaData.image = offerData.metadata.offer.token_metadata.image.replace(
          /{tokenData}/g,
          `${tokenData}`
        );
        tokenMetaData.name = offerData.metadata.offer.token_metadata.name.replace(
          /{tokenData}/g,
          `${tokenData}`
        );
      }
      setTokenMetaData(tokenMetaData);
    }
  }, [tokenId, offerData, tokenData]);

  useEffect(() => {
    if (!offerData) return;
    setImageURLSteps([]);
    setNumSteps(2);
    const uniqueIds = new Set();
    for (const param of offerData.adParameters) {
      if (
        param.adParameter.id &&
        param.adParameter.id !== "xSpaceId" &&
        param.adParameter.id !== "xCreatorHandle"
      ) {
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
    const numSteps = 2;
    const totalNumSteps = numSteps + imageURLSteps.length;

    setImageURLSteps(imageURLSteps);
    setNumSteps(totalNumSteps);
  }, [offerData]);

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
    if (offerData?.nftContract?.royalty.bps)
      setRoyalties(offerData?.nftContract?.royalty.bps / 100);
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

  // amount to approve is Big Number
  const checkAllowance = async (amountToApprove) => {
    if (tokenCurrencyAddress !== "0x0000000000000000000000000000000000000000" && address) {
      let allowance;

      if ((tokenStatut === "DIRECT" || tokenStatut === "AUCTION") && tokenStatut !== "MINTABLE") {
        allowance = await tokenContract?.call("allowance", [
          address,
          config[chainId]?.smartContracts?.DSPONSORMP?.address
        ]);
      } else {
        allowance = await tokenContract?.call("allowance", [
          address,
          config[chainId]?.smartContracts?.DSPONSORADMIN?.address
        ]);
      }

      if (allowance && amountToApprove && allowance?.gte(amountToApprove)) {
        setAllowanceTrue(false);
        return false;
      }

      setAllowanceTrue(true);
      return true;
    }
  };

  const handleApprove = async () => {
    try {
      setIsLoadingButton(true);

      if (marketplaceListings.length > 0 && tokenStatut === "DIRECT") {
        await approve({
          args: [config[chainId]?.smartContracts?.DSPONSORMP?.address, amountToApprove]
        });
      } else if (tokenStatut === "AUCTION" && marketplaceListings.length > 0) {
        const bidsBigInt = ethers.utils.parseUnits(
          bidsAmount.toFixed(currencyDecimals).toString(),
          Number(currencyDecimals)
        );
        await approve({
          args: [config[chainId]?.smartContracts?.DSPONSORMP?.address, bidsBigInt.toString()]
        });
      } else {
        await approve({
          args: [config[chainId]?.smartContracts?.DSPONSORADMIN?.address, amountToApprove]
        });
      }
      setAllowanceTrue(false);
    } catch (error) {
      setIsLoadingButton(false);
      console.error(error);
      console.error("Approval failed:", error.message);
      throw new Error("Approval failed.");
    } finally {
      setIsLoadingButton(false);
    }
  };

  const handleBuySubmit = async () => {
    const finalPriceLocal = formatUnits(finalPriceNotFormatted.toString(), currencyDecimals);

    const hasEnoughBalance = checkUserBalance(tokenBalance, finalPriceLocal, currencyDecimals);

    if (!hasEnoughBalance && !canPayWithNativeToken) {
      console.error("Not enough balance to confirm checkout");
      throw new Error("Not enough balance to confirm checkout");
    }

    const hasEnoughBalanceForNative = checkUserBalance(nativeTokenBalance, buyTokenEtherPrice, 18);

    if (!hasEnoughBalanceForNative) {
      console.error("Not enough balance to confirm checkout");
      throw new Error("Not enough balance to confirm checkout");
    }

    const argsMintAndSubmit = {
      tokenId: tokenIdString,
      to: address,
      currency: offerData?.nftContract?.prices[0]?.currency,
      tokenData: tokenData ?? "",
      offerId: offerId,
      adParameters: [],
      adDatas: [],
      referralAdditionalInformation: referralAddress
    };

    const argsdirectBuy = {
      listingId: firstSelectedListing?.id,
      buyFor: address,
      quantity: 1,
      currency: firstSelectedListing?.currency,
      totalPrice: firstSelectedListing?.buyPriceStructure.buyoutPricePerToken,
      referralAdditionalInformation: referralAddress
    };
    try {
      setIsLoadingButton(true);

      const tokenEtherPriceBigNumber = parseUnits(buyTokenEtherPrice.toFixed(18).toString(), 18);

      const functionWithPossibleArgs =
        marketplaceListings.length <= 0 ? argsMintAndSubmit : argsdirectBuy;
      const argsWithPossibleOverrides =
        canPayWithNativeToken && insufficentBalance && hasEnoughBalanceForNative
          ? {
              args: [functionWithPossibleArgs],
              overrides: { value: tokenEtherPriceBigNumber }
            }
          : { args: [functionWithPossibleArgs] };

      if (marketplaceListings.length <= 0) {
        // address of the minter as referral
        argsWithPossibleOverrides.args[0].referralAdditionalInformation = referralAddress;
        await mintAndSubmit(argsWithPossibleOverrides).catch((error) => {
          console.error("Error while minting and submitting:", error);
          throw error;
        });
        setSuccessFullUpload(true);
        setIsOwner(true);
      } else {
        await directBuy(argsWithPossibleOverrides).catch((error) => {
          console.error("Error while buying:", error);
          throw error;
        });
        setSuccessFullUpload(true);
      }
    } catch (error) {
      console.error("Erreur de soumission du token:", error);
      setSuccessFullUpload(false);
      setIsLoadingButton(false);
      throw error;
    } finally {
      setIsLoadingButton(false);
    }
  };
  const handleSubmit = async () => {
    if (!buyMethod) {
      if (!validateInputs()) {
        return;
      }
    }
    // IPFS upload

    let uploadUrl = [];

    if (isOwner) {
      try {
        uploadUrl = await uploadToIPFS({
          data: [files[0]?.file],
          options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true }
        });
      } catch (error) {
        setIsLoadingButton(false);
        console.error("Erreur lors de l'upload à IPFS:", error);
        throw new Error("Upload to IPFS failed.");
      }
    }
    try {
      setIsLoadingButton(true);

      const argsAdSubmited = {
        offerId: submitAdFormated?.offerId,
        tokenId: submitAdFormated?.tokenId,
        adParameters: submitAdFormated?.params,
        data: [uploadUrl[0], link]
      };

      const functionWithPossibleArgs = Object.values(argsAdSubmited);

      await submitAd({ args: functionWithPossibleArgs });
      setSuccessFullUpload(true);
    } catch (error) {
      console.error("Erreur de soumission du token:", error);
      setSuccessFullUpload(false);
      setIsLoadingButton(false);
      throw error;
    } finally {
      setIsLoadingButton(false);
    }
  };

  const checkUserBalance = (tokenAddressBalance, priceToken, decimals) => {
    try {
      if (!tokenAddressBalance || !priceToken) {
        throw new Error("Invalid balance or price token");
      }

      const parsedTokenBalance = tokenAddressBalance?.value;

      if (!parsedTokenBalance) {
        throw new Error("Failed to parse token balance");
      }

      const priceTokenNumber = Number(priceToken);
      if (isNaN(priceTokenNumber)) {
        throw new Error("Invalid price token amount");
      }

      const parsedPriceToken = ethers.utils.parseUnits(
        priceTokenNumber.toFixed(decimals).toString(),
        Number(decimals)
      );

      return parsedTokenBalance.gte(parsedPriceToken);
    } catch (error) {
      toast.error("Error while checking user balance");
      console.error("Failed to fetch token balance:", error);
      throw Error("Failed to fetch token balance");
    }
  };

  function formatTokenId(str) {
    if (str?.length <= 6) {
      return str;
    }
    return str?.slice(0, 3) + "..." + str?.slice(-3);
  }

  const handleBuyModal = async () => {
    await checkAllowance(amountToApprove);
    setSuccessFullUpload(false);
    setBuyModal(!buyModal);
    setBuyMethod(true);
  };
  const handlePreviewModal = () => {
    setSuccessFullUpload(false);
    setShowPreviewModal(!showPreviewModal);
    validateInputs();
  };

  useEffect(() => {
    setFirstSelectedListing(marketplaceListings[0]);
  }, [marketplaceListings]);

  useEffect(() => {
    if (
      firstSelectedListing?.lister &&
      address &&
      marketplaceListings?.lister !== null &&
      marketplaceListings?.lister !== undefined &&
      address !== null &&
      address !== undefined
    ) {
      setIsLister(getAddress(firstSelectedListing?.lister) === getAddress(address));
    } else {
      setIsLister(false);
    }
  }, [marketplaceListings, address, firstSelectedListing]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".modal-content") === null) {
        setImageModal(false);
      }
    };

    if (imageModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [imageModal]);

  function shouldRenderManageTokenComponent() {
    const isAuction = firstSelectedListing?.listingType === "Auction";
    const isDirect = firstSelectedListing?.listingType === "Direct";
    const startTimePassed = firstSelectedListing?.startTime < now;
    const endTimeNotPassed = firstSelectedListing?.endTime > now;
    const isActive = startTimePassed && endTimeNotPassed;
    const isCreated = firstSelectedListing?.status === "CREATED";
    const isFinished = firstSelectedListing?.status === "COMPLETED";
    const isCancelled = firstSelectedListing?.status === "CANCELLED";
    const hasBids = firstSelectedListing?.bids?.length > 0;
    const isTokenMintable = tokenStatut === "MINTABLE";
    const isTokenSiborg = tokenStatut === "SIBORG";
    const isTokenStatusSpecial = isTokenMintable || isTokenSiborg;
    const isAuctionWithBids = isAuction && hasBids;
    const isListerOrOwnerAndEndDateFinishedOrNoBids =
      (isLister || isOwner) && (!endTimeNotPassed || !hasBids);
    const isListerOrOwnerAndStartDateNotPassed = (isLister || isOwner) && !startTimePassed;
    const auctionHasNotStarted = startTimePassed && isAuction && !hasBids;
    const isAllowedToMint = isTokenMintable && isOwner;

    const finalCondition =
      (isActive && isOwner && ((isAuction && !hasBids) || isDirect)) ||
      isAllowedToMint ||
      !endTimeNotPassed ||
      (isFinished && isOwner) ||
      (!endTimeNotPassed && isCreated && isAuction) ||
      (!startTimePassed && isAuction && isCreated) ||
      ((!isCreated || marketplaceListings?.length <= 0) && isOwner) ||
      (isDirect && (isLister || isOwner) && isCreated) ||
      isListerOrOwnerAndEndDateFinishedOrNoBids ||
      isListerOrOwnerAndStartDateNotPassed;

    const conditionsObject = {
      isAuction: isAuction,
      isDirect: isDirect,
      startTimePassed: startTimePassed,
      endTimeNotPassed: endTimeNotPassed,
      isActive: isActive,
      isCreated: isCreated,
      isFinished: isFinished,
      isCancelled: isCancelled,
      hasBids: hasBids,
      isTokenMintable: isTokenMintable,
      isTokenSiborg: isTokenSiborg,
      isTokenStatusSpecial: isTokenStatusSpecial,
      isAuctionWithBids: isAuctionWithBids,
      isListerOrOwnerAndEndDateFinishedOrNoBids: isListerOrOwnerAndEndDateFinishedOrNoBids,
      isListerOrOwnerAndStartDateNotPassed: isListerOrOwnerAndStartDateNotPassed,
      auctionHasNotStarted: auctionHasNotStarted,
      isOwner: isOwner,
      isLister: isLister
    };

    return { condition: finalCondition, conditionsObject: conditionsObject };
  }

  const successFullUploadModal = {
    title: "Submit ad",
    body: "Congratulations, you have proposed an ad. 🎉",
    subBody:
      "Ad assets submitted! They are now under review and awaiting validation by the offer creator.",
    buttonTitle: "Close",
    hrefButton: null
  };
  const successFullBuyModal = {
    title: "Checkout",
    body: "Congratulations, you purchased this ad space. 🎉",
    subBody: "Check your ad space in your profile page.",
    buttonTitle: "Manage Spaces",
    hrefButton: `/profile/${address}`
  };

  const metadata = {
    title: `Token || SiBorg Ads - The Web3 Monetization Solution`,
    keyword:
      "audience engagement, web3, creator economic, NFT, creator monetization, creator economy, creator token, creator coin, creator tokenization, creator economy",

    desc: "Explore the future of media monetization. SiBorg Ads decentralized platform offers tokenized advertising spaces for dynamic and sustainable media funding."
  };

  if (!offerData || offerData.length === 0) {
    return (
      <div>
        <OfferSkeleton />
      </div>
    );
  }

  if (!offerData) {
    return null;
  }

  const {
    description = "description not found",
    id = "1",
    image = "/images/gradient_creative.jpg",
    name = "Unnamed Ad Space"
  } = offerData?.metadata?.offer?.token_metadata &&
  Object.keys(offerData?.metadata?.offer?.token_metadata).length > 0
    ? tokenMetaData
    : offerData && offerData.metadata
      ? offerData.metadata.offer
      : undefined;

  return (
    <>
      <Meta {...metadata} />
      {/*  <!-- Item --> */}
      <section className="relative lg:mt-24 lg:pt-12  mt-24 pt-12 pb-8">
        <div className="mb-8 container flex justify-center flex-col items-center ">
          <div className=" flex justify-center ">
            <h1 className="text-jacarta-900 font-bold font-display mb-6 text-center text-5xl dark:text-white md:text-left lg:text-6xl xl:text-6xl">
              {isOwner && isValidId ? "Your Ad Space" : "Buy Ad Space"}{" "}
            </h1>
            {/* <span className={`ml-2 text-sm font-bold ${isOwner ? (adStatut === 0 ? "text-red" : adStatut === 1 ? "text-green" : adStatut === 2 ? "text-primaryPurple" : "hidden") : "hidden"}`}>
              {adStatut === 0 ? "Rejected" : adStatut === 1 ? "Accepted" : adStatut === 2 ? "Pending" : ""}
            </span> */}
          </div>
          {/* <p className={`${isOwner ? (adStatut === 0 ? "text-red" : adStatut === 1 ? "text-green" : adStatut === 2 ? "text-primaryPurple" : "hidden") : "hidden"} text-sm font-bold`}>
            {adStatut === 0 ? statutAds.rejected : adStatut === 1 ? statutAds.accepted : statutAds.pending}
          </p> */}
        </div>

        <div className="container">
          {/* <!-- Item --> */}

          <div className="md:flex md:flex-wrap" key={id}>
            {/* <!-- Image --> */}
            <figure className="mb-8 md:mb-0 md:w-2/5 md:flex-shrink-0 md:flex-grow-0 md:basis-auto lg:w-1/2 w-full flex justify-center relative">
              <button
                className=" w-full"
                onClick={() => setImageModal(true)}
                style={{ height: "450px" }}
              >
                <Image
                  width={585}
                  height={726}
                  src={image ?? "/images/gradient_creative.jpg"}
                  alt="image"
                  className="rounded-2xl cursor-pointer h-full object-contain w-full shadow-lg"
                />
              </button>

              {/* <!-- Modal --> */}
              <div className={imageModal ? "modal fade show block" : "modal fade"}>
                <div className="modal-dialog !my-0 flex h-full max-w-4xl items-center justify-center">
                  <Image
                    width={582}
                    height={722}
                    src={image ?? "/images/gradient_creative.jpg"}
                    alt="image"
                    className="h-full object-cover w-full rounded-2xl"
                  />
                </div>

                <button
                  type="button"
                  className="btn-close absolute top-6 right-6"
                  onClick={() => setImageModal(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-6 w-6 fill-white"
                  >
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
              <Link href={`/${chainId}/offer/${offerId}`} className="flex">
                <h2 className="font-display text-jacarta-900 mb-4 dark:hover:text-primaryPurple text-3xl font-semibold dark:text-white">
                  {name}
                </h2>
              </Link>

              <div className="mb-8 flex items-center gap-4 whitespace-nowrap flex-wrap">
                {currency &&
                  tokenStatut !== "MINTED" &&
                  (firstSelectedListing?.status === "CREATED" ||
                    marketplaceListings?.length <= 0) && (
                    <div className="flex items-center">
                      <span className="text-green text-sm font-medium tracking-tight mr-2">
                        {finalPrice} {currency}
                      </span>
                    </div>
                  )}
                <span className="dark:text-jacarta-100 text-jacarta-100 text-sm">
                  Space #{" "}
                  <strong className="dark:text-white">{tokenData ?? formatTokenId(tokenId)}</strong>{" "}
                </span>
                <span className="text-jacarta-100 block text-sm ">
                  Creator <strong className="dark:text-white">{royalties}% royalties</strong>
                </span>
                {offerData?.nftContract?.tokens[0]?.metadata?.valid_from && (
                  <span className="text-jacarta-100 text-sm flex flex-wrap gap-1">
                    Ownership period:{" "}
                    <strong className="dark:text-white">
                      {offerData?.nftContract?.tokens[0]?.metadata?.valid_from &&
                        (() => {
                          const date = new Date(
                            offerData?.nftContract?.tokens[0]?.metadata?.valid_from
                          );
                          return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()} at ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
                        })()}
                    </strong>{" "}
                    to{" "}
                    <strong className="dark:text-white">
                      {offerData?.nftContract?.tokens[0]?.metadata?.valid_to &&
                        new Date(
                          offerData?.nftContract?.tokens[0]?.metadata?.valid_to
                        ).toLocaleString()}
                    </strong>
                  </span>
                )}
              </div>

              <p className="dark:text-jacarta-100 mb-10">{description}</p>
              {(tokenStatut === "MINTABLE" ||
                (firstSelectedListing?.listingType === "Direct" &&
                  firstSelectedListing?.status === "CREATED" &&
                  firstSelectedListing?.startTime < now &&
                  firstSelectedListing?.endTime > now)) && (
                <div className="dark:bg-secondaryBlack dark:border-jacarta-600 mb-2 border-jacarta-100 rounded-2lg border flex flex-col gap-4 bg-white p-8">
                  <div className="sm:flex sm:flex-wrap flex-col gap-8">
                    {firstSelectedListing?.listingType === "Direct" && (
                      <div className="flex items-center justify-between gap-4 w-full">
                        <span className="js-countdown-ends-label text-base text-jacarta-100 dark:text-jacarta-100">
                          Direct listing ends in:
                        </span>
                        <Timer endTime={marketplaceListings[0].endTime} />
                      </div>
                    )}

                    <span className="dark:text-jacarta-100 text-jacarta-100 text-sm">
                      Buying the ad space give you the exclusive right to submit an ad. The media
                      still has the power to validate or reject ad assets. You re free to change the
                      ad at anytime. And free to resell on the open market your ad space.{" "}
                    </span>
                  </div>
                  <div className="w-full flex justify-center">
                    <Web3Button
                      contractAddress={
                        marketplaceListings.length > 0
                          ? config[chainId]?.smartContracts?.DSPONSORMP?.address
                          : config[chainId]?.smartContracts?.DSPONSORADMIN?.address
                      }
                      action={() => {
                        handleBuyModal();
                      }}
                      className={` !rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all  !bg-primaryPurple hover:!bg-opacity-80 !cursor-pointer `}
                    >
                      Buy
                    </Web3Button>
                  </div>
                </div>
              )}

              {firstSelectedListing?.status === "CREATED" &&
                firstSelectedListing?.listingType === "Auction" &&
                firstSelectedListing?.startTime >= now && (
                  <div className="dark:bg-secondaryBlack dark:border-jacarta-600 mb-2 border-jacarta-100 rounded-2lg border flex flex-col gap-4 bg-white p-8">
                    <div className="sm:flex sm:flex-wrap flex-col gap-8">
                      <div className="flex items-center justify-between gap-4 w-full">
                        <span className="js-countdown-ends-label text-base text-jacarta-100 dark:text-jacarta-100">
                          Auction will start in:
                        </span>
                        <Timer endTime={marketplaceListings[0].startTime} />
                      </div>
                    </div>
                  </div>
                )}

              {firstSelectedListing?.status === "CREATED" &&
                firstSelectedListing?.listingType === "Direct" &&
                firstSelectedListing?.startTime >= now && (
                  <div className="dark:bg-secondaryBlack dark:border-jacarta-600 mb-2 border-jacarta-100 rounded-2lg border flex flex-col gap-4 bg-white p-8">
                    <div className="sm:flex sm:flex-wrap flex-col gap-8">
                      <div className="flex items-center justify-between gap-4 w-full">
                        <span className="js-countdown-ends-label text-base text-jacarta-100 dark:text-jacarta-100">
                          Direct listing will start in:
                        </span>
                        <Timer endTime={marketplaceListings[0].startTime} />
                      </div>
                    </div>
                  </div>
                )}

              <ItemManage
                successFullListing={successFullListing}
                setSuccessFullListing={setSuccessFullListing}
                dsponsorNFTContract={DsponsorNFTContract}
                offerData={offerData}
                marketplaceListings={marketplaceListings}
                royalties={royalties}
                dsponsorMpContract={dsponsorMpContract}
                conditions={shouldRenderManageTokenComponent().conditionsObject}
              />

              {firstSelectedListing?.listingType === "Auction" &&
                firstSelectedListing.startTime < now &&
                firstSelectedListing.endTime > now &&
                firstSelectedListing?.status === "CREATED" && (
                  <ItemBids
                    setAmountToApprove={setAmountToApprove}
                    bidsAmount={bidsAmount}
                    setBidsAmount={setBidsAmount}
                    chainId={chainId}
                    checkUserBalance={checkUserBalance}
                    price={price}
                    allowanceTrue={allowanceTrue}
                    checkAllowance={checkAllowance}
                    handleApprove={handleApprove}
                    dsponsorMpContract={dsponsorMpContract}
                    marketplaceListings={marketplaceListings}
                    currencySymbol={currency}
                    tokenBalance={tokenBalance}
                    currencyTokenDecimals={currencyDecimals}
                    setSuccessFullBid={setSuccessFullBid}
                    successFullBid={successFullBid}
                    address={address}
                    isLoadingButton={isLoadingButton}
                    setIsLoadingButton={setIsLoadingButton}
                    token={tokenDO}
                    user={{
                      address: address,
                      isOwner: isOwner,
                      isLister: isLister,
                      isUserOwner: isUserOwner
                    }}
                    offer={offerDO}
                    referrer={{
                      address: referralAddress
                    }}
                    currencyContract={tokenCurrencyAddress}
                  />
                )}
            </div>
          </div>
        </div>
      </section>

      {bids &&
        bids.filter((listing) =>
          listing.map((bid) => {
            bid.listing.listingType === "Auction";
          })
        ).length > 0 && (
          <div className="container mb-12">
            <Divider className="my-4" />
            <ItemLastBids bids={bids} />
          </div>
        )}

      {/* <!-- end item --> */}
      <div className="container mb-12">
        <Divider className="my-4" />
        <h2 className="text-jacarta-900 font-bold font-display mb-6 text-center text-3xl dark:text-white ">
          Details{" "}
        </h2>
        <ItemsTabs
          chainId={chainId}
          contractAddress={offerData?.nftContract.id}
          offerId={offerId}
          isUserOwner={isUserOwner}
          initialCreator={offerData?.initialCreator}
          status={firstSelectedListing?.status}
          listerAddress={firstSelectedListing?.lister}
          offerData={offerData}
        />
      </div>
      {offerData.nftContract?.tokens[0]?.mint &&
        isValidId &&
        activated_features.canSeeSubmittedAds && (
          <Validation
            offer={offerData}
            offerId={offerId}
            isOwner={isOwner}
            isToken={true}
            successFullUploadModal={successFullUploadModal}
            isLister={isLister}
            setSelectedItems={setSelectedItems}
          />
        )}
      {/* <ItemsTabs /> */}
      <div>
        {isOwner && activated_features.canSeeSubmittedAds && isValidId ? (
          <div className="container">
            <Divider className="my-4" />
            <h2 className="text-jacarta-900 font-bold font-display mb-6 text-center text-3xl dark:text-white ">
              Submission{" "}
            </h2>
            {isTokenInAuction && (
              <div className="text-center w-full">
                <span className="dark:text-warning text-md ">
                  ⚠️ You cannot submit an ad while your token is in auction
                </span>
              </div>
            )}
            {!isTokenInAuction && (
              <SliderForm
                styles={styles}
                handlePreviewModal={handlePreviewModal}
                stepsRef={stepsRef}
                numSteps={numSteps}
              >
                <Step1Mint
                  stepsRef={stepsRef}
                  styles={styles}
                  adParameters={adParameters}
                  setImageUrlVariants={setImageUrlVariants}
                />
                <Step2Mint stepsRef={stepsRef} styles={styles} setLink={setLink} link={link} />
                {imageURLSteps.map((id, index) => (
                  <Step3Mint
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
            )}
          </div>
        ) : (
          <div className="flex justify-center">
            <p>
              {!isValidId
                ? "Sorry, tokenId unavailable, please provide a tokenId valid"
                : offerNotFormated
                  ? ""
                  : offerData.nftContract?.tokens === 0
                    ? "Sorry, tokenId unavailable, please provide a tokenId valid "
                    : ""}
            </p>
          </div>
        )}
      </div>

      {showPreviewModal && (
        <div className="modal fade show bloc">
          <PreviewModal
            handlePreviewModal={handlePreviewModal}
            handleSubmit={handleSubmit}
            imageUrlVariants={imageUrlVariants}
            link={link}
            name={true}
            description={true}
            previewImage={previewImages}
            imageURLSteps={imageURLSteps}
            errors={errors}
            successFullUpload={successFullUpload}
            validate={validate}
            buttonTitle="Submit ad"
            modalTitle="Ad Space Preview"
            successFullUploadModal={successFullUploadModal}
            isLoadingButton={isLoadingButton}
          />
        </div>
      )}
      {buyModal && (
        <div className="modal fade show block">
          <BuyModal
            finalPrice={finalPrice}
            finalPriceNotFormatted={finalPriceNotFormatted}
            tokenStatut={tokenStatut}
            allowanceTrue={allowanceTrue}
            handleApprove={handleApprove}
            successFullUpload={successFullUpload}
            feesAmount={feesAmount}
            successFullBuyModal={successFullBuyModal}
            buyoutPriceAmount={buyoutPriceAmount}
            royaltiesFeesAmount={royaltiesFeesAmount}
            price={price}
            initialCreator={offerData?.initialCreator}
            handleSubmit={handleBuySubmit}
            handleBuyModal={handleBuyModal}
            handleBuySubmitWithNative={handleBuySubmit}
            name={name}
            marketplaceListings={marketplaceListings}
            image={image ?? ""}
            selectedCurrency={currency}
            royalties={royalties}
            tokenId={tokenId}
            tokenData={tokenData}
            formatTokenId={formatTokenId}
            isLoadingButton={isLoadingButton}
            address={address}
            insufficentBalance={insufficentBalance}
            setInsufficentBalance={setInsufficentBalance}
            canPayWithNativeToken={canPayWithNativeToken}
            setCanPayWithNativeToken={setCanPayWithNativeToken}
            token={tokenDO}
            buyTokenEtherPrice={buyTokenEtherPrice}
            user={{
              address: address,
              isOwner: isOwner,
              isLister: isLister,
              isUserOwner: isUserOwner
            }}
            offer={offerDO}
            referrer={{
              address: referralAddress
            }}
            currencyContract={tokenCurrencyAddress}
            chainId={chainId}
            nativeTokenBalance={nativeTokenBalance}
          />
        </div>
      )}
    </>
  );
};

export default TokenPageContainer;
