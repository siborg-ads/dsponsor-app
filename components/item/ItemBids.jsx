import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Timer from './Timer'
import BidsModal from '../modal/bidsModal'
import { ethers } from "ethers";
import { useAddress, darkTheme, useBalance, Web3Button, useTokenBalance, useContract, useContractRead, useContractWrite, useStorageUpload, useTokenDecimals, CheckoutWithCard, CheckoutWithEth } from "@thirdweb-dev/react";
import { useChainContext } from "../../contexts/hooks/useChainContext";
import config from '../../providers/utils/config'
const ItemBids = ({successFullBid, address, setSuccessFullBid, dsponsorMpContract, marketplaceListings, currencySymbol, tokenBalance,handleApprove,price, hasEnoughBalance, currencyTokenDecimals, checkUserBalance, allowanceTrue, checkAllowance, chainId }) => {
  const [showBidsModal, setShowBidsModal] = useState(false);
 
  const toggleBidsModal = () =>{ 
    checkAllowance();
    setShowBidsModal(!showBidsModal)
    setSuccessFullBid(false);
  };
  const bids = marketplaceListings[0].bids;
  
  return (
    <div className="rounded-2lg border border-jacarta-100 bg-white p-8 dark:border-jacarta-600 dark:bg-jacarta-700">
      <div className="mb-8 sm:flex sm:flex-wrap">
        {/* Highest bid */}
        <div className="sm:w-1/2 sm:pr-4 lg:pr-8">
          {bids.length > 0 && (
            <div className="block overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="text-sm text-jacarta-400 dark:text-jacarta-300">Highest bid by </span>
              <Link href={`/manage/${marketplaceListings[0].bids[0].bidder}`} className="text-sm font-bold text-accent">
                {marketplaceListings[0].bids[0].bidder}
              </Link>
            </div>
          )}
          <div className="mt-3 flex">
            <div>
              <div className="flex items-center whitespace-nowrap">
                {bids.length <= 0 ? (
                  <div className="flex flex-col">
                    <p className="text-sm text-jacarta-400">starting price : </p>
                    <span className="text-lg font-medium leading-tight tracking-tight text-green">
                      {price} {currencySymbol}
                    </span>
                  </div>
                ) : (
                  <p className="text-lg font-medium leading-tight tracking-tight text-green">
                    {price} {currencySymbol}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Countdown */}
        <div className="mt-4 dark:border-jacarta-600 sm:mt-0 sm:w-1/2 sm:border-l sm:border-jacarta-100 sm:pl-4 lg:pl-8">
          <span className="js-countdown-ends-label text-sm text-jacarta-400 dark:text-jacarta-300">Auction ends in</span>
          <Timer endTime={marketplaceListings[0].endTime} />
        </div>
      </div>
       
        <div className="flex justify-center">
          <Web3Button
            contractAddress={config[chainId]?.smartContracts?.DSPONSORMP?.address}
            action={() => {
              toggleBidsModal();
            }}
            className={` !rounded-full !py-3 w-full !px-8 !text-center !font-semibold !text-white !transition-all !bg-accent !cursor-pointer `}
          >
            Place Bid
          </Web3Button>
        </div>
     
      {showBidsModal && (
        <BidsModal
          chainId={chainId}
          successFullBid={successFullBid}
          setSuccessFullBid={setSuccessFullBid}
          handleApprove={handleApprove}
          checkAllowance={checkAllowance}
          allowanceTrue={allowanceTrue}
          hasEnoughBalance={hasEnoughBalance}
          checkUserBalance={checkUserBalance}
          dsponsorMpContract={dsponsorMpContract}
          toggleBidsModal={toggleBidsModal}
          currencyTokenDecimals={currencyTokenDecimals}
          tokenBalance={tokenBalance}
          marketplaceListings={marketplaceListings}
          currencySymbol={currencySymbol}
          address={address}
        />
      )}
    </div>
  );
};

export default ItemBids