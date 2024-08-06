import { executeQuery } from "../utils/executeQuery";

/**
 * Fetches minting information for a given token ID on a specific blockchain chain.
 * 
 * Retrieves details about the minting process of a token, including the currency used and the amount
 * involved in the minting process.
 *
 * @param {string} tokenId - The ID of the token to fetch minting information for.
 * @param {string} chainId - The ID of the blockchain chain to query.
 * @returns {Promise<Object>} - A promise that resolves to an object containing minting information
 *                               for the specified token ID.
 */
export const fetchMintingInfoFromTokenId = async (tokenId, chainId) => {
  const path = new URL(`https://relayer.dsponsor.com/api/${chainId}/graph`);
  const GET_DATA = `
    query mintingInfo($tokenId: ID!) {
        tokens(first: 1000, where: { id: $tokenId }) {
            id
            mint {
                currency
                amount
            }
        }
    }
  `;

  const response = await executeQuery(path.href, GET_DATA);

  return response;
};
