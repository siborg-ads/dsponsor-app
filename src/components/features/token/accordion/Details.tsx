import React from "react";
import Link from "next/link";

import config from "@/config/config";
import displayOrCheckKnownAddress from "@/utils/addresses/displayOrCheckKnownAddress";
import { Address } from "thirdweb";
import { getOwnershipPeriod } from "@/utils/dates/period";

const Details = ({
  chainId,
  contractAddress,
  contractOwner,
  isUserOwner,
  initialCreator,
  isToken = true,
  status,
  listerAddress,
  offerData
}: {
  chainId: number;
  contractAddress: Address;
  contractOwner: Address;
  isUserOwner?: Address;
  initialCreator: Address;
  isToken?: boolean;
  status?: string;
  listerAddress?: Address;
  offerData: any;
}) => {
  const chainName = config[chainId]?.chainName;
  const chainExplorer = config[chainId]?.explorerBaseURL;

  return (
    <>
      <div className="overflow-x-auto rounded-lg scrollbar-custom dark:bg-secondaryBlack">
        {/* <!-- Details --> */}
        <div className="tab-pane fade" id="details" role="tabpanel" aria-labelledby="details-tab">
          <div className="p-6 bg-white rounded-tl-none dark:bg-secondaryBlack rounded-t-2lg rounded-b-2lg md:p-10">
            <div className="flex items-center mb-2">
              <span className="dark:text-jacarta-100 mr-2 min-w-[9rem]">Contract Address:</span>
              <Link
                href={`${chainExplorer ?? ""}/address/${contractAddress}`}
                target="_blank"
                className="text-primaryPink hover:text-jacarta-100"
              >
                {contractAddress}
              </Link>
            </div>
            <div className="flex items-center mb-2">
              <span className="dark:text-jacarta-100 mr-2 min-w-[9rem]">Contract Creator:</span>
              <Link
                href={`/profile/${initialCreator}`}
                target="_blank"
                className="text-primaryPink hover:text-jacarta-100"
              >
                {displayOrCheckKnownAddress(initialCreator)}
              </Link>
            </div>
            <div className="flex items-center mb-2">
              <span className="dark:text-jacarta-100 mr-2 min-w-[9rem]">Contract Owner:</span>
              <Link
                href={`/profile/${contractOwner}`}
                target="_blank"
                className="text-primaryPink hover:text-jacarta-100"
              >
                {displayOrCheckKnownAddress(contractOwner)}
              </Link>
            </div>

            {isToken && (
              <div className="flex items-center mb-2">
                <span className="dark:text-jacarta-100 mr-2 min-w-[9rem]">Owner:</span>
                {isUserOwner || (listerAddress && status) ? (
                  <div>
                    <Link
                      href={`/profile/${status === "CREATED" ? listerAddress : isUserOwner}`}
                      className="mr-2 text-primaryPink hover:text-jacarta-100"
                    >
                      {status === "CREATED" ? listerAddress : isUserOwner}
                    </Link>
                  </div>
                ) : (
                  "No owner"
                )}
              </div>
            )}
            <div className="flex flex-col justify-center gap-2">
              {offerData?.metadata?.offer?.valid_from && offerData?.metadata?.offer?.valid_to && (
                <div className="flex items-center">
                  <span className="dark:text-jacarta-100 mr-2 min-w-[9rem]">Validity Period:</span>
                  <span className="text-jacarta-900 dark:text-white">
                    {offerData?.metadata?.offer?.valid_from && offerData?.metadata?.offer?.valid_to
                      ? getOwnershipPeriod(
                          offerData?.metadata?.offer?.valid_from,
                          offerData?.metadata?.offer?.valid_to,
                          ""
                        )
                      : ""}
                  </span>
                </div>
              )}
              {offerData?.nftContract?.royalty?.bps && (
                <div className="flex items-center">
                  <span className="dark:text-jacarta-100 mr-2 min-w-[9rem]">Royalties:</span>
                  <span className="text-jacarta-900 dark:text-white">
                    {Number(offerData?.nftContract?.royalty?.bps) / 100}%
                  </span>
                </div>
              )}
              <div className="flex items-center">
                <span className="dark:text-jacarta-100 mr-2 min-w-[9rem]">Token Standard:</span>
                <span className="text-jacarta-900 dark:text-white">ERC-721</span>
              </div>
              <div className="flex items-center">
                <span className="dark:text-jacarta-100 mr-2 min-w-[9rem]">Blockchain:</span>
                <span className="text-jacarta-900 dark:text-white">{chainName}</span>
              </div>
              {offerData?.metadata?.offer?.telegramIntegration?.enabled && (
                <div className="flex items-center">
                  <span className="dark:text-jacarta-100 mr-2 min-w-[9rem]">
                    Telegram Channels ID:
                  </span>
                  <span className="text-jacarta-900 dark:text-white">
                    {offerData?.metadata?.offer?.telegramIntegration?.telegramChannels?.map(
                      (channel: any) => <span key={channel}>{channel}</span>
                    )}
                  </span>
                </div>
              )}
              {offerData?.metadata?.offer?.terms && (
                <div className="flex items-center">
                  <span className="dark:text-jacarta-100 mr-2 min-w-[9rem]">
                    Terms and conditions:
                  </span>
                  <Link
                    href={offerData?.metadata?.offer?.terms ?? "#"}
                    className="text-primaryPink hover:text-jacarta-100"
                    target="_blank"
                  >
                    <span>{offerData?.metadata?.offer?.terms ?? ""}</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
