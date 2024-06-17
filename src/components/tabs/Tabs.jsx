import React from "react";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import { whiteListedAddress } from "../../utils/whiteListedAddress";
import { useChainContext } from "../../contexts/hooks/useChainContext";
import config from "../../config/config";
import displayOrCheckKnownAddress from "../../utils/displayOrCheckKnownAddress";

const ItemsTabs = ({ chainId, contractAddress, isUserOwner, initialCreator, isToken = true }) => {
  const { currentChainObject } = useChainContext();

  const chainName = config[chainId]?.network;
  const chainExplorer = currentChainObject?.explorerBaseUrl;

  return (
    <>
      <div className="scrollbar-custom overflow-x-auto rounded-lg dark:bg-secondaryBlack">
        {/* <!-- Details --> */}
        <div className="tab-pane fade" id="details" role="tabpanel" aria-labelledby="details-tab">
          <div className=" dark:bg-secondaryBlack rounded-t-2lg rounded-b-2lg rounded-tl-none bg-white p-6 md:p-10">
            <div className="mb-2 flex items-center">
              <span className="dark:text-jacarta-100 mr-2 min-w-[9rem]">Contract Address:</span>
              <Link
                href={`${chainExplorer}${contractAddress}`}
                target="_blank"
                className="text-primaryPink hover:text-jacarta-100"
              >
                {contractAddress}
              </Link>
            </div>
            <div className="mb-2 flex items-center">
              <span className="dark:text-jacarta-100 mr-2 min-w-[9rem]">Contract Creator:</span>
              <Link
                href={`/manage/${initialCreator}`}
                target="_blank"
                className="text-primaryPink hover:text-jacarta-100"
              >
                {displayOrCheckKnownAddress(initialCreator)}
              </Link>
            </div>

            {isToken && (
              <div className="mb-2 flex items-center">
                <span className="dark:text-jacarta-100 mr-2 min-w-[9rem]">Owner:</span>
                {isUserOwner ? (
                  <div>
                    <Link
                      href={`/manage/${isUserOwner}`}
                      className="text-primaryPink hover:text-jacarta-100 mr-2"
                    >
                      {isUserOwner}
                    </Link>
                  
                  </div>
                ) : (
                  "No owner"
                )}
              </div>
            )}
            <div className="mb-2 flex items-center">
              <span className="dark:text-jacarta-100 mr-2 min-w-[9rem]">Token Standard:</span>
              <span className="text-jacarta-900 dark:text-white">ERC-721</span>
            </div>
            <div className="flex items-center">
              <span className="dark:text-jacarta-100 mr-2 min-w-[9rem]">Blockchain:</span>
              <span className="text-jacarta-900 dark:text-white">{chainName}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemsTabs;
