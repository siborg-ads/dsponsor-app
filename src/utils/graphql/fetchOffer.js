import { executeQuery } from "../utils/executeQuery";
import config from "@/config/config";

/**
 * Fetches detailed information about an advertisement offer based on its ID from a specific blockchain chain.
 * 
 * This function queries the GraphQL endpoint for an ad offer with the given `offerId`. It retrieves comprehensive details
 * about the offer, including metadata, associated NFT contract information, ad parameters, tokens, and their marketplace
 * listings. The function also enriches the data with configuration information specific to the blockchain chain.
 *
 * The returned data includes:
 * - Metadata of the offer
 * - NFT contract details, including royalty information and pricing
 * - Tokens associated with the offer and their marketplace listings, including bid and direct buy details
 * - Current and historical proposals for the ad offer
 *
 * @param {string} offerId - The ID of the advertisement offer to fetch.
 * @param {string} chainId - The ID of the blockchain chain to query.
 * @returns {Promise<Object>} - A promise that resolves to an object containing detailed information about the specified
 *                               ad offer, enriched with blockchain-specific configuration.
 */
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
            marketplaceListings {
              listingType
              status
              startTime
              endTime
              lister
              id
              reservePricePerToken
              buyoutPricePerToken
              currency
              quantity
              directBuys {
                id
                listing {
                  id
                  listingType
                }
                buyer
                quantityBought
                totalPricePaid
                revenueTransaction {
                  blockTimestamp
                }
                feeMethodology
                amountSentToProtocol
                protocolRecipient
                amountSentToSeller
                sellerRecipient
                amountSentToCreator
                creatorRecipient
              }
              token {
                tokenId
                id
                nftContract {
                  id
                  royalty {
                    bps
                  }
                  adOffers {
                    id
                    metadataURL
                    disable
                  }
                }
                mint {
                  tokenData
                }
              }
              bids {
                id
                listing
                bidder
                quantity
                newPricePerToken
                totalBidAmount
                paidBidAmount
                refundBonus
                refundAmount
                refundProfit
                currency
                status
                creationTxHash
                revenueTransaction
                creationTimestamp
                lastUpdateTimestamp
                feeMethodology
                amountSentToProtocol
                protocolRecipient
                amountSentToSeller
                sellerRecipient
                amountSentToCreator
                creatorRecipient
              }
            }
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
              prices {
                amount
              }
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

  const chainConfig = config[chainId];

  const resultMappedData = response?.adOffers?.map((offer) => {
    const combinedData = {
      ...offer,
      chainConfig: chainConfig
    };

    return combinedData;
  })[0];

  // add chain config for each tokens
  const finalTokens = resultMappedData?.nftContract?.tokens?.map((token) => {
    const combinedData = {
      ...token,
      chainConfig: chainConfig
    };

    return combinedData;
  });

  const finalData = {
    ...resultMappedData,
    nftContract: {
      ...resultMappedData?.nftContract,
      tokens: finalTokens
    }
  };

  return finalData;
};
