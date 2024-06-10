"use client";

import React, { useEffect, useState } from "react";
import MainAuctions from "../../components/siborgHome/mainAuctions";
import MarketplaceHome from "../../components/siborgHome/marketplaceHome";
import Description from "../../components/siborgHome/description";
import { fetchAllListedToken } from "../../providers/methods/fetchAllListedTokenWithoutFilter";
import { useChainContext } from "../../contexts/hooks/useChainContext";
import { formatUnits } from "ethers/lib/utils";
import formatAndRound from "../../utils/formatAndRound";

const HomeContainer = () => {
  const [chainIdFilter, setChainIdFilter] = useState(null);
  const [auctionsTemp, setAuctionsTemp] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [allTokens, setAllTokens] = useState(true);

  const { currentChainObject } = useChainContext();
  const chainId = currentChainObject?.chainId;

  useEffect(() => {
    const fetchData = async () => {
      if (chainId !== null && chainId !== undefined) {
        const data = await fetchAllListedToken(chainId, allTokens);
        setAuctionsTemp(data);
      } else {
        setAuctionsTemp([]);
      }
    };

    fetchData();
  }, [chainId, allTokens]);

  useEffect(() => {
    console.log("auctionsTemp", auctionsTemp);

    if (auctionsTemp.length === 0) return;

    const auctions = auctionsTemp.map((token) => {
      const name = token.metadata.name;
      const category = token.metadata.categories[0];
      const chain = token.chainConfig.chainName;
      const price = token.marketplaceListings[0]?.buyPriceStructureFormatted.buyoutPricePerToken;
      const chainId = token.chainConfig.chainId;
      const offerId = token.offerId;
      const tokenId = token.tokenId;
      const tokenData = token.tokenData;
      const live =
        token.marketplaceListings[0]?.status === "CREATED" &&
        token.marketplaceListings[0].quantity > 0;
      const image = token.metadata.image;
      const currencyDecimals = Number(token.marketplaceListings[0]?.currencyDecimals ?? 0);
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

      const object = {
        name: name,
        category: category,
        chain: chain,
        chainId: chainId,
        price: price,
        currencySymbol: token?.marketplaceListings[0]?.currencySymbol,
        link: `/${chainId}/offer/${offerId}/${tokenId}?tokenData=${tokenData}`,
        live: live,
        image: image,
        latestBid: latestBid,
        currencyDecimals: currencyDecimals,
        startTime: token?.marketplaceListings[0]?.startTime,
        endTime: token?.marketplaceListings[0]?.endTime,
        offerId: offerId,
        tokenId: tokenId,
        tokenData: tokenData,
        priceUSD: priceUSD
      };

      console.log("object", object);

      return object;
    });

    console.log("auctions", auctions);

    setAuctions(auctions);
  }, [auctionsTemp]);

  return (
    <>
      <div
        className="mt-48 px-4 max-w-5xl mx-auto flex flex-col gap-12"
        style={{
          marginTop: "12rem"
        }}
      >
        <Description description={true} />
        <MainAuctions auctions={auctions} />
        <MarketplaceHome
          auctions={auctions}
          chainIdFilter={chainIdFilter}
          setChainIdFilter={setChainIdFilter}
          setAllTokens={setAllTokens}
        />
      </div>
    </>
  );
};

export default HomeContainer;
