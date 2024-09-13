import {
  useAddress,
  useBalance,
  useContract,
  useContractRead,
  useContractWrite,
  useStorage,
  useStorageUpload
} from "@thirdweb-dev/react";
import { Address } from "thirdweb";
import { ethers, BigNumber } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import "tippy.js/dist/tippy.css";
import Meta from "@/components/Meta";
import AdSubmission from "@/components/features/token/accordion/AdSubmission";
import AdBriefing from "@/components/features/token/createAd/AdBriefing";
import AdURL from "@/components/features/token/createAd/AdURL";
import AdImage from "@/components/features/token/createAd/AdImage";
import ModalHelper from "@/components/ui/modals/Helper";
import CarouselForm from "@/components/ui/misc/CarouselForm";
import styles from "@/styles/style.module.scss";
import Timer from "@/components/ui/timer/Timer";
import { fetchToken } from "@/utils/graphql/fetchToken";
import LatestSales from "@/components/features/token/accordion/LatestSales";
import { getCookie } from "cookies-next";
import Details from "@/components/features/token/accordion/Details";
import BuyModal from "@/components/features/token/modals/BuyModal";
import { toast } from "react-toastify";
import OfferSkeleton from "@/components/ui/skeletons/OfferSkeleton";
import AdValidation from "@/components/features/offer/AdValidation";
import LatestBids from "@/components/features/token/accordion/LatestBids";
import Manage from "@/components/features/token/widgets/Manage";
import { useSwitchChainContext } from "@/providers/SwitchChain";
import config from "@/config/config";
import stringToUint256 from "@/utils/tokens/stringToUnit256";
import { formatUnits, getAddress, isAddress, parseUnits } from "ethers/lib/utils";
import "react-toastify/dist/ReactToastify.css";
import { features } from "@/data/features";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import ResponsiveTooltip from "@/components/ui/ResponsiveTooltip";
import Disable from "@/components/ui/misc/Disable";
import Input from "@/components/ui/Input";
import { useSearchParams } from "next/navigation";
import { addLineBreaks } from "@/utils/misc/addLineBreaks";
import formatAndRoundPrice from "@/utils/prices/formatAndRound";
import CrossmintFail from "@/components/features/token/modals/CrossmintFail";
import PlaceBid from "@/components/features/token/widgets/PlaceBid";
import StyledWeb3Button from "@/components/ui/buttons/StyledWeb3Button";

import ERC20ABI from "@/abi/ERC20.json";

const Token = () => {
  const router = useRouter();
  const storage = useStorage();

  const offerId = router.query?.offerId;
  const tokenId = router.query?.tokenId;

  const chainId = router.query?.chainId;
  const chainConfig = config[Number(chainId)];

  const relayerURL = chainConfig?.relayerURL;

  const address = useAddress();

  const { setSelectedChain } = useSwitchChainContext();

  useEffect(() => {
    if (chainId) {
      setSelectedChain(chainConfig?.network);
    }
  }, [chainId, chainConfig, setSelectedChain]);

  const [tokenIdString, setTokenIdString] = useState<string | null>(null);
  const [offerData, setOfferData] = useState<any | null>(null);
  const [showBidsModal, setShowBidsModal] = useState<boolean>(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [firstSelectedListing, setFirstSelectedListing] = useState<any>({});
  const [files, setFiles] = useState<any[]>([]);
  const [previewImages, setPreviewImages] = useState<any[]>([]);
  const [imageModal, setImageModal] = useState(false);
  const [link, setLink] = useState("");
  const [amountToApprove, setAmountToApprove] = useState<bigint | null>(null);
  const [buyTokenEtherPrice, setBuyTokenEtherPrice] = useState<string | null>(null);
  const [tokenEtherPriceRelayer, setTokenEtherPriceRelayer] = useState<any | null>(null);
  const [royalties, setRoyalties] = useState<number | null>(null);
  const [errors, setErrors] = useState({});
  const [marketplaceListings, setMarketplaceListings] = useState<any>([]);
  const [refusedValidatedAdModal, setRefusedValidatedAdModal] = useState<boolean>(false);
  const [successFullRefuseModal, setSuccessFullRefuseModal] = useState<boolean>(false);
  const [finalPrice, setFinalPrice] = useState<any>(null);
  const [finalPriceNotFormatted, setFinalPriceNotFormatted] = useState<string | null>(null);
  const [successFullUpload, setSuccessFullUpload] = useState<boolean>(false);
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
  const [validate, setValidate] = useState<boolean>(false);
  const [, setAdStatut] = useState<number | null>(null);
  const [offerNotFormated] = useState(false);
  const [price, setPrice] = useState<string | null>(null);
  const [buyModal, setBuyModal] = useState(false);
  const [buyMethod, setBuyMethod] = useState(false);
  const [feesAmount, setFeesAmount] = useState<any>(null);
  const [imageUrlVariants, setImageUrlVariants] = useState([]);
  const [submitAdFormated, setSubmitAdFormated] = useState<any>({});
  const [tokenData, setTokenData] = useState<string | null>(null);
  const [tokenMetaData, setTokenMetaData] = useState<{
    description: string;
    image: string;
    name: string;
    id?: string;
  } | null>(null);
  const [allowanceTrue, setAllowanceTrue] = useState(false);
  const [adParameters, setAdParameters] = useState<any[]>([]);
  const [imageURLSteps, setImageURLSteps] = useState<any[]>([]);
  const [isValidId, setIsValidId] = useState(false);
  const stepsRef = useRef([]);
  const [numSteps, setNumSteps] = useState(2);
  const [tokenStatut, setTokenStatut] = useState<string | null>(null);
  const [tokenCurrencyAddress, setTokenCurrencyAddress] = useState<Address | null>(null);
  const [, setTokenBigIntPrice] = useState(null);
  const [successFullBid, setSuccessFullBid] = useState(false);
  const [isTokenInAuction, setIsTokenInAuction] = useState(false);
  const [pendingProposalData, setPendingProposalData] = useState([]);
  const [successFullListing, setSuccessFullListing] = useState(false);
  const [royaltiesFeesAmount, setRoyaltiesFeesAmount] = useState<any>(null);
  const [bidsAmount, setBidsAmount] = useState<string>("");
  const [isLister, setIsLister] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [bids, setBids] = useState<any[] | null>([]);
  const [insufficentBalance, setInsufficentBalance] = useState<boolean>(false);
  const [canPayWithNativeToken, setCanPayWithNativeToken] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [itemProposals, setItemProposals] = useState<any>(null);
  const [mediaShouldValidateAnAd, setMediaShouldValidateAnAd] = useState(false);
  const [airdropContainer, setAirdropContainer] = useState(true);
  const [amountInEthWithSlippage, setAmountInEthWithSlippage] = useState<BigNumber | null>(null);
  const [displayedPrice, setDisplayedPrice] = useState<number | null>(null);
  const [isOfferOwner, setIsOfferOwner] = useState(false);
  const [directBuyPriceBN, setDirectBuyPriceBN] = useState<BigNumber | undefined>(undefined);
  const [auctionPriceBN, setAuctionPriceBN] = useState<BigNumber | undefined>(undefined);
  const [mintPriceBN, setMintPriceBN] = useState<BigNumber | undefined>(undefined);
  const [hasEnoughBalance, setHasEnoughBalance] = useState<boolean>(true);
  const [hasEnoughBalanceForNative, setHasEnoughBalanceForNative] = useState<boolean>(true);
  const [
    sponsorHasAtLeastOneRejectedProposalAndNoPending,
    setSponsorHasAtLeastOneRejectedProposalAndNoPending
  ] = useState(false);
  const [offers, setOffers] = useState<any[] | null>(null);
  const [isMedia, setIsMedia] = useState(false);
  const [sales, setSales] = useState([]);
  const [minted, setMinted] = useState(false);
  const [conditions, setConditions] = useState<
    | {
        condition: boolean;
        conditionsObject: any;
      }
    | undefined
  >(undefined);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [accordionActiveTab, setAccordionActiveTab] = useState<string[]>(["adSubmission"]);
  const [listingCreated, setListingCreated] = useState(false);
  const [creatorAmount, setCreatorAmount] = useState(null);
  const [protocolFeeAmount, setProtocolFeeAmount] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [listerAmount, setListerAmount] = useState(null);
  const [royaltiesAmount, setRoyaltiesAmount] = useState(null);
  const [airdropAddress, setAirdropAddress] = useState<string | undefined>(undefined);
  const [transferAddress, setTransferAddress] = useState<string | undefined>(undefined);
  const [nftContractAddress, setNftContractAddress] = useState<Address | null>(null);
  const [showEntireDescription, setShowEntireDescription] = useState(false);
  const [failedCrossmintTransaction, setFailedCrossmintTransaction] = useState(false);
  const [tokenSymbol, setTokenSymbol] = useState<string | null>(null);
  const [tokenDecimals, setTokenDecimals] = useState<number | null>(null);

  const { contract: currencyContract } = useContract(tokenCurrencyAddress, ERC20ABI);
  const { data: tokenSymbolData } = useContractRead(currencyContract, "symbol");
  const { data: tokenDecimalsData } = useContractRead(currencyContract, "decimals");

  useEffect(() => {
    if (tokenSymbolData) {
      setTokenSymbol(tokenSymbolData);
    }

    if (tokenDecimalsData) {
      setTokenDecimals(tokenDecimalsData);
    }
  }, [tokenDecimalsData, tokenSymbolData]);

  const [tags, setTags] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const encodedPayload = searchParams.get("p");

  const mintCollectionId = chainConfig?.features.crossmint.config?.mintCollectionId;
  const buyCollectionId = chainConfig?.features.crossmint.config?.buyCollectionId;
  const bidCollectionId = chainConfig?.features.crossmint.config?.bidCollectionId;

  const fetchOffers = React.useCallback(async () => {
    if (fetchOffersRef.current) return;
    fetchOffersRef.current = true;

    try {
      const offers = await fetchToken(chainId, offerId, tokenId);
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
  }, [chainId, offerId, tokenId]);

  useEffect(() => {
    const revalidate = async (args) => {
      const { tags } = args;
      if (relayerURL && tags) {
        await fetch(`${relayerURL}/api/revalidate`, {
          method: "POST",
          body: JSON.stringify({ tags })
        });
      }
      await fetchOffers();
    };

    if (encodedPayload) {
      const decodedPayload = decodeURIComponent(encodedPayload);
      const parsedPayload = JSON.parse(decodedPayload);
      if (parsedPayload[0]?.status === "success") {
        revalidate(parsedPayload[0]?.passThroughArgs);
        const collectionId = parsedPayload[0]?.collectionId;

        if (collectionId === mintCollectionId) {
          setBuyModal(true);
          setSuccessFullUpload(true);
          setIsOwner(true);
          setMinted(true);
        } else if (collectionId === buyCollectionId) {
          setBuyModal(true);
          setSuccessFullUpload(true);
        } else if (collectionId === bidCollectionId) {
          setShowBidsModal(true);
          setSuccessFullBid(true);
        }
      } else if (parsedPayload[0]?.status === "failure") {
        setFailedCrossmintTransaction(true);
      }
    }
  }, [fetchOffers, relayerURL, bidCollectionId, buyCollectionId, mintCollectionId, encodedPayload]);

  let description = "description not found";
  let id = "1";
  let image = "/images/gradients/gradient_creative.jpg";
  let name = "Unnamed Ad Space";

  if (offerData?.metadata?.offer) {
    const embeddedTokenMetaData = offerData?.metadata?.offer?.token_metadata;

    if (tokenMetaData && Object.keys(tokenMetaData).length > 0) {
      description = tokenMetaData.description;
      id = tokenMetaData.id as string;
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
      if (storage && image?.startsWith("ipfs://")) {
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
  }, [image, storage]);

  const fetchOffersRef = useRef(false);

  useEffect(() => {
    if (chainId && offerId) {
      fetchOffers();
    }
  }, [address, chainId, fetchOffers, offerId, tokenId]);

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
        (token) =>
          !!token?.tokenId && tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
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

  const [offerDO, setOfferDO] = useState<any>({
    offerId: null
  });
  const [tokenDO, setTokenDO] = useState<any>({
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
    chainConfig?.smartContracts?.DSPONSORADMIN?.address,
    chainConfig?.smartContracts?.DSPONSORADMIN?.abi
  );
  const { contract: DsponsorNFTContract } = useContract(offerData?.nftContract?.id);
  const { mutateAsync: uploadToIPFS } = useStorageUpload();
  const { mutateAsync: mintAndSubmit } = useContractWrite(DsponsorAdminContract, "mintAndSubmit");
  const { mutateAsync: submitAd } = useContractWrite(DsponsorAdminContract, "submitAdProposals");
  const { contract: tokenContract } = useContract(tokenCurrencyAddress, ERC20ABI);
  const { data: tokenBalance } = useBalance(tokenCurrencyAddress as Address);
  const { mutateAsync: approve } = useContractWrite(tokenContract, "approve");
  const { data: owner } = useContractRead(DsponsorAdminContract, "owner");

  const { data: isAllowedToMint } = useContractRead<any, any, any, any, any, any>(
    DsponsorNFTContract,
    "tokenIdIsAllowedToMint",
    tokenIdString
  );
  const { data: isUserOwner } = useContractRead<any, any, any, any, any, any>(
    DsponsorNFTContract,
    "ownerOf",
    [tokenIdString]
  );

  const { contract: dsponsorMpContract } = useContract(
    chainConfig?.smartContracts?.DSPONSORMP?.address
  );
  const { mutateAsync: directBuy } = useContractWrite(dsponsorMpContract, "buy");

  const now = Math.floor(new Date().getTime() / 1000);

  const { data: nativeTokenBalance } = useBalance();

  // referralAddress is the address of the ?_rid= parameter in the URL
  const referralAddress = getCookie("_rid") || "0x5b15Cbb40Ef056F74130F0e6A1e6FD183b14Cdaf";

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
    const fetchBuyEtherPrice = async (amount: string) => {
      try {
        if (tokenDecimals) {
          const finalAmount = ethers.utils.parseUnits(amount, Number(tokenDecimals))?.toString();

          const tokenEtherPrice = await fetch(
            `${relayerURL}/api/${chainId}/prices?token=${tokenCurrencyAddress}&amount=${finalAmount}&slippage=0.3`,
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
        }
      } catch (error) {
        console.error(error);
      }
    };

    const token = offerData?.nftContract?.tokens?.find(
      (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
    );
    const allowList = offerData?.nftContract?.allowList;

    if (chainId && tokenCurrencyAddress && tokenDecimals) {
      if (tokenStatut === "AUCTION" && debouncedBidsAmount) {
        fetchBuyEtherPrice(debouncedBidsAmount);
      }

      if (tokenStatut === "DIRECT" && directBuyPriceBN) {
        const formattedDirectBuyPrice = ethers.utils.formatUnits(directBuyPriceBN, tokenDecimals);

        fetchBuyEtherPrice(formattedDirectBuyPrice);
      }

      if ((token?.mint === null || allowList === false) && mintPriceBN) {
        const formattedMintPrice = ethers.utils.formatUnits(mintPriceBN, tokenDecimals);

        fetchBuyEtherPrice(formattedMintPrice);
      }
    }
  }, [
    chainId,
    relayerURL,
    tokenDecimals,
    tokenCurrencyAddress,
    debouncedBidsAmount,
    tokenStatut,
    directBuyPriceBN,
    mintPriceBN,
    offerData,
    tokenId
  ]);

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
    }

    if (bidsAmount && tokenDecimals && tokenEtherPriceRelayer) {
      const amountUSDC = tokenEtherPriceRelayer?.amountUSDC;

      const priceToDisplay = formatUnits(amountUSDC, 6);

      setDisplayedPrice(formatAndRoundPrice(priceToDisplay));
    } else {
      setDisplayedPrice(0);
    }
  }, [bidsAmount, tokenDecimals, tokenEtherPriceRelayer]);

  useEffect(() => {
    setTokenIdString(tokenId?.toString() as string);
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
    if (offerData?.nftContract) {
      const toUpdateTags = [
        `${chainId}-userAddress-${referralAddress}`,
        `${chainId}-activity`,
        `${chainId}-nftContract-${offerData.nftContract.id}`
      ];

      if (address) toUpdateTags.push(`${chainId}-userAddress-${address}`);

      if (offerData?.nftContract?.tokens.length > 0 && tokenId) {
        const listings = offerData?.nftContract?.tokens
          ?.find(
            (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
          )
          ?.marketplaceListings.sort((a, b) => b.id - a.id);

        const mostRecentListing = listings && listings[0] ? listings[0] : null;
        if (mostRecentListing) {
          toUpdateTags.push(`${chainId}-userAddress-${mostRecentListing.lister}`);
        }
        setMarketplaceListings(listings);
      }
      setTags(toUpdateTags);
    }
  }, [chainId, offerData, tokenId, address]);

  useEffect(() => {
    let bids: any[] = [];

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
                tokenDecimals: listing.currencyDecimals
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
  }, [marketplaceListings, tokenDecimals, tokenSymbol]);

  useEffect(() => {
    const fetchSalesData = async () => {
      let sales: any[] = [];

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
                  new Date(b?.creationTimestamp * 1000).getTime() -
                  new Date(a?.creationTimestamp * 1000).getTime()
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
                tokenDecimals: listing?.currencyDecimals
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
                (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
              );

              if (tokenData) {
                // need to match listing id and direct buys listing id
                const listingTokenData = tokenData?.marketplaceListings?.find(
                  (marketplaceListing) => Number(listing?.id) === Number(marketplaceListing?.id)
                );

                const directBuy = listingTokenData?.directBuys[0]; // only one direct buy per listing so we can take the first one

                saleInfo = {
                  address: directBuy?.buyer,
                  amount: directBuy?.totalPricePaid
                    ? formatUnits(BigInt(directBuy?.totalPricePaid), listing.currencyDecimals)
                    : 0,
                  date: directBuy?.revenueTransaction?.blockTimestamp,
                  currency: {
                    contract: listing?.currency,
                    currencySymbol: listing.currencySymbol,
                    tokenDecimals: listing.currencyDecimals
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
          (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
        );

        if (tokenData) {
          saleMintInfo = {
            address: tokenData?.mint?.to,
            amount: tokenData?.mint?.totalPaid
              ? formatUnits(BigInt(tokenData?.mint?.totalPaid), tokenData?.mint?.currencyDecimals)
              : 0,
            date: tokenData?.mint?.revenueTransaction?.blockTimestamp,
            currency: {
              contract: tokenData?.mint?.currency,
              currencySymbol: tokenData?.mint?.currencySymbol,
              tokenDecimals: tokenData?.mint?.currencyDecimals
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
  }, [chainConfig, marketplaceListings, offerData, tokenDecimals, tokenId, tokenSymbol]);

  useEffect(() => {
    if (!offerData || !tokenId) return;
    setOfferDO({
      offerId: offerId as string
    });

    setTokenDO({
      currency:
        offerData?.nftContract?.prices[0]?.currency ??
        offerData?.nftContract?.tokens
          ?.find(
            (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
          )
          ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.currency,
      tokenId: tokenId as string,
      tokenData: tokenData as string,

      fee: offerData?.nftContract?.prices[0]?.protocolFeeAmount,
      mint: offerData?.nftContract?.tokens?.find(
        (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
      )?.mint,

      price:
        offerData?.nftContract?.tokens
          ?.find(
            (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
          )
          ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.pricePerToken ??
        offerData?.nftContract?.prices[0]?.amount,
      protocolFeeBPS: offerData?.nftContract?.prices[0]?.protocolFeeBps,
      royaltiesBPS: offerData?.nftContract?.royalty.bps,

      isListed:
        offerData?.nftContract?.tokens
          ?.find(
            (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
          )
          ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.status === "CREATED",
      listingId: offerData?.nftContract?.tokens
        ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string))
        ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.id,
      minimalBidBps: offerData?.nftContract?.tokens
        ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string))
        ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.minimalBidBps,
      buyoutPricePerToken: offerData?.nftContract?.tokens
        ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string))
        ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.buyoutPricePerToken
    });

    if (
      !isOwner &&
      !offerNotFormated &&
      (offerData?.nftContract?.tokens?.find(
        (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
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
      const totalPriceFormatted = parseFloat(formatUnits(totalPrice, tokenDecimals as number));

      setMintPriceBN(ethers.BigNumber.from(totalPrice));

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
      return;
    }

    if (
      offerData?.nftContract?.tokens
        ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string))
        ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.status === "CREATED"
    ) {
      if (
        offerData?.nftContract?.tokens
          ?.find(
            (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
          )
          ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.listingType === "Direct"
      ) {
        setTokenCurrencyAddress(null);
        setTokenBigIntPrice(
          offerData?.nftContract?.tokens
            ?.find(
              (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
            )
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.buyoutPricePerToken
        );
        setTokenStatut("DIRECT");
        setPrice(
          offerData?.nftContract?.tokens
            ?.find(
              (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
            )
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.buyPriceStructureFormatted
            .listerBuyAmount
        );
        setListerAmount(
          offerData?.nftContract?.tokens
            ?.find(
              (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
            )
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.buyPriceStructureFormatted
            .listerBuyAmount
        );
        setRoyaltiesAmount(
          offerData?.nftContract?.tokens
            ?.find(
              (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
            )
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.buyPriceStructureFormatted
            ?.royaltiesBuyAmount
        );
        setProtocolFeeAmount(
          offerData?.nftContract?.tokens
            ?.find(
              (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
            )
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.buyPriceStructureFormatted
            ?.protocolFeeBuyAmount
        );
        setTotalAmount(
          offerData?.nftContract?.tokens
            ?.find(
              (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
            )
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.buyPriceStructureFormatted
            ?.buyoutPricePerToken
        );
        const totalPrice = offerData?.nftContract?.tokens
          ?.find(
            (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
          )
          ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]
          ?.buyPriceStructure?.buyoutPricePerToken;
        const totalPriceFormatted = parseFloat(formatUnits(totalPrice, tokenDecimals as number));

        const directBuyPriceBN = ethers.BigNumber.from(totalPrice);
        setDirectBuyPriceBN(directBuyPriceBN);

        setTotalPrice(totalPriceFormatted);
        setFeesAmount(
          offerData?.nftContract?.tokens
            ?.find(
              (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
            )
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.buyPriceStructureFormatted
            ?.protocolFeeBuyAmount
        );
        setRoyaltiesFeesAmount(
          offerData?.nftContract?.tokens
            ?.find(
              (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
            )
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.buyPriceStructureFormatted
            .royaltiesBuyAmount
        );
        setFinalPrice(
          offerData?.nftContract?.tokens
            ?.find(
              (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
            )
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.buyPriceStructureFormatted
            .buyoutPricePerToken
        );
        setFinalPriceNotFormatted(
          offerData?.nftContract?.tokens
            ?.find(
              (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
            )
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.buyPriceStructure
            .buyoutPricePerToken
        );
        setAmountToApprove(
          BigInt(
            offerData?.nftContract?.tokens
              ?.find(
                (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
              )
              ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.buyPriceStructure
              .buyoutPricePerToken
          )
        );
      }
      if (
        offerData?.nftContract?.tokens
          ?.find(
            (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
          )
          ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.listingType === "Auction"
      ) {
        setTokenBigIntPrice(
          offerData?.nftContract?.tokens
            ?.find(
              (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
            )
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.bids[0]?.totalBidAmount
        );

        setPrice(
          offerData?.nftContract?.tokens
            ?.find(
              (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
            )
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.bidPriceStructureFormatted
            ?.minimalBidPerToken
        );
        setFeesAmount(
          offerData?.nftContract?.tokens
            ?.find(
              (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
            )
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.bidPriceStructureFormatted
            ?.protocolFeeAmount
        );
        setRoyaltiesFeesAmount(
          offerData?.nftContract?.tokens
            ?.find(
              (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
            )
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.bidPriceStructureFormatted
            ?.royaltyAmount
        );
        setFinalPrice(
          offerData?.nftContract?.tokens
            ?.find(
              (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
            )
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.bidPriceStructureFormatted
            ?.minimalBidPerToken
        );
        setFinalPriceNotFormatted(
          offerData?.nftContract?.tokens
            ?.find(
              (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
            )
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.bidPriceStructure
            ?.minimalBidPerToken
        );
        setListerAmount(
          offerData?.nftContract?.tokens
            ?.find(
              (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
            )
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.bidPriceStructureFormatted
            ?.listerAmount
        );
        setRoyaltiesAmount(
          offerData?.nftContract?.tokens
            ?.find(
              (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
            )
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.bidPriceStructureFormatted
            ?.royaltyAmount
        );
        setProtocolFeeAmount(
          offerData?.nftContract?.tokens
            ?.find(
              (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
            )
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.bidPriceStructureFormatted
            ?.protocolFeeAmount
        );
        setTotalAmount(
          offerData?.nftContract?.tokens
            ?.find(
              (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
            )
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.bidPriceStructureFormatted
            ?.totalBidAmount
        );

        const totalPrice = offerData?.nftContract?.tokens
          ?.find(
            (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
          )
          ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]
          ?.bidPriceStructure?.totalBidAmount;
        const totalPriceFormatted = parseFloat(formatUnits(totalPrice, tokenDecimals as number));

        setTotalPrice(totalPriceFormatted);

        const finalPrice = offerData?.nftContract?.tokens
          ?.find(
            (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
          )
          ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]
          ?.bidPriceStructure?.minimalBidPerToken;

        setAuctionPriceBN(ethers.BigNumber.from(finalPrice));

        setAmountToApprove(
          BigInt(
            offerData?.nftContract?.tokens
              ?.find(
                (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
              )
              ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.bidPriceStructure
              ?.minimalBidPerToken ?? 0
          )
        );
        if (
          offerData?.nftContract?.tokens
            ?.find(
              (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
            )
            ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.bids?.length <= 0
        ) {
          setTokenBigIntPrice(
            offerData?.nftContract?.tokens
              ?.find(
                (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
              )
              ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.reservePricePerToken
          );
        }
        setTokenStatut("AUCTION");
      }

      setTokenCurrencyAddress(
        offerData?.nftContract?.tokens
          ?.find(
            (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
          )
          ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.currency
      );
      return;
    }
    if (
      offerData?.nftContract?.tokens
        ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string))
        ?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0]?.status === "COMPLETED"
    ) {
      setTokenStatut("COMPLETED");
      setTokenCurrencyAddress(offerData?.nftContract?.prices[0]?.currency);
      return;
    }
    if (
      offerData?.nftContract?.tokens?.find(
        (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
      )?.mint !== null &&
      offerData?.nftContract?.tokens
        ?.find((token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string))
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
    tokenDecimals,
    tokenData
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

    if (offerData?.admins?.includes(address?.toLowerCase())) {
      setIsOfferOwner(true);
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
    const token = offerData?.nftContract?.tokens?.find(
      (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
    );

    if (offerData?.nftContract?.allowList && token?.setInAllowList) {
      setIsValidId(true);
    } else {
      if (tokenData) {
        const stringToUnit = stringToUint256(tokenData);

        if (tokenId && BigInt(stringToUnit) === BigInt(tokenId as string)) {
          setIsValidId(true);
        } else {
          setIsValidId(false);
        }
      } else if (token?.mint) {
        setIsValidId(true);
      }
    }
  }, [offerData, tokenData, tokenId]);

  useEffect(() => {
    if (!tokenId || !offerData) return;

    if (tokenId?.length > 6) {
      let tokenData = searchParams.get("tokenData");
      setTokenData(tokenData);

      if (
        offerData?.nftContract?.tokens?.find(
          (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
        )?.mint?.tokenData?.length
      ) {
        tokenData = offerData.nftContract.tokens?.find(
          (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
        ).mint.tokenData;
        setTokenData(tokenData);
      }

      let tokenMetaData: { description: string; image: string; name: string } = {
        description: "",
        image: "",
        name: ""
      };

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
  }, [tokenId, offerData, tokenData, searchParams, isValidId]);

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
    const imageURLSteps: string[] = [];
    const uniqueIdsArray = Array.from(uniqueIds);
    setAdParameters(uniqueIdsArray);

    uniqueIdsArray
      ?.filter((id: string) => id.startsWith("imageURL"))
      ?.map((id: string) => {
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
      const params: any[] = [];
      const tokenIdArray: any[] = [];
      const offerIdArray: any[] = [];

      for (const element of adParameters) {
        params.push(element);
        tokenIdArray.push(tokenId);
        offerIdArray.push(offerId);
      }

      const submitAdFormated: any = {
        tokenId: tokenIdArray,
        offerId: offerIdArray,
        params: params
      };

      setSubmitAdFormated(submitAdFormated);
    } catch (e) {
      console.error(e, "Error: Ad parameters not found for offer");
    }
  }, [tokenId, offerId, offerData, adParameters]);

  useEffect(() => {
    const fetchStatusOffers = async () => {
      if (!offerData || !tokenId) return;

      const tokenData = offerData?.nftContract?.tokens?.find(
        (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
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
    let newErrors: any = {};

    if (files.length === 0) {
      newErrors.imageError = "Image is missing.";
      isValid = false;
    }

    setValidate(isValid);
    setErrors(newErrors);
    return isValid;
  };

  const handleLogoUpload = (file, index) => {
    if (file) {
      const newFiles: any[] = [...files];
      const newPreviewImages: any[] = [...previewImages];

      newFiles[index] = { file: file, index: index };
      newPreviewImages[index] = URL.createObjectURL(file);

      setFiles(newFiles);
      setPreviewImages(newPreviewImages);
    }
  };

  // amount to approve is bigint
  const checkAllowance = React.useCallback(
    async (amountToApprove: bigint) => {
      if (tokenCurrencyAddress !== "0x0000000000000000000000000000000000000000" && address) {
        let allowance: [BigNumber] | undefined = undefined;

        if (tokenStatut === "DIRECT" || tokenStatut === "AUCTION") {
          const result = await tokenContract?.call("allowance", [
            address,
            chainConfig?.smartContracts?.DSPONSORMP?.address
          ]);

          if (result) {
            allowance = result;
          }
        } else {
          const result = await tokenContract?.call("allowance", [
            address,
            chainConfig?.smartContracts?.DSPONSORADMIN?.address
          ]);

          if (result) {
            allowance = result;
          }
        }

        const allowanceBigInt = allowance ? BigInt(allowance?.toString()) : BigInt(0);

        if (allowanceBigInt && amountToApprove && allowanceBigInt >= amountToApprove) {
          setAllowanceTrue(false);
          return false;
        }

        setAllowanceTrue(true);
        return true;
      }
    },
    [chainConfig, address, tokenContract, tokenCurrencyAddress, tokenStatut]
  );

  useEffect(() => {
    const asyncAllowance = async (amountToApproveTemp: bigint) => {
      await checkAllowance(amountToApproveTemp);
    };

    if (amountToApprove) {
      asyncAllowance(amountToApprove);
    }
  }, [amountToApprove, checkAllowance]);

  const handleApprove = async () => {
    try {
      if (marketplaceListings.length > 0 && tokenStatut === "DIRECT") {
        await approve({
          args: [chainConfig?.smartContracts?.DSPONSORMP?.address, amountToApprove]
        });
      } else if (tokenStatut === "AUCTION" && marketplaceListings.length > 0) {
        const precision = bidsAmount.split(".")[1]?.length || 0;
        const bidsBigInt = parseUnits(
          Number(bidsAmount).toFixed(Math.min(Number(tokenDecimals), precision)),
          Number(tokenDecimals)
        );

        await approve({
          args: [chainConfig?.smartContracts?.DSPONSORMP?.address, bidsBigInt.toString()]
        });
      } else {
        await approve({
          args: [chainConfig?.smartContracts?.DSPONSORADMIN?.address, amountToApprove]
        });
      }
      setAllowanceTrue(false);
    } catch (error) {
      console.error(error);
      console.error("Approval failed:", error.message);
      throw new Error("Approval failed.");
    }
  };

  const handleBuySubmit = async () => {
    if (!hasEnoughBalance && !canPayWithNativeToken) {
      if (!hasEnoughBalanceForNative) {
        console.error("Not enough balance to confirm checkout");
        throw new Error("Not enough balance to confirm checkout");
      }
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

        await mintAndSubmit(argsWithPossibleOverrides);

        await fetch(`${relayerURL}/api/revalidate`, {
          method: "POST",
          body: JSON.stringify({
            tags
          })
        });

        setSuccessFullUpload(true);
        setIsOwner(true);
        setMinted(true);
        await fetchOffers();
      } else {
        await directBuy(argsWithPossibleOverrides);

        await fetch(`${relayerURL}/api/revalidate`, {
          method: "POST",
          body: JSON.stringify({
            tags
          })
        });

        setSuccessFullUpload(true);
        await fetchOffers();
      }
    } catch (error) {
      console.error("Erreur de soumission du token:", error);
      setSuccessFullUpload(false);
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (!buyMethod) {
      if (!validateInputs()) {
        return;
      }
    }
    // IPFS upload

    let uploadUrl: any[] = [];

    if (isOwner) {
      try {
        uploadUrl = await uploadToIPFS({
          data: [files[0]?.file],
          options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true }
        });
      } catch (error) {
        console.error("Erreur lors de l'upload à IPFS:", error);
        throw new Error("Upload to IPFS failed.");
      }
    }
    try {
      let offerIdParams;
      let tokenIdParams;
      let adParams;
      let dataParams;
      if (link && link !== "") {
        offerIdParams = submitAdFormated?.offerId;
        tokenIdParams = submitAdFormated?.tokenId;
        adParams = submitAdFormated?.params;
        dataParams = [uploadUrl[0], link];
      } else {
        offerIdParams = submitAdFormated?.offerId?.slice(0, -1);
        tokenIdParams = submitAdFormated?.tokenId?.slice(0, -1);
        adParams = submitAdFormated?.params?.filter((param) => param !== "linkURL");
        dataParams = [uploadUrl[0]];
      }

      const argsAdSubmited = {
        offerId: offerIdParams,
        tokenId: tokenIdParams,
        adParameters: adParams,
        data: dataParams
      };

      const functionWithPossibleArgs = Object.values(argsAdSubmited);

      const submitAdTags = [
        `${chainId}-adOffer-${offerId}`,
        `${chainId}-userAddress-${isUserOwner}`
      ];
      for (const admin of offerData.admins) {
        submitAdTags.push(`${chainId}-userAddress-${admin}`);
      }

      await submitAd({ args: functionWithPossibleArgs });

      await fetch(`${relayerURL}/api/revalidate`, {
        method: "POST",
        body: JSON.stringify({
          tags: submitAdTags
        })
      });

      setSuccessFullUpload(true);

      // fetch new data
      await fetchOffers();

      // reset form
      setFiles([]);
      setPreviewImages([]);
      setLink("");
      setCurrentSlide(0);
    } catch (error) {
      console.error("Erreur de soumission du token:", error);
      setSuccessFullUpload(false);
      throw error;
    }
  };

  const checkUserBalance = React.useCallback(
    async (tokenAddressBalance: BigNumber, tokenPrice: BigNumber) => {
      if (Number(tokenPrice) === 0) {
        return true;
      }

      try {
        if (!tokenAddressBalance || !tokenPrice) {
          throw new Error("Invalid balance or price token");
        }

        return tokenAddressBalance.gte(tokenPrice);
      } catch (error) {
        toast.error("Error while checking user balance");
        console.error("Failed to fetch token balance:", error);
        throw Error("Failed to fetch token balance");
      }
    },
    []
  );

  useEffect(() => {
    const fetchTokenBalance = async (tokenBalance: BigNumber) => {
      if (!tokenBalance) return;

      const token = offerData?.nftContract?.tokens?.find(
        (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
      );

      if (tokenStatut === "AUCTION") {
        if (!auctionPriceBN || !tokenDecimals || !bidsAmount) return;

        const parsedBidsAmount = parseUnits(
          Number(bidsAmount).toFixed(tokenDecimals),
          tokenDecimals
        );

        const result = await checkUserBalance(tokenBalance, parsedBidsAmount);
        setHasEnoughBalance(result);

        if (!nativeTokenBalance?.value || !amountInEthWithSlippage) return;

        const nativeResult = await checkUserBalance(
          nativeTokenBalance?.value,
          amountInEthWithSlippage
        );
        setHasEnoughBalanceForNative(nativeResult);
      } else if (tokenStatut === "DIRECT") {
        if (!directBuyPriceBN) return;

        const result = await checkUserBalance(tokenBalance, directBuyPriceBN);
        setHasEnoughBalance(result);

        if (!nativeTokenBalance?.value || !amountInEthWithSlippage) return;

        const nativeResult = await checkUserBalance(
          nativeTokenBalance?.value,
          amountInEthWithSlippage
        );
        setHasEnoughBalanceForNative(nativeResult);
      } else if (token?.mint === null) {
        if (!mintPriceBN) return;

        const result = await checkUserBalance(tokenBalance, mintPriceBN);
        setHasEnoughBalance(result);

        if (!nativeTokenBalance?.value || !amountInEthWithSlippage) return;

        const nativeResult = await checkUserBalance(
          nativeTokenBalance?.value,
          amountInEthWithSlippage
        );
        setHasEnoughBalanceForNative(nativeResult);
      }
    };

    if (tokenBalance && tokenStatut && tokenId) {
      fetchTokenBalance(tokenBalance?.value);
    }
  }, [
    checkUserBalance,
    tokenBalance,
    tokenStatut,
    amountInEthWithSlippage,
    directBuyPriceBN,
    nativeTokenBalance,
    auctionPriceBN,
    mintPriceBN,
    offerData,
    tokenId,
    bidsAmount,
    tokenDecimals
  ]);

  function formatTokenId(str) {
    if (str?.length <= 6) {
      return str;
    }
    return str?.slice(0, 3) + "..." + str?.slice(-3);
  }

  const handleBuyModal = async () => {
    await checkAllowance(amountToApprove ? BigInt(amountToApprove) : BigInt(0));
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
      const validateAdsTags = [
        `${chainId}-adOffer-${offerId}`,
        `${chainId}-userAddress-${isUserOwner}`
      ];
      for (const admin of offerData.admins) {
        validateAdsTags.push(`${chainId}-userAddress-${admin}`);
      }

      await validationAsync({
        args: [submissionArgs]
      });

      await fetch(`${relayerURL}/api/revalidate`, {
        method: "POST",
        body: JSON.stringify({
          tags: validateAdsTags
        })
      });

      setRefusedValidatedAdModal(true);
      setSuccessFullRefuseModal(true);

      await fetchOffers();
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
          (token) => !!token?.tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
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
        <span className="text-sm text-jacarta-100">
          The protocol fees (4%) are used to maintain the platform and the services provided. The
          fees are calculated based on the price of the ad space and are automatically deducted from
          the total amount paid by the buyer.
        </span>

        {offerData?.nftContract?.tokens?.find(
          (token) =>
            !!token?.tokenId && tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
        )?.mint === null && (
          <div className="flex flex-col gap-2">
            <ul className="flex flex-col gap-2 text-sm list-disc" style={{ listStyleType: "disc" }}>
              <li>
                <span className="text-white">
                  Amount sent to the creator: {creatorAmount} {tokenSymbol}
                </span>
              </li>
              <li>
                <span className="text-white">
                  Protocol fees: {protocolFeeAmount} {tokenSymbol}
                </span>
              </li>
              <li>
                <span className="text-white">
                  Total: {totalAmount} {tokenSymbol}
                </span>
              </li>
            </ul>
          </div>
        )}

        {offerData?.nftContract?.tokens?.find(
          (token) =>
            !!token?.tokenId && tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
        )?.mint !== null && (
          <div className="flex flex-col gap-2">
            <ul className="flex flex-col gap-2 text-sm list-disc" style={{ listStyleType: "disc" }}>
              <li>
                <span className="text-white">
                  Amount sent to the lister: {listerAmount} {tokenSymbol}
                </span>
              </li>
              <li>
                <span className="text-white">
                  Royalties sent to the creator: {royaltiesAmount} {tokenSymbol}
                </span>
              </li>
              <li>
                <span className="text-white">
                  Protocol fees: {protocolFeeAmount} {tokenSymbol}
                </span>
              </li>
              <li>
                <span className="text-white">
                  Total: {totalAmount} {tokenSymbol}
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

  const { mutateAsync: airdropAsync } = useContractWrite<any, any, any, any, any>(
    DsponsorNFTContract,
    "mint"
  );

  const { mutateAsync: transferAsync } = useContractWrite<any, any, any, any, any>(
    DsponsorNFTContract,
    "transferFrom"
  );

  const handleAirdrop = async (airdropAddress: Address, tokenData: string | null) => {
    let stringToUnit = BigInt(0);

    if (tokenData && tokenData !== null) {
      stringToUnit = stringToUint256(tokenData);

      if (tokenId && stringToUnit !== BigInt(tokenId as string)) {
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
          tokenId as string,
          airdropAddress,
          "0x0000000000000000000000000000000000000000",
          tokenData ?? ""
        ]
      });

      await fetch(`${relayerURL}/api/revalidate`, {
        method: "POST",
        body: JSON.stringify({
          tags: [`${chainId}-adOffer-${offerId}`, `${chainId}-userAddress-${airdropAddress}`]
        })
      });

      setAirdropContainer(false);
      await fetchOffers();
    } catch (error) {
      console.error("Error while airdropping:", error);
      throw error;
    }
  };

  const handleTransfer = async () => {
    let stringToUnit = BigInt(0);

    if (tokenData && tokenData !== null) {
      stringToUnit = stringToUint256(tokenData);

      if (tokenId && stringToUnit !== BigInt(tokenId as string)) {
        console.error("Token ID and token data do not match");
        throw new Error("Token ID and token data do not match");
      }
    }

    if (!transferAddress || !isAddress(transferAddress)) {
      console.error("Tranfer address not found");
      throw new Error("Trandfer address not found");
    }

    if (!tokenId) {
      console.error("Token ID not found");
      throw new Error("Token ID not found");
    }

    try {
      await transferAsync({
        args: [address, transferAddress, tokenId as string]
      });

      await fetch(`${relayerURL}/api/revalidate`, {
        method: "POST",
        body: JSON.stringify({
          tags: [
            `${chainId}-adOffer-${offerId}`,
            `${chainId}-nftContract-${nftContractAddress}`,
            `${chainId}-userAddress-${address}`,
            `${chainId}-userAddress-${transferAddress}`
          ]
        })
      });

      await fetchOffers();
    } catch (error) {
      console.error("Error while transfering:", error);
      throw error;
    }
  };

  if (offerData?.length === 0) {
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
      <section className="relative pt-12 pb-8 mt-24 lg:mt-24 lg:pt-12">
        <div className="container flex flex-col items-center justify-center mb-8 ">
          <div className="flex justify-center ">
            <h1 className="mb-6 text-5xl font-bold text-center text-jacarta-900 font-display dark:text-white md:text-left lg:text-6xl xl:text-6xl">
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
            <figure className="relative flex items-start justify-center w-full mb-8 md:mb-0 md:w-2/5 md:flex-shrink-0 md:flex-grow-0 md:basis-auto lg:w-1/2">
              <button
                className="w-full md:sticky md:top-0 md:right-0"
                onClick={() => setImageModal(true)}
              >
                <Image
                  width={585}
                  height={726}
                  src={imageUrl ?? "/images/gradients/gradient_creative.jpg"}
                  alt="image"
                  className="object-contain w-full h-auto shadow-lg cursor-pointer rounded-2xl"
                />
              </button>

              {/* <!-- Modal --> */}
              <div className={imageModal ? "modal fade show block" : "modal fade"}>
                <div className="modal-dialog !my-0 flex h-full max-w-4xl items-center justify-center">
                  <Image
                    width={582}
                    height={722}
                    src={imageUrl ?? "/images/gradients/gradient_creative.jpg"}
                    alt="image"
                    className="object-cover w-full h-full rounded-2xl"
                  />
                </div>

                <button
                  type="button"
                  className="absolute btn-close top-6 right-6"
                  onClick={() => setImageModal(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="w-6 h-6 fill-white"
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
                <h2 className="mb-4 text-3xl font-semibold font-display text-jacarta-900 dark:hover:text-primaryPurple dark:text-white">
                  {name}
                </h2>
              </Link>

              <div className="flex flex-wrap items-center gap-4 mb-8 whitespace-nowrap">
                {((tokenSymbol &&
                  tokenStatut !== "MINTED" &&
                  (firstSelectedListing?.status === "CREATED" ||
                    marketplaceListings?.length <= 0)) ||
                  (conditions?.conditionsObject?.mintDisabled === false &&
                    tokenStatut === "MINTABLE")) && (
                  <div className="flex items-center">
                    <span className="mr-2 text-sm font-medium tracking-tight text-green">
                      {!!totalPrice && totalPrice > 0
                        ? `${finalPrice ?? 0} ${tokenSymbol}`
                        : "Free"}
                    </span>

                    <ModalHelper {...modalHelper} size="small" />
                  </div>
                )}
                <span className="text-sm dark:text-jacarta-100 text-jacarta-100">
                  Space #{" "}
                  <strong className="dark:text-white">{tokenData ?? formatTokenId(tokenId)}</strong>{" "}
                </span>
                <span className="block text-sm text-jacarta-100 ">
                  Creator <strong className="dark:text-white">{royalties}% royalties</strong>
                </span>
                {offerData?.nftContract?.tokens?.find(
                  (token) =>
                    !!token?.tokenId &&
                    tokenId &&
                    BigInt(token?.tokenId) === BigInt(tokenId as string)
                )?.metadata?.valid_from && (
                  <span className="flex flex-wrap gap-1 text-sm text-jacarta-100">
                    Ownership period:{" "}
                    <strong className="dark:text-white">
                      {offerData?.nftContract?.tokens?.find(
                        (token) =>
                          !!token?.tokenId &&
                          tokenId &&
                          BigInt(token?.tokenId) === BigInt(tokenId as string)
                      )?.metadata?.valid_from &&
                        (() => {
                          const date = new Date(
                            offerData?.nftContract?.tokens?.find(
                              (token) =>
                                !!token?.tokenId &&
                                tokenId &&
                                BigInt(token?.tokenId) === BigInt(tokenId as string)
                            )?.metadata?.valid_from
                          );
                          return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()} at ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
                        })()}
                    </strong>{" "}
                    to{" "}
                    <strong className="dark:text-white">
                      {offerData?.nftContract?.tokens?.find(
                        (token) =>
                          !!token?.tokenId &&
                          tokenId &&
                          BigInt(token?.tokenId) === BigInt(tokenId as string)
                      )?.metadata?.valid_to &&
                        new Date(
                          offerData?.nftContract?.tokens?.find(
                            (token) =>
                              !!token?.tokenId &&
                              tokenId &&
                              BigInt(token?.tokenId) === BigInt(tokenId as string)
                          )?.metadata?.valid_to
                        ).toLocaleString()}
                    </strong>
                  </span>
                )}
              </div>

              {showEntireDescription ? (
                <p className="mb-10 dark:text-jacarta-100">
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
                  <p className="mb-10 dark:text-jacarta-100">
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
                      !!token?.tokenId &&
                      tokenId &&
                      BigInt(token?.tokenId) === BigInt(tokenId as string)
                  )?.mint === null)) && <Disable isOffer={false} />}

              {!conditions?.conditionsObject?.endTimeNotPassed &&
                conditions?.conditionsObject?.isCreated &&
                ((conditions?.conditionsObject?.isAuction &&
                  !conditions?.conditionsObject?.hasBids) ||
                  conditions?.conditionsObject?.isDirect) && (
                  <div className="p-4 my-4 rounded-lg bg-secondaryBlack">
                    <p className="font-semibold text-center text-white">
                      The current listing is ended
                    </p>
                  </div>
                )}

              {(offerData?.disable === false ||
                new Date(offerData?.metadata?.offer?.valid_to).getTime() >= Date.now() ||
                offerData?.nftContract?.prices[0]?.enabled === true ||
                offerData?.nftContract?.tokens?.find(
                  (token) =>
                    !!token?.tokenId &&
                    tokenId &&
                    BigInt(token?.tokenId) === BigInt(tokenId as string)
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
                      <div className="flex flex-col gap-4 p-8 mb-2 bg-white border dark:bg-secondaryBlack dark:border-jacarta-800 border-jacarta-100 rounded-2lg">
                        <div className="flex-col gap-8 sm:flex sm:flex-wrap">
                          {firstSelectedListing?.listingType === "Direct" && (
                            <div className="flex items-center justify-between w-full gap-4">
                              <span className="text-base js-countdown-ends-label text-jacarta-100 dark:text-jacarta-100">
                                Direct listing ends in:
                              </span>
                              <Timer
                                endTime={
                                  marketplaceListings?.sort(
                                    (a, b) => Number(b?.id) - Number(a?.id)
                                  )[0].endTime
                                }
                              />
                            </div>
                          )}

                          <span className="text-sm dark:text-jacarta-100 text-jacarta-100">
                            Buying the ad space give you the exclusive right to submit an ad. The
                            media still has the power to validate or reject ad assets. You re free
                            to change the ad at anytime. And free to resell on the open market your
                            ad space.{" "}
                          </span>
                        </div>
                        <div className="flex justify-center w-full">
                          <button
                            onClick={() => {
                              handleBuyModal();
                            }}
                            disabled={!isValidId}
                            className={`!rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all  !bg-primaryPurple hover:!bg-opacity-80 !cursor-pointer ${!isValidId && "!bg-white hover:!bg-opacity-30 !bg-opacity-30"} `}
                          >
                            Buy
                          </button>
                        </div>
                      </div>
                    )}

                  {firstSelectedListing?.status === "CREATED" &&
                    firstSelectedListing?.listingType === "Auction" &&
                    firstSelectedListing?.startTime >= now && (
                      <div className="flex flex-col gap-4 p-8 mb-2 bg-white border dark:bg-secondaryBlack dark:border-jacarta-800 border-jacarta-100 rounded-2lg">
                        <div className="flex-col gap-8 sm:flex sm:flex-wrap">
                          <div className="flex items-center justify-between w-full gap-4">
                            <span className="text-base js-countdown-ends-label text-jacarta-100 dark:text-jacarta-100">
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
                      <div className="flex flex-col gap-4 p-8 mt-4 mb-2 bg-white border dark:bg-secondaryBlack dark:border-jacarta-800 border-jacarta-100 rounded-2lg">
                        <span className="text-lg dark:text-jacarta-100 text-jacarta-100">
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

                        <div className="flex w-full">
                          <StyledWeb3Button
                            contractAddress={nftContractAddress as Address}
                            onClick={async () => {
                              await toast.promise(
                                handleAirdrop(airdropAddress as Address, tokenData),
                                {
                                  pending: "Airdrop in progress... 🚀",
                                  success: "Airdrop successful 🎉",
                                  error: "Airdrop failed ❌"
                                }
                              );
                            }}
                            isDisabled={airdropAddress === "" || !airdropAddress || !isValidId}
                            defaultText="Airdrop"
                          />
                        </div>
                      </div>
                    )}

                  {isUserOwner?.toLowerCase() === address?.toLowerCase() && (
                    <div className="flex flex-col gap-4 p-8 mt-4 mb-2 bg-white border dark:bg-secondaryBlack dark:border-jacarta-800 border-jacarta-100 rounded-2lg">
                      <span className="text-lg dark:text-jacarta-100 text-jacarta-100">
                        Transfer this token
                      </span>

                      <Input
                        placeholder={"Enter the address"}
                        onChange={(e) => setTransferAddress(e.target.value)}
                        value={transferAddress}
                        type="text"
                        className="w-full"
                      />

                      {!isAddress(transferAddress || "") && (transferAddress || "") !== "" && (
                        <span className="text-sm text-red">Invalid address</span>
                      )}
                      {transferAddress?.toLowerCase() === address?.toLowerCase() && (
                        <span className="text-sm text-red">
                          You can&apos;t transfer to yourself
                        </span>
                      )}

                      <div className="flex items-center gap-2">
                        {navigator?.clipboard && (
                          <button
                            onClick={() => {
                              // get clipboard content
                              navigator.clipboard.readText().then((text) => {
                                setTransferAddress(text);
                              });
                            }}
                            className="w-fit"
                          >
                            <span className="text-sm text-primaryPurple">Paste from clipboard</span>
                          </button>
                        )}
                      </div>

                      <div className="flex w-full">
                        <StyledWeb3Button
                          contractAddress={nftContractAddress as Address}
                          onClick={async () => {
                            await toast.promise(handleTransfer, {
                              pending: "Transfer in progress... 🚀",
                              success: "Transfer successful 🎉",
                              error: "Transfer failed ❌"
                            });
                          }}
                          isDisabled={!isAddress(transferAddress || "") || !isValidId}
                          defaultText="Transfer"
                        />
                      </div>
                    </div>
                  )}

                  {firstSelectedListing?.status === "CREATED" &&
                    firstSelectedListing?.listingType === "Direct" &&
                    firstSelectedListing?.startTime >= now && (
                      <div className="flex flex-col gap-4 p-8 mb-2 bg-white border dark:bg-secondaryBlack dark:border-jacarta-800 border-jacarta-100 rounded-2lg">
                        <div className="flex-col gap-8 sm:flex sm:flex-wrap">
                          <div className="flex items-center justify-between w-full gap-4">
                            <span className="text-base js-countdown-ends-label text-jacarta-100 dark:text-jacarta-100">
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

                  <Manage
                    chainId={chainId}
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
                    fetchOffers={fetchOffers}
                  />

                  {tokenDecimals &&
                    firstSelectedListing?.listingType === "Auction" &&
                    firstSelectedListing.startTime < now &&
                    firstSelectedListing.endTime > now &&
                    firstSelectedListing?.status === "CREATED" && (
                      <PlaceBid
                        setAmountToApprove={setAmountToApprove}
                        fetchOffers={fetchOffers}
                        bidsAmount={bidsAmount}
                        setBidsAmount={setBidsAmount}
                        chainId={Number(chainId)}
                        price={price as string}
                        allowanceTrue={allowanceTrue}
                        handleApprove={handleApprove}
                        dsponsorMpContract={dsponsorMpContract}
                        marketplaceListings={marketplaceListings}
                        currencySymbol={tokenSymbol as string}
                        tokenBalance={
                          tokenBalance as {
                            symbol: string;
                            value: BigNumber;
                            name: string;
                            decimals: number;
                            displayValue: string;
                          }
                        }
                        currencyTokenDecimals={tokenDecimals as number}
                        setSuccessFullBid={setSuccessFullBid}
                        successFullBid={successFullBid}
                        address={address as Address}
                        token={tokenDO}
                        isValidId={isValidId}
                        user={{
                          address,
                          isOwner,
                          isLister,
                          isUserOwner
                        }}
                        offer={offerDO}
                        referrer={{
                          address: referralAddress as Address
                        }}
                        currencyContract={tokenCurrencyAddress}
                        amountInEthWithSlippage={amountInEthWithSlippage as BigNumber}
                        displayedPrice={(displayedPrice as number)?.toString()}
                        setDisplayedPrice={setDisplayedPrice}
                        showBidsModal={showBidsModal}
                        setShowBidsModal={setShowBidsModal}
                        hasEnoughBalance={hasEnoughBalance}
                        hasEnoughBalanceForNative={hasEnoughBalanceForNative}
                        tokenEtherPriceRelayer={tokenEtherPriceRelayer}
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
          {isOwner && features.canSeeSubmittedAds && isValidId ? (
            <div className="container">
              <Accordion.Header className="w-full">
                <Accordion.Trigger
                  className={`${accordionActiveTab.includes("adSubmission") && "bg-primaryPurple"} w-full flex items-center justify-center gap-4 mb-6 border border-primaryPurple hover:bg-primaryPurple cursor-pointer p-2 rounded-lg`}
                >
                  <h2 className="text-3xl font-bold text-center text-jacarta-900 font-display dark:text-white ">
                    Ad Submission
                  </h2>
                  <ChevronDownIcon
                    className={`w-6 h-6 duration-300 ${accordionActiveTab.includes("adSubmission") && "transform rotate-180"}`}
                  />
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content className="mb-6">
                {isTokenInAuction && (
                  <div className="w-full text-center">
                    <span className="dark:text-warning text-md ">
                      ⚠️ You cannot submit an ad while your token is in auction.
                    </span>
                  </div>
                )}
                {!isTokenInAuction && (
                  <CarouselForm
                    handlePreviewModal={handlePreviewModal}
                    numSteps={numSteps}
                    currentSlide={currentSlide}
                    setCurrentSlide={setCurrentSlide}
                  >
                    {currentSlide === 0 && (
                      <AdBriefing
                        stepsRef={stepsRef}
                        styles={styles}
                        adParameters={adParameters}
                        setImageUrlVariants={setImageUrlVariants}
                        currentSlide={currentSlide}
                        numSteps={numSteps}
                      />
                    )}
                    {currentSlide === 2 && (
                      <AdURL
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
                          <AdImage
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
                  </CarouselForm>
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
            (token) =>
              !!token?.tokenId && tokenId && BigInt(token?.tokenId) === BigInt(tokenId as string)
          )?.mint &&
            isValidId &&
            features.canSeeSubmittedAds && (
              <>
                <Accordion.Header className="w-full">
                  <Accordion.Trigger
                    className={`${accordionActiveTab.includes("adValidation") && "bg-primaryPurple"} w-full flex items-center justify-center gap-4 mb-6 border border-primaryPurple hover:bg-primaryPurple cursor-pointer p-2 rounded-lg`}
                  >
                    {isOwner && sponsorHasAtLeastOneRejectedProposalAndNoPending && (
                      <ResponsiveTooltip text="You have at least one rejected proposal and no pending proposal.">
                        <ExclamationCircleIcon className="w-6 h-6 text-red" />
                      </ResponsiveTooltip>
                    )}
                    {isMedia && mediaShouldValidateAnAd && (
                      <ResponsiveTooltip text="You have at least one ad to validate or to refuse.">
                        <ExclamationCircleIcon className="w-6 h-6 text-red" />
                      </ResponsiveTooltip>
                    )}
                    <h2 className="text-3xl font-bold text-center text-jacarta-900 font-display dark:text-white ">
                      Ad Validation
                    </h2>
                    <ChevronDownIcon
                      className={`w-6 h-6 duration-300 ${accordionActiveTab.includes("adValidation") && "transform rotate-180"}`}
                    />
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content>
                  <AdValidation
                    chainConfig={chainConfig}
                    offer={offerData}
                    isOwner={isOfferOwner}
                    successFullRefuseModal={successFullRefuseModal}
                    setRefusedValidatedAdModal={setRefusedValidatedAdModal}
                    refusedValidatedAdModal={refusedValidatedAdModal}
                    setSuccessFullRefuseModal={setSuccessFullRefuseModal}
                    setSelectedItems={setSelectedItems}
                    sponsorHasAtLeastOneRejectedProposalAndNoPending={
                      sponsorHasAtLeastOneRejectedProposalAndNoPending
                    }
                    mediaShouldValidateAnAd={mediaShouldValidateAnAd}
                    isMedia={isMedia}
                    itemTokenId={tokenId as string}
                    isTokenView={true}
                    handleSubmit={handleValidationSubmit}
                    selectedItems={selectedItems}
                    pendingProposalData={pendingProposalData}
                    setPendingProposalData={setPendingProposalData}
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
                className={`${accordionActiveTab.includes("latestSales") && "bg-primaryPurple"} w-full flex items-center justify-center gap-4 mb-6 border border-primaryPurple hover:bg-primaryPurple cursor-pointer p-2 rounded-lg`}
              >
                <h2 className="text-3xl font-bold text-center text-jacarta-900 font-display dark:text-white ">
                  Latest Sales
                </h2>
                <ChevronDownIcon
                  className={`w-6 h-6 duration-300 ${accordionActiveTab.includes("latestSales") && "transform rotate-180"}`}
                />
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content className="mb-4">
              <LatestSales sales={sales} />
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
                  className={`${accordionActiveTab.includes("latestBids") && "bg-primaryPurple"} w-full flex items-center justify-center gap-4 mb-6 border border-primaryPurple hover:bg-primaryPurple cursor-pointer p-2 rounded-lg`}
                >
                  <h2 className="text-3xl font-bold text-center text-jacarta-900 font-display dark:text-white ">
                    Latest Bids
                  </h2>
                  <ChevronDownIcon
                    className={`w-6 h-6 duration-300 ${accordionActiveTab.includes("latestBids") && "transform rotate-180"}`}
                  />
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content className="mb-4">
                <LatestBids bids={bids} />
              </Accordion.Content>
            </div>
          </Accordion.Item>
        )}

      <Accordion.Item value="details">
        <div className="container">
          <Accordion.Header className="w-full">
            <Accordion.Trigger
              className={`${accordionActiveTab.includes("details") && "bg-primaryPurple"} w-full flex items-center justify-center gap-4 mb-6 border border-primaryPurple hover:bg-primaryPurple cursor-pointer p-2 rounded-lg`}
            >
              <h2 className="text-3xl font-bold text-center text-jacarta-900 font-display dark:text-white ">
                Details
              </h2>
              <ChevronDownIcon
                className={`w-6 h-6 duration-300 ${accordionActiveTab.includes("details") && "transform rotate-180"}`}
              />
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Content className="mb-12">
            <Details
              chainId={Number(chainId)}
              contractAddress={offerData?.nftContract?.id}
              isUserOwner={isUserOwner}
              initialCreator={offerData?.initialCreator}
              status={firstSelectedListing?.status}
              listerAddress={firstSelectedListing?.lister}
              offerData={offerData}
              contractOwner={owner}
            />
          </Accordion.Content>
        </div>
      </Accordion.Item>

      {showPreviewModal && (
        <div className="modal fade show bloc">
          <AdSubmission
            chainConfig={chainConfig}
            handlePreviewModal={handlePreviewModal}
            handleSubmit={handleSubmit}
            imageUrlVariants={imageUrlVariants}
            link={link ?? ""}
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
            adSubmission={true}
          />
        </div>
      )}
      {buyModal && (
        <div className="block modal fade show">
          <BuyModal
            chainConfig={chainConfig}
            tags={tags}
            finalPrice={finalPrice}
            currencyDecimals={tokenDecimals as number}
            finalPriceNotFormatted={finalPriceNotFormatted as string}
            tokenStatut={tokenStatut as string}
            allowanceTrue={allowanceTrue}
            handleApprove={handleApprove}
            successFullUpload={successFullUpload}
            feesAmount={feesAmount}
            successFullBuyModal={successFullBuyModal}
            royaltiesFeesAmount={royaltiesFeesAmount}
            price={price as string}
            handleSubmit={handleBuySubmit}
            handleBuyModal={handleBuyModal}
            handleBuySubmitWithNative={handleBuySubmit}
            name={name}
            image={imageUrl ?? "/images/gradients/gradient_creative.jpg"}
            selectedCurrency={tokenSymbol as string}
            royalties={royalties as number}
            tokenId={tokenId as string}
            tokenData={tokenData as string}
            formatTokenId={formatTokenId}
            address={address as Address}
            insufficentBalance={insufficentBalance}
            setInsufficentBalance={setInsufficentBalance}
            canPayWithNativeToken={canPayWithNativeToken}
            setCanPayWithNativeToken={setCanPayWithNativeToken}
            token={tokenDO}
            totalPrice={totalPrice as number}
            user={{
              address: address,
              isOwner: isOwner,
              isLister: isLister,
              isUserOwner: isUserOwner
            }}
            offer={offerDO}
            referrer={referralAddress as Address}
            currencyContract={tokenCurrencyAddress as Address}
            nativeTokenBalance={nativeTokenBalance}
            hasEnoughBalance={hasEnoughBalance}
            hasEnoughBalanceForNative={hasEnoughBalanceForNative}
            tokenEtherPriceRelayer={tokenEtherPriceRelayer}
          />
        </div>
      )}
      {failedCrossmintTransaction && (
        <CrossmintFail setCrossmintTransactionFailed={setFailedCrossmintTransaction} />
      )}
    </Accordion.Root>
  );
};

export default Token;
