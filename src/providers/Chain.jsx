"use client";
import React, { useState, useEffect } from "react";
import { useAddress, useChainId } from "@thirdweb-dev/react";
import ChainContext from "@/contexts/ChainContext";
import config from "../config/config";

const ChainProvider = ({ children }) => {
  const chainId = useChainId();
  const connectedAddress = useAddress();
  const [currentChainObject, setCurrentChainObject] = useState({});

  useEffect(() => {
    if (config[chainId]) {
      setCurrentChainObject(config[chainId]);
    } else {
      const [firstChainId, firstChainConfig] = Object.entries(config)[0];
      console.warn(`Unknown chainId: ${chainId} - Using default chainId: ${firstChainId}`);
      setCurrentChainObject(firstChainConfig);
    }
  }, [chainId]);

  const value = {
    currentChainObject,
    connectedAddress
  };

  return <ChainContext.Provider value={value}>{children}</ChainContext.Provider>;
};

export default ChainProvider;
