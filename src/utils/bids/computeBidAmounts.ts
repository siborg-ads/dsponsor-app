import { getMinimalBidPerToken } from "./getMinimalBidPerToken";
import { getMinimalBuyoutPricePerToken } from "./getMinimalBuyoutPricePerToken";

/**
 * Computes various bid-related amounts and checks for errors based on the auction parameters.
 * This function handles calculations for bid validation, bonus rewards, and payment distribution.
 *
 * @param {bigint} newBidPerToken - The bid amount per token that the new bidder is willing to pay.
 * @param {bigint} quantity - The number of tokens being bid on.
 * @param {bigint} reservePricePerToken - The minimum price per token that must be met or exceeded.
 * @param {bigint} buyoutPricePerToken - The price per token at which the auction will end immediately.
 * @param {bigint} previousPricePerToken - The price per token from the previous bid.
 * @param {bigint} minimalAuctionBps - The minimum basis points (bps) for the auction.
 * @param {number} bonusRefundBps - The basis points used to calculate the bonus refund for the previous bidder.
 * @param {number} royaltyBps - The basis points allocated to the creator as a royalty.
 * @param {number} protocolFeeBps - The basis points allocated to the protocol as a fee.
 *
 * @returns {Object} An object containing all the calculated values related to the bid,
 *                   such as minimal bid amounts, bonus refunds, and distribution of funds.
 *
 * @example
 * const result = computeBidAmounts(
 *   BigInt("500000000000000000"), // newBidPerToken (0.5 ETH)
 *   BigInt("1"),                  // quantity
 *   BigInt("300000000000000000"), // reservePricePerToken (0.3 ETH)
 *   BigInt("1000000000000000000"), // buyoutPricePerToken (1 ETH)
 *   BigInt("450000000000000000"),  // previousPricePerToken (0.45 ETH)
 *   BigInt("500"),                // minimalAuctionBps (5%)
 *   BigInt("100"),                // bonusRefundBps (1%)
 *   BigInt("200"),                // royaltyBps (2%)
 *   BigInt("50")                  // protocolFeeBps (0.5%)
 * );
 *
 * console.log(result);
 *
 * // The result object will contain all computed values such as:
 * // - minimalBidPerToken
 * // - minimalBuyoutPerToken
 * // - nextReservePricePerToken
 * // - totalBidAmount
 * // - refundBonusAmount
 * // - newAmount
 * // - protocolFeeAmount
 * // - royaltyAmount
 * // - listerAmount
 */
export function computeBidAmounts(
  newBidPerToken: bigint,
  quantity: bigint,
  reservePricePerToken: bigint,
  buyoutPricePerToken: bigint,
  previousPricePerToken: bigint,
  minimalAuctionBps: number,
  bonusRefundBps: number,
  royaltyBps: number,
  protocolFeeBps: number
) {
  const totalBidAmount = newBidPerToken * quantity;

  previousPricePerToken = previousPricePerToken ?? "0";

  const errors: string[] = [];

  if (BigInt(quantity) <= BigInt("0")) {
    errors.push("Quantity must be greater than 0");
  }

  if (BigInt(minimalAuctionBps) <= BigInt(bonusRefundBps)) {
    errors.push("Minimal auction bps must be greater than bonus reward bps");
  }

  const minimalBidPerToken = BigInt(
    getMinimalBidPerToken(previousPricePerToken, reservePricePerToken, minimalAuctionBps)
  );

  const minimalBuyoutPerToken = getMinimalBuyoutPricePerToken(
    previousPricePerToken,
    buyoutPricePerToken,
    minimalAuctionBps,
    bonusRefundBps
  );

  if (newBidPerToken < minimalBidPerToken) {
    errors.push(
      `New bid per token must be greater than ${minimalBidPerToken.toString()} (minimal bid per token) - ${newBidPerToken.toString()}`
    );
  }

  const refundBonusPerToken =
    (BigInt(bonusRefundBps) * BigInt(previousPricePerToken)) / BigInt("10000");

  const refundBonusAmount = BigInt(quantity) * refundBonusPerToken;

  const refundAmountToPreviousBidder =
    BigInt(quantity) * BigInt(previousPricePerToken) + refundBonusAmount;

  if (refundAmountToPreviousBidder >= totalBidAmount) {
    errors.push("Reward exceeds new bid amount");
  }

  const newPricePerToken = BigInt(newBidPerToken) - BigInt(refundBonusPerToken);
  const newAmount = newPricePerToken * BigInt(quantity);

  const newRefundBonusPerToken = (BigInt(bonusRefundBps) * newPricePerToken) / BigInt("10000");
  const newRefundBonusAmount = BigInt(quantity) * newRefundBonusPerToken;

  const newRefundAmount = newAmount + newRefundBonusAmount;
  const newProfitAmount = newRefundAmount - totalBidAmount;

  const protocolFeeAmount = (BigInt(newAmount) * BigInt(protocolFeeBps)) / BigInt("10000");
  const royaltyAmount = (BigInt(newAmount) * BigInt(royaltyBps)) / BigInt("10000");
  const listerAmount = BigInt(newAmount) - protocolFeeAmount - royaltyAmount;

  const nextReservePricePerToken = (newAmount * BigInt(110)) / BigInt(100);

  // note: if quantity = 1 :
  // - newBidPerToken = totalBidAmount
  // - refundBonusPerToken = refundBonusAmount
  // - newPricePerToken = newAmount
  // - newRefundBonusPerToken = newRefundBonusAmount

  if (errors.length) {
    console.error("errors on bid amounts", errors);
  }

  return {
    minimalBidPerToken: minimalBidPerToken.toString(),
    minimalBuyoutPerToken,
    nextReservePricePerToken: nextReservePricePerToken.toString(),

    newBidPerToken: newBidPerToken.toString(),
    totalBidAmount: totalBidAmount.toString(), // how much the bidder will pay => refundBonusAmount + newAmount

    /**
     * details about the price
     */
    refundBonusPerToken: refundBonusPerToken.toString(),
    refundBonusAmount: refundBonusAmount.toString(), // bonus the previous bidder will get
    refundAmountToPreviousBidder: refundAmountToPreviousBidder.toString(),

    newPricePerToken: newPricePerToken.toString(),
    newAmount: newAmount.toString(), // next bid amount

    /**
     * if another valid bid is placed...
     */
    newRefundBonusPerToken: newRefundBonusPerToken.toString(),
    newRefundBonusAmount: newRefundBonusAmount.toString(),
    newRefundAmount: newRefundAmount.toString(), // how much the bidder will receive if he is outbid
    newProfitAmount: newProfitAmount.toString(), // profit amount the bidder will receive if he is outbid

    /**
     * else if bid is successful (bidder will receive nft, no reward / no refund)
     */
    protocolFeeAmount: protocolFeeAmount.toString(), // how much the protocol will receive
    royaltyAmount: royaltyAmount.toString(), // how much the creator will receive
    listerAmount: listerAmount.toString() // how much the lister will receive
  };
}
