import { Address } from "thirdweb";

export interface ChainsConfig {
  [key: number]: ChainObject;
}

export interface ChainObject {
  chainId: number;
  chainName: string;
  gaslessBalanceThreshold?: string;
  network: string;
  chainObject: any;
  logoURL: string;
  explorerBaseURL: string;
  relayerURL: string;
  rpcURL: string;
  forwarder: Address;
  smartContracts: {
    currencies: {
      NATIVE: {
        address: Address;
        decimals: number;
        symbol: string;
      };
      [key: string]: {
        address: Address;
        decimals: number;
        symbol: string;
      };
    };
    DSPONSORADMIN: {
      address: Address;
      abi: any;
    };
    DSPONSORMP: {
      address: Address;
    };
    UNISWAP_QUOTER: {
      address: Address;
    };
  };
  features: {
    openZeppelinDefender: {
      relayerURL?: string;
    };
    crossmint: {
      enabled: boolean;
      config?: {
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
