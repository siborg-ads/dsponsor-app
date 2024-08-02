import {
  Web3Button,
  useAddress,
  useBalance,
  useContract,
  useContractRead,
  useContractWrite,
  useStorageUpload
} from "@thirdweb-dev/react";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { BigNumber, ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Spinner } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import "tippy.js/dist/tippy.css";
import Meta from "../../components/Meta.jsx";
import PreviewModal from "../../components/modal/previewModal.jsx";
import Step1Mint from "../../components/sliderForm/PageMint/Step_1_Mint.jsx";
import Step2Mint from "../../components/sliderForm/PageMint/Step_2_Mint.jsx";
import Step3Mint from "../../components/sliderForm/PageMint/Step_3_Mint.jsx";
import ModalHelper from "../../components/Helper/modalHelper";
import SliderForm from "../../components/sliderForm/sliderForm.jsx";
import styles from "../../styles/createPage/style.module.scss";
import Timer from "../../components/item/Timer.jsx";
import { fetchTokenPageContainer } from "../../providers/methods/fetchTokenPageContainer";
import ItemLastestSales from "../../components/tables/ItemLastestSales.jsx";

import { getCookie } from "cookies-next";
import { ItemsTabs } from "../../components/component.js";

import BuyModal from "../../components/modal/buyModal.jsx";

import { toast } from "react-toastify";
import OfferSkeleton from "../../components/skeleton/offerSkeleton.jsx";

import Validation from "../../components/offer-section/validation.jsx";

import ItemBids from "../../components/item/ItemBids.jsx";
import ItemManage from "../../components/item/ItemManage.jsx";
import { useSwitchChainContext } from "../../contexts/hooks/useSwitchChainContext.js";
import config from "../../config/config.js";
import stringToUint256 from "../../utils/stringToUnit256.js";
import { formatUnits, getAddress, parseUnits } from "ethers/lib/utils";

import "react-toastify/dist/ReactToastify.css";
import ItemLastBids from "../../components/tables/ItemLastBids";
import { activated_features } from "../../data/activated_features.js";
import { useChainContext } from "../../contexts/hooks/useChainContext.js";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import InfoIcon from "../../components/informations/infoIcon.jsx";
import Disable from "../../components/disable/disable.jsx";
import Input from "../../components/ui/input";
import { useSearchParams } from "next/navigation.js";
import { addLineBreaks } from "../../utils/addLineBreaks.js";
import formatAndRoundPrice from "../../utils/formatAndRound.js";
import TransactionFailedModal from "../../components/modal/failModal.jsx";

const TokenPageContainer = () => {
  const router = useRouter();

  const { currentChainObject } = useChainContext();
  const offerId = router.query?.offerId;
  const tokenId = router.query?.tokenId;
  const chainId = currentChainObject?.chainId;

  const [isLoadingAirdropButton, setIsLoadingAirdropButton] = useState(false);
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
  const [tokenEtherPriceRelayer, setTokenEtherPriceRelayer] = useState(null);
  const [royalties, setRoyalties] = useState(null);
  const [errors, setErrors] = useState({});
  const [marketplaceListings, setMarketplaceListings] = useState([]);
  const [refusedValidatedAdModal, setRefusedValidatedAdModal] = useState(null);
  const [successFullRefuseModal, setSuccessFullRefuseModal] = useState(false);
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
  const [bidsAmount, setBidsAmount] = useState("");
  const [currencyDecimals, setCurrencyDecimals] = useState(null);
  const [isLister, setIsLister] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [bids, setBids] = useState([]);
  const [insufficentBalance, setInsufficentBalance] = useState(false);
  const [canPayWithNativeToken, setCanPayWithNativeToken] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemProposals, setItemProposals] = useState(null);
  const [mediaShouldValidateAnAd, setMediaShouldValidateAnAd] = useState(false);
  const [airdropContainer, setAirdropContainer] = useState(true);
  const [tokenEtherPrice, setTokenEtherPrice] = useState(null);
  const [amountInEthWithSlippage, setAmountInEthWithSlippage] = useState(null);
  const [displayedPrice, setDisplayedPrice] = useState(null);
  const [isOfferOwner, setIsOfferOwner] = useState(false);
  const [
    sponsorHasAtLeastOneRejectedProposalAndNoPending,
    setSponsorHasAtLeastOneRejectedProposalAndNoPending
  ] = useState(false);
  const [offers, setOffers] = useState(null);
  const [isMedia, setIsMedia] = useState(false);
  const [sales, setSales] = useState([]);
  const [minted, setMinted] = useState(false);
  const [conditions, setConditions] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const [accordionActiveTab, setAccordionActiveTab] = useState([]);
  const [listingCreated, setListingCreated] = useState(false);
  const [creatorAmount, setCreatorAmount] = useState(null);
  const [protocolFeeAmount, setProtocolFeeAmount] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [listerAmount, setListerAmount] = useState(null);
  const [royaltiesAmount, setRoyaltiesAmount] = useState(null);
  const [airdropAddress, setAirdropAddress] = useState(undefined);
  const [nftContractAddress, setNftContractAddress] = useState(null);
  const [showEntireDescription, setShowEntireDescription] = useState(false);
  const [failedCrossmintTransaction, setFailedCrossmintTransaction] = useState(false);

  const searchParams = useSearchParams();
  const payload = searchParams.get("p");
  const mintCollectionId = process.env.NEXT_PUBLIC_MINT_COLLECTION_ID;
  const buyCollectionId = process.env.NEXT_PUBLIC_BUY_COLLECTION_ID;
  const bidCollectionId = process.env.NEXT_PUBLIC_BID_COLLECTION_ID;

  useEffect(() => {
    // TODO get token data from callback url
    if (payload) {
      if (payload?.status === "success") {
        const collectionId = payload?.collectionId;

        if (collectionId === mintCollectionId) {
          setSuccessFullUpload(true);
          setIsOwner(true);
          setMinted(true);
        } else if (collectionId === buyCollectionId) {
          setSuccessFullUpload(true);
        } else if (collectionId === bidCollectionId) {
          setSuccessFullBid(true);
        }
      } else if (payload?.status === "failure") {
        setFailedCrossmintTransaction(true);
      }
    }
  }, [bidCollectionId, buyCollectionId, mintCollectionId, payload]);

  let description = "description not found";
  let id = "1";
  let image = "/images/gradient_creative.jpg";
  let name = "Unnamed Ad Space";

  if (offerData?.metadata?.offer) {
    const embeddedTokenMetaData = offerData?.metadata?.offer?.token_metadata;
    if (tokenMetaData && Object.keys(tokenMetaData).length > 0) {
      description = tokenMetaData.description;
      id = tokenMetaData.id;
      image = tokenMetaData.image;
      name = tokenMetaData.name;
    } else if (embeddedTokenMetaData && Object.keys(embeddedTokenMetaData).length > 0) {
      description = embeddedTokenMetaData?.description;
      id = embeddedTokenMetaData?.id;
      image = embeddedTokenMetaData?.image;
      name = embeddedTokenMetaData?.name;
    } else {
      description = offerData?.metadata?.offer?.description;
      id = offerData?.metadata?.offer?.id;
      image = offerData?.metadata?.offer?.image;
      name = offerData?.metadata?.offer?.name;
    }
  }

  useEffect(() => {
    const fetchImage = async (image) => {
      // get url image instead of ipfs:// starting url
      if (image && image.startsWith("ipfs://")) {
        const storage = new ThirdwebStorage({ clientId: "6f375d41f2a33f1f08f6042a65d49ec9" });
        const ipfsUrl = await storage.resolveScheme(image);
        setImageUrl(ipfsUrl);
      } else {
        setImageUrl(image);
      }
    };

    if (image) {
      fetchImage(image);
    } else {
      setImageUrl(null);
    }
  }, [image]);

  const fetchOffersRef = useRef(false);

  useEffect(() => {
    const fetchOffers = async () => {
      if (fetchOffersRef.current) return;
      fetchOffersRef.current = true;

      try {
        const offers = await fetchTokenPageContainer(chainId, offerId, tokenId);
        setOffers(offers);

        // check if we have the values
        if (!offerId) return;
        if (!offers) return;

        // set offer data for the current offer
        const currentOffer = offers?.find((offer) => Number(offer?.id) === Number(offerId));
        setOfferData(currentOffer);
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        fetchOffersRef.current = false;
      }
    };

    if (chainId && offerId) {
      fetchOffers();
    }
  }, [address, chainId, offerId, tokenId]);

  useEffect(() => {
    if (offerData && address) {
      // set if the user is the media or not
      if (offerData && address) {
        const isMedia = offerData?.admins?.includes(address.toLowerCase());
        setIsMedia(isMedia);
      } else {
        setIsMedia(false);
      }
    } else {
      setIsMedia(false);
    }
  }, [address, offerData]);

  useEffect(() => {
    if (offers) {
      // we want to get all the proposals for the current item (accept, reject, pending, all)
      // for that we filter the offers to match the offer with the current offer that contains the current item
      const itemOffer = offers?.find((offer) => offer?.id === offerId);

      // itemOffers is an item that contains nftContract which contains tokens that contains the tokenId
      // we need to get the token item from the tokens array where the tokenId matches the current item tokenId
      const tokenOffers = itemOffer?.nftContract?.tokens?.find(
        (token) => !!token?.tokenId && tokenId && BigInt(token?.tokenId) === BigInt(tokenId)
      );

      // then we get the proposals for the current item
      // we get the accepted, pending, rejected and all proposals
      // token offers has a "all proposals" key that contains all the proposals
      // we filter the proposals to get the accepted, pending and rejected proposals
      // for that we can use the status key of the proposal "CURRENT_ACCEPTED", "CURRENT_PENDING", "CURRENT_REJECTED"
      const allProposals = tokenOffers?.allProposals;
      const acceptedProposals = allProposals?.filter(
        (proposal) => proposal?.status === "CURRENT_ACCEPTED"
      );
      const pendingProposals = allProposals?.filter(
        (proposal) => proposal?.status === "CURRENT_PENDING"
      );
      const rejectedProposals = allProposals?.filter(
        (proposal) => proposal?.status === "CURRENT_REJECTED"
      );

      const itemProposals = {
        name: name ?? "",
        pendingProposals,
        rejectedProposals,
        acceptedProposals,
        allProposals
      };

      setItemProposals(itemProposals);
    }
  }, [name, offerId, offers, tokenId]);

  useEffect(() => {
    if (!itemProposals) return;
    // now we want to check one thing from the sponsor side and one thing from the media side
    // we want to check if the sponsor has at least one rejected proposal and no pending proposal
    // we want to check if the media should validate an ad or not (i.e. if the media has at least one pending proposal)

    // we check if the sponsor has only rejected proposals
    const sponsorHasAtLeastOneRejectedProposal = itemProposals?.rejectedProposals?.length > 0;
    const sponsorHasNoPendingProposal = itemProposals?.pendingProposals?.length === 0;
    const lastAcceptedProposalTimestamp =
      parseFloat(
        itemProposals?.acceptedProposals?.sort(
          (a, b) => b?.creationTimestamp - a?.creationTimestamp
        )[0]?.lastUpdateTimestamp
      ) * 1000;
    const lastRefusedProposalTimestamp =
      parseFloat(
        itemProposals?.rejectedProposals?.sort(
          (a, b) => b?.creationTimestamp - a?.creationTimestamp
        )[0]?.lastUpdateTimestamp
      ) * 1000;
    const sponsorHasNoMoreRecentValidatedProposal =
      new Date(lastAcceptedProposalTimestamp) <= new Date(lastRefusedProposalTimestamp);

    setSponsorHasAtLeastOneRejectedProposalAndNoPending(
      sponsorHasAtLeastOneRejectedProposal &&
        sponsorHasNoPendingProposal &&
        sponsorHasNoMoreRecentValidatedProposal
    );

    // now we check if the media should validate an ad
    const mediaShouldValidateAnAd = itemProposals?.pendingProposals?.length > 0;
    setMediaShouldValidateAnAd(mediaShouldValidateAnAd);
  }, [itemProposals]);

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

  const [debouncedBidsAmount, setDebouncedBidsAmount] = useState(bidsAmount);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedBidsAmount(bidsAmount);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [bidsAmount]);

  useEffect(() => {
    const fetchBuyEtherPrice = async () => {
      try {
        let amount = 0;
        if (currencyDecimals && debouncedBidsAmount) {
          amount = ethers.utils.parseUnits(debouncedBidsAmount, Number(currencyDecimals));
        }

        const tokenEtherPrice = await fetch(
          `https://relayer.dsponsor.com/api/${chainId}/prices?token=${tokenCurrencyAddress}&amount=${amount?.toString()}&slippage=0.3`,
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
          });

        setTokenEtherPriceRelayer(tokenEtherPrice);
      } catch (error) {
        console.error(error);
      }
    };

    if (chainId && tokenCurrencyAddress && currencyDecimals && debouncedBidsAmount) {
      fetchBuyEtherPrice();
    }
  }, [chainId, currencyDecimals, tokenCurrencyAddress, debouncedBidsAmount]);

  useEffect(() => {
    if (tokenEtherPriceRelayer) {
      const tokenEtherPriceDecimals = formatUnits(
        tokenEtherPriceRelayer?.amountInEthWithSlippage,
        18
      );
      const amountInEthWithSlippageBN = ethers.BigNumber.from(
        tokenEtherPriceRelayer?.amountInEthWithSlippage
      );

      setBuyTokenEtherPrice(tokenEtherPriceDecimals);
      setAmountInEthWithSlippage(amountInEthWithSlippageBN);
      setTokenEtherPrice(ethers.utils.formatUnits(amountInEthWithSlippageBN, 18));
    }

    if (bidsAmount && currencyDecimals && tokenEtherPriceRelayer) {
      const amountUSDC = tokenEtherPriceRelayer?.amountUSDC;
      console.log(amountUSDC);
      const priceToDisplay = formatUnits(amountUSDC, 6);

      setDisplayedPrice(formatAndRoundPrice(priceToDisplay));
    } else {
      setDisplayedPrice(0);
    }
  }, [bidsAmount, currencyDecimals, tokenEtherPriceRelayer]);

  useEffect(() => {
    if (chainId) {
      setSelectedChain(config[chainId]?.network);
    }
  }, [chainId, setSelectedChain]);

  useEffect(() => {
    setTokenIdString(tokenId?.toString());
  }, [tokenId]);

  useEffect(() => {
    if (successFullBid && offers) {
      const fetchUpdatedData = () => {
        const offer = offers?.find((offer) => Number(offer?.id) === Number(offerId));
        const combinedData = { ...offer };

        setOfferData(combinedData);
        setBidsAmount("");
      };

      if (chainId && offerId) {
        fetchUpdatedData();
      }
    }
  }, [successFullBid, offerId, tokenId, chainId, offers]);

  useEffect(() => {
    if (listingCreated && offers) {
      const fetchUpdatedData = () => {
        const offer = offers?.find((offer) => Number(offer?.id) === Number(offerId));
        const combinedData = { ...offer };

        setOfferData(combinedData);
      };

      if (chainId && offerId) {
        fetchUpdatedData();
      }
    }
  }, [listingCreated, offerId, tokenId, chainId, offers]);

  useEffect(() => {
    if (offerData?.nftContract?.tokens.length > 0 && tokenId) {
      setMarketplaceListings(
        offerData?.nftContract?.tokens
          ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
          ?.marketplaceListings.sort((a, b) => b.id - a.id)
      );
    }
  }, [offerData, tokenId]);

  useEffect(() => {
    let bids = [];

    if (marketplaceListings?.length > 0) {
      marketplaceListings?.map((listing) => {
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
    const fetchSalesData = async () => {
      let sales = [];

      if (marketplaceListings?.length > 0) {
        for (const listing of marketplaceListings) {
          let saleInfo;
          const auction = listing?.listingType === "Auction" && listing?.status === "COMPLETED";
          const direct = listing?.listingType === "Direct" && listing?.status === "COMPLETED";

          if (auction) {
            let winnerBid;
            if (listing?.bids) {
              const sortedBids = listing?.bids?.sort(
                (a, b) =>
                  new Date(b?.creationTimestamp * 1000) - new Date(a?.creationTimestamp * 1000)
              );
              winnerBid = sortedBids[0];
            }

            saleInfo = {
              address: winnerBid?.bidder,
              amount: winnerBid?.paidBidAmount
                ? formatUnits(BigInt(winnerBid?.paidBidAmount), listing?.currencyDecimals)
                : 0,
              date: winnerBid?.creationTimestamp,
              currency: {
                contract: listing?.currency,
                currencySymbol: listing?.currencySymbol,
                currencyDecimals: listing?.currencyDecimals
              },
              listing: {
                id: listing?.id,
                listingType: listing?.listingType
              }
            };
          }

          if (direct) {
            try {
              if (!offerData || !tokenId) return;

              const tokenData = offerData?.nftContract?.tokens?.find(
                (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId)
              );

              if (tokenData) {
                // need to match listing id and direct buys listing id
                const listingTokenData = tokenData?.marketplaceListings?.find(
                  (marketplaceListing) => Number(listing?.id) === Number(marketplaceListing?.id)
                );

                const directBuy = listingTokenData?.directBuys[0]; // only one direct buy per listing so we can take the first one

                const smartContracts = currentChainObject?.smartContracts;
                const targetAddress = listing?.currency;

                let tempCurrency = null;

                if (smartContracts) {
                  for (const key in smartContracts) {
                    if (
                      smartContracts[key]?.address?.toLowerCase() === targetAddress?.toLowerCase()
                    ) {
                      tempCurrency = smartContracts[key];
                      break;
                    }
                  }
                }

                saleInfo = {
                  address: directBuy?.buyer,
                  amount: directBuy?.totalPricePaid
                    ? formatUnits(BigInt(directBuy?.totalPricePaid), tempCurrency?.decimals)
                    : 0,
                  date: directBuy?.revenueTransaction?.blockTimestamp,
                  currency: {
                    contract: listing?.currency,
                    currencySymbol: tempCurrency?.symbol,
                    currencyDecimals: tempCurrency?.decimals
                  },
                  listing: {
                    id: directBuy?.listing?.id,
                    listingType: directBuy?.listing?.listingType
                  }
                };
              } else {
                console.error("Token data or mint information not found in the response.");
              }
            } catch (error) {
              console.error("Error fetching sales data:", error);
            }
          }

          if (saleInfo) {
            sales.push(saleInfo);
          }
        }
      }

      let saleMintInfo;

      try {
        if (!tokenId) return;

        const tokenData = offerData?.nftContract?.tokens?.find(
          (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId)
        );

        const smartContracts = currentChainObject?.smartContracts;
        const targetAddress = tokenData?.mint?.currency;

        let tempCurrency = null;
        if (smartContracts) {
          for (const key in smartContracts) {
            if (smartContracts[key]?.address?.toLowerCase() === targetAddress?.toLowerCase()) {
              tempCurrency = smartContracts[key];
              break;
            }
          }
        }

        if (tokenData) {
          saleMintInfo = {
            address: tokenData?.mint?.to,
            amount: tokenData?.mint?.totalPaid
              ? formatUnits(BigInt(tokenData?.mint?.totalPaid), tempCurrency?.decimals)
              : 0,
            date: tokenData?.mint?.revenueTransaction?.blockTimestamp,
            currency: {
              contract: tokenData?.mint?.currency,
              currencySymbol: tempCurrency?.symbol,
              currencyDecimals: tempCurrency?.decimals
            },
            listing: {
              id: 1,
              listingType: "Mint"
            }
          };
        }
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }

      if (saleMintInfo && saleMintInfo?.amount > 0) {
        sales.push(saleMintInfo);
      }

      // Group sales by listing id
      const groupedSales = sales.reduce((acc, sale) => {
        const listingIndex = acc.findIndex(
          (listing) => listing[0]?.listing?.id === sale?.listing?.id
        );
        if (listingIndex === -1) {
          acc.push([sale]);
        } else {
          acc[listingIndex].push(sale);
        }
        return acc;
      }, []);

      setSales(groupedSales);
    };

    fetchSalesData();
  }, [
    marketplaceListings,
    chainId,
    currency,
    currentChainObject,
    offerData,
    tokenId,
    offers,
    offerId
  ]);

  useEffect(() => {
    if (!offerData || !tokenId) return;
    setOfferDO({
      offerId: offerId
    });
    console.log(offerData);
    setTokenDO({
      currency:
        offerData?.nftContract?.prices[0]?.currency ??
        offerData?.nftContract?.tokens
          ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
          ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.currency,
      tokenId: tokenId,
      tokenData: null,

      fee: offerData?.nftContract?.prices[0]?.protocolFeeAmount,

      price:
        offerData?.nftContract?.tokens
          ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
          ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.pricePerToken ??
        offerData?.nftContract?.prices[0]?.amount,
      protocolFeeBPS: offerData?.nftContract?.prices[0]?.protocolFeeBps,
      royaltiesBPS: offerData?.nftContract?.royalty.bps,

      isListed:
        offerData?.nftContract?.tokens
          ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
          ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.status === "CREATED",
      listingId: offerData?.nftContract?.tokens
        ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
        ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.id,
      minimalBidBps: offerData?.nftContract?.tokens
        ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
        ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.minimalBidBps,
      buyoutPricePerToken: offerData?.nftContract?.tokens
        ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
        ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.buyoutPricePerToken
    });

    if (
      !isOwner &&
      !offerNotFormated &&
      (offerData?.nftContract?.tokens?.find(
        (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId)
      )?.mint === null ||
        offerData?.nftContract?.tokens?.length <= 0) &&
      isAllowedToMint !== null &&
      offerData?.nftContract?.prices[0]?.currency
    ) {
      setTokenStatut("MINTABLE");
      setTokenCurrencyAddress(offerData?.nftContract?.prices[0]?.currency);
      // setTokenBigIntPrice(offerData?.nftContract?.prices[0]?.amount);
      setPrice(offerData?.nftContract?.prices[0]?.mintPriceStructureFormatted?.creatorAmount);
      setCreatorAmount(
        offerData?.nftContract?.prices[0]?.mintPriceStructureFormatted?.creatorAmount
      );
      setProtocolFeeAmount(
        offerData?.nftContract?.prices[0]?.mintPriceStructureFormatted?.protocolFeeAmount
      );
      setTotalAmount(offerData?.nftContract?.prices[0]?.mintPriceStructureFormatted?.totalAmount);

      const totalPrice = offerData?.nftContract?.prices[0]?.mintPriceStructure?.totalAmount;
      const totalPriceFormatted = parseFloat(formatUnits(totalPrice, currencyDecimals));

      setTotalPrice(totalPriceFormatted);
      setFeesAmount(
        offerData?.nftContract?.prices[0]?.mintPriceStructureFormatted?.protocolFeeAmount
      );
      setFinalPrice(offerData?.nftContract?.prices[0]?.mintPriceStructureFormatted?.totalAmount);
      setFinalPriceNotFormatted(offerData?.nftContract?.prices[0]?.mintPriceStructure?.totalAmount);
      setAmountToApprove(
        offerData?.nftContract?.prices[0]?.mintPriceStructure?.totalAmount &&
          BigInt(offerData?.nftContract?.prices[0]?.mintPriceStructure?.totalAmount)
      );
      setCurrency(offerData?.nftContract?.prices[0]?.currencySymbol);
      return;
    }

    if (
      offerData?.nftContract?.tokens
        ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
        ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.status === "CREATED"
    ) {
      if (
        offerData?.nftContract?.tokens
          ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
          ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.listingType === "Direct"
      ) {
        setTokenBigIntPrice(
          offerData?.nftContract?.tokens
            ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.buyoutPricePerToken
        );
        setTokenStatut("DIRECT");
        setPrice(
          offerData?.nftContract?.tokens
            ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.buyPriceStructureFormatted
            .listerBuyAmount
        );
        setListerAmount(
          offerData?.nftContract?.tokens
            ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.buyPriceStructureFormatted
            .listerBuyAmount
        );
        setRoyaltiesAmount(
          offerData?.nftContract?.tokens
            ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.buyPriceStructureFormatted
            ?.royaltiesBuyAmount
        );
        setProtocolFeeAmount(
          offerData?.nftContract?.tokens
            ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.buyPriceStructureFormatted
            ?.protocolFeeBuyAmount
        );
        setTotalAmount(
          offerData?.nftContract?.tokens
            ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.buyPriceStructureFormatted
            ?.buyoutPricePerToken
        );
        const totalPrice = offerData?.nftContract?.tokens
          ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
          ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]
          ?.buyPriceStructure?.buyoutPricePerToken;
        const totalPriceFormatted = parseFloat(formatUnits(totalPrice, currencyDecimals));

        setTotalPrice(totalPriceFormatted);
        setFeesAmount(
          offerData?.nftContract?.tokens
            ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.buyPriceStructureFormatted
            ?.protocolFeeBuyAmount
        );
        setRoyaltiesFeesAmount(
          offerData?.nftContract?.tokens
            ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.buyPriceStructureFormatted
            .royaltiesBuyAmount
        );
        setFinalPrice(
          offerData?.nftContract?.tokens
            ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.buyPriceStructureFormatted
            .buyoutPricePerToken
        );
        setFinalPriceNotFormatted(
          offerData?.nftContract?.tokens
            ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.buyPriceStructure
            .buyoutPricePerToken
        );
        setAmountToApprove(
          BigInt(
            offerData?.nftContract?.tokens
              ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
              ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.buyPriceStructure
              .buyoutPricePerToken
          )
        );
      }
      if (
        offerData?.nftContract?.tokens
          ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
          ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.listingType === "Auction"
      ) {
        setTokenBigIntPrice(
          offerData?.nftContract?.tokens
            ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.bids[0]?.totalBidAmount
        );

        setPrice(
          offerData?.nftContract?.tokens
            ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.bidPriceStructureFormatted
            ?.minimalBidPerToken
        );
        setFeesAmount(
          offerData?.nftContract?.tokens
            ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.bidPriceStructureFormatted
            ?.protocolFeeAmount
        );
        setRoyaltiesFeesAmount(
          offerData?.nftContract?.tokens
            ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.bidPriceStructureFormatted
            ?.royaltyAmount
        );
        setFinalPrice(
          offerData?.nftContract?.tokens
            ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.bidPriceStructureFormatted
            ?.minimalBidPerToken
        );
        setFinalPriceNotFormatted(
          offerData?.nftContract?.tokens
            ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.bidPriceStructure
            ?.minimalBidPerToken
        );
        setListerAmount(
          offerData?.nftContract?.tokens
            ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.bidPriceStructureFormatted
            ?.listerAmount
        );
        setRoyaltiesAmount(
          offerData?.nftContract?.tokens
            ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.bidPriceStructureFormatted
            ?.royaltyAmount
        );
        setProtocolFeeAmount(
          offerData?.nftContract?.tokens
            ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.bidPriceStructureFormatted
            ?.protocolFeeAmount
        );
        setTotalAmount(
          offerData?.nftContract?.tokens
            ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.bidPriceStructureFormatted
            ?.totalBidAmount
        );

        const totalPrice = offerData?.nftContract?.tokens
          ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
          ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]
          ?.bidPriceStructure?.totalBidAmount;
        const totalPriceFormatted = parseFloat(formatUnits(totalPrice, currencyDecimals));

        setTotalPrice(totalPriceFormatted);

        setAmountToApprove(
          BigInt(
            offerData?.nftContract?.tokens
              ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
              ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.bidPriceStructure
              ?.minimalBidPerToken ?? 0
          )
        );
        if (
          offerData?.nftContract?.tokens
            ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.bids?.length <= 0
        ) {
          setTokenBigIntPrice(
            offerData?.nftContract?.tokens
              ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
              ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.reservePricePerToken
          );
        }
        setTokenStatut("AUCTION");
      }
      setCurrencyDecimals(
        offerData?.nftContract?.tokens
          ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
          ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.currencyDecimals
      );
      setTokenCurrencyAddress(
        offerData?.nftContract?.tokens
          ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
          ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.currency
      );
      setCurrency(
        offerData?.nftContract?.tokens
          ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
          ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.currencySymbol
      );
      return;
    }
    if (
      offerData?.nftContract?.tokens
        ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
        ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.status === "COMPLETED"
    ) {
      setTokenStatut("COMPLETED");
      setTokenCurrencyAddress(offerData?.nftContract?.prices[0]?.currency);
      setCurrency(offerData?.nftContract?.prices[0]?.currencySymbol);
      setCurrencyDecimals(offerData?.nftContract?.prices[0]?.currencyDecimals);
      return;
    }
    if (
      offerData?.nftContract?.tokens?.find(
        (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId)
      )?.mint !== null &&
      offerData?.nftContract?.tokens
        ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId))
        ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.length === 0
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
    offerId,
    currencyDecimals
  ]);

  useEffect(() => {
    if (!isUserOwner || !marketplaceListings || !address) return;

    if (
      firstSelectedListing?.status === "CREATED" &&
      firstSelectedListing?.listingType !== "Direct"
    ) {
      setIsTokenInAuction(true);
    }

    if (
      address?.toLowerCase() === firstSelectedListing?.lister?.toLowerCase() &&
      firstSelectedListing?.status === "CREATED"
    ) {
      setIsLister(true);
    }

    if (
      offerData?.admins?.includes(address?.toLowerCase()) ||
      offerData?.initialCreator?.toLowerCase() === address?.toLowerCase()
    ) {
      setIsOfferOwner(true);
    }

    if (isUserOwner?.toLowerCase() === address?.toLowerCase()) {
      setIsOwner(true);
    }
  }, [
    isUserOwner,
    address,
    marketplaceListings,
    firstSelectedListing,
    offerData?.admins,
    offerData
  ]);

  useEffect(() => {
    if (!tokenId || !offerData) return;

    if (tokenId?.length > 6) {
      let tokenData = searchParams.get("tokenData");
      setTokenData(tokenData);

      if (
        offerData?.nftContract?.tokens?.find(
          (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId)
        )?.mint?.tokenData?.length
      ) {
        tokenData = offerData.nftContract.tokens?.find(
          (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId)
        ).mint.tokenData;
        setTokenData(tokenData);
      }

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
      if (offerData?.metadata?.offer?.token_metadata && isValidId) {
        tokenMetaData.description = offerData?.metadata.offer?.token_metadata.description.replace(
          /{tokenData}/g,
          `${tokenData}`
        );
        tokenMetaData.image = offerData?.metadata?.offer?.token_metadata?.image?.replace(
          /{tokenData}/g,
          `${tokenData}`
        );
        tokenMetaData.name = offerData?.metadata?.offer?.token_metadata?.name?.replace(
          /{tokenData}/g,
          `${tokenData}`
        );
      }
      setTokenMetaData(tokenMetaData);
    }
  }, [tokenId, offerData, tokenData, searchParams]);

  useEffect(() => {
    if (!offerData || !offerData?.adParameters) return;
    if (offerData?.adParameters?.length === 0) return;

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
      if (!offerData || !tokenId) return;
      const tokenData = offerData?.nftContract?.tokens?.find(
        (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId)
      );
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
        const precision = bidsAmount.split(".")[1]?.length || 0;
        const bidsBigInt = parseUnits(
          Number(bidsAmount).toFixed(Math.min(Number(currencyDecimals), precision)),
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

      const tokenEtherPriceBigNumber = parseUnits(
        Number(buyTokenEtherPrice).toFixed(18).toString(),
        18
      );

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
        setMinted(true);
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

      // reset form
      setFiles([]);
      setPreviewImages([]);
      setLink("");
      setCurrentSlide(0);
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
    if (Number(priceToken) === 0) {
      return true;
    }

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
        Number(priceTokenNumber).toFixed(decimals).toString(),
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
    setFirstSelectedListing(marketplaceListings?.sort((a, b) => b.id - a.id)[0]);
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

  const { mutateAsync: validationAsync } = useContractWrite(
    DsponsorAdminContract,
    "reviewAdProposals"
  );

  const handleValidationSubmit = async (submissionArgs) => {
    try {
      await validationAsync({
        args: [submissionArgs]
      });
      setRefusedValidatedAdModal(true);
      setSuccessFullRefuseModal(true);
    } catch (error) {
      console.error("Erreur de validation du token:", error);
      setSuccessFullRefuseModal(false);
      throw error;
    }
  };

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

  useEffect(() => {
    function shouldRenderManageTokenComponent() {
      if (!tokenId) return;

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
      const mintDisabled = !offerData?.nftContract?.prices[0]?.enabled;
      const isMinted = Boolean(
        offerData?.nftContract?.tokens?.find(
          (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId)
        )?.mint
      );
      const isCreator = offerData?.initialCreator?.toLowerCase() === address?.toLowerCase();

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
        isListerOrOwnerAndStartDateNotPassed ||
        (!isMinted && mintDisabled);

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
        isLister: isLister,
        mintDisabled: mintDisabled,
        isMinted: isMinted,
        isCreator: isCreator
      };

      return { condition: finalCondition, conditionsObject: conditionsObject };
    }

    const conditions = shouldRenderManageTokenComponent();
    setConditions(conditions);
  }, [
    marketplaceListings,
    isOwner,
    isLister,
    tokenStatut,
    offerData,
    firstSelectedListing?.listingType,
    firstSelectedListing?.startTime,
    firstSelectedListing?.endTime,
    firstSelectedListing?.status,
    firstSelectedListing?.bids?.length,
    now,
    tokenId,
    address
  ]);

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

  const modalHelper = {
    title: "Protocol Fees",
    body: (
      <div className="flex flex-col gap-8">
        <span className="text-jacarta-100 text-sm">
          The protocol fees (4%) are used to maintain the platform and the services provided. The
          fees are calculated based on the price of the ad space and are automatically deducted from
          the total amount paid by the buyer.
        </span>

        {offerData?.nftContract?.tokens?.find(
          (token) => !!token?.tokenId && tokenId && BigInt(token?.tokenId) === BigInt(tokenId)
        )?.mint === null && (
          <div className="flex flex-col gap-2">
            <ul className="flex flex-col gap-2 list-disc text-sm" style={{ listStyleType: "disc" }}>
              <li>
                <span className="text-white">
                  Amount sent to the creator: {creatorAmount} {currency}
                </span>
              </li>
              <li>
                <span className="text-white">
                  Protocol fees: {protocolFeeAmount} {currency}
                </span>
              </li>
              <li>
                <span className="text-white">
                  Total: {totalAmount} {currency}
                </span>
              </li>
            </ul>
          </div>
        )}

        {offerData?.nftContract?.tokens?.find(
          (token) => !!token?.tokenId && tokenId && BigInt(token?.tokenId) === BigInt(tokenId)
        )?.mint !== null && (
          <div className="flex flex-col gap-2">
            <ul className="flex flex-col gap-2 list-disc text-sm" style={{ listStyleType: "disc" }}>
              <li>
                <span className="text-white">
                  Amount sent to the lister: {listerAmount} {currency}
                </span>
              </li>
              <li>
                <span className="text-white">
                  Royalties sent to the creator: {royaltiesAmount} {currency}
                </span>
              </li>
              <li>
                <span className="text-white">
                  Protocol fees: {protocolFeeAmount} {currency}
                </span>
              </li>
              <li>
                <span className="text-white">
                  Total: {totalAmount} {currency}
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>
    )
  };

  useEffect(() => {
    if (!offerData) return;

    setNftContractAddress(offerData?.nftContract?.id);
  }, [offerData]);

  const { mutateAsync: airdropAsync } = useContractWrite(DsponsorNFTContract, "mint");

  const handleAirdrop = async (airdropAddress, tokenData) => {
    let stringToUnit = BigInt(0);

    if (tokenData) {
      stringToUnit = stringToUint256(tokenData);

      if (tokenId && stringToUnit !== BigInt(tokenId)) {
        console.error("Token ID and token data do not match");
        throw new Error("Token ID and token data do not match");
      }
    }

    if (!airdropAddress) {
      console.error("Airdrop address not found");
      throw new Error("Airdrop address not found");
    }

    if (!tokenId) {
      console.error("Token ID not found");
      throw new Error("Token ID not found");
    }

    try {
      await airdropAsync({
        args: [
          tokenId,
          airdropAddress,
          "0x0000000000000000000000000000000000000000",
          tokenData ?? ""
        ]
      });

      setAirdropContainer(false);
    } catch (error) {
      console.error("Error while airdropping:", error);
      throw error;
    }
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

  return (
    <Accordion.Root
      type="multiple"
      value={accordionActiveTab}
      onValueChange={setAccordionActiveTab}
    >
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
            <figure className="mb-8 md:mb-0 md:w-2/5 md:flex-shrink-0 md:flex-grow-0 items-start md:basis-auto lg:w-1/2 w-full flex justify-center relative">
              <button
                className="w-full md:sticky md:top-0 md:right-0"
                onClick={() => setImageModal(true)}
              >
                <Image
                  width={585}
                  height={726}
                  src={imageUrl ?? "/images/gradient_creative.jpg"}
                  alt="image"
                  className="rounded-2xl cursor-pointer h-auto object-contain w-full shadow-lg"
                />
              </button>

              {/* <!-- Modal --> */}
              <div className={imageModal ? "modal fade show block" : "modal fade"}>
                <div className="modal-dialog !my-0 flex h-full max-w-4xl items-center justify-center">
                  <Image
                    width={582}
                    height={722}
                    src={imageUrl ?? "/images/gradient_creative.jpg"}
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
                {((currency &&
                  tokenStatut !== "MINTED" &&
                  (firstSelectedListing?.status === "CREATED" ||
                    marketplaceListings?.length <= 0)) ||
                  (conditions?.conditionsObject?.mintDisabled === false &&
                    tokenStatut === "MINTABLE")) && (
                  <div className="flex items-center">
                    <span className="text-green text-sm font-medium tracking-tight mr-2">
                      {!!totalPrice && parseFloat(totalPrice) > 0
                        ? `${finalPrice ?? 0} ${currency}`
                        : "Free"}
                    </span>
                    <ModalHelper {...modalHelper} size="small" />
                  </div>
                )}
                <span className="dark:text-jacarta-100 text-jacarta-100 text-sm">
                  Space #{" "}
                  <strong className="dark:text-white">{tokenData ?? formatTokenId(tokenId)}</strong>{" "}
                </span>
                <span className="text-jacarta-100 block text-sm ">
                  Creator <strong className="dark:text-white">{royalties}% royalties</strong>
                </span>
                {offerData?.nftContract?.tokens?.find(
                  (token) =>
                    !!token?.tokenId && tokenId && BigInt(token?.tokenId) === BigInt(tokenId)
                )?.metadata?.valid_from && (
                  <span className="text-jacarta-100 text-sm flex flex-wrap gap-1">
                    Ownership period:{" "}
                    <strong className="dark:text-white">
                      {offerData?.nftContract?.tokens?.find(
                        (token) =>
                          !!token?.tokenId && tokenId && BigInt(token?.tokenId) === BigInt(tokenId)
                      )?.metadata?.valid_from &&
                        (() => {
                          const date = new Date(
                            offerData?.nftContract?.tokens?.find(
                              (token) =>
                                !!token?.tokenId &&
                                tokenId &&
                                BigInt(token?.tokenId) === BigInt(tokenId)
                            )?.metadata?.valid_from
                          );
                          return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()} at ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
                        })()}
                    </strong>{" "}
                    to{" "}
                    <strong className="dark:text-white">
                      {offerData?.nftContract?.tokens?.find(
                        (token) =>
                          !!token?.tokenId && tokenId && BigInt(token?.tokenId) === BigInt(tokenId)
                      )?.metadata?.valid_to &&
                        new Date(
                          offerData?.nftContract?.tokens?.find(
                            (token) =>
                              !!token?.tokenId &&
                              tokenId &&
                              BigInt(token?.tokenId) === BigInt(tokenId)
                          )?.metadata?.valid_to
                        ).toLocaleString()}
                    </strong>
                  </span>
                )}
              </div>

              {showEntireDescription ? (
                <p className="dark:text-jacarta-100 mb-10">
                  {addLineBreaks(description)}{" "}
                  {description?.length > 1000 && (
                    <button
                      onClick={() => setShowEntireDescription(false)}
                      className="text-primaryPurple"
                    >
                      Show less
                    </button>
                  )}
                </p>
              ) : (
                <div>
                  <p className="dark:text-jacarta-100 mb-10">
                    {description?.length > 1000
                      ? addLineBreaks(description?.slice(0, 1000) + "...")
                      : addLineBreaks(description)}{" "}
                    {description?.length > 1000 && (
                      <button
                        onClick={() => setShowEntireDescription(true)}
                        className="text-primaryPurple"
                      >
                        Show more
                      </button>
                    )}
                  </p>
                </div>
              )}

              {(offerData?.disable === true ||
                new Date(offerData?.metadata?.offer?.valid_to).getTime() < Date.now() ||
                (offerData?.nftContract?.prices[0]?.enabled === false &&
                  offerData?.nftContract?.tokens?.find(
                    (token) =>
                      !!token?.tokenId && tokenId && BigInt(token?.tokenId) === BigInt(tokenId)
                  )?.mint === null)) && <Disable isOffer={false} />}

              {(offerData?.disable === false ||
                new Date(offerData?.metadata?.offer?.valid_to).getTime() >= Date.now() ||
                offerData?.nftContract?.prices[0]?.enabled === true ||
                offerData?.nftContract?.tokens?.find(
                  (token) =>
                    !!token?.tokenId && tokenId && BigInt(token?.tokenId) === BigInt(tokenId)
                )?.mint !== null) && (
                <>
                  {((tokenStatut === "MINTABLE" &&
                    !minted &&
                    !conditions?.conditionsObject?.mintDisabled) ||
                    (firstSelectedListing?.listingType === "Direct" &&
                      firstSelectedListing?.status === "CREATED" &&
                      firstSelectedListing?.startTime < now &&
                      firstSelectedListing?.endTime > now)) &&
                    successFullBuyModal && (
                      <div className="dark:bg-secondaryBlack dark:border-jacarta-800 mb-2 border-jacarta-100 rounded-2lg border flex flex-col gap-4 bg-white p-8">
                        <div className="sm:flex sm:flex-wrap flex-col gap-8">
                          {firstSelectedListing?.listingType === "Direct" && (
                            <div className="flex items-center justify-between gap-4 w-full">
                              <span className="js-countdown-ends-label text-base text-jacarta-100 dark:text-jacarta-100">
                                Direct listing ends in:
                              </span>
                              <Timer
                                endTime={
                                  marketplaceListings?.sort((a, b) => b?.id - a?.id)[0].endTime
                                }
                              />
                            </div>
                          )}

                          <span className="dark:text-jacarta-100 text-jacarta-100 text-sm">
                            Buying the ad space give you the exclusive right to submit an ad. The
                            media still has the power to validate or reject ad assets. You re free
                            to change the ad at anytime. And free to resell on the open market your
                            ad space.{" "}
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
                            isDisabled={!isValidId}
                            className={` !rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all  !bg-primaryPurple hover:!bg-opacity-80 !cursor-pointer ${!isValidId && "!btn-disabled !bg-opacity-30"} `}
                          >
                            Buy
                          </Web3Button>
                        </div>
                      </div>
                    )}

                  {firstSelectedListing?.status === "CREATED" &&
                    firstSelectedListing?.listingType === "Auction" &&
                    firstSelectedListing?.startTime >= now && (
                      <div className="dark:bg-secondaryBlack dark:border-jacarta-800 mb-2 border-jacarta-100 rounded-2lg border flex flex-col gap-4 bg-white p-8">
                        <div className="sm:flex sm:flex-wrap flex-col gap-8">
                          <div className="flex items-center justify-between gap-4 w-full">
                            <span className="js-countdown-ends-label text-base text-jacarta-100 dark:text-jacarta-100">
                              Auction will start in:
                            </span>
                            <Timer
                              endTime={
                                marketplaceListings?.sort((a, b) => b?.id - a?.id)[0].startTime
                              }
                            />
                          </div>
                        </div>
                      </div>
                    )}

                  {conditions?.conditionsObject?.isCreator &&
                    airdropContainer &&
                    !conditions?.conditionsObject?.isMinted && (
                      <div className="dark:bg-secondaryBlack mt-4 dark:border-jacarta-800 mb-2 border-jacarta-100 rounded-2lg border flex flex-col gap-4 bg-white p-8">
                        <span className="dark:text-jacarta-100 text-jacarta-100 text-lg">
                          Airdrop this token
                        </span>

                        <Input
                          placeholder={"Enter the address"}
                          onChange={(e) => setAirdropAddress(e.target.value)}
                          value={airdropAddress}
                          type="text"
                          className="w-full"
                        />

                        <div className="flex items-center gap-2">
                          <button onClick={() => setAirdropAddress(address)} className="w-fit">
                            <span className="text-sm text-primaryPurple">Use my address</span>
                          </button>

                          <span className="text-sm text-jacarta-100">or</span>

                          {navigator?.clipboard && (
                            <button
                              onClick={() => {
                                // get clipboard content
                                navigator.clipboard.readText().then((text) => {
                                  setAirdropAddress(text);
                                });
                              }}
                              className="w-fit"
                            >
                              <span className="text-sm text-primaryPurple">
                                Paste from clipboard
                              </span>
                            </button>
                          )}
                        </div>

                        <div className="w-full flex">
                          <Web3Button
                            contractAddress={nftContractAddress}
                            action={async () => {
                              setIsLoadingAirdropButton(true);

                              await toast.promise(handleAirdrop(airdropAddress, tokenData), {
                                pending: "Airdrop in progress... 🚀",
                                success: "Airdrop successful 🎉",
                                error: "Airdrop failed ❌"
                              });

                              setIsLoadingAirdropButton(false);
                            }}
                            className={`!rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all  !bg-primaryPurple hover:!bg-opacity-80 !cursor-pointer ${(airdropAddress === "" || !airdropAddress || isLoadingAirdropButton || !isValidId) && "!btn-disabled !cursor-not-allowed !opacity-30"}`}
                            isDisabled={
                              airdropAddress === "" ||
                              !airdropAddress ||
                              isLoadingAirdropButton ||
                              !isValidId
                            }
                          >
                            {isLoadingAirdropButton ? (
                              <Spinner size="sm" color="default" />
                            ) : (
                              "Airdrop"
                            )}
                          </Web3Button>
                        </div>
                      </div>
                    )}

                  {firstSelectedListing?.status === "CREATED" &&
                    firstSelectedListing?.listingType === "Direct" &&
                    firstSelectedListing?.startTime >= now && (
                      <div className="dark:bg-secondaryBlack dark:border-jacarta-800 mb-2 border-jacarta-100 rounded-2lg border flex flex-col gap-4 bg-white p-8">
                        <div className="sm:flex sm:flex-wrap flex-col gap-8">
                          <div className="flex items-center justify-between gap-4 w-full">
                            <span className="js-countdown-ends-label text-base text-jacarta-100 dark:text-jacarta-100">
                              Direct listing will start in:
                            </span>
                            <Timer
                              endTime={
                                marketplaceListings?.sort((a, b) => b?.id - a?.id)[0].startTime
                              }
                            />
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
                    conditions={conditions?.conditionsObject}
                    tokenId={tokenId}
                    setListingCreated={setListingCreated}
                  />

                  {((firstSelectedListing?.listingType === "Auction" &&
                    firstSelectedListing.startTime < now &&
                    firstSelectedListing.endTime > now &&
                    firstSelectedListing?.status === "CREATED") ||
                    successFullBid) && (
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
                      isValidId={isValidId}
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
                      tokenEtherPrice={tokenEtherPrice}
                      amountInEthWithSlippage={amountInEthWithSlippage}
                      displayedPrice={displayedPrice}
                      setDisplayedPrice={setDisplayedPrice}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* <!-- end item --> */}

      {/* <ItemsTabs /> */}
      <Accordion.Item value="adSubmission">
        <div>
          {isOwner && activated_features.canSeeSubmittedAds && isValidId ? (
            <div className="container">
              <Accordion.Header className="w-full">
                <Accordion.Trigger
                  className={`${accordionActiveTab === "adSubmission" && "bg-primaryPurple"} w-full flex items-center justify-center gap-4 mb-6 border border-primaryPurple hover:bg-primaryPurple cursor-pointer p-2 rounded-lg`}
                >
                  <h2 className="text-jacarta-900 font-bold font-display text-center text-3xl dark:text-white ">
                    Ad Submission
                  </h2>
                  <ChevronDownIcon
                    className={`w-6 h-6 duration-300 ${accordionActiveTab === "adSubmission" && "transform rotate-180"}`}
                  />
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content className="mb-6">
                {isTokenInAuction && (
                  <div className="text-center w-full">
                    <span className="dark:text-warning text-md ">
                      ⚠️ You cannot submit an ad while your token is in auction.
                    </span>
                  </div>
                )}
                {!isTokenInAuction && (
                  <SliderForm
                    styles={styles}
                    handlePreviewModal={handlePreviewModal}
                    stepsRef={stepsRef}
                    numSteps={numSteps}
                    currentSlide={currentSlide}
                    setCurrentSlide={setCurrentSlide}
                  >
                    {currentSlide === 0 && (
                      <Step1Mint
                        stepsRef={stepsRef}
                        styles={styles}
                        adParameters={adParameters}
                        setImageUrlVariants={setImageUrlVariants}
                        currentSlide={currentSlide}
                        numSteps={numSteps}
                      />
                    )}
                    {currentSlide === 2 && (
                      <Step2Mint
                        stepsRef={stepsRef}
                        styles={styles}
                        setLink={setLink}
                        link={link}
                        currentSlide={currentSlide}
                        numSteps={numSteps}
                      />
                    )}
                    {currentSlide === 1 && (
                      <>
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
                            currentSlide={currentSlide}
                            numSteps={numSteps}
                          />
                        ))}
                      </>
                    )}
                  </SliderForm>
                )}
              </Accordion.Content>
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
      </Accordion.Item>

      <Accordion.Item value="adValidation">
        <div className="container">
          {offerData.nftContract?.tokens?.find(
            (token) => !!token?.tokenId && tokenId && BigInt(token?.tokenId) === BigInt(tokenId)
          )?.mint &&
            isValidId &&
            activated_features.canSeeSubmittedAds && (
              <>
                <Accordion.Header className="w-full">
                  <Accordion.Trigger
                    className={`${accordionActiveTab === "adValidation" && "bg-primaryPurple"} w-full flex items-center justify-center gap-4 mb-6 border border-primaryPurple hover:bg-primaryPurple cursor-pointer p-2 rounded-lg`}
                  >
                    {isOwner && sponsorHasAtLeastOneRejectedProposalAndNoPending && (
                      <InfoIcon text="You have at least one rejected proposal and no pending proposal.">
                        <ExclamationCircleIcon className="w-6 h-6 text-red" />
                      </InfoIcon>
                    )}
                    {isMedia && mediaShouldValidateAnAd && (
                      <InfoIcon text="You have at least one ad to validate or to refuse.">
                        <ExclamationCircleIcon className="w-6 h-6 text-red" />
                      </InfoIcon>
                    )}
                    <h2 className="text-jacarta-900 font-bold font-display text-center text-3xl dark:text-white ">
                      Ad Validation
                    </h2>
                    <ChevronDownIcon
                      className={`w-6 h-6 duration-300 ${accordionActiveTab === "adValidation" && "transform rotate-180"}`}
                    />
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content>
                  <Validation
                    offer={offerData}
                    offerId={offerId}
                    isOwner={isOfferOwner}
                    isToken={false}
                    successFullUploadModal={successFullUploadModal}
                    successFullRefuseModal={successFullRefuseModal}
                    setRefusedValidatedAdModal={setRefusedValidatedAdModal}
                    refusedValidatedAdModal={refusedValidatedAdModal}
                    setSuccessFullRefuseModal={setSuccessFullRefuseModal}
                    isLister={isLister}
                    setSelectedItems={setSelectedItems}
                    sponsorHasAtLeastOneRejectedProposalAndNoPending={
                      sponsorHasAtLeastOneRejectedProposalAndNoPending
                    }
                    mediaShouldValidateAnAd={mediaShouldValidateAnAd}
                    isMedia={isMedia}
                    isSponsor={isOwner}
                    itemTokenId={tokenId}
                    isTokenView={true}
                    handleSubmit={handleValidationSubmit}
                    selectedItems={selectedItems}
                  />
                </Accordion.Content>
              </>
            )}
        </div>
      </Accordion.Item>

      {sales && sales.length > 0 && (
        <Accordion.Item value="latestSales">
          <div className="container">
            <Accordion.Header className="w-full">
              <Accordion.Trigger
                className={`${accordionActiveTab === "latestSales" && "bg-primaryPurple"} w-full flex items-center justify-center gap-4 mb-6 border border-primaryPurple hover:bg-primaryPurple cursor-pointer p-2 rounded-lg`}
              >
                <h2 className="text-jacarta-900 font-bold font-display text-center text-3xl dark:text-white ">
                  Latest Sales
                </h2>
                <ChevronDownIcon
                  className={`w-6 h-6 duration-300 ${accordionActiveTab === "latestSales" && "transform rotate-180"}`}
                />
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content className="mb-4">
              <ItemLastestSales sales={sales} />
            </Accordion.Content>
          </div>
        </Accordion.Item>
      )}

      {bids &&
        bids.filter((listing) =>
          listing.map((bid) => {
            bid?.listing?.listingType === "Auction";
          })
        ).length > 0 && (
          <Accordion.Item value="latestBids">
            <div className="container">
              <Accordion.Header className="w-full">
                <Accordion.Trigger
                  className={`${accordionActiveTab === "latestBids" && "bg-primaryPurple"} w-full flex items-center justify-center gap-4 mb-6 border border-primaryPurple hover:bg-primaryPurple cursor-pointer p-2 rounded-lg`}
                >
                  <h2 className="text-jacarta-900 font-bold font-display text-center text-3xl dark:text-white ">
                    Latest Bids
                  </h2>
                  <ChevronDownIcon
                    className={`w-6 h-6 duration-300 ${accordionActiveTab === "latestBids" && "transform rotate-180"}`}
                  />
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content className="mb-4">
                <ItemLastBids bids={bids} />
              </Accordion.Content>
            </div>
          </Accordion.Item>
        )}

      <Accordion.Item value="details">
        <div className="container">
          <Accordion.Header className="w-full">
            <Accordion.Trigger
              className={`${accordionActiveTab === "details" && "bg-primaryPurple"} w-full flex items-center justify-center gap-4 mb-6 border border-primaryPurple hover:bg-primaryPurple cursor-pointer p-2 rounded-lg`}
            >
              <h2 className="text-jacarta-900 font-bold font-display text-center text-3xl dark:text-white ">
                Details
              </h2>
              <ChevronDownIcon
                className={`w-6 h-6 duration-300 ${accordionActiveTab === "details" && "transform rotate-180"}`}
              />
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Content className="mb-12">
            <ItemsTabs
              chainId={chainId}
              contractAddress={offerData?.nftContract?.id}
              offerId={offerId}
              isUserOwner={isUserOwner}
              initialCreator={offerData?.initialCreator}
              status={firstSelectedListing?.status}
              listerAddress={firstSelectedListing?.lister}
              offerData={offerData}
            />
          </Accordion.Content>
        </div>
      </Accordion.Item>

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
            adSubmission={true}
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
            totalPrice={totalPrice}
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
      {failedCrossmintTransaction && (
        <TransactionFailedModal setCrossmintTransactionFailed={setFailedCrossmintTransaction} />
      )}
    </Accordion.Root>
  );
};

export default TokenPageContainer;
