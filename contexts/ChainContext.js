import { createContext } from "react";

const ChainContext = createContext({
  currentChainObject: null,
  connectedAddress: null,
});

export default ChainContext;
