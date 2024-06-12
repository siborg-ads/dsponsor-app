import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Image from "next/image";
import OwnedOffers_categories_items from "../categories/ownedOffers_categories_items";

import OwnedAdProposals_categories_items from "../categories/ownedAdProposals_categories_item";
import Auctions_categories from "../categories/Auctions_categories";
import TokenAuctionBids from "../categories/tokenAuctionBids";
import { activated_features } from "../../data/activated_features";

const User_items = ({
  createdData,
  mappedownedAdProposals,
  tokenAuctionBids,
  isPendinAdsOnOffer,
  isOwner,
  isLister,
  listedAuctionToken
}) => {
  const [itemActive, setItemActive] = useState(1);

  const tabItem = [
    { id: 1, text: "Owned tokens", icon: "owned" },
    { id: 2, text: "Auction listed tokens", icon: "activity" },
    { id: 3, text: "Token Auction Bids ", icon: "activity" },
    ...(activated_features.canCreateOffer
      ? [
          {
            id: 4,
            text: "Created Offers",
            icon: "owned"
          }
        ]
      : [])
  ];

  return (
    <>
      <section className="relative py-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <Image
            width={1519}
            height={773}
            priority
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="h-full w-full object-cover"
          />
        </picture>
        <div className="container">
          {/* <!-- Tabs Nav --> */}
          <Tabs className="tabs">
            <TabList className="nav nav-tabs scrollbar-custom mb-12 flex items-center justify-start overflow-x-auto overflow-y-hidden border-b border-jacarta-100 pb-px dark:border-jacarta-600 md:justify-center">
              {tabItem.map(({ id, text, icon }) => {
                return (
                  <Tab
                    className="nav-item"
                    role="presentation"
                    key={id}
                    onClick={() => setItemActive(id)}
                  >
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
            <TabPanel>
              <div>
                <OwnedAdProposals_categories_items
                  data={mappedownedAdProposals}
                  isOwner={isOwner}
                />
              </div>
            </TabPanel>
            <TabPanel>
              <Auctions_categories data={listedAuctionToken} isOwner={isOwner} />
            </TabPanel>
            <TabPanel>
              <div>
                <TokenAuctionBids data={tokenAuctionBids} isOwner={isOwner} />
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <OwnedOffers_categories_items
                  data={createdData}
                  isPendinAdsOnOffer={isPendinAdsOnOffer}
                  isOwner={isOwner}
                />
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default User_items;
