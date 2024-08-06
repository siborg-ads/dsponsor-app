import { executeQuery } from "../utils/executeQuery";
import config from "../../config/config";

export const fetchAllTokenAuctionBidsByUser = async (address, chainId) => {
  const path = new URL(`https://relayer.dsponsor.com/api/${chainId}/graph`);

  const GET_DATA = `
query FetchAllTokenAuctionBidsByUser($userAddr: ID!) {
     marketplaceBids(
    orderBy: creationTimestamp
    orderDirection: desc
       where: {bidder: $userAddr, listing_: {status: CREATED}}
  ) {
    bidder
    quantity
    paidBidAmount # how much bidder paid
    refundBonus # reward (outbid case)
    currency
    status
    creationTxHash
    listing {
      status
      token {
        tokenId
        
        mint {
          tokenData
        }
        nftContract {
          id
          adOffers {
            id
            metadataURL
            name
 
          }
        }
      }
        endTime
    }
    creationTimestamp
  }
}

  `;

  const response = await executeQuery(path.href, GET_DATA, { userAddr: address });
  const bids = response?.marketplaceBids;

  const mostRecentBids = bids.reduce((acc, bid) => {
    const tokenKey = `${bid.listing.token.tokenId}-${bid.listing.token.nftContract.adOffers.find((offer) => offer).id}`;
    if (!acc[tokenKey] || acc[tokenKey].creationTimestamp < bid.creationTimestamp) {
      acc[tokenKey] = bid;
    }
    return acc;
  }, {});

  const resultMappedData = Object.values(mostRecentBids).map((item) => ({
    ...item,
    chainConfig: config[chainId]
  }));

  return resultMappedData;
};
