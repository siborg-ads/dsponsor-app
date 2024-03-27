import React from "react";
import { useEffect, useState } from "react";
import { DSponsorAdmin } from "@dsponsor/sdk";
import { fetchDataFromIPFS } from "../../data/services/ipfsService";
import { Hero, Bids, Top_collection } from "../../components/component";
import Meta from "../../components/Meta";

const Home_1 = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const admin = new DSponsorAdmin();

    const fetchAdsOffers = async () => {
      const mappedData = [];
      const ads = await admin.getOffers();
      for (const element of ads) {
        const IPFSLink = element.rulesURI;
        const destructuredIPFSResult = await fetchDataFromIPFS(IPFSLink);
        const combinedData = {
          ...element,
          ...destructuredIPFSResult,
        };
        mappedData.push(combinedData);

        console.log(combinedData, "sdk");
      }
      setData(mappedData);
    };

    fetchAdsOffers();
  }, []);
  return (
    <main>
      <Meta title="Home 1" />
      <Hero />
      <Bids data={data} />
      <Top_collection />
    </main>
  );
};

export default Home_1;
