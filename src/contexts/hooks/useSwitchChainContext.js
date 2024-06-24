import { useContext } from "react";
import SwitchChainContext from "../SwitchChainContext";

export function useSwitchChainContext() {
  const context = useContext(SwitchChainContext);
  if (context === undefined) {
    throw new Error("useSwitchChainContext must be used within a SwitchChainProvider");
  }
  return context;
}
