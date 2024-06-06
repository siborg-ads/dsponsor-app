import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  useAddress,
  darkTheme,
  useBalance,
  Web3Button,
  useTokenBalance,
  useContract,
  useContractRead,
  useContractWrite,
  useStorageUpload,
  useTokenDecimals,
  CheckoutWithCard,
  CheckoutWithEth
} from "@thirdweb-dev/react";
import { Spinner } from "@nextui-org/spinner";
import { bidsModalHide } from "../../redux/counterSlice";
import { toast } from "react-toastify";
import Link from "next/link";
import { useChainContext } from "../../contexts/hooks/useChainContext";
import config from "../../providers/utils/config";
const BidsModal = ({
  setAmountToApprove,
  bidsAmount,
  setBidsAmount,
  address,
  chainId,
  successFullBid,
  setSuccessFullBid,
  dsponsorMpContract,
  toggleBidsModal,
  marketplaceListings,
  currencySymbol,
  checkUserBalance,
  tokenBalance,
  allowanceTrue,
  currencyTokenDecimals,
  handleApprove,
  checkAllowance,
  isLoadingButton,
  setIsLoadingButton
}) => {
  const [initialIntPrice, setInitialIntPrice] = useState(0);
  const [isPriceGood, setIsPriceGood] = useState(true);
  const { mutateAsync: auctionBids } = useContractWrite(dsponsorMpContract, "bid");
  const [checkTerms, setCheckTerms] = useState(false);

  useEffect(() => {
    const minimalBidPerToken = marketplaceListings[0]?.bidPriceStructure?.minimalBidPerToken;
    if (minimalBidPerToken) {
      const minimalBid = ethers.utils.formatUnits(minimalBidPerToken, currencyTokenDecimals);

      /*
      const precision = Math.max(Math.ceil(currencyTokenDecimals / 6), 2)
        const extra = Math.pow(10, -precision)
      let round =
        Math.ceil(minimalBid * Math.pow(10, precision)) /
        Math.pow(10, precision)
      round = Number(round.toFixed(precision))
      const initialPrice = round > minimalBid ? round : round + extra
       */

      setInitialIntPrice(minimalBid);
      setBidsAmount(minimalBid);
    }
  }, [marketplaceListings]);

  const handleBidsAmount = async (e) => {
    if (Number(e.target.value) < initialIntPrice) {
      setIsPriceGood(false);
      setBidsAmount(e.target.value);
    } else {
      setIsPriceGood(true);
      setBidsAmount(e.target.value);
      setAmountToApprove(ethers.utils.parseUnits(e.target.value.toString(), currencyTokenDecimals));
      await checkAllowance(
        ethers.utils.parseUnits(e.target.value.toString(), currencyTokenDecimals)
      );
    }
  };
  const handleSubmit = async () => {
    const hasEnoughBalance = checkUserBalance(tokenBalance, bidsAmount);
    if (!hasEnoughBalance) {
      throw new Error("Not enough balance for approval.");
    }
    try {
      setIsLoadingButton(true);
      const bidsBigInt = ethers.utils.parseUnits(bidsAmount.toString(), currencyTokenDecimals);

      await auctionBids({
        args: [marketplaceListings[0].id, bidsBigInt, address, ""]
      });
      setSuccessFullBid(true);
    } catch (error) {
      setIsLoadingButton(false);
      throw new Error(error);
    } finally {
      setIsLoadingButton(false);
    }
  };
  const handleTermService = (e) => {
    setCheckTerms(e.target.checked);
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="fill-jacarta-700 h-6 w-6 dark:fill-white"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
                </svg>
              </button>
            </div>

            {/* <!-- Body --> */}
            {!successFullBid ? (
              <div className="modal-body p-6">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-jacarta-700 text-sm font-semibold dark:text-white">
                      Price
                    </span>
                  </div>
                  <div>
                    <span className="dark:text-jacarta-400 text-sm">
                      Balance: {tokenBalance?.displayValue} {currencySymbol}
                    </span>
                  </div>
                </div>
                <div className="dark:border-jacarta-600 border-jacarta-100 relative mb-2 flex items-center overflow-hidden rounded-lg border">
                  <div className="border-jacarta-100 bg-jacarta-50 flex flex-1 items-center self-stretch border-r px-2">
                    <span className="font-display text-jacarta-700 text-sm">{currencySymbol}</span>
                  </div>

                  <input
                    type="number"
                    className={`${
                      isPriceGood ? "border-green" : "border-red"
                    } focus:ring-accent h-12 w-full flex-[3] border-2 focus:ring-inse dark:text-jacarta-700`}
                    placeholder="Amount"
                    value={bidsAmount}
                    onChange={(e) => handleBidsAmount(e)}
                  />

                  <div className="bg-jacarta-50 border-jacarta-100 flex flex-1 justify-end self-stretch border-l dark:text-jacarta-700">
                    <span className="self-center px-2 text-sm">$130.82</span>
                  </div>
                </div>
                {!isPriceGood && (
                  <div className="text-left">
                    <span className="dark:text-warning text-sm">
                      ⚠️ Bid Price must be higher than {initialIntPrice} {currencySymbol}
                    </span>
                  </div>
                )}

                {/* <!-- Terms --> */}
                <div className="mt-4 flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="buyNowTerms"
                    className="checked:bg-accent dark:bg-jacarta-600 text-accent border-jacarta-200 focus:ring-accent/20 dark:border-jacarta-500 h-5 w-5 self-start rounded focus:ring-offset-0"
                    onClick={handleTermService}
                  />
                  <label htmlFor="buyNowTerms" className="dark:text-jacarta-200 text-sm">
                    By checking this box, I agree to {"DSponsor's"}{" "}
                    <Link href="#" className="text-accent">
                      Terms of Service
                    </Link>
                  </label>
                </div>
              </div>
            ) : (
              <div className="modal-body p-6">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-4">
                    <p>Congratulations your bid has been submit ! 🎉 </p>
                    <div
                      className="dark:border-jacarta-600 bg-green   flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
                      data-tippy-content="Verified Collection"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="h-[.875rem] w-[.875rem] fill-white"
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* <!-- end body --> */}

            <div className="modal-footer">
              {allowanceTrue && !successFullBid ? (
                <Web3Button
                  contractAddress={config[chainId]?.smartContracts?.DSPONSORMP?.address}
                  action={() => {
                    toast.promise(handleApprove, {
                      pending: "Waiting for confirmation 🕒",
                      success: "Approval confirmed 👌",
                      error: "Approval rejected 🤯"
                    });
                  }}
                  className={` !rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all ${
                    !isPriceGood || !checkTerms ? "btn-disabled" : "!bg-accent !cursor-pointer"
                  } `}
                  isDisabled={!isPriceGood || !checkTerms}
                >
                  {isLoadingButton ? <Spinner size="sm" color="default" /> : "Approve"}
                </Web3Button>
              ) : !successFullBid ? (
                <div className="flex items-center justify-center space-x-4">
                  <Web3Button
                    contractAddress={config[chainId]?.smartContracts?.DSPONSORMP?.address}
                    action={() => {
                      toast.promise(handleSubmit, {
                        pending: "Waiting for confirmation 🕒",
                        success: "Bid confirmed 👌",
                        error: "Bid rejected 🤯"
                      });
                    }}
                    className={` !rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all ${
                      !isPriceGood || !checkTerms ? "btn-disabled" : "!bg-accent !cursor-pointer"
                    } `}
                    isDisabled={!isPriceGood || !checkTerms}
                  >
                    {isLoadingButton ? <Spinner size="sm" color="default" /> : "Place Bid"}
                  </Web3Button>
                  {/* <button
                  type="button"
                  disabled={!isPriceGood}
                  className={`  ${!isPriceGood ? "btn-disabled" : "bg-accent shadow-accent-volume"} hover:bg-accent-dark rounded-full py-3 px-8 text-center font-semibold text-white transition-all`}
                  onClick={handleSubmit}
                >
                  Place Bid
                </button> */}
                </div>
              ) : (
                <button
                  className="!rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all !bg-accent !cursor-pointer"
                  onClick={toggleBidsModal}
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidsModal;
