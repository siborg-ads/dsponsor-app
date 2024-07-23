import React, { useState, useEffect, useMemo, useRef } from "react";
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
import debounce from "lodash/debounce";
import {
  ActivityIcon,
  CoinsIcon,
  GavelIcon,
  LoaderIcon,
  MegaphoneIcon,
  TrophyIcon
} from "lucide-react";

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
  const { asPath } = router;
  const isMounted = useRef(true);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const tabItem = useMemo(
    () => [
      { id: 1, text: "Activity", section: "activity", icon: <ActivityIcon className="h-4 w-4" /> },
      { id: 2, text: "Bids", section: "bids", icon: <GavelIcon className="h-4 w-4" /> },
      { id: 3, text: "Owned tokens", section: "owned", icon: <CoinsIcon className="h-4 w-4" /> },
      {
        id: 4,
        text: "Auction listed tokens",
        section: "auction",
        icon: <TrophyIcon className="h-4 w-4" />
      },
      {
        id: 5,
        text: "Token Auction Bids",
        section: "tokenAuctionBids",
        icon: <LoaderIcon className="h-4 w-4" />
      },
      ...(activated_features.canCreateOffer
        ? [
            {
              id: 6,
              text: "Created Offers",
              section: "createdOffers",
              icon: <MegaphoneIcon className="h-4 w-4" />
            }
          ]
        : [])
    ],
    []
  );

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const currentTabIndex = useMemo(() => {
    const hash = asPath.split("#")[1];
    const index = tabItem.findIndex((tab) => tab.section === hash);
    return index !== -1 ? index : 0;
  }, [asPath, tabItem]);

  const handleSelect = debounce(async (index) => {
    const selectedTab = tabItem[index];
    const currentHash = asPath.split("#")[1] || "";

    if (selectedTab.section !== currentHash) {
      try {
        if (!window.isNavigating) {
          window.isNavigating = true;
          await router.push(`#${selectedTab.section}`, undefined, { shallow: true });
          if (isMounted.current) {
            window.isNavigating = false;
          }
        }
      } catch (error) {
        if (isMounted.current) {
          window.isNavigating = false;
        }
        console.error("Navigation error:", error);
      }
    }
  }, 300);

  return (
    <Tabs className="tabs" onSelect={handleSelect} selectedIndex={currentTabIndex}>
      <TabList className="nav nav-tabs hide-scrollbar mb-12 flex items-center justify-start overflow-x-auto overflow-y-hidden border-b border-jacarta-100 pb-px dark:border-jacarta-600 md:justify-center">
        {tabItem.map(({ id, text, icon, section }) => (
          <Tab className="nav-item" key={id}>
            <Link href={`#${section}`} scroll={false}>
              <button
                className={
                  currentTabIndex === id - 1
                    ? "nav-link hover:text-jacarta-900 text-jacarta-100 relative flex items-center whitespace-nowrap py-3 px-4 dark:hover:text-white active"
                    : "nav-link hover:text-jacarta-900 text-jacarta-100 relative flex items-center whitespace-nowrap py-3 px-4 dark:hover:text-white"
                }
              >
                {isPendingAdsOnOffer && isOwner && text === "Created Offers" && (
                  <InfoIcon text="You have 1 or more ads proposals to check on your offer">
                    <ExclamationCircleIcon className="h-5 w-5 text-red mr-2" />
                  </InfoIcon>
                )}
                {icon}
                <span className="font-display text-base font-medium ml-2">{text}</span>
              </button>
            </Link>
          </Tab>
        ))}
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
          isPendingAdsOnOffer={isPendingAdsOnOffer}
          isOwner={isOwner}
          offers={offers}
        />
      </TabPanel>
    </Tabs>
  );
};

export default UserTabs;
