import { executeQuery } from "../utils/executeQuery";
import { gql } from "@apollo/client";

export const fetchAllTokenByOfferForAuser = async (ownerAddress, chainId) => {
  const options = { method: "GET", headers: { accept: "application/json" } };
const response = await fetch(`https://relayer.dsponsor.com/api/${chainId}/account/${ownerAddress}/tokens`, options);
const data = await response.json();

  return data;
};
