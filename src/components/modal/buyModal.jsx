import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Web3Button, useBalance } from "@thirdweb-dev/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Divider } from "@nextui-org/react";
import { Spinner } from "@nextui-org/spinner";
import { useChainContext } from "../../contexts/hooks/useChainContext";
import { activated_features } from "../../data/activated_features";
import MintWithCrossmintButton from "../buttons/MintWithCrossmintButton/MintWithCrossmintButton";
import BuyWithCrossmintButton from "../buttons/BuyWithCrossmintButton/BuyWithCrossmintButton";
import { parseUnits } from "ethers/lib/utils";

const BuyModal = ({
  formatTokenId,
  tokenStatut,
  allowanceTrue,
  handleApprove: handleProtocolApprove,
  finalPrice,
  royaltiesFeesAmount,
  successFullUpload,
  feesAmount,
  successFullBuyModal,
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
  isLoadingButton,
  token,
  user,
  offer,
  referrer,
  currencyContract,
  insufficentBalance,
  canPayWithNativeToken,
  setInsufficentBalance,
  setCanPayWithNativeToken,
  nativeTokenBalance
}) => {
  const [validate, setValidate] = useState(false);
  const { currentChainObject } = useChainContext();
  const modalRef = useRef();

  const { data: currencyBalance } = useBalance(currencyContract);

  useEffect(() => {
    if (!finalPrice || finalPrice <= 0) return;

    const buyAmountDecimals = parseUnits(finalPrice.toString(), currencyBalance?.decimals);

    if (currencyBalance && currencyBalance?.value.lt(buyAmountDecimals)) {
      setInsufficentBalance(true);
    } else {
      setInsufficentBalance(false);
    }

    if (nativeTokenBalance && nativeTokenBalance?.value.lt(buyAmountDecimals)) {
      setCanPayWithNativeToken(false);
    } else {
      setCanPayWithNativeToken(true);
    }
  }, [
    nativeTokenBalance,
    currencyBalance,
    setInsufficentBalance,
    setCanPayWithNativeToken,
    finalPrice
  ]);

  // If currency is WETH, we can pay with Crossmint
  const canPayWithCrossmint =
    selectedCurrency === "WETH" && activated_features.canPayWithCrossmintEnabled;

  const handleTermService = (e) => {
    setValidate(e.target.checked);
  };

  const handleApprove = async () => {
    try {
      await handleProtocolApprove();
    } catch (error) {
      console.error("Error approving", error);
      throw new Error(error);
    } finally {
      // handleBuyModal();
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

              <div className="dark:border-jacarta-600 border-jacarta-100 relative justify-between flex min-h-[75px] border-t border-b py-4">
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
                        Price :{" "}
                      </h3>
                      <span className="dark:text-jacarta-100 text-sm font-medium tracking-tight overflow-auto min-w-[70px] flex justify-end">
                        {price} {selectedCurrency}
                      </span>
                    </div>

                    <div className="flex gap-6  items-center justify-between">
                      <span className="dark:text-jacarta-100 text-jacarta-100 mr-1 block text-sm">
                        Protocol fees: 4%
                      </span>
                      <span className="dark:text-jacarta-100 text-sm  tracking-tight overflow-auto min-w-[60px] flex justify-end">
                        {feesAmount}{" "}
                        {canPayWithNativeToken && insufficentBalance ? "ETH" : selectedCurrency}
                      </span>
                    </div>

                    {tokenStatut === "DIRECT" && (
                      <div className="flex gap-6  items-center justify-between">
                        <span className="dark:text-jacarta-100 text-jacarta-100 mr-1 block text-sm">
                          Royalties fees: {royalties}%
                        </span>
                        <span className="dark:text-jacarta-100 text-sm  tracking-tight overflow-auto min-w-[60px] flex justify-end">
                          {royaltiesFeesAmount}{" "}
                          {canPayWithNativeToken && insufficentBalance ? "ETH" : selectedCurrency}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-end">
                      <Divider className="mt-4 w-16 " />
                    </div>
                  </div>
                </div>

                {/* <div className="ml-auto h-full">
                  <span className="mb-1 flex flex-col items-end justify-end whitespace-nowrap">
                    <span className="dark:text-jacarta-100 text-sm font-medium tracking-tight">
                      {price} {selectedCurrency}
                    </span>
                    <span className="dark:text-jacarta-100 text-sm font-medium tracking-tight">
                      {(price * protocolFees) / 100} {selectedCurrency}
                    </span>
                  </span>
                  <div className="dark:text-jacarta-100 text-right text-sm">$130.82</div>
                </div> */}
              </div>

              {/* <!-- Total --> */}
              <div className="dark:border-jacarta-600 border-jacarta-100 mb-2 flex items-center justify-between border-b py-2.5">
                <span className="font-display text-jacarta-900 hover:text-primaryPurple font-semibold dark:text-white">
                  Total
                </span>
                <div className="ml-auto">
                  <span className="flex items-center whitespace-nowrap">
                    <span className="text-green font-medium tracking-tight">
                      {finalPrice}{" "}
                      {canPayWithNativeToken && insufficentBalance ? "ETH" : selectedCurrency}
                    </span>
                  </span>
                  {/* <div className="dark:text-jacarta-100 text-right">$130.82</div> */}
                </div>
              </div>

              {/* <!-- Terms --> */}
              <div className="mt-4 flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="buyNowTerms"
                  className="checked:bg-primaryPurple dark:bg-jacarta-600 text-primaryPurple border-jacarta-200 focus:ring-primaryPurple/20 dark:border-jacarta-500 h-5 w-5 self-start rounded focus:ring-offset-0"
                  onClick={handleTermService}
                />
                <label htmlFor="buyNowTerms" className="dark:text-jacarta-200 text-sm">
                  By checking this box, I agree to {"SiBorg Ads's"}{" "}
                  <Link href="/terms-and-conditions" className="text-primaryPurple">
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
            <div className="modal-footer p-6">
              <div className="flex flex-col items-center space-y-6">
                <div className="flex items-center justify-center space-x-4">
                  {allowanceTrue && !successFullUpload && (
                    <>
                      <Web3Button
                        contractAddress={currentChainObject?.smartContracts?.DSPONSORADMIN?.address}
                        action={() => {
                          toast.promise(handleApprove, {
                            pending: "Waiting for confirmation 🕒",
                            success: "Approval confirmed 👌",
                            error: "Approval rejected 🤯"
                          });
                        }}
                        className={` !rounded-full !py-3 !px-8 !text-center !font-semibold !text-black  !transition-all ${!validate ? "btn-disabled cursor-not-allowed !text-black opacity-30" : "!text-white !bg-primaryPurple hover:!bg-opacity-80 !cursor-pointer"} `}
                        isDisabled={!validate || isLoadingButton}
                      >
                        {isLoadingButton ? <Spinner size="sm" color="default" /> : "Approve"}
                      </Web3Button>
                    </>
                  )}

                  {!successFullUpload &&
                    !allowanceTrue &&
                    (canPayWithNativeToken && insufficentBalance ? (
                      <>
                        <Web3Button
                          contractAddress={
                            currentChainObject?.smartContracts?.DSPONSORADMIN?.address
                          }
                          action={() => {
                            toast.promise(handleBuySubmitWithNative, {
                              pending: "Waiting for confirmation 🕒",
                              success: "Transaction confirmed 👌",
                              error: "Transaction rejected 🤯"
                            });
                          }}
                          className={` !rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all ${!validate || (insufficentBalance && !canPayWithNativeToken) ? "btn-disabled cursor-not-allowed !text-black" : "!bg-primaryPurple hover:!bg-opacity-80 !cursor-pointer"} `}
                          isDisabled={
                            !validate ||
                            isLoadingButton ||
                            (insufficentBalance && !canPayWithNativeToken)
                          }
                        >
                          {isLoadingButton ? (
                            <Spinner size="sm" color="default" />
                          ) : (
                            "Confirm checkout with ETH"
                          )}
                        </Web3Button>
                      </>
                    ) : (
                      <>
                        <Web3Button
                          contractAddress={
                            currentChainObject?.smartContracts?.DSPONSORADMIN?.address
                          }
                          action={() => {
                            toast.promise(handleSubmit, {
                              pending: "Waiting for confirmation 🕒",
                              success: "Transaction confirmed 👌",
                              error: "Transaction rejected 🤯"
                            });
                          }}
                          className={` !rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all ${!validate ? "btn-disabled cursor-not-allowed !text-black" : "!bg-primaryPurple hover:!bg-opacity-80 !cursor-pointer"} `}
                          isDisabled={!validate || isLoadingButton}
                        >
                          {isLoadingButton ? (
                            <Spinner size="sm" color="default" />
                          ) : (
                            "Confirm checkout"
                          )}
                        </Web3Button>
                      </>
                    ))}

                  {successFullUpload && (
                    <Link href={successFullBuyModal.hrefButton ?? "#"}>
                      <button className="!rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all !bg-primaryPurple hover:!bg-opacity-80 !cursor-pointer">
                        {successFullBuyModal.buttonTitle}
                      </button>
                    </Link>
                  )}
                </div>
                {canPayWithCrossmint && !successFullUpload && (
                  <>
                    <div className="flex items-center justify-center w-full">
                      <div className="flex-grow border-t border-gray-300"></div>
                      <span className="mx-4 text-gray-500">or</span>
                      <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    <div className="flex items-center justify-center space-x-4">
                      {!token.isListed && (
                        <MintWithCrossmintButton
                          offer={offer}
                          tokenData={tokenData}
                          token={token}
                          user={user}
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
                          isLoading={isLoadingButton}
                          isLoadingRender={() => <Spinner size="sm" color="default" />}
                          isActiveRender={`Buy NOW ${finalPrice} ${selectedCurrency} with card `}
                          isDisabled={!validate || isLoadingButton}
                        />
                      )}
                      {token.isListed && (
                        <BuyWithCrossmintButton
                          offer={offer}
                          token={token}
                          user={user}
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
                          isLoading={isLoadingButton}
                          isLoadingRender={() => <Spinner size="sm" color="default" />}
                          isActiveRender={`Buy NOW ${finalPrice} ${selectedCurrency} with card `}
                          isDisabled={!validate || isLoadingButton}
                        />
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyModal;
