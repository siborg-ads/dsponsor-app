import baseConfig from "@/config/chains/base";
import { ChainsConfig } from "@/types/chain";
import { base } from "thirdweb/chains";

const config: ChainsConfig = {
  8453: baseConfig
};

export const prodChains = [base];

export default config;
