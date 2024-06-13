export const fetchMarketplaceActivity = async (chainId) => {
  const path = new URL(`https://relayer.dsponsor.com/api/${chainId}/activity`);
  const currentTimestamp = Math.floor(Date.now() / 1000);

  const response = await fetch(path.href);
  const data = await response.json();
  console.log("Data:", data);
  return data;
};
