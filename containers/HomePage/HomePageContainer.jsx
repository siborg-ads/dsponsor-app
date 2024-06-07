import React from "react";
import { useEffect, useState } from "react";
import {
  useAddress,
  darkTheme,
  Web3Button,
  useTokenBalance,
  useContract,
  useContractRead,
  useContractWrite,
  useStorageUpload,
  useTokenDecimals,
  CheckoutWithCard,
  CheckoutWithEth
} from "@thirdweb-dev/react";

import { Hero, LastOffers, Top_collection, LastListings } from "../../components/component";
import Meta from "../../components/Meta";

import HowItWorks from "../../components/explication/howItWorks";

import fetchLastOffers from "../../providers/methods/fetchLastOffers";
import { fetchAllListedToken } from "../../providers/methods/fetchAllListedToken";
import { useChainContext } from "../../contexts/hooks/useChainContext";
import config from "../../providers/utils/config";

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

      //console.log(lastOffersArray, "lastOffers");

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
    title: `Home || DSponsor | smarter monetization for your content`,
    keyword: "Home",
    desc: "Home"
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
