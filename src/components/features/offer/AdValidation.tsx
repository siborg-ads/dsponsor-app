import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ValidatedOrRefusedAds from "@/components/features/offer/adValidation/ValidatedOrRefusedAds";
import PendingAds from "@/components/features/offer/adValidation/PendingAds";
import RejectAd from "@/components/features/offer/adValidation/modals/RejectAd";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import ResponsiveTooltip from "@/components/ui/ResponsiveTooltip";
import { CheckIcon, ClockIcon, XIcon, History } from "lucide-react";
import ProposalHistory from "@/components/features/offer/adValidation/ProposalHistory";
import { ChainObject } from "@/types/chain";

export type HistoryProposalType = {
  type: string;
  creationTimestamp: number;
  data: string;
  lastUpdateTimestamp: number;
  rejectReason: string;
  status: string;
  cssAspectRatio: string | null;
  metadata?: string;
  id: string;
};

function processAllProposals(token) {
  const groupedProposals: HistoryProposalType[] = [];
  for (const element of token.allProposals) {
    let cssAspectRatio = null;
    if (element.status.startsWith("imageURL")) {
      const sanitizedStatus = element.status.replace("-0", "");
      const ratio = sanitizedStatus.split("-")[1];
      cssAspectRatio = ratio?.replace(":", "/");
    }
    groupedProposals.push({
      type: element.adParameter.id,
      creationTimestamp: parseInt(element.creationTimestamp),
      data: element.data,
      lastUpdateTimestamp: parseInt(element.lastUpdateTimestamp),
      rejectReason: element.rejectReason,
      status: element.status,
      cssAspectRatio: cssAspectRatio,
      id: token.tokenId.toString(),
      metadata: token.mint.tokenData
    });
  }

  return groupedProposals;
}
export type ProposalValidation = {
  tokenId: string;
  offerId: string;
  tokenData: string;
  data: string;
  type: string;
  id: string;
  paramId: string;
  aspectRatio?: string;
  cssAspectRatio?: string;
  reason?: string;
};

const AdValidation = ({
  chainConfig,
  offer,
  offerId,
  isOwner,
  handleSubmit,
  successFullRefuseModal,
  setSuccessFullRefuseModal,
  setRefusedValidatedAdModal,
  refusedValidatedAdModal,
  setSelectedItems,
  selectedItems,
  isAdmin,
  sponsorHasAtLeastOneRejectedProposalAndNoPending,
  setSponsorHasAtLeastOneRejectedProposalAndNoPending,
  mediaShouldValidateAnAd,
  isMedia,
  isTokenView,
  itemTokenId,
  pendingProposalData,
  setPendingProposalData,
  fromToken
}: {
  chainConfig: ChainObject;
  offer: any;
  offerId?: string;
  isOwner: boolean;
  handleSubmit: any;
  successFullRefuseModal: boolean;
  setSuccessFullRefuseModal: any;
  setRefusedValidatedAdModal: any;
  refusedValidatedAdModal: any;
  setSelectedItems: any;
  selectedItems: any;
  sponsorHasAtLeastOneRejectedProposalAndNoPending: boolean;
  setSponsorHasAtLeastOneRejectedProposalAndNoPending?: any;
  mediaShouldValidateAnAd: boolean;
  isMedia: boolean;
  isAdmin: boolean;
  isTokenView?: boolean;
  itemTokenId: string;
  pendingProposalData: any;
  setPendingProposalData: any;
  fromToken?: boolean;
}) => {
  const [validatedProposalData, setValidatedProposalData] = useState<ProposalValidation[]>([]);
  const [refusedProposalData, setRefusedProposalData] = useState<ProposalValidation[]>([]);
  const [historyProposals, setHistoryProposals] = useState<HistoryProposalType[]>([]);
  const [itemActive, setItemActive] = useState<number>(1);
  const [comments, setComments] = useState({});
  const [isApprouvedAd, setIsApprouvedAd] = useState<boolean>(false);
  const [pendingProposalLength, setPendingProposalLength] = useState(0);
  const [aspectRatio, setAspectRatio] = useState<string | null>(null);

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
    },
    {
      id: 4,
      text: "History",
      icon: <History className="w-4 h-4" />
    }
  ];
  useEffect(() => {
    if (!offer) return;

    const groupedPendingAds = {};
    const groupedValidatedAds = {};
    const groupedRefusedAds = {};
    const groupedHistoryProposals: HistoryProposalType[] = [];

    function processProposal(token, element, groupedAds, statusKey) {
      if (element[statusKey] !== null) {
        const currProposal = element[statusKey];
        const id = currProposal.id;
        const adParamId = element.adParameter.id;
        const adParamBase = element.adParameter.base;

        groupedAds[id] = {
          tokenId: token?.tokenId,
          offerId: offer?.id,
          tokenData: token?.mint?.tokenData || null,
          data: currProposal.data,
          paramId: adParamId,
          id
        };

        if (statusKey === "rejectedProposal") {
          groupedAds[id].reason = currProposal.rejectReason;
        }

        if (adParamBase === "imageURL") groupedAds[id].type = "image";
        else if (adParamBase === "linkURL") groupedAds[id].type = "link";

        if (adParamId.startsWith("imageURL") && element.adParameter.variants.length > 0) {
          // adParamBase can be imageURL-1:1 or imageURL-0-1:1 for example
          // in the first case we want aspectRatio to be "1:1" and cssAspectRatio to be "1/1"
          // in the second case we want aspectRatio to be "1:1" and cssAspectRatio to be "1/1" too
          if (adParamId.includes("-0")) {
            const split = adParamId.split("-");
            const aspectRatio = split[2];
            const cssAspectRatio = aspectRatio?.replace(":", "/");
            groupedAds[id].aspectRatio = aspectRatio;
            groupedAds[id].cssAspectRatio = cssAspectRatio;
            setAspectRatio(aspectRatio);
          } else {
            const split = adParamId.split("-");
            const aspectRatio = split[1];
            const cssAspectRatio = aspectRatio?.replace(":", "/");
            groupedAds[id].aspectRatio = aspectRatio;
            groupedAds[id].cssAspectRatio = cssAspectRatio;
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

      processAllProposals(token).forEach((proposal) => {
        groupedHistoryProposals.push({
          ...proposal
        });
      });
    }

    let formattedPendingAds: ProposalValidation[] = Object.values(groupedPendingAds);
    let formattedValidatedAds: ProposalValidation[] = Object.values(groupedValidatedAds);
    let formattedRefusedAds: ProposalValidation[] = Object.values(groupedRefusedAds);
    groupedHistoryProposals.sort((a, b) => b.creationTimestamp - a.creationTimestamp);

    if (isTokenView) {
      formattedPendingAds = formattedPendingAds?.filter(
        (ad) => !!itemTokenId && !!ad?.tokenId && BigInt(ad?.tokenId) === BigInt(itemTokenId)
      );
      formattedValidatedAds = formattedValidatedAds?.filter(
        (ad) => !!itemTokenId && !!ad?.tokenId && BigInt(ad?.tokenId) === BigInt(itemTokenId)
      );
      formattedRefusedAds = formattedRefusedAds?.filter(
        (ad) => !!itemTokenId && !!ad?.tokenId && BigInt(ad?.tokenId) === BigInt(itemTokenId)
      );
    }

    setPendingProposalData(formattedPendingAds);
    setPendingProposalLength(formattedPendingAds.length);
    setValidatedProposalData(formattedValidatedAds);
    setRefusedProposalData(formattedRefusedAds);
    setHistoryProposals(groupedHistoryProposals);
  }, [isTokenView, offer, offerId, itemTokenId, setPendingProposalData]);

  const handleItemSubmit = async (approuved = false) => {
    let submissionArgs: {
      tokenId: string;
      offerId: string;
      validated?: boolean;
      item?: any;
      reason?: string;
    }[] = [];
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
      throw error;
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

  const handleCommentChange = (proposalId: string, value: string) => {
    setComments((currentComments) => ({
      ...currentComments,
      [proposalId]: value
    }));
    setSelectedItems((currentItems) => {
      return currentItems.map((item) => {
        if (
          !!item?.proposalId &&
          !!proposalId &&
          BigInt(item?.proposalId as string) === BigInt(proposalId as string)
        ) {
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
        <TabList className="flex items-center justify-start pb-px mb-12 overflow-x-auto overflow-y-hidden border-b nav nav-tabs scrollbar-custom border-jacarta-100 dark:border-jacarta-800 md:justify-center">
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
                    fromToken &&
                    text === "Refused" && (
                      <ResponsiveTooltip text="Your ad has been refused and you have no pending ad. Try to submit a new one.">
                        <ExclamationCircleIcon className="w-5 h-5 text-red dark:text-red" />
                      </ResponsiveTooltip>
                    )}
                  {mediaShouldValidateAnAd &&
                    text === "Pending" &&
                    isMedia &&
                    pendingProposalLength !== 0 && (
                      <ResponsiveTooltip text="You have at least one ad to validate or to refuse.">
                        <ExclamationCircleIcon className="w-5 h-5 text-red dark:text-red" />
                      </ResponsiveTooltip>
                    )}
                  {icon}
                  <span className="ml-2 text-base font-medium font-display">
                    <div className="flex items-center">
                      <span>
                        {text} (
                        {text === "Pending"
                          ? pendingProposalData?.length
                          : text === "Validated"
                            ? validatedProposalData?.length
                            : text === "Refused"
                              ? refusedProposalData?.length
                              : text === "History"
                                ? historyProposals?.length
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
            <div className="container relative p-0 mb-12">
              {/* <!-- Filter --> */}
              <PendingAds
                chainConfig={chainConfig}
                setSelectedItems={setSelectedItems}
                selectedItems={selectedItems}
                setRefusedValidatedAdModal={setRefusedValidatedAdModal}
                pendingProposalData={pendingProposalData}
                isToken={false}
                isAdmin={isAdmin}
                handleItemSubmit={handleItemSubmit}
                aspectRatio={aspectRatio as string}
                setSponsorHasAtLeastOneRejectedProposalAndNoPending={
                  setSponsorHasAtLeastOneRejectedProposalAndNoPending
                }
              />
            </div>
          </TabPanel>
        </div>

        <TabPanel>
          <div className="container relative p-0 mb-12">
            {/* <!-- Filter --> */}
            <ValidatedOrRefusedAds
              statut={true}
              proposalData={validatedProposalData}
              isToken={false}
            />
          </div>
        </TabPanel>
        <TabPanel>
          <div className="container relative p-0 mb-12">
            {/* <!-- Filter --> */}
            <ValidatedOrRefusedAds statut={false} proposalData={refusedProposalData} />
          </div>
        </TabPanel>
        <TabPanel>
          <div className="container relative p-0 mb-12">
            {/* <!-- Filter --> */}
            <ProposalHistory data={historyProposals} />
          </div>
        </TabPanel>
      </Tabs>

      {refusedValidatedAdModal && (
        <div className="modal fade show bloc">
          <RejectAd
            chainConfig={chainConfig}
            selectedItems={selectedItems}
            handleCommentChange={handleCommentChange}
            handleItemSubmit={handleItemSubmit}
            closeRefuseModal={closeRefuseModal}
            successFullRefuseModal={successFullRefuseModal}
            successFullModalObject={
              isApprouvedAd ? successFullValidatedAdModalObject : successFullRefusedAdModalObject
            }
            comments={comments}
          />
        </div>
      )}
    </>
  );
};

export default AdValidation;
