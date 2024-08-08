import { createContext } from "react";
import config from "@/config/config";

const SwitchChainContext = createContext({
  selectedChain: parseFloat(Object.keys(config)[0]) as number | null,
  setSelectedChain: () => {}
});

export default SwitchChainContext;
