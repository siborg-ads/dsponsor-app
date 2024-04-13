"use client";

import React, { useEffect } from "react";
import MarketplaceHeroSection from "../../components/marketplace/marketplace-hero/marketplace-hero";
import MarketplaceListingSection from "../../components/marketplace/marketplace-listing-section/marketplace-listing-section";
import { marketplaceContractAbi } from "./marketplace-contact-abi";
import { getContract, Chain } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { client } from "../../data/services/client";
import { fetchTotalListings, fetchListingsForMarketplace } from "./services";
import { marketplaceConfig } from "./marketplace.config";

export default function Marketplace() {
  const [listings, setListings] = React.useState({
    listingsForBids: [],
    listingsForBuyNow: [],
  });
  useEffect(() => {
    getMarletplaceListings(
      marketplaceConfig.dsponsor_marketplace_contract_address
    );
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

  return (
    <section
      style={{
        padding: "8rem 0",
      }}
    >
      <MarketplaceHeroSection />
      <MarketplaceListingSection
        listings={listings.listingsForBids}
        title={"Hot Bids"}
        type={"bids"}
      />
      <MarketplaceListingSection
        listings={listings.listingsForBuyNow}
        title={"Buy Now"}
        type={"buy-now"}
      />
    </section>
  );
}
