import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Meta from "@/components/Meta";
import { ethers, BigNumber } from "ethers";
import Image from "next/image";
import {
  useContract,
  useContractWrite,
  useContractRead,
  useAddress,
  useStorage
} from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

import Tippy from "@tippyjs/react";
import OfferSkeleton from "@/components/ui/skeletons/OfferSkeleton";
import { fetchOffer } from "@/utils/graphql/fetchOffer";
import Integration from "@/components/features/offer/offerManagement/Integration";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import ResponsiveTooltip from "@/components/ui/ResponsiveTooltip";
import Form from "@/components/features/offer/search/SearchForm";
import "tippy.js/dist/tippy.css";
import AdValidation from "@/components/features/offer/AdValidation";
import Details from "@/components/features/token/accordion/Details";
import config from "@/config/config";
import { useSwitchChainContext } from "@/hooks/useSwitchChainContext";
import { features } from "@/data/features";
import UpdateOffer from "@/components/features/offer/offerManagement/UpdateOffer";
import ChangeMintPrice from "@/components/features/offer/offerManagement/ChangeMintPrice";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import { BadgePercentIcon, BlocksIcon, RefreshCwIcon } from "lucide-react";
import Disable from "@/components/ui/misc/Disable";
import TokenCard from "@/components/ui/cards/TokenCard";
import { addLineBreaks } from "@/utils/misc/addLineBreaks";
import Input from "../ui/Input";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import DsponsorNftABI from "@/abi/dsponsorNFT.json";

const onAuctionCondition = (offer, mint, direct) => {
  return (
    (offer?.status === "CREATED" &&
      (offer?.listingType === "Auction" || (offer?.listingType === "Direct" && direct)) &&
      Number(offer?.quantity) > 0 &&
      new Date(Number(offer?.startTime) * 1000) < new Date() &&
      new Date(Number(offer?.endTime) * 1000) > new Date()) ||
    (mint && offer?.mint === null)
  );
};

type SortOptionsType = "Price: low to high" | "Price: high to low" | "Ending soon" | "Sort by name";

const Offer = () => {
  const router = useRouter();
  const storage = useStorage();

  const offerId = router.query?.offerId;
  const chainId = router.query?.chainId as string;
  const relayerURL = config[chainId]?.relayerURL;

  const [refusedValidatedAdModal, setRefusedValidatedAdModal] = useState<boolean>(false);
  const [offerData, setOfferData] = useState<any>(null);
  const [royalties, setRoyalties] = useState<number | null>(null);
  const [, setCurrency] = useState(null);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [, setPrice] = useState<number | null>(null);
  const [imageModal, setImageModal] = useState(false);
  const [showEntireDescription, setShowEntireDescription] = useState<boolean>(false);
  const [pendingProposalData, setPendingProposalData] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const address = useAddress();
  const { contract: DsponsorAdminContract } = useContract(
    config[chainId]?.smartContracts?.DSPONSORADMIN?.address,
    config[chainId]?.smartContracts?.DSPONSORADMIN?.abi
  );
  const { mutateAsync } = useContractWrite(DsponsorAdminContract, "reviewAdProposals");
  const [urlFromChild, setUrlFromChild] = useState("");
  const [successFullRefuseModal, setSuccessFullRefuseModal] = useState(false);
  const [tokenData, setTokenData] = useState("");
  const [isWordAlreadyTaken, setIsWordAlreadyTaken] = useState(false);
  const { contract: tokenContract } = useContract(
    offerData?.nftContract?.prices?.[0]?.currency,
    "token"
  );
  const { data: symbolContract } = useContractRead(tokenContract, "symbol");
  const { data: decimalsContract } = useContractRead(tokenContract, "decimals");
  const NATIVECurrency = config[chainId]?.smartContracts?.NATIVE;
  const { setSelectedChain } = useSwitchChainContext();
  const [, setCanChangeMintPrice] = useState(false);
  const [offerManagementActiveTab, setOfferManagementActiveTab] = useState("integration");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [accordionActiveTab, setAccordionActiveTab] = useState<string[]>(["tokens"]);
  const [filterName, setFilterName] = useState("");
  const [filterOption, setFilterOption] = useState<"All tokens" | "On auction">("All tokens");
  const [sortOption, setSortOption] = useState<SortOptionsType>("Sort by name");

  /*
  const [currencyDecimals, setCurrencyDecimals] = useState<number | null>(null);
  const [currencySymbol, setCurrencySymbol] = useState<string | null>(null);
 
  useEffect(() => {
   
    if (decimalsContract) {
      setCurrencyDecimals(decimalsContract);
    }

    if (symbolContract) {
      setCurrencySymbol(symbolContract);
    }
  }, [decimalsContract, symbolContract]);
*/

  const { data: bps } = useContractRead(DsponsorAdminContract, "feeBps");
  const maxBps = 10000;

  let tokenCurrencyAddress = offerData?.nftContract?.prices[0]?.currency;

  const {
    description = "description not found",
    id = "1",
    name = "DefaultName"
  } = offerData?.metadata?.offer ? offerData.metadata.offer : {};

  useEffect(() => {
    if (offerData?.metadata?.offer?.image) {
      setImageUrl(offerData.metadata.offer.image);
    } else {
      setImageUrl("/images/gradients/gradient_creative.jpg");
    }
  }, [offerData]);

  const [itemProposals, setItemProposals] = useState<any | null>(null);
  const [mediaShouldValidateAnAd, setMediaShouldValidateAnAd] = useState(false);
  const [
    sponsorHasAtLeastOneRejectedProposalAndNoPending,
    setSponsorHasAtLeastOneRejectedProposalAndNoPending
  ] = useState(false);
  const [offers, setOffers] = useState<any[] | null>(null);
  const [isMedia, setIsMedia] = useState(false);

  const fetchAllOffersRef = React.useRef(false);

  useEffect(() => {
    const fetchOffers = async () => {
      if (fetchAllOffersRef.current) return;
      fetchAllOffersRef.current = true;

      try {
        const offers = await fetchOffer(chainId, offerId);
        setOffers(offers);

        const offerData = offers?.filter((offer) => Number(offer?.id) === Number(offerId))[0];
        const offerDataFinal = {
          ...offerData,
          chainConfig: offers?.filter((offer) => Number(offer?.id) === Number(offerId))[0]
            ?.chainConfig
        };

        offerDataFinal.nftContract.tokens = offerDataFinal.nftContract.tokens.map((token) => {
          const currentListing = token?.marketplaceListings?.sort(
            (a, b) => Number(b.id) - Number(a.id)
          )[0];
          const currencyDecimals =
            currentListing?.listingType === "Auction" || currentListing?.listingType === "Direct"
              ? Number(currentListing?.currencyDecimals)
              : Number(token?.nftContract?.prices[0]?.currencyDecimals);

          const currencySymbol =
            currentListing?.listingType === "Auction" || currentListing?.listingType === "Direct"
              ? currentListing?.currencySymbol
              : token?.nftContract?.prices[0]?.currencySymbol;

          const listingType = currentListing?.listingType;
          const quantity = currentListing?.quantity;
          const numberOfBids = currentListing?.bids.length;
          const sold =
            currentListing?.status === "COMPLETED" ||
            (!currentListing?.listingType && token?.mint !== null);
          const currency =
            token?.marketplaceListings?.sort((a, b) => Number(b.id) - Number(a.id))[0]?.currency ??
            token?.nftContract?.prices[0]?.currency;

          const directPriceUsdcBN = BigNumber.from(
            token?.marketplaceListings?.sort((a, b) => Number(b.id) - Number(a.id))?.[0]
              ?.buyPriceStructureUsdc?.buyoutPricePerToken ?? 0
          );
          const directPriceUsdcFormatted = token?.marketplaceListings?.sort(
            (a, b) => Number(b.id) - Number(a.id)
          )?.[0]?.buyPriceStructureUsdcFormatted?.buyoutPricePerToken;

          const auctionPriceUsdcBN = BigNumber.from(
            token?.marketplaceListings?.sort((a, b) => Number(b.id) - Number(a.id))?.[0]
              ?.bidPriceStructureUsdc?.minimalBidPerToken ?? 0
          );
          const auctionPriceUsdcFormatted = token?.marketplaceListings?.sort(
            (a, b) => Number(b.id) - Number(a.id)
          )?.[0]?.bidPriceStructureUsdcFormatted?.minimalBidPerToken;

          const mintPriceUsdcBN = BigNumber.from(
            token?.nftContract?.prices?.[0]?.mintPriceStructureUsdc?.totalAmount ?? 0
          );
          const mintPriceUsdcFormatted =
            token?.nftContract?.prices?.[0]?.mintPriceStructureUsdcFormatted?.totalAmount;

          const usdcPriceBN = {
            USDCPrice:
              listingType === "Auction"
                ? auctionPriceUsdcBN
                : listingType === "Direct"
                  ? directPriceUsdcBN
                  : mintPriceUsdcBN,
            decimals: 6
          };
          const usdcPriceFormatted =
            listingType === "Auction"
              ? auctionPriceUsdcFormatted
              : listingType === "Direct"
                ? directPriceUsdcFormatted
                : mintPriceUsdcFormatted;

          return {
            ...token,
            listingType: currentListing?.listingType,
            endTime: currentListing?.endTime,
            status: currentListing?.status,
            startTime: currentListing?.startTime,
            currencySymbol,
            currencyDecimals,
            quantity,
            sold,
            numberOfBids,
            currency,
            directPrice: currentListing?.buyPriceStructure?.buyoutPricePerToken,
            auctionPrice: currentListing?.bidPriceStructure?.minimalBidPerToken,
            mintPrice: token?.nftContract?.prices[0]?.amount,
            usdcPriceBN,
            usdcPriceFormatted
          };
        });

        setOfferData(offerDataFinal);
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        fetchAllOffersRef.current = false;
      }
    };

    if (chainId) {
      fetchOffers();
    }
  }, [chainId, offerId]);

  useEffect(() => {
    if (offerData && address) {
      if (offerData?.admins?.includes(address?.toLowerCase())) {
        setIsMedia(true);
      } else {
        setIsMedia(false);
      }
    }
  }, [address, offerData]);

  useEffect(() => {
    if (offers) {
      // we want to get all the proposals for all the items from an offer (accept, reject, pending, all)
      // for that we filter the offers to associate the offer with the offerId
      const itemsOffers = offers?.filter((offer) => offer?.id === offerId);

      // we extract the only element from the array
      const tokenOffers = itemsOffers[0];

      // then we get the proposals for the offer but the offer contains multiple tokens in the nftContract key
      // we get the accepted, pending, rejected and all proposals
      // so we need get every proposals for every tokens in the nftContract key of tokenOffers
      // we filter the proposals to get the accepted, pending and rejected proposals
      // for that we can use the status key of the proposal "CURRENT_ACCEPTED", "CURRENT_PENDING", "CURRENT_REJECTED"
      const allProposals = tokenOffers?.nftContract?.tokens?.map((token) => {
        const acceptedProposals = token?.allProposals?.filter(
          (proposal) => proposal?.status === "CURRENT_ACCEPTED"
        );
        const pendingProposals = token?.allProposals?.filter(
          (proposal) => proposal?.status === "CURRENT_PENDING"
        );
        const rejectedProposals = token?.allProposals?.filter(
          (proposal) => proposal?.status === "CURRENT_REJECTED"
        );

        return {
          acceptedProposals,
          pendingProposals,
          rejectedProposals
        };
      });

      // we flatten the array of proposals
      const acceptedProposals = allProposals?.map((proposal) => proposal?.acceptedProposals).flat();
      const pendingProposals = allProposals?.map((proposal) => proposal?.pendingProposals).flat();
      const rejectedProposals = allProposals?.map((proposal) => proposal?.rejectedProposals).flat();

      const itemProposals = {
        name: name ?? "",
        pendingProposals,
        rejectedProposals,
        acceptedProposals,
        allProposals
      };

      setItemProposals(itemProposals);
    }
  }, [name, offers, offerId]);

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

  useEffect(() => {
    const fetchImage = async (imageUrlLocal) => {
      if (!storage) return;

      try {
        const ipfsUrl = await storage.resolveScheme(imageUrlLocal);
        setImageUrl(ipfsUrl);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    if (imageUrl && typeof imageUrl === "string" && imageUrl.startsWith("ipfs://")) {
      fetchImage(imageUrl);
    }
  }, [imageUrl, storage]);

  useEffect(() => {
    if (chainId) {
      setSelectedChain(config[chainId]?.network);
    }
  }, [chainId, setSelectedChain]);

  useEffect(() => {
    if (
      address &&
      (address?.toLowerCase() === offerData?.nftContract?.owner?.newOwner?.toLowerCase() ||
        offerData?.admins?.includes(address.toLowerCase()))
    ) {
      setCanChangeMintPrice(true);
      setIsOwner(true);
    }
  }, [address, offerData]);

  useEffect(() => {
    if (!offerData) return;
    try {
      const currencyTokenObject: any = {};
      if (
        !decimalsContract &&
        !symbolContract &&
        tokenCurrencyAddress === "0x0000000000000000000000000000000000000000"
      ) {
        currencyTokenObject.symbol = NATIVECurrency.symbol;
        currencyTokenObject.decimals = NATIVECurrency.decimals;
      } else {
        currencyTokenObject.symbol = symbolContract;
        currencyTokenObject.decimals = decimalsContract;
      }

      if (!bps || !maxBps) {
        return;
      }

      if (!offerData?.nftContract?.prices[0]?.amount) {
        return;
      }

      const bigIntPrice =
        (BigInt(offerData?.nftContract?.prices[0]?.amount) * (BigInt(bps) + BigInt(maxBps))) /
        BigInt(maxBps);
      const formatPrice = parseFloat(
        ethers.utils.formatUnits(bigIntPrice, currencyTokenObject.decimals)
      );

      setPrice(Number(Math.ceil(formatPrice * 1000) / 1000));
      setCurrency(currencyTokenObject);
    } catch (e) {
      console.error("Error: Currency not found for address", offerData?.nftContract?.prices[0], e);
    }
  }, [symbolContract, decimalsContract, offerData, bps, NATIVECurrency, tokenCurrencyAddress]);

  useEffect(() => {
    if (offerData?.nftContract?.royalty?.bps) {
      setRoyalties(offerData?.nftContract?.royalty?.bps / 100);
    } else {
      setRoyalties(0);
    }
  }, [offerData]);

  const handleSubmit = async (submissionArgs) => {
    try {
      const tags = [`${chainId}-adOffer-${offerId}`];
      for (const admin of offerData.admins) {
        tags.push(`${chainId}-userAddress-${admin}`);
      }
      const sdk = new ThirdwebSDK(config[chainId]?.network);
      const contract = await sdk.getContract(offerData.nftContract.id, DsponsorNftABI);

      for (const sub of submissionArgs) {
        const owner = await contract.call("ownerOf", [sub.tokenId]);
        tags.push(`${chainId}-userAddress-${owner}`);
      }

      await mutateAsync({
        args: [submissionArgs]
      });

      await fetch(`${relayerURL}/api/revalidate`, {
        method: "POST",
        body: JSON.stringify({
          tags
        })
      });

      setRefusedValidatedAdModal(true);
      setSuccessFullRefuseModal(true);
    } catch (error) {
      console.error("Erreur de validation du token:", error);
      setSuccessFullRefuseModal(false);
      throw error;
    }
  };
  const handleUrlChange = (newUrl, tokenData) => {
    setIsWordAlreadyTaken(false);
    setUrlFromChild(newUrl);
    setTokenData(tokenData);
    for (const token of offerData.nftContract.tokens) {
      if (token.mint === null) return;
      if (tokenData?.toLowerCase() === token.mint.tokenData?.toLowerCase()) {
        setIsWordAlreadyTaken(true);
      }
    }
  };
  const metadata = {
    title: `Offer || SiBorg Ads - The Web3 Monetization Solution`,
    keyword:
      "audience engagement, web3, creator economic, NFT, creator monetization, creator economy, creator token, creator coin, creator tokenization, creator economy",

    desc: "Explore the future of media monetization. SiBorg Ads decentralized platform offers tokenized advertising spaces for dynamic and sustainable media funding."
  };

  const filteredOffers = useMemo(() => {
    if (!offerData || !offerData?.nftContract?.tokens) {
      return [];
    }
    let tempOffers = [...offerData.nftContract.tokens];

    if (filterName.length > 0) {
      tempOffers = tempOffers.filter((offer) =>
        offer?.metadata.name?.toLowerCase().includes(filterName.toLowerCase())
      );
    }

    if (filterOption === "On auction") {
      tempOffers = tempOffers.filter((offer) => onAuctionCondition(offer, false, false));
    }

    switch (sortOption) {
      case "Price: low to high": {
        let liveAuctions = [...tempOffers].filter((auction) =>
          onAuctionCondition(auction, true, true)
        );
        liveAuctions = [...liveAuctions].sort((a, b) => {
          if (a?.usdcPriceBN?.USDCPrice.lt(b?.usdcPriceBN?.USDCPrice)) {
            return -1;
          } else if (a?.usdcPriceBN?.USDCPrice.gt(b?.usdcPriceBN?.USDCPrice)) {
            return 1;
          } else {
            return 0;
          }
        });

        const otherAuctions = tempOffers.filter(
          (auction) => !onAuctionCondition(auction, true, true)
        );

        tempOffers = [...liveAuctions, ...otherAuctions];

        break;
      }
      case "Price: high to low": {
        let liveAuctions = [...tempOffers].filter((auction) =>
          onAuctionCondition(auction, true, true)
        );
        liveAuctions = [...liveAuctions].sort((a, b) => {
          if (a?.usdcPriceBN?.USDCPrice.gt(b?.usdcPriceBN?.USDCPrice)) {
            return -1;
          } else if (a?.usdcPriceBN?.USDCPrice.lt(b?.usdcPriceBN?.USDCPrice)) {
            return 1;
          } else {
            return 0;
          }
        });

        let otherAuctions = [...tempOffers].filter(
          (auction) => !onAuctionCondition(auction, true, true)
        );

        tempOffers = [...liveAuctions, ...otherAuctions];
        break;
      }
      case "Ending soon": {
        const liveAuctions = tempOffers.filter(
          (offer) => onAuctionCondition(offer, true, true) && offer.endTime
        );

        liveAuctions.sort((a, b) => a.endTime - b.endTime);

        const notLiveAuctions = tempOffers.filter(
          (offer) => !onAuctionCondition(offer, true, true) || !offer.endTime
        );

        tempOffers = [...liveAuctions, ...notLiveAuctions];
        break;
      }
      case "Sort by name":
        tempOffers.sort((a, b) => a.metadata.name.localeCompare(b.metadata.name));
        break;
    }

    return tempOffers;
  }, [offerData, filterName, filterOption, sortOption]);

  if (!filteredOffers) {
    return (
      <div>
        <OfferSkeleton />
      </div>
    );
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
        <div className="container flex justify-center mb-6">
          <h1 className="mb-6 text-5xl font-bold text-center text-jacarta-900 font-display dark:text-white md:text-left lg:text-6xl xl:text-6xl">
            Offer{" "}
          </h1>
        </div>
        <picture className="absolute inset-0 pointer-events-none -z-10 dark:hidden">
          <img
            width={750}
            height={750}
            src={imageUrl ?? "/images/gradients/gradient_creative.jpg"}
            alt="gradient"
            className="object-cover w-full h-auto aspect-square"
          />
        </picture>
        <div className="container">
          {/* <!-- Item --> */}

          <div className="md:flex md:flex-wrap" key={id}>
            {/* <!-- Image --> */}
            <figure className="relative flex items-start justify-center w-full mb-8 md:mb-0 md:w-2/5 md:flex-shrink-0 md:flex-grow-0 md:basis-auto lg:w-1/2">
              <button
                className="right-0 w-full md:sticky md:top-0"
                onClick={() => setImageModal(true)}
              >
                {imageUrl && (
                  <Image
                    width={585}
                    height={726}
                    src={imageUrl ?? "/images/gradients/gradient_creative.jpg"}
                    alt="image"
                    className="object-contain w-full h-auto shadow-lg cursor-pointer rounded-2xl"
                  />
                )}
              </button>

              {/* <!-- Modal Backdrop --> */}
              {imageModal && (
                <div
                  className="fixed inset-0 z-50 bg-black bg-opacity-50"
                  onClick={(e) => {
                    if (e.target === e.currentTarget) {
                      setImageModal(false);
                    }
                  }}
                >
                  {/* <!-- Modal --> */}
                  <div className="modal-dialog !my-0 flex items-center justify-center">
                    <div className="block modal fade show">
                      <div className="modal-dialog !my-0 flex items-center justify-center">
                        <img
                          src={imageUrl ?? "/images/gradients/gradient_creative.jpg"}
                          alt="image"
                          className="object-cover w-full h-auto rounded-2xl aspect-square"
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
                  </div>
                  {/* <!-- end modal --> */}
                </div>
              )}
            </figure>

            {/* <!-- Details --> */}
            <div className="md:w-3/5 md:basis-auto md:pl-8 lg:w-1/2 lg:pl-[3.75rem]">
              {/* <!-- Collection / Likes / Actions --> */}
              <div className="flex mb-3">
                {/* <!-- Collection --> */}
                <div className="flex items-center">
                  <Link
                    href={`/profile/${offerData?.initialCreator}`}
                    className="mr-2 text-sm font-bold text-primaryPurple"
                  >
                    {offerData?.initialCreator}
                  </Link>
                </div>
              </div>

              <h2 className="mb-4 text-3xl font-semibold font-display text-jacarta-900 dark:text-white">
                {name}
              </h2>

              <div className="flex flex-wrap items-center gap-2 mb-8 space-x-4 whitespace-nowrap">
                {offerData?.nftContract?.allowList && (
                  <span className="text-sm dark:text-jacarta-100 text-jacarta-100">
                    {offerData?.nftContract?.maxSupply -
                      offerData?.nftContract?.tokens?.filter((item) => item.mint != null)?.length}
                    /{offerData?.nftContract?.maxSupply} available
                  </span>
                )}
                <span className="block text-sm text-jacarta-100 dark:text-white">
                  Creator <strong>{royalties}% royalties</strong>
                </span>
              </div>

              {showEntireDescription ? (
                <div className="mb-10 dark:text-jacarta-100">
                  {addLineBreaks(description)}{" "}
                  {description?.length > 1000 && (
                    <button
                      onClick={() => setShowEntireDescription(false)}
                      className="text-primaryPurple"
                    >
                      Show less
                    </button>
                  )}
                </div>
              ) : (
                <div className="mb-10 dark:text-jacarta-100">
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
                </div>
              )}

              {(offerData?.disable === true ||
                new Date(offerData?.metadata?.offer?.valid_to).getTime() < Date.now() ||
                offerData?.nftContract?.prices[0]?.enabled === false) && <Disable isOffer={true} />}

              {isOwner && (
                <div className="p-8 bg-white border dark:bg-secondaryBlack dark:border-jacarta-800 border-jacarta-100 rounded-2lg">
                  <div className=" sm:flex sm:flex-wrap">
                    <span className="text-sm dark:text-jacarta-100 text-jacarta-100">
                      This page allows you to oversee submitted ads, offering tools to either
                      approve or reject them. Approve ads to make them live or reject those that
                      don&apos;t meet your standards, streamlining the content that reaches your
                      audience while maintaining quality control on your platform.{" "}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Accordion.Item value="search">
        {!offerData?.nftContract?.allowList && (
          <div className="container flex flex-col justify-center">
            <Accordion.Header className="w-full">
              <Accordion.Trigger
                className={`${accordionActiveTab.includes("search") && "bg-primaryPurple"} w-full flex items-center justify-center gap-4 mb-6 border border-primaryPurple hover:bg-primaryPurple cursor-pointer p-2 rounded-lg`}
              >
                <h2 className="text-3xl font-bold text-center text-jacarta-900 font-display dark:text-white ">
                  Search
                </h2>
                <ChevronDownIcon
                  className={`w-6 h-6 duration-300 ${accordionActiveTab.includes("search") && "transform rotate-180"}`}
                />
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content className="mb-4">
              <div className="p-8 mb-6 bg-white border dark:bg-secondaryBlack dark:border-jacarta-800 border-jacarta-100 rounded-2lg">
                <div className=" sm:flex sm:flex-wrap">
                  <span className="text-sm dark:text-jacarta-100 text-jacarta-100">
                    You can check if a word is available for purchase by using the search bar.
                    Simply type the word into the search bar and press enter to see if it is
                    available. This feature allows you to quickly find out if the word you are
                    interested in is free for acquisition.{" "}
                  </span>
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <Form offerId={offerId} onUrlChange={handleUrlChange} />
              </div>
              {urlFromChild && (
                <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
                  <article className="relative">
                    <div className="dark:bg-secondaryBlack dark:border-jacarta-700 border-jacarta-100 rounded-2xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg text-jacarta-100">
                      {isWordAlreadyTaken ? (
                        <span className="text-red ">This word is already taken ❌</span>
                      ) : (
                        <span className="text-green ">This word is available 🎉</span>
                      )}
                      <figure className="mt-2">
                        <Link href={urlFromChild ?? "#"}>
                          {imageUrl && (
                            <Image
                              src={imageUrl ?? ""}
                              alt="logo"
                              height={230}
                              width={230}
                              className="rounded-[0.625rem] w-full lg:h-[230px] object-contain"
                              loading="lazy"
                            />
                          )}
                        </Link>
                      </figure>
                      <div className="flex items-center justify-between gap-4 mt-4">
                        <Tippy content={<span className="p-2">{name}</span>}>
                          <Link
                            href={urlFromChild ?? "#"}
                            className="overflow-hidden text-ellipsis whitespace-nowrap min-w-[120px]"
                          >
                            <span className="text-base font-display text-jacarta-900 hover:text-primaryPurple dark:text-white ">
                              {name}
                            </span>
                          </Link>
                        </Tippy>

                        <Tippy content={<span className="p-2">{tokenData}</span>}>
                          <div className="dark:border-jacarta-800 border-jacarta-100 max-w-[100px] overflow-hidden text-ellipsis flex items-center whitespace-nowrap rounded-md border py-1 px-2">
                            <span className="overflow-hidden text-sm font-medium tracking-tight text-green text-ellipsis whitespace-nowrap">
                              {" "}
                              {tokenData}
                            </span>
                          </div>
                        </Tippy>
                      </div>
                    </div>
                  </article>
                </div>
              )}
            </Accordion.Content>
          </div>
        )}
      </Accordion.Item>

      <Accordion.Item value="tokens">
        <div className="container">
          <Accordion.Header className="w-full">
            <Accordion.Trigger
              className={`${accordionActiveTab.includes("tokens") && "bg-primaryPurple"} w-full flex items-center justify-center gap-4 mb-6 border border-primaryPurple hover:bg-primaryPurple cursor-pointer p-2 rounded-lg`}
            >
              <h2 className="text-3xl font-bold text-center text-jacarta-900 font-display dark:text-white ">
                Tokens
              </h2>
              <ChevronDownIcon
                className={`w-6 h-6 duration-300 ${accordionActiveTab.includes("tokens") && "transform rotate-180"}`}
              />
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Content className="flex flex-col gap-7">
            <div className="flex items-center justify-center p-4 bg-white border dark:bg-secondaryBlack dark:border-jacarta-800 border-jacarta-100 rounded-2lg">
              <div className="items-center justify-center sm:flex sm:flex-wrap">
                <span className="text-sm text-center dark:text-jacarta-100 text-jacarta-100">
                  This section allows you to see every tokens associated with the offer.
                </span>
              </div>
            </div>
            <div className="flex flex-row flex-wrap-reverse items-center justify-end gap-2 mb-4 sm:gap-4">
              <div className="flex w-full mr-0 md:mr-auto md:max-w-[500px]">
                <Input
                  type="text"
                  placeholder="Search..."
                  name="search"
                  value={filterName}
                  onChange={(e) => {
                    setFilterName(e.target.value);
                  }}
                />
              </div>
              <Menu as="div" className="h-12 w-fit">
                <MenuButton className="flex items-center justify-center w-full h-full px-4 border bg-secondaryBlack rounded-xl hover:bg-opacity-80 border-jacarta-100 border-opacity-10">
                  <div className="flex items-center gap-1">
                    {filterOption} <ChevronDownIcon className="w-5 h-5" />
                  </div>
                </MenuButton>

                <MenuItems
                  anchor="bottom start"
                  className={`rounded-xl flex flex-col gap-2 [--anchor-gap:1rem] bg-secondaryBlack p-2 border border-jacarta-100 border-opacity-10`}
                >
                  <MenuItem>
                    <button
                      onClick={() => {
                        setFilterOption("All tokens");
                      }}
                      className="w-full p-2 pr-12 rounded-lg hover:bg-primaryBlack md:pr-24"
                    >
                      <span>All tokens</span>
                    </button>
                  </MenuItem>

                  <MenuItem>
                    <button
                      onClick={() => {
                        setFilterOption("On auction");
                      }}
                      className="w-full p-2 pr-12 rounded-lg hover:bg-primaryBlack md:pr-24"
                    >
                      <span>On auction</span>
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>

              <Menu as="div" className="h-12 w-fit">
                <MenuButton className="flex items-center justify-center w-full h-full px-4 border bg-secondaryBlack rounded-xl hover:bg-opacity-80 border-jacarta-100 border-opacity-10">
                  <div className="flex items-center gap-1">
                    {sortOption ?? "Sort by"} <ChevronDownIcon className="w-5 h-5" />
                  </div>
                </MenuButton>

                <MenuItems
                  anchor="bottom start"
                  className={`rounded-xl flex flex-col gap-2 [--anchor-gap:1rem] bg-secondaryBlack p-2 border border-jacarta-100 border-opacity-10`}
                >
                  <MenuItem>
                    <button
                      onClick={() => {
                        setSortOption("Sort by name");
                      }}
                      className="w-full p-2 pr-12 text-left rounded-lg hover:bg-primaryBlack md:pr-24"
                    >
                      <span>Sort by name</span>
                    </button>
                  </MenuItem>

                  <MenuItem>
                    <button
                      onClick={() => {
                        setSortOption("Price: low to high");
                      }}
                      className="w-full p-2 pr-12 text-left rounded-lg hover:bg-primaryBlack md:pr-24"
                    >
                      <span>Price: low to high</span>
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={() => {
                        setSortOption("Price: high to low");
                      }}
                      className="w-full p-2 pr-12 text-left rounded-lg hover:bg-primaryBlack md:pr-24"
                    >
                      <span>Price: high to low</span>
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={() => {
                        setSortOption("Ending soon");
                      }}
                      className="w-full p-2 pr-12 text-left rounded-lg hover:bg-primaryBlack md:pr-24"
                    >
                      <span>Ending soon</span>
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-3 lg:grid-cols-4">
              {filteredOffers?.map((token, index) => {
                const finalToken = {
                  ...token,
                  chainConfig: offerData?.chainConfig
                };

                return (
                  <TokenCard
                    key={index}
                    item={finalToken}
                    isToken={true}
                    listingType={finalToken.listingType}
                    isListing={finalToken.listingType}
                    isAuction={finalToken.listingType === "Auction"}
                    url={`/${chainId}/offer/${offerId}/${finalToken?.tokenId}${finalToken?.mint?.tokenData ? `?tokenData=${finalToken?.mint?.tokenData}` : ""}`}
                    tokenId={finalToken.tokenId}
                    offer={finalToken}
                    currencyDecimals={finalToken.currencyDecimals}
                    currencySymbol={finalToken.currencySymbol}
                    usdcPriceFormatted={finalToken.usdcPriceFormatted}
                  />
                );
              })}
            </div>
          </Accordion.Content>
        </div>
      </Accordion.Item>

      <Accordion.Item value="adValidation">
        <div className="container">
          {features.canSeeSubmittedAds && (
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
                  setSuccessFullRefuseModal={setSuccessFullRefuseModal}
                  setSelectedItems={setSelectedItems}
                  selectedItems={selectedItems}
                  offer={offerData}
                  offerId={offerId as string}
                  isOwner={isOwner}
                  handleSubmit={handleSubmit}
                  successFullRefuseModal={successFullRefuseModal}
                  setRefusedValidatedAdModal={setRefusedValidatedAdModal}
                  refusedValidatedAdModal={refusedValidatedAdModal}
                  sponsorHasAtLeastOneRejectedProposalAndNoPending={
                    sponsorHasAtLeastOneRejectedProposalAndNoPending
                  }
                  setSponsorHasAtLeastOneRejectedProposalAndNoPending={
                    setSponsorHasAtLeastOneRejectedProposalAndNoPending
                  }
                  mediaShouldValidateAnAd={mediaShouldValidateAnAd}
                  isMedia={isMedia}
                  itemTokenId={offerData?.nftContract?.id}
                  pendingProposalData={pendingProposalData}
                  setPendingProposalData={setPendingProposalData}
                />
              </Accordion.Content>
            </>
          )}
        </div>
      </Accordion.Item>

      <Accordion.Item value="offerManagement">
        {isOwner && (
          <div className="container">
            <Accordion.Header className="w-full">
              <Accordion.Trigger
                className={`${accordionActiveTab.includes("offerManagement") && "bg-primaryPurple"} w-full flex items-center justify-center gap-4 mb-6 border border-primaryPurple hover:bg-primaryPurple cursor-pointer p-2 rounded-lg`}
              >
                <h2 className="text-3xl font-bold text-center text-jacarta-900 font-display dark:text-white ">
                  Offer Management
                </h2>
                <ChevronDownIcon
                  className={`w-6 h-6 duration-300 ${accordionActiveTab.includes("offerManagement") && "transform rotate-180"}`}
                />
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content className="mb-8">
              <Tabs className="tabs">
                <TabList className="flex items-center justify-start pb-px mb-12 overflow-x-auto overflow-y-hidden border-b nav nav-tabs hide-scrollbar border-jacarta-100 dark:border-jacarta-800 md:justify-center">
                  <Tab
                    className="nav-item"
                    onClick={() => setOfferManagementActiveTab("integration")}
                  >
                    <button
                      className={
                        offerManagementActiveTab === "integration"
                          ? "nav-link hover:text-jacarta-900 text-jacarta-100 relative flex items-center whitespace-nowrap py-3 px-4 dark:hover:text-white active font-semibold"
                          : "nav-link hover:text-jacarta-900 text-jacarta-100 relative flex items-center whitespace-nowrap py-3 px-4 dark:hover:text-white font-semibold"
                      }
                    >
                      <span className="mr-2">
                        <BlocksIcon className="w-4 h-4" />
                      </span>
                      Integration
                    </button>
                  </Tab>
                  <Tab
                    className="nav-item"
                    key={id}
                    onClick={() => setOfferManagementActiveTab("updateOffer")}
                  >
                    <button
                      className={
                        offerManagementActiveTab === "updateOffer"
                          ? "nav-link hover:text-jacarta-900 text-jacarta-100 relative flex items-center whitespace-nowrap py-3 px-4 dark:hover:text-white active font-semibold"
                          : "nav-link hover:text-jacarta-900 text-jacarta-100 relative flex items-center whitespace-nowrap py-3 px-4 dark:hover:text-white font-semibold"
                      }
                    >
                      <span className="mr-2">
                        <RefreshCwIcon className="w-4 h-4" />
                      </span>
                      Update Offer
                    </button>
                  </Tab>
                  <Tab
                    className="nav-item"
                    onClick={() => setOfferManagementActiveTab("changeMintPrice")}
                  >
                    <button
                      className={
                        offerManagementActiveTab === "changeMintPrice"
                          ? "nav-link hover:text-jacarta-900 text-jacarta-100 relative flex items-center whitespace-nowrap py-3 px-4 dark:hover:text-white active font-semibold"
                          : "nav-link hover:text-jacarta-900 text-jacarta-100 relative flex items-center whitespace-nowrap py-3 px-4 dark:hover:text-white font-semibold"
                      }
                    >
                      <span className="mr-2">
                        <BadgePercentIcon className="w-4 h-4" />
                      </span>
                      Change Initial Price
                    </button>
                  </Tab>
                </TabList>

                <TabPanel>
                  <Integration
                    chainId={parseInt(chainId)}
                    offerId={parseInt(offerId as string)}
                    offerTokens={offerData?.nftContract?.tokens}
                    offerData={offerData}
                  />
                </TabPanel>
                <TabPanel>
                  <UpdateOffer offer={offerData} />
                </TabPanel>
                <TabPanel>
                  <ChangeMintPrice offer={offerData} />
                </TabPanel>
              </Tabs>
            </Accordion.Content>
          </div>
        )}
      </Accordion.Item>

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

          <Accordion.Content className="mb-8">
            <Details
              contractAddress={offerData?.nftContract?.id}
              initialCreator={offerData?.initialCreator}
              isToken={false}
              offerData={offerData}
              chainId={parseFloat(chainId)}
            />
          </Accordion.Content>
        </div>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default Offer;
