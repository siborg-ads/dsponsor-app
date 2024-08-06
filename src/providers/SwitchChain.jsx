import React, { useMemo, useState } from "react";
import SwitchChainContext from "../../contexts/SwitchChainContext";
import config from "../config/config";

const SwitchChainProvider = ({ children }) => {
  const [selectedChain, setSelectedChain] = useState(Object.entries(config)[0].network);

  const contextValue = useMemo(() => {
    return {
      selectedChain,
      setSelectedChain
    };
  }, [selectedChain, setSelectedChain]);

  return <SwitchChainContext.Provider value={contextValue}>{children}</SwitchChainContext.Provider>;
};

export default SwitchChainProvider;
