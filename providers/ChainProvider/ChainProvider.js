"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useAddress, useChainId } from "@thirdweb-dev/react";
import ChainContext from "../../contexts/ChainContext";
import  config  from "../utils/config";

const ChainProvider = ({ children }) => {
  const chainId = useChainId();
  const connectedAddress = useAddress();
  const [currentChainObject, setCurrentChainObject] = useState({});


  
  useEffect(() => {
    
    if (config[chainId]) {
      setCurrentChainObject(config[chainId]);
    } else {
      console.warn(`Unknown chainId: ${chainId} - Using default chainId: 11155111`);
      setCurrentChainObject(config[11155111]);
    }
  }, [chainId]);
const value = {
  currentChainObject,
  connectedAddress,

};


  return <ChainContext.Provider value={value}>{children}</ChainContext.Provider>;
};

export default ChainProvider;
