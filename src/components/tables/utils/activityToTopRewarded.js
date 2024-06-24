import { getAddress } from "ethers/lib/utils";

/**
 * Converts activity data to top rewarded format.
 * @param {Array} activity - The activity data.
 * @param {string} userAddress - The user's address.
 * @returns {Array} Formatted top rewarded data.
 */
const activityToTopRewarded = (activity, userAddress) => {
  if (userAddress === undefined) {
    return activity
      .sort((a, b) => a.bidRefundsRank - b.bidRefundsRank)
      .map((ranking) => ({
        rank: ranking.bidRefundsRank,
        totalReceived: ranking.usdcAmounts.bidRefundReceived,
        addressDisplay: ranking.displayAddr,
        address: ranking.addr,
        refunds: ranking.nbRefunds,
        chainId: ranking.chainId,
        dPoints: ranking.dPoints ?? 0,
        details: Object.entries(ranking.currenciesAmounts || {}).map(([currency, amounts]) => ({
          currency,
          totalReceived: amounts.bidRefundReceived
        }))
      }));
  }

  const userActivity = activity.filter((item) => getAddress(item.addr) === getAddress(userAddress));
  const otherActivity = activity;

  const sortedOtherActivity = otherActivity.sort((a, b) => a.bidRefundsRank - b.bidRefundsRank);

  const sortedActivity = [...userActivity, ...sortedOtherActivity];

  return sortedActivity.map((ranking) => ({
    rank: ranking.bidRefundsRank,
    totalReceived: ranking.usdcAmounts.bidRefundReceived,
    addressDisplay: getAddress(ranking.addr) === getAddress(userAddress) ? "You" : ranking.addr,
    address: ranking.addr,
    refunds: ranking.nbRefunds,
    chainId: ranking.chainId,
    dPoints: ranking.dPoints ?? 0,
    details: Object.entries(ranking.currenciesAmounts || {}).map(([currency, amounts]) => ({
      currency,
      totalReceived: amounts.bidRefundReceived
    }))
  }));
};

export default activityToTopRewarded;
