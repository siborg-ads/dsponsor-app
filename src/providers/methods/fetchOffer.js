import { executeQuery } from "../utils/executeQuery";

export const fetchOffer = async (offerId, chainId) => {
  const path = new URL(`https://relayer.dsponsor.com/api/${chainId}/graph`);
  const GET_DATA = `
    query TokenOfferDetails($offerId: ID!) {
      # replace by the $offerId
      adOffers(where: { id: $offerId }) {
        # METADATA - if INVALID, ignore this listing
        # try to fetch metadataURL
        # if tokenData?.length
        #    if offerMetadata.offer.token_metadata.name exists => replace all {tokenData} by tokenData value
        #    (same for offerMetadata.offer.token_metadata.description & offerMetadata.offer.token_metadata.image)
        # NAME = offerMetadata.offer.token_metadata.name || offerMetadata.offer.name || "(Invalid name)"
        # DESCRIPTION = offerMetadata.offer.token_metadata.description || offerMetadata.offer.description || "(Invalid description)"
        # IMAGE = offerMetadata.offer.token_metadata.image || offerMetadata.offer.image || defaultImage (ex: d>sponsor logo)
        metadataURL
        validators
        disable
        id
        name
        initialCreator # from which address the offer has been created
        admins # list of admins
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
          maxSupply
          allowList # defines if there is a token allowlist
          royalty {
            bps
          } # creator royalties (690 = 6.90%)
          # default mint price
          prices(where: { enabled: true }) {
            currency # ERC20 smart contract
            amount # wei, mind decimals() function to transform in human readable value !
            enabled
          }

          owner {
            newOwner
          }

         

          tokens(first: 1000) {
            tokenId
            mint {
              transactionHash # if = null => not minted yet, so it's available
              to # address who receives the token
              tokenData # data linked to token id, search ticker for SiBorg ad offer for example
              currency
              id
              amount
            }
            nftContract {
              id
            }
            setInAllowList # to check is allowList (above) is true, define if is in allowlist
            # current ad data proposals, per adParameter
            currentProposals {
              adOffer {
                id
              }
              adParameter {
                id
                base
                variants
              }
              acceptedProposal {
                id
                status
                data
                creationTimestamp
              }
              pendingProposal {
                id
                status
                data
                creationTimestamp
              }
              rejectedProposal {
                id
                status
                data
                rejectReason
                creationTimestamp
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

  const response = await executeQuery(path.href, GET_DATA, { offerId: offerId });

  return response?.adOffers[0];
};
