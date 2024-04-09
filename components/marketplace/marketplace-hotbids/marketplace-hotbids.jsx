"use client";

import React from "react";
import { useEffect, useState } from "react";
import Web3 from "web3";
import MarketplaceItemCard from "../marketplace-item-card/marketplace-item-card";

const MarketplaceHotbids = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [contractData, setContractData] = useState(null);

  useEffect(() => {
    async function connectToBlockchain() {
      // Connect to Ethereum blockchain
      const provider = new Web3.providers.HttpProvider("infura_minnet_url");
      const web3Instance = new Web3(provider);
      setWeb3(web3Instance);

      const contractABI = [];
      const contractAddress = "";

      // initiallizing the contract here
      const contractInstance = new web3Instance.eth.Contract(
        contractABI,
        contractAddress
      );
      setContract(contractInstance);

      // Fetch contract data
      const data = await fetchData(contractInstance);
      setContractData(data);
    }

    connectToBlockchain();
  }, []);

  const fetchData = async (contract) => {
    try {
      const totalListings = await contract.methods.totalListings().call();
      return { totalListings };
    } catch (error) {
      console.error("Error fetching contract data:", error);
      return null;
    }
  };
  return (
    <div className="container pt-28">
      <h1 className="font-display tracking-wide mb-6	 text-center text-2xl font-medium text-jacarta-700 dark:text-white">
        Hot Bids
      </h1>
      <div className={"grid grid-cols-4 gap-8"}>
        <MarketplaceItemCard />
        <MarketplaceItemCard />
        <MarketplaceItemCard />
        <MarketplaceItemCard />
      </div>
    </div>
  );
};

export default MarketplaceHotbids;
