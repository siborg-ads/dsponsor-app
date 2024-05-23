import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAddress, darkTheme, useBalance, Web3Button, useTokenBalance, useContract, useContractRead, useContractWrite, useStorageUpload, useTokenDecimals, CheckoutWithCard, CheckoutWithEth } from "@thirdweb-dev/react";

import { bidsModalHide } from "../../redux/counterSlice";

const BidsModal = ({ dsponsorMpContract, toggleBidsModal, marketplaceListings, currencySymbol, tokenBalance, currencyTokenDecimals }) => {
  const [bidsAmount, setBidsAmount] = useState(null);
  const [initialIntPrice, setInitialIntPrice] = useState(0);
  const [reservePrice, setReservePrice] = useState(0);
  const [isPriceGood, setIsPriceGood] = useState(true);
  const { mutateAsync: auctionBids } = useContractWrite(dsponsorMpContract, "bid");

  useEffect(() => {
    let reservePrice;
    if (marketplaceListings[0]?.bids?.length <= 0) {
      reservePrice = (BigInt(marketplaceListings[0]?.reservePricePerToken) * (BigInt(500) + BigInt(10000))) / BigInt(10000);
    }else {
      reservePrice = (BigInt(marketplaceListings[0]?.bids[0]?.totalBidAmount) * (BigInt(500) + BigInt(10000)) / BigInt(10000));
    }
    const reservePriceParsed = ethers.utils.formatUnits(reservePrice, currencyTokenDecimals);
    setReservePrice(reservePrice);
    setInitialIntPrice(Number(Math.ceil(reservePriceParsed * 1000) / 1000));
    setBidsAmount(Number(Math.ceil(reservePriceParsed * 1000) / 1000));
  }, [ marketplaceListings[0], currencyTokenDecimals]);
  const handleBidsAmount = (e) => {
    if (e.target.value < ethers.utils.formatUnits(reservePrice, currencyTokenDecimals)) {
      console.log(e.target.value);
      setIsPriceGood(false);
      setBidsAmount(e.target.value);
    } else {
      setIsPriceGood(true);
      setBidsAmount(e.target.value);
    }
  };
  const handleSubmit = async () => {
    try {
      const bigIntPrice = ethers.utils.parseUnits(bidsAmount.toString(), currencyTokenDecimals);
      await auctionBids({
        args: [marketplaceListings[0].id, bigIntPrice, ""],
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="modal fade show block">
        <div className="modal-dialog max-w-2xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="placeBidLabel">
                Place a bid
              </h5>
              <button type="button" className="btn-close" onClick={toggleBidsModal}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="fill-jacarta-700 h-6 w-6 dark:fill-white">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
                </svg>
              </button>
            </div>

            {/* <!-- Body --> */}
            <div className="modal-body p-6">
              <div className="flex justify-between mb-2">
                <div className="flex items-center justify-between">
                  <span className="font-display text-jacarta-700 text-sm font-semibold dark:text-white">Price</span>
                </div>
                <div>
                  <span className="dark:text-jacarta-400 text-sm">
                    Balance: {tokenBalance} {currencySymbol}
                  </span>
                </div>
              </div>
              <div className="dark:border-jacarta-600 border-jacarta-100 relative mb-2 flex items-center overflow-hidden rounded-lg border">
                <div className="border-jacarta-100 bg-jacarta-50 flex flex-1 items-center self-stretch border-r px-2">
                  <span className="font-display text-jacarta-700 text-sm">{currencySymbol}</span>
                </div>

                <input
                  type="number"
                  className={`${isPriceGood ? "border-green" : "border-red"} focus:ring-accent h-12 w-full flex-[3] border-2 focus:ring-inse dark:text-jacarta-700`}
                  placeholder="Amount"
                  value={bidsAmount}
                  onChange={(e) => handleBidsAmount(e)}
                />

                <div className="bg-jacarta-50 border-jacarta-100 flex flex-1 justify-end self-stretch border-l dark:text-jacarta-700">
                  <span className="self-center px-2 text-sm">$130.82</span>
                </div>
              </div>
              {!isPriceGood && <div className="text-left">
                <span className="dark:text-warning text-sm">
                  ⚠️ Bid Price must be higher than {initialIntPrice} {currencySymbol}
                </span>
              </div>}

              {/* <!-- Terms --> */}
              <div className="mt-4 flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="checked:bg-accent dark:bg-jacarta-600 text-accent border-jacarta-200 focus:ring-accent/20 dark:border-jacarta-500 h-5 w-5 self-start rounded focus:ring-offset-0"
                />
                <label htmlFor="terms" className="dark:text-jacarta-200 text-sm">
                  By checking this box, I agree to {"DSponsor's"}{" "}
                  <a href="#" className="text-accent">
                    Terms of Service
                  </a>
                </label>
              </div>
            </div>
            {/* <!-- end body --> */}

            <div className="modal-footer">
              <div className="flex items-center justify-center space-x-4">
                <button type="button" className="bg-accent shadow-accent-volume hover:bg-accent-dark rounded-full py-3 px-8 text-center font-semibold text-white transition-all" onClick={handleSubmit}>
                  Place Bid
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidsModal;
