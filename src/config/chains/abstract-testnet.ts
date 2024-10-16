import contractABI from "@/abi/dsponsorAdmin.json";
import { Chain } from "@thirdweb-dev/chains";
import { ChainObject } from "@/types/chain";

const AbstractTestnet = {
  chain: "ETH",
  chainId: 11124,
  explorers: [
    {
      name: "Abstract Testnet Explorer",
      url: "https://explorer.testnet.abs.xyz",
      standard: "none"
    }
  ],
  faucets: [],
  features: [],
  icon: {
    url: "ipfs://bafkreiflvmdwgymrxkmxaf2jkcbpx7spiyc6c2mr32jjs6bpg3il7okasq",
    width: 400,
    height: 400,
    format: "jpg"
  },
  infoURL: "https://abs.xyz",
  name: "Abstract Testnet",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  networkId: 11124,
  redFlags: [],
  rpc: ["https://api.testnet.abs.xyz"],
  shortName: "abstract-testnet",
  slug: "abstract-testnet",
  status: "active",
  testnet: true
} as const satisfies Chain;

const abstractTestnetConfig: ChainObject = {
  chainId: 11124,
  chainName: "abstract-testnet",
  gaslessBalanceThreshold: "0", // 0 ETH
  network: AbstractTestnet.slug,
  chainObject: AbstractTestnet,
  logoURL: "/images/chains/abstract-logo.jpg",
  explorerBaseURL: "https://explorer.testnet.abs.xyz",
  relayerURL: process.env.NEXT_PUBLIC_RELAYER_URL
    ? process.env.NEXT_PUBLIC_RELAYER_URL
    : "https://relayer.dsponsor.com",
  rpcURL: "https://api.testnet.abs.xyz",
  forwarder: "0x0000000000000000000000000000000000000000",
  smartContracts: {
    currencies: {
      WETH: {
        address: "0x740810c5CB6a562BC0F4F387dC7cFaDa9f3A7ebf",
        decimals: 18,
        symbol: "WETH"
      },
      NATIVE: {
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
        symbol: "ETH"
      },
      USDC: {
        address: "0xf374801d73f8093833aE5D38b49C97270C34AE10",
        decimals: 18,
        symbol: "USDC"
      }
    },
    UNISWAP_QUOTER: {
      address: "0x1FFBf27EBa96342A9755c4974b5F28286c41201A"
    },
    DSPONSORADMIN: {
      address: "0xBEA0a4E815e5A8b544712144DA3865a1aa69ECD9",
      abi: contractABI
    },
    DSPONSORMP: {
      address: "0x833721E8651682043CDFcD577Aa2DC5b3D28abC6"
    }
  },
  features: {
    openZeppelinDefender: {},
    crossmint: {
      enabled: false
    }
  }
};

export { abstractTestnetConfig, AbstractTestnet };
