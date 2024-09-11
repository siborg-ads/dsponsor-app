import React from "react";
import OverviewCard from "@/components/features/profile/OverviewCard";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import displayOrCheckKnownAddress from "@/utils/addresses/displayOrCheckKnownAddress";

const Overview = ({ userData, ownedTokens, isLoading, manageAddress }) => {
  const overviewCards = [
    {
      value: ownedTokens?.length ?? 0,
      label: "Ad Spaces",
      informations: "The number of ad spaces this profil own"
    },
    /*
    {
      value: userData?.nbBids ?? 0,
      label: "Total Bids",
      informations: "The total number of bids placed"
    },
    {
      value: userData?.nbRefunds ?? 0,
      label: "Outbided",
      informations: "The total number of outbids received"
    },
    {
      value: `$${parseFloat(userData?.bidRefundReceived).toFixed(2) ?? 0}`,
      label: "Rewards Earned",
      informations: "The total amount of rewards earned"
    },
    */
    {
      value: userData?.points ?? 0,
      label: "Boxes",
      informations: "The total number of boxes this profil has earned"
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-end">
        <div className="flex items-end gap-4">
          <h2 className="text-white font-semibold text-xl md:text-2xl">Overview</h2>
          <span className="md:block text-jacarta-100 text-xs md:text-sm inline-flex items-center gap-1">
            {displayOrCheckKnownAddress(manageAddress)}
          </span>
          {/*}
          <span className="md:hidden text-jacarta-100 text-xs md:text-sm inline-flex items-center gap-1">
            {shortenAddress(manageAddress)}
          </span>
          */}
        </div>
        <span className="text-jacarta-100 text-xs md:text-sm inline-flex items-center gap-1">
          {isLoading && <ArrowPathIcon className="w-4 h-4 text-white animate-spin" />}
          {/* 
          Updated every
          15 minutes
          */}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {overviewCards.map((card, index) => {
          return <OverviewCard key={index} card={card} />;
        })}
      </div>
    </div>
  );
};

export default Overview;
