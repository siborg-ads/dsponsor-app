// src/types/ChainObject.ts
// import { Base } from "@thirdweb-dev/chains";
import { NetworkType } from "@/utils/networks/networks";

export interface ChainObject {
  chainId: number;
  chainName: string;
  gaslessBalanceThreshold: string;
  network: NetworkType;
  chainObject: any;
  logoURL: string;
  explorerBaseURL: string;
  relayerURL: string;
  rpcURL: string;
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
      abi: any;
    };
    DSPONSORMP: {
      address: string;
    };
    UNISWAP_QUOTER: {
      address: string;
    };
  };
  features: {
    openZeppelinDefender: {
      relayerURL: string;
    };
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
