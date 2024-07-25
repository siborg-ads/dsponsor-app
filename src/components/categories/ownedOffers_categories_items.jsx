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
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

const OwnedOffers_categories_items = ({ data, isPendinAdsOnOffer, isOwner, offers }) => {
  const [itemdata] = useState(trendingCategoryData);
  const dispatch = useDispatch();
  const { currentChainObject } = useChainContext();
  const chainId = currentChainObject?.chainId;
  const [filteredData, setFilteredData] = useState(data);

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    dispatch(updateTrendingCategoryItemData(itemdata.slice(0, 8)));
  }, [itemdata, dispatch]);

  useEffect(() => {
    if (filter === "all") {
      setFilteredData(data);
    } else if (filter === "disabled") {
      setFilteredData(
        data?.filter(
          (item) =>
            item?.disable ||
            new Date(item?.metadata?.offer?.valid_to) < new Date() ||
            !item?.nftContract?.prices[0]?.enabled
        )
      );
    }
  }, [filter, data]);

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
        <div className="dark:bg-secondaryBlack dark:text-jacarta-100 rounded-2lg bg-white p-3 flex gap-2 justify-center items-center mb-2">
          <ExclamationCircleIcon className="h-6 w-6 text-red" />
          <span>You have 1 or more ads proposals to check on your offer </span>
        </div>
      )}

      <div className="flex gap-4 items-center mb-6">
        <button
          className={`font-semibold text-jacarta-100 border border-primaryPurple rounded-md p-2 ${filter === "all" ? "bg-primaryPurple text-white" : ""}
          `}
          onClick={() => setFilter("all")}
        >
          All Offers
        </button>
        <button
          className={`font-semibold text-jacarta-100 border border-primaryPurple rounded-md p-2 ${filter === "disabled" ? "bg-primaryPurple text-white" : ""}`}
          onClick={() => setFilter("disabled")}
        >
          Disabled Offers
        </button>
      </div>

      {/* <!-- Grid --> */}
      {filteredData?.length > 0 ? (
        <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
          {filteredData?.map((item, index) => {
            const offer = offers?.find((offer) => offer?.id === item?.id);

            let currencyDecimals = 0;
            if (item?.prices?.length > 0) {
              currencyDecimals = item?.prices[0]?.currencyDecimals;
            } else {
              currencyDecimals = item?.marketplaceListings?.sort(
                (a, b) => Number(b?.id) - Number(a?.id)
              )[0]?.currencyDecimals;
            }

            return (
              <OfferItem
                item={item}
                listingType={item?.marketplaceListings?.[0]?.listingType}
                key={index}
                isDisabled={
                  item?.disable ||
                  new Date(item?.metadata?.offer?.valid_to) < new Date() ||
                  !item?.nftContract?.prices[0]?.enabled
                }
                url={`/${item?.chainConfig?.chainId}/offer/${item.id}`}
                isOwner={isOwner}
                offer={offer}
                createdOffersProposals={true}
                currencyDecimals={currencyDecimals}
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
