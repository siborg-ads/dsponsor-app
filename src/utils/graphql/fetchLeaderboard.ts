/**
 * Fetches marketplace activity data for a given chain ID.
 * 
 * Retrieves activity data from the marketplace API endpoint for the specified blockchain chain.
 * This function provides information on recent activities in the marketplace, such as transactions,
 * events, or other relevant activities.
 *
 * @param {string} chainId - The ID of the blockchain chain to fetch activity data from.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the marketplace activity data.
 */
export const fetchLeaderboard = async (chainId) => {
  const path = new URL(`https://relayer.dsponsor.com/api/${chainId}/activity`);

  const response = await fetch(path.href);
  const data = await response.json();
  return data;
};
