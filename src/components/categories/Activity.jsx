import React, { useState, useEffect, useRef } from "react";
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

  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [copied]);

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

      <div className="flex flex-col justify-center gap-8 max-w-4xl mx-auto">
        {isUserConnected && (
          <>
            <div className="flex flex-col justify-center gap-4">
              <div className="flex flex-col gap-2">
                <p className="text-left text-xs text-jacarta-100">
                  Data is updated every 15 minutes
                </p>
                <div className="dark:bg-secondaryBlack dark:text-jacarta-100 rounded-2lg bg-white p-3 flex gap-4 justify-center items-center">
                  <p className="text-center text-white">
                    The more active you are on the platform, the more points you earn! The more
                    points you have, the better the surprises you&apos;ll get. You gain points by
                    participating in a token sale, whether as a buyer, seller, or even a referrer!
                    💸
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-8 mt-4">
                <div className="flex flex-col gap-4">
                  <span className="text-white text-lg font-bold">Share your referral code</span>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col bg-primaryPurple text-white items-center justify-center p-4 rounded-2lg">
                      <span className="text-2xl font-bold">{0}</span>
                      <span>Number of Referrals</span>
                    </div>

                    <div className="flex flex-col text-white items-start justify-between">
                      <Tippy
                        hideOnClick={false}
                        content={copied ? <span>copied</span> : <span>copy</span>}
                      >
                        <input
                          ref={inputRef}
                          disabled
                          onClick={() => {
                            handleCopy(`${frontURL}/?_rid=${userAddr}`, setCopied);
                            inputRef.current.select();
                          }}
                          value={`${frontURL}/?_rid=${userAddr}`}
                          className="border border-secondaryBlack bg-secondaryBlack disabled bg-opacity-50 p-2 text-center rounded-2lg w-full"
                        />
                      </Tippy>
                      <div className="flex items-center justify-start gap-2 w-full">
                        <button
                          onClick={() => {
                            const text = encodeURIComponent(
                              `Use my referral code on SiBorg Ads.\n ${frontURL}/?_rid=${userAddr}`
                            );
                            const url = `https://twitter.com/intent/tweet?text=${text}`;
                            window.open(url, "_blank");
                          }}
                          className={`bg-primaryPurple hover:bg-opacity-80 rounded-2lg text-white p-2`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-twitter-x"
                            viewBox="0 0 16 16"
                          >
                            <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                          </svg>
                        </button>

                        <button
                          onClick={() => {
                            if (navigator.share) {
                              navigator
                                .share({
                                  title: "My referral code",
                                  text: `You can now use my referral code on SiBorg Ads.\n ${frontURL}/?_rid=${userAddr}`,
                                  url: `${frontURL}/?_rid=${userAddr}`
                                })
                                .then(() => console.log("Successful share"))
                                .catch((error) => console.log("Error sharing", error));
                            } else {
                              console.log("Web Share API is not supported in this browser");
                            }
                          }}
                          className={`bg-primaryPurple hover:bg-opacity-80 rounded-2lg text-center flex items-center justify-center text-white p-2 w-full`}
                        >
                          <span className="text-sm flex items-center justify-center gap-1 w-full text-center">
                            <span>Share your code</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              width="16"
                              height="16"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M15.75 2.25H21a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V4.81L8.03 17.03a.75.75 0 0 1-1.06-1.06L19.19 3.75h-3.44a.75.75 0 0 1 0-1.5Zm-10.5 4.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V10.5a.75.75 0 0 1 1.5 0v8.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3h8.25a.75.75 0 0 1 0 1.5H5.25Z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

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
                      <span>Outbids</span>
                    </div>

                    <div className="flex flex-col bg-primaryPurple text-white items-center justify-center p-4 rounded-2lg">
                      <span className="text-2xl font-bold">
                        ${ranking?.usdcAmounts.bidRefundReceived ?? 0}
                      </span>
                      <span>Rewarded</span>
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
