"use client";

import React, { useEffect } from "react";
import MarketplaceHeroSection from "../../components/marketplace/marketplace-hero/marketplace-hero";
import MarketplaceListingSection from "../../components/marketplace/marketplace-listing-section/marketplace-listing-section";
import { marketplaceContractAbi } from "./marketplace-contact-abi";
import { getContract, Chain } from "thirdweb";
import { client } from "../../data/services/client";
import { fetchTotalListings, fetchListingsForMarketplace } from "./services";
import { marketplaceConfig } from "./marketplace.config";
import { useChainId } from "@thirdweb-dev/react";
import { sepolia } from "thirdweb/chains";

export default function Marketplace() {
  const chainId = useChainId();

  const [listings, setListings] = React.useState({
    listingsForBids: [],
    listingsForBuyNow: [],
  });

  const getMarletplaceListings = React.useCallback(
    async (nftContractAddress: string) => {
      // check if the chain is sapolia testnet
      const isSepoliaNetwork = chainId === marketplaceConfig.sepolia_chain_id;

      const contract = getContract({
        client,
        chain: isSepoliaNetwork ? sepolia : (undefined as any),
        address: nftContractAddress,
        abi: marketplaceContractAbi as any,
      });

      const totalListings = await fetchTotalListings(contract);
      const { listingsForBids, listingsForBuyNow } =
        await fetchListingsForMarketplace(
          contract,
          totalListings,
          isSepoliaNetwork
        );

      setListings({
        listingsForBids,
        listingsForBuyNow,
      } as any);
    },
    [chainId]
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
