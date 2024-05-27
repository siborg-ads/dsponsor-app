'use client'
import { createContext } from 'react';

const ChainContext = createContext({
    chainId: null,
    connectedAddress: null,
    chainName: null,
});
export default ChainContext;
