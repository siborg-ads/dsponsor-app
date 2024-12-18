import { useChain, useContract, useContractWrite, useStorageUpload } from "@thirdweb-dev/react";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/style.module.scss";
import TokenCard from "@/components/ui/cards/TokenCard";
import AdBriefing from "@/components/features/token/createAd/AdBriefing";
import AdURL from "@/components/features/token/createAd/AdURL";
import AdImage from "@/components/features/token/createAd/AdImage";
import CarouselForm from "@/components/ui/misc/CarouselForm";
import AdSubmission from "@/components/features/token/accordion/AdSubmission";
import MainButton from "@/components/ui/buttons/MainButton";
import { features } from "@/data/features";
import config from "@/config/config";
import { Address } from "thirdweb";
import AdText from "../../token/createAd/AdText";

export type StepType = {
  offerIds: string[];
  selected: boolean;
  adParameter: string;
  data?: any;
  file?: any;
  previewImage?: any;
};

const OwnedTokens = ({
  data,
  isOwner,
  isLoading,
  fetchCreatedData,
  manageAddress,
  tokenStatuses
}: {
  data: any;
  isOwner: boolean;
  isLoading: boolean;
  fetchCreatedData: any;
  manageAddress: Address;
  tokenStatuses: ("pending" | "rejected" | "accepted" | null)[];
}) => {
  const { chainId, name: chainName } = useChain() || {};
  const currentChainObject = config[chainId as number];

  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [isSelectedItem, setIsSelectedItem] = useState({});
  const [validate, setValidate] = useState({});
  const [isSelectionActive, setIsSelectionActive] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [isFirstSelection, setIsFirstSelection] = useState(true);
  const [successFullUpload, setSuccessFullUpload] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [previewImages, setPreviewImages] = useState<any[]>([]);
  const [link, setLink] = useState("");
  const [errors, setErrors] = useState({});
  const [showSliderForm, setShowSliderForm] = useState(false);
  const [adParameters, setAdParameters] = useState<any[]>([]);
  const [imageURLSteps, setImageURLSteps] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageUrlVariants, setImageUrlVariants] = useState<any[]>([]);
  const [shouldProvideLink, setShouldProvideLink] = useState(false);
  const [steps, setSteps] = useState<StepType[]>([]);
  const stepsRef = useRef([]);
  const [numSteps, setNumSteps] = useState(2);
  const { contract: DsponsorAdminContract } = useContract(
    currentChainObject?.smartContracts?.DSPONSORADMIN?.address,
    currentChainObject?.smartContracts?.DSPONSORADMIN?.abi
  );

  const relayerUrl = currentChainObject?.relayerURL;

  const { mutateAsync: uploadToIPFS } = useStorageUpload();
  const { mutateAsync: submitAd } = useContractWrite(DsponsorAdminContract, "submitAdProposals");

  const handlePreviewModal = () => {
    if (successFullUpload) {
      setSuccessFullUpload(false);
      handleSelectionTokens();
    }

    setShowPreviewModal(!showPreviewModal);
  };

  const handleSelection = (item) => {
    setIsFirstSelection(false);
    setIsSelectedItem((prevState) => ({
      ...prevState,
      [item.id]: !prevState[item.id]
    }));

    setSelectedItems((previousItems) => {
      const isAlreadySelected = previousItems.some((i) => i.id === item.id);

      if (isAlreadySelected) {
        return previousItems.filter((i) => i.id !== item.id);
      } else {
        const newItems = item;
        return [...previousItems, newItems];
      }
    });
  };

  const handleLogoUpload = (file: any, step: StepType) => {
    if (file) {
      // const newFiles = [...files];
      // const newPreviewImages = [...previewImages];
      // newFiles[index] = { file: file, index: index, offerIds: step.offerIds };
      // newPreviewImages[index] = URL.createObjectURL(file);

      const newSteps = [...steps];

      const newStepIndex = newSteps.findIndex((s) => s.adParameter === step.adParameter);

      newSteps[newStepIndex].file = file;
      newSteps[newStepIndex].previewImage = URL.createObjectURL(file);

      setSteps(newSteps);

      // setFiles(newFiles);
      // setPreviewImages(newPreviewImages);
    }
  };

  const handleSliderForm = () => {
    setShowSliderForm(!showSliderForm);

    const uniqueIds = new Set();
    const adDetails = {};
    let shouldAddLink = false;
    for (const token of selectedItems) {
      for (const param of token.adParameters) {
        const paramId = param.adParameter.id;
        if (paramId && paramId !== "xSpaceId" && paramId !== "xCreatorHandle") {
          uniqueIds.add(paramId);
          adDetails[paramId] = adDetails[paramId] || new Set();
          adDetails[paramId].add(token.id);
        }

        if (paramId && paramId.startsWith("linkURL")) {
          shouldAddLink = true;
        }
      }
    }

    for (const id in adDetails) {
      adDetails[id] = Array.from(adDetails[id]);
    }

    const uniqueIdsArray: any[] = Array.from(uniqueIds);
    setAdParameters(uniqueIdsArray);

    const imageURLStep: any[] = [];

    uniqueIdsArray
      ?.filter((id) => id?.startsWith("imageURL"))
      ?.map((id) => {
        const variant = id?.slice("imageURL-".length);
        imageURLStep.push({
          uniqueId: variant,
          offerIds: adDetails[id],
          selected: true
        });
      });

    const stepsToAdd: StepType[] = [];

    uniqueIdsArray.map((id) => {
      stepsToAdd.push({
        offerIds: adDetails[id],
        selected: true,
        adParameter: id
      });
    });

    setShouldProvideLink(shouldAddLink);
    // If there is no linkURL, we don't need to add an extra step to submit the ad link
    const totalNumSteps = numSteps + (imageURLStep.length - (!shouldAddLink ? 1 : 0));
    setImageURLSteps(imageURLStep);
    setNumSteps(totalNumSteps);
    setSteps(stepsToAdd);
  };

  useEffect(() => {
    const nbSelectedItems = steps.filter((step) => step.selected).length;
    setNumSteps(nbSelectedItems + 1);

    const isLinkSelected = steps.some(
      (step) => step.adParameter.startsWith("linkURL") && step.selected
    );
    setShouldProvideLink(isLinkSelected);
  }, [steps]);

  const handleSubmit = async () => {
    const selectedOfferIdItems: any[] = [];
    const selectedTokenIdItems: any[] = [];
    const adParametersItems: any[] = [];
    const dataItems: any[] = [];

    let revalidateTags: string[] = [];

    try {
      for (const item of steps) {
        if (!item.selected) {
          continue;
        }

        for (const id of item.offerIds) {
          const [offerId, tokenId] = id.split("-");
          const offer = selectedItems.find((i) => i.offerId === offerId && i.tokenId === tokenId);

          if (item.adParameter !== "xSpaceId" && item.adParameter !== "xCreatorHandle" && offer) {
            revalidateTags.push(`${currentChainObject?.chainId}-adOffer-${offerId}`);
            revalidateTags.push(
              `${currentChainObject?.chainId}-nftContract-${offer.nftContract.id}`
            );

            for (const adminAddr of offer.admins) {
              revalidateTags.push(`${currentChainObject?.chainId}-userAddress-${adminAddr}`);
            }
          }

          selectedOfferIdItems.push(offerId);
          selectedTokenIdItems.push(tokenId);
          adParametersItems.push(item.adParameter);
          if (item.file) {
            let uploadUrl;
            try {
              uploadUrl = await uploadToIPFS({
                data: [item.file],
                options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true }
              });
            } catch (error) {
              console.error("Erreur lors de l'upload à IPFS:", error);
              throw new Error("Upload to IPFS failed.");
            }
            dataItems.push(uploadUrl[0]);
          } else if (item.adParameter.startsWith("linkURL") && link) {
            dataItems.push(link);
          } else if (item.data) {
            dataItems.push(item.data);
          }
        }
      }

      const argsAdSubmited = {
        offerId: selectedOfferIdItems,
        tokenId: selectedTokenIdItems,
        adParameters: adParametersItems,
        data: dataItems
      };

      revalidateTags.push(`${currentChainObject?.chainId}-userAddress-${manageAddress}`);
      revalidateTags = [...new Set(revalidateTags)];

      await submitAd({ args: Object.values(argsAdSubmited) });
      if (relayerUrl) {
        await fetch(`${relayerUrl}/api/revalidate`, {
          method: "POST",
          body: JSON.stringify({ tags: revalidateTags })
        }).catch(console.error);
      }
      setSuccessFullUpload(true);

      // refetch created offers
      await fetchCreatedData();
    } catch (err) {
      console.error("Erreur lors de l'upload à Blockchain:", err);
      throw new Error("Upload to Blockchain failed.");
    }
  };

  const handleSelectionTokens = () => {
    setIsSelectionActive(!isSelectionActive);
    setShowSliderForm(false);
    setIsSelectedItem({});
    setSelectedItems([]);
    setImageURLSteps([]);
    setPreviewImages([]);
    setImageUrlVariants([]);
    setFiles([]);
    setNumSteps(2);
    setSteps([]);
    setLink("");
  };
  const successFullUploadModal = {
    title: "Submit ad",
    body: "Congratulations, you have proposed an ad. 🎉",
    subBody:
      "Ad assets submitted! They are now under review and awaiting validation by the offer creator.",
    buttonTitle: "Close",
    hrefButton: null
  };

  if (isLoading) {
    return (
      <div className="flex justify-center w-full">
        <Image src="/images/loader/loading-bullet.svg" alt="icon" width={60} height={60} />
      </div>
    );
  }

  return (
    <>
      {/* <!-- Filter --> */}
      <div className="flex items-center justify-center gap-4 p-3 mb-6 bg-white dark:bg-secondaryBlack dark:text-jacarta-100 rounded-2lg">
        <span>
          {" "}
          This section lists all owned tokens, either currently in a direct listing or not listed at
          all.
          <br />
        </span>
      </div>
      {/* <!-- Grid --> */}
      {data?.length > 0 ? (
        <div className="flex flex-col items-center justify-center ">
          {" "}
          {isOwner && features.canSeeSubmittedAds && (
            <div className="flex flex-col items-center justify-center">
              <div onClick={handleSelectionTokens}>
                <MainButton
                  isPurple={true}
                  isFullWidth={false}
                  text={
                    showSliderForm || isSelectionActive
                      ? "Close selection"
                      : "Submit ad for multiple tokens"
                  }
                />
              </div>
              {isSelectionActive && (
                <div className="flex items-center justify-center gap-4 p-3 mb-6 bg-white dark:bg-secondaryBlack dark:text-jacarta-100 rounded-2lg">
                  <span>
                    Here is your tokens on the current network ({chainName}). Select tokens to
                    submit an ad on
                  </span>
                </div>
              )}
            </div>
          )}
          {!showSliderForm && (
            <div className={`grid w-full grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4`}>
              {data?.map((item, index) => {
                const currencyDecimals = Number(
                  item?.marketplaceListings?.sort((a, b) => Number(b?.id) - Number(a?.id))[0]
                    ?.currencyDecimals ?? item?.nftContract?.prices?.[0]?.currencyDecimals
                );
                const currencySymbol =
                  item?.marketplaceListings?.sort((a, b) => Number(b?.id) - Number(a?.id))[0]
                    ?.currencySymbol ?? item?.nftContract?.prices?.[0]?.currencySymbol;

                const sponsorHasAtLeastOneRejectedProposalAndNoPending =
                  tokenStatuses[index] === "rejected" || tokenStatuses[index] === null;

                return isSelectionActive ? (
                  item.chainConfig.chainId === currentChainObject?.chainId && (
                    <div
                      onClick={() => handleSelection(item)}
                      key={index}
                      className={`  ${isSelectedItem[item.id] ? "border-4 border-jacarta-100 rounded-2xl " : ""} `}
                    >
                      <TokenCard
                        item={item}
                        isToken={true}
                        listingType={item?.marketplaceListings[0]?.listingType}
                        isListing={false}
                        isOwner={true}
                        availableToSubmitAdFromOwnedTokens={
                          sponsorHasAtLeastOneRejectedProposalAndNoPending
                        }
                        isDisabled={
                          item?.disable ||
                          (!item?.nftContract?.prices[0]?.enabled && item?.mint === null) ||
                          new Date(item?.metadata?.offer?.valid_to) < new Date()
                        }
                        isSelectionActive={isSelectionActive}
                        disableLink={isSelectionActive}
                        url={
                          !item.tokenData
                            ? `/${item?.chainConfig?.chainId}/offer/${item.offerId}/${item.tokenId}`
                            : `/${item?.chainConfig?.chainId}/offer/${item.offerId}/${item.tokenId}?tokenData=${item.tokenData}`
                        }
                        currencySymbol={currencySymbol}
                        currencyDecimals={currencyDecimals}
                        fromProfilePage={true}
                        profileAddress={manageAddress}
                      />
                    </div>
                  )
                ) : (
                  <TokenCard
                    item={item}
                    key={index}
                    isToken={true}
                    listingType={item?.marketplaceListings[0]?.listingType}
                    isListing={false}
                    isDisabled={
                      item?.disable ||
                      (!item?.nftContract?.prices[0]?.enabled && item?.mint === null) ||
                      new Date(item?.metadata?.offer?.valid_to) < new Date()
                    }
                    isSelectionActive={isSelectionActive}
                    url={
                      !item?.tokenData
                        ? `/${item?.chainConfig?.chainId}/offer/${item.offerId}/${item.tokenId}`
                        : `/${item?.chainConfig?.chainId}/offer/${item.offerId}/${item.tokenId}?tokenData=${item.tokenData}`
                    }
                    availableToSubmitAdFromOwnedTokens={
                      sponsorHasAtLeastOneRejectedProposalAndNoPending
                    }
                    isOwner={isOwner}
                    currencySymbol={currencySymbol}
                    currencyDecimals={currencyDecimals}
                    fromProfilePage={true}
                    profileAddress={manageAddress}
                  />
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full gap-4">
          <span>No ad space yet...</span>
          <MainButton link={`/#hot-offers`} isPurple={true} text="Buy" />
        </div>
      )}
      {!showSliderForm && (
        <div
          className={`fixed dark:border-jacarta-500 border  bottom-0 blury-background left-0 right-0 px-4 py-3   ${
            isFirstSelection
              ? "hidden"
              : selectedItems?.length === 0
                ? "animated-modalSelectedItemDown"
                : "animated-modalSelectedItemUp"
          }`}
        >
          <div className="block w-full mb-4 text-sm text-left transition-colors dropdown-item font-display rounded-xl dark:text-white">
            <span className="flex items-center justify-center gap-6">
              <span className="mr-4">
                Ad Spaces selected :{" "}
                <span className="ml-1 text-green text-md">
                  {Object.values(isSelectedItem).filter((value) => value === true).length}
                </span>{" "}
              </span>
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              className={` !rounded-full !min-w-[100px] !py-3 !px-8 !text-center !font-semibold !text-white !transition-all !bg-green !cursor-pointer `}
              onClick={handleSliderForm}
            >
              Continue
            </button>

            <button
              className={` !rounded-full !min-w-[100px] !py-3 !px-8 !text-center !font-semibold !text-white !transition-all !bg-red !cursor-pointer `}
              onClick={handleSelectionTokens}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {showSliderForm && (
        <div>
          <CarouselForm
            handlePreviewModal={handlePreviewModal}
            numSteps={numSteps}
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
          >
            {currentSlide === 0 && (
              <AdBriefing
                stepsRef={stepsRef}
                styles={styles}
                adParameters={adParameters}
                setImageUrlVariants={setImageUrlVariants}
                currentSlide={currentSlide}
                numSteps={numSteps}
                steps={steps}
                setSteps={setSteps}
              />
            )}

            <>
              {steps
                .filter((step) => step.selected)
                .map((step, index) => (
                  <div key={step.adParameter}>
                    {currentSlide === index + 1 && step.adParameter.startsWith("imageURL") ? (
                      <AdImage
                        stepsRef={stepsRef}
                        currentStep={index + 2}
                        styles={styles}
                        step={step}
                        handleLogoUpload={(file) => handleLogoUpload(file, step)}
                        currentSlide={currentSlide}
                        numSteps={numSteps}
                      />
                    ) : currentSlide === index + 1 && step.adParameter.startsWith("linkURL") ? (
                      <AdURL
                        stepsRef={stepsRef}
                        styles={styles}
                        setLink={setLink}
                        link={link}
                        currentSlide={currentSlide}
                        numSteps={numSteps}
                      />
                    ) : currentSlide === index + 1 && step.adParameter.startsWith("text") ? (
                      <AdText
                        stepsRef={stepsRef}
                        styles={styles}
                        currentSlide={currentSlide}
                        numSteps={numSteps}
                        step={step}
                        setText={(text) => {
                          const newSteps = steps.map((s) => {
                            if (s.adParameter === step.adParameter) {
                              return {
                                ...s,
                                data: text
                              };
                            }
                            return s;
                          });
                          setSteps(newSteps);
                        }}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
            </>
          </CarouselForm>
        </div>
      )}
      {showPreviewModal && (
        <div className="modal fade show bloc">
          <AdSubmission
            chainConfig={currentChainObject}
            handlePreviewModal={handlePreviewModal}
            handleSubmit={handleSubmit}
            link={link}
            imageUrlVariants={imageUrlVariants}
            imageURLSteps={imageURLSteps}
            name={true}
            description={true}
            previewImage={previewImages}
            errors={errors}
            successFullUpload={successFullUpload}
            validate={validate}
            buttonTitle="Submit ad"
            modalTitle="Ad Space Preview"
            successFullUploadModal={successFullUploadModal}
            multipleAdsSubmission={true}
            expectedMultipleAds={selectedItems?.length}
            shouldProvideLink={shouldProvideLink}
            steps={steps}
          />
        </div>
      )}
    </>
  );
};

export default OwnedTokens;
