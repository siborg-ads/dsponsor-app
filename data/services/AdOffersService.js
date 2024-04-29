import { execute } from "../../.graphclient";
import { gql } from "@apollo/client";


export const GetAllAdOffers = async () => {
  // Requête pour récupérer tous les NewDSponsorNFTs
  const GET_DATA = gql`
    query Homepage_LastOffers {
      adOffers(orderBy: creationTimestamp, orderDirection: desc, first: 20, where: { and: [{ disable: false }] }) {
        id # offerId
        # --> Fetch and parse https://github.com/dcast-media/dips/blob/dip-0002/antho31/dip-0002.md#example-schema-json
        # to get creator & offer info  (you may have token_metadata info too)
        # offer.name, offer.image
        metadataURL

        nftContract {
          id # DSponsorNFT smart contract address
          allowList # defines if there is a token allowlist
          # default mint price
          prices {
            currency # ERC20 smart contract
            amount # wei, mind decimals() function to transform in human readable value !
            enabled
          }

          # get all tokens
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


  // Exécutez la requête pour obtenir tous les NFTs
  const resultat = await execute(GET_DATA, {});
return resultat.data.adOffers;
};
export const GetAllAdOffersFromUser = async (userAddress) => {
  // Requête pour récupérer tous les NewDSponsorNFTs
  const GET_DATA = gql`
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

  // Exécutez la requête pour obtenir tous les NFTs
  const resultat = await execute(GET_DATA, { userAddress: userAddress });
console.log(resultat);
  return resultat?.data?.adOffers;
};
