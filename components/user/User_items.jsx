import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import Image from "next/image";
import Trending_categories_items from "../categories/trending_categories_items";
import Review_adProposal_items from "../collectrions/review_adProposal_items";

const User_items = () => {
  const [itemActive, setItemActive] = useState(1);
  const tabItem = [
    {
      id: 1,
      text: "review",
      icon: "owned",
    },
    {
      id: 2,
      text: "owned",
      icon: "owned",
    },

    {
      id: 3,
      text: "Activity",
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
                {/* <!-- Filter --> */}
                <Trending_categories_items />
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                {/* <!-- Filter --> */}
                <Trending_categories_items />
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                {/* <!-- Filter --> */}
                <Trending_categories_items />
              </div>
            </TabPanel>
            <TabPanel>
              {/* <!-- Grid --> */}
              <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-3 lg:grid-cols-4">
                <Review_adProposal_items itemFor="userPage" />
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default User_items;
