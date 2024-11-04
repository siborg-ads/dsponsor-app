import React, { useEffect, useState } from "react";
import Link from "next/link";
import Timer from "@/components/ui/timer/Timer";
import BidsModal from "@/components/features/token/modals/BidsModal";
import { BigNumber } from "ethers";
import { getAddress } from "ethers/lib/utils";
import { Address } from "thirdweb";
import NormalButton from "@/components/ui/buttons/NormalButton";
import { GetWalletBalanceResult } from "thirdweb/dist/types/wallets/utils/getWalletBalance";

const PlaceBid = ({
  setAmountToApprove,
  bidsAmount,
  setBidsAmount,
  successFullBid,
  address,
  setSuccessFullBid,
  dsponsorMpContract,
  marketplaceListings,
  currencySymbol,
  tokenBalance,
  handleApprove,
  price,
  currencyTokenDecimals,
  allowanceTrue,
  chainId,
  currencyContract,
  token,
  user,
  offer,
  referrer,
  isValidId,
  amountInEthWithSlippage,
  displayedPrice,
  setDisplayedPrice,
  showBidsModal,
  setShowBidsModal,
  fetchOffers,
  hasEnoughBalance,
  hasEnoughBalanceForNative,
  tokenEtherPriceRelayer
}: {
  setAmountToApprove: React.Dispatch<React.SetStateAction<bigint | null>>;
  bidsAmount: string;
  setBidsAmount: React.Dispatch<React.SetStateAction<string>>;
  successFullBid: boolean;
  address: Address;
  setSuccessFullBid: React.Dispatch<React.SetStateAction<boolean>>;
  dsponsorMpContract: any;
  marketplaceListings: any;
  currencySymbol: string;
  tokenBalance?: GetWalletBalanceResult;
  handleApprove: () => void;
  price: string;
  currencyTokenDecimals: number;
  allowanceTrue: boolean;
  chainId: number;
  currencyContract: any;
  token: any;
  user: any;
  offer: any;
  referrer: { address: Address };
  isValidId: boolean;
  amountInEthWithSlippage: BigNumber;
  displayedPrice: string;
  setDisplayedPrice: React.Dispatch<React.SetStateAction<number | null>>;
  showBidsModal: boolean;
  setShowBidsModal: React.Dispatch<React.SetStateAction<boolean>>;
  fetchOffers: () => void;
  hasEnoughBalance: boolean;
  hasEnoughBalanceForNative: boolean;
  tokenEtherPriceRelayer: any;
}) => {
  const [bids, setBids] = useState<any>(null);

  const toggleBidsModal = async () => {
    setShowBidsModal(!showBidsModal);
    setSuccessFullBid(false);
  };

  useEffect(() => {
    if (marketplaceListings) {
      setBids(marketplaceListings?.sort((a, b) => Number(b?.id) - Number(a?.id))?.[0]?.bids);
    }
  }, [marketplaceListings]);

  return (
    <div className="p-8 bg-white rounded-2lg dark:bg-secondaryBlack">
      <div className="flex flex-col items-center justify-between gap-8">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="grid grid-cols-9 mb-8">
            {/* Highest bid */}
            <div className="col-span-4">
              {bids?.length > 0 && (
                <div className="block overflow-hidden text-ellipsis whitespace-nowrap">
                  <span className="text-sm text-jacarta-100 dark:text-jacarta-100">
                    Highest bid by{" "}
                  </span>
                  <Link
                    href={`/profile/${marketplaceListings?.sort((a, b) => Number(b?.id) - Number(a?.id))?.[0]?.bids[0]?.bidder}`}
                    className="text-sm font-bold text-primaryPurple"
                  >
                    {address &&
                    marketplaceListings?.sort((a, b) => Number(b?.id) - Number(a?.id))?.[0]?.bids[0]
                      ?.bidder &&
                    getAddress(
                      marketplaceListings?.sort((a, b) => Number(b?.id) - Number(a?.id))?.[0]
                        ?.bids[0]?.bidder
                    ) === getAddress(address)
                      ? "You"
                      : marketplaceListings?.sort((a, b) => Number(b?.id) - Number(a?.id))?.[0]
                          ?.bids[0]?.bidder}
                  </Link>
                </div>
              )}
              <div className="flex mt-3">
                <div>
                  <div className="flex items-center">
                    {bids?.length <= 0 ? (
                      <div className="flex flex-col">
                        <p className="text-sm text-jacarta-100">Starting price: </p>
                        <span className="text-lg font-medium leading-tight tracking-tight text-green">
                          {price} {currencySymbol}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <p className="text-sm text-jacarta-100">Minimum bid amount: </p>
                        <span className="text-lg font-medium leading-tight tracking-tight text-green">
                          {price} {currencySymbol}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center col-span-1">
              <div className="w-[1px] h-full rounded-lg sm:bg-jacarta-100 dark:bg-jacarta-800" />
            </div>

            {/* Countdown */}
            <div className="col-span-4">
              <span className="text-sm js-countdown-ends-label text-jacarta-100 dark:text-jacarta-100">
                Auction ends in
              </span>
              <Timer
                endTime={
                  marketplaceListings?.sort((a, b) => Number(b?.id) - Number(a?.id))?.[0]?.endTime
                }
              />
            </div>
          </div>

          <div className="flex justify-center">
            <NormalButton
              onClick={() => {
                toggleBidsModal();
              }}
              isDisabled={!isValidId}
            >
              Place a bid
            </NormalButton>
          </div>
        </div>

        <div>
          <span className="block text-xs text-center text-jacarta-100">
            Auction live from{" "}
            {marketplaceListings?.sort((a, b) => Number(b?.id) - Number(a?.id))?.[0]?.startTime &&
              new Date(
                marketplaceListings?.sort((a, b) => Number(b?.id) - Number(a?.id))?.[0]?.startTime *
                  1000
              ).toLocaleString()}{" "}
            to{" "}
            {marketplaceListings?.sort((a, b) => Number(b?.id) - Number(a?.id))?.[0]?.endTime &&
              new Date(
                marketplaceListings?.sort((a, b) => Number(b?.id) - Number(a?.id))?.[0]?.endTime *
                  1000
              ).toLocaleString()}
          </span>
        </div>
      </div>

      {showBidsModal && (
        <div className="mt-8">
          <BidsModal
            setAmountToApprove={setAmountToApprove}
            bidsAmount={bidsAmount}
            setBidsAmount={setBidsAmount}
            chainId={chainId}
            successFullBid={successFullBid}
            setSuccessFullBid={setSuccessFullBid}
            handleApprove={handleApprove}
            allowanceTrue={allowanceTrue}
            dsponsorMpContract={dsponsorMpContract}
            toggleBidsModal={toggleBidsModal}
            currencyTokenDecimals={currencyTokenDecimals}
            tokenBalance={tokenBalance}
            marketplaceListings={marketplaceListings}
            currencySymbol={currencySymbol}
            address={address}
            showBidsModal={showBidsModal}
            token={token}
            fetchOffers={fetchOffers}
            user={user}
            offer={offer}
            referrer={referrer}
            currencyContract={currencyContract}
            amountInEthWithSlippage={amountInEthWithSlippage}
            displayedPrice={displayedPrice}
            setDisplayedPrice={setDisplayedPrice}
            hasEnoughBalance={hasEnoughBalance}
            hasEnoughBalanceForNative={hasEnoughBalanceForNative}
            tokenEtherPriceRelayer={tokenEtherPriceRelayer}
          />
        </div>
      )}
    </div>
  );
};

export default PlaceBid;
