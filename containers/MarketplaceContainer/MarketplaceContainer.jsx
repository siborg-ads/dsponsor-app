import { collections6, collections7 } from "../../data/collections";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "../../components/marketplace/Sidebar";

import User_items from "../../components/user/User_items";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import { CopyToClipboard } from "react-copy-to-clipboard";
import Meta from "../../components/Meta";
import OfferItem from "../../components/cards/offerItem";
import {
  useAddress,
  darkTheme,
  useBalance,
  Web3Button,
  useTokenBalance,
  useContract,
  useContractRead,
  useContractWrite,
  useStorageUpload,
  useTokenDecimals,
  CheckoutWithCard,
  CheckoutWithEth
} from "@thirdweb-dev/react";

import { fetchAllListedToken } from "../../providers/methods/fetchAllListedToken";
import { useChainContext } from "../../contexts/hooks/useChainContext";
import { id } from "ethers/lib/utils";
import config from "../../providers/utils/config";
import ItemCardSkeleton from "../../components/skeleton/ItemCardSkeleton";

const MarketplaceContainer = () => {
  const router = useRouter();

  const address = useAddress();

  const [listedAuctionToken, setListedAuctionToken] = useState(null);
  const [copied, setCopied] = useState(false);

  const [isOwner, setIsOwner] = useState(false);
  const [filterTypes, setFilterTypes] = useState([]);

  const { currentChainObject } = useChainContext();
  const chainId = currentChainObject?.chainId;

  useEffect(() => {
    if (chainId) {
      const fetchAdsOffers = async () => {
        const listingArray = [];

        for (const [chainId] of Object.entries(config)) {
          const listings = await fetchAllListedToken(chainId);
          listingArray.push(...listings);
        }

        setListedAuctionToken(listingArray);
      };

      fetchAdsOffers();
    }
  }, [router, address, chainId]);

  const filteredTokens = useMemo(() => {
    if (filterTypes.length === 0) return listedAuctionToken;

    const filterCategories = {
      status: filterTypes.filter((f) => f.category === "status").map((f) => f.type),
      chain: filterTypes.filter((f) => f.category === "chain").map((f) => f.type)
    };

    return listedAuctionToken.filter((item) => {
      const statusMatch =
        filterCategories.status.length === 0 ||
        filterCategories.status.includes(item.marketplaceListings[0]?.listingType);
      const chainMatch =
        filterCategories.chain.length === 0 ||
        filterCategories.chain.includes(item.chainConfig.chainName);
      return statusMatch && chainMatch;
    });
  }, [listedAuctionToken, filterTypes]);

  const metadata = {
    title: "Marketplace || DSponsor | smarter monetization for your content",
    keyword:
      "DSponsor, marketplace, token, creator, sponsor, monetize, content, creator, sponsor, monetize, content",
    desc: "DSponsor is a platform that connects content creators with sponsors. Our platform helps creators monetize their content and helps sponsors find creators to promote their products."
  };

  return (
    <>
      <Meta {...metadata} />
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
        <div className="px-6 py-16 xl:px-24">
          {/* Filters / Sorting */}
          {/* <div className="flex flex-wrap justify-between">
          <div className="flex space-x-2 mb-2">
            <button className="js-collections-toggle-filters flex h-10 group flex-shrink-0 items-center justify-center space-x-1 rounded-lg border border-jacarta-100 bg-white py-1.5 px-4 font-display text-sm font-semibold text-jacarta-500 hover:bg-accent hover:border-accent dark:hover:bg-accent dark:border-jacarta-600 dark:bg-jacarta-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="h-4 w-4 fill-jacarta-700 dark:fill-white group-hover:fill-white">
                <path fill="none" d="M0 0H24V24H0z"></path>
                <path d="M21 4v2h-1l-5 7.5V22H9v-8.5L4 6H3V4h18zM6.404 6L11 12.894V20h2v-7.106L17.596 6H6.404z"></path>
              </svg>
              <span className="mt-0.5 dark:text-white group-hover:text-white">Filters</span>
            </button>

            <button className="lex h-10 group flex-shrink-0 items-center justify-center space-x-1 rounded-lg border border-jacarta-100 bg-white py-1.5 px-4 font-medium text-2xs hover:bg-accent hover:border-accent dark:hover:bg-accent dark:border-jacarta-600 dark:bg-jacarta-700">
              <span className="mt-0.5 dark:text-white group-hover:text-white">Clear All</span>
            </button>
          </div>

          {/* View / Sorting */}
          {/* <Sorting /> */}
          {/*</div> */}
          {/* end filters / sorting */}

          <div className="lg:flex mt-6 ">
            {/* Sidebar */}
            <Sidebar setFilterTypes={setFilterTypes} />
            {/* end sidebar */}
            {/* Content */}
            <div className="lg:w-4/5 js-collections-content">
              <div className="mb-8 pb-px">
                <h1 className="pt-3 mb-2 font-display text-2xl font-medium text-jacarta-700 dark:text-white">
                  Explore Marketplace
                </h1>
                <p className="dark:text-jacarta-400 font-medium text-2xs">
                  {listedAuctionToken?.length} items
                </p>
              </div>
              <>
                {/* <!-- Grid --> */}
                {listedAuctionToken?.length > 0 ? (
                  <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
                    {filteredTokens?.map((item, index) => {
                      return (
                        <OfferItem
                          item={item}
                          key={index}
                          url={
                            !item.mint?.tokenData
                              ? `/${item?.chainConfig?.chainId}/offer/${item?.offerId}/${item?.tokenId}`
                              : `/${item?.chainConfig?.chainId}/offer/${item?.nftContract?.adOffers[0]?.id}/${item?.tokenId}?tokenData=${item?.mint?.tokenData}`
                          }
                          isOwner={isOwner}
                          isToken={true}
                          isListing={item?.marketplaceListings[0]?.listingType}
                          isAuction={
                            item?.marketplaceListings[0]?.listingType === "Auction" ? true : false
                          }
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
                    {[...Array(15)].map((_, index) => (
                      <ItemCardSkeleton key={index} widthSize={225} />
                    ))}
                  </div>
                )}
              </>
            </div>{" "}
            {/* end content */}
          </div>
        </div>
      </section>
    </>
  );
};
export default MarketplaceContainer;
