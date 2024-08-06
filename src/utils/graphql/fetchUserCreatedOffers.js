import { executeQuery } from "../utils/executeQuery";

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
