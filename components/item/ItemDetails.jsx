import { items_data } from "../../data/items_data";
import Image from "next/image";
import Link from "next/link";
import Timer from "./Timer";
import { useEffect, useState } from "react";
import { useAddress } from "@thirdweb-dev/react";
import {
  fetchListingPriceAndSymbol,
  fetchFirstValidListing,
  fetchListingAdOffer,
} from "../../app/marketplace/services";
import BidsModal from "../marketplace-modals/bidsModal";
import BuyModal from "../marketplace-modals/buyModal";
import { defaultChainId } from "../../app/marketplace/marketplace.config";
import { redirect } from "next/dist/server/api-utils";
import DirectListingCard from "./directListingCard";
import AuctionListingCard from "./auctionListingCard";

const chainId = defaultChainId;
export default function ItemDetails({ assetContract, tokenId }) {
  const [updatedListing, setUpdatedListing] = useState(null);
  const [showBidsModal, setShowBidsModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const now = new Date().getTime() / 1000;

  const fetchListingInfo = async () => {
    try {
      // we first fetch the first valid listing of the token
      const firstValidListingOfToken = await fetchFirstValidListing(
        assetContract,
        tokenId
      );

      console.log("firstValidListingOfToken", firstValidListingOfToken);
      //then we fetch the price and symbol of the listing
      const listingPriceSymbol = await fetchListingPriceAndSymbol(
        firstValidListingOfToken,
        chainId
      );
      console.log("listingPriceSymbol", listingPriceSymbol);

      if (firstValidListingOfToken.error) {
        redirect("/404Error");
      } else {
        // we then fetch the listing ad offer
        const updatedListing = await fetchListingAdOffer(listingPriceSymbol);
        console.log("updatedListing", updatedListing);
        setUpdatedListing(updatedListing);
      }
    } catch (error) {
      console.error("Error fetching listing information:", error);
    }
  };

  useEffect(() => {
    fetchListingInfo();
  }, []);

  // TODO : refactor some of the code to seperate components in order to make the file more redable and understandable
  return (
    <>
      <section className="relative pb-10 pt-20 md:pt-32 h-1527 bg-sigray">
        {updatedListing?.listingType == "Auction" ? (
          <BidsModal
            showBidsModal={showBidsModal}
            setShowBidsModal={setShowBidsModal}
            listing={updatedListing}
          />
        ) : (
          <BuyModal
            showBuyModal={showBuyModal}
            setShowBuyModal={setShowBuyModal}
            listing={updatedListing}
          />
        )}
        <div className="container">
          {/* Item */}
          <div className="md:flex md:flex-wrap">
            {/* Image */}
            <figure className="mb-8 md:w-2/5 md:flex-shrink-0 md:flex-grow-0 md:basis-auto lg:w-1/2">
              <Image
                width={540}
                height={670}
                // src={"/images/products/item_single_large.jpg"}
                src={updatedListing?.offer.image}
                alt="item"
                className="cursor-pointer rounded-2.5xl w-[100%]"
                data-bs-toggle="modal"
                data-bs-target="#imageModal"
              />
            </figure>

            {/* Details */}

            <div className="md:w-3/5 md:basis-auto md:pl-8 lg:w-1/2 lg:pl-[3.75rem]">
              {/* Collection / Likes / Actions */}
              <div className="mb-3 flex">
                {/* Collection */}
                <div className="flex items-center">
                  <Link
                    href={`/collections`}
                    className="mr-2 text-sm font-bold text-sipurple"
                  >
                    {"SiBorg collections"}
                  </Link>
                  <span
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green dark:border-jacarta-600"
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
                  </span>
                </div>

                {/* Likes / Actions */}
                <div className="ml-auto flex space-x-2">
                  <div className="flex items-center space-x-1 rounded-xl border border-sigray-border bg-sigray-light py-2 px-4 dark:border-jacarta-600 dark:bg-jacarta-700">
                    <span
                      className="js-likes relative cursor-pointer before:absolute before:h-4 before:w-4 before:bg-[url('/icons.svg#icon-heart-fill')] before:bg-cover before:bg-center before:bg-no-repeat before:opacity-0"
                      data-tippy-content="Favorite"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="h-4 w-4 fill-jacarta-500 hover:fill-red dark:fill-jacarta-200 dark:hover:fill-red"
                      >
                        <path fill="none" d="M0 0H24V24H0z"></path>
                        <path d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z"></path>
                      </svg>
                    </span>
                    <span className="text-sm  text-white dark:text-jacarta-200">
                      188
                    </span>
                  </div>
                </div>
              </div>

              <h1 className="mb-4 font-display text-4xl font-semibold text-light-base dark:text-white">
                {updatedListing?.offer.name}
              </h1>

              <p className="mb-10 text-light-base">
                {updatedListing?.offer.description}
              </p>

              {/* Creator / Owner */}
              <div className="mb-8 flex flex-wrap">
                <div className="mr-8 mb-4 flex">
                  <figure className="mr-4 shrink-0">
                    <Link href={`/user/1`} className="relative block">
                      <Image
                        width={48}
                        height={48}
                        src="/images/avatars/avatar_7.jpg"
                        alt="avatar 7"
                        className="rounded-2lg"
                        loading="lazy"
                      />
                      <div
                        className="absolute -right-3 top-[60%] flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green dark:border-jacarta-600"
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
                  </figure>
                  {/* creator*/}
                  <div className="flex flex-col justify-center">
                    <span className="block text-sm text-jacarta-300 dark:text-white">
                      Creator{" "}
                      <strong>
                        {Number(updatedListing?.token.nftContract.royaltyBps) /
                          100}
                        % royalties
                      </strong>
                    </span>
                    <span className="block text-sm text-jacarta-300 dark:text-white">
                      <strong>+ 4% Marketplace fee</strong>
                    </span>
                    <Link href={`/user/2`} className="block text-sipurple">
                      <span className="text-sm font-bold">@siBorg</span>
                    </Link>
                  </div>
                </div>

                {/* owned by*/}
                <div className="mb-4 flex">
                  <figure className="mr-4 shrink-0">
                    <Link href={`/user/4`} className="relative block">
                      <Image
                        width={48}
                        height={48}
                        src="/images/avatars/avatar_1.jpg"
                        alt="avatar 1"
                        className="rounded-2lg"
                        loading="lazy"
                      />
                      <div
                        className="absolute -right-3 top-[60%] flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green dark:border-jacarta-600"
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
                  </figure>
                  <div className="flex flex-col justify-center">
                    <span className="block text-sm text-jacarta-300 dark:text-white">
                      Owned by
                    </span>
                    <Link href={`/user/6`} className="block text-sipurple">
                      <span className="text-sm font-bold">@siBorg_user</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bid */}

              {updatedListing?.startTime > now ? (
                // TODO : update this front
                <p className="mb-10 text-light-base">
                  This item listing will start soon.
                </p>
              ) : (
                <>
                  {updatedListing?.listingType == "Auction" && (
                    <AuctionListingCard
                      updatedListing={updatedListing}
                      setShowBidsModal={setShowBidsModal}
                    />
                  )}

                  {updatedListing?.listingType == "Direct" && (
                    <DirectListingCard
                      updatedListing={updatedListing}
                      setShowBuyModal={setShowBuyModal}
                    />
                  )}
                </>
              )}

              {/* end bid */}

              <div className="mt-4 text-center">
                <div className="block text-base text-jacarta-300 text-white font-light">
                  Ownership Period:
                </div>
                <div className="block text-sm text-jacarta-300 font-medium">
                  {updatedListing?.offer.valid_from} -{" "}
                  {updatedListing?.offer.valid_to}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
