import React from "react";
import MarketplaceItemCard from "../marketplace-item-card/marketplace-item-card";

const MarketplaceHotbids = () => {
  return (
    <div className="container pt-28">
      <h1 className="font-display tracking-wide mb-6	 text-center text-2xl font-medium text-jacarta-700 dark:text-white">
        Hot Bids
      </h1>
      <div className={"grid grid-cols-4 gap-8"}>
        <MarketplaceItemCard />
        <MarketplaceItemCard />
        <MarketplaceItemCard />
        <MarketplaceItemCard />
      </div>
    </div>
  );
};

export default MarketplaceHotbids;
