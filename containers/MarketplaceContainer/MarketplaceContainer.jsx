import { collections6, collections7 } from "../../data/collections";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import User_items from "../../components/user/User_items";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import { CopyToClipboard } from "react-copy-to-clipboard";
import Meta from "../../components/Meta";

import { useAddress, darkTheme, useBalance, Web3Button, useTokenBalance, useContract, useContractRead, useContractWrite, useStorageUpload, useTokenDecimals, CheckoutWithCard, CheckoutWithEth } from "@thirdweb-dev/react";

import { fetchAllTokenByOfferForAuser } from "../../providers/methods/fetchAllTokenByOfferForAuser";
import { fetchAllOffersByUserAddress } from "../../providers/methods/fetchAllOffersByUserAddress";
import { fetchAllTokenListedByUserAddress } from "../../providers/methods/fetchAllTokenListedByUserAddress";
import { useChainContext } from "../../contexts/hooks/useChainContext";
import { id } from "ethers/lib/utils";

const MarketplaceContainer = () => {
  const { currentChainObject } = useChainContext();

  useEffect(() => {
    if (userAddress && chainId) {
      const fetchAdsOffers = async () => {
    
        const ownedAdProposals = await fetchAllTokenByOfferForAuser(userAddress, chainId);
        console.log(ownedAdProposals);
        const listedToken = await fetchAllTokenListedByUserAddress(userAddress, chainId);
        const mappedListedToken = [];
        for (const element of listedToken) {
          if (element?.listingType === "Auction") {
            const combinedData = {
              tokenData: element?.token.mint.tokenData,
              startTime: element?.startTime,
              endTime: element?.endTime,
              ...element?.token,
            };
            mappedListedToken.push(combinedData);
          }
        }

        

        const mappedownedAdProposals = [];

        for (const element of ownedAdProposals) {
          for (const token of element.nftContract.tokens) {
            const combinedData = {
              adParameters: element.adParameters,
              id: `${element.id}-${token.tokenId}`,
              offerId: element.id,
              ...token,
              ...(token.mint.tokenData ? { tokenData: token.mint.tokenData } : {}),
            };
            mappedownedAdProposals.push(combinedData);
          }
        }
        console.log(mappedownedAdProposals);
        console.log(mappedOffers);
        setMappedownedAdProposals(mappedownedAdProposals);
        setListedAuctionToken(mappedListedToken);
      };
      if (address === userAddress) setIsOwner(true);
      fetchAdsOffers();
    }
  }, [userAddress, router, address, chainId]);

  return (
    <section className="relative pt-16 pb-24">
      <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
        <Image
          width={1920}
          height={789}
          src="/img/gradient_light.jpg"
          alt="gradient"
          className="h-full w-full"
        />
      </picture>
      <div className="px-6 xl:px-24">
        {/* Filters / Sorting */}
        <div className="flex flex-wrap justify-between">
          <div className="flex space-x-2 mb-2">
            <button className="js-collections-toggle-filters flex h-10 group flex-shrink-0 items-center justify-center space-x-1 rounded-lg border border-jacarta-100 bg-white py-1.5 px-4 font-display text-sm font-semibold text-jacarta-500 hover:bg-accent hover:border-accent dark:hover:bg-accent dark:border-jacarta-600 dark:bg-jacarta-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="h-4 w-4 fill-jacarta-700 dark:fill-white group-hover:fill-white"
              >
                <path fill="none" d="M0 0H24V24H0z"></path>
                <path d="M21 4v2h-1l-5 7.5V22H9v-8.5L4 6H3V4h18zM6.404 6L11 12.894V20h2v-7.106L17.596 6H6.404z"></path>
              </svg>
              <span className="mt-0.5 dark:text-white group-hover:text-white">
                Filters
              </span>
            </button>

            <button className="lex h-10 group flex-shrink-0 items-center justify-center space-x-1 rounded-lg border border-jacarta-100 bg-white py-1.5 px-4 font-medium text-2xs hover:bg-accent hover:border-accent dark:hover:bg-accent dark:border-jacarta-600 dark:bg-jacarta-700">
              <span className="mt-0.5 dark:text-white group-hover:text-white">
                Clear All
              </span>
            </button>
          </div>

          {/* View / Sorting */}
          {/* <Sorting /> */}
        </div>
        {/* end filters / sorting */}

        <div className="lg:flex mt-6">
          {/* Sidebar */}
          {/* <Sidebar /> */}
          {/* end sidebar */}
          {/* Content */}
          <div className="lg:w-4/5 js-collections-content">
            <div className="mb-8 pb-px">
              <h1 className="pt-3 mb-2 font-display text-2xl font-medium text-jacarta-700 dark:text-white">
                Explore Collections
              </h1>
              <p className="dark:text-jacarta-400 font-medium text-2xs">
                156,893 items
              </p>
            </div>

            <div className="tab-content">
              {/* Grid */}
              <div
                className="tab-pane fade show active"
                id="view-grid"
                role="tabpanel"
                aria-labelledby="view-grid-tab"
              >
                <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-3 lg:grid-cols-4 js-collections-grid">
                  {collections6.map((elm, i) => (
                    <article key={i}>
                      <div className="rounded-2.5xl border border-jacarta-100 bg-white p-[1.1875rem] transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700">
                        <Link href={`/collection/${elm.id}`}>
                          <Image
                            width={365}
                            height={365}
                            src={elm.image}
                            alt="item 1"
                            className="w-full rounded-[0.625rem]"
                            loading="lazy"
                          />
                        </Link>

                        <Link
                          href={`/collection/${elm.id}`}
                          className="mt-5 mb-2 flex items-center font-display text-base text-jacarta-700 hover:text-accent dark:text-white dark:hover:text-accent"
                        >
                          {elm.name}
                          <div
                            className="flex h-[1.125rem] w-[1.125rem] ml-1 mb-px items-center justify-center rounded-full border-2 border-white bg-green dark:border-jacarta-600"
                            data-tippy-content="Verified Collection"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              className="h-[.875rem] w-[.875rem] fill-white"
                            >
                              <path fill="none" d="M0 0h24v24H0z"></path>
                              <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                            </svg>
                          </div>
                        </Link>
                        <div className="font-medium text-2xs text-jacarta-700 dark:text-white mb-2">
                          {elm.price}
                        </div>
                        <div className="font-medium text-2xs text-jacarta-500 dark:text-jacarta-300">
                          Last Sale:{" "}
                          <span className="text-jacarta-700 dark:text-white">
                            {elm.lastSale}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* List */}
              <div
                className="tab-pane fade"
                id="view-list"
                role="tabpanel"
                aria-labelledby="view-list-tab"
              >
                <div className="scrollbar-custom overflow-x-auto">
                  <div
                    role="table"
                    className="w-full min-w-[736px] border border-jacarta-100 bg-white text-sm dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white rounded-2lg"
                  >
                    <div
                      className="flex rounded-t-2lg bg-jacarta-50 dark:bg-jacarta-600"
                      role="row"
                    >
                      <div
                        className="md:w-2/5 w-1/4 py-3 px-4"
                        role="columnheader"
                      >
                        <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
                          Collection
                        </span>
                      </div>
                      <div
                        className="md:w-[12%] w-[15%] py-3 px-4 text-right"
                        role="columnheader"
                      >
                        <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
                          Floor Price
                        </span>
                      </div>
                      <div
                        className="md:w-[12%] w-[15%] py-3 px-4 text-right"
                        role="columnheader"
                      >
                        <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
                          Volume
                        </span>
                      </div>
                      <div
                        className="md:w-[12%] w-[15%] py-3 px-4 text-right"
                        role="columnheader"
                      >
                        <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
                          Volume Change
                        </span>
                      </div>
                      <div
                        className="md:w-[12%] w-[15%] py-3 px-4 text-right"
                        role="columnheader"
                      >
                        <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
                          Items
                        </span>
                      </div>
                      <div
                        className="md:w-[12%] w-[15%] py-3 px-4 text-right"
                        role="columnheader"
                      >
                        <span className="w-full overflow-hidden text-ellipsis text-jacarta-700 dark:text-jacarta-100">
                          Owners
                        </span>
                      </div>
                    </div>

                    {collections7.map((elm, i) => (
                      <Link
                        href={`/user/${elm.id}`}
                        key={i}
                        className="flex transition-shadow hover:shadow-lg"
                        role="row"
                      >
                        <div
                          className="flex md:w-2/5 w-1/4 items-center border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
                          role="cell"
                        >
                          <span className="mr-3 lg:mr-5">{elm.id}</span>
                          <figure className="relative mr-2 w-8 shrink-0 self-start lg:mr-5 lg:w-12">
                            <Image
                              width={48}
                              height={48}
                              src={elm.avatar}
                              alt="avatar 1"
                              className="rounded-2lg"
                              loading="lazy"
                            />
                            {elm.varified && (
                              <div
                                className="absolute -right-2 -bottom-1 flex h-[1.125rem] w-[1.125rem] items-center justify-center rounded-full border-2 border-white bg-green dark:border-jacarta-600"
                                data-tippy-content="Verified Collection"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  className="h-[.875rem] w-[.875rem] fill-white"
                                >
                                  <path fill="none" d="M0 0h24v24H0z"></path>
                                  <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                                </svg>
                              </div>
                            )}
                          </figure>
                          <span className="font-display text-sm font-semibold text-jacarta-700 dark:text-white">
                            {elm.name}
                          </span>
                        </div>
                        <div
                          className="flex justify-end items-center md:w-[12%] w-[15%] whitespace-nowrap border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
                          role="cell"
                        >
                          <span className="-ml-1" data-tippy-content="ETH">
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              x="0"
                              y="0"
                              viewBox="0 0 1920 1920"
                              //   xml:space="preserve"
                              className="mr-1 h-4 w-4"
                            >
                              <path
                                fill="#8A92B2"
                                d="M959.8 80.7L420.1 976.3 959.8 731z"
                              ></path>
                              <path
                                fill="#62688F"
                                d="M959.8 731L420.1 976.3l539.7 319.1zm539.8 245.3L959.8 80.7V731z"
                              ></path>
                              <path
                                fill="#454A75"
                                d="M959.8 1295.4l539.8-319.1L959.8 731z"
                              ></path>
                              <path
                                fill="#8A92B2"
                                d="M420.1 1078.7l539.7 760.6v-441.7z"
                              ></path>
                              <path
                                fill="#62688F"
                                d="M959.8 1397.6v441.7l540.1-760.6z"
                              ></path>
                            </svg>
                          </span>
                          <span className="text-sm font-medium tracking-tight">
                            {elm.ethValue1}
                          </span>
                        </div>
                        <div
                          className="flex justify-end md:w-[12%] w-[15%] items-center border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
                          role="cell"
                        >
                          <span className="-ml-1" data-tippy-content="ETH">
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              x="0"
                              y="0"
                              viewBox="0 0 1920 1920"
                              //   xml:space="preserve"
                              className="mr-1 h-4 w-4"
                            >
                              <path
                                fill="#8A92B2"
                                d="M959.8 80.7L420.1 976.3 959.8 731z"
                              ></path>
                              <path
                                fill="#62688F"
                                d="M959.8 731L420.1 976.3l539.7 319.1zm539.8 245.3L959.8 80.7V731z"
                              ></path>
                              <path
                                fill="#454A75"
                                d="M959.8 1295.4l539.8-319.1L959.8 731z"
                              ></path>
                              <path
                                fill="#8A92B2"
                                d="M420.1 1078.7l539.7 760.6v-441.7z"
                              ></path>
                              <path
                                fill="#62688F"
                                d="M959.8 1397.6v441.7l540.1-760.6z"
                              ></path>
                            </svg>
                          </span>
                          <span className="text-sm font-medium tracking-tight">
                            {elm.ethValue2}
                          </span>
                        </div>
                        <div
                          className="flex justify-end md:w-[12%] w-[15%] items-center border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
                          role="cell"
                        >
                          <span
                            className={`text-${
                              elm.percentageChange > 0 ? "green" : "red"
                            }`}
                          >
                            {elm.percentageChange > 0
                              ? `+${elm.percentageChange}%`
                              : `-${elm.percentageChange}%`}
                          </span>
                        </div>
                        <div
                          className="flex justify-end md:w-[12%] w-[15%] items-center border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
                          role="cell"
                        >
                          {elm.value1}
                        </div>
                        <div
                          className="flex justify-end md:w-[12%] w-[15%] items-center border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600"
                          role="cell"
                        >
                          {elm.value2}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
          {/* end content */}
        </div>
      </div>
    </section>
  );
}
export default MarketplaceContainer;