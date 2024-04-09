"use client";

import React from "react";
import MarketplaceItemCard from "../marketplace-item-card/marketplace-item-card";

const MarketplaceTrendingCategories = () => {
  const categories = [
    { name: "All" },
    { name: "DeFi" },
    { name: "GameFi" },
    { name: "SocialFi" },
    { name: "DePin" },
    { name: "AI" },
  ];

  const [selectedCategory, setSelectedCategory] = React.useState(categories[0]);

  return (
    <div className="container pt-28">
      <h1 className="font-display tracking-wide mb-6	 text-center text-2xl font-medium text-jacarta-700 dark:text-white">
        Trending Categories
      </h1>
      <div>
        <div className="flex gap-4 my-8">
          {categories.map((category, index) => {
            const isCategorySelected = selectedCategory.name === category.name;
            return (
              <div
                className={`py-3 px-4 ${
                  isCategorySelected ? "bg-jacarta-600" : "bg-jacarta-700"
                } rounded-lg`}
                key={index}
              >
                <p className="text-md font-semibold">{category.name}</p>
              </div>
            );
          })}
        </div>
        <div></div>
      </div>
      <div className={"grid grid-cols-4 gap-8"}>
        <MarketplaceItemCard />
        <MarketplaceItemCard />
        <MarketplaceItemCard />
        <MarketplaceItemCard />
      </div>
    </div>
  );
};

export default MarketplaceTrendingCategories;
