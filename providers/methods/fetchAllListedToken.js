import { executeQuery } from "../utils/executeQuery";
import { gql } from "@apollo/client";

export const fetchAllListedToken = async (chainId) => {
  const path = new URL(`https://relayer.dsponsor.com/api/${chainId}/graph`);
  const currentTimestamp = Math.floor(Date.now() / 1000);

  const GET_DATA = gql`
    query getAllMarketplaceListings($currentTimestamp: Int!) {
      adOffers {
        id
        metadataURL
        nftContract {
          tokens {
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
            marketplaceListings(orderBy: endTime, orderDirection: asc, where: { status: CREATED, quantity_gt: 0, startTime_lte: $currentTimestamp, endTime_gte: $currentTimestamp }) {
              id
              token {
                tokenId
                nftContract {
                  id
                  adOffers {
                    id
                    metadataURL
                  }
                }
                mint {
                  tokenData
                }
              }
              listingType
              currency
              reservePricePerToken
              buyoutPricePerToken
              bids(orderBy: totalBidAmount, orderDirection: desc, first: 1) {
                bidder
                totalBidAmount
                status
              }
              lister
              startTime
              endTime
              status
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
   currentTimestamp,
 };
 const response = await executeQuery(path.href, GET_DATA, variables);

 const mappedListedToken = response.adOffers
   .map((offer) => ({
     ...offer,
     nftContract: {
       ...offer.nftContract,
       tokens: offer.nftContract.tokens.filter((token) => token.mint && token.marketplaceListings.length > 0),
     },
   }))
   .filter((offer) => offer.nftContract.tokens.length > 0)
   .flatMap((offer) =>
     offer.nftContract.tokens.map((token) => ({
       ...token,
       offerId: offer.id,
     }))
   )
   .sort((a, b) => b.marketplaceListings[0]?.startTime - a.marketplaceListings[0]?.startTime);

 return mappedListedToken;
};
