import Image from "next/image";
import React, { useEffect, useState } from "react";
import { features } from "@/data/features";
//import { updateTrendingCategoryItemData } from "@/redux/counterSlice";
import ConditionalDisplayedComponent from "@/components/ui/misc/ConditionalDisplayedComponent";
import TokenCard from "@/components/ui/cards/TokenCard";
import MainButton from "@/components/ui/buttons/MainButton";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { Address } from "thirdweb";

const CreatedOffers = ({
  data,
  isPendingAdsOnOffer,
  isOwner,
  offers,
  isLoading,
  manageAddress
}: {
  data: any;
  isPendingAdsOnOffer?: boolean;
  isOwner: boolean;
  offers: any;
  isLoading: boolean;
  manageAddress: Address;
}) => {
  const [filteredData, setFilteredData] = useState(data);

  const [filter, setFilter] = useState("all");

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

  if (isLoading) {
    return (
      <div className="flex justify-center w-full">
        <Image src="/images/loader/loading-bullet.svg" alt="icon" width={60} height={60} />
      </div>
    );
  }

  return (
    <>
      {isPendingAdsOnOffer && isOwner && (
        <div className="flex items-center justify-center gap-2 p-3 mb-2 bg-white dark:bg-secondaryBlack dark:text-jacarta-100 rounded-2lg">
          <ExclamationCircleIcon className="w-6 h-6 text-red" />
          <span>You have 1 or more ads proposals to check on your offer </span>
        </div>
      )}

      <div className="flex items-center gap-4 mb-6">
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
            console.log(item);

            const currencyDecimals = Number(
              item?.marketplaceListings?.sort((a, b) => Number(b?.id) - Number(a?.id))[0]
                ?.currencyDecimals ?? item?.nftContract?.prices?.[0]?.currencyDecimals
            );
            const currencySymbol =
              item?.marketplaceListings?.sort((a, b) => Number(b?.id) - Number(a?.id))[0]
                ?.currencySymbol ?? item?.nftContract?.prices?.[0]?.currencySymbol;

            return (
              <TokenCard
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
                currencySymbol={currencySymbol}
                currencyDecimals={currencyDecimals}
                availableToSubmitAdFromCreatedOffers
                fromProfilePage={true}
                profileAddress={manageAddress}
              />
            );
          })}
        </div>
      ) : (
        <ConditionalDisplayedComponent condition={features.canCreateOffer}>
          <div className="flex flex-col items-center justify-center w-full gap-4">
            <span>No offers yet...</span>
            <MainButton link={`/createOffer`} isPurple={true} text="Create" />
          </div>
        </ConditionalDisplayedComponent>
      )}
    </>
  );
};

export default CreatedOffers;
