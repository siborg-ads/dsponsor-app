import React, {useContext, useState} from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import OfferTab from "./OfferTab";
import Properties from "./Properties";
import Activity_tab from "./Activity_tab";
import Price_history from "./Price_history";
import Link from "next/link";
import { useChainId } from "@thirdweb-dev/react";
import SDKProvider from "../../providers/SDKProvider";
import SDKContext from "../../contexts/SDKContext";


const ItemsTabs = ({ contractAddress, offerId }) => {
  const {SDKChainId,getChainName} = useContext(SDKContext);

  const [tabsActive, setTabsActive] = useState(1);
  const tabsHeadText = [
    // {
    //   id: 1,
    //   text: "Offers",
    //   icon: "offers",
    // },
    // {
    //   id: 2,
    //   text: "properties",
    //   icon: "properties",
    // },
    {
      id: 3,
      text: "details",
      icon: "details",
    },
    // {
    //   id: 4,
    //   text: "activities",
    //   icon: "activity",
    // },
    // {
    //   id: 5,
    //   text: "price history",
    //   icon: "price",
    // },
  ];
  return (
    <>
      <div className="scrollbar-custom mt-14 overflow-x-auto rounded-lg">
        {/* <!-- Tabs Nav --> */}
        <Tabs className="min-w-fit tabs">
          <TabList className="nav nav-tabs flex items-center">
            {/* <!-- Offers --> */}
            {tabsHeadText.map(({ id, text, icon }) => {
              return (
                <Tab className="nav-item bg-transparent" key={id}>
                  <button
                    className={
                      tabsActive === id
                        ? "nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white active"
                        : "nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white"
                    }
                    onClick={() => setTabsActive(id)}
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

          {/* <TabPanel className="tab-content">
            <OfferTab />
          </TabPanel> */}
          {/* <TabPanel>
            <Properties />
          </TabPanel> */}
          <TabPanel>
            {/* <!-- Details --> */}
            <div className="tab-pane fade" id="details" role="tabpanel" aria-labelledby="details-tab">
              <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-t-2lg rounded-b-2lg rounded-tl-none border bg-white p-6 md:p-10">
                <div className="mb-2 flex items-center">
                  <span className="dark:text-jacarta-300 mr-2 min-w-[9rem]">Contract Address:</span>
                  <Link href={`https://polygonscan.com/address/${contractAddress}`} target="_blank" rel="noopener noreferrer" className="text-accent">
                    {contractAddress}
                  </Link>
                </div>
                <div className="mb-2 flex items-center">
                  <span className="dark:text-jacarta-300 mr-2 min-w-[9rem]">Offer ID:</span>
                  <span className="js-copy-clipboard text-jacarta-700 cursor-pointer select-none dark:text-white" data-tippy-content="Copy">
                    {offerId}
                  </span>
                </div>
                <div className="mb-2 flex items-center">
                  <span className="dark:text-jacarta-300 mr-2 min-w-[9rem]">Token Standard:</span>
                  <span className="text-jacarta-700 dark:text-white">ERC-721</span>
                </div>
                <div className="flex items-center">
                  <span className="dark:text-jacarta-300 mr-2 min-w-[9rem]">Blockchain:</span>
                  <span className="text-jacarta-700 dark:text-white">{getChainName(SDKChainId)}</span>
                </div>
              </div>
            </div>
          </TabPanel>
          {/* <TabPanel>
            <Activity_tab />
          </TabPanel> */}
          {/* <TabPanel>
            <Price_history classes="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-t-2lg rounded-b-2lg rounded-tl-none border bg-white p-6" />
          </TabPanel> */}
        </Tabs>
      </div>
    </>
  );
};

export default ItemsTabs;
