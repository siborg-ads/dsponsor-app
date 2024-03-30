import React from "react";
import { useEffect, useState } from "react";
import { DSponsorAdmin } from "@dsponsor/sdk";
import { useAddress, darkTheme, Web3Button, useTokenBalance, useContract, useContractRead, useContractWrite, useStorageUpload, useTokenDecimals, CheckoutWithCard, CheckoutWithEth } from "@thirdweb-dev/react";
import { fetchDataFromIPFS } from "../../data/services/ipfsService";
import { Hero, Bids, Top_collection } from "../../components/component";
import Meta from "../../components/Meta";

const Home_1 = () => {
  const [data, setData] = useState([]);
  const [offerNFTContract, setOfferNFTContract] = useState(null);
  // const { data: isAllowedToMint } = useContractRead(DsponsorNFTContract, "tokenIdIsAllowedToMint", tokenIdString);
  const { contract: DsponsorNFTContract } = useContract(offerNFTContract);
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
      setData(data);
    };
    fetchAdsOffers();
  }, []);
  return (
    <main>
      <Meta title="Home 1" />
      <Hero />
      <Bids data={data} />
    </main>
  );
};

export default Home_1;
