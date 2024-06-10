import Link from "next/link";
import React from "react";
import activityToTopHolders from "./utils/activityToTopHolders";
import activityToTopSpenders from "./utils/activityToTopSpenders";
import activityToTopRewarded from "./utils/activityToTopRewarded";

/**
 * Renders a table with the provided data.
 * @param {string} title - The title of the table.
 * @param {Array} data - The data to be displayed in the table.
 * @param {Array} columns - The columns definitions.
 * @returns {JSX.Element} The rendered table.
 */
const renderTable = (title, data, columns) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="overflow-x-auto mt-4">
      <h2 className="text-jacarta-700 font-bold font-display mb-6 text-center text-3xl dark:text-white">
        {title}
      </h2>
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-left">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="text-sm font-semibold text-jacarta-400 dark:text-jacarta-300"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="text-sm text-jacarta-400 dark:text-jacarta-300">
                    {col.render(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
const LeaderboardTable = ({ activity }) => {
  const leaderboards = {
    topHolders: activityToTopHolders(activity),
    topSpenders: activityToTopSpenders(activity),
    topRewarded: activityToTopRewarded(activity)
  };

  const holderColumns = [
    { header: "Rank", render: (item) => item.rank },
    {
      header: "Total Amount Spent",
      render: (item) => (
        <>
          {item.totalSpent} USDC
          <ul>
            {item.details.map((detail, i) => (
              <li key={i}>
                {detail.currency}: {detail.totalSpent}
              </li>
            ))}
          </ul>
        </>
      )
    },
    {
      header: "Address",
      render: (item) => (
        <Link href={`/manage/${item.address}`} className="text-accent">
          {item.address}
        </Link>
      )
    },
    { header: "Held", render: (item) => item.balance },
    { header: "Chain ID", render: (item) => item.chainId },
    { header: "DPoints", render: (item) => item.dPoints }
  ];

  const spenderColumns = [
    { header: "Rank", render: (item) => item.rank },
    {
      header: "Total Amount Spent",
      render: (item) => (
        <>
          {item.totalSpent} USDC
          <ul>
            {item.details.map((detail, i) => (
              <li key={i}>
                {detail.currency}: {detail.totalSpent}
              </li>
            ))}
          </ul>
        </>
      )
    },
    {
      header: "Address",
      render: (item) => (
        <Link href={`/manage/${item.address}`} className="text-accent">
          {item.address}
        </Link>
      )
    },
    { header: "Held", render: (item) => item.balance },
    { header: "Chain ID", render: (item) => item.chainId },
    { header: "DPoints", render: (item) => item.dPoints }
  ];

  const rewardedColumns = [
    { header: "Rank", render: (item) => item.rank },
    {
      header: "Total Amount Received",
      render: (item) => (
        <>
          {item.totalReceived} USDC
          <ul>
            {item.details.map((detail, i) => (
              <li key={i}>
                {detail.currency}: {detail.totalReceived}
              </li>
            ))}
          </ul>
        </>
      )
    },
    {
      header: "Address",
      render: (item) => (
        <Link href={`/manage/${item.address}`} className="text-accent">
          {item.address}
        </Link>
      )
    },
    { header: "Number of Refunds", render: (item) => item.refunds },
    { header: "Chain ID", render: (item) => item.chainId },
    { header: "DPoints", render: (item) => item.dPoints }
  ];

  return (
    <div>
      {renderTable("Top Holders", leaderboards.topHolders, holderColumns)}
      {renderTable("Top Spenders", leaderboards.topSpenders, spenderColumns)}
      {renderTable("Top Rewarded", leaderboards.topRewarded, rewardedColumns)}
    </div>
  );
};

export default LeaderboardTable;
