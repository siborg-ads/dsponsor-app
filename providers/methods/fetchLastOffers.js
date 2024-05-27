import { executeQuery } from "../utils/executeQuery";
import { gql } from "@apollo/client";

export default async function fetchLastOffers(chainId) {

 
const path = new URL(`https://relayer.dsponsor.com/api/${chainId}/graph`);

  const GET_DATA = gql`
    query Homepage_LastOffers {
      adOffers(orderBy: creationTimestamp, orderDirection: desc, first: 20, where: { and: [{ disable: false }] }) {
        id # offerId
        metadataURL
        nftContract {
          id # DSponsorNFT smart contract address
          allowList # defines if there is a token allowlist
          prices(where: { enabled: true }) {
            currency # ERC20 smart contract
            amount # wei, mind decimals() function to transform in human readable value !
            enabled
          }
          tokens {
            tokenId
            mint {
              transactionHash # if = null => not minted yet, so it's available
            }
            setInAllowList # define if is in allowlist
          }
        }
      }
    }
  `;

  const response = await executeQuery(path.href, GET_DATA);

  return response.adOffers;
}
