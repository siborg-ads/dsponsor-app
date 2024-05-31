import { createContext } from "react";

const SwitchChainProvider = createContext({
  selectedChain: "sepolia",
  setSelectedChain: (chain) => {},
});

export default SwitchChainProvider;
