import { getAddress } from "ethers/lib/utils";

/**
 * Converts activity data to top spenders format.
 * @param {Array} activity - The activity data.
 * @returns {Array} Formatted top spenders data.
 */
const activityToTopSpenders = (activity, userAddress) => {
  if (userAddress === undefined) {
    return activity
      .sort((a, b) => a.spendersRank - b.spendersRank)
      .map((ranking) => ({
        rank: ranking.spendersRank,
        totalSpent: ranking.usdcAmounts.totalSpent,
        addressDisplay: ranking.displayAddr,
        points: ranking.points,
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
  const otherActivity = activity.filter(
    (item) => getAddress(item.addr) !== getAddress(userAddress)
  );

  const sortedOtherActivity = otherActivity.sort((a, b) => a.spendersRank - b.spendersRank);

  const sortedActivity = [...userActivity, ...sortedOtherActivity];

  return sortedActivity.map((ranking) => ({
    rank: ranking.spendersRank,
    totalSpent: ranking.usdcAmounts.totalSpent,
    addressDisplay: ranking.displayAddr,
    points: ranking.points,
    address: ranking.addr,
    balance: ranking.balance,
    dPoints: ranking.dPoints ?? 0,
    chainId: ranking.chainId,
    details: Object.entries(ranking.currenciesAmounts || {}).map(([currency, amounts]) => ({
      currency,
      totalSpent: amounts.totalSpent
    }))
  }));
};

export default activityToTopSpenders;
