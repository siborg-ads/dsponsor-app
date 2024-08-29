import React, { useState, useEffect, useRef } from "react";
import "tippy.js/dist/tippy.css";
import Meta from "@/components/Meta";
import MarketplaceComponent from "@/components/features/marketplace/Marketplace";
import { fetchMarketplace } from "@/utils/graphql/fetchMarketplace";
import { Auctions } from "@/types/auctions";
import { useChainContext } from "@/hooks/useChainContext";
import formatAndRound from "@/utils/prices/formatAndRound";
import { formatUnits } from "ethers/lib/utils";
import { BigNumber } from "ethers";

const metadata = {
  title: "Marketplace || SiBorg Ads - The Web3 Monetization Solution",
  keyword:
    "audience engagement, web3, creator economic, NFT, creator monetization, creator economy, creator token, creator coin, creator tokenization, creator economy",

  desc: "Explore the future of media monetization. SiBorg Ads decentralized platform offers tokenized advertising spaces for dynamic and sustainable media funding."
};

const Marketplace = () => {
  const [allTokens, setAllTokens] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [auctions, setAuctions] = useState<Auctions>([]);
  const [auctionsTemp, setAuctionsTemp] = useState<any[]>([]);
  const [auctionsFetched, setAuctionsFetched] = useState<boolean>(false);

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

      setAuctionsTemp(allListedTokenWithoutFilterArray);

      setAuctionsFetched(true);
      setIsLoading(false);
    };

    if (chainId && !auctionsFetched && allTokens) {
      fetchData(chainId, allTokens);
    }
  }, [allTokens, auctionsFetched, chainId]);

  useEffect(() => {
    if (auctionsTemp.length === 0) return;

    const auctions = auctionsTemp?.map((token) => {
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
      const directPrice = token?.marketplaceListings?.sort((a, b) => Number(b.id) - Number(a.id))[0]
        ?.buyPriceStructure?.buyoutPricePerToken;
      const auctionPrice = token?.marketplaceListings?.sort(
        (a, b) => Number(b.id) - Number(a.id)
      )[0]?.bidPriceStructure?.minimalBidPerToken;
      const mintPrice = token?.nftContract?.prices[0]?.amount;
      const startTime = token?.marketplaceListings?.sort((a, b) => Number(b.id) - Number(a.id))[0]
        ?.startTime;
      const endTime = token?.marketplaceListings?.sort((a, b) => Number(b.id) - Number(a.id))[0]
        ?.endTime;
      const status = token?.marketplaceListings?.sort((a, b) => Number(b.id) - Number(a.id))[0]
        ?.status;
      const quantity = token?.marketplaceListings?.sort((a, b) => Number(b.id) - Number(a.id))[0]
        ?.quantity;
      const numberOfBids = token?.marketplaceListings?.sort(
        (a, b) => Number(b.id) - Number(a.id)
      )[0]?.bids.length;
      const sold =
        token?.marketplaceListings?.sort((a, b) => Number(b.id) - Number(a.id))[0]?.status ===
          "COMPLETED" ||
        (token?.marketplaceListings?.sort((a, b) => Number(b.id) - Number(a.id))[0]?.listingType !==
          "Auction" &&
          token?.marketplaceListings?.sort((a, b) => Number(b.id) - Number(a.id))[0]
            ?.listingType !== "Direct" &&
          token?.mint !== null);
      const currency =
        token?.marketplaceListings?.sort((a, b) => Number(b.id) - Number(a.id))[0]?.currency ??
        token?.nftContract?.prices[0]?.currency;

      const directPriceUsdcBN = BigNumber.from(
        token?.marketplaceListings?.sort((a, b) => Number(b.id) - Number(a.id))?.[0]
          ?.buyPriceStructureUsdc?.buyoutPricePerToken ?? 0
      );
      const auctionPriceUsdcBN = BigNumber.from(
        token?.marketplaceListings?.sort((a, b) => Number(b.id) - Number(a.id))?.[0]
          ?.bidPriceStructureUsdc?.minimalBidPerToken ?? 0
      );
      const mintPrinceUsdcBN = BigNumber.from(
        token?.nftContract?.prices?.[0]?.mintPriceStructureUsdc?.totalAmount ?? 0
      );
      const usdcPriceBN = {
        USDCPrice:
          listingType === "AUCTION"
            ? auctionPriceUsdcBN
            : listingType === "DIRECT"
              ? directPriceUsdcBN
              : mintPrinceUsdcBN,
        decimals: currencyDecimals
      };

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
        usdcPriceBNString: usdcPriceBN?.USDCPrice?.toString(),
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
          startTime: startTime,
          endTime: endTime,
          currencyDecimals: currencyDecimals
        }
      };

      return object;
    });

    setAuctions(auctions);
  }, [auctionsTemp]);

  return (
    <>
      <Meta {...metadata} />

      <div
        className="mt-48 px-4 max-w-6xl mx-auto flex flex-col gap-12"
        style={{
          marginTop: "8rem"
        }}
      >
        <MarketplaceComponent
          auctions={auctions}
          isAuctionsLoading={isLoading}
          allTokens={allTokens}
          setAllTokens={setAllTokens}
        />
      </div>
    </>
  );
};
export default Marketplace;
