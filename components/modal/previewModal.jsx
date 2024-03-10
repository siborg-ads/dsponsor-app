import React, { useState } from "react";

import Image from "next/image";
import { useAddress, useSwitchChain, useContract, useContractWrite, Web3Button, useStorageUpload, useTokenDecimals, CheckoutWithCard, CheckoutWithEth } from "@thirdweb-dev/react";

const PreviewModal = ({
  handlePreviewModal,
  handleSubmit,
  name,
  link,
  file,
  description,
  startDate,
  endDate,
  selectedNumber,
  selectedUnitPrice,
  selectedCurrency,
  customContract,
  selectedRoyalties,
  previewImage,
  validate,
}) => {
  const formatDate = (date) => {
    return date.toLocaleDateString();
  };
  const { mutateAsync: upload, isLoading } = useStorageUpload();

  return (
    <div>
      <div className="modal-dialog max-w-2xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="placeBidLabel">
              Offer Preview
            </h5>
            <button type="button" className="btn-close" onClick={() => handlePreviewModal()}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="fill-jacarta-700 h-6 w-6 dark:fill-white">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
              </svg>
            </button>
          </div>

          <div className="modal-body p-6 flex gap-4 items-center justify-center">
            <div>
              <p className="font-display text-jacarta-700  mb-2 block dark:text-white">
                {" "}
                <span>Name: {name}</span>{" "}
              </p>
              <p className="font-display text-jacarta-700  mb-2 block dark:text-white">Description: {description}</p>
              <p className="font-display text-jacarta-700  mb-2 block dark:text-white">
                Link:{" "}
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              </p>
              <p className="font-display text-jacarta-700  mb-2 block dark:text-white">
                {" "}
                <span>Start Date: {formatDate(startDate)}</span>{" "}
              </p>
              <p className="font-display text-jacarta-700  mb-2 block dark:text-white">End Date: {formatDate(endDate)}</p>
              <p className="font-display text-jacarta-700  mb-2 block dark:text-white">Number of Items: {selectedNumber}</p>
              <p className="font-display text-jacarta-700  mb-2 block dark:text-white">Unit Price: {selectedUnitPrice}</p>
              <p className="font-display text-jacarta-700  mb-2 block dark:text-white">Currency: {selectedCurrency}</p>
              <p className="font-display text-jacarta-700  mb-2 block dark:text-white">Custom Contract: {customContract}</p>
              <p className="font-display text-jacarta-700  mb-2 block dark:text-white">Royalties: {selectedRoyalties}%</p>
            </div>
            <div>
              {previewImage && (
                <div className="mb-6  flex-col items-center justify-center ">
                  <label htmlFor="item-description" className="font-display text-jacarta-700 text-center mb-2 block dark:text-white">
                    Offer preview
                  </label>
                  <div style={{ width: "300px", height: "200px", position: "relative" }}>
                    <Image src={previewImage} width={300} height={200} alt="Preview" className="object-contain" />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center gap-4">
                {!validate && (
                  <button className="bg-accent cursor-pointer rounded-full py-3 px-8 text-center font-semibold text-white transition-all" onClick={handleSubmit}>
                    Validate
                  </button>
                )}
                {validate && (
                  <button className="bg-accent cursor-pointer rounded-full py-3 px-8 text-center font-semibold text-white transition-all" onClick={handleSubmit}>
                    Revalidate
                  </button>
                )}
                {validate && (
                  <Web3Button
                    contractAddress="0xA82B4bBc8e6aC3C100bBc769F4aE0360E9ac9FC3"
                    action={() =>
                      mutateAsync({
                        args: [Object.values(JSON.parse(args[0])), Object.values(JSON.parse(args[1]))],
                      })
                    }
                    className="!bg-accent !cursor-pointer !rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all"
                  >
                    Create Ad Space Offer
                  </Web3Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
