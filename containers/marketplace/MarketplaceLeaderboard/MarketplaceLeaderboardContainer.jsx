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
            const mergedActivities = activities.flatMap(activity => activity.rankings.map(ranking => ({
                ...ranking,
                chainId: activity.chainId
            })));
            const processedActivity = processBidsAndCalculateRewards(mergedActivities);
            setActivity(processedActivity);
            setLoading(false);
        }).catch((error) => {
            console.error('Error fetching activities:', error);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show a loading state while fetching data
    }

    return (
        <>
            <section className="relative lg:mt-24 lg:pt-12 mt-24 pt-12 pb-8">
                <div className="mb-8 container flex justify-center flex-col items-center">
                    <div className="flex justify-center">
                        <LeaderboardTable activity={activity} />
                    </div>
                </div>
            </section>
        </>
    );
};


export default MarketplaceLeaderboardContainer;
