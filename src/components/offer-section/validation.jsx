import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ValidatedRefusedItems from "../collections/validated_refused_items";
import ReviewCarousel from "../carousel/review_carousel";
import AddProposalRefusedModal from "../modal/adProposalRefusedModal";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import InfoIcon from "../informations/infoIcon";
import { CheckIcon, ClockIcon, XIcon } from "lucide-react";

const Validation = ({
  chainId,
  offer,
  offerId,
  isOwner,
  handleSubmit,
  successFullRefuseModal,
  setSuccessFullRefuseModal,
  isToken = false,
  successFullUploadModal,
  setRefusedValidatedAdModal,
  refusedValidatedAdModal,
  setSelectedItems,
  selectedItems,
  sponsorHasAtLeastOneRejectedProposalAndNoPending,
  setSponsorHasAtLeastOneRejectedProposalAndNoPending,
  mediaShouldValidateAnAd,
  isMedia,
  isTokenView,
  itemTokenId
}) => {
  const [pendingProposalData, setPendingProposalData] = useState([]);
  const [validatedProposalData, setValidatedProposalData] = useState([]);
  const [refusedProposalData, setRefusedProposalData] = useState([]);
  const [itemActive, setItemActive] = useState(1);
  const [comments, setComments] = useState({});
  const [isApprouvedAd, setIsApprouvedAd] = useState(false);
  const [pendingProposalLength, setPendingProposalLength] = useState(0);
  const [aspectRatio, setAspectRatio] = useState(null);

  const tabItem = [
    {
      id: 1,
      text: "Pending",
      icon: <ClockIcon className="w-4 h-4" />
    },
    {
      id: 2,
      text: "Validated",
      icon: <CheckIcon className="w-4 h-4" />
    },

    {
      id: 3,
      text: "Refused",
      icon: <XIcon className="w-4 h-4" />
    }
  ];
  useEffect(() => {
    if (!offer) return;

    const groupedPendingAds = {};
    const groupedValidatedAds = {};
    const groupedRefusedAds = {};

    function processProposal(token, element, groupedAds, statusKey) {
      if (element[statusKey] !== null) {
        if (!groupedAds[token.tokenId]) {
          groupedAds[token.tokenId] = {
            tokenId: token.tokenId,
            offerId: offerId,
            tokenData: token.mint.tokenData || null,
            proposalIds: [],
            adParametersList: {},
            adParametersKeys: []
          };
          if (statusKey === "rejectedProposal") {
            groupedAds[token.tokenId].reason = element[statusKey].rejectReason;
          }
        }
        const adParamBase = element.adParameter.id;

        groupedAds[token.tokenId].proposalIds.push(element[statusKey].id);

        if (!groupedAds[token.tokenId].adParametersKeys.includes(adParamBase)) {
          groupedAds[token.tokenId].adParametersKeys.push(adParamBase);
        }

        groupedAds[token.tokenId].adParametersList[adParamBase] = element[statusKey].data;

        if (adParamBase.startsWith("imageURL") && element.adParameter.variants.length > 0) {
          // adParamBase can be imageURL-1:1 or imageURL-0-1:1 for example
          // in the first case we want aspectRatio to be "1:1" and cssAspectRatio to be "1/1"
          // in the second case we want aspectRatio to be "1:1" and cssAspectRatio to be "1/1" too
          if (adParamBase.includes("-0")) {
            const split = adParamBase.split("-");
            const aspectRatio = split[2];
            const cssAspectRatio = aspectRatio?.replace(":", "/");
            groupedAds[token.tokenId].adParametersList[`aspectRatio`] = aspectRatio;
            groupedAds[token.tokenId].adParametersList[`cssAspectRatio`] = cssAspectRatio;
            setAspectRatio(aspectRatio);
          } else {
            const split = adParamBase.split("-");
            const aspectRatio = split[1];
            const cssAspectRatio = aspectRatio?.replace(":", "/");
            groupedAds[token.tokenId].adParametersList[`aspectRatio`] = aspectRatio;
            groupedAds[token.tokenId].adParametersList[`cssAspectRatio`] = cssAspectRatio;
            setAspectRatio(aspectRatio);
          }
        }
      }
    }

    for (const token of offer.nftContract.tokens) {
      if (token.mint !== null) {
        for (const element of token.currentProposals) {
          processProposal(token, element, groupedPendingAds, "pendingProposal");
          processProposal(token, element, groupedValidatedAds, "acceptedProposal");
          processProposal(token, element, groupedRefusedAds, "rejectedProposal");
        }
      }
    }

    let formattedPendingAds = Object.values(groupedPendingAds);
    let formattedValidatedAds = Object.values(groupedValidatedAds);
    let formattedRefusedAds = Object.values(groupedRefusedAds);

    if (isTokenView) {
      formattedPendingAds = formattedPendingAds.filter(
        (ad) => Number(ad?.tokenId) === Number(itemTokenId)
      );
      formattedValidatedAds = formattedValidatedAds.filter(
        (ad) => Number(ad?.tokenId) === Number(itemTokenId)
      );
      formattedRefusedAds = formattedRefusedAds.filter(
        (ad) => Number(ad?.tokenId) === Number(itemTokenId)
      );
    }

    setValidatedProposalData(formattedValidatedAds);
    setRefusedProposalData(formattedRefusedAds);
    setPendingProposalData(formattedPendingAds);
    setPendingProposalLength(formattedPendingAds.length);
  }, [isTokenView, offer, offerId, successFullUploadModal, itemTokenId]);

  const handleItemSubmit = async (approuved = false) => {
    let submissionArgs = [];
    setIsApprouvedAd(approuved);
    for (const item of selectedItems) {
      let argObject = {
        ...item,
        ...(approuved && { reason: "" }),
        validated: approuved
      };

      submissionArgs.push(argObject);
    }

    try {
      await handleSubmit(submissionArgs);
      setPendingProposalLength((prev) => prev - submissionArgs.length);
    } catch (error) {
      console.error(error);
    }
  };

  const successFullRefusedAdModalObject = {
    title: "Refused",
    body: "The ad has been refused successfully ✅",
    button: "Close"
  };

  const successFullValidatedAdModalObject = {
    title: "Validated",
    body: "The ad has been validated successfully 🎉",
    button: "Close"
  };

  const closeRefuseModal = () => {
    setRefusedValidatedAdModal(null);
    if (successFullRefuseModal) {
      setSelectedItems([]);
      setSuccessFullRefuseModal(false);
    }
  };

  const handleCommentChange = (tokenId, value) => {
    setComments((currentComments) => ({
      ...currentComments,
      [tokenId]: value
    }));
    setSelectedItems((currentItems) => {
      return currentItems.map((item) => {
        if (item.tokenId === tokenId) {
          return { ...item, reason: value };
        }
        return item;
      });
    });
  };

  return (
    <>
      {/* <!-- Tabs Nav --> */}
      <Tabs className="tabs">
        <TabList className="nav nav-tabs scrollbar-custom mb-12 flex items-center justify-start overflow-x-auto overflow-y-hidden border-b border-jacarta-100 pb-px dark:border-jacarta-600 md:justify-center">
          {tabItem.map(({ id, text, icon }) => {
            return (
              <Tab className="nav-item" key={id} onClick={() => setItemActive(id)}>
                <button
                  className={
                    itemActive === id
                      ? "nav-link hover:text-jacarta-900 text-jacarta-100 relative flex items-center gap-1 whitespace-nowrap py-3 px-6 dark:hover:text-white active"
                      : "nav-link hover:text-jacarta-900 text-jacarta-100 relative flex items-center gap-1 whitespace-nowrap py-3 px-6 dark:hover:text-white"
                  }
                >
                  {sponsorHasAtLeastOneRejectedProposalAndNoPending &&
                    isOwner &&
                    text === "Refused" && (
                      <InfoIcon text="You ad as been refused and you have no pending ad. Try to submit a new one.">
                        <ExclamationCircleIcon className="h-5 w-5 text-red dark:text-red" />
                      </InfoIcon>
                    )}
                  {mediaShouldValidateAnAd &&
                    text === "Pending" &&
                    isMedia &&
                    pendingProposalLength !== 0 && (
                      <InfoIcon text="You have at least one ad to validate or to refuse.">
                        <ExclamationCircleIcon className="h-5 w-5 text-red dark:text-red" />
                      </InfoIcon>
                    )}
                  {icon}
                  <span className="font-display text-base font-medium ml-2">
                    <div className="flex items-center">
                      <span>
                        {text} (
                        {text === "Pending"
                          ? pendingProposalData?.length
                          : text === "Validated"
                            ? validatedProposalData?.length
                            : text === "Refused"
                              ? refusedProposalData?.length
                              : 0}
                        )
                      </span>
                    </div>
                  </span>
                </button>
              </Tab>
            );
          })}
        </TabList>

        <div>
          <TabPanel>
            <div className="container mb-12 relative p-0">
              {/* <!-- Filter --> */}
              <ReviewCarousel
                chainId={chainId}
                setSelectedItems={setSelectedItems}
                selectedItems={selectedItems}
                setRefusedValidatedAdModal={setRefusedValidatedAdModal}
                refusedValidatedAdModal={refusedValidatedAdModal}
                pendingProposalData={pendingProposalData}
                handleSubmit={handleSubmit}
                successFullRefuseModal={successFullRefuseModal}
                isToken={isToken}
                isOwner={isOwner}
                setSuccessFullRefuseModal={setSuccessFullRefuseModal}
                handleItemSubmit={handleItemSubmit}
                aspectRatio={aspectRatio}
                setSponsorHasAtLeastOneRejectedProposalAndNoPending={
                  setSponsorHasAtLeastOneRejectedProposalAndNoPending
                }
              />
            </div>
          </TabPanel>
        </div>

        <TabPanel>
          <div className="container mb-12 relative p-0">
            {/* <!-- Filter --> */}
            <ValidatedRefusedItems
              statut={true}
              proposalData={validatedProposalData}
              isToken={isToken}
            />
          </div>
        </TabPanel>
        <TabPanel>
          <div className="container mb-12 relative p-0">
            {/* <!-- Filter --> */}
            <ValidatedRefusedItems statut={false} proposalData={refusedProposalData} />
          </div>
        </TabPanel>
      </Tabs>

      {refusedValidatedAdModal && (
        <div className="modal fade show bloc">
          <AddProposalRefusedModal
            refusedValidatedAdModal={refusedValidatedAdModal}
            selectedItems={selectedItems}
            handleCommentChange={handleCommentChange}
            handleItemSubmit={handleItemSubmit}
            closeRefuseModal={closeRefuseModal}
            successFullRefuseModal={successFullRefuseModal}
            successFullModalObject={
              isApprouvedAd ? successFullValidatedAdModalObject : successFullRefusedAdModalObject
            }
            comments={comments}
            setIsApprouvedAd={setIsApprouvedAd}
          />
        </div>
      )}
    </>
  );
};

export default Validation;
