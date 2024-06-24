import { getAddress } from "ethers/lib/utils";

/**
 * Converts activity data to top holders format.
 * @param {Array} activity - The activity data.
 * @returns {Array} Formatted top holders data.
 */
const activityToTopHolders = (activities, userAddress) => {
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

  if (userAddress === undefined) {
    return activities
      .sort((a, b) => b.points - a.points)
      .map((activity) => ({
        type: toDisplayType(activity.type),
        date: new Date(activity.date).toLocaleString(),
        transactionHash:
          activity.transactionHash.slice(0, 6) + "..." + activity.transactionHash.slice(-4),
        fullTransactionHash: activity.transactionHash,
        points: activity.points,
        spender: activity.spender,
        enabler: activity.enabler,
        refAddr: activity.refAddr,
        spenderDisplayAddr: activity.spender,
        enablerDisplayAddr: activity.enabler,
        refAddrDisplayAddr: activity.refAddr
      }));
  }

  const userActivity = activities.filter(
    (item) => getAddress(item.spender) === getAddress(userAddress)
  );
  const otherActivity = activities;

  const sortedOtherActivity = otherActivity.sort((a, b) => b.points - a.points);

  const sortedActivity = [...userActivity, ...sortedOtherActivity];

  return sortedActivity.map((activity) => ({
    type: toDisplayType(activity.type),
    date: new Date(activity.date).toLocaleString(),
    transactionHash:
      activity.transactionHash.slice(0, 6) + "..." + activity.transactionHash.slice(-4),
    fullTransactionHash: activity.transactionHash,
    points: activity.points,
    spender: getAddress(activity.spender),
    enabler: getAddress(activity.enabler),
    refAddr: getAddress(activity.refAddr),
    spenderDisplayAddr:
      getAddress(activity.spender) === getAddress(userAddress) ? "You" : activity.spender,
    enablerDisplayAddr:
      getAddress(activity.enabler) === getAddress(userAddress) ? "You" : activity.enabler,
    refAddrDisplayAddr:
      getAddress(activity.refAddr) === getAddress(userAddress) ? "You" : activity.refAddr,
    address:
      getAddress(activity.refAddr) === getAddress(userAddress) ||
      getAddress(activity.enabler) === getAddress(userAddress) ||
      getAddress(activity.spender) === getAddress(userAddress)
        ? getAddress(userAddress)
        : getAddress(activity.refAddr)
  }));
};

export default activityToTopHolders;
