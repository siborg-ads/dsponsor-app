import React from "react";
import Timer from "@/components/ui/timer/Timer";
import Manage from "@/components/features/token/widgets/Manage";
import PlaceBid from "@/components/features/token/widgets/PlaceBid";

export default function Listing({
  isListingDisabled,
  latestListing,
  tokenStatus,
  isInitialOfferCreator,
  listingCreated,
  setListingCreated,
  dsponsorNFTContract,
  offer,
  royalties,
  dsponsorMarketplaceContract,
  tokenId,
  isTokenOwner,
  isLister,
  fetchOffers,
  marketplaceListings,
  setAmountToApprove,
  bidsAmount,
  setBidsAmount,
  chainId,
  tokenTotalPrice,
  isAllowanceGood,
  handleApproveMarketplace,
  currencySymbol,
  tokenBalance,
  currencyDecimals,
  bidded,
  setBidded,
  address,
  isApproving,
  setIsApproving,
  token,
  isValidId,
  tokenOwner,
  referralAddress,
  currencyAddress,
  tokenTotalEtherPrice,
  amountInEthWithSlippage,
  displayedUSDCPrice,
  setDisplayedUSDCPrice,
  showBidsModal,
  setShowBidsModal
}) {
  if (!isListingDisabled) {
    return (
      <React.Fragment>
        <MintOrDirectListing latestListing={latestListing} tokenStatus={tokenStatus} />

        <AuctionListingNotStarted latestListing={latestListing} tokenStatus={tokenStatus} />

        <AirdropWidget isInitialOfferCreator={isInitialOfferCreator} tokenStatus={tokenStatus} />

        <DirectListingNotStarted latestListing={latestListing} tokenStatus={tokenStatus} />

        <Manage
          listingCreated={listingCreated}
          setListingCreated={setListingCreated}
          dsponsorNFTContract={dsponsorNFTContract}
          offer={offer}
          latestListing={latestListing}
          royalties={royalties}
          dsponsorMarketplaceContract={dsponsorMarketplaceContract}
          tokenId={tokenId}
          fetchOffers={fetchOffers}
          isTokenOwner={isTokenOwner}
          isLister={isLister}
          marketplaceListings={marketplaceListings}
          tokenStatus={tokenStatus}
        />

        <PlaceBidWidget
          tokenStatus={tokenStatus}
          latestListing={latestListing}
          setAmountToApprove={setAmountToApprove}
          fetchOffers={fetchOffers}
          bidsAmount={bidsAmount}
          setBidsAmount={setBidsAmount}
          chainId={chainId}
          tokenTotalPrice={tokenTotalPrice}
          isAllowanceGood={isAllowanceGood}
          handleApproveMarketplace={handleApproveMarketplace}
          dsponsorMarketplaceContract={dsponsorMarketplaceContract}
          marketplaceListings={marketplaceListings}
          currencySymbol={currencySymbol}
          tokenBalance={tokenBalance}
          currencyDecimals={currencyDecimals}
          bidded={bidded}
          setBidded={setBidded}
          address={address}
          isApproving={isApproving}
          setIsApproving={setIsApproving}
          token={token}
          isValidId={isValidId}
          isTokenOwner={isTokenOwner}
          isLister={isLister}
          tokenOwner={tokenOwner}
          offer={offer}
          referralAddress={referralAddress}
          currencyAddress={currencyAddress}
          tokenTotalEtherPrice={tokenTotalEtherPrice}
          amountInEthWithSlippage={amountInEthWithSlippage}
          displayedUSDCPrice={displayedUSDCPrice}
          setDisplayedUSDCPrice={setDisplayedUSDCPrice}
          showBidsModal={showBidsModal}
          setShowBidsModal={setShowBidsModal}
        />
      </React.Fragment>
    );
  }
}

function MintOrDirectListing({ latestListing, tokenStatus }) {
  const isDirect = tokenStatus === "DIRECT";
  const isMintable = tokenStatus === "MINTABLE";
  const startTimePassed = new Date(latestListing?.startTime * 1000).getTime() < Date.now();
  const endTimeNotPassed = new Date(latestListing?.endTime * 1000).getTime() > Date.now();
  const isOngoing = startTimePassed && endTimeNotPassed;

  const condition = isMintable || (isDirect && isOngoing);

  if (condition) {
    return (
      <React.Fragment>
        <div className="dark:bg-secondaryBlack dark:border-jacarta-800 mb-2 border-jacarta-100 rounded-2lg border flex flex-col gap-4 bg-white p-8">
          <div className="sm:flex sm:flex-wrap flex-col gap-8">
            <div className="flex items-center justify-between gap-4 w-full">
              <span className="js-countdown-ends-label text-base text-jacarta-100 dark:text-jacarta-100">
                Direct listing ends in:
              </span>
              <Timer endTime={latestListing?.endTime} />
            </div>

            <span className="dark:text-jacarta-100 text-jacarta-100 text-sm">
              Buying the ad space give you the exclusive right to submit an ad. The media still has
              the power to validate or reject ad assets. You re free to change the ad at anytime.
              And free to resell on the open market your ad space.{" "}
            </span>
          </div>
          <div className="w-full flex justify-center">
            <Web3Button
              contractAddress={
                marketplaceListings.length > 0
                  ? config[chainId]?.smartContracts?.DSPONSORMP?.address
                  : config[chainId]?.smartContracts?.DSPONSORADMIN?.address
              }
              action={() => {
                handleBuyModal();
              }}
              isDisabled={!isValidId}
              className={`!rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all  !bg-primaryPurple hover:!bg-opacity-80 !cursor-pointer ${!isValidId && "!btn-disabled !bg-opacity-30"} `}
            >
              Buy
            </Web3Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function AuctionListingNotStarted({ latestListing, tokenStatus }) {
  const isAuction = tokenStatus === "AUCTION";
  const startTimeNotPassed = new Date(latestListing?.startTime * 1000).getTime() >= Date.now();

  if (isAuction && startTimeNotPassed) {
    return (
      <div className="dark:bg-secondaryBlack dark:border-jacarta-800 mb-2 border-jacarta-100 rounded-2lg border flex flex-col gap-4 bg-white p-8">
        <div className="sm:flex sm:flex-wrap flex-col gap-8">
          <div className="flex items-center justify-between gap-4 w-full">
            <span className="js-countdown-ends-label text-base text-jacarta-100 dark:text-jacarta-100">
              Auction will start in:
            </span>
            <Timer endTime={latestListing?.startTime} />
          </div>
        </div>
      </div>
    );
  }
}

function AirdropWidget({ isInitialOfferCreator, tokenStatus }) {
  const isMintable = tokenStatus === "MINTABLE";

  if (isInitialOfferCreator && isMintable) {
    return (
      <div className="dark:bg-secondaryBlack mt-4 dark:border-jacarta-800 mb-2 border-jacarta-100 rounded-2lg border flex flex-col gap-4 bg-white p-8">
        <span className="dark:text-jacarta-100 text-jacarta-100 text-lg">Airdrop this token</span>

        <Input
          placeholder={"Enter the address"}
          onChange={(e) => setAirdropAddress(e.target.value)}
          value={airdropAddress}
          type="text"
          className="w-full"
        />

        <div className="flex items-center gap-2">
          <button onClick={() => setAirdropAddress(address)} className="w-fit">
            <span className="text-sm text-primaryPurple">Use my address</span>
          </button>

          <span className="text-sm text-jacarta-100">or</span>

          {navigator?.clipboard && (
            <button
              onClick={() => {
                // get clipboard content
                navigator.clipboard.readText().then((text) => {
                  setAirdropAddress(text);
                });
              }}
              className="w-fit"
            >
              <span className="text-sm text-primaryPurple">Paste from clipboard</span>
            </button>
          )}
        </div>

        <div className="w-full flex">
          <Web3Button
            contractAddress={nftContractAddress}
            action={async () => {
              setIsLoadingAirdropButton(true);

              await toast
                .promise(handleAirdrop(airdropAddress, tokenData), {
                  pending: "Airdrop in progress... 🚀",
                  success: "Airdrop successful 🎉",
                  error: "Airdrop failed ❌"
                })
                .finally(() => {
                  setIsLoadingAirdropButton(false);
                });
            }}
            className={`!rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all  !bg-primaryPurple hover:!bg-opacity-80 !cursor-pointer ${(airdropAddress === "" || !airdropAddress || isLoadingAirdropButton || !isValidId) && "!btn-disabled !cursor-not-allowed !opacity-30"}`}
            isDisabled={
              airdropAddress === "" || !airdropAddress || isLoadingAirdropButton || !isValidId
            }
          >
            {isLoadingAirdropButton ? <Spinner size="sm" color="default" /> : "Airdrop"}
          </Web3Button>
        </div>
      </div>
    );
  }
}

function DirectListingNotStarted({ tokenStatus, latestListing }) {
  const isDirect = tokenStatus === "DIRECT";
  const startTimeNotPassed = new Date(latestListing?.startTime * 1000).getTime() >= Date.now();

  if (isDirect && startTimeNotPassed) {
    return (
      <div className="dark:bg-secondaryBlack dark:border-jacarta-800 mb-2 border-jacarta-100 rounded-2lg border flex flex-col gap-4 bg-white p-8">
        <div className="sm:flex sm:flex-wrap flex-col gap-8">
          <div className="flex items-center justify-between gap-4 w-full">
            <span className="js-countdown-ends-label text-base text-jacarta-100 dark:text-jacarta-100">
              Direct listing will start in:
            </span>
            <Timer endTime={latestListing?.startTime} />
          </div>
        </div>
      </div>
    );
  }
}

function PlaceBidWidget({
  tokenStatus,
  latestListing,
  setAmountToApprove,
  fetchOffers,
  bidsAmount,
  setBidsAmount,
  chainId,
  tokenTotalPrice,
  isAllowanceGood,
  handleApproveMarketplace,
  dsponsorMarketplaceContract,
  marketplaceListings,
  currencySymbol,
  tokenBalance,
  currencyDecimals,
  bidded,
  setBidded,
  address,
  isApproving,
  setIsApproving,
  token,
  isValidId,
  isTokenOwner,
  isLister,
  tokenOwner,
  offer,
  referralAddress,
  currencyAddress,
  tokenTotalEtherPrice,
  amountInEthWithSlippage,
  displayedUSDCPrice,
  setDisplayedUSDCPrice,
  showBidsModal,
  setShowBidsModal
}) {
  const startTimePassed = new Date(latestListing?.startTime * 1000) < Date.now();
  const endTimeNotPassed = new Date(latestListing?.endTime * 1000) > Date.now();
  const isOngoing = startTimePassed && endTimeNotPassed;
  const isAuction = tokenStatus === "AUCTION";

  const condition = isAuction && isOngoing;

  if (condition) {
    return (
      <PlaceBid
        setAmountToApprove={setAmountToApprove}
        fetchOffers={fetchOffers}
        bidsAmount={bidsAmount}
        setBidsAmount={setBidsAmount}
        chainId={chainId}
        tokenTotalPrice={tokenTotalPrice}
        isAllowanceGood={isAllowanceGood}
        handleApproveMarketplace={handleApproveMarketplace}
        dsponsorMarketplaceContract={dsponsorMarketplaceContract}
        marketplaceListings={marketplaceListings}
        currencySymbol={currencySymbol}
        tokenBalance={tokenBalance}
        currencyDecimals={currencyDecimals}
        setBidded={setBidded}
        bidded={bidded}
        address={address}
        isApproving={isApproving}
        setIsApproving={setIsApproving}
        token={token}
        isValidId={isValidId}
        user={{
          address: address,
          isTokenOwner: isTokenOwner,
          isLister: isLister,
          tokenOwner: tokenOwner
        }}
        offer={offer}
        referrer={referralAddress}
        currencyAddress={currencyAddress}
        tokenTotalEtherPrice={tokenTotalEtherPrice}
        amountInEthWithSlippage={amountInEthWithSlippage}
        displayedUSDCPrice={displayedUSDCPrice}
        setDisplayedUSDCPrice={setDisplayedUSDCPrice}
        showBidsModal={showBidsModal}
        setShowBidsModal={setShowBidsModal}
      />
    );
  }
}
