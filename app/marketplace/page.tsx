"use client";

import React, { useEffect } from "react";
import MarketplaceHeroSection from "../../components/marketplace/marketplace-hero/marketplace-hero";
import MarketplaceHotbids from "../../components/marketplace/marketplace-hotbids/marketplace-hotbids";
import { marketplaceContractAbi } from "./marketplace-contact-abi";
import { getContract, Chain } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { client } from "../../data/services/client";
import { fetchTotalListings, fetchListingsForMarketplace } from "./services";

export default function Marketplace() {
  const [listings, setListings] = React.useState({
    listingsForBids: [],
    listingsForBuyNow: [],
  });
  useEffect(() => {
    getMarletplaceListings("0x86aDf604B5B72d270654F3A0798cabeBC677C7fc");
  }, []);

  const getMarletplaceListings = async (nftContractAddress: string) => {
    // Use the existing client to get the contract
    const contract = getContract({
      client,
      chain: sepolia,
      address: nftContractAddress,
      abi: marketplaceContractAbi as any,
    });

    const totalListings = await fetchTotalListings(contract);
    const { listingsForBids, listingsForBuyNow } =
      await fetchListingsForMarketplace(contract, totalListings);

    setListings({
      listingsForBids,
      listingsForBuyNow,
    } as any);
  };

  console.log(listings, "All Fetched Listings");
  return (
    <section
      style={{
        padding: "8rem 0",
      }}
    >
      <MarketplaceHeroSection />
      <MarketplaceHotbids />
    </section>
  );
}
