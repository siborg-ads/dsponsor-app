import React, { useEffect, useState } from "react";
import LeaderboardTable from "../../../components/tables/LeaderboardTable";
import { fetchMarketplaceActivity } from "../../../providers/methods/fetchMarketplaceActivity";
import processBidsAndCalculateRewards from "./processBidsAndCalculateRewards";
import LeaderBoardSkeleton from "../../../components/skeleton/leaderBoardSkeleton";
import Meta from "../../../components/Meta";
import config from "../../../config/config";

const MarketplaceLeaderboardContainer = () => {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const promises = Object.entries(config).map(([chainId]) =>
      fetchMarketplaceActivity(chainId).then((activity) => ({
        ...activity,
        chainId
      }))
    );

    Promise.all(promises)
      .then((activities) => {
        const mergedActivitiesArray = [];
        for (const activity of activities) {
          const mergedActivities = {
            ...activity,
            rankings: processBidsAndCalculateRewards(activity.rankings)
          };
          mergedActivitiesArray.push(mergedActivities);
        }

        // const mergedActivities = activities.flatMap(activity => activity.rankings.map(ranking => ({
        //     ...ranking,
        //     chainId: activity.chainId
        // })));

        // const processedActivity = processBidsAndCalculateRewards(mergedActivities);
        setActivity(mergedActivitiesArray);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching activities:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <LeaderBoardSkeleton />
      </>
    );
  }
const metadata = {
  title: `Leaderboard || SiBorg Ads - The Web3 Monetization Solution`,
  keyword:
    "audience engagement, web3, creator economic, NFT, creator monetization, creator economy, creator token, creator coin, creator tokenization, creator economy",
  desc: "Explore the future of media monetization. SiBorg Ads decentralized platform offers tokenized advertising spaces for dynamic and sustainable media funding."
};
  return (
    <>
      <Meta {...metadata} />
      <section className="relative py-24">
        <LeaderboardTable activity={activity} />
      </section>
    </>
  );
};

export default MarketplaceLeaderboardContainer;
