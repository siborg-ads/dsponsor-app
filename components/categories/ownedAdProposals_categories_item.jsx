import React, { useEffect, useState } from "react";
import { ownedAdProposals_categories_filter } from "../../data/categories_data";
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
import { toast } from "react-toastify";
import { Web3Button } from "@thirdweb-dev/react";

const OwnedAdProposals_categories_items = ({ data }) => {
  
  const [itemdata, setItemdata] = useState(trendingCategoryData);
  const dispatch = useDispatch();
  const { trendingCategorySorText } = useSelector((state) => state.counter);
  const [filterVal, setFilterVal] = useState(0);
   const [selectedItems, setSelectedItems] = useState([]);
   const [isSelectedItem, setIsSelectedItem] = useState({});
   const [validate, setValidate] = useState({});

  const handleFilter = (category) => {
    if (category !== "all") {
      setItemdata(trendingCategoryData.filter((item) => item.category === category));
    } else {
      setItemdata(trendingCategoryData);
    }
  };
   const handleSelection = (item) => {
     setIsSelectedItem((prevState) => ({
       ...prevState,
       [item.id]: !prevState[item.id],
     }));

     setSelectedItems((previousItems) => {
       const isAlreadySelected = previousItems.some((i) => i.id === item.id);

       if (isAlreadySelected) {
         return previousItems.filter((i) => i.id !== item.id);
       } else {
         const newItems = item;
         return [...previousItems, newItems];
       }
     });
   };
console.log(selectedItems);

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
       <Image src="/images/loading-bullet.svg" alt="icon" width={60} height={60} />
     </div>
   );
 }
  return (
    <>
      {/* <!-- Filter --> */}
      <div className="mb-8 flex flex-wrap items-center justify-between">
        <ul className="flex flex-wrap items-center">
          {ownedAdProposals_categories_filter.map(({ id, svg, text }) => {
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
        </ul>
        {/* dropdown */}
        {/* <Recently_added_dropdown data={sortText} dropdownFor="recently_added" /> */}
      </div>

      {/* <!-- Grid --> */}
      {data.length > 0 ? (
        <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
          {data?.map((item, index) => {
            return (
              <div onClick={() => handleSelection(item)} key={index} className={`  ${isSelectedItem[item.id] ? "border-4 border-jacarta-100 rounded-2xl" : ""}`}>
                <OfferItem
                  item={item}
                  isToken={true}
                  url={!item.tokenData ? `/offer/${item.nftContract.adOffers[0].id}/${item.tokenId}` : `/offer/${item.nftContract.adOffers[0].id}/${item.tokenId}?tokenData=${item.tokenData}`}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full flex flex-col gap-4 justify-center items-center">
          <span>You have no ad space yet...</span>
          <Link href="/#hot-offers" className="bg-accent shadow-accent-volume hover:bg-accent-dark w-36 rounded-full py-3 px-8 text-center font-semibold text-white transition-all">
            Buy
          </Link>
        </div>
      )}
      <div className={`fixed dark:border-jacarta-500 border  bottom-0 blury-background left-0 right-0 px-4 py-3 animated-modalSelectedItemUp ${selectedItems.length === 0 && "animated-modalSelectedItemDown"}`}>
        <div className="dropdown-item mb-4 font-display   block w-full rounded-xl  text-left text-sm transition-colors dark:text-white">
          <span className="flex items-center justify-center gap-6">
            <span className="mr-4">
              I confirm that I have checked all the ads selected <span className="text-accent text-md ml-1">{Object.values(isSelectedItem).filter((value) => value === true).length}</span>{" "}
            </span>
            <input
              type="checkbox"
              name="check"
              className="checked:bg-accent checked:focus:bg-accent checked:hover:bg-accent after:bg-jacarta-400 bg-jacarta-100 relative h-4 w-7 cursor-pointer appearance-none rounded-lg border-none shadow-none after:absolute after:top-0.5 after:left-0.5 after:h-3 after:w-3 after:rounded-full after:transition-all checked:bg-none checked:after:left-3.5 checked:after:bg-white focus:ring-transparent focus:ring-offset-0"
             
              checked={validate || false}
            />
          </span>
        </div>

        <div className="flex justify-center  gap-4 flex-wrap">
          <Web3Button
            contractAddress="0xE442802706F3603d58F34418Eac50C78C7B4E8b3"
           
            className={` !rounded-full !min-w-[100px] !py-3 !px-8 !text-center !font-semibold !text-white !transition-all ${!validate ? "btn-disabled" : "!bg-green !cursor-pointer"} `}
          >
            Validate
          </Web3Button>

          <Web3Button
            contractAddress="0xE442802706F3603d58F34418Eac50C78C7B4E8b3"
            
            className={` !rounded-full !min-w-[100px] !py-3 !px-8 !text-center !font-semibold !text-white !transition-all ${!validate ? "btn-disabled" : "!bg-red !cursor-pointer"} `}
          >
            Reject
          </Web3Button>
        </div>
      </div>
    </>
  );
};

export default OwnedAdProposals_categories_items;
