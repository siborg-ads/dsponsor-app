/**
 * Converts activity data to top holders format.
 * @param {Array} activity - The activity data.
 * @returns {Array} Formatted top holders data.
 */
const activityToTopHolders = (activity) => {

    return activity
        .sort((a, b) => a.holdersRank - b.holdersRank)
        .map((ranking) => ({
            rank: ranking.holdersRank,
            totalSpent: ranking.usdcAmounts.totalSpent,
            addressDisplay: ranking.displayAddr,
            address: ranking.addr,
            balance: ranking.balance,
            chainId: ranking.chainId,
            dPoints: ranking.dPoints,
            details: Object.entries(ranking.currenciesAmounts || {}).map(([currency, amounts]) => ({
                currency,
                totalSpent: amounts.totalSpent
            }))
        }));
};

export default activityToTopHolders;
