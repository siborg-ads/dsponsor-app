import { axios } from "axios";

export const fetchTokenPrice = async (tokenAddress, chainId, quantity) => {
  try {
    const response = await axios.get(
      `https://relayer.dsponsor.com/${chainId}/prices?token=${tokenAddress}&amount=${quantity}&slippage=0.3`
    );
    return response.data[tokenAddress].usd;
  } catch (error) {
    console.error("Error fetching token price", error);
  }
};