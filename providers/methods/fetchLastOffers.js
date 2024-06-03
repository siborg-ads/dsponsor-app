import { executeQuery } from "../utils/executeQuery";
import { gql } from "@apollo/client";
import config from "../utils/config";

export default async function fetchLastOffers(chainId) {
  const path = new URL(`https://relayer.dsponsor.com/api/${chainId}/graph`);

  const GET_DATA = gql`
    query Homepage_LastOffers {
      adOffers(orderBy: creationTimestamp, orderDirection: desc, first: 50, where: { and: [{ disable: false }] }) {
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
  const chainConfig = config[chainId];

  const resultMappedData = response.adOffers
    .map((element) => {
      const sortByTokenId = element.nftContract.tokens.sort((a, b) => a.tokenId - b.tokenId);
      const tokenIdAllowedToMint = sortByTokenId.find((token) => token.mint === null)?.tokenId || false;

      const combinedData = {
        ...element,
        chainConfig: chainConfig,
        tokenIdAllowedToMint: tokenIdAllowedToMint,
      };

      if (!tokenIdAllowedToMint && element.nftContract.allowList === true) {
        return null;
      }

      return combinedData;
    })
    .filter((item) => item !== null);

  return resultMappedData;
}
