export function getMinimalBidPerToken(
  previousPricePerToken,
  reservePricePerToken,
  minimalAuctionBps
) {
  previousPricePerToken = previousPricePerToken ? previousPricePerToken : "0";

  const requiredMinimalPricePerToken =
    BigInt(previousPricePerToken) > BigInt("0")
      ? BigInt(previousPricePerToken) +
        (BigInt(previousPricePerToken) * BigInt(minimalAuctionBps)) /
          BigInt("10000")
      : BigInt(reservePricePerToken);
  return requiredMinimalPricePerToken.toString();
}
