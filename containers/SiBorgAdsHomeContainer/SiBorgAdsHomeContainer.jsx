import React, { useEffect, useState } from "react";
import MainAuctions from "../../components/siborgAdsHome/mainAuctions";
import MarketplaceHome from "../../components/siborgAdsHome/marketplaceHome";
import Description from "../../components/siborgAdsHome/description";
import { fetchAllListedToken } from "../../providers/methods/fetchAllListedToken";
import { useChainContext } from "../../contexts/hooks/useChainContext";
import { formatUnits, parseUnits } from "ethers/lib/utils";

const SiBorgAdsHomeContainer = () => {
  const [chainIdFilter, setChainIdFilter] = useState(null);
  const [filter, setFilter] = useState("All the ad spaces");
  const [auctionsTemp, setAuctionsTemp] = useState([]);
  const [auctions, setAuctions] = useState([]);

  const { currentChainObject } = useChainContext();
  const chainId = currentChainObject?.chainId;

  useEffect(() => {
    const fetchData = async () => {
      if (chainId !== null && chainId !== undefined) {
        const data = await fetchAllListedToken(chainId);
        setAuctionsTemp(data);
      } else {
        setAuctionsTemp([]);
      }
    };

    fetchData();
  }, [chainId]);

  useEffect(() => {
    console.log("auctionsTemp", auctionsTemp);

    if (auctionsTemp.length === 0) return;

    const auctions = auctionsTemp.map((token) => {
      const name = token.metadata.name;
      const category = token.metadata.categories[0];
      const chain = token.chainConfig.chainName;
      const price =
        token.marketplaceListings[0].buyPriceStructureFormatted
          .buyoutPricePerToken;
      const chainId = token.chainConfig.chainId;
      const offerId = Number(token.nftContract.offerId);
      const tokenId = Number(token.nftContract.tokenId);
      const tokenData = token.nftContract.tokenData;
      const live =
        token.marketplaceListings[0].status === "CREATED" &&
        token.marketplaceListings[0].quantity > 0;
      const image = token.metadata.image;
      const currencyDecimals = Number(
        token.marketplaceListings[0].currencyDecimals
      );
      const latestBid =
        Number(
          formatUnits(
            token.marketplaceListings[0].bidPriceStructure.previousBidAmount,
            currencyDecimals
          )
        ) ?? 0;

      return {
        name: name,
        category: category,
        chain: chain,
        chainId: chainId,
        price: price,
        currencySymbol: token.marketplaceListings[0].currencySymbol,
        link: `/${chainId}/offer/${offerId}/${tokenId}?tokenData=${tokenData}`,
        live: live,
        image: image,
        latestBid: latestBid,
        currencyDecimals: currencyDecimals,
      };
    });

    console.log("auctions", auctions);

    setAuctions(auctions);
  }, [auctionsTemp]);

  return (
    <>
      <div
        className="mt-48 px-4 max-w-5xl mx-auto flex flex-col gap-12"
        style={{
          marginTop: "12rem",
        }}
      >
        <Description description={true} />
        <MainAuctions auctions={auctions} />
        <MarketplaceHome
          auctions={auctions}
          filter={filter}
          chainIdFilter={chainIdFilter}
          setFilter={setFilter}
          setChainIdFilter={setChainIdFilter}
        />
      </div>
    </>
  );
};

export default SiBorgAdsHomeContainer;
