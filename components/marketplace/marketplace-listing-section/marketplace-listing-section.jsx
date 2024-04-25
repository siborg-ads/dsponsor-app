import React, { useState, useEffect, useMemo } from "react";
import {
  fetchOffer,
  parseOfferMetadata,
} from "../../../app/marketplace/marketplace-items-fetch";
import MarketplaceItemCard from "../marketplace-item-card/marketplace-item-card";
import Spinner from "../../spinner/Spinner";
import { useChainId } from "@thirdweb-dev/react";

const MarketplaceListingSection = ({ listings, title, type }) => {
  // TODO : (clean code) define it in config fil
  const chainId = 11155111;
  const [loading, setLoading] = useState(true);
  const [listingsWithOfferInfo, setListingsWithOfferInfo] = useState([]);

  useEffect(() => {
    const getListingsOfferInfo = async () => {
      const assetContractsToFetch = listings.map(
        (listing) => listing.assetContract
      );
      const tokenIdsToFetch = listings.map((listing) =>
        String(listing.tokenId)
      );

      try {
        const { tokenDatas, offerMetadatas } = await fetchOffer(
          assetContractsToFetch,
          tokenIdsToFetch,
          chainId
        );
        const formattedListings = await Promise.all(
          listings.map(async (listing, index) => {
            try {
              const tokenData = tokenDatas[index];
              const offerMetadata = offerMetadatas[index];
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
        setLoading(false);
      }
    };

    getListingsOfferInfo();
  }, [listings, chainId]);

  // Memoize the rendered items to prevent unnecessary re-renders
  const renderedItems = useMemo(() => {
    return listingsWithOfferInfo.map((listing, index) => (
      <MarketplaceItemCard
        key={index}
        title={listing.offer?.name}
        image={listing.offer?.image}
        price={listing.price}
        assetContract={listing.assetContract}
        tokenId={listing.tokenId}
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
