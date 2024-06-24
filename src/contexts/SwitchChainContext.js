import { createContext } from "react";
import config from "../config/config";

const SwitchChainContext = createContext({
  selectedChain: Object.entries(config)[0].network,
  setSelectedChain: () => {}
});

export default SwitchChainContext;
