import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import "tippy.js/dist/tippy.css";
import { bidsData } from "../../data/bids_data";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { bidsModalShow } from "../../redux/counterSlice";
import { useDispatch } from "react-redux";
import Likes from "../likes";
import ItemCardSkeleton from "../skeleton/ItemCardSkeleton";

import { gql } from "@apollo/client";

import { useEffect, useState } from "react";
import OfferItem from "../cards/offerItem";

const HomeCarousel = ({ data, isToken = false, arrowName }) => {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar]}
        spaceBetween={30}
        slidesPerView="auto"
        loop={true}
        breakpoints={{
          240: {
            slidesPerView: 1
          },
          565: {
            slidesPerView: 2
          },
          1000: {
            slidesPerView: 3
          },
          1100: {
            slidesPerView: 4
          }
        }}
        navigation={{
          nextEl: `.bids-swiper-button-next-${arrowName}`,
          prevEl: `.bids-swiper-button-prev-${arrowName}`
        }}
        className=" card-slider-4-columns !py-5"
      >
        {data.length === 0 || !data
          ? [...Array(25)].map((_, index) => (
              <SwiperSlide className="text-white" key={index}>
                <ItemCardSkeleton widthSize={275} />
              </SwiperSlide>
            ))
          : data.map((item, index) => {
              return (
                <SwiperSlide className="text-white" key={index}>
                  {isToken ? (
                    <OfferItem
                      item={item}
                      url={
                        !item.mint?.tokenData
                          ? `/${item?.chainConfig?.chainId}/offer/${item?.offerId}/${item?.tokenId}`
                          : `/${item?.chainConfig?.chainId}/offer/${item?.nftContract?.adOffers[0]?.id}/${item?.tokenId}?tokenData=${item?.mint?.tokenData}`
                      }
                      isToken={isToken}
                      isListing={item?.marketplaceListings[0]?.listingType}
                    />
                  ) : (
                    <OfferItem
                      item={item}
                      url={`/${item?.chainConfig?.chainId}/offer/${item.id}/${item.tokenIdAllowedToMint ? item.tokenIdAllowedToMint : ""}`}
                    />
                  )}
                </SwiperSlide>
              );
            })}
      </Swiper>
      {/* <!-- Slider Navigation --> */}
      <div
        className={`group bids-swiper-button-prev-${arrowName} swiper-button-prev shadow-white-volume absolute !top-1/2 !-left-4 z-10 -mt-6 flex !h-12 !w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-jacarta-700 text-xl sm:!-left-6 after:hidden`}
      >
        <MdKeyboardArrowLeft />
      </div>
      <div
        className={`group bids-swiper-button-next-${arrowName} swiper-button-next shadow-white-volume absolute !top-1/2 !-right-4 z-10 -mt-6 flex !h-12 !w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-jacarta-700 text-xl sm:!-right-6 after:hidden`}
      >
        <MdKeyboardArrowRight />
      </div>
    </>
  );
};

export default HomeCarousel;
