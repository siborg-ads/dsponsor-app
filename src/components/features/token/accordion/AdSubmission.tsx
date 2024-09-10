import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { shortenAddress } from "@thirdweb-dev/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalHelper from "@/components/ui/modals/Helper";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import ResponsiveTooltip from "@/components/ui/ResponsiveTooltip";
import { Divider } from "@nextui-org/react";
import StyledWeb3Button from "@/components/ui/buttons/StyledWeb3Button";
import { Address } from "thirdweb";
import NormalButton from "@/components/ui/buttons/NormalButton";
import { ChainObject } from "@/types/chain";
import { useSwitchChainContext } from "@/providers/SwitchChain";

const AdSubmission = ({
  chainConfig,
  approvalForAllToken = true,
  handleApprove,
  isListing = false,
  helperFeesListing,
  selectedStartingPrice,
  handlePreviewModal,
  protocolFees,
  handleSubmit,
  imageUrlVariants = [],
  name,
  link,
  description,
  startDate,
  endDate,
  selectedNumber,
  selectedUnitPrice,
  tokenSymbol,
  selectedParameter,
  selectedRoyalties,
  previewImage,
  displayedParameter,
  terms = [],
  validate,
  errors,
  successFullUpload,
  buttonTitle,
  modalTitle,
  successFullUploadModal,
  address,
  adSubmission,
  multipleAdsSubmission,
  createOffer,
  expectedMultipleAds
}: {
  chainConfig: ChainObject;
  approvalForAllToken?: boolean;
  handleApprove?: any;
  isListing?: boolean;
  helperFeesListing?: any;
  selectedStartingPrice?: number;
  handlePreviewModal: () => void;
  protocolFees?: number;
  // eslint-disable-next-line no-unused-vars
  handleSubmit: any;
  imageUrlVariants?: string[];
  name: string | boolean;
  link: string | boolean;
  description: boolean | string;
  startDate?: Date;
  endDate?: Date;
  selectedNumber?: number;
  selectedUnitPrice?: number;
  tokenSymbol?: string;
  tokenAddress?: Address;
  customTokenAddress?: Address;
  tokenDecimals?: number;
  selectedParameter?: string[];
  selectedRoyalties?: number;
  previewImage?: string[];
  displayedParameter?: string[];
  terms?: any;
  imageURLSteps?: any;
  validate: any;
  errors: any;
  successFullUpload: boolean;
  buttonTitle?: string;
  modalTitle?: string;
  successFullUploadModal: any;
  address?: string;
  adSubmission?: boolean;
  multipleAdsSubmission?: boolean;
  createOffer?: boolean;
  expectedMultipleAds?: number;
}) => {
  const [imageRatios, setImageRatios] = React.useState<any[]>([]);

  const { setSelectedChain } = useSwitchChainContext();
  useEffect(() => {
    if (chainConfig) {
      setSelectedChain(chainConfig?.network);
    }
  }, [chainConfig, setSelectedChain]);

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleString("en-EN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };

  const imageRatioDisplay = React.useCallback(
    (id) => {
      if (!imageUrlVariants[id]) return [];

      const ratios = imageUrlVariants[id].split(":");
      const stepWidth = 250;
      let width = Number(ratios[0]);
      let height = Number(ratios[1]);
      const ratioArray: number[] = [];
      if (ratios.length !== 2) {
        ratioArray.push(stepWidth);
        ratioArray.push(stepWidth);
      }
      if (width / height > 1) {
        ratioArray.push(stepWidth);
        ratioArray.push(stepWidth * (height / width));
      } else {
        ratioArray.push(stepWidth * (width / height));
        ratioArray.push(stepWidth);
      }

      return ratioArray;
    },
    [imageUrlVariants]
  );

  useEffect(() => {
    if (imageUrlVariants.length > 0) {
      let imageRatios: string[][] = [];

      imageUrlVariants?.forEach((image: any, index: number) => {
        if (index < (previewImage?.length as number)) {
          const preSplit = image.split("-");

          const imageRatio =
            preSplit.length === 2 ? preSplit[1].split(":") : preSplit[0].split(":");

          if (imageRatio.length === 2) {
            imageRatios.push(imageRatio);
          } else {
            imageRatios.push([imageRatio[0], imageRatio[0]]);
          }
        }
      });

      setImageRatios(imageRatios);
    }
  }, [imageRatioDisplay, imageUrlVariants, previewImage]);

  if (adSubmission && !successFullUpload) {
    return (
      <div className="modal-dialog max-h-[75vh] max-w-2xl md:min-w-md">
        <div className="modal-content !bg-secondaryBlack">
          <div className="modal-header">
            <div className="flex items-center justify-between w-full space-x-4">
              <h5 className="modal-title" id="placeBidLabel">
                Preview your ad submission
              </h5>
              <button
                type="button"
                className="btn-close-preview"
                onClick={() => handlePreviewModal()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="fill-jacarta-700 h-6 w-6 dark:fill-white"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="modal-body p-6 flex gap-4">
            <div className="flex flex-wrap gap-4 md:flex-row flex-col w-full">
              <div className="flex items-center justify-between gap-2 w-full">
                <span className="block dark:text-jacarta-100">Link </span>
                <span className="font-semibold text-red">
                  {!link || link === "" ? "No link provided" : link}
                </span>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center justify-between gap-2">
                  <span className="block dark:text-jacarta-100">
                    Image ({imageRatios[0] ? `${imageRatios[0][0]}:${imageRatios[0][1]}` : "N/A"})
                  </span>

                  <span className="font-semibold text-red">
                    {(errors.imageError || previewImage?.length === 0) && "No image provided"}
                  </span>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 border border-dashed bg-jacarta-100 bg-opacity-10">
                  <Image
                    src={previewImage?.[0] as string}
                    width={1600}
                    height={380}
                    className="w-full h-auto"
                    alt="Preview image"
                    style={{
                      objectFit: "contain",
                      objectPosition: "center",
                      aspectRatio:
                        imageRatios?.length > 0
                          ? `${imageRatios[0] ? imageRatios[0][0] : 1}/${imageRatios[0] ? imageRatios[0][1] : 1}`
                          : "1/1"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* submit ad button */}
          <div className="modal-footer">
            <div className="flex items-center justify-center space-x-4">
              <StyledWeb3Button
                contractAddress={chainConfig?.smartContracts?.DSPONSORADMIN?.address as Address}
                onClick={async () => {
                  await toast.promise(handleSubmit(true), {
                    pending: "Waiting for confirmation 🕒",
                    success: "Transaction confirmed 👌",
                    error: "Transaction rejected 🤯"
                  });
                }}
                isDisabled={!validate}
                defaultText={buttonTitle ?? "Submit"}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (multipleAdsSubmission && !successFullUpload) {
    return (
      <div className="modal-dialog max-h-[75vh] max-w-2xl md:min-w-md">
        <div className="modal-content !bg-secondaryBlack">
          <div className="modal-header">
            <div className="flex items-center justify-between w-full space-x-4">
              <h5 className="modal-title" id="placeBidLabel">
                Preview your multiple tokens ad submission
              </h5>
              <button
                type="button"
                className="btn-close-preview"
                onClick={() => handlePreviewModal()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="fill-jacarta-700 h-6 w-6 dark:fill-white"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="modal-body p-6 flex gap-4">
            <div className="flex flex-wrap gap-4 md:flex-row flex-col w-full">
              <div className="flex items-center justify-between gap-2 w-full">
                <span className="block dark:text-jacarta-100">Link</span>
                <span className="font-semibold text-red">
                  {link || link !== "" ? link : "No link provided"}
                </span>
              </div>

              {previewImage?.length === 0 && (
                <div className="flex flex-col gap-2 w-full">
                  <span className="font-semibold text-red">No images provided</span>
                </div>
              )}

              {(previewImage?.length as number) > 0 &&
                Array.from({ length: expectedMultipleAds as number })?.map((_, index: number) => (
                  <div className="flex flex-col gap-2 w-full" key={index}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="block dark:text-jacarta-100">
                        Image {index + 1} - (
                        {imageRatios[index]
                          ? `${imageRatios[index][0]}:${imageRatios[index][1]}`
                          : "N/A"}
                        )
                      </span>

                      <span className="font-semibold text-red">
                        {!previewImage?.[index] && "No image provided"}
                      </span>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2">
                      <Image
                        src={previewImage?.[index] as string}
                        width={1600}
                        height={380}
                        className="w-full h-auto bg-jacarta-200"
                        alt="Preview image"
                        style={{
                          objectFit: "contain",
                          objectPosition: "center",
                          aspectRatio:
                            imageRatios?.length > 0
                              ? `${imageRatios[index] ? imageRatios[index][0] : 1}/${imageRatios[index] ? imageRatios[index][1] : 1}`
                              : "1/1"
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* submit ad button */}
          <div className="modal-footer">
            <div className="flex items-center justify-center space-x-4">
              <StyledWeb3Button
                contractAddress={chainConfig?.smartContracts?.DSPONSORADMIN?.address as Address}
                onClick={async () => {
                  await toast.promise(handleSubmit(true), {
                    pending: "Waiting for confirmation 🕒",
                    success: "Transaction confirmed 👌",
                    error: "Transaction rejected 🤯"
                  });
                }}
                isDisabled={
                  !validate || previewImage?.length === 0 || previewImage?.some((image) => !image)
                }
                defaultText={buttonTitle ?? "Submit"}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-dialog w-full flex justify-center items-center">
      <div className="modal-content !bg-secondaryBlack max-w-xs md:min-w-[600px] md:max-w-2xl">
        <div className="modal-header">
          <h5 className="modal-title mr-8" id="placeBidLabel">
            {!successFullUpload ? modalTitle : successFullUploadModal.title}
          </h5>
          <button type="button" className="btn-close" onClick={() => handlePreviewModal()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="fill-jacarta-700 h-6 w-6 dark:fill-white"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
            </svg>
          </button>
        </div>

        <div className="modal-body p-6 flex gap-4 items-center w-full">
          {!successFullUpload ? (
            <div className="flex justify-between gap-8 md:gap-32 md:flex-row flex-col w-full">
              <div className="flex flex-col gap-4 w-full">
                <p className="font-display block dark:text-white">
                  {(name as string)?.length > 0 ? (
                    <span className="dark:text-jacarta-100 text-jacarta-100 text-sm flex flex-col">
                      Name<span className="dark:text-white text-base">{name}</span>
                    </span>
                  ) : !name ? (
                    <span className="dark:text-jacarta-100 text-jacarta-100 text-sm flex flex-col">
                      Name<span className="text-red text-base">{errors.nameError}</span>
                    </span>
                  ) : (
                    ""
                  )}
                </p>
                <p className="font-display block text-sm dark:text-white">
                  {(description as string)?.length > 0 ? (
                    <span className="dark:text-jacarta-100 text-jacarta-100 text-sm flex flex-col">
                      Description
                      <span className="dark:text-white text-base">{description}</span>
                    </span>
                  ) : !description ? (
                    <span className="dark:text-jacarta-100 text-jacarta-100 text-sm flex flex-col">
                      Description
                      <span className="text-red text-base">{errors.descriptionError}</span>
                    </span>
                  ) : (
                    ""
                  )}
                </p>

                {(link as string)?.length ? (
                  <div className="font-display text-jacarta-100 text-sm flex flex-col">
                    <span className="text-sm">Link</span>
                    {!errors?.linkError ? (
                      <span className="dark:text-white text-base">{link}</span>
                    ) : (
                      <span className="text-red text-base">{errors.linkError}</span>
                    )}
                  </div>
                ) : !link ? (
                  <div className="dark:text-jacarta-100 text-jacarta-100 font-display flex flex-col">
                    <span className="text-sm">Link</span>
                    <span className="text-red text-base">{errors.linkError}</span>
                  </div>
                ) : (
                  ""
                )}

                <p className="font-display flex flex-col text-jacarta-100 text-sm">
                  {startDate ? (
                    <span className="flex flex-col">
                      Start Date
                      {!errors.startDateError ? (
                        <span className="dark:text-white text-base">{formatDate(startDate)}</span>
                      ) : (
                        <span className="text-red text-base">{errors.startDateError}</span>
                      )}
                    </span>
                  ) : (
                    ""
                  )}
                </p>
                {endDate ? (
                  <p className="font-display flex flex-col text-jacarta-100 text-sm">
                    End Date
                    {!errors.endDateError ? (
                      <span className="dark:text-white text-base">{formatDate(endDate)}</span>
                    ) : (
                      <span className="text-red text-base">{errors.endDateError}</span>
                    )}
                  </p>
                ) : (
                  ""
                )}
                {selectedNumber ? (
                  <p className="font-display flex flex-col text-jacarta-100 text-sm">
                    Number of Items
                    {!errors.numberError ? (
                      <span className="dark:text-white text-base">{selectedNumber}</span>
                    ) : (
                      <span className="text-red text-base">{errors.numberError}</span>
                    )}
                  </p>
                ) : (
                  ""
                )}
                {selectedParameter && (displayedParameter?.length as number) > 0 ? (
                  <p className="font-display flex flex-col text-jacarta-100 text-sm">
                    Type of Ad
                    {!errors.typeAdError && !errors.imageRatioError ? (
                      displayedParameter?.map((item, index) => (
                        <span key={index} className="dark:text-white text-base">
                          {item}
                        </span>
                      ))
                    ) : (
                      <div>
                        {errors.typeAdError && (
                          <span className="text-red text-base">{errors.typeAdError}</span>
                        )}
                        {errors.imageRatioError && (
                          <span className="text-red text-base">{errors.imageRatioError}</span>
                        )}
                      </div>
                    )}
                  </p>
                ) : (
                  ""
                )}
                {selectedStartingPrice || errors.startingPriceError ? (
                  <p className="font-display flex flex-col text-jacarta-100 text-sm">
                    Bid starting price
                    {!errors.startingPriceError ? (
                      <span className="dark:text-white text-base">{selectedStartingPrice}</span>
                    ) : (
                      <span className="text-red text-base">{errors.startingPriceError}</span>
                    )}
                    {helperFeesListing && <ModalHelper {...helperFeesListing} />}
                  </p>
                ) : (
                  ""
                )}
                {selectedUnitPrice || errors.unitPriceError ? (
                  <p className="font-display flex flex-col text-jacarta-100 text-sm">
                    Buy Price
                    {!errors.unitPriceError ? (
                      <span className="dark:text-white text-base">{selectedUnitPrice}</span>
                    ) : (
                      <span className="text-red text-base">{errors.unitPriceError}</span>
                    )}
                    {helperFeesListing && <ModalHelper {...helperFeesListing} />}
                  </p>
                ) : (
                  ""
                )}

                <p className="font-display flex flex-col text-jacarta-100 text-sm">
                  Currency
                  {!errors.currencyError ? (
                    <span className="dark:text-white text-base">{tokenSymbol}</span>
                  ) : (
                    <span className="text-red text-base">{errors.currencyError}</span>
                  )}
                </p>

                {selectedRoyalties ? (
                  <p className="font-display flex flex-col text-jacarta-100 text-sm">
                    Royalties
                    {!errors.royaltyError ? (
                      <span className="dark:text-white text-base">{selectedRoyalties}%</span>
                    ) : (
                      <span className="text-red text-base">{errors.royaltyError}</span>
                    )}
                  </p>
                ) : (
                  ""
                )}
                {address ? (
                  <p className="font-display flex flex-col text-jacarta-100 text-sm">
                    Address
                    <span className="dark:text-white text-base">{shortenAddress(address)} </span>
                  </p>
                ) : (
                  ""
                )}
                {protocolFees ? (
                  <p className="font-display flex flex-col text-jacarta-100 text-sm">
                    Protocol fees
                    <span className="dark:text-white text-base">{protocolFees}%</span>
                  </p>
                ) : (
                  ""
                )}
                {terms && (
                  <p className="font-display flex flex-col w-full text-jacarta-100 text-sm">
                    Terms
                    <span className="dark:text-white overflow-y-auto hide-scrollbar pr-2 text-base flex w-full flex-wrap">
                      {terms}
                    </span>
                  </p>
                )}
              </div>

              <Divider className="block md:hidden" />

              {previewImage?.map((image: any, index: number) => (
                <div className="flex flex-col gap-2 items-start justify-start" key={index}>
                  <label
                    htmlFor="item-description"
                    className="font-display text-jacarta-100 text-sm text-center"
                  >
                    Image {imageUrlVariants[index] && `( ratio ${imageUrlVariants[index]} )`}{" "}
                    preview
                  </label>
                  <div
                    className="dark:bg-secondaryBlack dark:border-jacarta-800 border-jacarta-100  group relative flex max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed"
                    style={{
                      width:
                        imageUrlVariants.length > 0 ? `${imageRatioDisplay(index)[0]}px` : "275px",
                      height:
                        imageUrlVariants.length > 0 ? `${imageRatioDisplay(index)[1]}px` : "275px",
                      position: "relative"
                    }}
                  >
                    <Image
                      src={image ?? ""}
                      fill={true}
                      alt="Preview"
                      className="object-contain h-full p-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                <p>{successFullUploadModal.body} </p>
                <div
                  className="dark:border-jacarta-800 bg-green   flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
                  data-tippy-content="Verified Collection"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-[.875rem] w-[.875rem] fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                  </svg>
                </div>
              </div>
              {successFullUploadModal.subBody && <p>{successFullUploadModal.subBody} </p>}
            </div>
          )}
        </div>

        <div className="modal-footer w-full">
          <div className="flex items-center justify-center space-x-4 w-full">
            <div className="flex items-center gap-4 w-full">
              {!successFullUpload ? (
                <div className="flex flex-col gap-2 justify-center items-center w-full">
                  <div
                    className={`grid grid-cols-1 w-full mx-auto ${!createOffer && "md:grid-cols-2"} gap-6`}
                  >
                    {!createOffer && (
                      <StyledWeb3Button
                        contractAddress={
                          chainConfig?.smartContracts?.DSPONSORMP?.address as Address
                        }
                        onClick={async () => {
                          await toast.promise(handleApprove, {
                            pending: "Waiting for confirmation 🕒",
                            success: "Approval confirmed 👌",
                            error: "Approval rejected 🤯"
                          });
                        }}
                        isDisabled={!validate || approvalForAllToken}
                        defaultText={!isListing ? "Approve 🔓 (1/2)" : "Authorize 🔓 (1/2)"}
                      />
                    )}

                    <StyledWeb3Button
                      contractAddress={
                        chainConfig?.smartContracts?.DSPONSORADMIN?.address as Address
                      }
                      onClick={async () => {
                        await toast.promise(handleSubmit(address), {
                          pending: "Waiting for confirmation 🕒",
                          success: "Transaction confirmed 👌",
                          error: "Transaction rejected 🤯"
                        });
                      }}
                      defaultText={buttonTitle ?? "Submit"}
                      isDisabled={!validate || !approvalForAllToken}
                    />
                  </div>

                  {!createOffer && (
                    <ResponsiveTooltip
                      text={`You need to approve the marketplace contract to spend your NFT on this transaction.`}
                    >
                      <span className="text-xs text-jacarta-100 inline-flex items-center gap-1">
                        <InformationCircleIcon className="w-4 h-4 text-jacarta-100" />
                        Why do I have to approve ?
                      </span>
                    </ResponsiveTooltip>
                  )}
                </div>
              ) : successFullUploadModal.hrefButton !== null ? (
                <Link href={successFullUploadModal.hrefButton ?? "#"}>
                  <button className="!rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all !bg-primaryPurple hover:!bg-opacity-80 !cursor-pointer">
                    {successFullUploadModal.buttonTitle}
                  </button>
                </Link>
              ) : (
                <NormalButton onClick={() => handlePreviewModal()} defaultText="Close" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdSubmission;
