import { executeQuery } from "./helper/executeQuery";
import config from "../../config/config";

export const fetchOfferPageContainer = async (chainId, offerId) => {
  const path = new URL(`https://relayer.dsponsor.com/api/${chainId}/graph`);

  const GET_DATA = `
    query OfferPageContainer($offerId: ID!) {
      adOffers(
        first: 1000
        where: { id: $offerId }
      ) {
        # --> Fetch and parse https://github.com/dcast-media/dips/blob/dip-0002/antho31/dip-0002.md#example-schema-json
        # to get creator & offer info  (you may have token_metadata info too)
        # offer.name, offer.image, offer.description
        # if token_metadata: token_metadata.name,
        metadataURL
        id # offerId
        disable
        admins
        initialCreator
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
          allowList
          maxSupply
          royalty {
            bps
          }
          prices {
            currency # ERC20 smart contract
            amount # wei, mind decimals() function to transform in human readable value !
            enabled
          }
          tokens(
            # you can paginate with this type or filtering
            # where: { and: [{ tokenId_lte: "200" }, { tokenId_lte: "100" }]
            first: 1000
            orderBy: tokenId
          ) {
            tokenId
            mint {
              transactionHash # if = null => not minted yet, so it's available
              from
              currency
              to # address who receives the token
              tokenData # data linked to token id, search ticker for SiBorg ad offer for example
              revenueTransaction {
                id
                blockTimestamp
              }
              amount
              totalPaid
            }
            nftContract {
              id
              prices {
                currency
                amount
              }
            }
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
            marketplaceOffers {
              id
              offeror
              expirationTimestamp
              currency
              totalPrice
              status
              creationTimestamp
              tokenType
              transferType
              rentalExpirationTimestamp
            }
            setInAllowList
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

  const response = await executeQuery(path.href, GET_DATA, { offerId });

  const chainConfig = config[chainId];

  const resultMappedData = response?.adOffers
    .map((element) => {
      const sortByTokenId = element.nftContract.tokens.sort((a, b) => a.tokenId - b.tokenId);
      const tokenIdAllowedToMint =
        sortByTokenId.find((token) => token.mint === null)?.tokenId || false;

      const combinedData = {
        ...element,
        chainConfig: chainConfig,
        tokenIdAllowedToMint: tokenIdAllowedToMint
      };

      return combinedData;
    })
    .filter((item) => item !== null);

  return resultMappedData;
};
