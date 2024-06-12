import { executeQuery } from "../utils/executeQuery";
import config from "../utils/config";

export const fetchAllTokenAuctionBidsByUser = async (address, chainId) => {
  const path = new URL(`https://relayer.dsponsor.com/api/${chainId}/graph`);

  const GET_DATA = `
query FetchAllTokenAuctionBidsByUser($userAddr: ID!) {
     marketplaceBids(
    orderBy: creationTimestamp
    orderDirection: asc
    where: {
      bidder: $userAddr
    }
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
    }
    creationTimestamp
  }
}

  `;

  const response = await executeQuery(path.href, GET_DATA, {userAddr: address});

  const resultMappedData = response?.marketplaceBids.map((item) => {
    const combinedData = {
      ...item,
      chainConfig: config[chainId]
    };
    return combinedData;
  });

  return resultMappedData;


};
