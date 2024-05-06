'use client'
import { createContext } from 'react';

const SDKContext = createContext({
    sdk: null,
    admin: null,
    SDKChainId: null,
    address: null,
    setSDKChainId: () => {},
    setSDK: () => {},
    getChainName: () => {},
    setAdmin: () => {},
});
export default SDKContext;
