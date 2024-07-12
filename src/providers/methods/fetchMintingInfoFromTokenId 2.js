import { executeQuery } from "../utils/executeQuery";

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
