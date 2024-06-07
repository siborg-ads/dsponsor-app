export function getMinimalBuyoutPricePerToken(
  previousPricePerToken,
  buyoutPricePerToken,
  minimalAuctionBps,
  bonusRefundBps
) {
  previousPricePerToken = previousPricePerToken ?? "0";

  if (BigInt(previousPricePerToken) > BigInt("0")) {
    const requiredMinimalPricePerTokenFromBuyoutPrice =
      BigInt(buyoutPricePerToken) +
      (BigInt(previousPricePerToken) * BigInt(bonusRefundBps)) / BigInt("10000");
    const requiredMinimalPricePerTokenFromMinimalAuctionBps =
      BigInt(previousPricePerToken) +
      (BigInt(previousPricePerToken) * BigInt(minimalAuctionBps)) / BigInt("10000");
    const result =
      requiredMinimalPricePerTokenFromBuyoutPrice >
      requiredMinimalPricePerTokenFromMinimalAuctionBps
        ? requiredMinimalPricePerTokenFromBuyoutPrice
        : requiredMinimalPricePerTokenFromMinimalAuctionBps;
    return result.toString();
  } else {
    return buyoutPricePerToken.toString();
  }
}
