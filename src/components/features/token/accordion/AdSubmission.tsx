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
import { cn } from "@/lib/utils";
import isUrlValid from "@/utils/misc/isUrlValid";
import { StepType } from "../../profile/tabs/OwnedTokens";

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
  imageURLSteps,
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
  expectedMultipleAds,
  shouldProvideLink = true,
  steps
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
  shouldProvideLink?: boolean;
  steps: StepType[];
}) => {
  const [imageRatios, setImageRatios] = React.useState<any[]>([]);
  const [allImages, setAllImages] = React.useState<any[]>([]);
  const [nbSteps, setNbSteps] = React.useState<number>(0);

  // const shouldHaveLink =

  const { setSelectedChain } = useSwitchChainContext();
  useEffect(() => {
    if (chainConfig) {
      setSelectedChain(chainConfig?.network);
    }
  }, [chainConfig, setSelectedChain]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handlePreviewModal();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [handlePreviewModal]);

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
    (index: number) => {
      if (!steps[index]) return [];

      const imageVariant = steps[index].adParameter.slice("imageURL-".length);

      const ratios = imageVariant.split(":");
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
    [steps]
  );

  useEffect(() => {
    if (steps.length > 0) {
      let imageRatios: string[][] = [];

      const imageUrlVariants = steps
        .filter(({ adParameter }) => adParameter.startsWith("imageURL"))
        .map(({ adParameter }) => adParameter.slice("imageURL-".length));

      imageUrlVariants.forEach((image: any, index: number) => {
        const preSplit = image.split("-");

        const imageRatio = preSplit.length === 2 ? preSplit[1].split(":") : preSplit[0].split(":");

        if (imageRatio.length === 2) {
          imageRatios.push(imageRatio);
        } else {
          imageRatios.push([imageRatio[0], imageRatio[0]]);
        }
      });

      setImageRatios(imageRatios);
    }

    const nbSteps = steps.filter(({ selected }) => selected).length;
    setNbSteps(nbSteps);
  }, [steps]);

  useEffect(() => {
    if (!steps) return;
    let allImages: any[] = [];

    steps
      .filter(({ adParameter, selected }) => adParameter.startsWith("imageURL") && selected)
      .forEach((step) => {
        let formattedRatio = step.adParameter.slice("imageURL-".length);
        if (!formattedRatio) {
          formattedRatio = "any ratio accepted";
        } else {
          formattedRatio = `${formattedRatio} ratio`;
        }
        allImages.push({ image: step.previewImage, ratio: step.adParameter, formattedRatio });
      });

    setAllImages(allImages);
  }, [steps]);

  if (!successFullUpload && (multipleAdsSubmission || adSubmission)) {
    return (
      <div className="modal-dialog max-h-[75vh] max-w-2xl md:min-w-md overflow-auto">
        <div className="modal-content !bg-secondaryBlack">
          <div className="modal-header">
            <div className="flex items-center justify-between w-full space-x-4">
              <h5 className="modal-title" id="placeBidLabel">
                Preview your {multipleAdsSubmission ? "multiple tokens " : ""}ad submission
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
                  className="w-6 h-6 fill-jacarta-700 dark:fill-white"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="flex gap-4 p-6 modal-body">
            <div className="flex flex-col flex-wrap w-full gap-4 md:flex-row">
              {nbSteps === 0 && (
                <div className="flex flex-col w-full gap-2">
                  <span className="font-semibold text-red">
                    You need to choose at least one parameter to submit
                  </span>
                </div>
              )}

              {shouldProvideLink &&
                steps.filter(
                  ({ adParameter, selected }) => adParameter.startsWith("linkURL") && selected
                ).length !== 0 && (
                  <div className="flex items-center justify-between w-full gap-2">
                    <span className="block dark:text-jacarta-100">Link </span>
                    <span
                      className={cn(
                        "font-semibold",
                        isUrlValid(link.toString()) ? "text-green" : "text-red"
                      )}
                    >
                      {!link || link === "" ? (
                        "No link provided"
                      ) : isUrlValid(link.toString()) ? (
                        <Link
                          href={link as string}
                          passHref
                          target="_blank"
                          className="overflow-hidden truncate text-primaryPurple hover:underline hover:text-opacity-80"
                        >
                          {(link as string).length > 70
                            ? `${(link as string).slice(0, 20)}...${(link as string).slice(-20)}`
                            : link}
                        </Link>
                      ) : (
                        "Link should start with https://"
                      )}
                    </span>
                  </div>
                )}

              {(allImages?.length as number) > 0 &&
                allImages.map((image, index: number) => (
                  <div className="flex flex-col w-full gap-2" key={index}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="block dark:text-jacarta-100">
                        Image {index + 1} - ({image.formattedRatioha})
                      </span>

                      <span className="font-semibold text-red">
                        {!image.image && "No image provided"}
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Image
                        src={image.image}
                        width={1600}
                        height={380}
                        className="w-full h-auto bg-jacarta-200"
                        alt="Preview image"
                        style={{
                          objectFit: "contain",
                          objectPosition: "center",
                          aspectRatio: image.ratio
                            ? `${image.ratio.split(":")[0]}/${image.ratio.split(":")[1]}`
                            : "auto"
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
                  allImages.some((image) => !image?.image) ||
                  (!isUrlValid(link.toString()) && shouldProvideLink) ||
                  nbSteps === 0
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
    <div className="flex items-center justify-center w-full modal-dialog">
      <div className="modal-content !bg-secondaryBlack max-w-xs md:min-w-[600px] md:max-w-2xl overflow-auto max-h-[75vh] h-full">
        <div className="modal-header">
          <h5 className="mr-8 modal-title" id="placeBidLabel">
            {!successFullUpload ? modalTitle : successFullUploadModal.title}
          </h5>
          <button type="button" className="btn-close" onClick={() => handlePreviewModal()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="w-6 h-6 fill-jacarta-700 dark:fill-white"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
            </svg>
          </button>
        </div>

        <div className="flex items-center w-full gap-4 p-6 modal-body">
          {!successFullUpload ? (
            <div className="flex flex-col justify-between w-full gap-8">
              {previewImage?.map((image: any, index: number) => (
                <div className="flex flex-col items-start justify-start gap-2" key={index}>
                  <div
                    className="relative flex flex-col items-center justify-center max-w-md border-2 border-dashed rounded-lg dark:bg-secondaryBlack dark:border-jacarta-800 border-jacarta-100 group"
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
                  <label
                    htmlFor="item-description"
                    className="text-sm text-center text-jacarta-100"
                  >
                    {imageUrlVariants[index] && `( ratio ${imageUrlVariants[index]} )`} Preview
                  </label>
                </div>
              ))}

              {previewImage?.length === 0 && (
                <div className="flex flex-col w-full gap-2">
                  <span className="font-semibold text-red">No image provided</span>
                </div>
              )}

              <Divider className="block md:hidden" />

              <div className="flex flex-col w-full gap-4">
                <p className="block font-display dark:text-white">
                  {(name as string)?.length > 0 ? (
                    <span className="flex flex-col text-sm dark:text-jacarta-100 text-jacarta-100">
                      Name
                      <span className="text-base break-words dark:text-white">{name}</span>
                    </span>
                  ) : !name ? (
                    <span className="flex flex-col text-sm dark:text-jacarta-100 text-jacarta-100">
                      Name<span className="text-base text-red">{errors.nameError}</span>
                    </span>
                  ) : (
                    ""
                  )}
                </p>
                <p className="block text-sm font-display dark:text-white">
                  {(description as string)?.length > 0 ? (
                    <span className="flex flex-col text-sm dark:text-jacarta-100 text-jacarta-100">
                      Description
                      <span className="text-base break-words dark:text-white">{description}</span>
                    </span>
                  ) : !description ? (
                    <span className="flex flex-col text-sm dark:text-jacarta-100 text-jacarta-100">
                      Description
                      <span className="text-base text-red">{errors.descriptionError}</span>
                    </span>
                  ) : (
                    ""
                  )}
                </p>

                {(link as string)?.length ? (
                  <div className="flex flex-col text-sm font-display text-jacarta-100">
                    <span className="text-sm">Link</span>
                    {!errors?.linkError ? (
                      <span className="flex flex-wrap w-full pr-2 overflow-y-auto text-base dark:text-white hide-scrollbar">
                        {isUrlValid(link.toString()) ? (
                          <Link
                            href={link as string}
                            passHref
                            target="_blank"
                            className="overflow-hidden truncate text-primaryPurple hover:underline hover:text-opacity-80"
                          >
                            {(link as string).length > 70
                              ? `${(link as string).slice(0, 20)}...${(link as string).slice(-20)}`
                              : link}
                          </Link>
                        ) : (
                          link
                        )}
                      </span>
                    ) : (
                      <span className="text-base text-red">{errors.linkError}</span>
                    )}
                  </div>
                ) : !link ? (
                  <div className="flex flex-col dark:text-jacarta-100 text-jacarta-100 font-display">
                    <span className="text-sm">Link</span>
                    <span className="text-base text-red">{errors.linkError}</span>
                  </div>
                ) : (
                  ""
                )}

                {selectedParameter?.some((item) => item.startsWith("text-markdown-")) && (
                  <span className="flex flex-col text-sm font-display text-jacarta-100">
                    Text markdown
                    {!errors.textSizeError ? (
                      <span className="text-base dark:text-white">
                        Limited to{" "}
                        {
                          selectedParameter
                            .find((item) => item.startsWith("text-markdown-"))
                            ?.split("-")[2]
                        }{" "}
                        characters
                      </span>
                    ) : (
                      <span className="text-base text-red">{errors.textSizeError}</span>
                    )}
                  </span>
                )}

                <p className="flex flex-col text-sm font-display text-jacarta-100">
                  {startDate ? (
                    <span className="flex flex-col">
                      Start Date
                      {!errors.startDateError ? (
                        <span className="text-base dark:text-white">{formatDate(startDate)}</span>
                      ) : (
                        <span className="text-base text-red">{errors.startDateError}</span>
                      )}
                    </span>
                  ) : (
                    ""
                  )}
                </p>
                {endDate ? (
                  <p className="flex flex-col text-sm font-display text-jacarta-100">
                    End Date
                    {!errors.endDateError ? (
                      <span className="text-base dark:text-white">{formatDate(endDate)}</span>
                    ) : (
                      <span className="text-base text-red">{errors.endDateError}</span>
                    )}
                  </p>
                ) : (
                  ""
                )}
                {selectedNumber ? (
                  <p className="flex flex-col text-sm font-display text-jacarta-100">
                    Number of Items
                    {!errors.numberError ? (
                      <span className="text-base dark:text-white">{selectedNumber}</span>
                    ) : (
                      <span className="text-base text-red">{errors.numberError}</span>
                    )}
                  </p>
                ) : (
                  ""
                )}
                {selectedParameter && (displayedParameter?.length as number) > 0 ? (
                  <p className="flex flex-col text-sm font-display text-jacarta-100">
                    Type of Ad
                    {!errors.typeAdError && !errors.imageRatioError ? (
                      displayedParameter?.map((item, index) => (
                        <span key={index} className="text-base dark:text-white">
                          {item}
                        </span>
                      ))
                    ) : (
                      <div>
                        {errors.typeAdError && (
                          <span className="text-base text-red">{errors.typeAdError}</span>
                        )}
                        {errors.imageRatioError && (
                          <span className="text-base text-red">{errors.imageRatioError}</span>
                        )}
                      </div>
                    )}
                  </p>
                ) : (
                  ""
                )}
                {selectedStartingPrice || errors.startingPriceError ? (
                  <div className="flex flex-col text-sm font-display text-jacarta-100">
                    <div className="flex items-center gap-2">
                      Bid starting price
                      {helperFeesListing && <ModalHelper {...helperFeesListing} />}
                    </div>
                    {!errors.startingPriceError ? (
                      <span className="text-base dark:text-white">{selectedStartingPrice}</span>
                    ) : (
                      <span className="text-base text-red">{errors.startingPriceError}</span>
                    )}
                  </div>
                ) : (
                  ""
                )}
                {selectedUnitPrice || errors.unitPriceError ? (
                  <div className="flex flex-col text-sm font-display text-jacarta-100">
                    <div className="flex items-center gap-2">
                      Buy Price
                      {helperFeesListing && <ModalHelper {...helperFeesListing} />}
                    </div>
                    {!errors.unitPriceError ? (
                      <span className="text-base dark:text-white">{selectedUnitPrice}</span>
                    ) : (
                      <span className="text-base text-red">{errors.unitPriceError}</span>
                    )}
                  </div>
                ) : (
                  ""
                )}

                <p className="flex flex-col text-sm font-display text-jacarta-100">
                  Currency
                  {!errors.currencyError ? (
                    <span className="text-base dark:text-white">{tokenSymbol}</span>
                  ) : (
                    <span className="text-base text-red">{errors.currencyError}</span>
                  )}
                </p>

                {selectedRoyalties ? (
                  <p className="flex flex-col text-sm font-display text-jacarta-100">
                    Royalties
                    {!errors.royaltyError ? (
                      <span className="text-base dark:text-white">{selectedRoyalties}%</span>
                    ) : (
                      <span className="text-base text-red">{errors.royaltyError}</span>
                    )}
                  </p>
                ) : (
                  ""
                )}
                {address ? (
                  <p className="flex flex-col text-sm font-display text-jacarta-100">
                    Address
                    <span className="text-base dark:text-white">{shortenAddress(address)} </span>
                  </p>
                ) : (
                  ""
                )}
                {protocolFees ? (
                  <p className="flex flex-col text-sm font-display text-jacarta-100">
                    Protocol fees
                    <span className="text-base dark:text-white">{protocolFees}%</span>
                  </p>
                ) : (
                  ""
                )}
                {terms && (
                  <p className="flex flex-col w-full text-sm font-display text-jacarta-100">
                    Terms
                    <span className="flex flex-wrap w-full pr-2 overflow-y-auto text-base dark:text-white hide-scrollbar">
                      <Link
                        href={terms}
                        passHref
                        target="_blank"
                        className="overflow-hidden truncate text-primaryPurple hover:underline hover:text-opacity-80"
                      >
                        {terms.length > 70 ? `${terms.slice(0, 20)}...${terms.slice(-20)}` : terms}
                      </Link>
                    </span>
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                <p>{successFullUploadModal.body} </p>
                <div
                  className="flex items-center justify-center w-6 h-6 border-2 border-white rounded-full dark:border-jacarta-800 bg-green"
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

        <div className="w-full modal-footer">
          <div className="flex items-center justify-center w-full space-x-4">
            <div className="flex items-center w-full gap-4">
              {!successFullUpload ? (
                <div className="flex flex-col items-center justify-center w-full gap-2">
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
                      <span className="inline-flex items-center gap-1 text-xs text-jacarta-100">
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
                <NormalButton onClick={() => handlePreviewModal()}>Close</NormalButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdSubmission;
