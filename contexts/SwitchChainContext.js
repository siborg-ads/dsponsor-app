import { createContext } from "react";

const SwitchChainContext = createContext({
  selectedChain: "sepolia",
  setSelectedChain: () => {},
});

export default SwitchChainContext;
