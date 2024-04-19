"use client";

import React, { useEffect, useState } from "react";
import { readContract } from "thirdweb";
import Timer from "../../../../components/item/Timer";
import Image from "next/image";
import Link from "next/link";
import {
  getContract,
  useChainId,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { fetchOffer } from "../../marketplace-items-fetch";
import { client } from "../../../../data/services/client";
import {
  fetchLatestListingIdOfItem,
  getMarketplaceItemsSymbolsAndPrice,
  getMarketplaceSingleListing,
  getRoyaltyInfo,
  parseListingValuesToObj,
} from "../../services/marketplace-item-services";
import { dSponsorMpContract } from "../../../../lib/config/listing.config";
import { fetchListingDetails } from "../../../../lib/services/listingsService";
import { marketplaceConfig } from "../../marketplace.config";
import {
  getERC20SymbolsAndDecimals,
  getWinningBid,
} from "../../services/services";
import marketplaceContractAbi from "../../marketplace-contact-abi.json";
import { useDispatch } from "react-redux";
import BidsModal from "../../../../components/bids/bidsModal";

const MarketPlaceItem = ({ params }) => {
  const dispatch = useDispatch();
  const { assetContract, tokenId } = params;
  const [listingInformation, setListingInformation] = useState(null);
  const [showBidsModal, setShowBidsModal] = useState(false);
  const chainId = useChainId();

  console.log(listingInformation);

  useEffect(() => {
    if (!chainId) return;

    // Define an async function to fetch listing information
    const fetchListingInfo = async () => {
      const itemData = await fetchLatestListingIdOfItem(
        assetContract,
        tokenId,
        chainId,
        dSponsorMpContract
      );

      const listingResponse = await readContract({
        contract: dSponsorMpContract,
        method: "listings",
        params: [BigInt(itemData.listingId)],
      });

      const listing = {
        listingId: listingResponse[0],
        tokenOwner: listingResponse[1],
        assetContract: listingResponse[2],
        tokenId: listingResponse[3],
        startTime: listingResponse[4],
        endTime: listingResponse[5],
        quantity: listingResponse[6],
        currency: listingResponse[7],
        reservePricePerToken: listingResponse[8],
        buyoutPricePerToken: listingResponse[9],
        tokenType: listingResponse[10],
        transferType: listingResponse[11],
        rentalExpirationTimestamp: listingResponse[12],
        listingType: listingResponse[13],
      };
      const listingWithPrice = await getMarketplaceItemsSymbolsAndPrice(
        listing,
        dSponsorMpContract,
        chainId
      );

      const royaltyInfo = await getRoyaltyInfo(
        listingWithPrice,
        chainId,
        assetContract
      );

      setListingInformation({
        ...listingWithPrice,
        ...itemData,
        ...royaltyInfo,
      });
    };

    // Call the async function to fetch listing information
    fetchListingInfo();
  }, [chainId, assetContract, tokenId]);

  if (!listingInformation) return null;

  return (
    <section className="relativebg-sigray" style={{ padding: "10rem 0" }}>
      <BidsModal
        showBidsModal={showBidsModal}
        setShowBidsModal={setShowBidsModal}
        listing={listingInformation}
      />
      <div className="container">
        {/* Item */}
        <div className="md:flex md:flex-wrap">
          {/* Image */}
          <figure className="mb-8 md:w-2/5 md:flex-shrink-0 md:flex-grow-0 md:basis-auto lg:w-1/2">
            <Image
              width={540}
              height={670}
              src={"/images/products/item_single_large.jpg"}
              alt="item"
              className="cursor-pointer rounded-2.5xl w-[100%]"
              data-bs-toggle="modal"
              data-bs-target="#imageModal"
            />

            {/* Modal */}
            <div
              className="modal fade"
              id="imageModal"
              tabIndex="-1"
              aria-hidden="true"
            >
              <div className="modal-dialog !my-0 flex h-full items-center justify-center p-4">
                <Image
                  width={787}
                  height={984}
                  src="/images/products/item_single_full.jpg"
                  alt="item"
                />
              </div>

              <button
                type="button"
                className="btn-close absolute top-6 right-6"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="h-6 w-6 fill-white"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                </svg>
              </button>
            </div>
            {/* end modal */}
          </figure>

          {/* Details */}
          <div className="md:w-3/5 md:basis-auto md:pl-8 lg:w-1/2 lg:pl-[3.75rem]">
            {/* Title Of The Item*/}
            <h1 className="mb-4 font-display text-4xl font-semibold text-light-base dark:text-white">
              Tokenized ad space #Ethereum
            </h1>

            <p className="mb-6 text-light-base">
              Buying this ad space give you the exclusive right to submit an ad.
              SiBorg team still has the power to validate or reject ad assets.
              You are free to change the ad proposal at anytime and free to
              resell it on the open market.
            </p>

            {/* Show Royalities */}
            <div className="mb-6">
              <p className="text-light-base font-semibold text-md">
                Royalties:{" "}
                <span
                  className="p-2 ml-2 rounded-md text-md text-white font-normal text-lg dark:text-white dark:bg-jacarta-600"
                  style={{
                    lineHeight: "1",
                    background:
                      "linear-gradient(114deg, #7D56C9 34.58%, #9D66C9 53.57%, #CE7FCA 75.1%)",
                  }}
                >
                  {Number(listingInformation.royaltyAmountDecimal)}%
                </span>
              </p>
            </div>

            {/* Creator / Owner */}
            {/* <div className="mb-8 flex flex-wrap">
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
                <div className="flex flex-col justify-center">
                  <span className="block text-sm text-jacarta-300 dark:text-white">
                    Creator <strong>10% royalties</strong>
                  </span>
                  <Link href={`/user/2`} className="block text-sipurple">
                    <span className="text-sm font-bold">@siborg</span>
                  </Link>
                </div>
              </div>

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
                    <span className="text-sm font-bold">@siborg_user</span>
                  </Link>
                </div>
              </div>
            </div> */}

            {/* Bid */}

            {listingInformation.listingType == 1 && (
              <div className="rounded-2lg border border-sigray-border bg-sigray-light p-8 dark:border-jacarta-600 dark:bg-jacarta-700">
                <div className="mb-8 sm:flex sm:flex-wrap">
                  {/* Highest bid */}
                  <div className="sm:w-1/2 sm:pr-4 lg:pr-8">
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
                      <div className="flex items-center whitespace-nowrap">
                        <span className="-ml-1" data-tippy-content="ETH">
                          <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            x="0"
                            y="0"
                            viewBox="0 0 1920 1920"
                            // xml:space="preserve"
                            className="h-5 w-5"
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
                        <span className="text-lg font-medium leading-tight tracking-tight text-green">
                          {listingInformation?.price} USDT
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Countdown */}
                  <div className="mt-4 dark:border-jacarta-600 sm:mt-0 sm:w-1/2 sm:border-l sm:border-jacarta-100 sm:pl-4 lg:pl-8">
                    <span className="js-countdown-ends-label text-sm text-jacarta-300 dark:text-jacarta-300">
                      Auction ends in
                    </span>
                    <Timer endTime={Number(listingInformation.endTime)} />
                  </div>
                </div>

                {/* Buttons */}
                <div
                  className="flex space-x-4"
                  onClick={() => {
                    setShowBidsModal(true);
                  }}
                >
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#placeBidModal"
                    className="inline-block w-full rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                  >
                    Place Bid
                  </a>
                </div>
              </div>
            )}

            {/* TO-DO : to change design of this card */}
            {listingInformation.listingType === 0 && (
              <div className="rounded-2lg border border-sigray-border bg-sigray-light p-8 dark:border-jacarta-600 dark:bg-jacarta-700">
                <div className="flex items-center justify-center mb-8">
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
                      <span className="-ml-1" data-tippy-content="ETH">
                        <svg
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          x="0"
                          y="0"
                          viewBox="0 0 1920 1920"
                          className="h-5 w-5"
                        >
                          {/* SVG paths */}
                        </svg>
                      </span>
                      <span className="text-lg font-medium leading-tight tracking-tight text-green">
                        120 USDT
                      </span>
                    </div>
                    <span className="text-sm text-jacarta-300 dark:text-jacarta-300">
                      12.34 USDT
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-center space-x-4">
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#buyNowModal"
                    className="inline-block w-full rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                  >
                    Buy Now For 12.34 USDT
                  </a>
                </div>
              </div>
            )}

            {/* end bid */}

            <div className="mt-4 text-center">
              <div className="block text-base text-jacarta-300 text-white font-light">
                Ownership Period:
              </div>
              <div className="block text-sm text-jacarta-300 font-medium">
                01/01/2024 - 31/12/2024
              </div>
            </div>
          </div>
          {/* end details */}
        </div>

        <div></div>

        {/* Tabs */}
        {/* <Tabs /> */}
        {/* end tabs */}
      </div>
    </section>
  );
};

export default MarketPlaceItem;
