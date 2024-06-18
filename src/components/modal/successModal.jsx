import React, { useRef, useEffect } from "react";

const SuccessModal = ({ toggleSuccessModal, setIsLoadingButton }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        toggleSuccessModal();
        setIsLoadingButton(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsLoadingButton, toggleSuccessModal]);

  return (
    <>
      <div className="modal fade show block">
        <div className="modal-dialog max-w-2xl">
          <div className="modal-content" ref={modalRef}>
            <div className="modal-header">
              <h5 className="modal-title" id="placeBidLabel">
                Place a bid
              </h5>
              <button type="button" className="btn-close" onClick={toggleSuccessModal}>
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
                  <div className="flex items-center relative w-full">
                    <input
                      type="number"
                      onWheel={(e) => e.target.blur()}
                      className={`focus:ring-primaryPurple relative w-full flex-[3] border-transparent bg-jacarta-600 rounded-xl text-2xl py-2 font-semibold text-white focus:ring-inse`}
                      placeholder={`${initialIntPrice} or higher`}
                      value={bidsAmount}
                      onChange={(e) => handleBidsAmount(e)}
                    />
                    <span className="text-white font-semibold absolute right-0 px-4">
                      {currencySymbol}
                    </span>
                  </div>

                  <div className="bg-jacarta-600 w-1/4 border border-jacarta-900 border-opacity-10 rounded-xl flex flex-1 justify-center self-stretch border-l">
                    <span className="self-center px-4 text-xl text-center text-white font-semibold">
                      ${formatAndRoundPrice(tokenPrice) ?? 0}
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
                            {refundedPrice} {currencySymbol} Outbid reward
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
                  <button
                    className="!rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all !bg-primaryPurple !cursor-pointer"
                    onClick={toggleSuccessModal}
                  >
                    Close
                  </button>
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
    </>
  );
};

export default SuccessModal;
