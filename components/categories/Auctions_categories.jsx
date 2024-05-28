import React, { useState, useEffect } from "react";

import Link from "next/link";

import { useDispatch } from "react-redux";
import "tippy.js/themes/light.css";
import Image from "next/image";
import OfferItem from "../cards/offerItem";
import { useChainContext } from "../../contexts/hooks/useChainContext";


const Auctions_categories = ({ data, isOwner }) => {
  

  const { currentChainObject } = useChainContext();
  const chainName = currentChainObject?.chainName;


  const handleFilter = (category) => {
    if (category !== "all") {
      setItemdata(trendingCategoryData.filter((item) => item.category === category));
    } else {
      setItemdata(trendingCategoryData);
    }
  };

  const sortText = [
    {
      id: 1,
      text: "Recently Added",
    },
    {
      id: 2,
      text: "Price: Low to High",
    },
    {
      id: 3,
      text: "Price: high to low",
    },
    {
      id: 4,
      text: "Auction Ending Soon",
    },
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
      {data.length > 0 ? (
        <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
          {data?.map((item, index) => {
            return (
              <OfferItem
                item={item}
                key={index}
                url={
                  !item.tokenData ? `/${chainName}/offer/${item?.nftContract?.adOffers[0]?.id}/${item.tokenId}` : `/${chainName}/offer/${item?.nftContract?.adOffers[0]?.id}/${item.tokenId}?tokenData=${item.tokenData}`
                }
            
                isOwner={isOwner}
                isToken={true}
                isAuction={true}
              />
            );
          })}
        </div>
      ) : (
        <div className="w-full flex flex-col gap-4 justify-center items-center">
          <span>You have no offers yet...</span>
          <Link href={`/${chainName}/offer/create`} className="bg-accent shadow-accent-volume hover:bg-accent-dark w-36 rounded-full py-3 px-8 text-center font-semibold text-white transition-all">
            Create
          </Link>
        </div>
      )}
    </>
  );
};

export default Auctions_categories;
