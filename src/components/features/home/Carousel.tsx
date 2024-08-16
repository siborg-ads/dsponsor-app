import React, { useEffect, useState } from "react";
import CarouselItem from "@/components/features/home/CarouselItem";
import useEmblaCarousel from "embla-carousel-react";
import { Filter } from "@/components/layout/Home";
import { curationData } from "@/data/curation";
import { useChainContext } from "@/hooks/useChainContext";
import Autoplay from "embla-carousel-autoplay";

const Carousel = ({ filter }: { filter: Filter }) => {
  const [baseURL, setBaseURL] = useState<string>("");

  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  const { currentChainObject } = useChainContext();
  const chainId = currentChainObject?.chainId;

  useEffect(() => {
    const baseURL = window.location.origin;
    setBaseURL(baseURL);
  }, []);

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

  if (!filteredData?.length) {
    return null;
  }

  if (filteredData?.length === 1) {
    return (
      <CarouselItem
        logo={filteredData[0].logo}
        description={filteredData[0].description}
        buttonText={filteredData[0].buttonText}
        buttonLink={filteredData[0].buttonLink}
      />
    );
  }

  return (
    <div className="embla" ref={emblaRef}>
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
    </div>
  );
};

export default Carousel;
