import Link from "next/link";
import React from "react";
import renderDateToHumanString from "../../providers/utils/renderDateToHumanString";
import renderPriceToHumanString from "../../providers/utils/renderPriceToHumanString";
import formatLongAddress from "../../utils/formatLongAddress";

const ItemLastBids = ({ bids }) => {
  const transformStatus = (status) => {
    switch (status) {
      case "CREATED":
        return "Best Bid 🎉";
      case "CANCELLED":
        return "Outbid ❌";
      case "COMPLETED":
        return "Won 👑";
      default:
        return status;
    }
  };

  const sortedBids = bids
    .map((listing) => listing.sort((a, b) => b.bid.creationTimestamp - a.bid.creationTimestamp))
    .sort((a, b) => b[0].bid.creationTimestamp - a[0].bid.creationTimestamp);

  return (
    <div className="overflow-x-auto mt-4">
      <h2 className="text-jacarta-900 font-bold font-display mb-6 text-center text-3xl dark:text-white ">
        Latest Bids
      </h2>
      <div className="w-full text-left min-w-[736px] border dark:border-primaryPink dark:border-opacity-10 dark:bg-primaryBlack dark:text-white rounded-2lg">
        <table className="w-full mx-auto text-left rounded-2lg">
          <thead className="rounded-2lg">
            <tr className="bg-jacarta-50 dark:bg-primaryPurple rounded-2lg text-base">
              <th className="py-3 px-4 font-medium text-jacarta-100 dark:text-jacarta-100">
                Listing
              </th>
              <th className="py-3 px-4 font-medium text-jacarta-100 dark:text-jacarta-100">
                Bidder
              </th>
              <th className="py-3 px-4 font-medium text-jacarta-100 dark:text-jacarta-100">
                Amount
              </th>
              <th className="py-3 px-4 font-medium text-jacarta-100 dark:text-jacarta-100">
                Bid Time
              </th>
              <th className="py-3 px-4 font-medium text-jacarta-100 dark:text-jacarta-100">
                Reward
              </th>
              <th className="py-3 px-4 font-medium text-jacarta-100 dark:text-jacarta-100">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedBids &&
              sortedBids.length > 0 &&
              sortedBids.map((listing, listingIndex) => (
                <React.Fragment key={listingIndex}>
                  {listing.map((bid, bidIndex) => (
                    <tr key={bidIndex}>
                      <td className="py-4 px-4 text-jacarta-100 dark:text-jacarta-100">
                        {bidIndex === 0 ? <>Listing {sortedBids.length - listingIndex}</> : <></>}
                      </td>
                      <td className="py-4 px-4 text-jacarta-100 dark:text-jacarta-100">
                        <Link
                          href={`/profile/${bid.bid.bidder}`}
                          className="text-primaryPink hover:text-jacarta-100"
                        >
                          {formatLongAddress(bid.bid.bidder)}
                        </Link>
                      </td>
                      <td className="py-4 px-4 text-jacarta-100 dark:text-jacarta-100">
                        {renderPriceToHumanString(
                          bid.bid.paidBidAmount / Math.pow(10, bid.currency.currencyDecimals),
                          bid.currency.currencySymbol
                        )}
                      </td>
                      <td className="py-4 px-4 text-jacarta-100 dark:text-jacarta-100">
                        {renderDateToHumanString(
                          new Date(parseInt(bid.bid.creationTimestamp) * 1000)
                        )}
                      </td>
                      <td className="py-4 px-4 text-jacarta-100 dark:text-jacarta-100">
                        {bid.bid.amountsFormatted.refundProfit &&
                        Number(bid.bid.amountsFormatted.refundProfit) !== 0
                          ? `${bid.bid.amountsFormatted.refundProfit} ${bid.currency.currencySymbol}`
                          : "-"}
                      </td>
                      <td className="py-4 px-4 text-jacarta-100 dark:text-jacarta-100">
                        {transformStatus(bid.bid.status)}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemLastBids;
