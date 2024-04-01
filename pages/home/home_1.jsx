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
    const admin = new DSponsorAdmin();

    const fetchAdsOffers = async () => {
      const mappedData = [];

      const ads = await admin.getOffers(
        {
          limit: 10,
        },
        { includeMetadata: true, includePrices: true, includeAllowedTokens: true }
      );

      const data = ads.filter((item) => Number(item.offerId) !== 1);
      for (const element of data) {
        const contract = await getContractNFT(element.nftContract);
        for (let i = 0; i < element.allowedTokens.length; i++) {
          const isTokenAllowed = await readContract({
            contract: contract,
            method: "tokenIdIsAllowedToMint",
            params: [i],
          });
          if (isTokenAllowed) {
            mappedData.push({
              ...element,
              tokenIdAllowedToMint: i,
            });
            break;
          }
        }
      }

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
