import sepoliaConfig from "@/config/chains/ethereum-sepolia";
// import modeConfig from "@/config/chains/mode";
import { ChainsConfig } from "@/types/chain";

const config: ChainsConfig = {
  11155111: sepoliaConfig
  // 34443: modeConfig
};

export default config;
