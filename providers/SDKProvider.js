'use client';
import React, { useState, useEffect, useMemo } from 'react';
import SDKContext from '../contexts/SDKContext';
import {DSponsorSDK} from '@dsponsor/sdk';

const SDKProvider = ({ children }) => {
    const [sdk, setSDK] = useState(null);
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const dsponsor = new DSponsorSDK({
            chain:{
                relayerApiUrl: 'http://localhost:3000/api/11155111',
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

    const value = useMemo(() => ({ sdk, admin }), [sdk, admin]);

    return (
        <SDKContext.Provider value={value}>
            {children}
        </SDKContext.Provider>
    );
};

export default SDKProvider;
