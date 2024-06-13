import { executeQuery } from "../utils/executeQuery";
import config from "../utils/config";

export const fetchAllOffersByUserAddress = async (userAddress, chainId) => {
  const path = new URL(`https://relayer.dsponsor.com/api/${chainId}/graph`);

  const GET_DATA = `
    query OffersManagedByUser($userAddress: ID!) {
      adOffers(
        where: {
          and: [
            {
              # replace by the user address
              admins_contains: [$userAddress]
            }
          ]
        }
        first: 1000
      ) {
        # --> Fetch and parse https://github.com/dcast-media/dips/blob/dip-0002/antho31/dip-0002.md#example-schema-json
        # to get creator & offer info  (you may have token_metadata info too)
        # offer.name, offer.image, offer.description
        # if token_metadata: token_metadata.name,
        metadataURL
        id # offerId
        creationTimestamp # data (unix time)
        adParameters(where: { enable: true }) {
          enable
          adParameter {
            id # adParameter value, ex: imageURL-320x50 or linkURL
            base # ex: imageURL or linkURL
            variants # ex: ["320x50"]
          }
        }

        nftContract {
          id # DSponsorNFT smart contract address
          prices {
            currency # ERC20 smart contract
            amount # wei, mind decimals() function to transform in human readable value !
            enabled
          }
          tokens(
            # you can paginate with this type or filtering
            # where: { and: [{ tokenId_lte: "200" }, { tokenId_lte: "100" }]

            orderBy: tokenId
          ) {
            tokenId
            mint {
              transactionHash # if = null => not minted yet, so it's available
              to # address who receives the token
              tokenData # data linked to token id, search ticker for SiBorg ad offer for example
            }
            setInAllowList # to check is allowList (above) is true, define if is in allowlist
            # current ad data proposals, per adParameter
            currentProposals {
              adParameter {
                id
                base
              }
              acceptedProposal {
                data
              }
              pendingProposal {
                data
              }
              rejectedProposal {
                data
                rejectReason
              }
            }

            # proposal submissions history
            allProposals(orderBy: creationTimestamp, orderDirection: desc) {
              adParameter {
                id
              }
              status
              data
              rejectReason
              creationTimestamp
              lastUpdateTimestamp
            }
          }
        }
      }
    }
  `;


  const response = await executeQuery(path.href, GET_DATA,  { userAddress: userAddress });
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
};
