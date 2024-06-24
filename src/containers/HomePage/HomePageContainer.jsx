import React, { useEffect, useState } from "react";
import { Hero, LastOffers, LastListings } from "../../components/component";
import Meta from "../../components/Meta";

import HowItWorks from "../../components/explication/howItWorks";

import fetchLastOffers from "../../providers/methods/fetchLastOffers";
import { fetchAllListedToken } from "../../providers/methods/fetchAllListedToken";
import { useChainContext } from "../../contexts/hooks/useChainContext";
import config from "../../config/config";

const HomePageContainer = () => {
  const [lastOffers, setLastOffers] = useState([]);
  const [lastListings, setLastListings] = useState([]);

  const { currentChainObject } = useChainContext();

  const chainId = currentChainObject?.chainId;

  useEffect(() => {
    if (!chainId) return;
    const fetchAdsOffers = async () => {
      const lastOffersArray = [];

      for (const [chainId] of Object.entries(config)) {
        const lastOffers = await fetchLastOffers(chainId);
        lastOffersArray.push(...lastOffers);
      }

      setLastOffers(lastOffersArray);
    };
    fetchAdsOffers();
  }, [chainId]);

  useEffect(() => {
    if (!chainId) return;
    const fetchAdsListings = async () => {
      const lastListingsArray = [];

      for (const [chainId] of Object.entries(config)) {
        const lastListings = await fetchAllListedToken(chainId);
        lastListingsArray.push(...lastListings);
      }

      setLastListings(lastListingsArray);
    };
    fetchAdsListings();
  }, [chainId]);
  const metadata = {
    title: `SiBorg Ads - The Web3 Monetization Solution`,
    keyword:
      "audience engagement, web3, creator economic, NFT, creator monetization, creator economy, creator token, creator coin, creator tokenization, creator economy",
    desc: "Explore the future of media monetization. SiBorg Ads decentralized platform offers tokenized advertising spaces for dynamic and sustainable media funding."
  };

  return (
    <main>
      <Meta {...metadata} />
      <Hero />
      <HowItWorks />
      <LastOffers data={lastOffers} />
      <LastListings data={lastListings} />
    </main>
  );
};

export default HomePageContainer;
