import React from "react";
import Link from "next/link";
import Image from "next/image";
import Timer from "./Timer";
import OwnerView from "./ownerView";

function AuctionListingCard({ updatedListing, setShowBidsModal }) {
  return (
    <div className="rounded-2lg border border-sigray-border bg-sigray-light p-8 dark:border-jacarta-600 dark:bg-jacarta-700">
      <div className="mb-8 sm:flex sm:flex-wrap">
        {/* Highest bid */}
        <div className="sm:w-1/2 sm:pr-4 lg:pr-8">
          {updatedListing?.bids && updatedListing.bids.length > 0 ? (
            <div className="block overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm text-jacarta-300 dark:text-jacarta-300">
                Highest bid by{" "}
              </span>
              <Link
                href={`/user/${updatedListing.bids[0].bidderId}`}
                className="text-sm font-bold text-sipurple"
              >
                {updatedListing.bids[0].bidder}
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
                  {updatedListing.price} {updatedListing.symbol}
                </span>
              </div>
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
          <Timer endTime={updatedListing.endTime} />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4">
        {updatedListing.status === "CREATED" && (
          <button
            onClick={() => setShowBidsModal(true)}
            className="inline-block w-full rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
          >
            Place Bid
          </button>
        )}
        <OwnerView listing={updatedListing} />
      </div>
    </div>
  );
}

export default AuctionListingCard;
