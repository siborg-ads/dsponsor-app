import React, { useEffect, useState } from "react";
import OverviewCard from "./OverviewCard";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

const ProfileOverview = ({ userData, ownedTokens }) => {
  const [ranking, setRanking] = useState(null);

  useEffect(() => {
    if (userData) {
      setRanking(userData?.rankings[0]);
    }
  }, [userData]);

  const overviewCards = [
    {
      value: ownedTokens?.length ?? 0,
      label: "Ad Spaces",
      informations: "The number of ad spaces you own"
    },
    {
      value: ranking?.nbBids ?? 0,
      label: "Total Bids",
      informations: "The total number of bids placed"
    },
    {
      value: ranking?.nbRefunds ?? 0,
      label: "Outbided",
      informations: "The total number of outbids received"
    },
    {
      value: `$${ranking?.usdcAmounts.bidRefundReceived ?? 0}`,
      label: "Rewards Earned",
      informations: "The total amount of rewards earned"
    },
    {
      value: ranking?.points ?? 0,
      label: "Boxes Won",
      informations: "The total number of boxes won"
    }
  ];

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <h2 className="text-white font-semibold text-xl md:text-2xl">Overview</h2>
          <span className="text-jacarta-100 text-xs md:text-sm inline-flex items-center gap-1">
            <ArrowPathIcon className="w-4 h-4 text-white animate-spin" /> Updated every 15 minutes
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {overviewCards.map((card, index) => {
            return <OverviewCard key={index} card={card} />;
          })}
        </div>
      </div>
    </>
  );
};

export default ProfileOverview;
