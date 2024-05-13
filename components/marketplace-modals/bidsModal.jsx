import React, { useEffect, useState } from "react";
import {
  useWallet,
  ConnectWallet,
  useContractWrite,
  useContract,
  useBalance,
} from "@thirdweb-dev/react";
import WalletConnection from "../wallet/walletConnection";

import { contractAddressConfig } from "../../lib/config/listing.config";
import ChainDetector from "../chain-detector/ChainDetector";
import { useTransaction } from "../../utils/transactions";

const BidsModal = ({ showBidsModal, setShowBidsModal, listing }) => {
  ///////////////////////////////////////////////////////
  /////////// contracts ////////////////
  ///////////////////////////////////////////////////////
  const { contract: tokenContract } = useContract(listing?.currency);
  const { contract: dsponsorMpContract } = useContract(
    contractAddressConfig.dsponsor_marketplace_contract_address
  );

  ///////////////////////////////////////////////////////
  /////////// functions ////////////////
  ///////////////////////////////////////////////////////

  //TODO : define this inside of transactions.jsx handle approve function
  const { mutateAsync: approveERC20 } = useContractWrite(
    tokenContract,
    "approve"
  );
  const { mutateAsync: bid } = useContractWrite(dsponsorMpContract, "bid");

  ///////////////////////////////////////////////////////
  const [approvalStatus, setApprovalStatus] = useState("idle"); // idle, inProgress, approved
  const [bidAmount, setBidAmount] = useState(listing?.price * 1.05);
  const [bidAmountValid, setBidAmountValid] = useState(true);

  //wallet & address
  const wallet = useWallet();
  const balance = useBalance();

  const { handleApprove, handleBid } = useTransaction();

  ///////////////////////////////////////////////////////
  const handleBidAmountInput = (e) => {
    setBidAmount(e.target.value);
  };

  const validateBid = (enteredBid) => {
    const minBid = listing.price * 1.05;
    if (enteredBid < minBid.toFixed(listing.decimals)) {
      console.log(
        "Bid amount must be at least 5% higher than the current price. Minimum required bid: ",
        minBid.toFixed(listing.decimals)
      );
      return false;
    }
    return true;
  };

  const handleApproveButton = async () => {
    if (!validateBid(bidAmount)) {
      setBidAmountValid(false);
      return;
    }
    try {
      setBidAmountValid(true);
      setApprovalStatus("inProgress");
      await handleApprove(
        bidAmount * 10 ** listing.decimals,
        tokenContract,
        contractAddressConfig.dsponsor_marketplace_contract_address,
        approveERC20
      );
      setApprovalStatus("approved");
    } catch (error) {
      console.error("Error during approval:", error);
      setApprovalStatus("idle");
    }
  };

  const confirmBid = async () => {
    try {
      await handleBid(
        bid,
        Number(listing.id),
        bidAmount * 10 ** listing.decimals
      );
      console.log("Bid placed successfully");
      setShowBidsModal(false);
    } catch (error) {
      setShowBidsModal(false);
      console.error("Error:", error);
      alert("Failed to place the bid. Please try again.");
    }
  };

  const handleTermService = (e) => {
    console.log(validate);
    setValidate(e.target.checked);
  };
  return (
    <>
      <div
        className={showBidsModal ? "modal fade show block" : "modal hide"}
        id="placeBidModal"
        tabIndex="-1"
        aria-labelledby="placeBidLabel"
        aria-hidden="true"
      >
        {wallet ? (
          <>
            <ChainDetector />
            <div className="modal-dialog max-w-2xl">
              <div className="modal-content  bg-sigray-light border-sigray-border">
                <div className="modal-header">
                  <h5 className="modal-title text-white" id="placeBidLabel">
                    Confirm Bid
                  </h5>
                  <button
                    onClick={() => {
                      setShowBidsModal(false);
                      setApprovalStatus("idle");
                      setBidAmountValid(true);
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

                {/* Body */}
                <div className="modal-body p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-display text-sm font-semibold text-jacarta-700 text-white">
                      Price
                    </span>
                  </div>

                  <div className="relative mb-2 flex items-center overflow-hidden rounded-lg border border-jacarta-100 dark:border-jacarta-600">
                    <div className="flex flex-1 items-center self-stretch border-r border-jacarta-100 bg-jacarta-50 px-2">
                      <span className="font-display text-sm text-jacarta-700">
                        {listing.symbol}
                      </span>
                    </div>

                    <input
                      type="number"
                      className="focus:ring-accent h-12 w-full flex-[3] border-0 focus:ring-inse dark:text-jacarta-700"
                      placeholder="Amount"
                      value={bidAmount}
                      onChange={(e) => handleBidAmountInput(e)}
                    />

                    {/* TODO : recalculate this */}
                    <div className="flex flex-1 justify-end self-stretch border-l border-jacarta-100 bg-jacarta-50">
                      <span className="self-center px-2 text-sm">$130.82</span>
                    </div>
                  </div>

                  <div className="text-left">
                    {!bidAmountValid && (
                      <span className="text-red text-sm">
                        Bid amount must be at least 5% higher than the current
                        price (
                        {(listing.price * 1.05).toFixed(listing.decimals)} or
                        more)
                      </span>
                    )}
                  </div>

                  {/* TODO : do balance here with the right currency */}
                  {/* <div className="text-right">
                      <span className="text-sm text-white dark:text-jacarta-400">
                        Balance: {balance.data.displayValue} {balance.data.symbol}
                      </span>
                    </div> */}

                  {/* Terms */}
                  <div className="mt-4 flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      className="h-5 w-5 self-start rounded border-jacarta-200 text-accent checked:bg-accent focus:ring-accent/20 focus:ring-offset-0 dark:border-jacarta-500 dark:bg-jacarta-600"
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm text-white dark:text-jacarta-200"
                    >
                      By checking this box, I agree to DSponsor&apos;s{" "}
                      <a href="#" className="text-accent">
                        Terms of Service
                      </a>
                    </label>
                  </div>
                </div>
                {/* end body */}

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
                        onClick={() => confirmBid()}
                      >
                        Confirm Bid
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <WalletConnection setShowModal={setShowBidsModal} />
        )}
      </div>
    </>
  );
};

export default BidsModal;
