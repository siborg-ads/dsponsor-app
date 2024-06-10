import React, { useEffect, useState } from "react";
import LeaderboardTable from "../../../components/tables/LeaderboardTable";
import { fetchMarketplaceActivity } from "../../../providers/methods/fetchMarketplaceActivity";
import processBidsAndCalculateRewards from "./processBidsAndCalculateRewards";



const MarketplaceLeaderboardContainer = () => {
    const [activity, setActivity] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const chainIds = [11155111, 84532];
        const promises = chainIds.map(chainId => fetchMarketplaceActivity(chainId).then(activity => ({
            ...activity,
            chainId
        })));
       

        Promise.all(promises).then(activities => {
           
            const mergedActivitiesArray = [];
            for(const activity of activities){
            const mergedActivities = {
              ...activity,
              rankings: processBidsAndCalculateRewards(activity.rankings),
            };
            mergedActivitiesArray.push(mergedActivities);
            }
            console.log("Processed activity:", mergedActivitiesArray);
            // const mergedActivities = activities.flatMap(activity => activity.rankings.map(ranking => ({
            //     ...ranking,
            //     chainId: activity.chainId
            // })));
            // console.log("Processed activity:", mergedActivities);
            // const processedActivity = processBidsAndCalculateRewards(mergedActivities);
            setActivity(mergedActivitiesArray);
            setLoading(false);
        }).catch((error) => {
            console.error('Error fetching activities:', error);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>; 
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
