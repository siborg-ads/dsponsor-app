import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { activated_features } from "../../data/activated_features";
import Transactions from "./Transactions";
import OwnedOffersCategoriesItems from "../categories/ownedOffers_categories_items";
import OwnedAdProposalsCategoriesItems from "../categories/ownedAdProposals_categories_item";
import AuctionsCategories from "../categories/Auctions_categories";
import TokenAuctionBids from "../categories/tokenAuctionBids";
import Bids from "./bidsActivity";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import InfoIcon from "../informations/infoIcon";
import Link from "next/link";
import { useRouter } from "next/router";

const UserTabs = ({
  mappedownedAdProposals,
  isOwner,
  createdData,
  listedAuctionToken,
  tokenAuctionBids,
  isPendingAdsOnOffer,
  manageAddress,
  offers
}) => {
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const { pathname, query, asPath } = router;

  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [copied]);

  const tabItem = useMemo(
    () => [
      {
        id: 1,
        text: "Activity",
        icon: "activity",
        section: "activity"
      },
      {
        id: 2,
        text: "Bids",
        icon: "activity",
        section: "bids"
      },
      { id: 3, text: "Owned tokens", icon: "owned", section: "owned" },
      { id: 4, text: "Auction listed tokens", icon: "activity", section: "auction" },
      { id: 5, text: "Token Auction Bids", icon: "activity", section: "tokenAuctionBids" },
      ...(activated_features.canCreateOffer
        ? [
            {
              id: 6,
              text: "Created Offers",
              icon: "owned",
              section: "createdOffers"
            }
          ]
        : [])
    ],
    []
  );

  const getTabIndexFromHash = useCallback(
    (hash) => {
      const activeTab = tabItem.find((tab) => tab.section === hash);
      return activeTab ? tabItem.indexOf(activeTab) : 0; // default to first tab
    },
    [tabItem]
  );

  const handleSelect = (index) => {
    const selectedTab = tabItem[index];
    router.replace(
      `${pathname.replace("/[manage]", "")}/${query.manage}#${selectedTab.section}`,
      undefined,
      { scroll: false }
    );
  };

  useEffect(() => {
    const hash = asPath.split("#")[1];
    handleSelect(getTabIndexFromHash(hash));
  }, [asPath, getTabIndexFromHash]);

  return (
    <Tabs
      className="tabs"
      onSelect={handleSelect}
      selectedIndex={getTabIndexFromHash(asPath.split("#")[1])}
    >
      <TabList className="nav nav-tabs hide-scrollbar mb-12 flex items-center justify-start overflow-x-auto overflow-y-hidden border-b border-jacarta-100 pb-px dark:border-jacarta-600 md:justify-center">
        {tabItem.map(({ id, text, icon, section }) => {
          return (
            <Tab className="nav-item" key={id}>
              <Link
                href={`${pathname.replace("/[manage]", "")}/${query.manage}#${section}`}
                scroll={false}
              >
                <button
                  className={
                    getTabIndexFromHash(asPath.split("#")[1]) === id - 1
                      ? "nav-link hover:text-jacarta-900 text-jacarta-100 relative flex items-center whitespace-nowrap py-3 px-4 dark:hover:text-white active"
                      : "nav-link hover:text-jacarta-900 text-jacarta-100 relative flex items-center whitespace-nowrap py-3 px-4 dark:hover:text-white"
                  }
                >
                  {isPendingAdsOnOffer && isOwner && text === "Created Offers" && (
                    <InfoIcon text="You have 1 or more ads proposals to check on your offer">
                      <ExclamationCircleIcon className="h-5 w-5 text-red mr-2" />
                    </InfoIcon>
                  )}
                  <svg className="icon mr-1 h-5 w-5 fill-current">
                    <use xlinkHref={`/icons.svg#icon-${icon}`}></use>
                  </svg>
                  <span className="font-display text-base font-medium">{text}</span>
                </button>
              </Link>
            </Tab>
          );
        })}
      </TabList>
      <TabPanel>
        <Transactions manageAddress={manageAddress} />
      </TabPanel>
      <TabPanel>
        <Bids manageAddress={manageAddress} />
      </TabPanel>
      <TabPanel>
        <OwnedAdProposalsCategoriesItems data={mappedownedAdProposals} isOwner={isOwner} />
      </TabPanel>
      <TabPanel>
        <AuctionsCategories data={listedAuctionToken} isOwner={isOwner} />
      </TabPanel>
      <TabPanel>
        <TokenAuctionBids data={tokenAuctionBids} isOwner={isOwner} />
      </TabPanel>
      <TabPanel>
        <OwnedOffersCategoriesItems
          data={createdData}
          isPendinAdsOnOffer={isPendingAdsOnOffer}
          isOwner={isOwner}
          offers={offers}
        />
      </TabPanel>
    </Tabs>
  );
};

export default UserTabs;
