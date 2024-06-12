import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useChainContext } from "../../contexts/hooks/useChainContext";
import { activated_features } from "../../data/activated_features";
import { trendingCategoryData } from "../../data/categories_data";
import { updateTrendingCategoryItemData } from "../../redux/counterSlice";
import ConditionalDisplayedComponent from "../../utils/ConditionalDisplayedComponent";
import OfferItem from "../cards/offerItem";
import MainButton from "../buttons/mainButton";

const OwnedOffers_categories_items = ({ data, isPendinAdsOnOffer, isOwner }) => {
  const [itemdata, setItemdata] = useState(trendingCategoryData);
  const dispatch = useDispatch();
  const { currentChainObject } = useChainContext();
  const chainId = currentChainObject?.chainId;
  const { trendingCategorySorText } = useSelector((state) => state.counter);
  const [filterVal, setFilterVal] = useState(0);

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

  useEffect(() => {
    dispatch(updateTrendingCategoryItemData(itemdata.slice(0, 8)));
  }, [itemdata, dispatch]);

  if (!data) {
    return (
      <div className="flex w-full justify-center">
        <Image src="/images/loading-bullet.svg" alt="icon" width={60} height={60} />
      </div>
    );
  }
  return (
    <>
      {isPendinAdsOnOffer && isOwner && (
        <div className="dark:bg-jacarta-700 dark:text-jacarta-300 dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white p-3 flex gap-4 justify-center items-center mb-6">
          <span className="bg-red rounded-2xl dark:text-white  px-2">!</span>
          <span> You have 1 or more ads proposals to check on your offer </span>
        </div>
      )}

      {/* <!-- Grid --> */}
      {data.length > 0 ? (
        <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
          {data?.map((item, index) => {
            return (
              <OfferItem
                item={item}
                listingType={item?.marketplaceListings[0]?.listingType}
                key={index}
                url={`/${item?.chainConfig?.chainId}/offer/${item.id}`}
                isOwner={isOwner}
              />
            );
          })}
        </div>
      ) : (
        <ConditionalDisplayedComponent condition={activated_features.canCreateOffer}>
          <div className="w-full flex flex-col gap-4 justify-center items-center">
            <span>You have no offers yet...</span>
            <MainButton link={`/${chainId}/offer/create`} isPurple={true} text="Create" />
          </div>
        </ConditionalDisplayedComponent>
      )}
    </>
  );
};

export default OwnedOffers_categories_items;
