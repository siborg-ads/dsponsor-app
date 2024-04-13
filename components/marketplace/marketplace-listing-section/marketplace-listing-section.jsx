import React, { useState, useEffect } from "react";
import {
  fetchOffer,
  parseOfferMetadata,
} from "../../../app/marketplace/marketplace-items-fetch";
import MarketplaceItemCard from "../marketplace-item-card/marketplace-item-card";

const MarketplaceListingSection = ({ listings, title, type }) => {
  const [listingsWithOfferInfo, setListingsWithOfferInfo] = useState([]);

  useEffect(() => {
    const getListingOfferInfo = async () => {
      const formattedListings = await Promise.all(
        listings.map(async (listing) => {
          const { assetContract, tokenId } = listing;
          try {
            const { tokenData, offerMetadata } = await fetchOffer(
              assetContract,
              String(tokenId)
            );

            const parsedOfferInformation = await parseOfferMetadata(
              offerMetadata,
              tokenData
            );

            // Return the modified listing
            return {
              ...listing,
              offer: parsedOfferInformation,
            };
          } catch (error) {
            window.alert("Error fetching item info:", error);
            // If an error occurs, return null for this listing
            return null;
          }
        })
      );

      // Filter out null values (listings with errors)
      const filteredListings = formattedListings.filter(
        (listing) => listing !== null
      );

      setListingsWithOfferInfo(filteredListings);
    };

    getListingOfferInfo();
  }, [listings]);

  return (
    <div className="container pt-28">
      <h1 className="font-display tracking-wide mb-6 text-center text-2xl font-medium text-jacarta-700 dark:text-white">
        {title}
      </h1>
      <div className="grid grid-cols-3 gap-8">
        {listingsWithOfferInfo.map((listing, index) => (
          <MarketplaceItemCard
            key={index}
            title={listing.offer.name}
            image={listing.offer.image}
            price={listing.price}
            symbol={listing.symbol}
            type={type}
          />
        ))}
      </div>
    </div>
  );
};

export default MarketplaceListingSection;
