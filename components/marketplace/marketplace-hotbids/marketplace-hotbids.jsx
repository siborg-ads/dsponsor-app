import React from "react";
import MarketplaceItemCard from "../marketplace-item-card/marketplace-item-card";

const MarketplaceHotbids = ({ listings }) => {
  return (
    <div className="container pt-28">
      <h1 className="font-display tracking-wide mb-6	 text-center text-2xl font-medium text-jacarta-700 dark:text-white">
        Hot Bids
      </h1>
      <div className={"grid grid-cols-4 gap-8"}>
        {listings.map((listing, index) => (
          <MarketplaceItemCard
            key={index}
            title={""}
            price={listing.price}
            symbol={listing.symbol}
          />
        ))}
      </div>
    </div>
  );
};

export default MarketplaceHotbids;
