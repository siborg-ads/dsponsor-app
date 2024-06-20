import { user } from "@nextui-org/react";
import { getAddress } from "ethers/lib/utils";

/**
 * Converts activity data to top holders format.
 * @param {Array} activity - The activity data.
 * @param {string} userAddress - The user's address.
 * @returns {Array} Formatted top holders data.
 */
const activityToTopHolders = (activity, userAddress) => {
  if (userAddress === undefined) {
    return activity.map((ranking) => ({
      rank: ranking.holdersRank,
      totalSpent: ranking.usdcAmounts.totalSpent,
      addressDisplay: ranking.displayAddr,
      address: ranking.addr,
      balance: ranking.balance,
      chainId: ranking.chainId,
      dPoints: ranking.dPoints ?? 0,
      details: Object.entries(ranking.currenciesAmounts || {}).map(([currency, amounts]) => ({
        currency,
        totalSpent: amounts.totalSpent
      }))
    }));
  }

  const userActivity = activity.filter((item) => getAddress(item.addr) === getAddress(userAddress));
  const otherActivity = activity;

  const sortedOtherActivity = otherActivity.sort((a, b) => a.holdersRank - b.holdersRank);

  const sortedActivity = [...userActivity, ...sortedOtherActivity];

  return sortedActivity.map((ranking) => ({
    rank: ranking.holdersRank,
    totalSpent: ranking.usdcAmounts.totalSpent,
    addressDisplay: getAddress(ranking.addr) === getAddress(userAddress) ? "You" : ranking.addr,
    address: ranking.addr,
    balance: ranking.balance,
    chainId: ranking.chainId,
    dPoints: ranking.dPoints ?? 0,
    details: Object.entries(ranking.currenciesAmounts || {}).map(([currency, amounts]) => ({
      currency,
      totalSpent: amounts.totalSpent
    }))
  }));
};

export default activityToTopHolders;
