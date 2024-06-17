"use client";

import React, { useEffect, useState } from "react";
import MainAuctions from "../../components/siborgHome/mainAuctions";
import MarketplaceHome from "../../components/siborgHome/marketplaceHome";
import Description from "../../components/siborgHome/description";
import { fetchAllListedTokenWithoutFilter } from "../../providers/methods/fetchAllListedTokenWithoutFilter";
import { formatUnits } from "ethers/lib/utils";
import formatAndRound from "../../utils/formatAndRound";
import config from "../../config/config";
import Meta from "../../components/Meta";

const HomeContainer = () => {
  const [chainIdFilter, setChainIdFilter] = useState(null);
  const [auctionsTemp, setAuctionsTemp] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [allTokens, setAllTokens] = useState(true);
  const [isAuctionsLoading, setIsAuctionsLoading] = useState(true);
  const [auctionsFetched, setAuctionsFetched] = useState(false);

  useEffect(() => {
    if (auctionsFetched) return;

    const fetchData = async () => {
      setIsAuctionsLoading(true);
      const allListedTokenWithoutFilterArray = [];
      if (config !== null && config !== undefined) {
        for (const [chainId] of Object.entries(config)) {
          const data = await fetchAllListedTokenWithoutFilter(chainId, allTokens);
          allListedTokenWithoutFilterArray.push(...data);
        }
        setAuctionsTemp(allListedTokenWithoutFilterArray);
      } else {
        setAuctionsTemp([]);
      }

      setAuctionsFetched(true);
      setIsAuctionsLoading(false);
    };

    fetchData();
  }, [allTokens, auctionsFetched]);

  useEffect(() => {
    if (auctionsTemp.length === 0) return;

    const auctions = auctionsTemp.map((token) => {
      const name = token.metadata.name;
      const category = token.metadata.categories[0];
      const chain = token.chainConfig.network;
      const price = token.marketplaceListings[0]?.buyPriceStructure.buyoutPricePerToken;
      const chainId = token.chainConfig.chainId;
      const offerId = token.offerId;
      const tokenId = token.tokenId;
      const tokenData = token.tokenData;
      const live =
        token.marketplaceListings[0]?.status === "CREATED" &&
        token.marketplaceListings[0].quantity > 0;
      const image = token.metadata.image;
      const currencyDecimals = Number(token.marketplaceListings[0]?.currencyDecimals ?? 0);
      const currencySymbol = token?.marketplaceListings[0]?.currencySymbol;
      const latestBid = Number(
        formatUnits(
          token?.marketplaceListings[0]?.bidPriceStructure.previousBidAmount ?? 0,
          currencyDecimals
        )
      );
      const priceUSD = Number(
        formatAndRound(
          Number(formatUnits(token.marketplaceListings[0]?.currencyPriceUSDC ?? 0, 6))
        ) ?? 0
      );
      const directPrice = token.marketplaceListings[0]?.buyPriceStructure.buyoutPricePerToken;
      const auctionPrice = token.marketplaceListings[0]?.bidPriceStructure.minimalBidPerToken;
      const listingType = token.marketplaceListings[0]?.listingType;
      const startTime = token?.marketplaceListings[0]?.startTime;
      const endTime = token?.marketplaceListings[0]?.endTime;
      const status = token?.marketplaceListings[0]?.status;
      const quantity = token.marketplaceListings[0]?.quantity;
      const numberOfBids = token.marketplaceListings[0]?.bids.length;

      const object = {
        name: name,
        category: category,
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
        offerId: offerId,
        tokenId: tokenId,
        tokenData: tokenData,
        priceUSD: priceUSD,
        directPrice: directPrice,
        auctionPrice: auctionPrice,
        listingType: listingType,
        status: status,
        quantity: quantity,
        numberOfBids: numberOfBids,
        item: {
          metadata: token.metadata,
          mint: token.mint,
          nftContract: token.nftContract,
          marketplaceListings: token.marketplaceListings,
          chainConfig: token.chainConfig,
          offerId: offerId,
          tokenId: tokenId,
          tokenData: tokenData,
          startTime: startTime,
          endTime: endTime
        }
      };

      return object;
    });

    setAuctions(auctions);
  }, [auctionsTemp]);

 const metadata = {
   title: `Home || SiBorg Ads - The Web3 Monetization Solution`,
   keyword:
     "audience engagement, web3, creator economic, NFT, creator monetization, creator economy, creator token, creator coin, creator tokenization, creator economy",
   desc: "Explore the future of media monetization. SiBorg Ads decentralized platform offers tokenized advertising spaces for dynamic and sustainable media funding."
 };
  return (
    <>
      <Meta {...metadata} />
      <div
        className="mt-48 px-4 max-w-5xl mx-auto flex flex-col gap-12"
        style={{
          marginTop: "12rem"
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
        />
      </div>
    </>
  );
};

export default HomeContainer;
