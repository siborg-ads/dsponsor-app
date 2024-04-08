import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Web3Button } from "@thirdweb-dev/react";

const PreviewModal = ({
  handlePreviewModal,
  handleSubmit,
  name = false,
  link = null,
  description = false,
  startDate = null,
  endDate = null,
  selectedNumber = null,
  selectedUnitPrice = null,
  selectedCurrency = null,
  selectedParameter = null,
  customContract = null,
  selectedRoyalties = null,
  previewImage = null,
  displayedParameter = null,
  validate,
  errors,
  successFullUpload,
  address,
  buttonTitle,
  modalTitle,
  successFullUploadModal,
  finalPrice = null,
  protocolFees = null,
}) => {
  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString();
  };
  console.log(name, name.length, "ici");
  return (
    <div>
      <div className="modal-dialog max-w-2xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="placeBidLabel">
              {!successFullUpload ? modalTitle : successFullUploadModal.title}
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
              <div className="flex gap-8 md:flex-row flex-col">
                <div>
                  <p className="font-display mb-2 block dark:text-white">
                    {name.length > 0 ? (
                      <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
                        Name : <span className="dark:text-white text-base ml-2"> {name} </span>
                      </span>
                    ) : !name ? (
                      <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
                        Name : <span className="text-red text-base ml-2">{errors.nameError}</span>
                      </span>
                    ) : (
                      ""
                    )}
                  </p>
                  <p className="font-display mb-2 block dark:text-white">
                    {description.length > 0 ? (
                      <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
                        Description : <span className="dark:text-white text-base ml-2"> {description} </span>
                      </span>
                    ) : !description ? (
                      <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
                        Description : <span className="text-red text-base ml-2">{errors.descriptionError}</span>
                      </span>
                    ) : (
                      ""
                    )}
                  </p>

                  <p className="font-display  mb-2 block text-jacarta-400 text-sm">
                    Link : {!errors.linkError ? <span className="dark:text-white text-base ml-2"> {link} </span> : <span className="text-red text-base ml-2"> {errors.linkError}</span>}
                  </p>
                  {!previewImage && (
                    <p className="font-display  mb-2 block text-jacarta-400 text-sm">
                      Image preview : <span className="text-red text-base ml-2"> {errors.imageError}</span>
                    </p>
                  )}
                  <p className="font-display  mb-2 block text-jacarta-400 text-sm">
                    {startDate ? (
                      <span>Start Date : {!errors.startDateError ? <span className="dark:text-white text-base ml-2"> {formatDate(startDate)} </span> : <span className="text-red">{errors.startDateError}</span>}</span>
                    ) : (
                      ""
                    )}
                  </p>
                  {endDate ? (
                    <p className="font-display  mb-2 block text-jacarta-400 text-sm">
                      End Date : {!errors.endDateError ? <span className="dark:text-white text-base ml-2"> {formatDate(endDate)} </span> : <span className="text-red">{errors.endDateError}</span>}
                    </p>
                  ) : (
                    ""
                  )}
                  {selectedNumber ? (
                    <p className="font-display  mb-2 block text-jacarta-400 text-sm">
                      Number of Items : {!errors.numberError ? <span className="dark:text-white text-base ml-2"> {selectedNumber} </span> : <span className="text-red">{errors.numberError}</span>}
                    </p>
                  ) : (
                    ""
                  )}
                  {selectedParameter ? (
                    <p className="font-display  mb-2 block text-jacarta-400 text-sm">
                      Type of Ad : {!errors.typeAdError ? <span className="dark:text-white text-base ml-2"> {displayedParameter} </span> : <span className="text-red">{errors.typeAdError}</span>}
                    </p>
                  ) : (
                    ""
                  )}
                  {selectedUnitPrice ? (
                    <p className="font-display  mb-2 block text-jacarta-400 text-sm">
                      Unit Price : {!errors.unitPriceError ? <span className="dark:text-white text-base ml-2"> {selectedUnitPrice} </span> : <span className="text-red">{errors.unitPriceError}</span>}
                    </p>
                  ) : (
                    ""
                  )}
                  {customContract ? (
                    <p className="font-display  mb-2 block text-jacarta-400 text-sm">
                      Custom Contract : {!errors.currencyError ? <span className="dark:text-white text-base ml-2"> {customContract} </span> : <span className="text-red">{errors.currencyError}</span>}
                    </p>
                  ) : selectedCurrency ? (
                    <p className="font-display  mb-2 block text-jacarta-400 text-sm">
                      Currency : {!errors.currencyError ? <span className="dark:text-white text-base ml-2"> {selectedCurrency} </span> : <span className="text-red">{errors.currencyError}</span>}
                    </p>
                  ) : (
                    ""
                  )}
                 
                 
                 
                </div>
                {previewImage && (
                  <div className="mb-6  flex-col items-center justify-center ">
                    <label htmlFor="item-description" className="font-display text-jacarta-400 text-sm text-center mb-2 block ">
                      Image preview :
                    </label>
                    <div style={{ width: "300px", height: "300px", position: "relative" }}>
                      <Image src={previewImage} width={300} height={200} alt="Preview" className="object-contain h-full" />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex gap-4">
                  <p>{successFullUploadModal.body} </p>
                  <div className="dark:border-jacarta-600 bg-green   flex h-6 w-6 items-center justify-center rounded-full border-2 border-white" data-tippy-content="Verified Collection">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="h-[.875rem] w-[.875rem] fill-white">
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                    </svg>
                  </div>
                </div>
                {successFullUploadModal.subBody && <p>{successFullUploadModal.subBody} </p>}
              </div>
            )}
          </div>

          <div className="modal-footer">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center gap-4">
                {!successFullUpload ? (
                  <Web3Button
                    contractAddress="0xdf42633BD40e8f46942e44a80F3A58d0Ec971f09"
                    action={handleSubmit}
                    className={` !rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all ${!validate ? "btn-disabled" : "!bg-accent !cursor-pointer"} `}
                    disabled={!validate}
                  >
                    {buttonTitle}
                  </Web3Button>
                ) : (
                  <Link href={successFullUploadModal.hrefButton}>
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
