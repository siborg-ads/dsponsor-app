"use client";

import React, { useEffect } from "react";
import MarketplaceHeroSection from "../../components/marketplace/marketplace-hero/marketplace-hero";
import MarketplaceListingSection from "../../components/marketplace/marketplace-listing-section/marketplace-listing-section";
import { marketplaceContractAbi } from "./marketplace-contact-abi";
import { getContract, Chain } from "thirdweb";
import { client } from "../../data/services/client";
import {
  fetchTotalListings,
  fetchListingsForMarketplace,
  getChainConfigFromId,
} from "./services";
import { marketplaceConfig } from "./marketplace.config";
import { useChainId } from "@thirdweb-dev/react";

export default function Marketplace() {
  const chainId = useChainId();
  const chain = getChainConfigFromId(chainId);

  const [listings, setListings] = React.useState({
    listingsForBids: [],
    listingsForBuyNow: [],
  });

  const getMarletplaceListings = React.useCallback(
    async (nftContractAddress: string) => {
      if (!chain) return;
      // Use the existing client to get the contract
      const contract = getContract({
        client,
        chain: chain as Chain,
        address: nftContractAddress,
        abi: marketplaceContractAbi as any,
      });

      const totalListings = await fetchTotalListings(contract);
      const { listingsForBids, listingsForBuyNow } =
        await fetchListingsForMarketplace(contract, totalListings, chainId);

      setListings({
        listingsForBids,
        listingsForBuyNow,
      } as any);
    },
    [chain, chainId]
  );

  useEffect(() => {
    if (chainId)
      getMarletplaceListings(
        marketplaceConfig.dsponsor_marketplace_contract_address
      );
  }, [getMarletplaceListings, chainId]);

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
