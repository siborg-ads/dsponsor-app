import { useState } from "react";
import { useNetworkMismatch } from "@thirdweb-dev/react";
import { useSwitchChain } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";

const ChainDetector = () => {
  const isMismatched = useNetworkMismatch();
  const switchChain = useSwitchChain();

  const handleSwitchChain = () => {
    switchChain(Sepolia.chainId);
  };

  return (
    <div>
      {isMismatched && (
        <div
          id="popup-modal"
          tabIndex=""
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-screen bg-jacarta-600 bg-opacity-70"
        >
          <div className="relative p-4 w-full sm:max-w-lg max-w-sm font-display">
            <div className="relative bg-jacarta-500 rounded-lg shadow dark:bg-gray-700">
              <div className="p-7 text-center py-10">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    fill="red"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-3 text-lg font-normal text-gray-500 dark:text-gray-400">
                  You are not connected to the supported network
                </h3>
                <p className="text-base text-gray-500 my-4 font-normal">
                  Please click the button below &quot;Switch To Sepolia&quot;
                  and then check your wallet extension to approve the network
                  switch.
                </p>
                <button
                  onClick={handleSwitchChain}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="py-2.5 px-5 ms-3 text-md font-medium text-gray-900 focus:outline-none bg-jacarta-700 rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Switch To Sepolia
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChainDetector;
