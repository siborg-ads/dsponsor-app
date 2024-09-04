import devEthereumSepolia from "@/config/development/ethereum-sepolia";
import prodBase from "@/config/production/base";
import { ChainsConfig } from "@/types/chain";

const config: ChainsConfig = {
  11155111: devEthereumSepolia,
  8453: prodBase
};

export default config;
