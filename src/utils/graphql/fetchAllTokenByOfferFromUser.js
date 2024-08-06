import config from "../../config/config";

/**
 * Fetches all tokens owned by a specific user address for a given blockchain chain ID.
 *
 * @param {string} ownerAddress - The address of the user whose tokens are to be fetched.
 * @param {string} chainId - The ID of the blockchain chain to fetch tokens from.
 * @returns {Promise<Array>} - A promise that resolves to an array of tokens owned by the user, with additional chain configuration.
 */
export const fetchAllTokenByOfferFromUser = async (ownerAddress, chainId) => {
  const options = { method: "GET", headers: { accept: "application/json" } };
  const response = await fetch(
    `https://relayer.dsponsor.com/api/${chainId}/account/${ownerAddress}/tokens`,
    options
  );

  const data = await response.json();

  const resultMappedData = data?.map((item) => {
    const combinedData = {
      ...item,
      chainConfig: config[chainId]
    };
    return combinedData;
  });

  return resultMappedData;
};
