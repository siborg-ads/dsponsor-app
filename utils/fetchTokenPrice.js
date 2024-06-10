import axios from "axios";

export const fetchTokenPrice = async (tokenAddress, chainId, amount) => {
  try {
    const response = await axios.get(
      `https://relayer.dsponsor.com/api/${chainId}/prices?token=${tokenAddress}&amount=${amount}&slippage=0.3`
    );
    return response.data.amountUSDCFormatted;
  } catch (error) {
    console.error("Error fetching token price", error);
  }
};
