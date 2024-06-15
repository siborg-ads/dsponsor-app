import Link from "next/link";
import React from "react";
import renderDateToHumanString from "../../providers/utils/renderDateToHumanString";
import renderPriceToHumanString from "../../providers/utils/renderPriceToHumanString";
import formatLongAddress from "../../utils/formatLongAddress";

const renderTable = (data, currencySymbol, currencyDecimals) => {
  if (!data || data.length === 0) {
    return <div className="text-center py-4">No data available</div>;
  }
 const transformStatus = (status) => {
   switch (status) {
     case "CREATED":
       return "Best Bid 🎉";
     case "CANCELLED":
       return "Outbid ❌";
     default:
       return status;
   }
 };
  const columns = [
    {
      header: "Bidder",
      render: (item) => (
        <Link href={`/manage/${item.bidder}`} className="text-primaryPink hover:text-jacarta-100">
          {formatLongAddress(item.bidder)}
        </Link>
      )
    },
    {
      header: "Amount",
      render: (item) =>
        renderPriceToHumanString(
          item.totalBidAmount / Math.pow(10, currencyDecimals),
          currencySymbol
        )
    },
    {
      header: "Bid Time",
      render: (item) => renderDateToHumanString(new Date(parseInt(item.creationTimestamp) * 1000))
    },
    {
      header: "Reward",
      render: (item) =>
        item.amountsFormatted?.refundProfit
          ? `${item.amountsFormatted.refundProfit} ${currencySymbol}`
          : "-"
    },
    { header: "Status", render: (item) => transformStatus(item.status) }
  ];

  return (
    <div className="w-full text-left min-w-[736px] border dark:border-primaryPink dark:border-opacity-10 dark:bg-primaryBlack dark:text-white rounded-2lg">
      <table className="w-full rounded-2lg">
        <thead className="rounded-2lg">
          <tr className="bg-jacarta-50 dark:bg-primaryPurple rounded-2lg">
            {columns.map((col, index) => (
              <th key={index} className="py-3 px-4 font-medium">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="border-t border-jacarta-100 dark:border-primaryPink dark:border-opacity-10"
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="py-4 px-4">
                  {col.render(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ItemLastBids = ({ lastBids, currencySymbol, currencyDecimals = 18 }) => {
  return (
    <div className="overflow-x-auto mt-4">
      <h2 className="text-jacarta-900 font-bold font-display mb-6 text-center text-3xl dark:text-white">
        Latest Bids
      </h2>
      {renderTable(lastBids, currencySymbol, currencyDecimals)}
    </div>
  );
};

export default ItemLastBids;
