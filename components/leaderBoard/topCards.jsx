import React from 'react'
import Link from "next/link";

const topCards = ({activity}) => {
    console.log("activity", activity)
  return (
    <div className="flex flex-wrap justify-between gap-4">
      <div className="dark:bg-jacarta-700 w-[200px]   overflow-hidden dark:border-jacarta-600 mb-2 border-jacarta-100 rounded-2lg border flex flex-col gap-4 bg-white p-8">
        <div className=" flex flex-col gap-4 items-center justify-center sm:flex sm:flex-wrap">
          <p className="dark:text-white font-medium ">Last Bidder</p>
          <Link
            href={`/manage/${activity?.lastBid?.bidderAddr}`}
            className="text-accent text-sm w-[125px] text-ellipsis whitespace-nowrap overflow-hidden"
          >
            {activity?.lastBid?.bidderAddr}
          </Link>
        </div>
      </div>
      <div className="dark:bg-jacarta-700 w-[200px]   overflow-hidden dark:border-jacarta-600 mb-2 border-jacarta-100 rounded-2lg border flex flex-col gap-4 bg-white p-8">
        <div className=" flex flex-col gap-4 items-center justify-center sm:flex sm:flex-wrap">
          <p className="dark:text-white font-medium ">Total Sales</p>
          <span className="text-accent text-sm text-ellipsis whitespace-nowrap overflow-hidden">
            {activity?.totalSpentUSDCAmount} USDC
          </span>
        </div>
      </div>
      <div className="dark:bg-jacarta-700 w-[200px]   overflow-hidden dark:border-jacarta-600 mb-2 border-jacarta-100 rounded-2lg border flex flex-col gap-4 bg-white p-8">
        <div className=" flex flex-col gap-4 items-center justify-center sm:flex sm:flex-wrap">
          <p className="dark:text-white font-medium ">Total Refund</p>
          <span className="text-accent text-sm  text-ellipsis whitespace-nowrap overflow-hidden">
            {activity?.totalBidRefundUSDCAmount} USDC
          </span>
        </div>
      </div>
      <div className="dark:bg-jacarta-700 w-[200px]   overflow-hidden dark:border-jacarta-600 mb-2 border-jacarta-100 rounded-2lg border flex flex-col gap-4 bg-white p-8">
        <div className=" flex flex-col gap-4 items-center justify-center sm:flex sm:flex-wrap">
          <p className="dark:text-white font-medium ">Total Holders</p>
          <span
          
            className="text-accent text-sm  text-ellipsis whitespace-nowrap overflow-hidden"
          >
            {activity?.nbHolders}
          </span>
        </div>
      </div>
    </div>
  );
}

export default topCards