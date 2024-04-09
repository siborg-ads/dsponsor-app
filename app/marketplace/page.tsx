import React from "react";
import MarketplaceHeroSection from "../../components/marketplace/marketplace-hero/marketplace-hero";
import MarketplaceHotbids from "../../components/marketplace/marketplace-hotbids/marketplace-hotbids";
import MarketplaceTrendingCategories from "../../components/marketplace/marketplace-trending-categories/marketplace-trending-categories";

export default function Marketplace() {
  return (
    <section
      style={{
        padding: "8rem 0",
      }}
    >
      <MarketplaceHeroSection />
      <MarketplaceHotbids />
      <MarketplaceTrendingCategories />
    </section>
  );
}
