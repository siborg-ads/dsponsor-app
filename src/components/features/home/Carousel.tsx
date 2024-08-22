import React, { useCallback, useEffect, useState } from "react";
import CarouselItem from "@/components/features/home/CarouselItem";
import useEmblaCarousel from "embla-carousel-react";
import type { Filter } from "@/components/layout/Home";
import { curationData } from "@/data/curation";
import { useChainContext } from "@/hooks/useChainContext";
import Autoplay from "embla-carousel-autoplay";
import Filters from "@/components/features/home/Filters";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

const Carousel = ({
  filter,
  setFilter
}: {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
}) => {
  const [baseURL, setBaseURL] = useState<string>("");
  const [filteredData, setFilteredData] = useState<
    {
      logo: string;
      description: string;
      buttonText: string;
      offerId?: number;
      buttonLink: string;
      type: Filter[];
    }[]
  >([]);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const { currentChainObject } = useChainContext();
  const chainId = currentChainObject?.chainId;

  useEffect(() => {
    const baseURL = window.location.origin;
    setBaseURL(baseURL);
  }, []);

  useEffect(() => {
    if (!chainId) return;

    const curationArrayFromChainId =
      Object?.entries(curationData(baseURL) ?? {})?.find(([key]) => Number(key) === chainId)?.[1] ??
      [];

    const curationArray = Object.values(curationArrayFromChainId);

    const filteredData = curationArray.filter((curate) => {
      if (filter !== "all") {
        return curate.type.includes(filter);
      }
      return true;
    });

    setFilteredData(filteredData);
  }, [filter, baseURL, chainId]);

  return (
    <React.Fragment>
      <div className="flex flex-col gap-4">
        <Filters filter={filter} setFilter={setFilter} />

        {filteredData?.length > 0 && (
          <div className="embla flex flex-col gap-2" ref={emblaRef}>
            <div className="embla__container">
              {filteredData?.map((item, index) => (
                <div
                  key={index}
                  className="embla__slide"
                  style={{
                    flex: "0 0 100%"
                  }}
                >
                  <CarouselItem
                    logo={item.logo}
                    description={item.description}
                    buttonText={item.buttonText}
                    buttonLink={item.buttonLink}
                  />
                </div>
              ))}
            </div>

            {filteredData?.length > 1 && (
              <div className="flex items-center gap-2">
                <button
                  className="embla__prev bg-secondaryBlack rounded-full p-2"
                  onClick={scrollPrev}
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                </button>
                <button
                  className="embla__next bg-secondaryBlack rounded-full p-2"
                  onClick={scrollNext}
                >
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Carousel;
