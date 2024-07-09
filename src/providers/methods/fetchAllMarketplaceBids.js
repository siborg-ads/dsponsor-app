import { executeQuery } from "../utils/executeQuery";

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

export const fetchAllMarketplaceBidsByBidder = async (chainId, address) => {
  const path = new URL(`https://relayer.dsponsor.com/api/${chainId}/graph`);

  const GET_DATA = `
      query getMarketplaceBids {
          marketplaceBids(first: 1000,
            where: { bidder: "${address}" }) {
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
