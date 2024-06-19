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
import Link from "next/link";
import { ClipboardIcon } from "@heroicons/react/20/solid";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

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
  const [code, setCode] = useState(null);
  const [copied, setCopied] = useState(false);

  const chainObject = useChainContext();
  const chainId = chainObject?.currentChainObject?.chainId;

  const address = useAddress();

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

  useEffect(() => {
    if (!address) return;

    const fetchCode = async () => {
      await fetch(`https://api.siborg.io/users/code?ethAddr=${address}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((response) => response.json())
        .then((data) => {
          setCode(data.code);
        })
        .catch((error) => {
          console.error("Error getting SiBorg code:", error);
        });
    };

    fetchCode();
  }, [address]);

  const tabItem = [
    {
      id: 1,
      text: "Activity",
      icon: "activity"
    },
    { id: 2, text: "Owned tokens", icon: "owned" },
    { id: 3, text: "Auction listed tokens", icon: "activity" },
    { id: 4, text: "Token Auction Bids ", icon: "activity" },
    ...(activated_features.canCreateOffer
      ? [
          {
            id: 5,
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

        <div className="container">
          {isUserConnected && (
            <>
              <div className="mb-4 max-w-2xl text-center mx-auto">
                Ad spaces token owners will soon be able to submit an ad to be displayed in the
                SiBorg App. Here is your exclusive code to{" "}
                <Link
                  href="https://beta.siborg.io"
                  target="_blank"
                  className="text-primaryPurple hover:text-opacity-80"
                >
                  join the beta
                </Link>
                .
              </div>

              <div className="mb-4 max-w-sm text-center flex items-center justify-center mx-auto">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={code ?? "Loading..."}
                    className="pr-2 h-full w-full bg-secondaryBlack border hover:border-opacity-20 border-white border-opacity-10 rounded-2lg p-2 focus:border-white focus:border-opacity-20 focus:ring-transparent dark:bg-secondaryBlack dark:text-white"
                    readOnly
                  />
                  <Tippy content={copied ? "Copied!" : "Copy"} placement="top" trigger="click">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(code);
                        setCopied(true);
                      }}
                      className="absolute right-0 top-0 h-full px-4 text-white hover:text-jacarta-100 rounded-r-lg"
                    >
                      <ClipboardIcon className="h-5 w-5" />
                    </button>
                  </Tippy>
                </div>
              </div>
            </>
          )}

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
