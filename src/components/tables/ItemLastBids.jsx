import Link from "next/link";
import React from "react";
import renderDateToHumanString from "../../providers/utils/renderDateToHumanString";
import renderPriceToHumanString from "../../providers/utils/renderPriceToHumanString";

const ItemLastBids = ({ lastBids, currencySymbol, currencyDecimals = 18 }) => {
  const transformStatus = (status) => {
    switch (status) {
      case "CREATED":
        return "Best Bid";
      case "CANCELLED":
        return "Outbid";
      default:
        return status;
    }
  };
  return (
    <div className="overflow-x-auto mt-4">
      <h2 className="text-jacarta-900 font-bold font-display mb-6 text-center text-3xl dark:text-white ">
        Latest Bids
      </h2>
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="text-sm font-semibold text-jacarta-100 dark:text-jacarta-100">
                Bidder
              </th>
              <th className="text-sm font-semibold text-jacarta-100 dark:text-jacarta-100">
                Amount
              </th>
              <th className="text-sm font-semibold text-jacarta-100 dark:text-jacarta-100">
                Bid Time
              </th>
              <th className="text-sm font-semibold text-jacarta-100 dark:text-jacarta-100">
                Reward
              </th>
              <th className="text-sm font-semibold text-jacarta-100 dark:text-jacarta-100">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {lastBids.map((bid, index) => (
              <tr key={index}>
                <td className="text-sm text-jacarta-100 dark:text-jacarta-100">
                  <Link
                    href={`/manage/${bid.bidder}`}
                    className="text-primaryPink hover:text-jacarta-100"
                  >
                    {bid.bidder}
                  </Link>
                </td>
                <td className="text-sm text-jacarta-100 dark:text-jacarta-100">
                  {renderPriceToHumanString(
                    bid.totalBidAmount / Math.pow(10, currencyDecimals),
                    currencySymbol
                  )}
                </td>
                <td className="text-sm text-jacarta-100 dark:text-jacarta-100">
                  {renderDateToHumanString(new Date(parseInt(bid.creationTimestamp) * 1000))}
                </td>
                <td className="text-sm text-jacarta-100 dark:text-jacarta-100">
                  {bid.amountsFormatted?.refundProfit
                    ? `${bid.amountsFormatted.refundProfit} ${currencySymbol}`
                    : "-"}
                </td>
                <td className="text-sm text-jacarta-100 dark:text-jacarta-100">
                  {transformStatus(bid.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemLastBids;
