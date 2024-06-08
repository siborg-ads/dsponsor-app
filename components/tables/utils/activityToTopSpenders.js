/**
 * Converts activity data to top spenders format.
 * @param {Array} activity - The activity data.
 * @returns {Array} Formatted top spenders data.
 */
const activityToTopSpenders = (activity) => {
    return activity
        .sort((a, b) => a.spendersRank - b.spendersRank)
        .map((ranking) => ({
            rank: ranking.spendersRank,
            totalSpent: ranking.usdcAmounts.totalSpent,
            address: ranking.displayAddr,
            balance: ranking.balance,
            chainId: ranking.chainId,
            details: Object.entries(ranking.currenciesAmounts || {}).map(([currency, amounts]) => ({
                currency,
                totalSpent: amounts.totalSpent
            }))
        }));
};

export default activityToTopSpenders;
