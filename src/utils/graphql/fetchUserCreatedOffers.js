import { executeQuery } from "../utils/executeQuery";

/**
 * Fetches all offers created by a specific user (address) on a given blockchain.
 * 
 * This function queries a GraphQL API to retrieve ad offers where the provided address is listed as an admin. It returns
 * detailed information about each offer, including all proposals associated with the offer.
 * 
 * @param {string} address - The address of the user whose created offers are to be fetched.
 * @param {string} chainId - The ID of the blockchain chain to query.
 * @returns {Promise<Object>} - A promise that resolves to the response containing ad offers created by the specified user.
 */
export const fetchUserCreatedOffers = async (address, chainId) => {
  const path = new URL(`https://relayer.dsponsor.com/api/${chainId}/graph`);

  const GET_DATA = `
        query getOffers($address: String!) {
            adOffers(first: 1000, where: { admins_contains: [$address] }) {
                id  
                name
                allProposals {
                    id
                    adOffer
                    token
                    adParameter
                    status
                    data
                    rejectReason
                    creationTimestamp
                    lastUpdateTimestamp
                }
            }
        }
      `;

  const response = await executeQuery(path.href, GET_DATA, { address });

  return response;
};
