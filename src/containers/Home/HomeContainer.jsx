"use client";

import React, { useEffect, useState, useRef } from "react";
import MainAuctions from "../../components/siborgHome/mainAuctions";
import MarketplaceHome from "../../components/siborgHome/marketplaceHome";
import Description from "../../components/siborgHome/description";
import { fetchAllListedTokenWithoutFilter } from "../../providers/methods/fetchAllListedTokenWithoutFilter";
import { formatUnits } from "ethers/lib/utils";
import formatAndRound from "../../utils/formatAndRound";
import Meta from "../../components/Meta";
import { useChainContext } from "../../contexts/hooks/useChainContext";

const HomeContainer = () => {
  const [chainIdFilter, setChainIdFilter] = useState(null);
  const [auctionsTemp, setAuctionsTemp] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [allTokens, setAllTokens] = useState(true);
  const [isAuctionsLoading, setIsAuctionsLoading] = useState(true);
  const [auctionsFetched, setAuctionsFetched] = useState(false);

  const { currentChainObject } = useChainContext();
  const chainId = currentChainObject?.chainId;

  const dataFetchedRef = useRef(false);

  useEffect(() => {
    const fetchData = async (chainId, allTokens) => {
      if (dataFetchedRef.current) return;

      setIsAuctionsLoading(true);

      let allListedTokenWithoutFilterArray = [];
      const data = await fetchAllListedTokenWithoutFilter(chainId, allTokens);
      allListedTokenWithoutFilterArray.push(...data);

      setAuctionsTemp(allListedTokenWithoutFilterArray);

      setAuctionsFetched(true);
      setIsAuctionsLoading(false);
    };

    if (chainId && !auctionsFetched && allTokens) {
      fetchData(chainId, allTokens);
    }
  }, [allTokens, auctionsFetched, chainId]);

  useEffect(() => {
    if (auctionsTemp.length === 0) return;

    const auctions = auctionsTemp.map((token) => {
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

    setAuctions(auctions);
  }, [auctionsTemp]);

  const metadata = {
    title: `SiBorg Ads - The Web3 Monetization Solution`,
    keyword:
      "audience engagement, web3, creator economic, NFT, creator monetization, creator economy, creator token, creator coin, creator tokenization, creator economy",
    desc: "Explore the future of media monetization. SiBorg Ads decentralized platform offers tokenized advertising spaces for dynamic and sustainable media funding."
  };
  return (
    <>
      <Meta {...metadata} />
      <div
        className="mt-32 px-4 max-w-5xl mx-auto flex flex-col gap-12"
        style={{
          marginTop: "8rem"
        }}
      >
        <Description description={true} />
        <MainAuctions auctions={auctions} isAuctionsLoading={isAuctionsLoading} />
        <MarketplaceHome
          auctions={auctions}
          chainIdFilter={chainIdFilter}
          setChainIdFilter={setChainIdFilter}
          setAllTokens={setAllTokens}
          isAuctionsLoading={isAuctionsLoading}
          allTokens={allTokens}
        />
      </div>
    </>
  );
};

export default HomeContainer;
