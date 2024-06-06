import React from "react";
import MainAuctions from "../../components/siborgAdsHome/mainAuctions";
import MarketplaceHome from "../../components/siborgAdsHome/marketplaceHome";
import Description from "../../components/siborgAdsHome/description";
import { useState } from "react";

const SiBorgAdsHomeContainer = () => {
  const [chainIdFilter, setChainIdFilter] = useState(1);
  const [filter, setFilter] = useState("All the ad spaces");

  const auctions = [
    {
      name: "Space 1",
      category: "1",
      chain: "Ethereum",
      price: "0.1",
      link: "/",
      live: true,
    },
    {
      name: "Space 2",
      category: "2",
      chain: "Ethereum",
      price: "0.2",
      link: "/",
      live: true,
    },
    {
      name: "Space 3",
      category: "3",
      chain: "Ethereum",
      price: "0.3",
      link: "/",
      live: true,
    },
    {
      name: "Space 4",
      category: "4",
      chain: "Ethereum",
      price: "0.4",
      link: "/",
      live: true,
    },
    {
      name: "Space 5",
      category: "5",
      chain: "Base",
      price: "0.5",
      link: "/",
      live: true,
    },
    {
      name: "Space 6",
      category: "6",
      chain: "Base",
      price: "0.6",
      link: "/",
      live: true,
    },
  ];

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
        />
      </div>
    </>
  );
};

export default SiBorgAdsHomeContainer;
