import React, { useState, useEffect, useCallback } from "react";
import TokenCardSkeleton from "@/components/ui/skeletons/TokenCardSkeleton";
import TokenCard from "@/components/ui/cards/TokenCard";
import { Filter } from "@/data/curation";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

const getChunksFromInnerWidth = (innerWidth: number) => {
  if (innerWidth <= 1024) {
    return 3;
  } else {
    return 4;
  }
};

const AdSpaces = ({
  isLoading,
  text,
  offers,
  adSpaces,
  filter,
  curratedOfferIds
}: {
  isLoading: boolean;
  text: string;
  offers: any[];
  adSpaces: any[];
  filter: Filter;
  curratedOfferIds: { chainId: number; offerId: number; type: Filter[] }[];
}) => {
  const [finalAdSpaces, setFinalAdSpaces] = useState<any[]>([]);
  const [breakpoint, setBreakpoint] = useState<number | undefined>(640);
  const [cardChunks, setCardChunks] = useState<number>(1);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(window.innerWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (adSpaces) {
      // only get mint and buy tokens
      const filteredAdSpaces = adSpaces?.filter((element) => {
        return (
          (element?.listingType &&
            element?.status === "CREATED" &&
            new Date(element?.startTime * 1000).getTime() < new Date().getTime() &&
            new Date(element?.endTime * 1000).getTime() > new Date().getTime()) ||
          element?.item?.mint === null
        );
      });

      // need to filter the ad spaces based on the filter
      let almostFinalAdSpaces: any[] = [];
      if (filter !== "all") {
        const filteredByType = curratedOfferIds
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
      const nbTokens: { [key: string]: number } = {};

      for (const element of almostFinalAdSpaces) {
        const key = `${element.chainId}-${element.offerId}`;
        nbTokens[key] = nbTokens[key] ? nbTokens[key] + 1 : 1;
        if (nbTokens[key] < 2) {
          finalAdSpaces.push(element);
        }
      }

      setFinalAdSpaces(finalAdSpaces);
    }
  }, [adSpaces, curratedOfferIds, filter, offers]);

  useEffect(() => {
    const cardChunks = getChunksFromInnerWidth(breakpoint as number);
    setCardChunks(cardChunks);
  }, [breakpoint]);

  if (!isLoading && finalAdSpaces?.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-xl font-semibold text-white ">{text}</span>
      </div>

      {!isLoading ? (
        <div className="flex flex-col gap-2 embla" ref={emblaRef}>
          <div className="mt-1 embla__container">
            {((breakpoint as number) <= 640
              ? finalAdSpaces
              : finalAdSpaces.reduce((resultArray, item, index) => {
                  const chunkIndex = Math.floor(index / cardChunks);

                  if (!resultArray[chunkIndex]) {
                    resultArray[chunkIndex] = [];
                  }

                  resultArray[chunkIndex].push(item);

                  return resultArray;
                }, [])
            )?.map((element: any, index) => {
              return (
                <div
                  key={index}
                  className="embla__slide"
                  style={{
                    flex: "0 0 100%"
                  }}
                >
                  {(breakpoint as number) > 640 ? (
                    <div
                      className={`grid ${(breakpoint as number) <= 1024 ? "grid-cols-3" : "grid-cols-4"} gap-2 w-full`}
                    >
                      {element?.[0] && (
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
                              : `/${element?.[0]?.chainId}/offer/${element?.[0]?.offerId}/${element?.[0]?.tokenId}?tokenData=${element?.[0]?.item?.mint?.tokenData}`
                          }
                          currencyDecimals={element?.[0]?.currencyDecimals}
                          currencySymbol={element?.[0]?.currencySymbol}
                          usdcPriceFormatted={element?.[0]?.usdcPriceFormatted}
                        />
                      )}
                      {element?.[1] && (
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
                              : `/${element?.[1]?.chainId}/offer/${element?.[1]?.offerId}/${element?.[1]?.tokenId}?tokenData=${element?.[1]?.item?.mint?.tokenData}`
                          }
                          currencyDecimals={element?.[1]?.currencyDecimals}
                          currencySymbol={element?.[1]?.currencySymbol}
                          usdcPriceFormatted={element?.[1]?.usdcPriceFormatted}
                        />
                      )}
                      {element?.[2] && (
                        <TokenCard
                          item={element?.[2]?.item}
                          isToken={true}
                          listingType={element?.[2]?.listingType}
                          isListing={element?.[2]?.listingType === "Direct"}
                          isAuction={element?.[2]?.listingType === "Auction"}
                          offers={offers}
                          url={
                            !element?.[2]?.tokenData
                              ? `/${element?.[2]?.chainId}/offer/${element?.[2]?.offerId}/${element?.[2]?.tokenId}`
                              : `/${element?.[2]?.chainId}/offer/${element?.[2]?.offerId}/${element?.[2]?.tokenId}?tokenData=${element?.[2]?.item?.mint?.tokenData}`
                          }
                          currencyDecimals={element?.[2]?.currencyDecimals}
                          currencySymbol={element?.[2]?.currencySymbol}
                          usdcPriceFormatted={element?.[2]?.usdcPriceFormatted}
                        />
                      )}
                      {element?.[3] && (
                        <TokenCard
                          item={element?.[3]?.item}
                          isToken={true}
                          listingType={element?.[3]?.listingType}
                          isListing={element?.[3]?.listingType === "Direct"}
                          isAuction={element?.[3]?.listingType === "Auction"}
                          offers={offers}
                          url={
                            !element?.[3]?.tokenData
                              ? `/${element?.[3]?.chainId}/offer/${element?.[3]?.offerId}/${element?.[3]?.tokenId}`
                              : `/${element?.[3]?.chainId}/offer/${element?.[3]?.offerId}/${element?.[3]?.tokenId}?tokenData=${element?.[3]?.item?.mint?.tokenData}`
                          }
                          currencyDecimals={element?.[3]?.currencyDecimals}
                          currencySymbol={element?.[3]?.currencySymbol}
                          usdcPriceFormatted={element?.[3]?.usdcPriceFormatted}
                        />
                      )}
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
                          : `/${element?.chainId}/offer/${element?.offerId}/${element?.tokenId}?tokenData=${element?.item?.mint?.tokenData}`
                      }
                      currencyDecimals={element?.currencyDecimals}
                      currencySymbol={element?.currencySymbol}
                      usdcPriceFormatted={element?.usdcPriceFormatted}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {(breakpoint as number) <= 640 ? (
            <div className="flex items-center gap-2">
              <button
                className="p-2 rounded-full embla__prev bg-secondaryBlack"
                onClick={scrollPrev}
              >
                <ArrowLeftIcon className="w-4 h-4" />
              </button>
              <button
                className="p-2 rounded-full embla__next bg-secondaryBlack"
                onClick={scrollNext}
              >
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          ) : (
            (breakpoint as number) > 640 &&
            finalAdSpaces?.length > cardChunks && (
              <div className="flex items-center gap-2">
                <button
                  className="p-2 rounded-full embla__prev bg-secondaryBlack"
                  onClick={scrollPrev}
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                </button>
                <button
                  className="p-2 rounded-full embla__next bg-secondaryBlack"
                  onClick={scrollNext}
                >
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            )
          )}
        </div>
      ) : (
        <React.Fragment>
          <div className="grid grid-cols-1 gap-4 sm:hidden">
            <TokenCardSkeleton />
          </div>
          <div className="hidden gap-4 sm:grid sm:grid-cols-2 md:hidden">
            <TokenCardSkeleton />
            <TokenCardSkeleton />
          </div>
          <div className="hidden gap-4 md:grid md:grid-cols-3 lg:hidden">
            <TokenCardSkeleton />
            <TokenCardSkeleton />
            <TokenCardSkeleton />
          </div>
          <div className="hidden gap-4 lg:grid lg:grid-cols-4">
            <TokenCardSkeleton />
            <TokenCardSkeleton />
            <TokenCardSkeleton />
            <TokenCardSkeleton />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default AdSpaces;
