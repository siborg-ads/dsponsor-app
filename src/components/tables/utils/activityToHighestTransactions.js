/**
 * Converts activity data to top holders format.
 * @param {Array} activity - The activity data.
 * @returns {Array} Formatted top holders data.
 */
const activityToTopHolders = (activities) => {
  console.log("activity", activities);

  const toDisplayType = (type) => {
    let displayType;

    switch (type) {
      case "buy":
        displayType = "Buy";
        break;
      case "auction":
        displayType = "Auction closed";
        break;
      case "mint":
        displayType = "Mint";
        break;
      default:
        displayType = "Unknown";
        break;
    }

    return displayType;
  };

  return activities
    .sort((a, b) => b.points - a.points)
    .map((activity) => ({
      type: toDisplayType(activity.type),
      date: new Date(activity.date).toLocaleString(),
      transactionHash:
        activity.transactionHash.slice(0, 6) + "..." + activity.transactionHash.slice(-4),
      points: activity.points,
      spender: activity.spender,
      enabler: activity.enabler,
      refAddr: activity.refAddr
    }));
};

export default activityToTopHolders;
