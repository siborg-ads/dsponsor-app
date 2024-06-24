import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Image from "next/image";
import OwnedOffersCategoriesItems from "../categories/ownedOffers_categories_items";

import OwnedAdProposalsCategoriesItems from "../categories/ownedAdProposals_categories_item";
import AuctionsCategories from "../categories/Auctions_categories";
import TokenAuctionBids from "../categories/tokenAuctionBids";
import { activated_features } from "../../data/activated_features";
import Activity from "../categories/Activity";
import { useAddress } from "@thirdweb-dev/react";
import { getAddress } from "ethers/lib/utils";
import { useChainContext } from "../../contexts/hooks/useChainContext";
import JoinSiBorgApp from "../categories/joinSiBorgApp";
import "tippy.js/dist/tippy.css";
import handleCopy from "../../utils/handleCopy";
import Tippy from "@tippyjs/react";
import { ClipboardIcon } from "@heroicons/react/20/solid";

const User_items = ({
  createdData,
  mappedownedAdProposals,
  tokenAuctionBids,
  isPendinAdsOnOffer,
  isOwner,
  listedAuctionToken,
  manageAddress
}) => {
  const [itemActive, setItemActive] = useState(1);
  const [isUserConnected, setIsUserConnected] = useState(false);
  const [copied, setCopied] = useState(false);

  const chainObject = useChainContext();
  const chainId = chainObject?.currentChainObject?.chainId;

  const address = useAddress();
  const userAddr = address;

  let frontURL;
  if (typeof window !== "undefined") {
    frontURL = window.location.origin;
  }

  const inputRef = React.useRef();

  useEffect(() => {
    if (!address || !manageAddress) {
      setIsUserConnected(false);
      return;
    }

    if (address === "" || manageAddress === "") {
      setIsUserConnected(false);
      return;
    }

    if (getAddress(address) === getAddress(manageAddress)) {
      setIsUserConnected(true);
    } else {
      setIsUserConnected(false);
    }
  }, [address, manageAddress]);

  const tabItem = [
    {
      id: 1,
      text: "Activity",
      icon: "activity"
    },
    ...(isUserConnected ? [{ id: 2, text: "Join SiBorg App", icon: "owned" }] : []),
    { id: 3, text: "Owned tokens", icon: "owned" },
    { id: 4, text: "Auction listed tokens", icon: "activity" },
    { id: 5, text: "Token Auction Bids ", icon: "activity" },
    ...(activated_features.canCreateOffer
      ? [
          {
            id: 6,
            text: "Created Offers",
            icon: "owned"
          }
        ]
      : [])
  ];

  return (
    <>
      <section className="relative py-12">
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

        {isUserConnected && (
          <>
            <div className="flex flex-col gap-4 max-w-lg mx-auto px-4">
              <span className="text-white text-center">
                Find your referral link below. It allows you to earn rewards when someone uses it on
                SiBorg Ads.
              </span>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4 h-full">
                  <button
                    onClick={() => {
                      const text = encodeURIComponent(
                        `Participate in @siborgapp's "bid to earn" auction to secure ad space NFT on @siborgapp search results!\n\nEarn perks with boxes and get rewarded when outbid! 💰\n\n#Web3Monetization #DigitalRWA #SiBorgAds\n ${frontURL}/?_rid=${userAddr}`
                      );
                      const url = `https://twitter.com/intent/tweet?text=${text}`;
                      window.open(url, "_blank");
                    }}
                    className={`bg-primaryPurple hover:bg-opacity-80 rounded-2lg text-white p-2 flex items-center justify-center text-center gap-2`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0 0 50 50"
                      className="text-white w-5 h-5 fill-white"
                    >
                      <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"></path>
                    </svg>
                    <span className="hidden md:block">Share on X</span>
                  </button>

                  <div className="relative w-full h-full">
                    <input
                      ref={inputRef}
                      disabled
                      value={`${frontURL}/?_rid=${userAddr}`}
                      className="pr-12 h-full w-full bg-secondaryBlack border hover:border-opacity-20 border-white border-opacity-10 rounded-2lg p-2 focus:border-white focus:border-opacity-20 focus:ring-transparent dark:bg-secondaryBlack dark:text-white"
                    />
                    <Tippy content={copied ? "Copied!" : "Copy"} placement="top" trigger="click">
                      <button
                        onClick={() => {
                          handleCopy(`${frontURL}/?_rid=${userAddr}`, setCopied);
                        }}
                        className="absolute right-0 top-0 h-full px-4 text-white hover:text-jacarta-100 rounded-r-lg"
                      >
                        <ClipboardIcon className="h-5 w-5" />
                      </button>
                    </Tippy>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="container">
          {/* <!-- Tabs Nav --> */}
          <Tabs className="tabs">
            <TabList className="nav nav-tabs hide-scrollbar my-12 flex items-center justify-start overflow-x-auto overflow-y-hidden border-b border-jacarta-100 pb-px dark:border-jacarta-600 md:justify-center">
              {tabItem.map(({ id, text, icon }) => {
                return (
                  <Tab className="nav-item" key={id} onClick={() => setItemActive(id)}>
                    <button
                      className={
                        itemActive === id
                          ? "nav-link hover:text-jacarta-900 text-jacarta-100 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white active"
                          : "nav-link hover:text-jacarta-900 text-jacarta-100 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white"
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
                <Activity
                  isUserConnected={isUserConnected}
                  userAddr={manageAddress}
                  chainId={chainId}
                />
              </div>
            </TabPanel>
            {isUserConnected && (
              <TabPanel>
                <div>
                  <JoinSiBorgApp manageAddress={manageAddress} />
                </div>
              </TabPanel>
            )}
            <TabPanel>
              <div>
                <OwnedAdProposalsCategoriesItems data={mappedownedAdProposals} isOwner={isOwner} />
              </div>
            </TabPanel>
            <TabPanel>
              <AuctionsCategories data={listedAuctionToken} isOwner={isOwner} />
            </TabPanel>
            <TabPanel>
              <div>
                <TokenAuctionBids data={tokenAuctionBids} isOwner={isOwner} />
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <OwnedOffersCategoriesItems
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
