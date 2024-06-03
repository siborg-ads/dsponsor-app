import React, { useState } from "react";
import SwitchChainContext from "../../contexts/SwitchChainContext";

const SwitchChainProvider = ({ children }) => {
  const [selectedChain, setSelectedChain] = useState("sepolia");

  const value = {
    selectedChain,
    setSelectedChain,
  };

  return <SwitchChainContext.Provider value={value}>{children}</SwitchChainContext.Provider>;
};

export default SwitchChainProvider;
