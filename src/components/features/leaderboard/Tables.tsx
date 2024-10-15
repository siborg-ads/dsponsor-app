import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Link from "next/link";
import activityToTopPoints from "@/utils/tables/activityToTopPoints";
import activityToHighestTransactions from "@/utils/tables/activityToHighestTransactions";
import formatLongAddress from "@/utils/addresses/formatLongAddress";
import { formatUnits, getAddress } from "ethers/lib/utils";
import config from "@/config/config";
import { ChainObject } from "@/types/chain";
import ChainSelector from "../chain/ChainSelector";
import { isAddress } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";

const renderTable = (data, columns, userAddress) => {
  if (!data || data.length === 0 || !Array.isArray(data)) {
    return <div className="py-4 text-center">No data available</div>;
  }

  return (
    <div className="w-full text-left min-w-[736px] border dark:border-primaryPink dark:border-opacity-10 dark:bg-primaryBlack dark:text-white rounded-2lg">
      <table className="w-full overflow-hidden rounded-2lg">
        <thead className="border rounded-2lg border-primaryPurple">
          <tr className="bg-jacarta-50 dark:bg-primaryPurple rounded-2lg">
            {columns.map((col, index) => (
              <th key={index} className="px-4 py-3 font-medium">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr
              key={index}
              className={`${userAddress && item.address && getAddress(item.address) === getAddress(userAddress) ? (index === 0 ? "bg-primaryPurple bg-opacity-10 border-primaryPurple border" : "bg-primaryPurple bg-opacity-10") : "border-t border-opacity-10 border-jacarta-100 dark:border-primaryPink dark:border-opacity-10"}`}
            >
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className="px-4 py-4"
                  style={{
                    maxWidth: "150px", // Set the maximum width here
                    whiteSpace: "nowrap", // Prevent text wrapping
                    overflow: "hidden", // Hide overflow text
                    textOverflow: "ellipsis" // Show '...' for overflowed text
                  }}
                >
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

const Tables = ({ activity }) => {
  const [itemActive, setItemActive] = useState(1);

  const [leaderboards, setLeaderboards] = useState({});

  const [chainConfig, setChainConfig] = useState<ChainObject>(Object.entries(config)[0][1]);

  const filteredActivity = activity.find((a) => Number(a.chainId) === Number(chainConfig.chainId));

  const chainExplorer = chainConfig.explorerBaseURL;

  const wallet = useActiveAccount();
  const address = wallet?.address;

  useEffect(() => {
    setLeaderboards({
      topPoints: activityToTopPoints(filteredActivity?.rankings, address),
      // topHolders: activityToTopHolders(filteredActivity?.rankings, address),
      // topRewarded: activityToTopRewarded(filteredActivity?.rankings, address),
      topSpenders: activityToHighestTransactions(filteredActivity?.lastActivities, address)
    });
  }, [filteredActivity, address]);

  const pointColumns = [
    { header: "Rank", render: (item) => item.rank },
    {
      header: "Wallet",
      render: (item) => (
        <Link href={`/profile/${item.address}`}>
          <span className="text-primaryPink hover:text-jacarta-100">{item.addressDisplay}</span>
        </Link>
      )
    },
    { header: "Total Boxes", render: (item) => item.totalPoints }
  ];

  /*
  const rewardedColumns = [
    { header: "Rank", render: (item) => item.rank },
    { header: "Total Amount Earned", render: (item) => `${item.totalReceived} USDC` },
    {
      header: "Address",
      render: (item) => (
        <Link href={`/profile/${item.address}`}>
          <span className="text-primaryPink hover:text-jacarta-100">{item.addressDisplay}</span>
        </Link>
      )
    },
    { header: "# of Outbids", render: (item) => item.refunds }
  ];
  */

  const highestTransactionsColumns = [
    { header: "Type", render: (item) => item.type },
    { header: "Date", render: (item) => `${item.date}` },
    {
      header: "Transaction",
      render: (item) => {
        return (
          <Link target="_blank" href={`${chainExplorer}/tx/${item.fullTransactionHash}`}>
            {/* to change */}
            <span className="text-primaryPink hover:text-jacarta-100">{item.transactionHash}</span>
          </Link>
        );
      }
    },
    {
      header: "Item",
      render: (item) => (
        <Link href={`/${chainConfig.chainId}/offer/${item.offerId}/${item.tokenId}`}>
          <span className="text-primaryPink hover:text-jacarta-100">
            {item.offerName} #{item.tokenData ? item.tokenData : item.tokenId}
          </span>
        </Link>
      )
    },
    {
      header: "Protocol Fee",
      render: (item) => {
        return `${parseFloat(formatUnits(item.fee, item.decimals)).toFixed(4)} ${item.symbol}`;
      }
    },

    { header: "Boxes", render: (item) => parseFloat(item.points).toFixed(2) },
    {
      header: "Seller",
      render: (item) => (
        <Link href={`/profile/${item.enabler}`}>
          <span className="text-primaryPink hover:text-jacarta-100">
            {formatLongAddress(item.enablerDisplayAddr)}
          </span>
        </Link>
      )
    },
    {
      header: "Buyer",
      render: (item) => (
        <Link href={`/profile/${item.spender}`}>
          <span className="text-primaryPink hover:text-jacarta-100">
            {formatLongAddress(item.spenderDisplayAddr)}
          </span>
        </Link>
      )
    },
    {
      header: "Referrer",
      render: (item) => (
        <Link href={isAddress(item.refAddr) ? `/profile/${item.refAddr}` : "#"}>
          <span className="text-primaryPink hover:text-jacarta-100">
            {formatLongAddress(item.refAddrDisplayAddr)}
          </span>
        </Link>
      )
    }
  ];

  const columns = {
    topPoints: pointColumns,
    //  topRewarded: rewardedColumns,
    topSpenders: highestTransactionsColumns
  };

  const tabItem = [
    { id: 1, text: "Top Boxes", icon: "activity" },
    // { id: 2, text: "Top Rewarded", icon: "activity" },
    { id: 3, text: "Top Transactions", icon: "activity" }
  ];

  return (
    <div className="container ">
      <h1 className="pt-8 pb-4 mb-4 text-4xl font-medium text-center dark:text-white">
        Leaderboard Rankings
      </h1>
      <ChainSelector setChainConfig={setChainConfig} />
      <div className="grid flex-wrap items-center justify-between grid-cols-2 gap-4 mb-8 md:grid-cols-3"></div>
      {/*
      <div className="grid flex-wrap items-center justify-between grid-cols-1 gap-4 mb-8 md:grid-cols-3">
        <Cards activity={filteredActivity} />
      </div>
      */}
      <div className="overflow-x-auto hide-scrollbar">
        {/* <!-- Tabs Nav --> */}
        <Tabs className="tabs hide-scrollbar">
          <TabList className="flex items-center justify-start pb-px mb-6 overflow-y-hidden border-b nav nav-tabs hide-scrollbar border-jacarta-100 dark:border-jacarta-800 md:justify-center">
            {tabItem.map(({ id, text, icon }) => {
              return (
                <Tab className="nav-item " key={id} onClick={() => setItemActive(id)}>
                  <button
                    className={
                      itemActive === id
                        ? "nav-link hover:text-jacarta-900 text-jacarta-100 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white active"
                        : "nav-link hover:text-jacarta-900 text-jacarta-100 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white"
                    }
                  >
                    <svg className="w-5 h-5 mr-1 fill-current icon">
                      <use xlinkHref={`/icons.svg#icon-${icon}`}></use>
                    </svg>
                    <span className="text-base font-medium font-display">{text}</span>
                  </button>
                </Tab>
              );
            })}
          </TabList>

          {Object.entries(leaderboards).map(([key, data]) => (
            <TabPanel key={key}>
              <div className="max-w-2xl mx-auto text-center">
                {key === "topPoints" && (
                  <p className="mb-4 text-sm text-jacarta-100 md:text-base">
                    Each transaction in <b>WETH</b> or <b>USDC</b> where a sale or auction is
                    completed rewards in &quot;Boxes&quot; the seller, buyer, and referrer based on
                    the amount paid. Below are the profiles with the highest rewards. The more you
                    spend, the more &quot;Boxes&quot; you earn. &quot;Boxes&quot; may be subject to
                    an airdrop.
                  </p>
                )}
                {/*
                {key === "topHolders" && (
                  <p className="mb-4 text-sm text-jacarta-100 md:text-base">
                    Here is the list of wallets that acquired the most tokens, along with the total
                    amount spent.
                  </p>
                )}

                {key === "topRewarded" && (
                  <p className="mb-4 text-sm text-jacarta-100 md:text-base">
                    For each outbid, the outbid bidder receives a bonus in addition to their bid.
                    Here is the list of those who received the most bonuses.
                  </p>
                )}
          */}

                {key === "topSpenders" && (
                  <p className="mb-4 text-sm text-jacarta-100 md:text-base">
                    Here are the transactions with the highest amounts spent in <b>WETH</b> and the
                    number of &quot;Boxes&quot; earned. The more you spend, the more
                    &quot;Boxes&quot; you earn. &quot;Boxes&quot; may be subject to an airdrop.
                  </p>
                )}
              </div>
              <p className="mb-4 text-xs text-jacarta-100">
                {/* Data is updated every 15 minutes */}
              </p>
              <div className="overflow-x-auto">{renderTable(data, columns[key], address)}</div>
            </TabPanel>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Tables;
