import React, { useState, useEffect, useRef } from "react";
import handleCopy from "../../utils/handleCopy";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { activated_features } from "../../data/activated_features";
import Link from "next/link";
import { useChainContext } from "../../contexts/hooks/useChainContext";
import { getAddress } from "ethers/lib/utils";
import { DateRangePicker } from "@nextui-org/date-picker";
import { ClipboardIcon, ShareIcon } from "@heroicons/react/20/solid";

const Activity = ({ isUserConnected, userAddr, chainId }) => {
  const [copied, setCopied] = useState(false);
  const [, setUserData] = useState(null);
  const [ranking, setRanking] = useState(null);
  const [lastActivities, setLastActivities] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredLastActivities, setFilteredLastActivities] = useState(null);
  const [mount, setMount] = useState(false);

  let frontURL;
  if (typeof window !== "undefined") {
    frontURL = window.location.origin;
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
      setMount(true);
    };

    if (userAddr && chainId && !mount) {
      fetchData();
    }
  }, [userAddr, chainId, mount]);

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

      <div className="flex flex-col justify-center max-w-4xl mx-auto">
        <div className="flex flex-col justify-center gap-8">
          <div className="flex flex-col gap-2">
            {isUserConnected && (
              <>
                <p className="text-left text-xs text-jacarta-100">
                  Data is updated every 15 minutes
                </p>

                <div className="dark:bg-secondaryBlack dark:text-jacarta-100 rounded-2lg bg-white p-3 flex gap-4 justify-center items-center">
                  <p className="text-center text-white">
                    The more active you are on the platform, the more boxes you earn! The more boxes
                    you have, the better the surprises you&apos;ll get. You gain boxes by
                    participating in a token sale, whether as a buyer, seller, or even a referrer!
                    💸
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col justify-center gap-16 mt-4">
            <div className={`flex flex-col gap-16`}>
              {isUserConnected && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-4">
                    <span className="text-white text-lg font-bold">Your Referrals</span>

                    <div className="flex flex-col h-full bg-primaryPurple text-white items-center justify-center p-4 rounded-2lg">
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold">
                          {ranking?.nbProtocolFeeReferrals}
                        </span>
                        <span>Number of Referrals</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <span className="text-white text-lg font-bold">Share your referral link</span>

                    <div className="flex flex-col justify-between h-full gap-4">
                      <div className="flex gap-4 items-center w-full">
                        <div className="relative w-full h-full">
                          <input
                            ref={inputRef}
                            disabled
                            value={`${frontURL}/?_rid=${userAddr}`}
                            className="pr-12 h-full w-full bg-secondaryBlack border hover:border-opacity-20 border-white border-opacity-10 rounded-2lg p-2 focus:border-white focus:border-opacity-20 focus:ring-transparent dark:bg-secondaryBlack dark:text-white"
                          />
                          <Tippy
                            content={copied ? "Copied!" : "Copy"}
                            placement="top"
                            trigger="click"
                          >
                            <button
                              onClick={() => {
                                handleCopy(`${frontURL}/?_rid=${userAddr}`, setCopied);
                              }}
                              className="absolute right-0 top-0 h-full px-4 text-white hover:text-jacarta-100 rounded-r-lg"
                            >
                              <ClipboardIcon className="h-5 w-5" />
                            </button>
                          </Tippy>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 h-full">
                        <button
                          onClick={() => {
                            const text = encodeURIComponent(
                              `Participate in @siborgapp's "bid to earn" auction to secure ad space NFT on @siborgapp search results!\n\nEarn perks with boxes and get rewarded when outbid! 💰\n\n#Web3Monetization #DigitalRWA #SiBorgAds\n ${frontURL}/?_rid=${userAddr}`
                            );
                            const url = `https://twitter.com/intent/tweet?text=${text}`;
                            window.open(url, "_blank");
                          }}
                          className={`bg-primaryPurple hover:bg-opacity-80 rounded-2lg text-white p-2 flex items-center justify-center text-center gap-2`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            viewBox="0 0 50 50"
                            className="text-white w-5 h-5 fill-white"
                          >
                            <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"></path>
                          </svg>
                          Share on X / Twitter
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
                          <span className="flex items-center justify-center gap-2 w-full text-center">
                            <ShareIcon className="w-5 h-5" />
                            Share on social media
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col justify-center gap-4">
                <span className="text-white text-lg font-bold">Activity</span>
                <div className={`grid grid-cols-2 md:grid-cols-4 gap-4`}>
                  <div className="flex flex-col bg-primaryPurple text-white items-center justify-center p-4 rounded-2lg">
                    <span className="text-2xl font-bold">{ranking?.points ?? 0}</span>
                    <span>Boxes</span>
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
            </div>

            <div className="flex flex-col justify-center gap-4">
              <div className="flex w-full items-center justify-between">
                <span className="text-white text-lg font-bold">Transactions</span>
                <div>
                  <DateRangePicker
                    onChange={(value) => {
                      const startDateObject = value?.start;
                      const endDateObject = value?.end;

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

              <p className="text-jacarta-100 text-sm">
                Each transaction where a sale or auction closes rewards the seller, buyer, and
                referrer based on the amount paid. Here are the transactions for each role that
                reward this profile.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full rounded-2lg overflow-x-auto hide-scrollbar">
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
                        Buyer Boxes
                      </th>
                      <th className="py-3 px-4 font-medium text-jacarta-100 dark:text-jacarta-100">
                        Seller Boxes
                      </th>
                      <th className="py-3 px-4 font-medium text-jacarta-100 dark:text-jacarta-100">
                        Referrer Boxes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="rounded-2lg overflow-x-auto">
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
        </div>
      </div>
    </>
  );
};

export default Activity;
