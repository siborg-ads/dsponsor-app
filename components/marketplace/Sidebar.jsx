"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import tippy from "tippy.js";

import config from "../../providers/utils/config";





const status = [
  { id: 1, label: "Buy Now", listingType: "Direct" },
  { id: 2, label: "On Auction", listingType: "Auction" }
];


export default function Sidebar({ setFilterTypes }) {
 const [isChainsOpen, setIsChainsOpen] = useState(false);
 const [isStatusOpen, setIsStatusOpen] = useState(false);

 const toggleChains = () => setIsChainsOpen(!isChainsOpen);
 const toggleStatus = () => setIsStatusOpen(!isStatusOpen);
  useEffect(() => {
    tippy("[data-tippy-content]");
  }, []);

  const handleFilterChange = (type, checked, category) => {
  
    setFilterTypes((prev) => {
      if (checked) {
        return [...new Set([...prev, { type, category }])];
      } else {
        return prev.filter((t) => t.type !== type || t.category !== category);
      }
    });
  };

  return (
    <div className="lg:w-1/5 min-w-[150px] mb-10 js-collections-sidebar lg:h-[calc(100vh_-_232px)] lg:overflow-auto lg:sticky lg:top-32 lg:mr-10 pr-4 scrollbar-custom divide-y divide-jacarta-100 dark:divide-jacarta-600">
      {/* Chains filter */}
      <div className="mt-4 pt-4">
        <h2 id="filters-chains-heading">
          <button
            className="relative flex w-full items-center justify-between py-3 text-left font-display text-xl text-jacarta-900 dark:text-white"
            type="button"
            onClick={toggleChains}
            aria-expanded={isChainsOpen}
            aria-controls="filters-chains"
          >
            <span>Chains</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className={`accordion-arrow h-5 w-5 shrink-0 fill-jacarta-700 transition-transform dark:fill-white ${isChainsOpen ? "rotate-180" : "rotate-0"}`}
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path>
            </svg>
          </button>
        </h2>
        <div
          id="filters-chains"
          className={`mt-3 ${isChainsOpen ? "collapse-enter collapse-enter-active" : "collapse-exit collapse-exit-active"}`}
          aria-labelledby="filters-chains-heading"
        >
          <ul className="space-y-6 mb-8">
            {Object.entries(config).map((elm, i) => (
              <li key={i}>
                <label className="flex items-center cursor-pointer w-full">
                  <input
                    type="checkbox"
                    className="h-5 w-5 mr-2 rounded border-jacarta-200 text-primaryPurple checked:bg-primaryPurple focus:ring-primaryPurple/20 focus:ring-offset-0 dark:border-jacarta-500 dark:bg-jacarta-600"
                    onChange={(e) =>
                      handleFilterChange(elm[1].chainName, e.target.checked, "chain")
                    }
                  />
                  <div className="backdrop-blur-sm mr-1 w-7 h-7 rounded-[0.625rem] flex justify-center items-center">
                    <Image src={elm[1].logoURL} width={15} height={15} alt="logo" loading="lazy" />
                  </div>
                  <span className="font-display text-sm font-semibold text-jacarta-900 dark:text-white">
                    {elm[1].chainName}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Status filter */}
      <div className="mt-4 pt-4">
        <h2 id="filters-status-heading">
          <button
            className="relative flex w-full items-center justify-between py-3 text-left font-display text-xl text-jacarta-900 dark:text-white"
            type="button"
            onClick={toggleStatus}
            aria-expanded={isStatusOpen}
            aria-controls="filters-status"
          >
            <span>Status</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className={`accordion-arrow h-5 w-5 shrink-0 fill-jacarta-700 transition-transform dark:fill-white ${isStatusOpen ? "rotate-180" : "rotate-0"}`}
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path>
            </svg>
          </button>
        </h2>
        <div
          id="filters-status"
          className={`mt-3 ${isStatusOpen ? "collapse-enter collapse-enter-active" : "collapse-exit collapse-exit-active"}`}
          aria-labelledby="filters-status-heading"
        >
          <ul className="space-y-6 mb-8">
            {status.map((elm, i) => (
              <li key={i}>
                <label className="flex items-center cursor-pointer w-full">
                  <input
                    type="checkbox"
                    id="terms"
                    className="h-5 w-5 mr-2 rounded border-jacarta-200 text-primaryPurple checked:bg-primaryPurple focus:ring-primaryPurple/20 focus:ring-offset-0 dark:border-jacarta-500 dark:bg-jacarta-600"
                    onChange={(e) =>
                      handleFilterChange(elm.listingType, e.target.checked, "status")
                    }
                  />
                  <span className="dark:text-white">{elm.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Price filter */}
      {/* <div className="mt-4 pt-4">
        <h2 id="filters-price-heading">
          <button
            className="accordion-button relative flex w-full items-center justify-between py-3 text-left font-display text-xl text-jacarta-900 dark:text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#filters-price"
            aria-expanded="true"
            aria-controls="filters-price"
          >
            <span>Price</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="accordion-arrow h-5 w-5 shrink-0 fill-jacarta-700 transition-transform dark:fill-white">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path>
            </svg>
          </button>
        </h2>
        <div id="filters-price" className="mt-3 mb-8 space-y-4 collapse show visible" aria-labelledby="filters-price-heading">
          <div className="dropdown relative cursor-pointer">
            <div
              className="dropdown-toggle flex items-center justify-between rounded-lg border border-jacarta-100 bg-white w-full h-12 py-3 px-4 dark:border-jacarta-600 dark:bg-secondaryBlack dark:text-white"
              role="button"
              id="filtersPrice"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span>USD</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="h-5 w-5 fill-jacarta-500 dark:fill-white">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path>
              </svg>
            </div>

            <div className="dropdown-menu z-10 hidden w-full whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800" aria-labelledby="filtersPrice">
              {currencies.map((elm, i) => (
                <button
                  key={i}
                  onClick={() => setCurrency(elm)}
                  className="dropdown-item flex w-full items-center justify-between rounded-xl px-5 py-2 text-left font-display text-sm text-jacarta-900 transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
                >
                  {elm}
                  {currency == elm && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="h-4 w-4 fill-primaryPurple">
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex space-x-4">
            <input
              className="w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-primaryPurple/10 focus:ring-primaryPurple dark:border-jacarta-600 dark:bg-secondaryBlack dark:text-white dark:placeholder:text-jacarta-100"
              type="text"
              placeholder="Min"
            />
            <input
              className="w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-primaryPurple/10 focus:ring-primaryPurple dark:border-jacarta-600 dark:bg-secondaryBlack dark:text-white dark:placeholder:text-jacarta-100"
              type="text"
              placeholder="Max"
            />
          </div>

          <button type="submit" className="rounded-full bg-primaryPurple-lighter w-full py-3 px-8 text-center font-semibold text-white transition-all hover:bg-primaryPurple-dark">
            Apply
          </button>
        </div>
      </div> */}

      {/* Categories filter */}
      {/* <div className="mt-4 pt-4">
        <h2 id="filters-categories-heading">
          <button
            className="accordion-button relative flex w-full items-center justify-between py-3 text-left font-display text-xl text-jacarta-900 dark:text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#filters-categories"
            aria-expanded="true"
            aria-controls="filters-categories"
          >
            <span>Categories</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="accordion-arrow h-5 w-5 shrink-0 fill-jacarta-700 transition-transform dark:fill-white">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path>
            </svg>
          </button>
        </h2>
        <div id="filters-categories" className="mt-3 collapse show visible" aria-labelledby="filters-categories-heading">
          <ul className="flex flex-wrap items-center">
            {categories.map((elm, i) => (
              <li key={i} onClick={() => setCategory(elm)} className="my-1 mr-2.5">
                <button
                  className={
                    category == elm
                      ? "group flex h-9 items-center rounded-lg border border-primaryPurple bg-primaryPurple px-4 font-display text-sm font-semibold text-white transition-colors hover:border-transparent hover:bg-primaryPurple hover:text-white dark:border-jacarta-600 dark:bg-primaryBlack dark:text-white dark:hover:border-transparent dark:hover:bg-primaryPurple dark:hover:text-white"
                      : "group flex h-9 items-center rounded-lg border border-jacarta-100 bg-white px-4 font-display text-sm font-semibold text-jacarta-100 transition-colors hover:border-transparent hover:bg-primaryPurple hover:text-white dark:border-jacarta-600 dark:bg-primaryBlack dark:text-white dark:hover:border-transparent dark:hover:bg-primaryPurple dark:hover:text-white"
                  }
                >
                  <span>{elm}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div> */}
    </div>
  );
}
