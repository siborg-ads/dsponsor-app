export default function TokenEndedListing({ latestListing, tokenStatus }) {
  const endTimePassed = new Date(latestListing?.endTime)?.getTime() < Date.now();
  const listingHasNotBids = latestListing?.bids?.length === 0;
  const isAuction = tokenStatus === "AUCTION";
  const isDirect = tokenStatus === "DIRECT";
  const endedListing = endTimePassed && ((isAuction && listingHasNotBids) || isDirect);

  if (endedListing) {
    return (
      <div className="p-4 bg-secondaryBlack rounded-lg my-4">
        <p className="text-center text-white font-semibold">The current listing is ended</p>
      </div>
    );
  }
}
