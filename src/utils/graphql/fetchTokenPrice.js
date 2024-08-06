/**
 * Fetches the price of a specific token in terms of USDC.
 * 
 * This function queries a pricing API to get the value of a given token address and amount in USDC. It handles the request
 * and parses the response to return the formatted price. The function also includes error handling to catch and log any 
 * issues during the fetch operation.
 * 
 * @param {string} tokenAddress - The address of the token for which the price is to be fetched.
 * @param {string} chainId - The ID of the blockchain chain to query.
 * @param {number} amount - The amount of the token for which the price is being requested.
 * @returns {Promise<string | undefined>} - A promise that resolves to the formatted price of the token in USDC, or undefined 
 *                                         if there was an error.
 */
export const fetchTokenPrice = async (tokenAddress, chainId, amount) => {
  try {
    const path = `https://relayer.dsponsor.com/api/${chainId}/prices?token=${tokenAddress}&amount=${amount}&slippage=0.3`;
    const response = await fetch(path);
    const json = await response.json();

    return json.amountUSDCFormatted;
  } catch (error) {
    console.error("Error fetching token price", error);
  }
};
