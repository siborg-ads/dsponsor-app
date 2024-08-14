import Network from "@/utils/networks/networks";
import contractABI from "@/abi/dsponsorAdmin.json";
import { Base } from "@thirdweb-dev/chains";

const prodBase = {
  chainId: 8453,
  chainName: "base",
  gaslessBalanceThreshold: 1000000000000000, // 0.001 ETH
  chainNameProvider: "base",
  chainObject: Base,
  network: Network.BASE_MAINNET,
  logoURL: "/images/chains/base-logo.png",
  explorerBaseURL: "https://basescan.org",

  rpcURL: "https://mainnet.base.org",
  smartContracts: {
    NATIVE: {
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      symbol: "ETH"
    },
    WNATIVE: {
      address: "0x4200000000000000000000000000000000000006",
      decimals: 18,
      symbol: "WETH"
    },
    USDC: {
      address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      decimals: 6,
      symbol: "USDC"
    },
    WETH: {
      address: "0x4200000000000000000000000000000000000006",
      decimals: 18,
      symbol: "WETH"
    },
    UNISWAP_QUOTER: {
      address: "0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a"
    },
    DSPONSORADMIN: {
      address: "0xC6cCe35375883872826DdF3C30557F16Ec4DD94c",
      abi: contractABI
    },
    DSPONSORMP: {
      address: "0x86aDf604B5B72d270654F3A0798cabeBC677C7fc"
    }
  },
  features: {
    openZeppelinDefender: {
      relayerURL:
        "https://api.defender.openzeppelin.com/actions/803b194c-5e89-4020-b4fa-e3934128f3ef/runs/webhook/59ce7c60-9e0b-4c87-8910-a8b13e6f725e/47dJ2PR4Ffh6nhbHYUroA5"
    },
    crossmint: {
      enabled: false,

      config: {
        projectId: "0572f9c1-13fb-4001-8b0d-48d1d4952bc4",
        priceLimit: 0.25,

        bidCollectionId: "5740ec5a-a90b-4a13-ae7d-462d89abc863",
        buyCollectionId: "41dc44d6-3986-4969-a695-5da578d7edb1",
        mintCollectionId: "41dea13e-ad06-4d5f-adae-822389689e2c",

        environment: "production",

        currency: "EUR",
        locale: "en-EN",
        paymentMethod: "fiat"
      }
    }
  }
};

export default prodBase;
