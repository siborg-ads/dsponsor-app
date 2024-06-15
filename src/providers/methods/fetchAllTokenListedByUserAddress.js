import { executeQuery } from "../utils/executeQuery";
import config from "../utils/config";

export const fetchAllTokenListedByUserAddress = async (lister, chainId) => {
  const path = new URL(`https://relayer.dsponsor.com/api/${chainId}/graph`);

  const GET_DATA = `
    query getMarketplaceListingsForUser($lister: Bytes) {
      marketplaceListings(
        orderBy: endTime
        orderDirection: asc
        where: { and: [{ status: CREATED, quantity_gt: 0, lister: $lister }] }
      ) {
        id # listingId
        quantity
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
  `;

  // Exécutez la requête pour obtenir tous les NFTs
  const response = await executeQuery(path.href, GET_DATA, { lister: lister });
  const resultMappedData = response?.marketplaceListings.map((item) => {
    const combinedData = {
      ...item,
      chainConfig: config[chainId]
    };
    return combinedData;
  });

  return resultMappedData;
};
