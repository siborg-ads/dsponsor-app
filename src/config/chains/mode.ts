import contractABI from "@/abi/dsponsorAdmin.json";
import { ChainObject } from "@/types/chain";
import { defineChain } from "thirdweb";

export const mode = defineChain({
  id: 34443,
  name: "Mode",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  blockExplorers: [
    {
      name: "Modescout",
      url: "https://sepolia.explorer.mode.network/"
    }
  ],
  testnet: true
});

const modeConfig: ChainObject = {
  chainId: 34443,
  chainName: "mode",
  // gaslessBalanceThreshold: "1000000000000000", // 0.001 ETH
  network: "mode",
  chainObject: mode,
  logoURL: "/images/chains/mode-logo.png",
  explorerBaseURL: "https://explorer.mode.network",
  relayerURL: process.env.NEXT_PUBLIC_RELAYER_URL
    ? process.env.NEXT_PUBLIC_RELAYER_URL
    : "https://relayer.dsponsor.com",
  rpcURL: "https://mainnet.mode.network",
  forwarder: "0xD04F98C88cE1054c90022EE34d566B9237a1203C",
  smartContracts: {
    currencies: {
      NATIVE: {
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
        symbol: "ETH"
      },
      MODE: {
        address: "0xDfc7C877a950e49D2610114102175A06C2e3167a",
        decimals: 18,
        symbol: "MODE"
      },
      USDC: {
        address: "0xd988097fb8612cc24eeC14542bC03424c656005f",
        decimals: 6,
        symbol: "USDC"
      },
      WETH: {
        address: "0x4200000000000000000000000000000000000006",
        decimals: 18,
        symbol: "WETH"
      }
    },
    UNISWAP_QUOTER: {
      address: "0x5E6AEbab1AD525f5336Bd12E6847b851531F72ba"
    },
    DSPONSORADMIN: {
      address: "0xdf42633BD40e8f46942e44a80F3A58d0Ec971f09",
      abi: contractABI
    },
    DSPONSORMP: {
      address: "0xC6cCe35375883872826DdF3C30557F16Ec4DD94c"
    }
  },
  features: {
    openZeppelinDefender: {},
    crossmint: {
      enabled: false
    }
  }
};

export default modeConfig;
