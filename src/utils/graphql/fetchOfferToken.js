import { executeQuery } from "../utils/executeQuery";

/**
 * Fetches detailed information about a specific token associated with an advertisement offer.
 * 
 * This function queries the GraphQL endpoint for the details of a token identified by `tokenId` within a specified
 * advertisement offer (`offerId`). It retrieves comprehensive information about the offer, including metadata, the 
 * NFT contract, the token itself, its marketplace listings, offers, and proposals. It also includes pricing and 
 * bid details for each listing.
 * 
 * The returned data includes:
 * - Metadata of the ad offer
 * - Details about the NFT contract, including pricing and royalty information
 * - Information about the specified token, including its marketplace listings, offers, and mint details
 * - Historical proposals related to the ad offer and current proposals for the token
 * 
 * @param {string} offerId - The ID of the advertisement offer to query.
 * @param {string} tokenId - The ID of the token to fetch details for.
 * @param {string} chainId - The ID of the blockchain chain to query.
 * @returns {Promise<Object>} - A promise that resolves to an object containing detailed information about the
 *                               specified token and its associated offer.
 */
export const fetchOfferToken = async (offerId, tokenId, chainId) => {
  const path = new URL(`https://relayer.dsponsor.com/api/${chainId}/graph`);
  const GET_DATA = `
    query TokenOfferDetails($offerId: ID!, $tokenId: ID!) {
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
        name

        initialCreator # from which address the offer has been created
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
          prices {
            currency # ERC20 smart contract
            amount # wei, mind decimals() function to transform in human readable value !
            enabled
          }

          # to replace by $tokenId
          tokens(
            where: { tokenId: $tokenId }
            first: 1000
          ) {
            tokenId
            marketplaceListings(first: 1000, orderBy: id, orderDirection: desc) {
              id # listingId
              quantity
              # METADATA - if INVALID, ignore this listing
              # offerMetadata = adOffers[0].metadataURL
              # if tokenData?.length
              #    if offerMetadata.offer.token_metadata.name exists => replace all {tokenData} by tokenData value
              #    (same for offerMetadata.offer.token_metadata.description & offerMetadata.offer.token_metadata.image)
              # NAME = offerMetadata.offer.token_metadata.name || offerMetadata.offer.name || INVALID
              # DESCRIPTION = offerMetadata.offer.token_metadata.description || offerMetadata.offer.description || INVALID
              # IMAGE = offerMetadata.offer.token_metadata.image || offerMetadata.offer.image || INVALID
              token {
                tokenId
                nftContract {
                  id # = assetContract
                  royalty {
                    bps
                  }
                  adOffers {
                    id
                    metadataURL # offerMetadata
                  }
                }
                mint {
                  tokenData
                }
              }

              # listingType = 0 <-> 'Direct', listingType = 1 <-> 'Auction'
              # 'Direct' or 'Auction'
              listingType

              currency # ERC20 smart contract addr
              # PRICE
              # if listingType = 'Direct'
              #    price = buyoutPricePerToken
              # else if listingType = 'Auction'
              #    price = bids[0].totalBidAmount || reservePricePerToken
              reservePricePerToken
              buyoutPricePerToken
              bids(orderBy: totalBidAmount, orderDirection: desc, first: 5) {
                creationTimestamp
                bidder
                totalBidAmount
                status
                newPricePerToken
                totalBidAmount
                paidBidAmount
                refundBonus
                refundAmount
                refundProfit
              }

              lister

              startTime
              endTime

              # 'UNSET', 'CREATED', 'COMPLETED' or 'CANCELLED'
              status

              # will be useful later
              tokenType
              transferType
              rentalExpirationTimestamp
            }

            marketplaceOffers {
              id # offerId
              offeror # who submitted the offer
              expirationTimestamp
              currency # ERC20 smart contract addr
              totalPrice

              # 'UNSET', 'CREATED', 'COMPLETED' or 'CANCELLED'
              status

              creationTimestamp

              # will be useful later
              tokenType
              transferType
              rentalExpirationTimestamp
            }
            mint {
              transactionHash # if = null => not minted yet, so it's available
              to # address who receives the token
              tokenData # data linked to token id, search ticker for SiBorg ad offer for example
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

  const response = await executeQuery(path.href, GET_DATA, { offerId: offerId, tokenId: tokenId });

  return response?.adOffers[0];
};