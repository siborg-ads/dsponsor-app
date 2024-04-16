import React, { useEffect, useState } from "react";
import { tranding_category_filter } from "../../data/categories_data";
import CategoryItem from "./categoryItem";
import { trendingCategoryData } from "../../data/categories_data";
import Tippy from "@tippyjs/react";
import Recently_added_dropdown from "../dropdown/recently_added_dropdown";
import { useSelector, useDispatch } from "react-redux";
import { updateTrendingCategoryItemData } from "../../redux/counterSlice";
import Review_adProposal_data from "./review_adProposal_items";
import OfferItem from "../cards/offerItem";
import Link from "next/link";
import Image from "next/image";

const OwnedOffers_categories_items = ({ data }) => {
  const [itemdata, setItemdata] = useState(trendingCategoryData);
  const dispatch = useDispatch();
  const { trendingCategorySorText } = useSelector((state) => state.counter);
  const [filterVal, setFilterVal] = useState(0);

  const handleFilter = (category) => {
    if (category !== "all") {
      setItemdata(trendingCategoryData.filter((item) => item.category === category));
    } else {
      setItemdata(trendingCategoryData);
    }
  };

  const sortText = [
    {
      id: 1,
      text: "Recently Added",
    },
    {
      id: 2,
      text: "Price: Low to High",
    },
    {
      id: 3,
      text: "Price: high to low",
    },
    {
      id: 4,
      text: "Auction Ending Soon",
    },
  ];

  useEffect(() => {
    dispatch(updateTrendingCategoryItemData(itemdata.slice(0, 8)));
  }, [itemdata, dispatch]);

  if (!data ) {
    return (
      <div className="flex w-full justify-center">
        <Image src="/images/loading-bullet.svg" alt="icon" width={60} height={60}  />
      </div>
    );
  }
  return (
    <>
      {/* <!-- Filter --> */}
      {/* <div className="mb-8 flex flex-wrap items-center justify-between">
        <ul className="flex flex-wrap items-center">
          {tranding_category_filter.map(({ id, svg, text }) => {
            if (text === "all") {
              return (
                <li className="my-1 mr-2.5" key={id}>
                  <button
                    className={
                      filterVal === id
                        ? "dark:border-jacarta-600 group bg-accent border-jacarta-100 font-display flex h-9 items-center rounded-lg border px-4 text-sm font-semibold transition-colors border-transparent text-white dark:border-transparent capitalize"
                        : "dark:border-jacarta-600 dark:bg-jacarta-900 dark:hover:bg-accent group hover:bg-accent border-jacarta-100 font-display text-jacarta-500 flex h-9 items-center rounded-lg border bg-white px-4 text-sm font-semibold transition-colors hover:border-transparent hover:text-white dark:text-white dark:hover:border-transparent dark:hover:text-white capitalize"
                    }
                    onClick={() => {
                      handleFilter(text);
                      setFilterVal(id);
                    }}
                  >
                    {text}
                  </button>
                </li>
              );
            } else {
              return (
                <li className="my-1 mr-2.5" key={id}>
                  <button
                    onClick={() => {
                      handleFilter(text);
                      setFilterVal(id);
                    }}
                  >
                    <div
                      className={
                        filterVal === id
                          ? "dark:border-jacarta-600 group bg-accent border-jacarta-100 font-display flex h-9 items-center rounded-lg border px-4 text-sm font-semibold transition-colors border-transparent text-white dark:border-transparent capitalize"
                          : "dark:border-jacarta-600 dark:bg-jacarta-900 dark:hover:bg-accent group hover:bg-accent border-jacarta-100 font-display text-jacarta-500 flex h-9 items-center rounded-lg border bg-white px-4 text-sm font-semibold transition-colors hover:border-transparent hover:text-white dark:text-white dark:hover:border-transparent dark:hover:text-white capitalize"
                      }
                    >
                      <svg className={filterVal === id ? "icon mr-1 h-4 w-4 transition-colors fill-white" : "icon fill-jacarta-700 dark:fill-jacarta-100 mr-1 h-4 w-4 transition-colors group-hover:fill-white"}>
                        <use xlinkHref={`/icons.svg#icon-${svg}`}></use>
                      </svg>
                      <span>{text}</span>
                    </div>
                  </button>
                </li>
              );
            }
          })}
        </ul> */}
      {/* dropdown */}
      {/* <Recently_added_dropdown data={sortText} dropdownFor="recently_added" />
      </div> */}
      <div className="dark:bg-jacarta-700 dark:text-jacarta-300 dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white p-3 flex gap-4 justify-center items-center mb-6">
        <span className="bg-red rounded-2xl dark:text-white  px-2">!</span>
        <span> You have 1 or more ads proposals to check on your offer </span>
      </div>
      {/* <!-- Grid --> */}
      {data.length > 0 ? (
        <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
          {data?.map((item, index) => {
            return <OfferItem item={item} key={index} url={`/offer/${item.offerId}`} />;
          })}
        </div>
      ) : (
        <div className="w-full flex flex-col gap-4 justify-center items-center">
          <span>You have no offers yet...</span>
          <Link href="/offer/create" className="bg-accent shadow-accent-volume hover:bg-accent-dark w-36 rounded-full py-3 px-8 text-center font-semibold text-white transition-all">
            Create
          </Link>
        </div>
      )}
    </>
  );
};

export default OwnedOffers_categories_items;
