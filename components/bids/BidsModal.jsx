import React, { useState } from "react";
import { Confirm_bid } from "../metamask/Metamask";
import { useAddress } from "@thirdweb-dev/react";
import { useMetaMask } from "metamask-react";
import {
  prepareContractCall,
  resolveMethod,
  sendTransaction,
  toWei,
} from "thirdweb";
import {
  currencyContract,
  erc20Contract,
} from "../../lib/config/listing.config";
import { metamaskWallet } from "@thirdweb-dev/react";

const BidsModal = ({ showBidsModal, setShowBidsModal, listing }) => {
  console.log(account, "Metamask Account Logging");

  return <></>;
  const wallet = metamaskWallet();
  const [ETHAmount, setETHAmount] = useState("0.005");

  console.log(toWei(ETHAmount), "ETH Amount...");

  const address = useAddress();
  const { listingId } = listing;

  console.log(listingId, "Listing ID...");

  const confirmBid = async () => {
    try {
      const transaction = prepareContractCall({
        contract: currencyContract(listing.currency),
        method: resolveMethod("approve"),
        params: [
          "0xed948545Ec9e86678979e05cbafc39ef92BBda80",
          toWei(ETHAmount), // Convert ETH amount to wei
        ],
      });

      const transactionHash = await sendTransaction({});
      console.log(transactionHash, "Transaction Hash...");
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
                  // onClick={() => setShowBidsModal(false)}
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
                  <span>
                    {/* <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0"
                      y="0"
                      viewBox="0 0 1920 1920"
                      // xml:space="preserve"
                      className="mr-1 h-5 w-5"
                    >
                      <path
                        fill="#8A92B2"
                        d="M959.8 80.7L420.1 976.3 959.8 731z"
                      ></path>
                      <path
                        fill="#62688F"
                        d="M959.8 731L420.1 976.3l539.7 319.1zm539.8 245.3L959.8 80.7V731z"
                      ></path>
                      <path
                        fill="#454A75"
                        d="M959.8 1295.4l539.8-319.1L959.8 731z"
                      ></path>
                      <path
                        fill="#8A92B2"
                        d="M420.1 1078.7l539.7 760.6v-441.7z"
                      ></path>
                      <path
                        fill="#62688F"
                        d="M959.8 1397.6v441.7l540.1-760.6z"
                      ></path>
                    </svg> */}
                    <svg className="icon icon-ETH mr-1 h-5 w-5"></svg>
                  </span>
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
                <Confirm_bid bidFunc={confirmBid} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BidsModal;
