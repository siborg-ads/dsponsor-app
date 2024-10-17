"use client";
import { BigNumber } from "ethers";
import React, { useEffect, useState, useRef } from "react";
import AdSpaces from "@/components/features/home/AdSpaces";
import { fetchMarketplace } from "@/utils/graphql/fetchMarketplace";
import { formatUnits } from "ethers/lib/utils";
import Meta from "@/components/Meta";
import { Auctions } from "@/types/auctions";
import Carousel from "@/components/features/home/Carousel";
import Steps from "@/components/features/home/AdsSteps";
import ClientsRedirection from "@/components/features/home/ClientsRedirection";
import EarlyTraction from "@/components/features/home/EarlyTraction";
import { curationData } from "@/data/curation";
import type { Filter, CurationDataItem } from "@/data/curation";
import config from "@/config/config";

const allTokens: boolean = true;

const Home = () => {
  const [tempAdSpaces, setTempAdSpaces] = useState<any[]>([]);
  const [adSpaces, setAdSpaces] = useState<Auctions>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [offers, setOffers] = useState<any[]>([]);
  const [chainIdCurrationArray, setChainIdCurrationArray] = useState<CurationDataItem[]>([]);

  const [curratedOfferIds, setCurratedOfferIds] = useState<
    {
      chainId: number;
      offerId: number;
      type: Filter[];
    }[]
  >([]);

  const dataFetchedRef = useRef(false);

  useEffect(() => {
    const fetchData = async (allTokens: any) => {
      if (dataFetchedRef.current) return;

      if (!curratedOfferIds.length) return;

      setIsLoading(true);

      const allData = await Promise.all(
        Object.keys(config).map(async (chainId) => {
          return fetchMarketplace(
            Number(chainId),
            allTokens,
            curratedOfferIds
              .filter((e) => Number(e.chainId) === Number(chainId))
              .map((e) => e.offerId)
          );
        })
      );
      const flatAllData = allData.flatMap((data) => data).filter((data) => !!data);

      setOffers(flatAllData);
      setTempAdSpaces(flatAllData);

      setIsLoading(false);
    };

    if (allTokens) {
      fetchData(allTokens);
    }
  }, [curratedOfferIds]);

  useEffect(() => {
    const baseURL = window.location.origin;

    const currationArray = curationData(baseURL);

    let chainIdCurrationArray: CurationDataItem[] = [];

    for (const chainId of Object.keys(config)) {
      const c = currationArray[Number(chainId)].map((e) => ({ ...e, chainId: Number(chainId) }));
      chainIdCurrationArray = [...chainIdCurrationArray, ...c];
    }
    if (!chainIdCurrationArray) return;

    setChainIdCurrationArray(chainIdCurrationArray);

    const curratedOfferIds: any[] = [];

    Object.values(chainIdCurrationArray)?.forEach((element) => {
      if (element.inTrending) {
        curratedOfferIds.push({
          chainId: element?.chainId as number,
          offerId: element?.offerId as number,
          type: element?.type
        });
      }
    });

    setCurratedOfferIds(curratedOfferIds);
  }, []);

  useEffect(() => {
    if (tempAdSpaces?.length === 0) return;

    let filteredAdSpaces = [...tempAdSpaces]?.filter((token) => {
      if (filter !== "all") {
        return curratedOfferIds?.some((element) => {
          return (
            Number(element.chainId) == Number(token.chainConfig.chainId) &&
            Number(element.offerId) === Number(token?.offerId) &&
            element.type.includes(filter)
          );
        });
      } else {
        return curratedOfferIds?.some((element) => {
          return (
            Number(element.chainId) == Number(token.chainConfig.chainId) &&
            Number(element.offerId) === Number(token?.offerId)
          );
        });
      }
    });

    const adSpaces = filteredAdSpaces?.map((token) => {
      const name = token.metadata.name;
      const category = token.metadata.categories ? token.metadata.categories[0] : "";
      const chain = token.chainConfig.network;
      const price = token.marketplaceListings.sort((a, b) => Number(b.id) - Number(a.id))[0]
        ?.buyPriceStructure?.buyoutPricePerToken;
      const chainId = token.chainConfig.chainId;
      const offerId = token.offerId;
      const tokenId = token.tokenId;
      const tokenData = token.tokenData;
      const live =
        token.marketplaceListings?.sort((a, b) => Number(b.id) - Number(a.id))[0]?.status ===
          "CREATED" &&
        token.marketplaceListings?.sort((a, b) => Number(b.id) - Number(a.id))[0].quantity > 0;
      const image = token.metadata.image;
      const listingType = token.marketplaceListings.sort((a, b) => Number(b.id) - Number(a.id))[0]
        ?.listingType;

      const currencyDecimals =
        listingType === "Auction" || listingType === "Direct"
          ? Number(
              token?.marketplaceListings?.sort((a, b) => Number(b.id) - Number(a.id))[0]
                ?.currencyDecimals
            )
          : Number(token?.nftContract?.prices[0]?.currencyDecimals);
      const currencySymbol =
        listingType === "Auction" || listingType === "Direct"
          ? token?.marketplaceListings.sort((a, b) => Number(b.id) - Number(a.id))[0]
              ?.currencySymbol
          : token?.nftContract?.prices[0]?.currencySymbol;

      const latestBid = currencyDecimals
        ? Number(
            formatUnits(
              token?.marketplaceListings?.sort((a, b) => Number(b.id) - Number(a.id))[0]
                ?.bidPriceStructure?.previousBidAmount ?? 0,
              currencyDecimals
            )
          )
        : 0;
      const directPrice = token.marketplaceListings.sort((a, b) => Number(b.id) - Number(a.id))[0]
        ?.buyPriceStructure?.buyoutPricePerToken;
      const auctionPrice = token.marketplaceListings.sort((a, b) => Number(b.id) - Number(a.id))[0]
        ?.bidPriceStructure?.minimalBidPerToken;
      const mintPrice = token?.nftContract?.prices[0]?.amount;
      const startTime = token?.marketplaceListings.sort((a, b) => Number(b.id) - Number(a.id))[0]
        ?.startTime;
      const endTime = token?.marketplaceListings.sort((a, b) => Number(b.id) - Number(a.id))[0]
        ?.endTime;
      const status = token?.marketplaceListings.sort((a, b) => Number(b.id) - Number(a.id))[0]
        ?.status;
      const quantity = token.marketplaceListings.sort((a, b) => Number(b.id) - Number(a.id))[0]
        ?.quantity;
      const numberOfBids = token.marketplaceListings.sort((a, b) => Number(b.id) - Number(a.id))[0]
        ?.bids.length;
      const sold =
        token?.marketplaceListings.sort((a, b) => Number(b.id) - Number(a.id))[0]?.status ===
          "COMPLETED" ||
        (token?.marketplaceListings.sort((a, b) => Number(b.id) - Number(a.id))[0]?.listingType !==
          "Auction" &&
          token?.marketplaceListings.sort((a, b) => Number(b.id) - Number(a.id))[0]?.listingType !==
            "Direct" &&
          token?.mint !== null);

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

      const object = {
        name: name,
        category: category,
        disable: token?.disable,
        chain: chain,
        chainId: chainId,
        price: price,
        usdcPriceBN: usdcPriceBN,
        currency: currency,
        currencySymbol: currencySymbol,
        link: `/${chainId}/offer/${offerId}/${tokenId}?tokenData=${tokenData}`,
        live: live,
        image: image ?? "",
        latestBid: latestBid,
        usdcPriceFormatted,
        currencyDecimals: currencyDecimals,
        startTime: startTime,
        endTime: endTime,
        nowTime: Date.now(),
        offerId: offerId,
        tokenId: tokenId,
        tokenData: tokenData,
        directPrice: directPrice,
        auctionPrice: auctionPrice,
        mintPrice: mintPrice,
        listingType: listingType,
        status: status,
        quantity: quantity,
        sold: sold,
        numberOfBids: numberOfBids,
        item: {
          disable: token?.disable,
          usdcPriceBN: usdcPriceBN,
          metadata: token.metadata,
          currency: currency,
          mint: token.mint,
          nftContract: token.nftContract,
          marketplaceListings: token.marketplaceListings,
          chainConfig: token.chainConfig,
          offerId: offerId,
          tokenId: tokenId,
          tokenData: tokenData,
          usdcPriceFormatted,
          startTime: startTime,
          endTime: endTime,
          currencyDecimals: currencyDecimals
        }
      };

      return object;
    });

    setAdSpaces(adSpaces);
  }, [tempAdSpaces, filter, curratedOfferIds]);

  const metadata = {
    title: `SiBorg Ads - The Web3 Monetization Solution`,
    keyword:
      "audience engagement, web3, creator economic, NFT, creator monetization, creator economy, creator token, creator coin, creator tokenization, creator economy",
    desc: "Explore the future of media monetization. SiBorg Ads decentralized platform offers tokenized advertising spaces for dynamic and sustainable media funding."
  };

  return (
    <React.Fragment>
      <Meta {...metadata} />
      <div
        className="mt-32 px-4 max-w-5xl mx-auto flex flex-col gap-12 w-full"
        style={{
          marginTop: "8rem"
        }}
      >
        <Carousel data={chainIdCurrationArray} filter={filter} setFilter={setFilter} />

        <AdSpaces
          isLoading={isLoading}
          text="Trending Ad Spaces"
          offers={offers}
          adSpaces={adSpaces}
          filter={filter}
          curratedOfferIds={curratedOfferIds}
        />

        <Steps />

        <EarlyTraction />

        <ClientsRedirection />
      </div>
    </React.Fragment>
  );
};

export default Home;
