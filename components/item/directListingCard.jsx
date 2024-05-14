import React from "react";
import Link from "next/link";
import Image from "next/image";
import OwnerView from "./ownerView";
function DirectListingCard({ updatedListing, setShowBuyModal }) {
  const endDate = new Date(updatedListing.endTime * 1000);
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

  return (
    <div className="rounded-2lg border border-sigray-border bg-sigray-light p-8 dark:border-jacarta-600 dark:bg-jacarta-700">
      <div className="flex items-center justify-center sm:flex-wrap mb-8">
        <div className="sm:w-1/2 sm:pr-4 lg:pr-8 flex items-center">
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
            <div className="flex-grow flex items-center whitespace-nowrap">
              <span className="text-m font-medium leading-tight tracking-tight text-green">
                {updatedListing.price} {updatedListing.symbol}
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

      <div className="flex justify-center space-x-4">
        {updatedListing.status === "CREATED" && (
          <button
            onClick={() => setShowBuyModal(true)}
            className="inline-block w-full rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
          >
            Buy Now For {updatedListing.price} {updatedListing.symbol}
          </button>
        )}
        <OwnerView listing={updatedListing} />
      </div>
    </div>
  );
}

export default DirectListingCard;
