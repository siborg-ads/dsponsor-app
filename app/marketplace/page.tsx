"use client";

import React, { useEffect, useState, useCallback } from "react";
import MarketplaceHeroSection from "../../components/marketplace/marketplace-hero/marketplace-hero";
import MarketplaceListingSection from "../../components/marketplace/marketplace-listing-section/marketplace-listing-section";
import marketplaceContractAbi from "./marketplace-contact-abi.json";
import { getContract, Chain } from "thirdweb";
import { client } from "../../data/services/client";
import { fetchTotalListings, fetchListingsForMarketplace } from "./services";
import { marketplaceConfig } from "./marketplace.config";
import { useChainId } from "@thirdweb-dev/react";
import ChainDetector from "../../components/chain-detector/ChainDetector";

export default function Marketplace() {
  const [loading, setLoading] = useState(true);

  const chainId = useChainId();

  const [listings, setListings] = useState<{
    listingsForBids: object[];
    listingsForBuyNow: object[];
  }>({
    listingsForBids: [],
    listingsForBuyNow: [],
  });

  const getMarketplaceListings = useCallback(
    async (nftContractAddress) => {
      if (!chainId) return;

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
      // setLoading(false);
    },
    [chainId]
  );

  useEffect(() => {
    if (chainId) {
      setLoading(true);
      getMarketplaceListings(
        marketplaceConfig[chainId]?.dsponsor_marketplace_contract_address
      );
    }
  }, [chainId, getMarketplaceListings]);

  return (
    <section style={{ padding: "8rem 0" }}>
      <MarketplaceHeroSection />
      <ChainDetector />
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
