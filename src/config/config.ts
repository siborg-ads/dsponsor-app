import devConfig from "@/config/config.dev";
import prodConfig from "@/config/config.prod";
import { ChainsConfig } from "@/types/chain";

const config: ChainsConfig = process.env.NEXT_PUBLIC_CONFIG_MODE === "dev" ? devConfig : prodConfig;

/**
 * Maximum size of files that can be uploaded in bytes
 */
export const MAX_SIZE_FILE = 300_000;

export default config;
