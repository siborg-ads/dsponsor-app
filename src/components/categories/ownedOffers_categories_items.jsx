import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useChainContext } from "../../contexts/hooks/useChainContext";
import { activated_features } from "../../data/activated_features";
import { trendingCategoryData } from "../../data/categories_data";
import { updateTrendingCategoryItemData } from "../../redux/counterSlice";
import ConditionalDisplayedComponent from "../../utils/ConditionalDisplayedComponent";
import OfferItem from "../cards/offerItem";
import MainButton from "../buttons/mainButton";

const OwnedOffers_categories_items = ({ data, isPendinAdsOnOffer, isOwner }) => {
  const [itemdata] = useState(trendingCategoryData);
  const dispatch = useDispatch();
  const { currentChainObject } = useChainContext();
  const chainId = currentChainObject?.chainId;

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
        <div className="dark:bg-secondaryBlack dark:text-jacarta-100 rounded-2lg bg-white p-3 flex gap-4 justify-center items-center mb-6">
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
                listingType={item?.marketplaceListings?.[0]?.listingType}
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
            <span>No offers yet...</span>
            <MainButton link={`/${chainId}/offer/create`} isPurple={true} text="Create" />
          </div>
        </ConditionalDisplayedComponent>
      )}
    </>
  );
};

export default OwnedOffers_categories_items;
