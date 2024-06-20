import Network from "../../providers/utils/networks";

const devBaseSepolia = {
  chainId: 84532,
  chainName: "base-sepolia",
  chainNameProvider: "base-sepolia-testnet",
  network: Network.BASE_SEPOLIA,
  logoURL: "/images/base-logo.png",
  explorerBaseURL: "https://sepolia.basescan.org",
  relayerURL: process.env.DEV ? process.env.DEV : "https://relayer.dsponsor.com",
  rpcURL: "https://sepolia.base.org",
  subgraphURL: "https://api.studio.thegraph.com/proxy/65744/dsponsor-base-sepolia/version/latest",
  smartContracts: {
    DSPONSORADMIN: {
      address: "0x5cF7F046818E5Dd71bd3E004f2040E0e3C59467D",
      feeBps: "400"
    },
    DSPONSORMP: {
      address: "0xdf42633BD40e8f46942e44a80F3A58d0Ec971f09",
      feeBps: "400",
      minimalBidBps: "1000",
      previousBidAmountBps: "500"
    },
    NATIVE: {
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      symbol: "ETH"
    },
    WNATIVE: {
      address: "0x4200000000000000000000000000000000000006",
      decimals: 18
    },
    USDC: {
      address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
      decimals: 6
    },
    WETH: {
      address: "0x4200000000000000000000000000000000000006",
      decimals: 18
    },
    UNISWAP_QUOTER: {
      address: "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6" // "0xC5290058841028F1614F3A6F0F5816cAd0df5E27"
    }
  },

  features: {
    crossmint: {
      enabled: false
    }
  }
};

export default devBaseSepolia;
