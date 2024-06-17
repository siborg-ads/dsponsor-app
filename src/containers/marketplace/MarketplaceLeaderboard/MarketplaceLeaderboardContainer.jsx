import React, { useEffect, useState } from "react";
import LeaderboardTable from "../../../components/tables/LeaderboardTable";
import { fetchMarketplaceActivity } from "../../../providers/methods/fetchMarketplaceActivity";
import processBidsAndCalculateRewards from "./processBidsAndCalculateRewards";
import LeaderBoardSkeleton from "../../../components/skeleton/leaderBoardSkeleton";
import config from "../../../config/config";

const MarketplaceLeaderboardContainer = () => {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const promises = Object.entries(config).map((chainId) =>
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

  return (
    <>
      <section className="relative py-24">
        <LeaderboardTable activity={activity} />
      </section>
    </>
  );
};

export default MarketplaceLeaderboardContainer;
