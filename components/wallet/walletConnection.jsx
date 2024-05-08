import React, { useState } from "react";
import Link from "next/link";
import { ConnectWallet } from "@thirdweb-dev/react";
import ChainDetector from "../chain-detector/ChainDetector";

const WalletConnection = ({ setShowModal }) => {
  return (
    <>
      <ChainDetector />

      <div className="modal-dialog max-w-2xl">
        <div className="modal-content bg-sigray-light border-sigray-border">
          <div className="modal-header">
            <h5 className="modal-title text-white" id="placeBidLabel">
              Connect Wallet First
            </h5>
            <button
              onClick={() => {
                setShowModal(false);
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
              Connect to your wallet before proceeding
            </p>

            <ConnectWallet theme={"dark"} modalSize={"wide"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default WalletConnection;
