import Link from "next/link";
import React, { useState } from "react";
import {
  useWallet,
  ConnectWallet,
  useContractWrite,
  useContract,
} from "@thirdweb-dev/react";
import Image from "next/image";
import { contractAddressConfig } from "../../lib/config/listing.config";
import ChainDetector from "../chain-detector/ChainDetector";
import { useTransaction } from "../../utils/transactions";

const BuyModal = ({ showBuyModal, setShowBuyModal, listing }) => {
  ///////////////////////////////////////////////////////
  /////////// contracts ////////////////
  ///////////////////////////////////////////////////////
  const { contract: tokenContract } = useContract(listing?.currency);
  const { contract: dsponsorMpContract } = useContract(
    contractAddressConfig.dsponsor_marketplace_contract_address
  );

  ///////////////////////////////////////////////////////
  /////////// funcs ////////////////
  ///////////////////////////////////////////////////////

  //TODO : define this inside of transactions.jsx handle approve function
  const { mutateAsync: approveERC20 } = useContractWrite(
    tokenContract,
    "approve"
  );
  const { mutateAsync: buy } = useContractWrite(dsponsorMpContract, "buy");

  ///////////////////////////////////////////////////////
  const [approvalStatus, setApprovalStatus] = useState("idle"); // idle, inProgress, approved

  //wallet & address
  const wallet = useWallet();
  const { handleApprove, handleBuy } = useTransaction();

  ///////////////////////////////////////////////////////
  const handleApproveButton = async () => {
    try {
      setApprovalStatus("inProgress");
      await handleApprove(
        listing?.buyoutPricePerToken,
        tokenContract,
        contractAddressConfig.dsponsor_marketplace_contract_address,
        approveERC20
      );
      setApprovalStatus("approved");
    } catch (error) {
      setShowBuyModal(false);
      console.error("Error during approval:", error);
      setApprovalStatus("idle");
    }
  };

  const confirmBuy = async () => {
    try {
      await handleBuy(
        buy,
        Number(listing.id),
        listing?.currency,
        listing?.buyoutPricePerToken
      );
      setShowBuyModal(false);
      console.log("Item bought successfully");
    } catch (error) {
      setShowBuyModal(false);
      console.error("Error:", error);
    }
  };

  const handleTermService = (e) => {
    setValidate(e.target.checked);
  };
  return (
    <>
      <div
        className={showBuyModal ? "modal fade show block" : "modal hide"}
        id="placeBidModal"
        tabIndex="-1"
        aria-labelledby="placeBidLabel"
        aria-hidden="true"
      >
        {wallet ? (
          <>
            <ChainDetector />
            <div className="modal-dialog max-w-2xl">
              <div className="modal-content bg-sigray-light border-sigray-border">
                <div className="modal-header">
                  <h5 className="modal-title text-white" id="buyNowModalLabel">
                    Complete checkout
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setShowBuyModal(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="fill-jacarta-700 h-6 w-6 fill-white"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                    </svg>
                  </button>
                </div>

                {/* <!-- Body --> */}
                <div className="modal-body p-6">
                  <div className="border-jacarta-600 relative flex items-center border-t border-b py-4">
                    <figure className="mr-5 self-start">
                      <Image
                        width={150}
                        height={150}
                        src={listing?.offer?.image}
                        alt="avatar 2"
                        className="rounded-2lg"
                        loading="lazy"
                      />
                    </figure>

                    <div>
                      <a
                        href="collection.html"
                        className="text-sipurple text-sm"
                      >
                        @Siborg_user #709
                      </a>
                      <h3 className="font-display  mb-1 text-base font-semibold text-white">
                        Lazyone Panda
                      </h3>
                      <div className="flex flex-wrap items-center">
                        <span className="text-jacarta-300  mr-1 block text-sm">
                          Creator Royalties:{" "}
                          {Number(listing?.token.nftContract.royaltyBps) / 100}%
                        </span>
                        <span className="block text-sm text-jacarta-300 dark:text-white">
                          + 4% Marketplace fee
                        </span>
                        <span data-tippy-content="The creator of this collection will receive 5% of the sale total from future sales of this item.">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className="fill-jacarta-300 h-4 w-4"
                          >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z" />
                          </svg>
                        </span>
                      </div>
                    </div>

                    <div className="ml-auto">
                      <span className="mb-1 flex items-center whitespace-nowrap">
                        {/* <span data-tippy-content="ETH">
                          <svg className="h-4 w-4">
                            <use xlinkHref="/icons.svg#icon-ETH"></use>
                          </svg>
                        </span> */}
                        <span className="text-jacarta-100 text-sm font-medium tracking-tight">
                          {listing?.price} {listing?.symbol}
                        </span>
                      </span>
                      <div className="text-jacarta-300 text-right text-sm">
                        $130.82
                      </div>
                    </div>
                  </div>

                  {/* <!-- Total --> */}
                  <div className="border-jacarta-600 mb-2 flex items-center justify-between border-b py-2.5">
                    <span className="font-display text-white hover:text-accent font-semibold">
                      Total
                    </span>
                    <div className="ml-auto">
                      <span className="flex items-center whitespace-nowrap">
                        {/* <span data-tippy-content="ETH">
                          <svg className="h-4 w-4">
                            <use xlinkHref="/icons.svg#icon-ETH"></use>
                          </svg>
                        </span> */}
                        <span className="text-green font-medium tracking-tight">
                          {listing?.price} {listing?.symbol}
                        </span>
                      </span>
                      <div className="text-jacarta-300 text-right">$130.82</div>
                    </div>
                  </div>

                  {/* <!-- Terms --> */}
                  <div className="mt-4 flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="buyNowTerms"
                      className="checked:bg-accent bg-jacarta-600 text-accent border-jacarta-200 focus:ring-accent/20 border-jacarta-500 h-5 w-5 self-start rounded focus:ring-offset-0"
                    />
                    <label
                      htmlFor="buyNowTerms"
                      className="text-jacarta-200 text-sm"
                    >
                      By checking this box, I agree to {"DSponsor's"}{" "}
                      <Link href="/tarms" className="text-accent">
                        Terms of Service
                      </Link>
                    </label>
                  </div>
                </div>
                {/* <!-- end body --> */}

                <div className="modal-footer">
                  <div className="flex items-center justify-center space-x-4 flex-wrap">
                    {/* Approve button */}
                    <div>
                      <button
                        className={
                          "" +
                          (approvalStatus === "approved"
                            ? "inline-block w-full rounded-full py-3 px-8 text-center font-semibold text-white bg-green shadow-green-volume"
                            : approvalStatus === "idle"
                            ? "inline-block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all bg-accent shadow-accent-volume hover:bg-accent-dark"
                            : "inline-block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all bg-sibinput")
                        }
                        disabled={
                          approvalStatus === "inProgress" ||
                          approvalStatus === "approved"
                        }
                        onClick={() => handleApproveButton()}
                      >
                        {approvalStatus === "inProgress"
                          ? "Approving in progress..."
                          : approvalStatus === "approved"
                          ? "Approved"
                          : "Approve"}
                      </button>
                    </div>

                    {/* Confirm Buy button : */}
                    <div>
                      <button
                        className={
                          "" +
                          (approvalStatus === "approved"
                            ? "inline-block w-full rounded-full  py-3 px-8 text-center font-semibold text-white  transition-all bg-accent shadow-accent-volume hover:bg-accent-dark "
                            : "inline-block w-full rounded-full  py-3 px-8 text-center font-semibold text-white  transition-all bg-sibinput")
                        }
                        disabled={approvalStatus !== "approved"}
                        onClick={() => confirmBuy()}
                      >
                        Confirm Buy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="modal-dialog max-w-2xl">
            <div className="modal-content bg-sigray-light border-sigray-border">
              <div className="modal-header">
                <h5 className="modal-title text-white" id="placeBidLabel">
                  Connect Wallet First
                </h5>
                <button
                  onClick={() => {
                    setShowBuyModal(false);
                    setApprovalStatus("idle");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-6 w-6 fill-jacarta-700 fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                  </svg>
                </button>
              </div>
              <div className="modal-body p-6">
                <p className="text-white pb-6">
                  Please connect your wallet first to confirm the bid.
                </p>

                <ConnectWallet theme={"dark"} modalSize={"wide"} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BuyModal;
