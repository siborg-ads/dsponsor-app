'use client';
import React, { useState, useEffect, useMemo } from 'react';
import {useAddress, useChainId} from "@thirdweb-dev/react";
import ChainContext from "../../contexts/ChainContext";

const ChainProvider = ({ children }) => {
    const chainId = useChainId();
    const connectedAddress = useAddress();

    const [currentChainId, setCurrentChainId] = useState(null);
    const [currentChainName, setCurrentChainName] = useState(null);

    useEffect(() => {
        setCurrentChainId(chainId);
        setCurrentChainName(getChainName(chainId));
    }, [chainId]);

    const getChainName = (chainId) => {
        const id = parseInt(chainId);
        switch (id) {
            case 11155111:
                return 'Ethereum Sepolia';
            case 42161:
                return 'Arbitrum One';
            case 421614:
                return 'Arbitrum Sepolia';
            case 80001:
                return 'Polygon Mumbai';
            case 137:
                return 'Polygon';
            case 1:
                return 'Ethereum Mainnet';
            default:
                return 'Unknown:'+chainId;
        }
    }

    const value = useMemo(() => {
        return {
            chainId: currentChainId,
            connectedAddress: connectedAddress,
            chainName: currentChainName,
        };
    });

    return (
        <ChainContext.Provider value={value}>
            {children}
        </ChainContext.Provider>
    );
};

export default ChainProvider;
