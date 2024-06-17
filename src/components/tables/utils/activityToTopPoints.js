/**
 * Converts activity data to top holders format.
 * @param {Array} activity - The activity data.
 * @returns {Array} Formatted top holders data.
 */
const activityToTopPoints = (activity) => {
  return activity
    .sort((a, b) => a.totalProtocolFeeRank - b.totalProtocolFeeRank)
    .map((ranking) => ({
      rank: ranking.totalProtocolFeeRank,
      totalPoints: ranking.points,
      addressDisplay: ranking.displayAddr,
      address: ranking.addr
    }));
};

export default activityToTopPoints;
