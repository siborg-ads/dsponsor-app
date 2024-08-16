import React, { useEffect, useState } from "react";
import CarouselItem from "@/components/features/home/CarouselItem";
import Slider from "react-slick";
import { Filter } from "@/components/layout/Home";
import { curationData } from "@/data/curationData";

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
}

const Carousel = ({ filter }: { filter: Filter }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth < 768);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setIsMobile(window.innerWidth < 768);
      });
    };
  }, []);

  const filteredData = curationData.filter((curate) => {
    if (filter !== "all") {
      return curate?.type === filter;
    }
    return true;
  });

  const settings = {
    speed: 500,
    arrows: !isMobile && filteredData?.length > 1,
    nextArrow: <SampleNextArrow className="bg-secondaryBlack h-4 w-4 rounded-full" />,
    prevArrow: <SamplePrevArrow className="bg-secondaryBlack h-4 w-4 rounded-full" />
  };

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
    <div className="slider-container">
      <Slider {...settings}>
        {filteredData?.map((item, index) => (
          <CarouselItem
            key={index}
            logo={item.logo}
            description={item.description}
            buttonText={item.buttonText}
            buttonLink={item.buttonLink}
          />
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
