import React, { useCallback, useEffect, useState } from "react";
import CarouselItem from "@/components/features/home/CarouselItem";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Filters from "@/components/features/home/Filters";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import type { Filter, CurationDataItem } from "@/data/curation";

const Carousel = ({
  data,
  filter,
  setFilter
}: {
  data: CurationDataItem[];
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
}) => {
  const [filteredData, setFilteredData] = useState<CurationDataItem[]>([]);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    const filteredData = data.filter((curate) => {
      if (filter !== "all") {
        return curate.type.includes(filter);
      }
      return true;
    });

    setFilteredData(filteredData);
  }, [data, filter]);

  return (
    <React.Fragment>
      <div className="flex flex-col gap-4">
        <Filters data={data} filter={filter} setFilter={setFilter} />

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
