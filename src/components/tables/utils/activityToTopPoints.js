import { getAddress } from "ethers/lib/utils";

/**
 * Converts activity data to top holders format.
 * @param {Array} activity - The activity data.
 * @returns {Array} Formatted top holders data.
 */
const activityToTopPoints = (activity, userAddress) => {
  if (userAddress === undefined) {
    return activity
      .sort((a, b) => a.totalProtocolFeeRank - b.totalProtocolFeeRank)
      .map((ranking) => ({
        rank: ranking.totalProtocolFeeRank,
        totalPoints: ranking.points,
        addressDisplay: ranking.displayAddr,
        address: ranking.addr
      }));
  }

  const userActivity = activity.filter((item) => getAddress(item.addr) === getAddress(userAddress));
  const otherActivity = activity;

  const sortedOtherActivity = otherActivity.sort(
    (a, b) => a.totalProtocolFeeRank - b.totalProtocolFeeRank
  );

  const sortedActivity = [...userActivity, ...sortedOtherActivity];

  return sortedActivity.map((ranking) => ({
    rank: ranking.totalProtocolFeeRank,
    totalPoints: ranking.points,
    addressDisplay: getAddress(ranking.addr) === getAddress(userAddress) ? "You" : ranking.addr,
    address: ranking.addr
  }));
};

export default activityToTopPoints;
