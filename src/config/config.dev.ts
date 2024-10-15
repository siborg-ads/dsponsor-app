import sepoliaConfig from "@/config/chains/ethereum-sepolia";
import modeConfig from "@/config/chains/mode";
import baseConfig from "@/config/chains/base";
import { abstractTestnetConfig } from "./chains/abstract-testnet";

import { abstractTestnet, base, sepolia } from "thirdweb/chains";
import { mode } from "@/config/chains/mode";

import { ChainsConfig } from "@/types/chain";

const config: ChainsConfig = {
  11124: abstractTestnetConfig,
  11155111: sepoliaConfig,
  8453: baseConfig,
  34443: modeConfig
};

export const devChains = [base, sepolia, abstractTestnet, mode];

export default config;
