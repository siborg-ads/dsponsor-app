export const fetchMarketplaceActivity = async (chainId) => {
  const path = new URL(`https://relayer.dsponsor.com/api/${chainId}/activity`);

  const response = await fetch(path.href);
  const data = await response.json();
  return data;
};
