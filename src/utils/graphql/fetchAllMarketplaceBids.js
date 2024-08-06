import { executeQuery } from "../utils/executeQuery";

/**
 * Fetches all marketplace bids for a specific blockchain chain ID.
 *
 * @param {string} chainId - The ID of the blockchain chain to fetch bids from.
 * @returns {Promise<Object>} - A promise that resolves to an object containing all marketplace bids.
 */
export const fetchAllMarketplaceBids = async (chainId) => {
  const path = new URL(`https://relayer.dsponsor.com/api/${chainId}/graph`);

  const GET_DATA = `
    query getMarketplaceBids {
        marketplaceBids(first: 1000) {
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
  `;

  const response = await executeQuery(path.href, GET_DATA);

  return response;
};

/**
 * Fetches marketplace bids by a specific bidder address for a particular blockchain chain ID.
 *
 * @param {string} chainId - The ID of the blockchain chain to fetch bids from.
 * @param {string} address - The address of the bidder whose bids are to be fetched.
 * @returns {Promise<Object>} - A promise that resolves to an object containing bids by the specified bidder.
 */
export const fetchAllMarketplaceBidsByBidder = async (chainId, address) => {
  const path = new URL(`https://relayer.dsponsor.com/api/${chainId}/graph`);

  const GET_DATA = `
      query getMarketplaceBids {
          marketplaceBids(first: 1000,
            where: { bidder: "${address}" }) {
              id
              bidder
              quantity
              refundBonus
              refundAmount
              refundProfit
              paidBidAmount
              status
              currency
              creationTimestamp
              lastUpdateTimestamp
              creationTxHash
              listing {
                token {
                  tokenId
                  mint {
                    tokenData
                  }
                  nftContract {
                    adOffers(first: 1, orderBy: creationTimestamp, orderDirection: desc) {
                      id
                      name
                    }
                  }
                }
              }
          }
      }
    `;

  const response = await executeQuery(path.href, GET_DATA);

  return response;
};
