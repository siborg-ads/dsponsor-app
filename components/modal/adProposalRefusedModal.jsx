import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Web3Button } from "@thirdweb-dev/react";

const AddProposalRefusedModal = ({ id, offerId, tokenId, recordsProposalId, comments, closeRefuseModal, handleCommentChange, handleItemSubmit, setRefusedAdModal, successFullRefuseModal }) => {
  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString();
  };
  return (
    <>
      <div className="modal-dialog max-w-2xl min-w-[450px]">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="placeBidLabel">
              Comments
            </h5>
            <button type="button" className="btn-close" onClick={() => closeRefuseModal()}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="fill-jacarta-700 h-6 w-6 dark:fill-white">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
              </svg>
            </button>
          </div>
          <div className="modal-body p-6 flex gap-4 items-center justify-center">
            {!successFullRefuseModal ? (
              <div className="mb-6 w-full">
                <label htmlFor="item-description" className="font-display text-jacarta-700 mb-2 block dark:text-white">
                  Comments<span className="text-red">*</span>
                </label>
                <textarea
                  id={id}
                  className="dark:bg-jacarta-700  border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                  rows="4"
                  required
                  onChange={(e) => handleCommentChange(id, e.target.value)}
                  placeholder="Provide a comment of your refuse."
                ></textarea>
              </div>
            ) : (
              <div className="flex gap-2">
                <p>Proposal ad successfully refused </p>
                <div className="dark:border-jacarta-600 bg-green   flex h-6 w-6 items-center justify-center rounded-full border-2 border-white" data-tippy-content="Verified Collection">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="h-[.875rem] w-[.875rem] fill-white">
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                  </svg>
                </div>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center gap-4">
                {!successFullRefuseModal ? (
                  <Web3Button
                    contractAddress="0xdf42633BD40e8f46942e44a80F3A58d0Ec971f09"
                    action={() => handleItemSubmit(offerId, tokenId, recordsProposalId, false)}
                    className={` !rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all ${!comments ? "btn-disabled" : "!bg-red !cursor-pointer"} `}
                    disabled={!comments}
                  >
                    Refuse Ad Proposal
                  </Web3Button>
                ) : (
                  <button onClick={() => closeRefuseModal()} className="!rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all !bg-accent !cursor-pointer">
                    Close
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProposalRefusedModal;
