"use client";

import React, { useEffect, useState, useCallback } from "react";
import MarketplaceHeroSection from "../../components/marketplace/marketplace-hero/marketplace-hero";
import MarketplaceListingSection from "../../components/marketplace/marketplace-listing-section/marketplace-listing-section";
import { fetchRandomListingsForMarketplace } from "./services";
import { defaultChainId } from "./marketplace.config";
import { fetchAllMpListings } from "./services/marketplace-item-services";

export default function Marketplace() {
  const chainId = defaultChainId;
  const [listings, setListings] = useState<{
    listingsForBids: any[];
    listingsForBuyNow: any[];
  }>({
    listingsForBids: [],
    listingsForBuyNow: [],
  });


  const getMpListings = async () => {
    try {
      const allMpListings = await fetchAllMpListings();      
      const { listingsForBids, listingsForBuyNow } =
        await fetchRandomListingsForMarketplace(allMpListings, chainId);
      
        setListings({
          listingsForBids,
          listingsForBuyNow,
        });

    } catch (error) {
      console.error("Error fetching marketplace listings", error);  
    }
    }


  useEffect(() => { 
    getMpListings();
  }, []);

  return (
    <section style={{ padding: "8rem 0" }}>
      <MarketplaceHeroSection />
      {listings.listingsForBids.length > 0 && (
        <MarketplaceListingSection
          listings={listings.listingsForBids}
          title={"Hot Bids"}
          type={"bids"}
        />
      )}
      {listings.listingsForBuyNow.length > 0 && (
        <MarketplaceListingSection
          listings={listings.listingsForBuyNow}
          title={"Buy Now"}
          type={"buy-now"}
        />
      )}
    </section>
  );
}
