import config from "@/config/config";
import { Address } from "thirdweb";

/**
 * Fetches all offers profile for a given user address and chain ID.
 *
 * @param {string} userAddress - The address of the user. - Hard fix : for now userAddress is not used in the query
 * @param {number} chainId - The ID of the blockchain chain.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of offer profiles.
 */
export const fetchAllOffersProfile = async (userAddress: Address, chainId: number) => {
  const relayerURL = config[chainId].relayerURL;

  const responseFetch = await fetch(`${relayerURL}/api/${chainId}/account/${userAddress}`);
  const { data } = await responseFetch.json();

  const chainConfig = config[chainId];

  const resultMappedData = data?.adOffers
    .map((element) => {
      const sortByTokenId = element.nftContract.tokens.sort((a, b) => {
        const tokenIdA = BigInt(a.tokenId);
        const tokenIdB = BigInt(b.tokenId);
        if (tokenIdA < tokenIdB) return -1;
        if (tokenIdA > tokenIdB) return 1;
        return 0;
      });

      const tokenIdAllowedToMint =
        sortByTokenId.find((token) => token.mint === null)?.tokenId || false;

      const combinedData = {
        ...element,
        chainConfig: chainConfig,
        tokenIdAllowedToMint: tokenIdAllowedToMint
      };

      return combinedData;
    })
    .filter((item) => item !== null);

  return resultMappedData;
};
