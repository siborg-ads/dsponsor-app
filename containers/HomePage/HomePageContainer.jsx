import React from "react";
import { useEffect, useState } from "react";
import { useAddress, darkTheme, Web3Button, useTokenBalance, useContract, useContractRead, useContractWrite, useStorageUpload, useTokenDecimals, CheckoutWithCard, CheckoutWithEth } from "@thirdweb-dev/react";

import { Hero, Bids, Top_collection } from "../../components/component";
import Meta from "../../components/Meta";

import HowItWorks from "../../components/explication/howItWorks";

import fetchLastOffers from "../../providers/methods/fetchLastOffers";
import { useChainContext } from "../../contexts/hooks/useChainContext";


const HomePageContainer = () => {
  const [data, setData] = useState([]);
  const { chainId } = useChainContext();


  useEffect(() => {
    if (!chainId) return;
    const fetchAdsOffers = async () => {
      const lastOffers = await fetchLastOffers(chainId);
  
      const mappedData = [];
      for (const element of lastOffers) {
        let tokenIdAllowedToMint = false;
        
        for (const allowtoken of element.nftContract.tokens) {
          if (allowtoken.mint === null) {
            tokenIdAllowedToMint = allowtoken.tokenId;
            break;
          }
        }

        const combinedData = {
          ...element,
          tokenIdAllowedToMint: tokenIdAllowedToMint,
   
        };

        if (!tokenIdAllowedToMint && element.nftContract.allowList === true) continue;

        mappedData.push(combinedData);
      }
      console.log(mappedData);
      
      setData(mappedData);
    };
    fetchAdsOffers();
  }, [chainId]);
  return (
    <main>
      <Meta title="Home 1" />
      <Hero />
      <HowItWorks />
      <Bids data={data} />
    </main>
  );
};

export default HomePageContainer;
