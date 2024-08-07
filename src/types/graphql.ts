import { Address } from "thirdweb";

export type NftContract = {};

export type AdOfferParameterLink = {
  id: string;
  enable: boolean;
  adOffer: AdOffer;
  adParameter: AdParameter;
};

export type AdOfferParameterLinks = AdOfferParameterLink[];

export type AdParameter = {
  id: string;
  base: string;
  variants: string[];
  adOffers: AdOfferParameterLink[];
  proposals: AdProposal[];
  currentProposals: CurrentProposal[];
};

export type AdParameters = AdParameter[];

export type AdProposal = {
  id: string;
  adOffer: AdOffer;
  token: Token;
  adParameter: AdParameter;
  status: AdProposalStatus;
  data: string;
  rejectReason?: string;
  creationTimestamp: BigInt;
  lastUpdateTimestamp: BigInt;
};

export type AdProposalStatus =
  | "CURRENT_ACCEPTED"
  | "CURRENT_PENDING"
  | "CURRENT_REJECTED"
  | "PREV_ACCEPTED"
  | "PREV_PENDING"
  | "PREV_REJECTED";

export type Mint = {
  id: string;
  contractAddress: Address;
  tokenId: BigInt;
  from: Address;
  to: Address;
  currency: Address;
  amount: BigInt;
  tokenData: string;
  blockNumber: BigInt;
  blockTimestamp: BigInt;
  transactionHash: Address;
  revenueTransaction: RevenueTransaction;
  token: Token;
  feeMethodology: FeeMethodology;
  amountSentToProtocol: BigInt;
  protocolRecipient: Address;
  totalPaid: BigInt;
};

export type RevenueTransaction = {
  id: Address;
  blockTimestamp: BigInt;
  protocolFees: CallWithProtocolFee[];
  marketplaceBids: MarketplaceBid[];
  marketplaceDirectBuys: MarketplaceDirectBuy[];
  marketplaceOffers: MarketplaceOffer[];
  mints: Mint[];
};

export type CallWithProtocolFee = {
  id: Address;
  target: Address;
  currency: Address;
  fee: BigInt;
  enabler: Address;
  spender: Address;
  referralAdditionalInformation: string;
  blockNumber: BigInt;
  blockTimestamp: BigInt;
  transactionHash: Address;
  revenueTransaction?: RevenueTransaction;
  referralAddresses: Address[];
  referralUnitShare?: number;
  referralNb?: number;
  epochCurrencyRevenue: EpochCurrencyRevenue;
};

export type EpochCurrencyRevenue = {
  id: string;
  year: number;
  month: number;
  currency: Address;
  totalAmount: BigInt;
  callsWithProtocolFee: CallWithProtocolFee[];
};

export type MarketplaceBid = {
  id: string;
  listing: MarketplaceListing;
  bidder: Address;
  quantity: BigInt;
  newPricePerToken: BigInt;
  totalBidAmount: BigInt;
  paidBidAmount: BigInt;
  refundBonus: BigInt;
  refundProfit: BigInt;
  currency: Address;
  status: Status;
  creationTxHash: Address;
  revenueTransaction?: RevenueTransaction;
  creationTimestamp: BigInt;
  lastUpdateTimestamp: BigInt;
  feeMethodologyN: FeeMethodology;
  amountSentToProtocol?: BigInt;
  protocolRecipient?: Address;
  amountSentToSeller?: BigInt;
  sellerRecipient?: Address;
  amountSentToCreator?: BigInt;
  creatorRecipient?: Address;
};

export type TokenPrice = {
  id: string;
  currency: Address;
  amount: BigInt;
  enabled: boolean;
  token: Token;
};

export type UpdateUser = {
  id: Address;
  tokenId: BigInt;
  user: Address;
  expires: BigInt;
  blockNumber: BigInt;
  blockTimestamp: BigInt;
  transactionHash: Address;
};

export type MarketplaceDirectBuy = {
  id: Address;
  listing: MarketplaceListing;
  buyer: Address;
  quantityBought: BigInt;
  totalPricePaid: BigInt;
  revenueTransaction: RevenueTransaction;
  feeMethodology?: FeeMethodology;
  amountSentToProtocol: BigInt;
  protocolRecipient: Address;
  amountSentToSeller: BigInt;
  sellerRecipient: Address;
  amountSentToCreator: BigInt;
  creatorRecipient: Address;
};

export type ListingType = "Direct" | "Auction";

export type TokenType = "ERC1155" | "ERC721" | "ERC20";

export type TransferType = "Rent" | "Sale";

export type Status = "UNSET" | "CREATED" | "COMPLETED" | "CANCELLED";

export type FeeParamsForContract = {
  id: Address;
  feeRecipient: Address;
  feeBps: BigInt;
  lastUpdateTimestamp: BigInt;
};

export type MarketplaceListing = {
  id: string;
  origin: Address;
  listingType: ListingType;
  lister: Address;
  token: Token;
  startTime: BigInt;
  endTime: BigInt;
  quantity: BigInt;
  currency: Address;
  reservePricePerToken: BigInt;
  buyoutPricePerToken: BigInt;
  tokenType: TokenType;
  transferType: TransferType;
  rentalExpirationTimestamp: BigInt;
  status: Status;
  creationTimestamp: BigInt;
  lastUpdateTimestamp: BigInt;
  completedBid: MarketplaceBid;
  bids: MarketplaceBid[];
  directBuys: MarketplaceDirectBuy[];
};

export type FeeMethodology = "ADDED_TO_AMOUNT" | "CUT_TO_AMOUNT";

export type MarketplaceOffer = {
  id: string;
  origin: Address;
  offeror: Address;
  token: Token;
  quantity: BigInt;
  currency: Address;
  totalprice: BigInt;
  tokenType: TokenType;
  transferType: TransferType;
  expirationTimestamp: BigInt;
  rentalExpirationTimestamp: BigInt;
  status: Status;
  revenueTransaction?: RevenueTransaction;
  referralAdditionalInformation?: string;
  creationTimestamp: BigInt;
  lastUpdateTimestamp?: BigInt;
  feeMethodology?: FeeMethodology;
  amountSentToProtocol?: BigInt;
  protocolRecipient?: Address;
  amountSentToSeller?: BigInt;
  sellerRecipient?: Address;
  amountSentToCreator?: BigInt;
  creatorRecipient: Address;
};

export type Token = {
  id: string;
  nftContract: NftContract;
  tokenId: BigInt;
  setInAllowList: boolean;
  mint: Mint;
};

export type CurrentProposal = {
  id: string;
  adOffer: AdOffer;
  token: Token;
  adParameter: AdParameter;
  pendingProposal: AdProposal;
  acceptedProposal: AdProposal;
  rejectedProposal: AdProposal;
};

export type AdOffer = {
  id: string;
  origin: Address;
  disable: boolean;
  name: string;
  metadataURL: string;
  nftContract: NftContract;
  initialCreator: Address;
  creationTimestamp: BigInt;
  admins: Address[];
  validators: Address[];
  adParameters: AdOfferParameterLink[];
  allProposals: AdProposal[];
  currentProposals: CurrentProposal[];
};

export type AdOffers = AdOffer[];
