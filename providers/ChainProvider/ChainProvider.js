'use client';
import React, { useState, useEffect, useMemo } from 'react';
import {useAddress, useChainId} from "@thirdweb-dev/react";
import ChainContext from "../../contexts/ChainContext";

const ChainProvider = ({ children }) => {
    const chainId = useChainId();
    const connectedAddress = useAddress();

    const [currentChainId, setCurrentChainId] = useState(11155111);
    const [currentChainName, setCurrentChainName] = useState('sepolia');

    useEffect(() => {
        setCurrentChainId(chainId);
        setCurrentChainName(getChainName(chainId));
    }, [chainId]);

    const getChainName = (chainId) => {
        const id = parseInt(chainId);
        switch (id) {
            case 11155111:
                return 'sepolia';
            case 42161:
                return 'arbitrum-one';
            case 421614:
                return 'arbitrum-sepolia';
            case 80001:
                return 'polygon-mumbai';
            case 137:
                return 'polygon';
            case 1:
                return 'ethereum';
            default:
                console.warn(`Unknown chainId: ${chainId} - Using default chainId: 11155111`);
                return getChainName(11155111);
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
