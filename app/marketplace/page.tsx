"use client";

import React, { useEffect, useState, useCallback } from "react";
import MarketplaceHeroSection from "../../components/marketplace/marketplace-hero/marketplace-hero";
import MarketplaceListingSection from "../../components/marketplace/marketplace-listing-section/marketplace-listing-section";
import marketplaceContractAbi from "./marketplace-contact-abi.json";
import { getContract, Chain } from "thirdweb";
import { client } from "../../data/services/client";
import { fetchTotalListings, fetchListingsForMarketplace } from "./services";
import { marketplaceConfig } from "./marketplace.config";

export default function Marketplace() {
  //TODO : (clean code) define it in the config file
  const chainId = 11155111;
  const [listings, setListings] = useState<{
    listingsForBids: object[];
    listingsForBuyNow: object[];
  }>({
    listingsForBids: [],
    listingsForBuyNow: [],
  });

  const getMarketplaceListings = useCallback(
    async (nftContractAddress) => {
      const contract = getContract({
        client,
        chain: marketplaceConfig[chainId].chain,
        address: nftContractAddress,
        abi: marketplaceContractAbi as any,
      });

      const totalListings = await fetchTotalListings(contract);
      const { listingsForBids, listingsForBuyNow } =
        await fetchListingsForMarketplace(contract, totalListings, chainId);

      setListings({
        listingsForBids,
        listingsForBuyNow,
      });
    },
    [chainId]
  );

  useEffect(() => { 
    getMarketplaceListings(
      marketplaceConfig[chainId]?.dsponsor_marketplace_contract_address
    );
  }, [chainId, getMarketplaceListings]);

  return (
    <section style={{ padding: "8rem 0" }}>
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
