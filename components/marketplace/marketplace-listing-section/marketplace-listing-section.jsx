import React, { useState, useEffect, useMemo } from "react";
import { parseOfferMetadata } from "../../../app/marketplace/marketplace-items-fetch";
import MarketplaceItemCard from "../marketplace-item-card/marketplace-item-card";
import Spinner from "../../spinner/Spinner";

const MarketplaceListingSection = ({ listings, title, type }) => {
  const [loading, setLoading] = useState(true);
  const [listingsWithOfferInfo, setListingsWithOfferInfo] = useState([]);

  const getListingOffer = async () => {
    try {
      const formattedListings = await Promise.all(
        listings.map(async (listing, index) => {
          try {
            const tokenData = listing.token.mint.tokenData;
            const offerMetadata =
              listing.token.nftContract.adOffers[0].metadataURL;

            if (!offerMetadata) {
              console.log("no offer metadata found for listing : ", listing);
              return null;
            }
            const parsedOfferInformation = await parseOfferMetadata(
              offerMetadata,
              tokenData
            );
            return { ...listing, offer: parsedOfferInformation };
          } catch (error) {
            console.log("Error fetching item info:", error);
            return null;
          }
        })
      );
      const filteredListings = formattedListings.filter(
        (listing) => listing !== null
      );
      setListingsWithOfferInfo(filteredListings);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching item info:", error);
    }
  };

  useEffect(() => {
    getListingOffer();
  }, []);

  // Memoize the rendered items to prevent unnecessary re-renders
  const renderedItems = useMemo(() => {
    return listingsWithOfferInfo.map((listing, index) => (
      <MarketplaceItemCard
        key={index}
        title={listing.offer?.name}
        image={listing.offer?.image}
        price={listing.price}
        assetContract={listing.token.nftContract.id}
        tokenId={listing.token.tokenId}
        symbol={listing.symbol}
        type={type}
      />
    ));
  }, [listingsWithOfferInfo, type]);

  return (
    <div className="container pt-28">
      <h1 className="font-display tracking-wide mb-6 text-center text-2xl font-medium text-jacarta-700 dark:text-white">
        {title}
      </h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-3 gap-8">{renderedItems}</div>
      )}
    </div>
  );
};

export default MarketplaceListingSection;
