import React, { useState } from "react";
import {
  useWallet,
  ConnectWallet,
  useContractWrite,
  useContract,
} from "@thirdweb-dev/react";

import { contractAddressConfig } from "../../lib/config/listing.config";
import ChainDetector from "../chain-detector/ChainDetector";
import { useTransaction } from "../../utils/transactions";

const BidsModal = ({ showBidsModal, setShowBidsModal, listing }) => {
  //wallet & address
  const wallet = useWallet();
  const { handleApprove, handleBid } = useTransaction();

  // eth amount
  const [ETHAmount, setETHAmount] = useState("0.005");

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
  const { mutateAsync: approveERC20 } = useContractWrite(
    tokenContract,
    "approve"
  );
  const { mutateAsync: approveBid } = useContractWrite(
    dsponsorMpContract,
    "bid"
  );

  const confirmBid = async () => {
    try {
      handleApprove(ETHAmount, tokenContract, approveERC20);
      handleBid(approveBid, Number(listing.listingId), ETHAmount);
    } catch (error) {
      console.error("Error:", error);
    }
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
                  <button onClick={() => setShowBidsModal(false)}>
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
                        ETH
                      </span>
                    </div>

                    <input
                      type="number"
                      className="focus:ring-accent h-12 w-full flex-[3] border-0 focus:ring-inse dark:text-jacarta-700"
                      placeholder="Amount"
                      value={ETHAmount}
                      onChange={(e) => handleEThAmount(e)}
                    />

                    <div className="flex flex-1 justify-end self-stretch border-l border-jacarta-100 bg-jacarta-50">
                      <span className="self-center px-2 text-sm">$130.82</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm text-white dark:text-jacarta-400">
                      Balance: 0.0000 WETH
                    </span>
                  </div>

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
                  <div className="flex items-center justify-center space-x-4">
                    {/* <Confirm_bid bidFunc={confirmBid} /> */}
                    <button
                      className="bg-white btn btn-primary"
                      onClick={() => confirmBid()}
                    >
                      Confirm Bid
                    </button>
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
                <button onClick={() => setShowBidsModal(false)}>
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
                <p className="text-white">
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

export default BidsModal;
