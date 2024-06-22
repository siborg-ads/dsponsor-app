import React, { useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import {
  Web3Button,
  useContractWrite,
  useBalanceForAddress,
  useBalance,
  useAddress
} from "@thirdweb-dev/react";
import { Spinner } from "@nextui-org/spinner";
import { toast } from "react-toastify";
import Link from "next/link";
import config from "../../config/config";
import { computeBidAmounts } from "../../utils/computeBidAmounts";
import { formatUnits, parseUnits } from "ethers/lib/utils";
import formatAndRoundPrice from "../../utils/formatAndRound";
import { fetchTokenPrice } from "../../utils/fetchTokenPrice";
import { getCookie } from "cookies-next";
import { BigNumber } from "bignumber.js";
import BidWithCrossmintButton from "../buttons/BidWithCrossmintButton/BidWithCrossmintButton";
import Tippy from "@tippyjs/react";
import { ClipboardIcon } from "@heroicons/react/20/solid";
import handleCopy from "../../utils/handleCopy";
import "tippy.js/dist/tippy.css";
import { ShareIcon } from "@heroicons/react/20/solid";

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
  setIsLoadingButton,
  currencyContract,
  token,
  user,
  offer,
  referrer
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
  const [insufficentBalance, setInsufficentBalance] = useState(false);
  const [tokenEtherPrice, setTokenEtherPrice] = useState(null);
  const [canPayWithNativeToken, setCanPayWithNativeToken] = useState(false);
  const [notEnoughFunds, setNotEnoughFunds] = useState(false);
  const [copied, setCopied] = useState(false);

  const chainConfig = config[chainId];
  const chainWETH = chainConfig?.smartContracts.WETH.address.toLowerCase();

  // If currency is WETH, we can pay with Crossmint
  // const canPayWithCrossmint =
  //   marketplaceListings[0]?.currency.toLowerCase() === chainWETH &&
  //   activated_features.canPayWithCrossmintEnabled;

  let frontURL;
  if (typeof window !== "undefined") {
    frontURL = window.location.origin;
  }

  const isWETH = currencyContract.toLowerCase() === chainWETH;
  const canPayWithCrossmint = isWETH && chainConfig?.features?.crossmint?.enabled;
  const modalRef = useRef();
  const inputRef = useRef(null);

  const userAddr = useAddress();

  const { data: nativeTokenBalance } = useBalance();
  const { data: currencyBalance } = useBalance(currencyContract);

  useEffect(() => {
    const fetchEtherPrice = async () => {
      const roundedBidsAmount = parseFloat(bidsAmount).toFixed(currencyTokenDecimals);
      const bidsAmountDecimals = parseUnits(roundedBidsAmount, currencyTokenDecimals);

      const tokenEtherPrice = await fetch(
        `https://relayer.dsponsor.com/api/${chainId}/prices?token=${currencyContract}&amount=${bidsAmountDecimals}&slippage=0.3`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
        .catch((error) => {
          return error;
        });

      const tokenEtherPriceDecimals = formatUnits(tokenEtherPrice?.amountInEthWithSlippage, 18);

      setTokenEtherPrice(tokenEtherPriceDecimals);
    };

    if (bidsAmount && bidsAmount > 0 && chainId) {
      fetchEtherPrice();
    }
  }, [bidsAmount, chainId, currencyContract, currencyTokenDecimals]);

  useEffect(() => {
    if (!tokenEtherPrice || tokenEtherPrice <= 0) return;

    const fixedEtherPrice = Number(tokenEtherPrice).toFixed(currencyTokenDecimals);
    const tokenEtherPriceDecimals = parseUnits(fixedEtherPrice, currencyTokenDecimals);

    const fixedBidsAmount = Number(bidsAmount).toFixed(currencyTokenDecimals);
    const bidsAmountDecimals = parseUnits(fixedBidsAmount, currencyTokenDecimals);

    const hasInsufficientBalance =
      currencyBalance &&
      (currencyBalance?.value.lt(tokenEtherPriceDecimals) ||
        bidsAmountDecimals?.gt(currencyBalance?.value));

    setInsufficentBalance(hasInsufficientBalance);

    if (nativeTokenBalance && nativeTokenBalance?.value.lt(tokenEtherPriceDecimals)) {
      setCanPayWithNativeToken(false);
    } else {
      setCanPayWithNativeToken(true);
    }
  }, [
    marketplaceListings,
    chainId,
    bidsAmount,
    nativeTokenBalance,
    currencyBalance,
    currencyTokenDecimals,
    tokenEtherPrice
  ]);

  useEffect(() => {
    if (insufficentBalance && !canPayWithNativeToken) {
      setNotEnoughFunds(true);
    } else {
      setNotEnoughFunds(false);
    }
  }, [insufficentBalance, canPayWithNativeToken]);

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
      const fixedBidsAmount = Number(bidsAmount).toFixed(currencyTokenDecimals);
      const bidsAmountLocal = parseUnits(fixedBidsAmount, currencyTokenDecimals);
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

      const { newRefundBonusAmount, nextReservePricePerToken, protocolFeeAmount } =
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

      //const newRefundBonusAmountAdded = BigInt(newRefundBonusAmount) + BigInt(newAmount);
      const newRefundBonusFormatted = formatUnits(newRefundBonusAmount, currencyTokenDecimals);
      //const newRefundBonusAddedFormatted = formatUnits(
      //  newRefundBonusAmountAdded,
      //  currencyTokenDecimals
      //);

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
      setMount(true);
    }
  }, [marketplaceListings, currencyTokenDecimals, bidsAmount, mount]);

  useEffect(() => {
    if (bidsAmount && Number(bidsAmount) >= Number(initialIntPrice)) {
      setIsPriceGood(true);
    } else {
      setIsPriceGood(false);
    }
  }, [bidsAmount, initialIntPrice]);

  const handleBidsAmount = async (e) => {
    const value = e.target.value;
    const fixedValue = parseFloat(value).toFixed(currencyTokenDecimals);
    const parsedValue = ethers.utils.parseUnits(fixedValue, currencyTokenDecimals);

    if (Number(value) < initialIntPrice) {
      setBidsAmount(value);
    } else {
      setBidsAmount(value);
      setAmountToApprove(parsedValue);
      await checkAllowance(parsedValue);
    }
  };

  const handleApprove = async () => {
    try {
      setIsLoadingButton(true);
      await handleParentApprove();
      // await handleParentApprove();
      setSuccessFullBid(false);
    } catch (error) {
      setIsLoadingButton(false);
      throw new Error(error);
    } finally {
      setIsLoadingButton(false);
    }
  };

  const handleSubmitWithNative = async () => {
    const hasEnoughBalance = checkUserBalance(tokenBalance, bidsAmount, currencyTokenDecimals);

    if (!hasEnoughBalance && !canPayWithNativeToken) {
      console.error("Not enough balance to confirm checkout");
      throw new Error("Not enough balance to confirm checkout");
    }

    const hasEnoughBalanceForNative = checkUserBalance(nativeTokenBalance, tokenEtherPrice, 18);

    if (!hasEnoughBalanceForNative) {
      console.error("Not enough balance to confirm checkout");
      throw new Error("Not enough balance to confirm checkout");
    }

    try {
      setIsLoadingButton(true);
      const bidsBigInt = ethers.utils.parseUnits(
        bidsAmount.toFixed(currencyTokenDecimals).toString(),
        Number(currencyTokenDecimals)
      );
      const tokenEtherPriceBigNumber = parseUnits(tokenEtherPrice.toFixed(18).toString(), 18);

      const referralAddress = getCookie("_rid") || "";

      await auctionBids({
        args: [marketplaceListings[0].id, bidsBigInt, address, referralAddress],
        overrides: { value: tokenEtherPriceBigNumber }
      });

      setSuccessFullBid(true);
    } catch (error) {
      setIsLoadingButton(false);
      console.error(error);
      throw new Error(error);
    } finally {
      setIsLoadingButton(false);
    }
  };

  const handleSubmit = async () => {
    const hasEnoughBalance = checkUserBalance(tokenBalance, bidsAmount, currencyTokenDecimals);
    if (!hasEnoughBalance) {
      console.error("Not enough balance for approval.");
      throw new Error("Not enough balance for approval.");
    }
    try {
      setIsLoadingButton(true);
      const bidsBigInt = ethers.utils.parseUnits(
        Number(bidsAmount).toFixed(currencyTokenDecimals).toString(),
        Number(currencyTokenDecimals)
      );

      const referralAddress = getCookie("_rid") || "";

      await auctionBids({
        args: [marketplaceListings[0].id, bidsBigInt, address, referralAddress]
      });
      setSuccessFullBid(true);
    } catch (error) {
      setIsLoadingButton(false);
      console.error(error);
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

  // Ref instead of state to avoid re-renders
  const isProcessingRef = useRef(false);
  const onProcessingBid = async () => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;
    toast.info("Processing mint.");
  };

  return (
    <div>
      <div className="modal fade show block">
        <div className="modal-dialog max-w-2xl">
          <div className="modal-content" ref={modalRef}>
            <div className="modal-header">
              <h5 className="modal-title" id="placeBidLabel">
                {!successFullBid && false ? "Place a bid" : "Bid submitted"}
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
            {!successFullBid && false ? (
              <div className="modal-body p-6">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center justify-between">
                    <span className="font-display flex items-center gap-4 text-jacarta-900 text-sm font-semibold dark:text-white">
                      Price
                    </span>
                  </div>
                  <div>
                    <span className="dark:text-jacarta-100 text-sm">
                      Balance: {formatAndRoundPrice(tokenBalance?.displayValue) ?? 0}{" "}
                      {currencySymbol}
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
                      maxLength={currencyTokenDecimals}
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

                <div className="flex items-center gap-4">
                  {bidsAmount < initialIntPrice && (
                    <button
                      className="text-primaryPurple hover:text-opacity-80"
                      onClick={() => {
                        setBidsAmount(initialIntPrice);
                      }}
                    >
                      Use minimal bid
                    </button>
                  )}

                  <div className={`text-left ${!isPriceGood ? "" : "opacity-0"}`}>
                    <span className="dark:text-warning text-sm">
                      {!isPriceGood && (
                        <>
                          ⚠️ Bid Price must be higher than {initialIntPrice} {currencySymbol}{" "}
                        </>
                      )}
                    </span>
                  </div>
                </div>

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
                        <div className="grid grid-cols-7 items-center gap-4 mx-auto w-full min-w-max">
                          <div className="bg-jacarta-600 col-span-3 duration-400 shadow p-4 rounded-xl font-semibold text-base text-white text-center min-w-[200px] max-w-[200px]">
                            Ad Space bought
                          </div>

                          <div className="text-center flex justify-center items-center min-w-max">
                            <span className="text-white text-center flex items-center font-semibold text-sm min-w-[50px] max-w-[50px]">
                              OR
                            </span>
                          </div>

                          <div className="bg-jacarta-600 col-span-3 duration-400 shadow p-4 rounded-xl font-semibold text-base text-white text-center min-w-[200px] max-w-[200px]">
                            Your bid back +{" "}
                            {Number(bidsAmount) >= Number(initialIntPrice)
                              ? formatAndRoundPrice(refundedPrice)
                              : 0}{" "}
                            {currencySymbol} Reward
                          </div>
                        </div>
                        <div className="grid grid-cols-7 items-center gap-4 mx-auto w-full">
                          <div className="w-full col-span-3 text-base text-white flex justify-center items-center text-center min-w-[200px] max-w-[200px]">
                            If auction winner
                          </div>

                          <div />

                          <div className="w-full col-span-3 text-base text-white flex justify-center items-center text-center min-w-[200px] max-w-[200px]">
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
                  </div>
                  <div className="flex items-center">
                    <span>You can check the bid status at anytime in your profile page.</span>
                  </div>
                </div>

                <div className="flex flex-col justify-center my-8">
                  {currencySymbol === "WETH" && (
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-lg text-primaryPink font-semibold text-center">
                        You will earn {Math.floor(protocolFeeAmount) ?? 0} boxes if you win the
                        auction !
                      </span>
                      <span className="text-lg text-white font-semibold text-center">
                        Want to earn more?
                      </span>

                      <div className="flex items-center gap-4 mt-8">
                        <button
                          onClick={() => {
                            const text = encodeURIComponent(
                              `Participate in @siborgapp's "bid to earn" auction to secure ad space NFT on @siborgapp search results!\n\nEarn perks with boxes and get rewarded when outbid! 💰\n\n#Web3Monetization #DigitalRWA #SiBorgAds\n ${frontURL}/?_rid=${userAddr}`
                            );
                            const url = `https://twitter.com/intent/tweet?text=${text}`;
                            window.open(url, "_blank");
                          }}
                          className={`bg-primaryPurple hover:bg-opacity-80 rounded-2lg text-white p-2 flex items-center justify-center text-center gap-2`}
                        >
                          <span className="flex items-center justify-center gap-2 w-full text-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              viewBox="0 0 50 50"
                              className="text-white w-5 h-5 fill-white"
                            >
                              <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"></path>
                            </svg>
                            Share on X
                          </span>
                        </button>

                        <Tippy
                          content={copied ? "Copied!" : "Copy"}
                          placement="top"
                          trigger="click"
                        >
                          <button
                            onClick={() => {
                              if (navigator.share) {
                                navigator
                                  .share({
                                    title: "My referral code",
                                    text: `You can now use my referral code on SiBorg Ads.\n ${frontURL}/?_rid=${userAddr}`,
                                    url: `${frontURL}/?_rid=${userAddr}`
                                  })
                                  .catch((error) => console.error("Error sharing", error));
                              } else {
                                handleCopy(`${frontURL}/?_rid=${userAddr}`, setCopied);
                                console.error("Web Share API is not supported in this browser");
                              }
                            }}
                            className={`bg-primaryPurple hover:bg-opacity-80 rounded-2lg text-center flex items-center justify-center text-white p-2`}
                          >
                            <span className="flex items-center justify-center gap-2 w-full text-center">
                              <ClipboardIcon className="w-5 h-5" />
                              Copy
                            </span>
                          </button>
                        </Tippy>
                      </div>
                    </div>
                  )}
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
            {!successFullBid && false && (
              <div className="modal-footer flex items-center justify-center gap-4 p-6">
                <>
                  <div className="flex flex-col items-center space-y-6">
                    {!insufficentBalance ? (
                      <>
                        {allowanceTrue ? (
                          <>
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
                                !isPriceGood || !checkTerms || !bidsAmount
                                  ? "btn-disabled cursor-not-allowed !text-black opacity-30"
                                  : "!text-white !bg-primaryPurple !cursor-pointer"
                              } `}
                              isDisabled={!isPriceGood || !checkTerms || !bidsAmount}
                            >
                              {isLoadingButton ? (
                                <Spinner size="sm" color="default" />
                              ) : notEnoughFunds ? (
                                "Not enough funds"
                              ) : (
                                "Approve"
                              )}
                            </Web3Button>
                          </>
                        ) : (
                          <>
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
                                notEnoughFunds ? (
                                  "Not enough funds"
                                ) : (
                                  "Buy Now"
                                )
                              ) : notEnoughFunds ? (
                                "Not enough funds"
                              ) : (
                                "Place Bid"
                              )}
                            </Web3Button>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <Web3Button
                          contractAddress={config[chainId]?.smartContracts?.DSPONSORMP?.address}
                          action={() => {
                            toast.promise(handleSubmitWithNative, {
                              pending: "Waiting for confirmation 🕒",
                              success: "Bid confirmed 👌",
                              error: "Bid rejected 🤯"
                            });
                          }}
                          className={` !rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all ${
                            !isPriceGood || !checkTerms || !canPayWithNativeToken
                              ? "btn-disabled cursor-not-allowed"
                              : "!bg-primaryPurple !cursor-pointer"
                          } `}
                          isDisabled={!isPriceGood || !checkTerms || !canPayWithNativeToken}
                        >
                          {isLoadingButton ? (
                            <Spinner size="sm" color="default" />
                          ) : buyoutPriceReached ? (
                            notEnoughFunds ? (
                              "Not enough funds"
                            ) : (
                              "Buy Now with ETH"
                            )
                          ) : notEnoughFunds ? (
                            "Not enough funds"
                          ) : (
                            "Place Bid with ETH"
                          )}
                        </Web3Button>
                      </>
                    )}
                  </div>
                </>

                {canPayWithCrossmint && false && (
                  <>
                    <div className="flex items-center justify-center w-full">
                      <div className="flex-grow border-t border-gray-300"></div>
                      <span className="mx-4 text-gray-500">or</span>
                      <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    <div className="flex items-center justify-center space-x-4">
                      <BidWithCrossmintButton
                        offer={offer}
                        token={token}
                        user={user}
                        referrer={referrer}
                        config={chainConfig?.features.crossmint.config}
                        actions={{
                          processing: onProcessingBid,
                          success: () => {
                            toast.success("Buying successful");
                          },
                          error: (error) => {
                            toast.error(`Buying failed: ${error.message}`);
                          }
                        }}
                        isDisabled={!checkTerms}
                        isLoading={isLoadingButton}
                        isLoadingRender={() => <Spinner size="sm" color="default" />}
                        // isActiveRender={`Buy NOW ${finalPrice} ${selectedCurrency} with card `}
                        // isDisabled={!validate || isLoadingButton}
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidsModal;
