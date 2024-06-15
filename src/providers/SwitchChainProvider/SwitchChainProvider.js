import React, { useMemo, useState } from "react";
import SwitchChainContext from "../../contexts/SwitchChainContext";

const SwitchChainProvider = ({ children }) => {
  const [selectedChain, setSelectedChain] = useState("sepolia");

  const contextValue = useMemo(() => {
    return {
      selectedChain,
      setSelectedChain
    };
  }, [selectedChain, setSelectedChain]);

  return <SwitchChainContext.Provider value={contextValue}>{children}</SwitchChainContext.Provider>;
};

export default SwitchChainProvider;
