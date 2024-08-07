import React, { useEffect, useState } from "react";
import Link from "next/link";
import Timer from "@/components/ui/timer/Timer";
import BidsModal from "@/components/features/token/modals/BidsModal";
import { ethers } from "ethers";
import { getAddress } from "ethers/lib/utils";
import { Web3Button } from "@thirdweb-dev/react";
import config from "@/config/config";

const PlaceBid = ({
  setAmountToApprove,
  bidsAmount,
  setBidsAmount,
  bidded,
  address,
  setBidded,
  dsponsorMarketplaceContract,
  latestListing,
  currencySymbol,
  tokenBalance,
  handleApprove,
  tokenTotalPrice,
  hasEnoughBalance,
  currencyDecimals,
  checkUserBalance,
  allowanceTrue,
  checkAllowance,
  chainId,
  isLoadingButton,
  setIsLoadingButton,
  currencyContract,
  token,
  user,
  offer,
  referrer,
  isValidId,
  tokenEtherPrice,
  amountInEthWithSlippage,
  displayedPrice,
  setDisplayedPrice,
  showBidsModal,
  setShowBidsModal,
  fetchOffers
}) => {
  const [minimalBidPerToken, setMinimalBidPerToken] = useState(null);
  const [bids, setBids] = useState(null);

  useEffect(() => {
    const minimalBidPerToken = latestListing?.bidPriceStructure?.minimalBidPerToken;
    setMinimalBidPerToken(minimalBidPerToken);
  }, [latestListing]);

  const toggleBidsModal = async () => {
    if (minimalBidPerToken) {
      await checkAllowance(ethers.BigNumber.from(minimalBidPerToken));
    }
    setShowBidsModal(!showBidsModal);
    setBidded(false);
  };

  useEffect(() => {
    if (latestListing) {
      setBids(latestListing?.bids);
    }
  }, [latestListing]);

  return (
    <div className="rounded-2lg bg-white p-8 dark:bg-secondaryBlack">
      <div className="flex flex-col items-center justify-between gap-8">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="mb-8 grid grid-cols-9">
            {/* Highest bid */}
            <div className="col-span-4">
              {bids?.length > 0 && (
                <div className="block overflow-hidden text-ellipsis whitespace-nowrap">
                  <span className="text-sm text-jacarta-100 dark:text-jacarta-100">
                    Highest bid by{" "}
                  </span>
                  <Link
                    href={`/profile/${latestListing?.bids[0]?.bidder}`}
                    className="text-sm font-bold text-primaryPurple"
                  >
                    {address &&
                    latestListing?.bids[0]?.bidder &&
                    getAddress(latestListing?.bids[0]?.bidder) === getAddress(address)
                      ? "You"
                      : latestListing?.bids[0]?.bidder}
                  </Link>
                </div>
              )}
              <div className="mt-3 flex">
                <div>
                  <div className="flex items-center">
                    {bids?.length <= 0 ? (
                      <div className="flex flex-col">
                        <p className="text-sm text-jacarta-100">Starting price: </p>
                        <span className="text-lg font-medium leading-tight tracking-tight text-green">
                          {tokenTotalPrice} {currencySymbol}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <p className="text-sm text-jacarta-100">Minimum bid amount: </p>
                        <span className="text-lg font-medium leading-tight tracking-tight text-green">
                          {tokenTotalPrice} {currencySymbol}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex col-span-1 items-center justify-center">
              <div className="w-[1px] h-full rounded-lg sm:bg-jacarta-100 dark:bg-jacarta-800" />
            </div>

            {/* Countdown */}
            <div className="col-span-4">
              <span className="js-countdown-ends-label text-sm text-jacarta-100 dark:text-jacarta-100">
                Auction ends in
              </span>
              <Timer endTime={latestListing?.endTime} />
            </div>
          </div>

          <div className="flex justify-center">
            <Web3Button
              contractAddress={config[chainId]?.smartContracts?.DSPONSORMP?.address}
              action={() => {
                toggleBidsModal();
              }}
              isDisabled={!isValidId}
              className={`${!isValidId && "!btn-disabled !bg-opacity-30"} !rounded-full !py-3 w-full !px-8 !text-center !font-semibold !text-white !transition-all !bg-primaryPurple hover:!bg-opacity-80 !cursor-pointer `}
            >
              Place Bid
            </Web3Button>
          </div>
        </div>

        <div>
          <span className="text-jacarta-100 block text-xs text-center">
            Auction live from{" "}
            {latestListing?.startTime && new Date(latestListing?.startTime * 1000).toLocaleString()}{" "}
            to {latestListing?.endTime && new Date(latestListing?.endTime * 1000).toLocaleString()}
          </span>
        </div>
      </div>

      {showBidsModal && (
        <div className="mt-8">
          <BidsModal
            isLoadingButton={isLoadingButton}
            setIsLoadingButton={setIsLoadingButton}
            setAmountToApprove={setAmountToApprove}
            bidsAmount={bidsAmount}
            setBidsAmount={setBidsAmount}
            chainId={chainId}
            bidded={bidded}
            setBidded={setBidded}
            handleApprove={handleApprove}
            checkAllowance={checkAllowance}
            allowanceTrue={allowanceTrue}
            hasEnoughBalance={hasEnoughBalance}
            checkUserBalance={checkUserBalance}
            dsponsorMpContract={dsponsorMpContract}
            toggleBidsModal={toggleBidsModal}
            currencyDecimals={currencyDecimals}
            tokenBalance={tokenBalance}
            latestListing={latestListing}
            currencySymbol={currencySymbol}
            address={address}
            showBidsModal={showBidsModal}
            token={token}
            fetchOffers={fetchOffers}
            user={user}
            offer={offer}
            referrer={referrer}
            currencyContract={currencyContract}
            tokenEtherPrice={tokenEtherPrice}
            amountInEthWithSlippage={amountInEthWithSlippage}
            displayedPrice={displayedPrice}
            setDisplayedPrice={setDisplayedPrice}
          />
        </div>
      )}
    </div>
  );
};

export default PlaceBid;
