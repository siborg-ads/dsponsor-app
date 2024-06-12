import { useContext } from "react";
import ChainContext from "../ChainContext";

export function useChainContext() {
  const context = useContext(ChainContext);
  if (context === undefined) {
    throw new Error("useClient must be used within a ScintillaClientProvider");
  }
  return context;
}
