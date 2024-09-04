import devConfig from "@/config/config.dev";
import prodConfig from "@/config/config.prod";
import { ChainsConfig } from "@/types/chain";

const config: ChainsConfig = process.env.NEXT_PUBLIC_CONFIG_MODE === "dev" ? devConfig : prodConfig;

export default config;
