import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Image from "next/image";
import Link from "next/link";
import activityToTopHolders from "./utils/activityToTopHolders";
import activityToTopSpenders from "./utils/activityToTopSpenders";
import activityToTopRewarded from "./utils/activityToTopRewarded";
import config from "../../providers/utils/config";
import { useChainContext } from "../../contexts/hooks/useChainContext";
import TopCards from "../leaderBoard/topCards";

const renderTable = (title, data, columns) => {
  if (!data || data.length === 0) {
    return <div className="text-center py-4">No data available</div>;
  }

  return (
    <div className="w-full text-left min-w-[736px] border dark:border-primaryPink dark:border-opacity-10 dark:bg-primaryBlack dark:text-white rounded-2lg">
      <table className="w-full rounded-2lg">
        <thead className="rounded-2lg">
          <tr className="bg-jacarta-50 dark:bg-primaryPurple rounded-2lg">
            {columns.map((col, index) => (
              <th key={index} className="py-3 px-4 font-medium">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="border-t border-jacarta-100 dark:border-primaryPink dark:border-opacity-10"
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="py-4 px-4">
                  {col.render(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const LeaderboardTable = ({ activity }) => {
  const { currentChainObject } = useChainContext();
  const [activeBlockchain, setActiveBlockchain] = useState(currentChainObject?.chainId);
  const [itemActive, setItemActive] = useState(1);
  const [chainId, setChainId] = useState();
  const [filteredActivity, setFilteredActivity] = useState([]);

  const [blockChainOptions, setBlockChainOptions] = useState([]);
  const [leaderboards, setLeaderboards] = useState({});

  useEffect(() => {
    const filteredActivity = activity?.filter((item) => item.chainId === Number(activeBlockchain));
    setChainId(filteredActivity[0].chainId);
    setFilteredActivity(filteredActivity[0]);

    setLeaderboards({
      topHolders: activityToTopHolders(filteredActivity[0]?.rankings),
      topSpenders: activityToTopSpenders(filteredActivity[0]?.rankings),
      topRewarded: activityToTopRewarded(filteredActivity[0]?.rankings)
    });
  }, [activeBlockchain, activity]);

  useEffect(() => {
    const chains = Object.entries(config).map((value) => {
      return value[1].chainId;
    });

    setBlockChainOptions(chains);
  }, [activity]);

  const holderColumns = [
    { header: "Rank", render: (item) => item.rank },
    { header: "Total Amount Spent", render: (item) => `${item.totalSpent} USDC` },
    {
      header: "Wallet",
      render: (item) => (
        <Link href={`/manage/${item.address}`}>
          <span className="text-primaryPink hover:text-jacarta-100">{item.addressDisplay}</span>
        </Link>
      )
    },
    { header: "Owned", render: (item) => item.balance }
    //{ header: "Chain", render: () => config[chainId].chainName }
    // { header: "DPoints", render: (item) => item.dPoints }
  ];

  const spenderColumns = [
    { header: "Rank", render: (item) => item.rank },
    { header: "Total Amount Spent", render: (item) => `${item.totalSpent} USDC` },
    {
      header: "Wallet",
      render: (item) => (
        <Link href={`/manage/${item.address}`}>
          <span className="text-primaryPink hover:text-jacarta-100">{item.addressDisplay}</span>
        </Link>
      )
    },
    { header: "Balance", render: (item) => item.balance },
    { header: "Chain", render: () => config[chainId].chainName }
    // { header: "DPoints", render: (item) => item.dPoints }
  ];

  const rewardedColumns = [
    { header: "Rank", render: (item) => item.rank },
    { header: "Total Amount Earned", render: (item) => `${item.totalReceived} USDC` },
    {
      header: "Address",
      render: (item) => (
        <Link href={`/manage/${item.address}`}>
          <span className="text-primaryPink hover:text-jacarta-100">{item.addressDisplay}</span>
        </Link>
      )
    },
    { header: "# of Refunds", render: (item) => item.refunds },
    { header: "Chain ", render: () => config[chainId].chainName }
    // { header: "DPoints", render: (item) => item.dPoints }
  ];
  const columns = {
    topHolders: holderColumns,
    topSpenders: spenderColumns,
    topRewarded: rewardedColumns
  };
  const tabItem = [
    { id: 1, text: "Top Holders", icon: "owned" },
    { id: 2, text: "Top Spenders", icon: "activity" },
    { id: 3, text: "Top Rewarded", icon: "activity" }
  ];

  return (
    <div className="container ">
      <h1 className="text-4xl font-medium text-center pt-8 pb-4 dark:text-white">
        Leaderboard Rankings
      </h1>
      <div className="mb-8 flex flex-col gap-6 flex-wrap items-center justify-between">
        <div className="flex flex-wrap items-center">
          {/* Blockchain Filter */}
          <div className="my-1 mr-2.5">
            <button
              className="dropdown-toggle group group flex h-9 items-center rounded-lg border border-jacarta-100 bg-white px-4 font-display text-sm font-semibold text-jacarta-900 transition-colors hover:border-transparent hover:bg-primaryPurple hover:text-white dark:border-primaryBlack dark:bg-secondaryBlack dark:text-white dark:hover:bg-primaryPurple"
              id="categoriesFilter"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="mr-1 h-4 w-4 fill-secondaryBlack transition-colors group-hover:fill-white dark:fill-jacarta-100"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M14 10v4h-4v-4h4zm2 0h5v4h-5v-4zm-2 11h-4v-5h4v5zm2 0v-5h5v4a1 1 0 0 1-1 1h-4zM14 3v5h-4V3h4zm2 0h4a1 1 0 0 1 1 1v4h-5V3zm-8 7v4H3v-4h5zm0 11H4a1 1 0 0 1-1-1v-4h5v5zM8 3v5H3V4a1 1 0 0 1 1-1h4z" />
              </svg>
              <div className="flex gap-2">
                <span>{config[activeBlockchain]?.chainName}</span>
                <Image
                  src={config[activeBlockchain]?.logoURL}
                  width={17}
                  height={17}
                  alt="blockchain logo"
                />
              </div>
            </button>
            <div className="dropdown-menu z-10 hidden min-w-[220px] whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800">
              <ul className="flex flex-col flex-wrap">
                {blockChainOptions.map((option, index) => (
                  <li
                    onClick={() => setActiveBlockchain(option)}
                    key={index}
                    className="cursor-pointer"
                  >
                    {activeBlockchain == option ? (
                      <div className="dropdown-item flex w-full items-center justify-between rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                        <div className="flex gap-2">
                          <span className="text-jacarta-900 dark:text-white">
                            {config[option]?.chainName}
                          </span>
                          <Image
                            src={config[option]?.logoURL}
                            width={17}
                            height={17}
                            alt="blockchain logo"
                          />
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          className="mb-[3px] h-4 w-4 text-primaryPink"
                        >
                          <path fill="none" d="M0 0h24v24H0z"></path>
                          <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                        </svg>
                      </div>
                    ) : (
                      <div className="dropdown-item flex gap-2 w-full items-center rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600">
                        {config[option]?.chainName}
                        <Image
                          src={config[option]?.logoURL}
                          width={17}
                          height={17}
                          alt="blockchain logo"
                        />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <TopCards activity={filteredActivity} />
      </div>
      <div className="scrollbar-custom overflow-x-auto">
        {/* <!-- Tabs Nav --> */}
        <Tabs className="tabs scrollbar-custom ">
          <TabList className="nav nav-tabs scrollbar-custom mb-12 flex items-center justify-start  overflow-y-hidden border-b border-jacarta-100 pb-px dark:border-jacarta-600 md:justify-center">
            {tabItem.map(({ id, text, icon }) => {
              return (
                <Tab
                  className="nav-item "
                  role="presentation"
                  key={id}
                  onClick={() => setItemActive(id)}
                >
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
          {Object.entries(leaderboards).map(([key, data]) => (
            <TabPanel key={key}>
              <div className="overflow-x-auto">
                {renderTable(`Top ${key.replace("top", "")}`, data, columns[key])}
              </div>
            </TabPanel>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default LeaderboardTable;
