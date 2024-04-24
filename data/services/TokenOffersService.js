import { execute } from "../../.graphclient";
import { gql } from "@apollo/client";

export const GetTokenAdOffer = async (offerId, tokenId) => {
  // Requête pour récupérer tous les NewDSponsorNFTs
  const GET_DATA = gql`
    query TokenOfferDetails($offerId: ID!, $tokenId: ID!) {
      # replace by the $offerId
      adOffer(id: $offerId) {
        # --> Fetch and parse https://github.com/dcast-media/dips/blob/dip-0002/antho31/dip-0002.md#example-schema-json
        # to get creator & offer info  (you may have token_metadata info too)
        # offer.name, offer.image, offer.description
        # if token_metadata: token_metadata.Lname,
        metadataURL

        initialCreator # from which address the offer has been created
        creationTimestamp # data (unix time)
        adParameters {
          id # adParameter value, ex: imageURL-320x50 or linkURL
          base # ex: imageURL or linkURL
          variants # ex: ["320x50"]
        }

        nftContract {
          id # DSponsorNFT smart contract address
          allowList # defines if there is a token allowlist
          royaltyBps # creator royalties (690 = 6.90%)
          # default mint price
          prices {
            currency # ERC20 smart contract
            amount # wei, mind decimals() function to transform in human readable value !
            enabled
          }

          # to replace by $tokenId
          tokens(where: { tokenId: $tokenId }) {
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
  const resultat = await execute(GET_DATA, { offerId: offerId, tokenId: tokenId});

 return resultat?.data?.adOffer;
};
export const GetAdOffer = async (offerId) => {
  // Requête pour récupérer tous les NewDSponsorNFTs
  const GET_DATA = gql`
    query TokenOfferDetails($offerId: ID!) {
      # replace by the $offerId
      adOffer(id: $offerId) {
        # --> Fetch and parse https://github.com/dcast-media/dips/blob/dip-0002/antho31/dip-0002.md#example-schema-json
        # to get creator & offer info  (you may have token_metadata info too)
        # offer.name, offer.image, offer.description
        # if token_metadata: token_metadata.Lname,
        metadataURL

        initialCreator # from which address the offer has been created
        creationTimestamp # data (unix time)
        adParameters {
          id # adParameter value, ex: imageURL-320x50 or linkURL
          base # ex: imageURL or linkURL
          variants # ex: ["320x50"]
        }

        nftContract {
          id # DSponsorNFT smart contract address
          allowList # defines if there is a token allowlist
          royaltyBps # creator royalties (690 = 6.90%)
          # default mint price
          prices {
            currency # ERC20 smart contract
            amount # wei, mind decimals() function to transform in human readable value !
            enabled
          }

         
          tokens {
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
                id
                data
              }
              pendingProposal {
                id
                data
              }
              rejectedProposal {
                id
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
  const resultat = await execute(GET_DATA, { offerId: offerId});

  return resultat?.data?.adOffer;
};
export const GetAllTokenbyOfferForAUser = async (ownerAddress) => {
  
const options = { method: "GET", headers: { accept: "application/json" } };
let nftFilterIds;
 try {
   const response = await fetch(`https://eth-sepolia.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTsForOwner?owner=${ownerAddress}&withMetadata=true&pageSize=100`, options);
   const data = await response.json();
  

  nftFilterIds = data.ownedNfts.map(({ contract: { address }, tokenId }) => `${address.toLowerCase()}-${tokenId}`);
   
 } catch (err) {
   console.error(err); 
   return;
 }
  const GET_DATA = gql`
    query AdSpacesOwnedByUser($ids: [ID!]) {
      tokens(where: { id_in: $ids }) {
        nftContract {
          id
          adOffers {
            metadataURL
            id
            adParameters {
              id # adParameter value, ex: imageURL-320x50 or linkURL
              base # ex: imageURL or linkURL
              variants # ex: ["320x50"]
            }
          }
        }
        id
        tokenId
        mint {
          revenueTransaction {
            id
            protocolFees {
              currency
              fee
              enabler
              spender
              referralAddresses
            }
          }
          tokenData
        }
        currentProposals {
          adOffer {
            id
            metadataURL
          }
          adParameter {
            id
            base
            variants
          }
          acceptedProposal {
            id
            data
          }
          pendingProposal {
            id
            data
          }
          rejectedProposal {
            id
            data
            rejectReason
          }
        }
        allProposals(orderBy: creationTimestamp, orderDirection: desc) {
          adParameter {
            id
          }
          adOffer {
            id
            metadataURL
          }
          status
          data
          rejectReason
          creationTimestamp
          lastUpdateTimestamp
        }
      }
    }
  `;
console.log(nftFilterIds);
  // Exécutez la requête pour obtenir tous les NFTs
  const resultat = await execute(GET_DATA, { ids: nftFilterIds });

  return resultat.data.tokens;
};

