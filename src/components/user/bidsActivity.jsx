import React, { useState, useEffect, useCallback } from "react";
import { DateRangePicker } from "@nextui-org/date-picker";
import Link from "next/link";
import { useChainContext } from "../../contexts/hooks/useChainContext";
import { fetchAllMarketplaceBidsByBidder } from "../../providers/methods/fetchAllMarketplaceBids";
import formatAndRound from "../../utils/formatAndRound";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const Bids = ({ manageAddress }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredLastActivities, setFilteredLastActivities] = useState([]);
  const [marketplaceBids, setMarketplaceBids] = useState([]);

  const { currentChainObject } = useChainContext();
  const chainExplorer = currentChainObject?.explorerBaseUrl;
  const chainId = currentChainObject?.chainId;

  const formatBidTransactions = useCallback(
    (bids) => {
      let tempBids = [];

      bids.forEach(async (bid) => {
        let tempBid = {};

        if (bid?.refundProfit > 0) {
          tempBid.type = "outbid";
        } else {
          tempBid.type = "bid";
        }

        //const sdk = ThirdwebSDK.fromWallet("sepolia", {
        //  secretKey: process.env.NEXT_PUBLIC_SEPOLIA_SECRET_KEY,
        //});
        //const contract = await sdk.getContract(bid?.currency)
        //const tokenMetadata = await contract.erc20.getCurrencyMetadata();

        tempBid.date = new Date(bid?.creationTimestamp * 1000);
        tempBid.transactionHash = bid?.creationTxHash;
        tempBid.refundAmount = Number(bid?.refundProfit);
        tempBid.refundDate = new Date(bid?.lastUpdateTimestamp * 1000);
        tempBid.refundBid = Number(bid?.refundAmount) - Number(bid?.refundProfit);
        tempBid.currencyAddress = bid?.currency;
        tempBid.tokenName = bid?.listing?.token?.nftContract?.adOffers[0]?.name;
        //tempBid.currencyDecimals = tokenMetadata?.decimals;
        //tempBid.currencySymbol = tokenMetadata?.symbol;
        //tempBid.currencyName = tokenMetadata?.name;

        let currency;
        for (const key in currentChainObject?.smartContracts) {
          if (
            currentChainObject?.smartContracts[key]?.address.toLowerCase() ===
            bid?.currency.toLowerCase()
          ) {
            currency = currentChainObject?.smartContracts[key];
            break;
          }
        }

        tempBid.currency = currency;

        tempBids.push(tempBid);
      });

      return tempBids;
    },
    [currentChainObject]
  );

  useEffect(() => {
    if (startDate && endDate) {
      let filteredActivities = marketplaceBids.filter((activity) => {
        const activityDate = new Date(activity?.creationTimestamp * 1000);
        return (
          activityDate.getTime() >= startDate.getTime() &&
          activityDate.getTime() <= endDate.getTime()
        );
      });

      // use the function to format
      filteredActivities = formatBidTransactions(filteredActivities);
      filteredActivities = filteredActivities.sort((a, b) => b.date - a.date).filter(Boolean);

      setFilteredLastActivities(filteredActivities);
    } else {
      const formattedMarketplaceBids = formatBidTransactions(marketplaceBids);
      const sortedMarketplaceBids = formattedMarketplaceBids
        ?.sort((a, b) => b.date - a.date)
        .filter(Boolean);
      setFilteredLastActivities(sortedMarketplaceBids);
    }
  }, [startDate, endDate, marketplaceBids, formatBidTransactions]);

  useEffect(() => {
    const fetchMarketplaceBids = async () => {
      const data = await fetchAllMarketplaceBidsByBidder(chainId, manageAddress);
      setMarketplaceBids(data?.marketplaceBids);
    };

    if (chainId && manageAddress) {
      fetchMarketplaceBids();
    }
  }, [chainId, manageAddress]);

  const toDisplayType = (type) => {
    switch (type) {
      case "bid":
        return "Bidded";
      case "outbid":
        return "Outbidded";
      default:
        return "Bidded";
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center gap-4">
        <div className="flex w-full items-center justify-between">
          <span className="text-white text-lg font-bold">Bids</span>
          <div>
            <DateRangePicker
              size="sm"
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
          Each transaction that represents a bid or outbid on a listing is displayed here.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full rounded-2lg overflow-x-auto hide-scrollbar">
            <thead className="text-white text-left bg-primaryPurple rounded-2lg">
              <tr className="bg-jacarta-50 dark:bg-primaryPurple rounded-2lg text-base">
                <th className="py-3 px-4 font-medium text-jacarta-100 dark:text-jacarta-100">
                  Operation
                </th>
                <th className="py-3 px-4 font-medium text-jacarta-100 dark:text-jacarta-100">
                  Token
                </th>
                <th className="py-3 px-4 font-medium text-jacarta-100 dark:text-jacarta-100">
                  Date
                </th>
                <th className="py-3 px-4 font-medium text-jacarta-100 dark:text-jacarta-100">
                  Transaction Hash
                </th>
                <th className="py-3 px-4 font-medium text-jacarta-100 dark:text-jacarta-100">
                  Refund Date
                </th>
                <th className="py-3 px-4 font-medium text-jacarta-100 dark:text-jacarta-100">
                  Refund Bid
                </th>
                <th className="py-3 px-4 font-medium text-jacarta-100 dark:text-jacarta-100">
                  Refund Profit
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
                      {activity?.tokenName}
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
                          {activity?.transactionHash?.slice(0, 6) +
                            "..." +
                            activity?.transactionHash?.slice(-4)}
                        </span>
                      </Link>
                    </td>
                    <td className="py-4 px-4 text-jacarta-100 dark:text-jacarta-100">
                      {activity?.refundDate &&
                      new Date(activity?.refundDate).getTime() !==
                        new Date(activity?.date).getTime()
                        ? new Date(activity?.refundDate).toLocaleString()
                        : "-"}
                    </td>
                    <td className="py-4 px-4 text-jacarta-100 dark:text-jacarta-100">
                      {activity?.refundBid && activity?.refundBid > 0
                        ? `${formatAndRound(
                            parseFloat(activity?.refundBid) *
                              Math.pow(10, -Number(activity?.currency?.decimals))
                          )} ${activity?.currency?.symbol}`
                        : "-"}{" "}
                    </td>
                    <td className="py-4 px-4 text-jacarta-100 dark:text-jacarta-100">
                      {activity?.refundAmount && activity?.refundAmount > 0
                        ? `${formatAndRound(
                            parseFloat(activity?.refundAmount) *
                              Math.pow(10, -Number(activity?.currency?.decimals))
                          )} ${activity?.currency?.symbol}`
                        : "-"}{" "}
                      {/* TODO: to change decimals */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Bids;
