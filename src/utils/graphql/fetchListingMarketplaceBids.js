import { executeQuery } from "../utils/executeQuery";

/**
 * Fetches all marketplace listings and associated token details for a given chain ID.
 * 
 * Retrieves up to 1000 marketplace listings, including details about the listing, token, NFT contract,
 * and associated bids. This function helps in fetching the data required to display token listings on the
 * marketplace.
 *
 * @param {string} chainId - The ID of the blockchain chain to fetch listings from.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the marketplace listings data.
 */
export const fetchAllTokenListedByListingId = async (chainId) => {
  const path = new URL(`https://relayer.dsponsor.com/api/${chainId}/graph`);

  const GET_DATA = `
    query getMarketplaceListingsForUser {
      marketplaceListings(first: 1000) {
        id # listingId
        token {
          tokenId

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
        bids {
          creationTimestamp
          bidder
          totalBidAmount
          status
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
  `;

  const response = await executeQuery(path.href, GET_DATA);

  return response;
};