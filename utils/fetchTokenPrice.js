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
