
import { Network } from "alchemy-sdk";
import contractABI from "../../abi/dsponsorAdmin.json";

const config = {
  // sepolia
  11155111: {
    chainId: 11155111,
    chainName: "sepolia",
    network: Network.ETH_SEPOLIA,
    explorerBaseUrl: "https://sepolia.etherscan.io/address/",
    appURL: "https://app.staging.dsponsor.com",
    assetsURL: "https://relayer.dsponsor.com",
    creditsURL: "https://dsponsor.com",
    rpcURL: "https://ethereum-sepolia-rpc.publicnode.com",
    smartContracts: {
      NATIVE: {
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
        symbol: "ETH",
      },
      WNATIVE: {
        address: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
      },
      USDC: {
        address: "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8",
      },
      WETH: {
        address: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
      },
      UNISWAP_QUOTER: {
        address: "0xEd1f6473345F45b75F8179591dd5bA1888cf2FB3",
      },
      DSPONSORADMIN: {
        address: "0xE442802706F3603d58F34418Eac50C78C7B4E8b3",
        abi: contractABI,
      },
      DSPONSORMP: {
        address: "0xac03b675fa9644279b92f060bf542eed54f75599",
      },
    },
  },
};

export default config;
