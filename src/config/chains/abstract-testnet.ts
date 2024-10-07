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
        address: "0x80392dF95f8ed7F2f6299Be35A1007f31D5Fc5b6",
        decimals: 18,
        symbol: "WETH"
      },
      NATIVE: {
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
        symbol: "ETH"
      },
      USDC: {
        address: "0xa70e901a190c5605a5137a1019c6514F5a626517",
        decimals: 18,
        symbol: "USDC"
      }
    },
    UNISWAP_QUOTER: {
      address: "0x0000000000000000000000000000000000000000"
    },
    DSPONSORADMIN: {
      address: "0xA3B2469A2a4422058F70C59Fcd63EdaA219A2571",
      abi: contractABI
    },
    DSPONSORMP: {
      address: "0x747aCdC82A90cca57587F20Ee1041088F53c3b15"
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
