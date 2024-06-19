import React, { useState, useEffect, useRef } from "react";
import handleCopy from "../../utils/handleCopy";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { activated_features } from "../../data/activated_features";
import Link from "next/link";
import { useChainContext } from "../../contexts/hooks/useChainContext";
import { getAddress } from "ethers/lib/utils";
import { DateRangePicker } from "@nextui-org/date-picker";
import { ClipboardIcon } from "@heroicons/react/20/solid";

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

      <div className="flex flex-col justify-center gap-8 max-w-4xl mx-auto">
        <>
          <div className="flex flex-col justify-center gap-4">
            <div className="flex flex-col gap-2">
              {isUserConnected && (
                <>
                  <p className="text-left text-xs text-jacarta-100">
                    Data is updated every 15 minutes
                  </p>

                  <div className="dark:bg-secondaryBlack dark:text-jacarta-100 rounded-2lg bg-white p-3 flex gap-4 justify-center items-center">
                    <p className="text-center text-white">
                      The more active you are on the platform, the more boxes you earn! The more
                      boxes you have, the better the surprises you&apos;ll get. You gain boxes by
                      participating in a token sale, whether as a buyer, seller, or even a referrer!
                      💸
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col justify-center gap-8 mt-4">
              {isUserConnected && (
                <div className="flex flex-col gap-4">
                  <span className="text-white text-lg font-bold">Share your referral link</span>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col bg-primaryPurple text-white items-center justify-center p-4 rounded-2lg">
                      <span className="text-2xl font-bold">{ranking?.nbProtocolFeeReferrals}</span>
                      <span>Number of Referrals</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => {
                          const text = encodeURIComponent(
                            `Participate in @siborgapp's "bid to earn" auction to secure ad space NFT on @siborgapp search results!\n\nEarn perks with boxes and get rewarded when outbid! 💰\n\n#Web3Monetization #DigitalRWA #SiBorgAds\n ${frontURL}/?_rid=${userAddr}`
                          );
                          const url = `https://twitter.com/intent/tweet?text=${text}`;
                          window.open(url, "_blank");
                        }}
                        className={`bg-primaryPurple hover:bg-opacity-80 rounded-2lg text-white p-2 flex items-center justify-center text-center`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            width="32"
                            height="32"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                            />
                          </svg>
                        </span>
                      </button>
                    </div>

                    <div className="col-span-2 md:grid md:grid-cols-1 gap-4 text-white">
                      <div className="flex gap-4 items-center">
                        <input
                          ref={inputRef}
                          disabled
                          value={`${frontURL}/?_rid=${userAddr}`}
                          className="border border-secondaryBlack bg-secondaryBlack disabled bg-opacity-50 p-2 text-center rounded-2lg w-full"
                        />

                        <Tippy
                          hideOnClick={false}
                          content={copied ? <span>copied</span> : <span>copy</span>}
                        >
                          <button
                            className="flex md:hidden items-center justify-center bg-primaryPurple hover:bg-opacity-80 rounded-2lg text-white p-2"
                            onClick={() => {
                              handleCopy(`${frontURL}/?_rid=${userAddr}`, setCopied);
                              inputRef.current.select();
                            }}
                          >
                            <ClipboardIcon className="w-5 h-5" />
                          </button>
                        </Tippy>
                      </div>

                      <div className="hidden md:flex items-center justify-center gap-2 w-full">
                        <Tippy
                          hideOnClick={false}
                          content={copied ? <span>copied</span> : <span>copy</span>}
                        >
                          <button
                            onClick={() => {
                              handleCopy(`${frontURL}/?_rid=${userAddr}`, setCopied);
                              inputRef.current.select();
                            }}
                            className="bg-primaryPurple hover:bg-opacity-80 rounded-2lg text-white p-2 w-full"
                          >
                            <span className="text-sm flex items-center justify-center gap-1 w-full">
                              <ClipboardIcon className="w-5 h-5" />
                              Copy your referral link
                            </span>
                          </button>
                        </Tippy>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col justify-center gap-4">
                <span className="text-white text-lg font-bold">Activity</span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

              <div className="flex flex-col justify-center gap-4">
                <div className="flex w-full items-center justify-between">
                  <span className="text-white text-lg font-bold">Transactions</span>
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

                <p className="text-jacarta-100 text-sm">
                  Each transaction where a sale or auction closes rewards the seller, buyer, and
                  referrer based on the amount paid. Here are the transactions for each role that
                  reward this profile.
                </p>

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
      </div>
    </>
  );
};

export default Activity;
