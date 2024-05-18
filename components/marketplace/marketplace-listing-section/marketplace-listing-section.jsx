import React, { useState, useEffect, useMemo } from "react";
import { fetchListingAdOffer } from "../../../containers/MarketplaceContainer/services";
import MarketplaceItemCard from "../marketplace-item-card/marketplace-item-card";
import Spinner from "../../spinner/Spinner";
import {useChainContext} from "../../../contexts/hooks/useChainContext";

const MarketplaceListingSection = ({ listings, title, type }) => {
  const [loading, setLoading] = useState(true);
  const [listingsWithOfferInfo, setListingsWithOfferInfo] = useState([]);
  const [listingOfferInfoInvalid, setListingOfferInfoInvalid] = useState(false);

  const {chainName } = useChainContext();
  const getListingOffer = async () => {
    try {
      const formattedListings = await Promise.all(
        listings.map((listing, index) => fetchListingAdOffer(listing))
      );
      console.log("formattedListings", formattedListings);
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
  }, [chainName]);


  // Memoize the rendered items to prevent unnecessary re-renders
  const renderedItems = useMemo(() => {
    return listingsWithOfferInfo.map((listing, index) => (
      <MarketplaceItemCard
        key={index}
        title={listing.offer?.name}
        image={listing.offer?.image}
        price={listing.price}
        chainName={chainName}
        offer={listing.token.nftContract.adOffers?.[0]}
        tokenData={listings[0].token?.mint?.tokenData}
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
