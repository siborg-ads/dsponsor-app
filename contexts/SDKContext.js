'use client'
import { createContext } from 'react';

const SDKContext = createContext({
    sdk: null,
    admin: null,
    setSDK: () => {},
    setAdmin: () => {},
});
export default SDKContext;
