import { executeQuery } from "../utils/executeQuery";
import { gql } from "@apollo/client";

export const fetchAllTokenByOfferForAuser = async (ownerAddress, chainId) => {
const path = new URL(`https://relayer.dsponsor.com/api/${chainId}/graph`);
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
      tokens(where: { id_in: $ids }, first: 1000) {
        id
        tokenId

        nftContract {
          id
          adOffers {
            metadataURL
            id
            adParameters(where: { enable: true }) {
              enable
              adParameter {
                id # adParameter value, ex: imageURL-320x50 or linkURL
                base # ex: imageURL or linkURL
                variants # ex: ["320x50"]
              }
            }
          }
        }

        tokenId

        user {
          user # user address if rented
          expires # need to check if rent is not expired
        }

        mint {
          transactionHash
          tokenData # data linked to token id, search ticker for SiBorg ad offer for example
        }

        # current ad data proposals, per adParameter
        currentProposals {
          adOffer {
            id # offerId
            metadataURL
          }
          adParameter {
            id # base-variants.join('-')
            base
            variants
          }
          acceptedProposal {
            id # proposalID
            data
          }
          pendingProposal {
            id # proposalID
            data
          }
          rejectedProposal {
            id # proposalID
            data
            rejectReason
          }
        }

        # proposal submissions history
        allProposals(orderBy: creationTimestamp, orderDirection: desc) {
          adParameter {
            id
          }
          adOffer {
            id # offerId
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

  // Exécutez la requête pour obtenir tous les NFTs
  const response = await executeQuery(path.href, GET_DATA, { ids: nftFilterIds });

  return response?.tokens;
};
