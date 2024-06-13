import { getMinimalBidPerToken } from "./getMinimalBidPerToken";
import { getMinimalBuyoutPricePerToken } from "./getMinimalBuyoutPricePerToken";

export function computeBidAmounts(
  newBidPerToken,
  quantity,
  reservePricePerToken,
  buyoutPricePerToken,
  previousPricePerToken,
  minimalAuctionBps,
  bonusRefundBps,
  royaltyBps,
  protocolFeeBps
) {
  const totalBidAmount = BigInt(newBidPerToken) * BigInt(quantity);

  previousPricePerToken = previousPricePerToken ? previousPricePerToken : "0";

  const errors = [];

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

  if(newBidPerToken.lt(minimalBidPerToken)) {
    errors.push(`New bid per token must be greater than ${minimalBidPerToken.toString()} (minimal bid per token) - ${newBidPerToken.toString()}`);
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
    newRefundBonusAmount: newRefundBonusAmount.toString(), // bonus the bidder will get

    /**
     * else if bid is successful (bidder will receive nft, no reward / no refund)
     */
    protocolFeeAmount: protocolFeeAmount.toString(), // how much the protocol will receive
    royaltyAmount: royaltyAmount.toString(), // how much the creator will receive
    listerAmount: listerAmount.toString() // how much the lister will receive
  };
}
