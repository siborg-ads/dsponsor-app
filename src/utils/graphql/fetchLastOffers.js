import { executeQuery } from "../utils/executeQuery";
import config from "../../config/config";

/**
 * Fetches the most recent offers from the blockchain for a given chain ID.
 * 
 * Retrieves the last 50 offers, ordered by creation timestamp in descending order, and includes details
 * about the offer, associated NFT contract, and token information.
 *
 * @param {string} chainId - The ID of the blockchain chain to fetch offers from.
 * @returns {Promise<Array>} - A promise that resolves to an array of recent offers, with additional chain configuration.
 */
export default async function fetchLastOffers(chainId) {
  const path = new URL(`https://relayer.dsponsor.com/api/${chainId}/graph`);

  const GET_DATA = `
    query Homepage_LastOffers {
      adOffers(
        orderBy: creationTimestamp
        orderDirection: desc
        first: 50
        where: { and: [{ disable: false }] }
      ) {
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
          tokens(fist: 1000) {
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
      const tokenIdAllowedToMint =
        sortByTokenId.find((token) => token.mint === null)?.tokenId || false;

      const combinedData = {
        ...element,
        chainConfig: chainConfig,
        tokenIdAllowedToMint: tokenIdAllowedToMint
      };

      if (!tokenIdAllowedToMint && element.nftContract.allowList === true) {
        return null;
      }

      return combinedData;
    })
    .filter((item) => item !== null);

  return resultMappedData;
}
