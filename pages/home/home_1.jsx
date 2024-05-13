import React from "react";
import { useEffect, useState } from "react";
import { useAddress, darkTheme, Web3Button, useTokenBalance, useContract, useContractRead, useContractWrite, useStorageUpload, useTokenDecimals, CheckoutWithCard, CheckoutWithEth } from "@thirdweb-dev/react";
import { fetchDataFromIPFS } from "../../data/services/ipfsService";
import { Hero, Bids, Top_collection } from "../../components/component";
import Meta from "../../components/Meta";
import { getContractNFT } from "../../data/services/contract";
import { readContract } from "thirdweb";
import HowItWorks from "../../components/explication/howItWorks";
import adminInstance from "../../utils/sdkProvider";
import {GetAllAdOffers} from "../../data/services/AdOffersService";


const Home_1 = () => {
  const [data, setData] = useState([]);
 
  useEffect(() => {
    

    const fetchAdsOffers = async () => {
     const data =  await GetAllAdOffers();
    

       const mappedData = [];
        for (const element of data) {
        let tokenIdAllowedToMint = false;
         const destructuredIPFSResult = await fetchDataFromIPFS(element.metadataURL);
         for (const allowtoken of element.nftContract.tokens) {
            if (allowtoken.mint === null) {
              tokenIdAllowedToMint = allowtoken.tokenId;
              break;
            }
         }
        
         const combinedData = {
           ...element,
          tokenIdAllowedToMint : tokenIdAllowedToMint,
           ...destructuredIPFSResult,
         };
         
         if (!tokenIdAllowedToMint && element.nftContract.allowList === true) continue;
        
        mappedData.push(combinedData);
         
        }
        console.log(mappedData);
    //   const ads = await adminInstance.getOffers(
    //     {limit: 30},
    //     { includeMetadata: true, includePrices: true, includeAllowedTokens: true }
    //   );
      


    
      
    //   for (const element of ads) {
    //     if (!element.nftContract) return;
    //     const contract = await getContractNFT(element.nftContract);
 
    //  for (let i = 0; i < element.allowedTokens?.length; i++) {
    //    const isTokenAllowed = await readContract({
    //      contract: contract,
    //      method: "tokenIdIsAllowedToMint",
    //      params: [i],
    //    });
      
       
    //    if (isTokenAllowed) {
    //      mappedData.push({
    //        ...element,
    //        tokenIdAllowedToMint: i,
    //      });
    //      break;
    //    }
    //  }
 
    //   }
    //    console.log(mappedData);
      setData(mappedData);
    };
    console.log("data", data);
    fetchAdsOffers();
  }, []);
  return (
    <main>
      <Meta title="Home 1" />
      <Hero />
      <HowItWorks />
      <Bids data={data} />
    </main>
  );
};

export default Home_1;
