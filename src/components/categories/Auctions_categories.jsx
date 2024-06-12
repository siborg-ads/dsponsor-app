import React from "react";

import Image from "next/image";
import "tippy.js/themes/light.css";
import { useChainContext } from "../../contexts/hooks/useChainContext";
import OfferItem from "../cards/offerItem";

const Auctions_categories = ({ data, isOwner }) => {
  const { currentChainObject } = useChainContext();
  const chainId = currentChainObject?.chainId;

  const sortText = [
    {
      id: 1,
      text: "Recently Added"
    },
    {
      id: 2,
      text: "Price: Low to High"
    },
    {
      id: 3,
      text: "Price: high to low"
    },
    {
      id: 4,
      text: "Auction Ending Soon"
    }
  ];

  if (!data) {
    return (
      <div className="flex w-full justify-center">
        <Image src="/images/loading-bullet.svg" alt="icon" width={60} height={60} />
      </div>
    );
  }
  return (
    <>
      {/* <!-- Grid --> */}
      <div className="dark:bg-secondaryBlack dark:text-jacarta-100 rounded-2lg bg-white p-3 flex gap-4 justify-center items-center mb-6">
        <span>
          {" "}
          This section lists all the tokens you have placed in auction.
          <br />
        </span>
      </div>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
          {data?.map((item, index) => {
            return (
              <OfferItem
                item={item}
                listingType={item?.marketplaceListings && item?.marketplaceListings[0]?.listingType}
                key={index}
                url={
                  !item.tokenData
                    ? `/${item?.chainConfig?.chainId}/offer/${item?.nftContract?.adOffers[0]?.id}/${item.tokenId}`
                    : `/${item?.chainConfig?.chainId}/offer/${item?.nftContract?.adOffers[0]?.id}/${item.tokenId}?tokenData=${item.tokenData}`
                }
                isOwner={isOwner}
                isToken={true}
                isAuction={true}
                isListing="Auction"
              />
            );
          })}
        </div>
      ) : (
        <div className="w-full flex flex-col gap-4 justify-center items-center">
          <span>{isOwner ? "You have no auctions yet..." : "No auctions..."}</span>
        </div>
      )}
    </>
  );
};

export default Auctions_categories;