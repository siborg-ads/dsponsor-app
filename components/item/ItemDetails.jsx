'use client';
import { items_data } from "../../data/items_data";
import Image from "next/image";
import Link from "next/link";
import Timer from "./Timer";
import { useEffect, useState } from "react";
import OwnerView from "./ownerView";
import { useAddress } from "@thirdweb-dev/react";
import {
  fetchListingPriceAndSymbol,
  fetchFirstValidListing,
  fetchListingAdOffer,
} from "../../containers/MarketplaceContainer/services";
import BidsModal from "../marketplace-modals/bidsModal";
import BuyModal from "../marketplace-modals/buyModal";
import {
  defaultChainId,
  getNftContract,
} from "../../containers/MarketplaceContainer/marketplace.config";
import { redirect } from "next/dist/server/api-utils";

const chainId = defaultChainId;
export default function ItemDetails({ assetContract, tokenId }) {
  /////////////////////////////////////////////////
  const [listingInformation, setListingInformation] = useState(null);
  const [showBidsModal, setShowBidsModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [listingNotValid, setListingNotValid] = useState(false);
  const now = new Date().getTime() / 1000;
  const address = useAddress();
  ///////////////////////////////////////////////////////
  /////////// contracts ////////////////
  ///////////////////////////////////////////////////////

  const endTime = listingInformation?.endTime;
  const endDate = new Date(endTime * 1000);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "UTC",
  };
  const formattedEndDate = endDate.toLocaleDateString("en-US", options);

  const fetchListingInfo = async () => {
    try {
      // we first fetch the first valid listing of the token
      const firstValidListingOfToken = await fetchFirstValidListing(
        assetContract,
        tokenId
      );

      //then we fetch the price and symbol of the listing
      const listingPriceSymbol = await fetchListingPriceAndSymbol(
        firstValidListingOfToken,
        chainId
      );

      if (firstValidListingOfToken.error) {
        redirect("/404Error");
      } else {
        // we then fetch the listing ad offer
        const updatedListing = await fetchListingAdOffer(listingPriceSymbol);
        console.log("updatedListing", updatedListing);
        setListingInformation(updatedListing);
      }
    } catch (error) {
      console.error("Error fetching listing information:", error);
    }
  };

  useEffect(() => {
    fetchListingInfo();
  }, []);

  return (
    <>
      <section>
        {listingInformation?.listingType == "Auction" ? (
          <BidsModal
            showBidsModal={showBidsModal}
            setShowBidsModal={setShowBidsModal}
            listing={listingInformation}
          />
        ) : (
          <BuyModal
            showBuyModal={showBuyModal}
            setShowBuyModal={setShowBuyModal}
            listing={listingInformation}
          />
        )}
        <div className="container flex flex-row">
          {/* Item */}
          <div className="md:flex md:flex-wrap flex-col">
              {listingInformation?.startTime > now ? (
                <p className="mb-10 text-light-base">
                  This item listing will start soon.
                </p>
              ) : (
                <>
                  {listingInformation?.listingType == "Auction" && (
                    <div className="rounded-2lg border border-sigray-border bg-sigray-light p-8 dark:border-jacarta-600 dark:bg-jacarta-700">
                      <div className="mb-8 sm:flex sm:flex-wrap">
                        {/* Highest bid */}
                        <div className="sm:w-1/2 sm:pr-4 lg:pr-8">
                          {listingInformation?.bids.length > 0 ? (
                            <div className="block overflow-hidden text-ellipsis whitespace-nowrap">
                              <span className="text-sm text-jacarta-300 dark:text-jacarta-300">
                                Highest bid by{" "}
                              </span>
                              <Link
                                href={`/user/9`}
                                className="text-sm font-bold text-sipurple"
                              >
                                listingInformation?.bids[0].bidder
                              </Link>
                            </div>
                          ) : (
                            <div className="block overflow-hidden text-ellipsis whitespace-nowrap">
                              <span className="text-sm text-jacarta-300 dark:text-jacarta-300">
                                Reserve price per token
                              </span>
                            </div>
                          )}
                          <div className="mt-3 flex">
                            <figure className="mr-4 shrink-0">
                              <Link href={`/user/8`} className="relative block">
                                <Image
                                  width={48}
                                  height={48}
                                  src="/images/avatars/avatar_4.jpg"
                                  alt="avatar"
                                  className="rounded-2lg"
                                  loading="lazy"
                                />
                              </Link>
                            </figure>
                            <div>
                              <div className="flex items-center whitespace-nowrap">
                                <span className="text-m font-medium leading-tight tracking-tight text-green">
                                  {listingInformation.price}{" "}
                                  {listingInformation.symbol}
                                </span>
                              </div>
                              {/** TODO : to change this, format it reall*/}
                              <span className="text-sm text-jacarta-300 dark:text-jacarta-300">
                                ~10,864.10€
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Countdown */}
                        <div className="mt-4 dark:border-jacarta-600 sm:mt-0 sm:w-1/2 sm:border-l sm:border-jacarta-100 sm:pl-4 lg:pl-8">
                          <span className="js-countdown-ends-label text-sm text-jacarta-300 dark:text-jacarta-300">
                            Auction ends in
                          </span>
                          <Timer endTime={listingInformation?.endTime} />
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex space-x-4">
                        <a
                          onClick={() => {
                            setShowBidsModal(true);
                          }}
                          className="inline-block w-full rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                        >
                          Place Bid
                        </a>
                        <OwnerView listing={listingInformation} />
                      </div>
                    </div>
                  )}

                  {/* TODO : to change design of this card */}
                  {listingInformation?.listingType == "Direct" && (
                    <div className="rounded-2lg border border-sigray-border bg-sigray-light p-8 dark:border-jacarta-600 dark:bg-jacarta-700">
                      <div className="flex items-center justify-center sm:flex-wrap mb-8">
                        <div className="sm:w-1/2 sm:pr-4 lg:pr-8 flex items-center">
                          <figure className="mr-4 shrink-0 ">
                            <Link href={`/user/8`} className="relative block">
                              <Image
                                width={48}
                                height={48}
                                src="/images/avatars/avatar_4.jpg"
                                alt="avatar"
                                className="rounded-2lg"
                                loading="lazy"
                              />
                            </Link>
                          </figure>
                          <div>
                            <div className="flex-grow flex items-center whitespace-nowrap">
                              <span className="text-m font-medium leading-tight tracking-tight text-green">
                                {listingInformation.price}{" "}
                                {listingInformation.symbol}
                              </span>
                            </div>
                            <span className="text-sm text-jacarta-300 dark:text-jacarta-300">
                              ~10,864.10€
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 dark:border-jacarta-600 sm:mt-0 sm:w-1/2 sm:border-l sm:border-jacarta-100 sm:pl-4 lg:pl-8">
                          <span className="js-countdown-ends-label text-sm text-jacarta-300 dark:text-jacarta-300">
                            Sales ends on{" "}
                          </span>
                          <span className="text-m font-medium leading-tight tracking-tight text-jacarta-100">
                            {formattedEndDate}
                          </span>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex justify-center space-x-4">
                        <a
                          onClick={() => {
                            setShowBuyModal(true);
                          }}
                          className="inline-block w-full rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                        >
                          Buy Now For {listingInformation?.price}{" "}
                          {listingInformation?.symbol}
                        </a>
                        <OwnerView listing={listingInformation} />
                      </div>
                    </div>
                  )}
                </>
              )}

              <div className="mt-4 text-center">
                <div className="block text-base text-jacarta-300 text-white font-light">
                  Ownership Period:
                </div>
                <div className="block text-sm text-jacarta-300 font-medium">
                  {listingInformation?.offer.valid_from} -{" "}
                  {listingInformation?.offer.valid_to}
                </div>
              </div>
            </div>
          </div>
      </section>
    </>
  );
}
