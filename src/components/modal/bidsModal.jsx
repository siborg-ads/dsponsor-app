import React, { useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import { Web3Button, useContractWrite } from "@thirdweb-dev/react";
import { Spinner } from "@nextui-org/spinner";
import { toast } from "react-toastify";
import Link from "next/link";
import config from "../../config/config";
import { computeBidAmounts } from "../../utils/computeBidAmounts";
import { formatUnits, parseUnits } from "ethers/lib/utils";
import formatAndRoundPrice from "../../utils/formatAndRound";
import { fetchTokenPrice } from "../../utils/fetchTokenPrice";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
import { activated_features } from "../../data/activated_features";
import { getCookie } from "cookies-next";
import { BigNumber } from "bignumber.js";

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
  handleApprove: handleParentApprove,
  checkAllowance,
  isLoadingButton,
  setIsLoadingButton
}) => {
  const [initialIntPrice, setInitialIntPrice] = useState(null);
  const [isPriceGood, setIsPriceGood] = useState(true);
  const { mutateAsync: auctionBids } = useContractWrite(dsponsorMpContract, "bid");
  const [checkTerms, setCheckTerms] = useState(false);
  const [refundedPrice, setRefundedPrice] = useState(null);
  const [, setEndDate] = useState(null);
  const [, setMinBid] = useState(null);
  const [, setEndDateHour] = useState(null);
  const [tokenPrice, setTokenPrice] = useState(null);
  const [buyoutPriceReached, setBuyoutPriceReached] = useState(false);
  const [protocolFeeAmount, setProtocolFeeAmount] = useState(0);
  const [mount, setMount] = useState(false);

  // If currency is WETH, we can pay with Crossmint
  const canPayWithCrossmint =
    marketplaceListings[0]?.currency === config[chainId]?.crossmint?.WETH &&
    activated_features.canPayWithCrossmintEnabled;

  const modalRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      await fetchTokenPrice(
        marketplaceListings[0]?.currency,
        Number(chainId),
        parseUnits(
          new BigNumber(bidsAmount).toFixed(Number(currencyTokenDecimals)).toString(),
          Number(currencyTokenDecimals)
        )
      ).then((price) => {
        setTokenPrice(price);
      });
    };

    if (marketplaceListings && marketplaceListings[0] && bidsAmount && bidsAmount > 0 && chainId) {
      fetchData();
    } else {
      setTokenPrice(0);
    }
  }, [bidsAmount, chainId, marketplaceListings, currencyTokenDecimals]);

  useEffect(() => {
    if (marketplaceListings && marketplaceListings[0] && bidsAmount && bidsAmount > 0) {
      const bidsAmountLocal = parseUnits(bidsAmount, currencyTokenDecimals);
      const minimalBuyoutPerToken =
        marketplaceListings[0]?.bidPriceStructure?.minimalBuyoutPerToken;
      const buyoutPrice = marketplaceListings[0]?.buyoutPricePerToken;

      const isMinimalBuyout = bidsAmountLocal.gte(minimalBuyoutPerToken);
      const isBuyout = bidsAmountLocal.gte(buyoutPrice);

      if (isBuyout && isMinimalBuyout) {
        setBuyoutPriceReached(true);
      } else {
        setBuyoutPriceReached(false);
      }
    } else {
      setBuyoutPriceReached(false);
    }
  }, [marketplaceListings, bidsAmount, currencyTokenDecimals]);

  useEffect(() => {
    if (marketplaceListings[0] && bidsAmount && bidsAmount > 0 && currencyTokenDecimals) {
      const bidsAmountFixed = new BigNumber(bidsAmount).toFixed(Number(currencyTokenDecimals));
      const newBidPerToken = parseUnits(bidsAmountFixed, Number(currencyTokenDecimals));
      const reservePricePerToken = marketplaceListings[0]?.reservePricePerToken;
      const buyoutPricePerToken = marketplaceListings[0]?.buyoutPricePerToken;
      const previousPricePerToken =
        marketplaceListings[0]?.bidPriceStructure?.previousPricePerToken;
      const minimalAuctionBps = marketplaceListings[0]?.minimalBidBps;
      const bonusRefundBps = marketplaceListings[0]?.previousBidAmountBps;
      const royaltyBps = 0;
      const protocolFeeBps = marketplaceListings[0]?.protocolFeeBps;

      const { newAmount, newRefundBonusAmount, nextReservePricePerToken, protocolFeeAmount } =
        computeBidAmounts(
          newBidPerToken,
          1,
          reservePricePerToken,
          buyoutPricePerToken,
          previousPricePerToken,
          minimalAuctionBps,
          bonusRefundBps,
          royaltyBps,
          protocolFeeBps
        );

      const newRefundBonusAmountAdded = BigInt(newRefundBonusAmount) + BigInt(newAmount);
      const newRefundBonusFormatted = formatUnits(newRefundBonusAmountAdded, currencyTokenDecimals);

      const nextReservePricePerTokenFormatted = formatUnits(
        nextReservePricePerToken,
        currencyTokenDecimals
      );

      const protocolFeeAmountFormatted = formatUnits(protocolFeeAmount.toString(), 13);

      setProtocolFeeAmount(protocolFeeAmountFormatted);
      setRefundedPrice(newRefundBonusFormatted);
      setMinBid(nextReservePricePerTokenFormatted);
    } else {
      setMinBid(0);
      setRefundedPrice(0);
    }
  }, [bidsAmount, marketplaceListings, currencyTokenDecimals]);

  useEffect(() => {
    const endTime = marketplaceListings[0]?.endTime;
    const endTimeDate = new Date(endTime * 1000); // we convert the timestamp to milliseconds
    setEndDate(endTimeDate.toLocaleDateString());
    setEndDateHour(endTimeDate.toLocaleTimeString());
  }, [marketplaceListings]);

  useEffect(() => {
    const minimalBidPerToken = marketplaceListings[0]?.bidPriceStructure?.minimalBidPerToken;
    if (minimalBidPerToken && !bidsAmount && !mount) {
      const minimalBid = ethers.utils.formatUnits(minimalBidPerToken, currencyTokenDecimals);
      setInitialIntPrice(minimalBid);
      setBidsAmount(minimalBid);
      setMount(true);
    }
  }, [marketplaceListings, setBidsAmount, currencyTokenDecimals, bidsAmount, mount]);

  const handleBidsAmount = async (e) => {
    if (Number(e.target.value) < initialIntPrice) {
      setIsPriceGood(false);
      setBidsAmount(e.target.value);
    } else {
      setIsPriceGood(true);
      setBidsAmount(e.target.value);
      setAmountToApprove(
        ethers.utils.parseUnits(
          new BigNumber(Number(e.target.value)).toFixed(Number(currencyTokenDecimals)).toString(),
          Number(currencyTokenDecimals)
        )
      );
      await checkAllowance(
        ethers.utils.parseUnits(
          new BigNumber(Number(e.target.value)).toFixed(Number(currencyTokenDecimals)).toString(),
          Number(currencyTokenDecimals)
        )
      );
    }
  };

  const handleApprove = async () => {
    try {
      setIsLoadingButton(true);
      await handleParentApprove();
      // await handleParentApprove();
      setSuccessFullBid(true);
    } catch (error) {
      setIsLoadingButton(false);
      throw new Error(error);
    } finally {
      setIsLoadingButton(false);
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

      const referralAddress = getCookie("_rid") || "";

      await auctionBids({
        args: [marketplaceListings[0].id, bidsBigInt, address, referralAddress]
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        toggleBidsModal();
        // We would love the button to not spin after closing the modal
        setIsLoadingButton(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsLoadingButton, toggleBidsModal]);

  return (
    <div>
      <div className="modal fade show block">
        <div className="modal-dialog max-w-2xl">
          <div className="modal-content" ref={modalRef}>
            <div className="modal-header">
              <h5 className="modal-title" id="placeBidLabel">
                {!successFullBid ? "Place a bid" : "Bid submitted"}
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
                    <span className="font-display text-jacarta-900 text-sm font-semibold dark:text-white">
                      Price
                    </span>
                  </div>
                  <div>
                    <span className="dark:text-jacarta-100 text-sm">
                      Balance: {tokenBalance?.displayValue ?? 0} {currencySymbol}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center relative w-full overflow-hidden -pr-4">
                    <input
                      type="number"
                      onWheel={(e) => e.target.blur()}
                      className={`focus:ring-primaryPurple pr-20 relative w-full flex-[3] border-transparent bg-jacarta-600 rounded-xl text-2xl py-2 font-semibold text-white focus:ring-inse`}
                      placeholder={`${initialIntPrice} or higher`}
                      value={bidsAmount ?? ""}
                      onChange={(e) => handleBidsAmount(e)}
                    />
                    <span className="text-white font-semibold absolute right-0 px-4">
                      {currencySymbol.substring(0, 6)}
                    </span>
                  </div>

                  <div className="bg-jacarta-600 w-1/4 border border-jacarta-900 border-opacity-10 rounded-xl flex flex-1 justify-center self-stretch border-l">
                    <span className="self-center px-4 text-xl text-center text-white font-semibold">
                      ${formatAndRoundPrice(tokenPrice ?? 0)}
                    </span>
                  </div>
                </div>
                {!isPriceGood && (
                  <div className="text-left">
                    <span className="dark:text-warning text-sm">
                      ⚠️ Bid Price must be higher than {initialIntPrice} {currencySymbol}
                    </span>
                  </div>
                )}

                <div className="flex flex-col gap-8 py-4 items-center justify-center">
                  {buyoutPriceReached ? (
                    <>
                      <div className="flex items-center justify-center text-center">
                        Your bid is higher than the buyout price. You&apos;ll own the ad space
                        immediately once the transaction is confirmed.
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col gap-2 items-center text-center">
                        <span className="font-semibold text-white">What&apos;s next?</span>
                        <span className="text-white text-sm">
                          If someone outbids you, you will receive your bid amount back plus an
                          additional rewards. However, if no one outbids you, you will get the ad
                          space.
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="grid grid-cols-7 items-center gap-4 mx-auto w-full">
                          <div className="bg-jacarta-600 col-span-3 duration-400 shadow p-4 rounded-xl font-semibold text-base text-white flex justify-center items-center text-center">
                            Ad Space bought
                          </div>

                          <div className="flex justify-center">
                            <span className="text-white text-center items-center font-semibold text-sm">
                              OR
                            </span>
                          </div>

                          <div className="bg-jacarta-600 col-span-3 duration-400 shadow p-4 rounded-xl font-semibold text-base text-white flex justify-center items-center text-center">
                            {bidsAmount >= initialIntPrice ? formatAndRoundPrice(refundedPrice) : 0}{" "}
                            {currencySymbol} Reward
                          </div>
                        </div>
                        <div className="grid grid-cols-7 items-center gap-4 mx-auto w-full">
                          <div className="w-full col-span-3 text-base text-white flex justify-center items-center text-center">
                            If auction winner
                          </div>

                          <div />

                          <div className="w-full col-span-3 text-base text-white flex justify-center items-center text-center">
                            If outbided
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* <!-- Terms --> */}
                <div className="mt-8 flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="buyNowTerms"
                    className="checked:bg-primaryPurple dark:bg-jacarta-600 text-primaryPurple border-jacarta-200 focus:ring-primaryPurple/20 dark:border-jacarta-500 h-5 w-5 self-start rounded focus:ring-offset-0"
                    onClick={handleTermService}
                  />
                  <label htmlFor="buyNowTerms" className="dark:text-jacarta-200 text-sm">
                    By checking this box, I agree to {"SiBorg Ads's"}{" "}
                    <Link
                      href="/terms-and-conditions"
                      target="_blank"
                      className="text-primaryPurple"
                    >
                      Terms of Service
                    </Link>
                  </label>
                </div>
              </div>
            ) : !buyoutPriceReached ? (
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

                <div className="flex flex-col justify-center my-8">
                  {currencySymbol === "WETH" && (
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-lg text-white font-semibold text-center">
                        You will earn {Math.floor(protocolFeeAmount) ?? 0} boxes if you win the
                        auction.
                      </span>
                      <span className="text-lg text-white font-semibold text-center">
                        Want to earn more?
                      </span>{" "}
                      <span className="text-lg text-white font-semibold text-center">
                        Check and share your referral link in your{" "}
                        <Link
                          href={`/profile/${address}`}
                          className="text-primaryPurple hover:text-opacity-80"
                        >
                          profile
                        </Link>{" "}
                        page.
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-center">
                  <span>You can check the bid status at anytime in your profile page.</span>
                </div>
              </div>
            ) : (
              <>
                <div className="modal-body p-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-4">
                      <p>Congratulations ! 🎉 </p>
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

                  <div className="flex flex-col justify-center my-8">
                    {currencySymbol === "WETH" && (
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-lg text-white font-semibold text-center">
                          Congratulations, you have increased your number of boxes by{" "}
                          {Math.floor(protocolFeeAmount) ?? 0}. Check your profile page and referral
                          link to earn more.
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex items-center">
                    <span>You can check the bid status at anytime in your profile page.</span>
                  </div>
                </div>
              </>
            )}
            {/* <!-- end body --> */}

            <div className="modal-footer flex items-center justify-center gap-4 p-6">
              <div className="flex flex-col items-center space-y-6">
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
                    className={` !rounded-full !py-3 !px-8 !text-center !font-semibold !text-black !transition-all ${
                      !isPriceGood || !checkTerms
                        ? "btn-disabled cursor-not-allowed !text-black opacity-30"
                        : "!text-white !bg-primaryPurple !cursor-pointer"
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
                        !isPriceGood || !checkTerms
                          ? "btn-disabled cursor-not-allowed"
                          : "!bg-primaryPurple !cursor-pointer"
                      } `}
                      isDisabled={!isPriceGood || !checkTerms}
                    >
                      {isLoadingButton ? (
                        <Spinner size="sm" color="default" />
                      ) : buyoutPriceReached ? (
                        "Buy Now"
                      ) : (
                        "Place Bid"
                      )}
                    </Web3Button>
                    {/* <button
                  type="button"
                  disabled={!isPriceGood}
                  className={`  ${!isPriceGood ? "btn-disabled" : "bg-primaryPurple shadow-primaryPurple-volume"} hover:bg-primaryPurple-dark rounded-full py-3 px-8 text-center font-semibold text-white transition-all`}
                  onClick={handleSubmit}
                >
                  Place Bid
                </button> */}
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        className="!rounded-full hover:!bg-opacity-80 !py-3 !px-8 !text-center !font-semibold !text-white !transition-all !bg-primaryPurple !cursor-pointer"
                        onClick={toggleBidsModal}
                      >
                        Close
                      </button>
                      <Link href={`/profile/${address}`}>
                        <button className="!rounded-full hover:!bg-opacity-80 !py-3 !px-8 !text-center !font-semibold !text-white !transition-all !bg-primaryPurple !cursor-pointer">
                          My profile
                        </button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
              {canPayWithCrossmint && !successFullBid && (
                <>
                  <div className="flex items-center justify-center w-full">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    <CrossmintPayButton
                      contractAddress={config[chainId]?.smartContracts?.DSPONSORMP?.address}
                      action={() => {
                        toast.promise(handleSubmit, {
                          pending: "Waiting for confirmation 🕒",
                          success: "Bid confirmed 👌",
                          error: "Bid rejected 🤯"
                        });
                      }}
                      className={` !rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all ${
                        !isPriceGood || !checkTerms
                          ? "btn-disabled cursor-not-allowed"
                          : "!bg-primaryPurple !cursor-pointer"
                      } `}
                      isDisabled={!isPriceGood || !checkTerms}
                    >
                      {isLoadingButton ? (
                        <Spinner size="sm" color="default" />
                      ) : buyoutPriceReached ? (
                        "Buy Now"
                      ) : (
                        "Place Bid"
                      )}
                    </CrossmintPayButton>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidsModal;
