import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { GetAllAdsOffers } from "../../data/services/AdsOffersService";
import Image from "next/image";
import Trending_categories_items from "../categories/trending_categories_items";
import Review_adProposal_items from "../collectrions/review_adProposal_items";
import OfferItem from "../cards/offerItem";

const User_items = () => {
  const [data, setData] = useState([]);
  const [itemActive, setItemActive] = useState(1);
  const offerAddress = "0x1e9cfb3a3d87d07d14a78681061c52d88225f7fd101d81ff7f76ba6353eff2af2b000000";
  useEffect(() => {
    const fetchAdsOffers = async () => {
      const result = await GetAllAdsOffers();
      console.log(result);
      setData(result);
    };

    fetchAdsOffers();
  }, []);
  const tabItem = [
    {
      id: 1,
      text: "Created",
      icon: "owned",
    },
    {
      id: 2,
      text: "Owned",
      icon: "owned",
    },

    {
      id: 3,
      text: "Favorite",
      icon: "activity",
    },
  ];
  return (
    <>
      <section className="relative py-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <Image width={1519} height={773} priority src="/images/gradient_light.jpg" alt="gradient" className="h-full w-full object-cover" />
        </picture>
        <div className="container">
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

            <TabPanel>
              <div>
                <Trending_categories_items data={data} offerAddress={offerAddress} />
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <Trending_categories_items data={data} offerAddress={offerAddress} />
              </div>
            </TabPanel>
            <TabPanel>
              <Trending_categories_items data={data} offerAddress={offerAddress} />
            </TabPanel>
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default User_items;
