import { executeQuery } from "../utils/executeQuery";

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
