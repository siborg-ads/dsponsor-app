// src/types/ChainObject.ts
import { Base } from "@thirdweb-dev/chains";
import { NetworkType } from "@/utils/networks/networks";

export interface ChainObject {
  chainId: number;
  chainName: string;
  network: NetworkType;
  chainObject: typeof Base;
  logoURL: string;
  explorerBaseURL: string;
  relayerURL: string;
  rpcURL: string;
  subgraphURL: string;
  smartContracts: {
    currencies: {
      [key: string]: {
        address: string;
        decimals: number;
        symbol: string;
      };
    };
    DSPONSORADMIN: {
      address: string;
      feeBps: string;
      abi: any;
    };
    DSPONSORMP: {
      address: string;
      feeBps: string;
      minimalBidBps: string;
      previousBidAmountBps: string;
    };
    UNISWAP_QUOTER: {
      address: string;
    };
  };
  features: {
    crossmint: {
      enabled: boolean;
      config: {
        projectId: string;
        priceLimit: number;
        bidCollectionId: string;
        buyCollectionId: string;
        mintCollectionId: string;
        environment: string;
        currency: string;
        locale: string;
        paymentMethod: string;
      };
    };
  };
}
