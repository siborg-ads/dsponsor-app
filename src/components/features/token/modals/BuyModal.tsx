import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useBalance } from "@thirdweb-dev/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Divider, Spinner } from "@nextui-org/react";
import { useChainContext } from "@/hooks/useChainContext";
import MintWithCrossmintButton from "@/components/ui/buttons/MintWithCrossmintButton/MintWithCrossmintButton";
import BuyWithCrossmintButton from "@/components/ui/buttons/BuyWithCrossmintButton/BuyWithCrossmintButton";
import { parseUnits } from "ethers/lib/utils";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import ResponsiveTooltip from "@/components/ui/ResponsiveTooltip";
import Input from "@/components/ui/Input";
import config from "@/config/config";
import { ngrokURL } from "@/data/ngrok";
import { BigNumber } from "ethers";
import StyledWeb3Button from "@/components/ui/buttons/StyledWeb3Button";
import { Address } from "thirdweb";

const BuyModal = ({
  tags,
  formatTokenId,
  tokenStatut,
  allowanceTrue,
  handleApprove: handleProtocolApprove,
  finalPrice,
  royaltiesFeesAmount,
  successFullUpload,
  feesAmount,
  successFullBuyModal,
  finalPriceNotFormatted,
  royalties,
  price,
  tokenId,
  selectedCurrency,
  name,
  image,
  handleSubmit,
  handleBuyModal,
  handleBuySubmitWithNative,
  tokenData,
  address,
  token,
  user,
  offer,
  referrer,
  currencyContract,
  insufficentBalance,
  canPayWithNativeToken,
  setInsufficentBalance,
  setCanPayWithNativeToken,
  nativeTokenBalance,
  totalPrice,
  hasEnoughBalance,
  hasEnoughBalanceForNative,
  tokenEtherPriceRelayer,
  currencyDecimals
}: {
  tags: string[];
  // eslint-disable-next-line no-unused-vars
  formatTokenId: (tokenId: string) => string;
  tokenStatut: string;
  allowanceTrue: boolean;
  handleApprove: any;
  finalPrice: any;
  royaltiesFeesAmount: any;
  successFullUpload: boolean;
  feesAmount: any;
  successFullBuyModal: {
    title: string;
    body: string;
    subBody?: string;
    hrefButton?: string;
    buttonTitle: string;
  };
  finalPriceNotFormatted: string;
  royalties: number;
  price: string;
  tokenId: string;
  selectedCurrency: string;
  name: string;
  image: string;
  handleSubmit: Promise<unknown> | (() => Promise<unknown>);
  handleBuyModal: () => void;
  handleBuySubmitWithNative: Promise<unknown> | (() => Promise<unknown>);
  tokenData: string;
  address: Address;
  token: any;
  user: any;
  offer: any;
  referrer: Address;
  currencyContract: string;
  insufficentBalance: boolean;
  canPayWithNativeToken: boolean;
  // eslint-disable-next-line no-unused-vars
  setInsufficentBalance: (value: boolean) => void;
  // eslint-disable-next-line no-unused-vars
  setCanPayWithNativeToken: (value: boolean) => void;
  nativeTokenBalance: any;
  totalPrice: number;
  hasEnoughBalance: boolean;
  hasEnoughBalanceForNative: boolean;
  tokenEtherPriceRelayer: any;
  currencyDecimals: number;
}) => {
  const [validate, setValidate] = useState(false);
  const [notEnoughFunds, setNotEnoughFunds] = useState(false);
  const [tooHighPriceForCrossmint, setTooHighPriceForCrossmint] = useState(false);

  const { currentChainObject } = useChainContext();
  const chainId = currentChainObject?.chainId;

  const modalRef = useRef<any>();

  const { data: currencyBalance } = useBalance(currencyContract);

  const chainConfig = config[chainId as number];

  useEffect(() => {
    if (!tokenEtherPriceRelayer?.amountInEthWithSlippage) return;

    const amountInEthWithSlippageBN = BigNumber.from(
      tokenEtherPriceRelayer?.amountInEthWithSlippage
    );

    const priceBN = BigNumber.from(finalPriceNotFormatted);

    if (currencyBalance?.value?.lt(priceBN)) {
      setInsufficentBalance(true);
    } else {
      setInsufficentBalance(false);
    }

    if (nativeTokenBalance?.value?.lt(amountInEthWithSlippageBN)) {
      setCanPayWithNativeToken(false);
    } else {
      setCanPayWithNativeToken(true);
    }
  }, [
    nativeTokenBalance,
    currencyBalance,
    setInsufficentBalance,
    setCanPayWithNativeToken,
    finalPriceNotFormatted,
    tokenEtherPriceRelayer
  ]);

  useEffect(() => {
    if (!hasEnoughBalance && !hasEnoughBalanceForNative) {
      setNotEnoughFunds(true);
    } else {
      setNotEnoughFunds(false);
    }
  }, [hasEnoughBalance, hasEnoughBalanceForNative]);

  const canPayWithCrossmint = chainConfig?.features?.crossmint?.enabled;

  const handleTermService = (e) => {
    setValidate(e.target.checked);
  };

  const handleApprove = async () => {
    try {
      await handleProtocolApprove();
    } catch (error) {
      console.error("Error approving", error);
      throw new Error(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleBuyModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleBuyModal, modalRef]);

  useEffect(() => {
    if (tokenEtherPriceRelayer && chainId && chainConfig) {
      const parsedBuyAmount = BigNumber.from(tokenEtherPriceRelayer?.amountInEthWithSlippage);
      const parsedPriceLimit = parseUnits(
        chainConfig?.features?.crossmint?.config?.priceLimit?.toString(),
        18
      );

      const tooHighPrice = parsedPriceLimit ? parsedBuyAmount?.gte(parsedPriceLimit) : true;

      if (tooHighPrice) {
        setTooHighPriceForCrossmint(true);
      } else {
        setTooHighPriceForCrossmint(false);
      }
    } else {
      setTooHighPriceForCrossmint(true);
    }
  }, [tokenEtherPriceRelayer, chainConfig, chainId]);

  // Ref instead of state to avoid re-renders
  const isProcessingRef = useRef(false);
  const onProcessingMint = async () => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;
    toast.info("Processing mint.");
  };

  const onProcessingBuy = async () => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;
    toast.info("Processing buy.");
  };

  return (
    <div>
      {/* <!-- Buy Now Modal --> */}
      <div className="modal-dialog max-w-2xl">
        <div className="modal-content !bg-secondaryBlack" ref={modalRef}>
          <div className="modal-header">
            <h5 className="modal-title" id="buyNowModalLabel">
              {!successFullUpload
                ? !successFullBuyModal
                  ? "Complete checkout"
                  : "Check your ad space"
                : successFullBuyModal.title}
            </h5>
            <button type="button" className="btn-close" onClick={handleBuyModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="fill-jacarta-700 h-6 w-6 dark:fill-white"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
              </svg>
            </button>
          </div>

          {/* <!-- Body --> */}
          {!successFullUpload ? (
            <div className="modal-body p-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-display text-jacarta-900 text-sm font-semibold dark:text-white">
                  Space # {tokenData ?? formatTokenId(tokenId)}
                </span>
                <span className="font-display text-jacarta-900 text-sm font-semibold dark:text-white">
                  Subtotal
                </span>
              </div>

              <div className="dark:border-jacarta-800 border-jacarta-100 relative justify-between flex min-h-[75px] border-t border-b py-4">
                <figure className="mr-5 self-start">
                  <Image
                    width={150}
                    height={150}
                    src={image ?? ""}
                    alt="logo"
                    className="rounded-2lg"
                    loading="lazy"
                  />
                </figure>
                <div className="overflow-hidden  justify-between flex flex-col  text-ellipsis whitespace-nowrap min-w-[200px]  ">
                  <h2 className="font-display overflow-hidden text-ellipsis whitespace-nowrap text-jacarta-900 text-base font-semibold dark:text-white">
                    {name}
                  </h2>
                  <div className="overflow-hidden flex flex-col text-ellipsis whitespace-nowrap   ">
                    <div className="flex gap-6  items-center justify-between">
                      <h3 className="font-display overflow-hidden text-ellipsis whitespace-nowrap text-jacarta-900 text-sm font-semibold dark:text-white">
                        Price
                      </h3>
                      <span className="dark:text-jacarta-100 text-sm font-medium tracking-tight overflow-auto min-w-[70px] flex justify-end">
                        {price} {selectedCurrency}
                      </span>
                    </div>

                    <div className="flex gap-6  items-center justify-between">
                      <span className="dark:text-jacarta-100 text-jacarta-100 mr-1 block text-sm font-semibold">
                        Protocol fees: 4%
                      </span>
                      <span className="dark:text-jacarta-100 text-sm  tracking-tight overflow-auto min-w-[60px] flex justify-end">
                        {feesAmount} {selectedCurrency}
                      </span>
                    </div>

                    {tokenStatut === "DIRECT" && (
                      <div className="flex gap-6  items-center justify-between">
                        <span className="dark:text-jacarta-100 text-jacarta-100 mr-1 block text-sm font-semibold">
                          Royalties fees: {royalties}%
                        </span>
                        <span className="dark:text-jacarta-100 text-sm  tracking-tight overflow-auto min-w-[60px] flex justify-end">
                          {royaltiesFeesAmount} {selectedCurrency}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-end">
                      <Divider className="mt-4 w-16 " />
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- Total --> */}
              <div className="dark:border-jacarta-800 border-jacarta-100 mb-2 flex items-center justify-between border-b py-2.5">
                <span className="font-display text-jacarta-900 hover:text-primaryPurple font-semibold dark:text-white">
                  Total
                </span>
                <div className="ml-auto">
                  <span className="flex items-center whitespace-nowrap">
                    <span className="text-green font-medium tracking-tight">
                      {finalPrice} {selectedCurrency} ($
                      {tokenEtherPriceRelayer?.amountUSDCFormatted})
                    </span>
                  </span>
                  {/* <div className="dark:text-jacarta-100 text-right">$130.82</div> */}
                </div>
              </div>

              {/* <!-- Terms --> */}
              <div className="mt-4 flex items-center space-x-2">
                <Input
                  type="checkbox"
                  id="buyNowTerms"
                  onClick={handleTermService}
                  className="checked:bg-primaryPurple !text-primaryPurple border-jacarta-200 focus:ring-primaryPurple/20 dark:border-jacarta-500 h-5 !w-5 self-start rounded focus:ring-offset-0"
                />
                <label htmlFor="buyNowTerms" className="dark:text-jacarta-200 text-sm">
                  By checking this box, I agree to {"SiBorg Ads's"}{" "}
                  <Link
                    href="https://docs.google.com/document/d/15um5c6mMoKc8V1rVyRJ7tcIxFDmtE8xe75mx-CdB84w"
                    className="text-primaryPurple"
                  >
                    Terms of Service
                  </Link>
                </label>
              </div>
            </div>
          ) : (
            <div className="modal-body p-6">
              <div className="flex flex-col gap-2">
                <div className="flex gap-4">
                  <p>{successFullBuyModal.body} </p>
                </div>
                {successFullBuyModal.subBody && <p>{successFullBuyModal.subBody} </p>}
              </div>

              <div className="flex flex-col items-center mt-8">
                <Link href={`/profile/${address}`}>
                  <button className="!rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all !bg-primaryPurple hover:!bg-opacity-80 !cursor-pointer">
                    My profile
                  </button>
                </Link>
              </div>
            </div>
          )}

          {/* <!-- end body --> */}
          {!successFullUpload && (
            <div className="modal-footer flex flex-col p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="flex flex-col items-center md:gap-2 gap-6">
                  {!insufficentBalance ? (
                    <React.Fragment>
                      {/* Approve Button */}
                      <div
                        className={`grid grid-cols-1 mx-auto ${totalPrice > 0 && "md:grid-cols-2"} gap-6 w-full`}
                      >
                        {totalPrice > 0 && (
                          <StyledWeb3Button
                            contractAddress={
                              currentChainObject?.smartContracts?.DSPONSORADMIN?.address as Address
                            }
                            onClick={async () => {
                              await toast.promise(handleApprove, {
                                pending: "Waiting for confirmation 🕒",
                                success: "Approval confirmed 👌",
                                error: "Approval rejected 🤯"
                              });
                            }}
                            isDisabled={
                              !validate ||
                              !finalPriceNotFormatted ||
                              !allowanceTrue ||
                              notEnoughFunds
                            }
                            defaultText={notEnoughFunds ? "Not enough funds" : "Approve 🔓 (1/2)"}
                          />
                        )}

                        {/* Place Bid Button */}
                        <StyledWeb3Button
                          contractAddress={
                            currentChainObject?.smartContracts?.DSPONSORADMIN?.address as Address
                          }
                          onClick={async () => {
                            await toast.promise(handleSubmit, {
                              pending: "Waiting for confirmation 🕒",
                              success: "Buy confirmed 👌",
                              error: "Buy rejected 🤯"
                            });
                          }}
                          isDisabled={
                            !validate || (allowanceTrue && totalPrice > 0) || notEnoughFunds
                          }
                          defaultText={
                            notEnoughFunds
                              ? "Not enough funds"
                              : totalPrice > 0
                                ? "Buy Now 💸 (2/2)"
                                : "Mint for free"
                          }
                        />
                      </div>

                      {totalPrice > 0 && (
                        <ResponsiveTooltip
                          text={`You need to approve the marketplace contract to spend your ${selectedCurrency} on this transaction.`}
                        >
                          <span className="text-xs text-jacarta-100 inline-flex items-center gap-1">
                            <InformationCircleIcon className="w-4 h-4 text-jacarta-100" />
                            Why do I have to approve ?
                          </span>
                        </ResponsiveTooltip>
                      )}
                    </React.Fragment>
                  ) : (
                    <StyledWeb3Button
                      contractAddress={
                        currentChainObject?.smartContracts?.DSPONSORADMIN?.address as Address
                      }
                      onClick={async () => {
                        await toast.promise(handleBuySubmitWithNative, {
                          pending: "Waiting for confirmation 🕒",
                          success: "Transaction confirmed 👌",
                          error: "Transaction rejected 🤯"
                        });
                      }}
                      isDisabled={!validate || !canPayWithNativeToken || notEnoughFunds}
                      defaultText={
                        notEnoughFunds ? "Not enough funds" : "Confirm checkout with ETH 💸"
                      }
                    />
                  )}
                </div>

                {/* SuccessFullUpload condition to show a Link */}
                {successFullUpload && (
                  <Link href={successFullBuyModal.hrefButton ?? "#"}>
                    <button className="!rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all !bg-primaryPurple hover:!bg-opacity-80 !cursor-pointer">
                      {successFullBuyModal.buttonTitle}
                    </button>
                  </Link>
                )}
              </div>

              {/* Crossmint buttons section */}
              {canPayWithCrossmint && address && !successFullUpload && (
                <div className="mt-2">
                  <div className="flex items-center justify-center w-full">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    {/* Render appropriate button based on token.isListed */}
                    {!token.isListed ? (
                      <div className="flex flex-col gap-2">
                        <MintWithCrossmintButton
                          whPassThroughArgs={JSON.stringify({ tags })}
                          offer={offer}
                          token={token}
                          currencyDecimals={currencyDecimals}
                          price={BigNumber.from(
                            tokenEtherPriceRelayer?.amountInEthWithSlippage ?? "0"
                          )}
                          user={user}
                          isBid={false}
                          referrer={referrer}
                          actions={{
                            processing: onProcessingMint,
                            success: () => {
                              toast.success("Minting successful");
                            },
                            error: (error) => {
                              toast.error(`Minting failed: ${error.message}`);
                            }
                          }}
                          config={chainConfig?.features.crossmint.config}
                          isLoadingRender={() => <Spinner size="sm" color="default" />}
                          isActiveRender={`Buy NOW ${finalPrice} ${selectedCurrency} with card `}
                          isDisabled={!validate || !finalPrice || tooHighPriceForCrossmint}
                          successCallbackURL={window.location.href.replace(
                            "http://localhost:3000",
                            ngrokURL
                          )}
                          failureCallbackURL={window.location.href.replace(
                            "http://localhost:3000",
                            ngrokURL
                          )}
                        />

                        {tooHighPriceForCrossmint && (
                          <span className="text-xs text-center text-red inline-flex items-center gap-1">
                            <InformationCircleIcon className="w-4 h-4 text-white" />
                            Amount is too high to buy with credit card.
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <BuyWithCrossmintButton
                          whPassThroughArgs={JSON.stringify({ tags })}
                          offer={offer}
                          token={token}
                          user={user}
                          isBid={false}
                          price={BigNumber.from(
                            tokenEtherPriceRelayer?.amountInEthWithSlippage ?? "0"
                          )}
                          currencyDecimals={currencyDecimals}
                          referrer={referrer}
                          actions={{
                            processing: onProcessingBuy,
                            success: () => {
                              toast.success("Buying successful");
                            },
                            error: (error) => {
                              toast.error(`Buying failed: ${error.message}`);
                            }
                          }}
                          isLoadingRender={() => <Spinner size="sm" color="default" />}
                          isActiveRender={`Buy NOW ${finalPrice} ${selectedCurrency} with card `}
                          config={chainConfig?.features.crossmint.config}
                          isDisabled={!validate || tooHighPriceForCrossmint}
                          successCallbackURL={window.location.href.replace(
                            "http://localhost:3000",
                            ngrokURL
                          )}
                          failureCallbackURL={window.location.href.replace(
                            "http://localhost:3000",
                            ngrokURL
                          )}
                        />

                        {tooHighPriceForCrossmint && (
                          <span className="text-xs text-center text-red inline-flex items-center gap-1">
                            <InformationCircleIcon className="w-4 h-4 text-white" />
                            Amount is too high to buy with credit card.
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyModal;
