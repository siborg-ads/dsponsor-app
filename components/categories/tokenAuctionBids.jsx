import React from "react";
import Image from "next/image";
import "tippy.js/themes/light.css";
import { useChainContext } from "../../contexts/hooks/useChainContext";
import OfferItem from "../cards/offerItem";

const TokenAuctionBids = ({ data, isOwner }) => {
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
      <div className="dark:bg-jacarta-700 dark:text-jacarta-300 dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white p-3 flex gap-4 justify-center items-center mb-6">
        <span>
          {" "}
          This section is listing all the tokens where you have placed a bid : <br />
          <span className="text-red font-medium">CANCELLED</span> : You have been out bid by another
          user. <br />
          <span className="text-accent font-medium">CREATED</span> : You are the highest bidder.{" "}
          <br />
          <span className="text-green font-medium">COMPLETED</span> : You have been out bid by
          another user.
        </span>
      </div>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
          {data?.map((item, index) => {
            return (
              <OfferItem
                item={item}
                key={index}
                listingType={item?.marketplaceListings[0]?.listingType}
                url={
                  !item.tokenData
                    ? `/${item?.chainConfig?.chainId}/offer/${item?.nftContract?.adOffers[0]?.id}/${item.tokenId}`
                    : `/${item?.chainConfig?.chainId}/offer/${item?.nftContract?.adOffers[0]?.id}/${item.tokenId}?tokenData=${item.tokenData}`
                }
                isOwner={isOwner}
                isToken={true}
                isAuction={true}
                isListing={true}
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

export default TokenAuctionBids;
