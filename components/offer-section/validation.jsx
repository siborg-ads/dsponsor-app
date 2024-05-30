import React from "react";
import { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Divider } from "@nextui-org/react";
import Validated_refused_items from "../collections/validated_refused_items";
import Review_carousel from "../carousel/review_carousel";

const Validation = ({ offer, offerId, isOwner, handleSubmit, successFullRefuseModal,setSuccessFullRefuseModal, isToken = false, successFullUploadModal, setRefusedValidatedAdModal, refusedValidatedAdModal, setSelectedItems, selectedItems }) => {
  const [pendingProposalData, setPendingProposalData] = useState([]);
  const [validatedProposalData, setValidatedProposalData] = useState([]);
  const [refusedProposalData, setRefusedProposalData] = useState([]);
  const [itemActive, setItemActive] = useState(1);
  const tabItem = [
    {
      id: 1,
      text: "Pending",
      icon: "owned",
    },
    {
      id: 2,
      text: "Validated",
      icon: "owned",
    },

    {
      id: 3,
      text: "Refused",
      icon: "activity",
    },
  ];
  useEffect(() => {
    if (!offer) return;
    const groupedPendingAds = {};
    const groupedValidatedAds = {};
    const groupedRefusedAds = {};

    function processProposal(token, element, groupedAds, statusKey, statusId) {
      if (element[statusKey] !== null) {
        if (!groupedAds[token.tokenId]) {
          groupedAds[token.tokenId] = {
            tokenId: token.tokenId,
            offerId: offerId,
            tokenData: token.mint.tokenData || null,
            proposalIds: [],
            adParametersList: {},
            adParametersKeys: [],
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

    const formattedPendingAds = Object.values(groupedPendingAds);
    const formattedValidatedAds = Object.values(groupedValidatedAds);
    const formattedRefusedAds = Object.values(groupedRefusedAds);

    setValidatedProposalData(formattedValidatedAds);
    setRefusedProposalData(formattedRefusedAds);

    setPendingProposalData(formattedPendingAds);
  }, [offer, successFullUploadModal]);

  return (
    <div className="container">
      <Divider className="my-4" />
      <h2 className="text-jacarta-700 font-bold font-display mb-6 text-center text-3xl dark:text-white ">Submitted Ads </h2>
      {/* <!-- Tabs Nav --> */}
      <Tabs className="tabs">
        <TabList className="nav nav-tabs scrollbar-custom mb-12 flex items-center justify-start overflow-x-auto overflow-y-hidden border-b border-jacarta-100 pb-px dark:border-jacarta-600 md:justify-center">
          {tabItem.map(({ id, text, icon }) => {
            return (
              <Tab className="nav-item" role="presentation" key={id} onClick={() => setItemActive(id)}>
                <button
                  className={
                    itemActive === id
                      ? "nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white active"
                      : "nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white"
                  }
                >
                  <svg className="icon mr-1 h-5 w-5 fill-current">
                    <use xlinkHref={`/icons.svg#icon-${icon}`}></use>
                  </svg>
                  <span className="font-display text-base font-medium">{text}</span>
                </button>
              </Tab>
            );
          })}
        </TabList>

        <div>
          <TabPanel>
            <div className="container mb-12 relative p-0">
              {/* <!-- Filter --> */}
              <Review_carousel
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
              />
            </div>
          </TabPanel>
        </div>

        <TabPanel>
          <div className="container mb-12 relative p-0">
            {/* <!-- Filter --> */}
            <Validated_refused_items statut={true} proposalData={validatedProposalData} isToken={isToken} />
          </div>
        </TabPanel>
        <TabPanel>
          <div className="container mb-12 relative p-0">
            {/* <!-- Filter --> */}
            <Validated_refused_items statut={false} proposalData={refusedProposalData} />
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Validation;
