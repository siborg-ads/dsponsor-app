/**
 * Converts activity data to top rewarded format.
 * @param {Array} activity - The activity data.
 * @returns {Array} Formatted top rewarded data.
 */
const activityToTopRewarded = (activity) => {
    return activity
        .sort((a, b) => a.bidRefundsRank - b.bidRefundsRank)
        .map((ranking) => ({
            rank: ranking.bidRefundsRank,
            totalReceived: ranking.usdcAmounts.bidRefundReceived,
            address: ranking.displayAddr,
            refunds: ranking.nbRefunds,
            chainId: ranking.chainId,
            details: Object.entries(ranking.currenciesAmounts || {}).map(([currency, amounts]) => ({
                currency,
                totalReceived: amounts.bidRefundReceived
            }))
        }));
};

export default activityToTopRewarded;
