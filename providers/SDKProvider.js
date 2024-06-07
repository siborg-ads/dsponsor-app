"use client";
import React, { useState, useEffect, useMemo } from "react";
import SDKContext from "../contexts/SDKContext";
import { DSponsorSDK } from "@dsponsor/sdk";
import { useChainId } from "@thirdweb-dev/react";

const SDKProvider = ({ children }) => {
  const [sdk, setSDK] = useState(null);
  const [admin, setAdmin] = useState(null);

  const [SDKChainId, setSDKChainId] = useState(null);

  const chainId = useChainId();

  useEffect(() => {
    setSDKChainId(chainId);
  }, [chainId]);

  useEffect(() => {
    const dsponsor = new DSponsorSDK({
      chain: {
        relayerApiUrl: "http://localhost:3000/api/11155111"
      }
    });
    const dsponsorAdmin = dsponsor.getDSponsorAdmin();
    setSDK(dsponsor);
    setAdmin(dsponsorAdmin);

    return () => {
      // Clean up the SDK
      // dsponsor.destroy();
    };
  }, []);

  const getChainName = (chainId) => {
    const id = parseInt(chainId);
    switch (id) {
      case 11155111:
        return "Ethereum Sepolia";
      case 42161:
        return "Arbitrum One";
      case 421614:
        return "Arbitrum Sepolia";
      case 80001:
        return "Polygon Mumbai";
      case 137:
        return "Polygon";
      case 1:
        return "Ethereum Mainnet";
      default:
        return "Unknown:" + chainId;
    }
  };

  const value = useMemo(() => ({ sdk, admin, SDKChainId, getChainName }), [sdk, admin, SDKChainId]);

  return <SDKContext.Provider value={value}>{children}</SDKContext.Provider>;
};

export default SDKProvider;
