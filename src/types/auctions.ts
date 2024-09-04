import { BigNumber } from "ethers";

export interface Auction {
  name: string;
  category: string;
  disable: boolean;
  chain: string;
  chainId: number;
  price: number;
  currencySymbol: string;
  link: string;
  live: boolean;
  image: string;
  latestBid: number;
  currencyDecimals: number;
  startTime: number;
  endTime: number;
  nowTime: number;
  offerId: string;
  tokenId: string;
  tokenData: any;
  directPrice: number;
  auctionPrice: number;
  mintPrice: number;
  listingType: string;
  status: string;
  quantity: number;
  usdcPriceBN: {
    USDCPrice: BigNumber;
    decimals: number;
  };
  sold: boolean;
  numberOfBids: number;
  item: {
    disable: boolean;
    usdcPriceBN: {
      USDCPrice: BigNumber;
      decimals: number;
    };
    metadata: any;
    mint: any;
    nftContract: any;
    marketplaceListings: any[];
    chainConfig: any;
    offerId: string;
    tokenId: string;
    tokenData: any;
    startTime: number;
    endTime: number;
    currencyDecimals: number;
  };
}

export type Auctions = Auction[];
