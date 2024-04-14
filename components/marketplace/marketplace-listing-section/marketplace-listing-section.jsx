import React, { useState, useEffect } from "react";
import {
  fetchOffer,
  parseOfferMetadata,
} from "../../../app/marketplace/marketplace-items-fetch";
import MarketplaceItemCard from "../marketplace-item-card/marketplace-item-card";
import { useChainId } from "@thirdweb-dev/react";

const MarketplaceListingSection = ({ listings, title, type }) => {
  const chainId = useChainId();
  const [listingsWithOfferInfo, setListingsWithOfferInfo] = useState([]);

  useEffect(() => {
    if (!chainId) return;
    const getListingOfferInfo = async () => {
      const formattedListings = await Promise.all(
        listings.map(async (listing) => {
          const { assetContract, tokenId } = listing;
          try {
            const { tokenData, offerMetadata } = await fetchOffer(
              assetContract,
              String(tokenId),
              chainId
            );
            console.log(tokenData, offerMetadata);

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
            console.log("Error fetching item info:");
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
  }, [listings, chainId]);

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
            assetContract={listing.assetContract}
            tokenId={listing.tokenId}
            symbol={listing.symbol}
            type={type}
          />
        ))}
      </div>
    </div>
  );
};

export default MarketplaceListingSection;
