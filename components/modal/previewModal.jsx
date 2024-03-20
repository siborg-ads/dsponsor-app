import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Web3Button } from "@thirdweb-dev/react";

const PreviewModal = ({
  handlePreviewModal,
  handleSubmit,
  name = null,
  link = null,
  description = null,
  startDate = null,
  endDate = null,
  selectedNumber = null,
  selectedUnitPrice = null,
  selectedCurrency = null,
  customContract = null,
  selectedRoyalties = null,
  previewImage = null,
  validate,
  errors,
  successFullUpload,
  address,
  buttonTitle,
  modalTitle,
  successFullUploadModal,
}) => {
  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString();
  };
  console.log("successFullUploadModal", successFullUploadModal.title);

  return (
    <div>
      <div className="modal-dialog max-w-2xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="placeBidLabel">
              {modalTitle}
            </h5>
            <button type="button" className="btn-close" onClick={() => handlePreviewModal()}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="fill-jacarta-700 h-6 w-6 dark:fill-white">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
              </svg>
            </button>
          </div>

          <div className="modal-body p-6 flex gap-4 items-center justify-center">
            {!successFullUpload ? (
              <div className="flex ">
                <div>
                  <p className="font-display text-jacarta-700 mb-2 block dark:text-white">{name ? <span>Name : {!errors.nameError ? name : <span className="text-red">{errors.nameError}</span>}</span> : ""}</p>
                  {description && (
                    <p className="font-display text-jacarta-700 mb-2 block dark:text-white">Description: {!errors.descriptionError ? description : <span className="text-red">{errors.descriptionError}</span>}</p>
                  )}
                  <p className="font-display text-jacarta-700 mb-2 block dark:text-white">
                    Link :{" "}
                    {!errors.linkError ? (
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        {link}
                      </a>
                    ) : (
                      <span className="text-red"> {errors.linkError}</span>
                    )}
                  </p>
                  {!previewImage && (
                    <p className="font-display text-jacarta-700 mb-2 block dark:text-white">
                      Image preview : <span className="text-red"> {errors.imageError}</span>
                    </p>
                  )}
                  <p className="font-display text-jacarta-700 mb-2 block dark:text-white">
                    {startDate ? <span>Start Date : {!errors.startDateError ? formatDate(startDate) : <span className="text-red">{errors.startDateError}</span>}</span> : ""}
                  </p>
                  {endDate ? (
                    <p className="font-display text-jacarta-700 mb-2 block dark:text-white">End Date : {!errors.endDateError ? formatDate(endDate) : <span className="text-red">{errors.endDateError}</span>}</p>
                  ) : (
                    ""
                  )}
                  {selectedNumber ? (
                    <p className="font-display text-jacarta-700 mb-2 block dark:text-white">Number of Items : {!errors.numberError ? `${selectedNumber}` : <span className="text-red">{errors.numberError}</span>}</p>
                  ) : (
                    ""
                  )}
                  {selectedUnitPrice ? (
                    <p className="font-display text-jacarta-700 mb-2 block dark:text-white">Unit Price : {!errors.unitPriceError ? ` ${selectedUnitPrice}` : <span className="text-red">{errors.unitPriceError}</span>}</p>
                  ) : (
                    ""
                  )}
                  {customContract ? (
                    <p className="font-display text-jacarta-700 mb-2 block dark:text-white">Custom Contract : {!errors.currencyError ? customContract : <span className="text-red">{errors.currencyError}</span>}</p>
                  ) : selectedCurrency ? (
                    <p className="font-display text-jacarta-700 mb-2 block dark:text-white">Currency : {!errors.currencyError ? ` ${selectedCurrency}` : <span className="text-red">{errors.currencyError}</span>}</p>
                  ) : (
                    ""
                  )}
                  {selectedRoyalties ? (
                    <p className="font-display text-jacarta-700 mb-2 block dark:text-white">Royalties : {!errors.royaltyError ? `${selectedRoyalties}%` : <span className="text-red">{errors.royaltyError}</span>}</p>
                  ) : (
                    ""
                  )}
                </div>
                {previewImage && (
                  <div className="mb-6  flex-col items-center justify-center ">
                    <label htmlFor="item-description" className="font-display text-jacarta-700 text-center mb-2 block dark:text-white">
                      Image preview :
                    </label>
                    <div style={{ width: "300px", height: "300px", position: "relative" }}>
                      <Image src={previewImage} width={300} height={200} alt="Preview" className="object-contain h-full" />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <p>{successFullUploadModal.body} </p>
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
                {!successFullUpload ? (
                  <Web3Button
                    contractAddress="0xA82B4bBc8e6aC3C100bBc769F4aE0360E9ac9FC3"
                    action={handleSubmit}
                    className={` !rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all ${!validate ? "btn-disabled" : "!bg-accent !cursor-pointer"} `}
                    disabled={!validate}
                  >
                    {buttonTitle}
                  </Web3Button>
                ) : (
                  <Link href={hrefButton}>
                    <button className="!rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all !bg-accent !cursor-pointer">{successFullUploadModal.buttonTitle}</button>
                  </Link>
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
