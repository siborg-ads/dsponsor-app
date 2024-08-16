import React, { useEffect, useState } from "react";
import CarouselItem from "@/components/features/home/CarouselItem";
import Slider from "react-slick";

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return <div className={className} onClick={onClick} />;
}

const curationData: {
  logo: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}[] = [
  {
    logo: "/images/siborg-ads/siborg-ads.png",
    description:
      "SiBorg App is a web3-based Spotify-like application for Twitter Spaces and podcasts, featuring SocialFi capabilities.",
    buttonText: "Own a part of SiBorg App",
    buttonLink: "https://siborg.io"
  },
  {
    logo: "/images/cryptoast/cryptoast.webp",
    description:
      "Cryptoast is a leading French-language media outlet focused on Bitcoin, blockchain, and cryptocurrencies. Established in 2017, it aims to provide comprehensive and accessible information to both newcomers and experienced users in the crypto space.",
    buttonText: "Get your ads on Cryptoast",
    buttonLink: "https://cryptoast.fr"
  }
];

const Carousel = () => {
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

  const settings = {
    speed: 500,
    arrows: !isMobile,
    nextArrow: <SampleNextArrow className="bg-secondaryBlack h-4 w-4 rounded-full" />,
    prevArrow: <SamplePrevArrow className="bg-secondaryBlack h-4 w-4 rounded-full" />
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {curationData.map((item, index) => (
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
