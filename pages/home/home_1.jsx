import React from "react";
import { useEffect, useState } from "react";
import { DSponsorAdmin } from "@dsponsor/sdk";
import { useAddress, darkTheme, Web3Button, useTokenBalance, useContract, useContractRead, useContractWrite, useStorageUpload, useTokenDecimals, CheckoutWithCard, CheckoutWithEth } from "@thirdweb-dev/react";
import { fetchDataFromIPFS } from "../../data/services/ipfsService";
import { Hero, Bids, Top_collection } from "../../components/component";
import Meta from "../../components/Meta";
import { getContractNFT } from "../../data/services/contract";
import { readContract } from "thirdweb";
import HowItWorks from "../../components/explication/howItWorks";

const Home_1 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const admin = new DSponsorAdmin({ chain: { alchemyAPIKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY, chainName:"ethereum-sepolia" } });

    const fetchAdsOffers = async () => {
      const mappedData = [];

      const ads = await admin.getOffers(
        {
          limit: 20,
        },
        { includeMetadata: true, includePrices: true, includeAllowedTokens: true }
      );
      
const formatedAds = ads.filter(ad => ad.offerId > 11);
console.log(formatedAds);
      
      for (const element of formatedAds) {
        if (!element.nftContract) return;
        const contract = await getContractNFT(element.nftContract);
        for (let i = 0; i < element.allowedTokens?.length; i++) {
          const isTokenAllowed = await readContract({
            contract: contract,
            method: "tokenIdIsAllowedToMint",
            params: [i],
          });
          const destructuredIPFSResult = await fetchDataFromIPFS(element.offerMetadata);

          if (isTokenAllowed) {
            mappedData.push({
              ...element,
              tokenIdAllowedToMint: i,
            });
            break;
          }
        }
      }
      console.log(mappedData);
      setData(mappedData);
    };
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
