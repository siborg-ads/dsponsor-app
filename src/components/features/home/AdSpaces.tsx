import React, { useState, useEffect } from "react";
import TokenCardSkeleton from "@/components/ui/skeletons/TokenCardSkeleton";
import TokenCard from "@/components/ui/cards/TokenCard";
import { Filter } from "@/components/layout/Home";
import useEmblaCarousel from "embla-carousel-react";

const AdSpaces = ({
  isLoading,
  text,
  offers,
  adSpaces,
  filter,
  curratedOfferIdsByType
}: {
  isLoading: boolean;
  text: string;
  offers: any[];
  adSpaces: any[];
  filter: Filter;
  curratedOfferIdsByType: { offerId: number; type: Filter[] }[];
}) => {
  const [finalAdSpaces, setFinalAdSpaces] = useState<any[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const [emblaRef] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  useEffect(() => {
    if (adSpaces) {
      // only get mint and buy tokens
      const filteredAdSpaces = adSpaces?.filter((element) => {
        return (
          (element?.listingType === "Direct" &&
            element?.status === "CREATED" &&
            new Date(element?.startTime * 1000).getTime() < new Date().getTime() &&
            new Date(element?.endTime * 1000).getTime() > new Date().getTime()) ||
          element?.item?.mint === null
        );
      });

      // need to filter the ad spaces based on the filter
      let almostFinalAdSpaces: any[] = [];
      if (filter !== "all") {
        const filteredByType = curratedOfferIdsByType
          ?.filter((element) => element?.type?.includes(filter))
          ?.map((element) => element?.offerId);

        const filteredByTypeAdSpaces = filteredAdSpaces.filter((element) =>
          filteredByType?.includes(Number(element?.offerId))
        );

        almostFinalAdSpaces = filteredByTypeAdSpaces;
      } else {
        almostFinalAdSpaces = filteredAdSpaces;
      }

      // show only 2 tokens per offer id
      const finalAdSpaces: any[] = [];
      const offerIds: number[] = [];

      almostFinalAdSpaces?.forEach((element) => {
        if (offerIds?.filter((id) => id === Number(element?.offerId))?.length < 2) {
          offerIds.push(Number(element?.offerId));
          finalAdSpaces.push(element);
        }
      }, []);

      setFinalAdSpaces(finalAdSpaces);
    }
  }, [adSpaces, curratedOfferIdsByType, filter, offers]);

  if (!isLoading && finalAdSpaces?.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-xl font-semibold text-white ">{text}</span>
      </div>

      {!isLoading ? (
        <div className="embla" ref={emblaRef}>
          <div className="embla__container my-4">
            {(isMobile
              ? finalAdSpaces
              : finalAdSpaces.reduce((resultArray, item, index) => {
                  const chunkIndex = Math.floor(index / 2);

                  if (!resultArray[chunkIndex]) {
                    resultArray[chunkIndex] = [];
                  }

                  resultArray[chunkIndex].push(item);

                  return resultArray;
                }, [])
            )?.map((element: any, index) => {
              console.log(element);

              return (
                <div
                  key={index}
                  className="embla__slide"
                  style={{
                    flex: "0 0 100%"
                  }}
                >
                  {!isMobile ? (
                    <div className="grid grid-cols-2 gap-2 w-full">
                      <TokenCard
                        item={element?.[0]?.item}
                        isToken={true}
                        listingType={element?.[0]?.listingType}
                        isListing={element?.[0]?.listingType === "Direct"}
                        isAuction={element?.[0]?.listingType === "Auction"}
                        offers={offers}
                        url={
                          !element?.[0]?.tokenData
                            ? `/${element?.[0]?.chainId}/offer/${element?.[0]?.offerId}/${element?.[0]?.tokenId}`
                            : `/${element?.[0]?.chainId}/offer/${element?.[0]?.item?.nftContract?.adOffers[0]?.id}/${element?.[0]?.tokenId}?tokenData=${element?.[0]?.item?.mint?.tokenData}`
                        }
                        currencyDecimals={element?.[0]?.currencyDecimals}
                      />
                      <TokenCard
                        item={element?.[1]?.item}
                        isToken={true}
                        listingType={element?.[1]?.listingType}
                        isListing={element?.[1]?.listingType === "Direct"}
                        isAuction={element?.[1]?.listingType === "Auction"}
                        offers={offers}
                        url={
                          !element?.[1]?.tokenData
                            ? `/${element?.[1]?.chainId}/offer/${element?.[1]?.offerId}/${element?.[1]?.tokenId}`
                            : `/${element?.[1]?.chainId}/offer/${element?.[1]?.item?.nftContract?.adOffers[0]?.id}/${element?.[1]?.tokenId}?tokenData=${element?.[1]?.item?.mint?.tokenData}`
                        }
                        currencyDecimals={element?.[1]?.currencyDecimals}
                      />
                    </div>
                  ) : (
                    <TokenCard
                      item={element?.item}
                      isToken={true}
                      listingType={element?.listingType}
                      isListing={element?.listingType === "Direct"}
                      isAuction={element?.listingType === "Auction"}
                      offers={offers}
                      url={
                        !element?.tokenData
                          ? `/${element?.chainId}/offer/${element?.offerId}/${element?.tokenId}`
                          : `/${element?.chainId}/offer/${element?.item?.nftContract?.adOffers?.[0]?.id}/${element?.tokenId}?tokenData=${element?.item?.mint?.tokenData}`
                      }
                      currencyDecimals={element?.currencyDecimals}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
          <TokenCardSkeleton />
          <TokenCardSkeleton />
        </div>
      )}
    </div>
  );
};

export default AdSpaces;
