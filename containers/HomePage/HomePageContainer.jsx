import React from "react";
import { useEffect, useState } from "react";
import { useAddress, darkTheme, Web3Button, useTokenBalance, useContract, useContractRead, useContractWrite, useStorageUpload, useTokenDecimals, CheckoutWithCard, CheckoutWithEth } from "@thirdweb-dev/react";

import { Hero, LastOffers, Top_collection, LastListings } from "../../components/component";
import Meta from "../../components/Meta";

import HowItWorks from "../../components/explication/howItWorks";

import fetchLastOffers from "../../providers/methods/fetchLastOffers";
import { fetchAllListedToken } from "../../providers/methods/fetchAllListedToken";
import { useChainContext } from "../../contexts/hooks/useChainContext";


const HomePageContainer = () => {
  const [data, setData] = useState([]);
   const [filterTypes, setFilterTypes] = useState([]);

  const { currentChainObject } = useChainContext();

  const chainId = currentChainObject?.chainId;


  useEffect(() => {
    if (!chainId) return;
    const fetchAdsOffers = async () => {
      const lastOffers = await fetchLastOffers(chainId);
       
      const mappedData = [];
      for (const element of lastOffers) {
        let tokenIdAllowedToMint = false;
        const sortByTokenId = element.nftContract.tokens.sort((a, b) => a.tokenId - b.tokenId);
        for (const allowtoken of sortByTokenId) {
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
      const listedToken = await fetchAllListedToken(chainId);

        const mappedListedToken = [];
        for (const element of listedToken) {
          for (const token of element?.nftContract?.tokens) {
            const combinedData = {
              ...token,
              offerId: element?.id,
            };
            mappedListedToken.push(combinedData);
          }
        }
        const sortByDate = mappedListedToken.sort((a, b) => b.marketplaceListings[0]?.startTime - a.marketplaceListings[0]?.startTime);
        console.log(mappedListedToken, "listedToken");
       setFilterTypes(sortByDate);
      
      setData(mappedData);
    };
    fetchAdsOffers();
  }, [chainId]);
  const metadata = {
    title: `Home || DSponsor | smarter monetization for your content`,
    keyword: "Home",
    desc: "Home",
  };
  
  return (
    <main>
      <Meta {...metadata} />
      <Hero />
      <HowItWorks />
      <LastOffers data={data} />
      <LastListings data={filterTypes} />
    </main>
  );
};

export default HomePageContainer;
