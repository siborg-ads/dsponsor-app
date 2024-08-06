import { executeQuery } from "../utils/executeQuery";

/**
 * Fetches detailed minting and marketplace listing information for a given token ID on a specific blockchain chain.
 * 
 * Retrieves details about the token's minting process, including the currency, amount, and transactions involved.
 * Additionally, it fetches information about direct buys associated with the token's marketplace listings,
 * such as buyer details, seller recipient, total price paid, and revenue transaction timestamps.
 *
 * @param {string} tokenId - The ID of the token to fetch information for.
 * @param {string} chainId - The ID of the blockchain chain to query.
 * @returns {Promise<Object>} - A promise that resolves to an object containing detailed minting
 *                               and marketplace listing information for the specified token ID.
 */
export const fetchMintingInfoFromTokenId = async (tokenId, chainId) => {
  const path = new URL(`https://relayer.dsponsor.com/api/${chainId}/graph`);

  const GET_DATA = `
    query {
        tokens(first: 1000, where: { id: "${tokenId}" }) {
            id
            marketplaceListings {
              directBuys {
                buyer
                sellerRecipient
                totalPricePaid
                listing {
                  id
                  listingType
                  currency
                }
                revenueTransaction {
                  blockTimestamp
                }
              }
            }
            mint {
              currency
              amount
              from
              to
              revenueTransaction {
                blockTimestamp
              }
            }
        }
    }
  `;

  const response = await executeQuery(path.href, GET_DATA);

  return response;
};
