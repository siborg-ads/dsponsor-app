"use client";

import React, { useEffect, useState, useRef } from "react";
import AdSpaces from "@/components/features/home/AdSpaces";
import { fetchMarketplace } from "@/utils/graphql/fetchMarketplace";
import { formatUnits } from "ethers/lib/utils";
import formatAndRound from "@/utils/prices/formatAndRound";
import Meta from "@/components/Meta";
import { useChainContext } from "@/hooks/useChainContext";
import { Auctions } from "@/types/auctions";
import Carousel from "@/components/features/home/Carousel";
import Steps from "@/components/features/home/AdsSteps";
import ClientsRedirection from "@/components/features/home/ClientsRedirection";
import { curationData } from "@/data/curation";

export type Filter = "all" | "medias" | "dapps" | "websites" | "newsletters";

const allTokens: boolean = true;

const Home = () => {
  const [tempAdSpaces, setTempAdSpaces] = useState<any[]>([]);
  const [adSpaces, setAdSpaces] = useState<Auctions>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [auctionsFetched, setAuctionsFetched] = useState<boolean>(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [offers, setOffers] = useState<any[]>([]);
  const [curratedOfferIds, setCurratedOfferIds] = useState<number[]>([]);
  const [curratedOfferIdsByType, setCurratedOfferIdsByType] = useState<
    {
      offerId: number;
      type: Filter[];
    }[]
  >([]);

  const { currentChainObject } = useChainContext();
  const chainId = currentChainObject?.chainId;

  const dataFetchedRef = useRef(false);

  useEffect(() => {
    const fetchData = async (chainId: number, allTokens: any) => {
      if (dataFetchedRef.current) return;

      setIsLoading(true);

      let allListedTokenWithoutFilterArray: any[] = [];
      const data = await fetchMarketplace(chainId, allTokens);
      allListedTokenWithoutFilterArray.push(...data);

      setOffers(data);

      setTempAdSpaces(allListedTokenWithoutFilterArray);

      setAuctionsFetched(true);
      setIsLoading(false);
    };

    if (chainId && !auctionsFetched && allTokens) {
      fetchData(chainId, allTokens);
    }
  }, [auctionsFetched, chainId]);

  useEffect(() => {
    if (!chainId) return;

    const baseURL = window.location.origin;

    const currationArray = Object.entries(curationData(baseURL));

    const chainIdCurrationArray = currationArray?.find(([key]) => Number(key) === chainId)?.[1];

    if (!chainIdCurrationArray) return;

    const curratedOfferIds = Object.values(chainIdCurrationArray)?.map((element) => {
      return element?.offerId as number;
    });

    const curratedOfferIdsByType = Object.values(chainIdCurrationArray)?.map((element) => {
      return {
        offerId: element?.offerId as number,
        type: element?.type
      };
    });

    setCurratedOfferIds(curratedOfferIds);
    setCurratedOfferIdsByType(curratedOfferIdsByType);
  }, [chainId]);

  useEffect(() => {
    if (tempAdSpaces?.length === 0) return;

    let filteredAdSpaces = [...tempAdSpaces]?.filter((token) => {
      if (filter !== "all") {
        return curratedOfferIdsByType?.some((element) => {
          return element.offerId === Number(token?.offerId) && element.type.includes(filter);
        });
      } else {
        return curratedOfferIds?.includes(Number(token?.offerId));
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
      const currencySymbol = token?.marketplaceListings.sort(
        (a, b) => Number(b.id) - Number(a.id)
      )[0]?.currencySymbol;
      const latestBid = currencyDecimals
        ? Number(
            formatUnits(
              token?.marketplaceListings?.sort((a, b) => Number(b.id) - Number(a.id))[0]
                ?.bidPriceStructure?.previousBidAmount ?? 0,
              currencyDecimals
            )
          )
        : 0;
      const priceUSD = Number(
        formatAndRound(
          Number(
            formatUnits(
              token.marketplaceListings.sort((a, b) => Number(b.id) - Number(a.id))[0]
                ?.currencyPriceUSDC ?? 0,
              6
            )
          )
        ) ?? 0
      );
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

      const object = {
        name: name,
        category: category,
        disable: token?.disable,
        chain: chain,
        chainId: chainId,
        price: price,
        currencySymbol: currencySymbol,
        link: `/${chainId}/offer/${offerId}/${tokenId}?tokenData=${tokenData}`,
        live: live,
        image: image ?? "",
        latestBid: latestBid,
        currencyDecimals: currencyDecimals,
        startTime: startTime,
        endTime: endTime,
        nowTime: Date.now(),
        offerId: offerId,
        tokenId: tokenId,
        tokenData: tokenData,
        priceUSD: priceUSD,
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
          metadata: token.metadata,
          mint: token.mint,
          nftContract: token.nftContract,
          marketplaceListings: token.marketplaceListings,
          chainConfig: token.chainConfig,
          offerId: offerId,
          tokenId: tokenId,
          tokenData: tokenData,
          startTime: startTime,
          endTime: endTime,
          currencyDecimals: currencyDecimals
        }
      };

      return object;
    });

    setAdSpaces(adSpaces);
  }, [tempAdSpaces, filter, curratedOfferIds, curratedOfferIdsByType]);

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
        <Carousel filter={filter} setFilter={setFilter} />

        <AdSpaces
          isLoading={isLoading}
          text="Trending Ad Spaces"
          offers={offers}
          adSpaces={adSpaces}
          filter={filter}
          curratedOfferIdsByType={curratedOfferIdsByType}
        />

        <Steps />

        <ClientsRedirection />
      </div>
    </React.Fragment>
  );
};

export default Home;
