import React, { useState, useEffect } from "react";
import handleCopy from "../../utils/handleCopy";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { activated_features } from "../../data/activated_features";
import Link from "next/link";
import { useChainContext } from "../../contexts/hooks/useChainContext";
import { getAddress } from "ethers/lib/utils";
import { DateRangePicker } from "@nextui-org/date-picker";

const Activity = ({ isUserConnected, userAddr, chainId }) => {
  const [copied, setCopied] = useState(false);
  const [, setUserData] = useState(null);
  const [ranking, setRanking] = useState(null);
  const [lastActivities, setLastActivities] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredLastActivities, setFilteredLastActivities] = useState(null);

  let frontURL;
  if (typeof window !== "undefined") {
    frontURL = window.location.href;
  }

  const { currentChainObject } = useChainContext();
  const chainExplorer = currentChainObject?.explorerBaseUrl;

  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [copied]);

  useEffect(() => {
    console.log("startDate", startDate);
    console.log("endDate", endDate);
  }, [startDate, endDate]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://relayer.dsponsor.com/api/${chainId}/activity?userAddress=${userAddr}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
        .catch((err) => console.log(err));

      let lastActivities = activated_features.canFilterTransactionsWithWETH
        ? data?.lastActivities.filter(
            (activity) => activity.symbol === "WETH" && activity.points > 0
          )
        : data?.lastActivities.filter((activity) => activity.points > 0);

      setUserData(data);
      setRanking(data?.rankings[0]);
      setLastActivities(lastActivities);
    };

    if (userAddr && chainId) {
      fetchData();
    }
  }, [userAddr, chainId]);

  useEffect(() => {
    if (startDate && endDate) {
      const filteredActivities = lastActivities.filter((activity) => {
        const activityDate = new Date(activity.date);
        return (
          activityDate.getTime() >= startDate.getTime() &&
          activityDate.getTime() <= endDate.getTime()
        );
      });

      setFilteredLastActivities(filteredActivities);
    } else {
      setFilteredLastActivities(lastActivities);
    }
  }, [startDate, endDate, lastActivities]);

  const toDisplayType = (type) => {
    switch (type) {
      case "buy":
        return "Bought";
      case "auction":
        return "Auction Closed";
      case "mint":
        return "Minted";
      default:
        return "Unknown";
    }
  };

  return (
    <>
      {!isUserConnected && (
        <p className="text-center text-xs text-jacarta-100 mb-4">
          Data is updated every 15 minutes
        </p>
      )}

      <div className="flex flex-col justify-center gap-4 max-w-4xl mx-auto">
        {isUserConnected && (
          <>
            <div className="flex flex-col justify-center gap-4">
              <div className="flex flex-col gap-2">
                <div className="dark:bg-secondaryBlack dark:text-jacarta-100 rounded-2lg bg-white p-3 flex gap-4 justify-center items-center">
                  <p className="text-center text-sm text-white">
                    The more active you are on the platform, the more points you earn! The more
                    points you have, the better the surprises you&apos;ll get. 🎁 <br />
                    You gain points by participating in a token sale, whether as a buyer, seller, or
                    even a referrer! 💸 <br />
                    Share your referral code to earn points:{" "}
                    <Tippy
                      hideOnClick={false}
                      content={copied ? <span>copied</span> : <span>copy</span>}
                    >
                      <span
                        onClick={() => {
                          handleCopy(`${frontURL}/?_rid=${userAddr}`, setCopied);
                        }}
                        className="text-primaryPurple hover:text-opacity-80 cursor-pointer"
                      >
                        click here
                      </span>
                    </Tippy>
                    .
                  </p>
                </div>
                <p className="text-left text-xs text-jacarta-100 mb-4">
                  Data is updated every 15 minutes
                </p>
              </div>

              <div className="flex flex-col justify-center gap-8">
                <div className="flex flex-col justify-center gap-4">
                  <span className="text-white text-lg font-bold">Your Activity</span>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col bg-primaryPurple text-white items-center justify-center p-4 rounded-2lg">
                      <span className="text-2xl font-bold">{ranking?.points ?? 0}</span>
                      <span>Points</span>
                    </div>

                    <div className="flex flex-col bg-primaryPurple text-white items-center justify-center p-4 rounded-2lg">
                      <span className="text-2xl font-bold">{ranking?.nbBids ?? 0}</span>
                      <span>Bids</span>
                    </div>

                    <div className="flex flex-col bg-primaryPurple text-white items-center justify-center p-4 rounded-2lg">
                      <span className="text-2xl font-bold">{ranking?.nbRefunds ?? 0}</span>
                      <span>Refunds</span>
                    </div>

                    <div className="flex flex-col bg-primaryPurple text-white items-center justify-center p-4 rounded-2lg">
                      <span className="text-2xl font-bold">
                        ${ranking?.usdcAmounts.bidRefundReceived ?? 0}
                      </span>
                      <span>Refunded</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center gap-4">
                  <div className="flex w-full items-center justify-between">
                    <span className="text-white text-lg font-bold">Your Transactions</span>
                    <div>
                      <DateRangePicker
                        onChange={(value) => {
                          const startDateObject = value.start;
                          const endDateObject = value.end;

                          const startDate = new Date(
                            startDateObject.year,
                            startDateObject.month - 1,
                            startDateObject.day
                          );
                          const endDate = new Date(
                            endDateObject.year,
                            endDateObject.month - 1,
                            endDateObject.day
                          );

                          setStartDate(startDate);
                          setEndDate(endDate);
                        }}
                      />
                    </div>
                  </div>
                  <table className="w-full rounded-2lg">
                    <thead className="text-white bg-primaryPurple rounded-2lg">
                      <tr className="bg-jacarta-50 dark:bg-primaryPurple rounded-2lg text-base">
                        <th className="py-3 px-4 font-medium text-jacarta-100 dark:text-jacarta-100">
                          Operation
                        </th>
                        <th className="py-3 px-4 font-medium text-jacarta-100 dark:text-jacarta-100">
                          Date
                        </th>
                        <th className="py-3 px-4 font-medium text-jacarta-100 dark:text-jacarta-100">
                          Transaction Hash
                        </th>
                        <th className="py-3 px-4 font-medium text-jacarta-100 dark:text-jacarta-100">
                          Buyer Points
                        </th>
                        <th className="py-3 px-4 font-medium text-jacarta-100 dark:text-jacarta-100">
                          Seller Points
                        </th>
                        <th className="py-3 px-4 font-medium text-jacarta-100 dark:text-jacarta-100">
                          Referrer Points
                        </th>
                      </tr>
                    </thead>
                    <tbody className="rounded-2lg">
                      {filteredLastActivities?.map((activity, index) => {
                        return (
                          <tr key={index}>
                            <td className="py-4 px-4 text-jacarta-100 dark:text-jacarta-100">
                              {toDisplayType(activity?.type)}
                            </td>
                            <td className="py-4 px-4 text-jacarta-100 dark:text-jacarta-100">
                              {new Date(activity?.date).toLocaleString()}
                            </td>
                            <td className="py-4 px-4 text-jacarta-100 dark:text-jacarta-100">
                              <Link
                                target="_blank"
                                href={`${chainExplorer}/tx/${activity?.transactionHash}`}
                              >
                                <span className="text-primaryPurple hover:text-opacity-80">
                                  {activity?.transactionHash.slice(0, 6) +
                                    "..." +
                                    activity?.transactionHash.slice(-4)}
                                </span>
                              </Link>
                            </td>
                            <td className="py-4 px-4 text-jacarta-100 dark:text-jacarta-100">
                              {getAddress(activity?.spender) === getAddress(userAddr)
                                ? activity?.points
                                : 0}
                            </td>
                            <td className="py-4 px-4 text-jacarta-100 dark:text-jacarta-100">
                              {getAddress(activity?.enabler) === getAddress(userAddr)
                                ? activity?.points
                                : 0}
                            </td>
                            <td className="py-4 px-4 text-jacarta-100 dark:text-jacarta-100">
                              {getAddress(activity?.refAddr) === getAddress(userAddr)
                                ? activity?.points
                                : 0}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Activity;
