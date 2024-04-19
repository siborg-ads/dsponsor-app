import React, { useState, useEffect, useMemo } from "react";
import {
  fetchOffer,
  parseOfferMetadata,
} from "../../../app/marketplace/marketplace-items-fetch";
import MarketplaceItemCard from "../marketplace-item-card/marketplace-item-card";
import Spinner from "../../spinner/Spinner";
import { useChainId } from "@thirdweb-dev/react";

const MarketplaceListingSection = ({ listings, title, type }) => {
  const chainId = useChainId();
  const [loading, setLoading] = useState(true);
  const [listingsWithOfferInfo, setListingsWithOfferInfo] = useState([]);

  useEffect(() => {
    if (!chainId || !listings.length) return;

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
        console.log(listings, tokenDatas, offerMetadatas);

        console.log(tokenDatas, offerMetadatas);

        const formattedListings = await Promise.all(
          listings.map(async (listing, index) => {
            const { assetContract, tokenId } = listing;
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
{
  /* <div
          role="status"
          class="flex items-center justify-center h-56 max-w-sm bg-green rounded-lg animate-pulse dark:bg-gray-700"
        >
          <svg
            class="w-10 h-10 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 20"
          >
            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
          </svg>
          <span class="sr-only">Loading...</span>
        </div> */
}
