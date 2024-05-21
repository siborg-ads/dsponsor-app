import React, {useMemo, useState} from "react";
import ApplicationContext from "../../contexts/ApplicationContext";

const ApplicationProvider = ({ children }) => {
    const [isBidModalOpen, setIsBidModalOpen] = useState(false);

    const value = useMemo(() => {
        return {
            isBidModalOpen: isBidModalOpen,
            setIsBidModalOpen: setIsBidModalOpen
        };
    });

    return (
        <ApplicationContext.Provider value={value}>
            {children}
        </ApplicationContext.Provider>
    );
};

export default ApplicationProvider;
