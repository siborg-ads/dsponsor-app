"use client";

import React, { useEffect, useState, useCallback } from "react";
import MarketplaceHeroSection from "../../components/marketplace/marketplace-hero/marketplace-hero";
import MarketplaceListingSection from "../../components/marketplace/marketplace-listing-section/marketplace-listing-section";
import { fetchRandomListingsForMarketplace, fetchAllMpListings} from "./services";
import { defaultChainId } from "./marketplace.config";
import Meta from "../../components/Meta";
import {Hero } from "../../components/component";
import HowItWorks from "../../components/explication/howItWorks";

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
    <section >
      <main>
        <Meta title="Home 1" />
        <Hero />
        <HowItWorks />
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
      </main>
    </section>
  );
}
