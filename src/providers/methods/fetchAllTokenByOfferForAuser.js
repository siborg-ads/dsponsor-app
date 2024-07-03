import config from "../../config/config";

export const fetchAllTokenByOfferForAuser = async (ownerAddress, chainId) => {
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
