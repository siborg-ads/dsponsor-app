import { executeQuery } from "@/utils/graphql/helper/executeQuery";
import config from "@/config/config";

/**
 * Fetches all listed tokens.
 *
 * @param {number} chainId - The ID of the blockchain chain to query.
 * @returns {Promise<Array>} - A promise that resolves to an array of mapped listed tokens.
 */
export const fetchMarketplace = async (chainId) => {
  const path = new URL(`https://relayer.dsponsor.com/api/${chainId}/graph`);
  const currentTimestamp = Math.floor(Date.now() / 1000);

  const GET_DATA = `
    query getAllMarketplaceListings($currentTimestamp: Int!) {
      adOffers {
        id
        disable
        metadataURL
        nftContract {
          royalty {
            bps
          }
          tokens(first: 1000) {
            tokenId
            mint {
              blockTimestamp
              tokenData
            }
            nftContract {
              id # = assetContract
              adOffers {
                id
                metadataURL # offerMetadata
              }
              prices {
                currency # ERC20 smart contract
                amount # wei, mind decimals() function to transform in human readable value !
                enabled
              }
            }
            marketplaceListings(
              first: 1000
              orderBy: endTime
              orderDirection: asc
              where: {
                status: CREATED
                quantity_gt: 0
                startTime_lte: $currentTimestamp
                endTime_gte: $currentTimestamp
              }
            ) {
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
              bids(orderBy: totalBidAmount, orderDirection: desc, first: 1) {
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
          }
        }
      }
    }
  `;
  const variables = {
    currentTimestamp
  };
  const response = await executeQuery(path.href, GET_DATA, variables);
  const chainConfig = config[chainId];
  const mappedListedToken = response.adOffers
    .map((offer) => {
      const newOffer = {
        ...offer,
        disable: offer.disable,
        nftContract: {
          ...offer.nftContract,
          tokens: offer.nftContract.tokens.filter(
            (token) => token.mint && token.marketplaceListings.length > 0
          )
        }
      };

      return newOffer;
    })
    .filter((offer) => offer.nftContract.tokens.length > 0)
    .flatMap((offer) =>
      offer.nftContract.tokens.map((token) => ({
        ...token,
        disable: offer.disable,
        offerId: offer.id,
        tokenData: token.mint.tokenData ? token.mint.tokenData : null,
        chainConfig: chainConfig
      }))
    )
    .sort((a, b) => b.marketplaceListings[0]?.startTime - a.marketplaceListings[0]?.startTime);

  return mappedListedToken;
};
