// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace MySubgraphTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
  Int8: any;
  Timestamp: any;
};

export type AcceptedOffer = {
  id: Scalars['Bytes'];
  offeror: Scalars['Bytes'];
  offerId: Scalars['BigInt'];
  assetContract: Scalars['Bytes'];
  tokenId: Scalars['BigInt'];
  seller: Scalars['Bytes'];
  quantityBought: Scalars['BigInt'];
  totalPricePaid: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type AcceptedOffer_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  offeror?: InputMaybe<Scalars['Bytes']>;
  offeror_not?: InputMaybe<Scalars['Bytes']>;
  offeror_gt?: InputMaybe<Scalars['Bytes']>;
  offeror_lt?: InputMaybe<Scalars['Bytes']>;
  offeror_gte?: InputMaybe<Scalars['Bytes']>;
  offeror_lte?: InputMaybe<Scalars['Bytes']>;
  offeror_in?: InputMaybe<Array<Scalars['Bytes']>>;
  offeror_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  offeror_contains?: InputMaybe<Scalars['Bytes']>;
  offeror_not_contains?: InputMaybe<Scalars['Bytes']>;
  offerId?: InputMaybe<Scalars['BigInt']>;
  offerId_not?: InputMaybe<Scalars['BigInt']>;
  offerId_gt?: InputMaybe<Scalars['BigInt']>;
  offerId_lt?: InputMaybe<Scalars['BigInt']>;
  offerId_gte?: InputMaybe<Scalars['BigInt']>;
  offerId_lte?: InputMaybe<Scalars['BigInt']>;
  offerId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  offerId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetContract?: InputMaybe<Scalars['Bytes']>;
  assetContract_not?: InputMaybe<Scalars['Bytes']>;
  assetContract_gt?: InputMaybe<Scalars['Bytes']>;
  assetContract_lt?: InputMaybe<Scalars['Bytes']>;
  assetContract_gte?: InputMaybe<Scalars['Bytes']>;
  assetContract_lte?: InputMaybe<Scalars['Bytes']>;
  assetContract_in?: InputMaybe<Array<Scalars['Bytes']>>;
  assetContract_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  assetContract_contains?: InputMaybe<Scalars['Bytes']>;
  assetContract_not_contains?: InputMaybe<Scalars['Bytes']>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  seller?: InputMaybe<Scalars['Bytes']>;
  seller_not?: InputMaybe<Scalars['Bytes']>;
  seller_gt?: InputMaybe<Scalars['Bytes']>;
  seller_lt?: InputMaybe<Scalars['Bytes']>;
  seller_gte?: InputMaybe<Scalars['Bytes']>;
  seller_lte?: InputMaybe<Scalars['Bytes']>;
  seller_in?: InputMaybe<Array<Scalars['Bytes']>>;
  seller_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  seller_contains?: InputMaybe<Scalars['Bytes']>;
  seller_not_contains?: InputMaybe<Scalars['Bytes']>;
  quantityBought?: InputMaybe<Scalars['BigInt']>;
  quantityBought_not?: InputMaybe<Scalars['BigInt']>;
  quantityBought_gt?: InputMaybe<Scalars['BigInt']>;
  quantityBought_lt?: InputMaybe<Scalars['BigInt']>;
  quantityBought_gte?: InputMaybe<Scalars['BigInt']>;
  quantityBought_lte?: InputMaybe<Scalars['BigInt']>;
  quantityBought_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quantityBought_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalPricePaid?: InputMaybe<Scalars['BigInt']>;
  totalPricePaid_not?: InputMaybe<Scalars['BigInt']>;
  totalPricePaid_gt?: InputMaybe<Scalars['BigInt']>;
  totalPricePaid_lt?: InputMaybe<Scalars['BigInt']>;
  totalPricePaid_gte?: InputMaybe<Scalars['BigInt']>;
  totalPricePaid_lte?: InputMaybe<Scalars['BigInt']>;
  totalPricePaid_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalPricePaid_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<AcceptedOffer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<AcceptedOffer_filter>>>;
};

export type AcceptedOffer_orderBy =
  | 'id'
  | 'offeror'
  | 'offerId'
  | 'assetContract'
  | 'tokenId'
  | 'seller'
  | 'quantityBought'
  | 'totalPricePaid'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type AdOffer = {
  id: Scalars['String'];
  disable: Scalars['Boolean'];
  name: Scalars['String'];
  metadataURL: Scalars['String'];
  nftContract: NftContract;
  initialCreator: Scalars['Bytes'];
  creationTimestamp: Scalars['BigInt'];
  admins?: Maybe<Array<Scalars['Bytes']>>;
  validators?: Maybe<Array<Scalars['Bytes']>>;
  adParameters?: Maybe<Array<AdOfferParameterLink>>;
  allProposals?: Maybe<Array<AdProposal>>;
  currentProposals?: Maybe<Array<CurrentProposal>>;
};


export type AdOfferadParametersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AdOfferParameterLink_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AdOfferParameterLink_filter>;
};


export type AdOfferallProposalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AdProposal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AdProposal_filter>;
};


export type AdOffercurrentProposalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CurrentProposal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CurrentProposal_filter>;
};

export type AdOfferParameterLink = {
  id: Scalars['String'];
  enable: Scalars['Boolean'];
  adOffer: AdOffer;
  adParameter: AdParameter;
};

export type AdOfferParameterLink_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  enable?: InputMaybe<Scalars['Boolean']>;
  enable_not?: InputMaybe<Scalars['Boolean']>;
  enable_in?: InputMaybe<Array<Scalars['Boolean']>>;
  enable_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  adOffer?: InputMaybe<Scalars['String']>;
  adOffer_not?: InputMaybe<Scalars['String']>;
  adOffer_gt?: InputMaybe<Scalars['String']>;
  adOffer_lt?: InputMaybe<Scalars['String']>;
  adOffer_gte?: InputMaybe<Scalars['String']>;
  adOffer_lte?: InputMaybe<Scalars['String']>;
  adOffer_in?: InputMaybe<Array<Scalars['String']>>;
  adOffer_not_in?: InputMaybe<Array<Scalars['String']>>;
  adOffer_contains?: InputMaybe<Scalars['String']>;
  adOffer_contains_nocase?: InputMaybe<Scalars['String']>;
  adOffer_not_contains?: InputMaybe<Scalars['String']>;
  adOffer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  adOffer_starts_with?: InputMaybe<Scalars['String']>;
  adOffer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  adOffer_not_starts_with?: InputMaybe<Scalars['String']>;
  adOffer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  adOffer_ends_with?: InputMaybe<Scalars['String']>;
  adOffer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  adOffer_not_ends_with?: InputMaybe<Scalars['String']>;
  adOffer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  adOffer_?: InputMaybe<AdOffer_filter>;
  adParameter?: InputMaybe<Scalars['String']>;
  adParameter_not?: InputMaybe<Scalars['String']>;
  adParameter_gt?: InputMaybe<Scalars['String']>;
  adParameter_lt?: InputMaybe<Scalars['String']>;
  adParameter_gte?: InputMaybe<Scalars['String']>;
  adParameter_lte?: InputMaybe<Scalars['String']>;
  adParameter_in?: InputMaybe<Array<Scalars['String']>>;
  adParameter_not_in?: InputMaybe<Array<Scalars['String']>>;
  adParameter_contains?: InputMaybe<Scalars['String']>;
  adParameter_contains_nocase?: InputMaybe<Scalars['String']>;
  adParameter_not_contains?: InputMaybe<Scalars['String']>;
  adParameter_not_contains_nocase?: InputMaybe<Scalars['String']>;
  adParameter_starts_with?: InputMaybe<Scalars['String']>;
  adParameter_starts_with_nocase?: InputMaybe<Scalars['String']>;
  adParameter_not_starts_with?: InputMaybe<Scalars['String']>;
  adParameter_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  adParameter_ends_with?: InputMaybe<Scalars['String']>;
  adParameter_ends_with_nocase?: InputMaybe<Scalars['String']>;
  adParameter_not_ends_with?: InputMaybe<Scalars['String']>;
  adParameter_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  adParameter_?: InputMaybe<AdParameter_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<AdOfferParameterLink_filter>>>;
  or?: InputMaybe<Array<InputMaybe<AdOfferParameterLink_filter>>>;
};

export type AdOfferParameterLink_orderBy =
  | 'id'
  | 'enable'
  | 'adOffer'
  | 'adOffer__id'
  | 'adOffer__disable'
  | 'adOffer__name'
  | 'adOffer__metadataURL'
  | 'adOffer__initialCreator'
  | 'adOffer__creationTimestamp'
  | 'adParameter'
  | 'adParameter__id'
  | 'adParameter__base';

export type AdOffer_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  disable?: InputMaybe<Scalars['Boolean']>;
  disable_not?: InputMaybe<Scalars['Boolean']>;
  disable_in?: InputMaybe<Array<Scalars['Boolean']>>;
  disable_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  metadataURL?: InputMaybe<Scalars['String']>;
  metadataURL_not?: InputMaybe<Scalars['String']>;
  metadataURL_gt?: InputMaybe<Scalars['String']>;
  metadataURL_lt?: InputMaybe<Scalars['String']>;
  metadataURL_gte?: InputMaybe<Scalars['String']>;
  metadataURL_lte?: InputMaybe<Scalars['String']>;
  metadataURL_in?: InputMaybe<Array<Scalars['String']>>;
  metadataURL_not_in?: InputMaybe<Array<Scalars['String']>>;
  metadataURL_contains?: InputMaybe<Scalars['String']>;
  metadataURL_contains_nocase?: InputMaybe<Scalars['String']>;
  metadataURL_not_contains?: InputMaybe<Scalars['String']>;
  metadataURL_not_contains_nocase?: InputMaybe<Scalars['String']>;
  metadataURL_starts_with?: InputMaybe<Scalars['String']>;
  metadataURL_starts_with_nocase?: InputMaybe<Scalars['String']>;
  metadataURL_not_starts_with?: InputMaybe<Scalars['String']>;
  metadataURL_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  metadataURL_ends_with?: InputMaybe<Scalars['String']>;
  metadataURL_ends_with_nocase?: InputMaybe<Scalars['String']>;
  metadataURL_not_ends_with?: InputMaybe<Scalars['String']>;
  metadataURL_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nftContract?: InputMaybe<Scalars['String']>;
  nftContract_not?: InputMaybe<Scalars['String']>;
  nftContract_gt?: InputMaybe<Scalars['String']>;
  nftContract_lt?: InputMaybe<Scalars['String']>;
  nftContract_gte?: InputMaybe<Scalars['String']>;
  nftContract_lte?: InputMaybe<Scalars['String']>;
  nftContract_in?: InputMaybe<Array<Scalars['String']>>;
  nftContract_not_in?: InputMaybe<Array<Scalars['String']>>;
  nftContract_contains?: InputMaybe<Scalars['String']>;
  nftContract_contains_nocase?: InputMaybe<Scalars['String']>;
  nftContract_not_contains?: InputMaybe<Scalars['String']>;
  nftContract_not_contains_nocase?: InputMaybe<Scalars['String']>;
  nftContract_starts_with?: InputMaybe<Scalars['String']>;
  nftContract_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nftContract_not_starts_with?: InputMaybe<Scalars['String']>;
  nftContract_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nftContract_ends_with?: InputMaybe<Scalars['String']>;
  nftContract_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nftContract_not_ends_with?: InputMaybe<Scalars['String']>;
  nftContract_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nftContract_?: InputMaybe<NftContract_filter>;
  initialCreator?: InputMaybe<Scalars['Bytes']>;
  initialCreator_not?: InputMaybe<Scalars['Bytes']>;
  initialCreator_gt?: InputMaybe<Scalars['Bytes']>;
  initialCreator_lt?: InputMaybe<Scalars['Bytes']>;
  initialCreator_gte?: InputMaybe<Scalars['Bytes']>;
  initialCreator_lte?: InputMaybe<Scalars['Bytes']>;
  initialCreator_in?: InputMaybe<Array<Scalars['Bytes']>>;
  initialCreator_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  initialCreator_contains?: InputMaybe<Scalars['Bytes']>;
  initialCreator_not_contains?: InputMaybe<Scalars['Bytes']>;
  creationTimestamp?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  creationTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  admins?: InputMaybe<Array<Scalars['Bytes']>>;
  admins_not?: InputMaybe<Array<Scalars['Bytes']>>;
  admins_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  admins_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  admins_not_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  admins_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  validators?: InputMaybe<Array<Scalars['Bytes']>>;
  validators_not?: InputMaybe<Array<Scalars['Bytes']>>;
  validators_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  validators_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  validators_not_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  validators_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  adParameters_?: InputMaybe<AdOfferParameterLink_filter>;
  allProposals_?: InputMaybe<AdProposal_filter>;
  currentProposals_?: InputMaybe<CurrentProposal_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<AdOffer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<AdOffer_filter>>>;
};

export type AdOffer_orderBy =
  | 'id'
  | 'disable'
  | 'name'
  | 'metadataURL'
  | 'nftContract'
  | 'nftContract__id'
  | 'nftContract__name'
  | 'nftContract__symbol'
  | 'nftContract__baseURI'
  | 'nftContract__contractURI'
  | 'nftContract__maxSupply'
  | 'nftContract__minter'
  | 'nftContract__forwarder'
  | 'nftContract__royaltyBps'
  | 'nftContract__allowList'
  | 'initialCreator'
  | 'creationTimestamp'
  | 'admins'
  | 'validators'
  | 'adParameters'
  | 'allProposals'
  | 'currentProposals';

export type AdParameter = {
  id: Scalars['String'];
  base: Scalars['String'];
  variants: Array<Scalars['String']>;
  adOffers?: Maybe<Array<AdOfferParameterLink>>;
  proposals?: Maybe<Array<AdProposal>>;
  currentProposals?: Maybe<Array<CurrentProposal>>;
};


export type AdParameteradOffersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AdOfferParameterLink_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AdOfferParameterLink_filter>;
};


export type AdParameterproposalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AdProposal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AdProposal_filter>;
};


export type AdParametercurrentProposalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CurrentProposal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CurrentProposal_filter>;
};

export type AdParameter_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  base?: InputMaybe<Scalars['String']>;
  base_not?: InputMaybe<Scalars['String']>;
  base_gt?: InputMaybe<Scalars['String']>;
  base_lt?: InputMaybe<Scalars['String']>;
  base_gte?: InputMaybe<Scalars['String']>;
  base_lte?: InputMaybe<Scalars['String']>;
  base_in?: InputMaybe<Array<Scalars['String']>>;
  base_not_in?: InputMaybe<Array<Scalars['String']>>;
  base_contains?: InputMaybe<Scalars['String']>;
  base_contains_nocase?: InputMaybe<Scalars['String']>;
  base_not_contains?: InputMaybe<Scalars['String']>;
  base_not_contains_nocase?: InputMaybe<Scalars['String']>;
  base_starts_with?: InputMaybe<Scalars['String']>;
  base_starts_with_nocase?: InputMaybe<Scalars['String']>;
  base_not_starts_with?: InputMaybe<Scalars['String']>;
  base_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  base_ends_with?: InputMaybe<Scalars['String']>;
  base_ends_with_nocase?: InputMaybe<Scalars['String']>;
  base_not_ends_with?: InputMaybe<Scalars['String']>;
  base_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  variants?: InputMaybe<Array<Scalars['String']>>;
  variants_not?: InputMaybe<Array<Scalars['String']>>;
  variants_contains?: InputMaybe<Array<Scalars['String']>>;
  variants_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  variants_not_contains?: InputMaybe<Array<Scalars['String']>>;
  variants_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  adOffers_?: InputMaybe<AdOfferParameterLink_filter>;
  proposals_?: InputMaybe<AdProposal_filter>;
  currentProposals_?: InputMaybe<CurrentProposal_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<AdParameter_filter>>>;
  or?: InputMaybe<Array<InputMaybe<AdParameter_filter>>>;
};

export type AdParameter_orderBy =
  | 'id'
  | 'base'
  | 'variants'
  | 'adOffers'
  | 'proposals'
  | 'currentProposals';

export type AdProposal = {
  id: Scalars['String'];
  adOffer: AdOffer;
  token: Token;
  adParameter: AdParameter;
  status: AdProposalStatus;
  data: Scalars['String'];
  rejectReason?: Maybe<Scalars['String']>;
  creationTimestamp: Scalars['BigInt'];
  lastUpdateTimestamp: Scalars['BigInt'];
};

export type AdProposalStatus =
  | 'CURRENT_ACCEPTED'
  | 'CURRENT_PENDING'
  | 'CURRENT_REJECTED'
  | 'PREV_ACCEPTED'
  | 'PREV_PENDING'
  | 'PREV_REJECTED';

export type AdProposal_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  adOffer?: InputMaybe<Scalars['String']>;
  adOffer_not?: InputMaybe<Scalars['String']>;
  adOffer_gt?: InputMaybe<Scalars['String']>;
  adOffer_lt?: InputMaybe<Scalars['String']>;
  adOffer_gte?: InputMaybe<Scalars['String']>;
  adOffer_lte?: InputMaybe<Scalars['String']>;
  adOffer_in?: InputMaybe<Array<Scalars['String']>>;
  adOffer_not_in?: InputMaybe<Array<Scalars['String']>>;
  adOffer_contains?: InputMaybe<Scalars['String']>;
  adOffer_contains_nocase?: InputMaybe<Scalars['String']>;
  adOffer_not_contains?: InputMaybe<Scalars['String']>;
  adOffer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  adOffer_starts_with?: InputMaybe<Scalars['String']>;
  adOffer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  adOffer_not_starts_with?: InputMaybe<Scalars['String']>;
  adOffer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  adOffer_ends_with?: InputMaybe<Scalars['String']>;
  adOffer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  adOffer_not_ends_with?: InputMaybe<Scalars['String']>;
  adOffer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  adOffer_?: InputMaybe<AdOffer_filter>;
  token?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_?: InputMaybe<Token_filter>;
  adParameter?: InputMaybe<Scalars['String']>;
  adParameter_not?: InputMaybe<Scalars['String']>;
  adParameter_gt?: InputMaybe<Scalars['String']>;
  adParameter_lt?: InputMaybe<Scalars['String']>;
  adParameter_gte?: InputMaybe<Scalars['String']>;
  adParameter_lte?: InputMaybe<Scalars['String']>;
  adParameter_in?: InputMaybe<Array<Scalars['String']>>;
  adParameter_not_in?: InputMaybe<Array<Scalars['String']>>;
  adParameter_contains?: InputMaybe<Scalars['String']>;
  adParameter_contains_nocase?: InputMaybe<Scalars['String']>;
  adParameter_not_contains?: InputMaybe<Scalars['String']>;
  adParameter_not_contains_nocase?: InputMaybe<Scalars['String']>;
  adParameter_starts_with?: InputMaybe<Scalars['String']>;
  adParameter_starts_with_nocase?: InputMaybe<Scalars['String']>;
  adParameter_not_starts_with?: InputMaybe<Scalars['String']>;
  adParameter_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  adParameter_ends_with?: InputMaybe<Scalars['String']>;
  adParameter_ends_with_nocase?: InputMaybe<Scalars['String']>;
  adParameter_not_ends_with?: InputMaybe<Scalars['String']>;
  adParameter_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  adParameter_?: InputMaybe<AdParameter_filter>;
  status?: InputMaybe<AdProposalStatus>;
  status_not?: InputMaybe<AdProposalStatus>;
  status_in?: InputMaybe<Array<AdProposalStatus>>;
  status_not_in?: InputMaybe<Array<AdProposalStatus>>;
  data?: InputMaybe<Scalars['String']>;
  data_not?: InputMaybe<Scalars['String']>;
  data_gt?: InputMaybe<Scalars['String']>;
  data_lt?: InputMaybe<Scalars['String']>;
  data_gte?: InputMaybe<Scalars['String']>;
  data_lte?: InputMaybe<Scalars['String']>;
  data_in?: InputMaybe<Array<Scalars['String']>>;
  data_not_in?: InputMaybe<Array<Scalars['String']>>;
  data_contains?: InputMaybe<Scalars['String']>;
  data_contains_nocase?: InputMaybe<Scalars['String']>;
  data_not_contains?: InputMaybe<Scalars['String']>;
  data_not_contains_nocase?: InputMaybe<Scalars['String']>;
  data_starts_with?: InputMaybe<Scalars['String']>;
  data_starts_with_nocase?: InputMaybe<Scalars['String']>;
  data_not_starts_with?: InputMaybe<Scalars['String']>;
  data_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  data_ends_with?: InputMaybe<Scalars['String']>;
  data_ends_with_nocase?: InputMaybe<Scalars['String']>;
  data_not_ends_with?: InputMaybe<Scalars['String']>;
  data_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  rejectReason?: InputMaybe<Scalars['String']>;
  rejectReason_not?: InputMaybe<Scalars['String']>;
  rejectReason_gt?: InputMaybe<Scalars['String']>;
  rejectReason_lt?: InputMaybe<Scalars['String']>;
  rejectReason_gte?: InputMaybe<Scalars['String']>;
  rejectReason_lte?: InputMaybe<Scalars['String']>;
  rejectReason_in?: InputMaybe<Array<Scalars['String']>>;
  rejectReason_not_in?: InputMaybe<Array<Scalars['String']>>;
  rejectReason_contains?: InputMaybe<Scalars['String']>;
  rejectReason_contains_nocase?: InputMaybe<Scalars['String']>;
  rejectReason_not_contains?: InputMaybe<Scalars['String']>;
  rejectReason_not_contains_nocase?: InputMaybe<Scalars['String']>;
  rejectReason_starts_with?: InputMaybe<Scalars['String']>;
  rejectReason_starts_with_nocase?: InputMaybe<Scalars['String']>;
  rejectReason_not_starts_with?: InputMaybe<Scalars['String']>;
  rejectReason_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  rejectReason_ends_with?: InputMaybe<Scalars['String']>;
  rejectReason_ends_with_nocase?: InputMaybe<Scalars['String']>;
  rejectReason_not_ends_with?: InputMaybe<Scalars['String']>;
  rejectReason_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  creationTimestamp?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  creationTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdateTimestamp?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdateTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<AdProposal_filter>>>;
  or?: InputMaybe<Array<InputMaybe<AdProposal_filter>>>;
};

export type AdProposal_orderBy =
  | 'id'
  | 'adOffer'
  | 'adOffer__id'
  | 'adOffer__disable'
  | 'adOffer__name'
  | 'adOffer__metadataURL'
  | 'adOffer__initialCreator'
  | 'adOffer__creationTimestamp'
  | 'token'
  | 'token__id'
  | 'token__tokenId'
  | 'token__setInAllowList'
  | 'adParameter'
  | 'adParameter__id'
  | 'adParameter__base'
  | 'status'
  | 'data'
  | 'rejectReason'
  | 'creationTimestamp'
  | 'lastUpdateTimestamp';

export type Aggregation_interval =
  | 'hour'
  | 'day';

export type AuctionClosed = {
  id: Scalars['Bytes'];
  listingId: Scalars['BigInt'];
  closer: Scalars['Bytes'];
  cancelled: Scalars['Boolean'];
  auctionCreator: Scalars['Bytes'];
  winningBidder: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type AuctionClosed_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  listingId?: InputMaybe<Scalars['BigInt']>;
  listingId_not?: InputMaybe<Scalars['BigInt']>;
  listingId_gt?: InputMaybe<Scalars['BigInt']>;
  listingId_lt?: InputMaybe<Scalars['BigInt']>;
  listingId_gte?: InputMaybe<Scalars['BigInt']>;
  listingId_lte?: InputMaybe<Scalars['BigInt']>;
  listingId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  listingId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  closer?: InputMaybe<Scalars['Bytes']>;
  closer_not?: InputMaybe<Scalars['Bytes']>;
  closer_gt?: InputMaybe<Scalars['Bytes']>;
  closer_lt?: InputMaybe<Scalars['Bytes']>;
  closer_gte?: InputMaybe<Scalars['Bytes']>;
  closer_lte?: InputMaybe<Scalars['Bytes']>;
  closer_in?: InputMaybe<Array<Scalars['Bytes']>>;
  closer_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  closer_contains?: InputMaybe<Scalars['Bytes']>;
  closer_not_contains?: InputMaybe<Scalars['Bytes']>;
  cancelled?: InputMaybe<Scalars['Boolean']>;
  cancelled_not?: InputMaybe<Scalars['Boolean']>;
  cancelled_in?: InputMaybe<Array<Scalars['Boolean']>>;
  cancelled_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  auctionCreator?: InputMaybe<Scalars['Bytes']>;
  auctionCreator_not?: InputMaybe<Scalars['Bytes']>;
  auctionCreator_gt?: InputMaybe<Scalars['Bytes']>;
  auctionCreator_lt?: InputMaybe<Scalars['Bytes']>;
  auctionCreator_gte?: InputMaybe<Scalars['Bytes']>;
  auctionCreator_lte?: InputMaybe<Scalars['Bytes']>;
  auctionCreator_in?: InputMaybe<Array<Scalars['Bytes']>>;
  auctionCreator_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  auctionCreator_contains?: InputMaybe<Scalars['Bytes']>;
  auctionCreator_not_contains?: InputMaybe<Scalars['Bytes']>;
  winningBidder?: InputMaybe<Scalars['Bytes']>;
  winningBidder_not?: InputMaybe<Scalars['Bytes']>;
  winningBidder_gt?: InputMaybe<Scalars['Bytes']>;
  winningBidder_lt?: InputMaybe<Scalars['Bytes']>;
  winningBidder_gte?: InputMaybe<Scalars['Bytes']>;
  winningBidder_lte?: InputMaybe<Scalars['Bytes']>;
  winningBidder_in?: InputMaybe<Array<Scalars['Bytes']>>;
  winningBidder_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  winningBidder_contains?: InputMaybe<Scalars['Bytes']>;
  winningBidder_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<AuctionClosed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<AuctionClosed_filter>>>;
};

export type AuctionClosed_orderBy =
  | 'id'
  | 'listingId'
  | 'closer'
  | 'cancelled'
  | 'auctionCreator'
  | 'winningBidder'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type CallWithProtocolFee = {
  id: Scalars['Bytes'];
  target: Scalars['Bytes'];
  currency: Scalars['Bytes'];
  fee: Scalars['BigInt'];
  enabler: Scalars['Bytes'];
  spender: Scalars['Bytes'];
  referralAdditionalInformation: Scalars['String'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
  revenueTransaction?: Maybe<RevenueTransaction>;
  referralAddresses: Array<Scalars['Bytes']>;
  referralUnitShare?: Maybe<Scalars['Int']>;
  referralNb?: Maybe<Scalars['Int']>;
  epochCurrencyRevenue: EpochCurrencyRevenue;
};

export type CallWithProtocolFee_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  target?: InputMaybe<Scalars['Bytes']>;
  target_not?: InputMaybe<Scalars['Bytes']>;
  target_gt?: InputMaybe<Scalars['Bytes']>;
  target_lt?: InputMaybe<Scalars['Bytes']>;
  target_gte?: InputMaybe<Scalars['Bytes']>;
  target_lte?: InputMaybe<Scalars['Bytes']>;
  target_in?: InputMaybe<Array<Scalars['Bytes']>>;
  target_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  target_contains?: InputMaybe<Scalars['Bytes']>;
  target_not_contains?: InputMaybe<Scalars['Bytes']>;
  currency?: InputMaybe<Scalars['Bytes']>;
  currency_not?: InputMaybe<Scalars['Bytes']>;
  currency_gt?: InputMaybe<Scalars['Bytes']>;
  currency_lt?: InputMaybe<Scalars['Bytes']>;
  currency_gte?: InputMaybe<Scalars['Bytes']>;
  currency_lte?: InputMaybe<Scalars['Bytes']>;
  currency_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currency_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currency_contains?: InputMaybe<Scalars['Bytes']>;
  currency_not_contains?: InputMaybe<Scalars['Bytes']>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  enabler?: InputMaybe<Scalars['Bytes']>;
  enabler_not?: InputMaybe<Scalars['Bytes']>;
  enabler_gt?: InputMaybe<Scalars['Bytes']>;
  enabler_lt?: InputMaybe<Scalars['Bytes']>;
  enabler_gte?: InputMaybe<Scalars['Bytes']>;
  enabler_lte?: InputMaybe<Scalars['Bytes']>;
  enabler_in?: InputMaybe<Array<Scalars['Bytes']>>;
  enabler_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  enabler_contains?: InputMaybe<Scalars['Bytes']>;
  enabler_not_contains?: InputMaybe<Scalars['Bytes']>;
  spender?: InputMaybe<Scalars['Bytes']>;
  spender_not?: InputMaybe<Scalars['Bytes']>;
  spender_gt?: InputMaybe<Scalars['Bytes']>;
  spender_lt?: InputMaybe<Scalars['Bytes']>;
  spender_gte?: InputMaybe<Scalars['Bytes']>;
  spender_lte?: InputMaybe<Scalars['Bytes']>;
  spender_in?: InputMaybe<Array<Scalars['Bytes']>>;
  spender_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  spender_contains?: InputMaybe<Scalars['Bytes']>;
  spender_not_contains?: InputMaybe<Scalars['Bytes']>;
  referralAdditionalInformation?: InputMaybe<Scalars['String']>;
  referralAdditionalInformation_not?: InputMaybe<Scalars['String']>;
  referralAdditionalInformation_gt?: InputMaybe<Scalars['String']>;
  referralAdditionalInformation_lt?: InputMaybe<Scalars['String']>;
  referralAdditionalInformation_gte?: InputMaybe<Scalars['String']>;
  referralAdditionalInformation_lte?: InputMaybe<Scalars['String']>;
  referralAdditionalInformation_in?: InputMaybe<Array<Scalars['String']>>;
  referralAdditionalInformation_not_in?: InputMaybe<Array<Scalars['String']>>;
  referralAdditionalInformation_contains?: InputMaybe<Scalars['String']>;
  referralAdditionalInformation_contains_nocase?: InputMaybe<Scalars['String']>;
  referralAdditionalInformation_not_contains?: InputMaybe<Scalars['String']>;
  referralAdditionalInformation_not_contains_nocase?: InputMaybe<Scalars['String']>;
  referralAdditionalInformation_starts_with?: InputMaybe<Scalars['String']>;
  referralAdditionalInformation_starts_with_nocase?: InputMaybe<Scalars['String']>;
  referralAdditionalInformation_not_starts_with?: InputMaybe<Scalars['String']>;
  referralAdditionalInformation_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  referralAdditionalInformation_ends_with?: InputMaybe<Scalars['String']>;
  referralAdditionalInformation_ends_with_nocase?: InputMaybe<Scalars['String']>;
  referralAdditionalInformation_not_ends_with?: InputMaybe<Scalars['String']>;
  referralAdditionalInformation_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  revenueTransaction?: InputMaybe<Scalars['String']>;
  revenueTransaction_not?: InputMaybe<Scalars['String']>;
  revenueTransaction_gt?: InputMaybe<Scalars['String']>;
  revenueTransaction_lt?: InputMaybe<Scalars['String']>;
  revenueTransaction_gte?: InputMaybe<Scalars['String']>;
  revenueTransaction_lte?: InputMaybe<Scalars['String']>;
  revenueTransaction_in?: InputMaybe<Array<Scalars['String']>>;
  revenueTransaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  revenueTransaction_contains?: InputMaybe<Scalars['String']>;
  revenueTransaction_contains_nocase?: InputMaybe<Scalars['String']>;
  revenueTransaction_not_contains?: InputMaybe<Scalars['String']>;
  revenueTransaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  revenueTransaction_starts_with?: InputMaybe<Scalars['String']>;
  revenueTransaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  revenueTransaction_not_starts_with?: InputMaybe<Scalars['String']>;
  revenueTransaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  revenueTransaction_ends_with?: InputMaybe<Scalars['String']>;
  revenueTransaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  revenueTransaction_not_ends_with?: InputMaybe<Scalars['String']>;
  revenueTransaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  revenueTransaction_?: InputMaybe<RevenueTransaction_filter>;
  referralAddresses?: InputMaybe<Array<Scalars['Bytes']>>;
  referralAddresses_not?: InputMaybe<Array<Scalars['Bytes']>>;
  referralAddresses_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  referralAddresses_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  referralAddresses_not_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  referralAddresses_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  referralUnitShare?: InputMaybe<Scalars['Int']>;
  referralUnitShare_not?: InputMaybe<Scalars['Int']>;
  referralUnitShare_gt?: InputMaybe<Scalars['Int']>;
  referralUnitShare_lt?: InputMaybe<Scalars['Int']>;
  referralUnitShare_gte?: InputMaybe<Scalars['Int']>;
  referralUnitShare_lte?: InputMaybe<Scalars['Int']>;
  referralUnitShare_in?: InputMaybe<Array<Scalars['Int']>>;
  referralUnitShare_not_in?: InputMaybe<Array<Scalars['Int']>>;
  referralNb?: InputMaybe<Scalars['Int']>;
  referralNb_not?: InputMaybe<Scalars['Int']>;
  referralNb_gt?: InputMaybe<Scalars['Int']>;
  referralNb_lt?: InputMaybe<Scalars['Int']>;
  referralNb_gte?: InputMaybe<Scalars['Int']>;
  referralNb_lte?: InputMaybe<Scalars['Int']>;
  referralNb_in?: InputMaybe<Array<Scalars['Int']>>;
  referralNb_not_in?: InputMaybe<Array<Scalars['Int']>>;
  epochCurrencyRevenue?: InputMaybe<Scalars['String']>;
  epochCurrencyRevenue_not?: InputMaybe<Scalars['String']>;
  epochCurrencyRevenue_gt?: InputMaybe<Scalars['String']>;
  epochCurrencyRevenue_lt?: InputMaybe<Scalars['String']>;
  epochCurrencyRevenue_gte?: InputMaybe<Scalars['String']>;
  epochCurrencyRevenue_lte?: InputMaybe<Scalars['String']>;
  epochCurrencyRevenue_in?: InputMaybe<Array<Scalars['String']>>;
  epochCurrencyRevenue_not_in?: InputMaybe<Array<Scalars['String']>>;
  epochCurrencyRevenue_contains?: InputMaybe<Scalars['String']>;
  epochCurrencyRevenue_contains_nocase?: InputMaybe<Scalars['String']>;
  epochCurrencyRevenue_not_contains?: InputMaybe<Scalars['String']>;
  epochCurrencyRevenue_not_contains_nocase?: InputMaybe<Scalars['String']>;
  epochCurrencyRevenue_starts_with?: InputMaybe<Scalars['String']>;
  epochCurrencyRevenue_starts_with_nocase?: InputMaybe<Scalars['String']>;
  epochCurrencyRevenue_not_starts_with?: InputMaybe<Scalars['String']>;
  epochCurrencyRevenue_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  epochCurrencyRevenue_ends_with?: InputMaybe<Scalars['String']>;
  epochCurrencyRevenue_ends_with_nocase?: InputMaybe<Scalars['String']>;
  epochCurrencyRevenue_not_ends_with?: InputMaybe<Scalars['String']>;
  epochCurrencyRevenue_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  epochCurrencyRevenue_?: InputMaybe<EpochCurrencyRevenue_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CallWithProtocolFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<CallWithProtocolFee_filter>>>;
};

export type CallWithProtocolFee_orderBy =
  | 'id'
  | 'target'
  | 'currency'
  | 'fee'
  | 'enabler'
  | 'spender'
  | 'referralAdditionalInformation'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash'
  | 'revenueTransaction'
  | 'revenueTransaction__id'
  | 'revenueTransaction__blockTimestamp'
  | 'referralAddresses'
  | 'referralUnitShare'
  | 'referralNb'
  | 'epochCurrencyRevenue'
  | 'epochCurrencyRevenue__id'
  | 'epochCurrencyRevenue__year'
  | 'epochCurrencyRevenue__month'
  | 'epochCurrencyRevenue__currency'
  | 'epochCurrencyRevenue__totalAmount';

export type CancelledOffer = {
  id: Scalars['Bytes'];
  offeror: Scalars['Bytes'];
  offerId: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type CancelledOffer_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  offeror?: InputMaybe<Scalars['Bytes']>;
  offeror_not?: InputMaybe<Scalars['Bytes']>;
  offeror_gt?: InputMaybe<Scalars['Bytes']>;
  offeror_lt?: InputMaybe<Scalars['Bytes']>;
  offeror_gte?: InputMaybe<Scalars['Bytes']>;
  offeror_lte?: InputMaybe<Scalars['Bytes']>;
  offeror_in?: InputMaybe<Array<Scalars['Bytes']>>;
  offeror_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  offeror_contains?: InputMaybe<Scalars['Bytes']>;
  offeror_not_contains?: InputMaybe<Scalars['Bytes']>;
  offerId?: InputMaybe<Scalars['BigInt']>;
  offerId_not?: InputMaybe<Scalars['BigInt']>;
  offerId_gt?: InputMaybe<Scalars['BigInt']>;
  offerId_lt?: InputMaybe<Scalars['BigInt']>;
  offerId_gte?: InputMaybe<Scalars['BigInt']>;
  offerId_lte?: InputMaybe<Scalars['BigInt']>;
  offerId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  offerId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CancelledOffer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<CancelledOffer_filter>>>;
};

export type CancelledOffer_orderBy =
  | 'id'
  | 'offeror'
  | 'offerId'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

/**
 * type Approval @entity(immutable: true) {
 *   id: Bytes!
 *   owner: Bytes! # address
 *   approved: Bytes! # address
 *   tokenId: BigInt! # uint256
 *   blockNumber: BigInt!
 *   blockTimestamp: BigInt!
 *   transactionHash: Bytes!
 * }
 *
 * type ApprovalForAll @entity(immutable: true) {
 *   id: Bytes!
 *   owner: Bytes! # address
 *   operator: Bytes! # address
 *   approved: Boolean! # bool
 *   blockNumber: BigInt!
 *   blockTimestamp: BigInt!
 *   transactionHash: Bytes!
 * }
 *
 */
export type ContractURIUpdated = {
  id: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type ContractURIUpdated_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ContractURIUpdated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ContractURIUpdated_filter>>>;
};

export type ContractURIUpdated_orderBy =
  | 'id'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type CurrentProposal = {
  id: Scalars['String'];
  adOffer: AdOffer;
  token: Token;
  adParameter: AdParameter;
  pendingProposal?: Maybe<AdProposal>;
  acceptedProposal?: Maybe<AdProposal>;
  rejectedProposal?: Maybe<AdProposal>;
};

export type CurrentProposal_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  adOffer?: InputMaybe<Scalars['String']>;
  adOffer_not?: InputMaybe<Scalars['String']>;
  adOffer_gt?: InputMaybe<Scalars['String']>;
  adOffer_lt?: InputMaybe<Scalars['String']>;
  adOffer_gte?: InputMaybe<Scalars['String']>;
  adOffer_lte?: InputMaybe<Scalars['String']>;
  adOffer_in?: InputMaybe<Array<Scalars['String']>>;
  adOffer_not_in?: InputMaybe<Array<Scalars['String']>>;
  adOffer_contains?: InputMaybe<Scalars['String']>;
  adOffer_contains_nocase?: InputMaybe<Scalars['String']>;
  adOffer_not_contains?: InputMaybe<Scalars['String']>;
  adOffer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  adOffer_starts_with?: InputMaybe<Scalars['String']>;
  adOffer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  adOffer_not_starts_with?: InputMaybe<Scalars['String']>;
  adOffer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  adOffer_ends_with?: InputMaybe<Scalars['String']>;
  adOffer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  adOffer_not_ends_with?: InputMaybe<Scalars['String']>;
  adOffer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  adOffer_?: InputMaybe<AdOffer_filter>;
  token?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_?: InputMaybe<Token_filter>;
  adParameter?: InputMaybe<Scalars['String']>;
  adParameter_not?: InputMaybe<Scalars['String']>;
  adParameter_gt?: InputMaybe<Scalars['String']>;
  adParameter_lt?: InputMaybe<Scalars['String']>;
  adParameter_gte?: InputMaybe<Scalars['String']>;
  adParameter_lte?: InputMaybe<Scalars['String']>;
  adParameter_in?: InputMaybe<Array<Scalars['String']>>;
  adParameter_not_in?: InputMaybe<Array<Scalars['String']>>;
  adParameter_contains?: InputMaybe<Scalars['String']>;
  adParameter_contains_nocase?: InputMaybe<Scalars['String']>;
  adParameter_not_contains?: InputMaybe<Scalars['String']>;
  adParameter_not_contains_nocase?: InputMaybe<Scalars['String']>;
  adParameter_starts_with?: InputMaybe<Scalars['String']>;
  adParameter_starts_with_nocase?: InputMaybe<Scalars['String']>;
  adParameter_not_starts_with?: InputMaybe<Scalars['String']>;
  adParameter_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  adParameter_ends_with?: InputMaybe<Scalars['String']>;
  adParameter_ends_with_nocase?: InputMaybe<Scalars['String']>;
  adParameter_not_ends_with?: InputMaybe<Scalars['String']>;
  adParameter_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  adParameter_?: InputMaybe<AdParameter_filter>;
  pendingProposal?: InputMaybe<Scalars['String']>;
  pendingProposal_not?: InputMaybe<Scalars['String']>;
  pendingProposal_gt?: InputMaybe<Scalars['String']>;
  pendingProposal_lt?: InputMaybe<Scalars['String']>;
  pendingProposal_gte?: InputMaybe<Scalars['String']>;
  pendingProposal_lte?: InputMaybe<Scalars['String']>;
  pendingProposal_in?: InputMaybe<Array<Scalars['String']>>;
  pendingProposal_not_in?: InputMaybe<Array<Scalars['String']>>;
  pendingProposal_contains?: InputMaybe<Scalars['String']>;
  pendingProposal_contains_nocase?: InputMaybe<Scalars['String']>;
  pendingProposal_not_contains?: InputMaybe<Scalars['String']>;
  pendingProposal_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pendingProposal_starts_with?: InputMaybe<Scalars['String']>;
  pendingProposal_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pendingProposal_not_starts_with?: InputMaybe<Scalars['String']>;
  pendingProposal_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pendingProposal_ends_with?: InputMaybe<Scalars['String']>;
  pendingProposal_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pendingProposal_not_ends_with?: InputMaybe<Scalars['String']>;
  pendingProposal_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pendingProposal_?: InputMaybe<AdProposal_filter>;
  acceptedProposal?: InputMaybe<Scalars['String']>;
  acceptedProposal_not?: InputMaybe<Scalars['String']>;
  acceptedProposal_gt?: InputMaybe<Scalars['String']>;
  acceptedProposal_lt?: InputMaybe<Scalars['String']>;
  acceptedProposal_gte?: InputMaybe<Scalars['String']>;
  acceptedProposal_lte?: InputMaybe<Scalars['String']>;
  acceptedProposal_in?: InputMaybe<Array<Scalars['String']>>;
  acceptedProposal_not_in?: InputMaybe<Array<Scalars['String']>>;
  acceptedProposal_contains?: InputMaybe<Scalars['String']>;
  acceptedProposal_contains_nocase?: InputMaybe<Scalars['String']>;
  acceptedProposal_not_contains?: InputMaybe<Scalars['String']>;
  acceptedProposal_not_contains_nocase?: InputMaybe<Scalars['String']>;
  acceptedProposal_starts_with?: InputMaybe<Scalars['String']>;
  acceptedProposal_starts_with_nocase?: InputMaybe<Scalars['String']>;
  acceptedProposal_not_starts_with?: InputMaybe<Scalars['String']>;
  acceptedProposal_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  acceptedProposal_ends_with?: InputMaybe<Scalars['String']>;
  acceptedProposal_ends_with_nocase?: InputMaybe<Scalars['String']>;
  acceptedProposal_not_ends_with?: InputMaybe<Scalars['String']>;
  acceptedProposal_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  acceptedProposal_?: InputMaybe<AdProposal_filter>;
  rejectedProposal?: InputMaybe<Scalars['String']>;
  rejectedProposal_not?: InputMaybe<Scalars['String']>;
  rejectedProposal_gt?: InputMaybe<Scalars['String']>;
  rejectedProposal_lt?: InputMaybe<Scalars['String']>;
  rejectedProposal_gte?: InputMaybe<Scalars['String']>;
  rejectedProposal_lte?: InputMaybe<Scalars['String']>;
  rejectedProposal_in?: InputMaybe<Array<Scalars['String']>>;
  rejectedProposal_not_in?: InputMaybe<Array<Scalars['String']>>;
  rejectedProposal_contains?: InputMaybe<Scalars['String']>;
  rejectedProposal_contains_nocase?: InputMaybe<Scalars['String']>;
  rejectedProposal_not_contains?: InputMaybe<Scalars['String']>;
  rejectedProposal_not_contains_nocase?: InputMaybe<Scalars['String']>;
  rejectedProposal_starts_with?: InputMaybe<Scalars['String']>;
  rejectedProposal_starts_with_nocase?: InputMaybe<Scalars['String']>;
  rejectedProposal_not_starts_with?: InputMaybe<Scalars['String']>;
  rejectedProposal_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  rejectedProposal_ends_with?: InputMaybe<Scalars['String']>;
  rejectedProposal_ends_with_nocase?: InputMaybe<Scalars['String']>;
  rejectedProposal_not_ends_with?: InputMaybe<Scalars['String']>;
  rejectedProposal_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  rejectedProposal_?: InputMaybe<AdProposal_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CurrentProposal_filter>>>;
  or?: InputMaybe<Array<InputMaybe<CurrentProposal_filter>>>;
};

export type CurrentProposal_orderBy =
  | 'id'
  | 'adOffer'
  | 'adOffer__id'
  | 'adOffer__disable'
  | 'adOffer__name'
  | 'adOffer__metadataURL'
  | 'adOffer__initialCreator'
  | 'adOffer__creationTimestamp'
  | 'token'
  | 'token__id'
  | 'token__tokenId'
  | 'token__setInAllowList'
  | 'adParameter'
  | 'adParameter__id'
  | 'adParameter__base'
  | 'pendingProposal'
  | 'pendingProposal__id'
  | 'pendingProposal__status'
  | 'pendingProposal__data'
  | 'pendingProposal__rejectReason'
  | 'pendingProposal__creationTimestamp'
  | 'pendingProposal__lastUpdateTimestamp'
  | 'acceptedProposal'
  | 'acceptedProposal__id'
  | 'acceptedProposal__status'
  | 'acceptedProposal__data'
  | 'acceptedProposal__rejectReason'
  | 'acceptedProposal__creationTimestamp'
  | 'acceptedProposal__lastUpdateTimestamp'
  | 'rejectedProposal'
  | 'rejectedProposal__id'
  | 'rejectedProposal__status'
  | 'rejectedProposal__data'
  | 'rejectedProposal__rejectReason'
  | 'rejectedProposal__creationTimestamp'
  | 'rejectedProposal__lastUpdateTimestamp';

export type EpochCurrencyRevenue = {
  id: Scalars['String'];
  year: Scalars['Int'];
  month: Scalars['Int'];
  currency: Scalars['Bytes'];
  totalAmount: Scalars['BigInt'];
  callsWithProtocolFee?: Maybe<Array<CallWithProtocolFee>>;
};


export type EpochCurrencyRevenuecallsWithProtocolFeeArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CallWithProtocolFee_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CallWithProtocolFee_filter>;
};

export type EpochCurrencyRevenue_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['Int']>;
  year_not?: InputMaybe<Scalars['Int']>;
  year_gt?: InputMaybe<Scalars['Int']>;
  year_lt?: InputMaybe<Scalars['Int']>;
  year_gte?: InputMaybe<Scalars['Int']>;
  year_lte?: InputMaybe<Scalars['Int']>;
  year_in?: InputMaybe<Array<Scalars['Int']>>;
  year_not_in?: InputMaybe<Array<Scalars['Int']>>;
  month?: InputMaybe<Scalars['Int']>;
  month_not?: InputMaybe<Scalars['Int']>;
  month_gt?: InputMaybe<Scalars['Int']>;
  month_lt?: InputMaybe<Scalars['Int']>;
  month_gte?: InputMaybe<Scalars['Int']>;
  month_lte?: InputMaybe<Scalars['Int']>;
  month_in?: InputMaybe<Array<Scalars['Int']>>;
  month_not_in?: InputMaybe<Array<Scalars['Int']>>;
  currency?: InputMaybe<Scalars['Bytes']>;
  currency_not?: InputMaybe<Scalars['Bytes']>;
  currency_gt?: InputMaybe<Scalars['Bytes']>;
  currency_lt?: InputMaybe<Scalars['Bytes']>;
  currency_gte?: InputMaybe<Scalars['Bytes']>;
  currency_lte?: InputMaybe<Scalars['Bytes']>;
  currency_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currency_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currency_contains?: InputMaybe<Scalars['Bytes']>;
  currency_not_contains?: InputMaybe<Scalars['Bytes']>;
  totalAmount?: InputMaybe<Scalars['BigInt']>;
  totalAmount_not?: InputMaybe<Scalars['BigInt']>;
  totalAmount_gt?: InputMaybe<Scalars['BigInt']>;
  totalAmount_lt?: InputMaybe<Scalars['BigInt']>;
  totalAmount_gte?: InputMaybe<Scalars['BigInt']>;
  totalAmount_lte?: InputMaybe<Scalars['BigInt']>;
  totalAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  callsWithProtocolFee_?: InputMaybe<CallWithProtocolFee_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<EpochCurrencyRevenue_filter>>>;
  or?: InputMaybe<Array<InputMaybe<EpochCurrencyRevenue_filter>>>;
};

export type EpochCurrencyRevenue_orderBy =
  | 'id'
  | 'year'
  | 'month'
  | 'currency'
  | 'totalAmount'
  | 'callsWithProtocolFee';

export type FeeMethodology =
  | 'ADDED_TO_AMOUNT'
  | 'CUT_TO_AMOUNT';

export type FeeParamsForContract = {
  id: Scalars['Bytes'];
  feeRecipient: Scalars['Bytes'];
  feeBps: Scalars['BigInt'];
  lastUpdateTimestamp: Scalars['BigInt'];
};

export type FeeParamsForContract_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  feeRecipient?: InputMaybe<Scalars['Bytes']>;
  feeRecipient_not?: InputMaybe<Scalars['Bytes']>;
  feeRecipient_gt?: InputMaybe<Scalars['Bytes']>;
  feeRecipient_lt?: InputMaybe<Scalars['Bytes']>;
  feeRecipient_gte?: InputMaybe<Scalars['Bytes']>;
  feeRecipient_lte?: InputMaybe<Scalars['Bytes']>;
  feeRecipient_in?: InputMaybe<Array<Scalars['Bytes']>>;
  feeRecipient_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  feeRecipient_contains?: InputMaybe<Scalars['Bytes']>;
  feeRecipient_not_contains?: InputMaybe<Scalars['Bytes']>;
  feeBps?: InputMaybe<Scalars['BigInt']>;
  feeBps_not?: InputMaybe<Scalars['BigInt']>;
  feeBps_gt?: InputMaybe<Scalars['BigInt']>;
  feeBps_lt?: InputMaybe<Scalars['BigInt']>;
  feeBps_gte?: InputMaybe<Scalars['BigInt']>;
  feeBps_lte?: InputMaybe<Scalars['BigInt']>;
  feeBps_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feeBps_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdateTimestamp?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdateTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<FeeParamsForContract_filter>>>;
  or?: InputMaybe<Array<InputMaybe<FeeParamsForContract_filter>>>;
};

export type FeeParamsForContract_orderBy =
  | 'id'
  | 'feeRecipient'
  | 'feeBps'
  | 'lastUpdateTimestamp';

export type FeeUpdate = {
  id: Scalars['Bytes'];
  feeRecipient: Scalars['Bytes'];
  feeBps: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type FeeUpdate_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  feeRecipient?: InputMaybe<Scalars['Bytes']>;
  feeRecipient_not?: InputMaybe<Scalars['Bytes']>;
  feeRecipient_gt?: InputMaybe<Scalars['Bytes']>;
  feeRecipient_lt?: InputMaybe<Scalars['Bytes']>;
  feeRecipient_gte?: InputMaybe<Scalars['Bytes']>;
  feeRecipient_lte?: InputMaybe<Scalars['Bytes']>;
  feeRecipient_in?: InputMaybe<Array<Scalars['Bytes']>>;
  feeRecipient_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  feeRecipient_contains?: InputMaybe<Scalars['Bytes']>;
  feeRecipient_not_contains?: InputMaybe<Scalars['Bytes']>;
  feeBps?: InputMaybe<Scalars['BigInt']>;
  feeBps_not?: InputMaybe<Scalars['BigInt']>;
  feeBps_gt?: InputMaybe<Scalars['BigInt']>;
  feeBps_lt?: InputMaybe<Scalars['BigInt']>;
  feeBps_gte?: InputMaybe<Scalars['BigInt']>;
  feeBps_lte?: InputMaybe<Scalars['BigInt']>;
  feeBps_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feeBps_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<FeeUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<FeeUpdate_filter>>>;
};

export type FeeUpdate_orderBy =
  | 'id'
  | 'feeRecipient'
  | 'feeBps'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type ListingAdded = {
  id: Scalars['Bytes'];
  listingId: Scalars['BigInt'];
  assetContract: Scalars['Bytes'];
  lister: Scalars['Bytes'];
  listing_listingId: Scalars['BigInt'];
  listing_tokenOwner: Scalars['Bytes'];
  listing_assetContract: Scalars['Bytes'];
  listing_tokenId: Scalars['BigInt'];
  listing_startTime: Scalars['BigInt'];
  listing_endTime: Scalars['BigInt'];
  listing_quantity: Scalars['BigInt'];
  listing_currency: Scalars['Bytes'];
  listing_reservePricePerToken: Scalars['BigInt'];
  listing_buyoutPricePerToken: Scalars['BigInt'];
  listing_tokenType: Scalars['Int'];
  listing_transferType: Scalars['Int'];
  listing_rentalExpirationTimestamp: Scalars['BigInt'];
  listing_listingType: Scalars['Int'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type ListingAdded_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  listingId?: InputMaybe<Scalars['BigInt']>;
  listingId_not?: InputMaybe<Scalars['BigInt']>;
  listingId_gt?: InputMaybe<Scalars['BigInt']>;
  listingId_lt?: InputMaybe<Scalars['BigInt']>;
  listingId_gte?: InputMaybe<Scalars['BigInt']>;
  listingId_lte?: InputMaybe<Scalars['BigInt']>;
  listingId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  listingId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetContract?: InputMaybe<Scalars['Bytes']>;
  assetContract_not?: InputMaybe<Scalars['Bytes']>;
  assetContract_gt?: InputMaybe<Scalars['Bytes']>;
  assetContract_lt?: InputMaybe<Scalars['Bytes']>;
  assetContract_gte?: InputMaybe<Scalars['Bytes']>;
  assetContract_lte?: InputMaybe<Scalars['Bytes']>;
  assetContract_in?: InputMaybe<Array<Scalars['Bytes']>>;
  assetContract_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  assetContract_contains?: InputMaybe<Scalars['Bytes']>;
  assetContract_not_contains?: InputMaybe<Scalars['Bytes']>;
  lister?: InputMaybe<Scalars['Bytes']>;
  lister_not?: InputMaybe<Scalars['Bytes']>;
  lister_gt?: InputMaybe<Scalars['Bytes']>;
  lister_lt?: InputMaybe<Scalars['Bytes']>;
  lister_gte?: InputMaybe<Scalars['Bytes']>;
  lister_lte?: InputMaybe<Scalars['Bytes']>;
  lister_in?: InputMaybe<Array<Scalars['Bytes']>>;
  lister_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  lister_contains?: InputMaybe<Scalars['Bytes']>;
  lister_not_contains?: InputMaybe<Scalars['Bytes']>;
  listing_listingId?: InputMaybe<Scalars['BigInt']>;
  listing_listingId_not?: InputMaybe<Scalars['BigInt']>;
  listing_listingId_gt?: InputMaybe<Scalars['BigInt']>;
  listing_listingId_lt?: InputMaybe<Scalars['BigInt']>;
  listing_listingId_gte?: InputMaybe<Scalars['BigInt']>;
  listing_listingId_lte?: InputMaybe<Scalars['BigInt']>;
  listing_listingId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  listing_listingId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  listing_tokenOwner?: InputMaybe<Scalars['Bytes']>;
  listing_tokenOwner_not?: InputMaybe<Scalars['Bytes']>;
  listing_tokenOwner_gt?: InputMaybe<Scalars['Bytes']>;
  listing_tokenOwner_lt?: InputMaybe<Scalars['Bytes']>;
  listing_tokenOwner_gte?: InputMaybe<Scalars['Bytes']>;
  listing_tokenOwner_lte?: InputMaybe<Scalars['Bytes']>;
  listing_tokenOwner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  listing_tokenOwner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  listing_tokenOwner_contains?: InputMaybe<Scalars['Bytes']>;
  listing_tokenOwner_not_contains?: InputMaybe<Scalars['Bytes']>;
  listing_assetContract?: InputMaybe<Scalars['Bytes']>;
  listing_assetContract_not?: InputMaybe<Scalars['Bytes']>;
  listing_assetContract_gt?: InputMaybe<Scalars['Bytes']>;
  listing_assetContract_lt?: InputMaybe<Scalars['Bytes']>;
  listing_assetContract_gte?: InputMaybe<Scalars['Bytes']>;
  listing_assetContract_lte?: InputMaybe<Scalars['Bytes']>;
  listing_assetContract_in?: InputMaybe<Array<Scalars['Bytes']>>;
  listing_assetContract_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  listing_assetContract_contains?: InputMaybe<Scalars['Bytes']>;
  listing_assetContract_not_contains?: InputMaybe<Scalars['Bytes']>;
  listing_tokenId?: InputMaybe<Scalars['BigInt']>;
  listing_tokenId_not?: InputMaybe<Scalars['BigInt']>;
  listing_tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  listing_tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  listing_tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  listing_tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  listing_tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  listing_tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  listing_startTime?: InputMaybe<Scalars['BigInt']>;
  listing_startTime_not?: InputMaybe<Scalars['BigInt']>;
  listing_startTime_gt?: InputMaybe<Scalars['BigInt']>;
  listing_startTime_lt?: InputMaybe<Scalars['BigInt']>;
  listing_startTime_gte?: InputMaybe<Scalars['BigInt']>;
  listing_startTime_lte?: InputMaybe<Scalars['BigInt']>;
  listing_startTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  listing_startTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  listing_endTime?: InputMaybe<Scalars['BigInt']>;
  listing_endTime_not?: InputMaybe<Scalars['BigInt']>;
  listing_endTime_gt?: InputMaybe<Scalars['BigInt']>;
  listing_endTime_lt?: InputMaybe<Scalars['BigInt']>;
  listing_endTime_gte?: InputMaybe<Scalars['BigInt']>;
  listing_endTime_lte?: InputMaybe<Scalars['BigInt']>;
  listing_endTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  listing_endTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  listing_quantity?: InputMaybe<Scalars['BigInt']>;
  listing_quantity_not?: InputMaybe<Scalars['BigInt']>;
  listing_quantity_gt?: InputMaybe<Scalars['BigInt']>;
  listing_quantity_lt?: InputMaybe<Scalars['BigInt']>;
  listing_quantity_gte?: InputMaybe<Scalars['BigInt']>;
  listing_quantity_lte?: InputMaybe<Scalars['BigInt']>;
  listing_quantity_in?: InputMaybe<Array<Scalars['BigInt']>>;
  listing_quantity_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  listing_currency?: InputMaybe<Scalars['Bytes']>;
  listing_currency_not?: InputMaybe<Scalars['Bytes']>;
  listing_currency_gt?: InputMaybe<Scalars['Bytes']>;
  listing_currency_lt?: InputMaybe<Scalars['Bytes']>;
  listing_currency_gte?: InputMaybe<Scalars['Bytes']>;
  listing_currency_lte?: InputMaybe<Scalars['Bytes']>;
  listing_currency_in?: InputMaybe<Array<Scalars['Bytes']>>;
  listing_currency_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  listing_currency_contains?: InputMaybe<Scalars['Bytes']>;
  listing_currency_not_contains?: InputMaybe<Scalars['Bytes']>;
  listing_reservePricePerToken?: InputMaybe<Scalars['BigInt']>;
  listing_reservePricePerToken_not?: InputMaybe<Scalars['BigInt']>;
  listing_reservePricePerToken_gt?: InputMaybe<Scalars['BigInt']>;
  listing_reservePricePerToken_lt?: InputMaybe<Scalars['BigInt']>;
  listing_reservePricePerToken_gte?: InputMaybe<Scalars['BigInt']>;
  listing_reservePricePerToken_lte?: InputMaybe<Scalars['BigInt']>;
  listing_reservePricePerToken_in?: InputMaybe<Array<Scalars['BigInt']>>;
  listing_reservePricePerToken_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  listing_buyoutPricePerToken?: InputMaybe<Scalars['BigInt']>;
  listing_buyoutPricePerToken_not?: InputMaybe<Scalars['BigInt']>;
  listing_buyoutPricePerToken_gt?: InputMaybe<Scalars['BigInt']>;
  listing_buyoutPricePerToken_lt?: InputMaybe<Scalars['BigInt']>;
  listing_buyoutPricePerToken_gte?: InputMaybe<Scalars['BigInt']>;
  listing_buyoutPricePerToken_lte?: InputMaybe<Scalars['BigInt']>;
  listing_buyoutPricePerToken_in?: InputMaybe<Array<Scalars['BigInt']>>;
  listing_buyoutPricePerToken_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  listing_tokenType?: InputMaybe<Scalars['Int']>;
  listing_tokenType_not?: InputMaybe<Scalars['Int']>;
  listing_tokenType_gt?: InputMaybe<Scalars['Int']>;
  listing_tokenType_lt?: InputMaybe<Scalars['Int']>;
  listing_tokenType_gte?: InputMaybe<Scalars['Int']>;
  listing_tokenType_lte?: InputMaybe<Scalars['Int']>;
  listing_tokenType_in?: InputMaybe<Array<Scalars['Int']>>;
  listing_tokenType_not_in?: InputMaybe<Array<Scalars['Int']>>;
  listing_transferType?: InputMaybe<Scalars['Int']>;
  listing_transferType_not?: InputMaybe<Scalars['Int']>;
  listing_transferType_gt?: InputMaybe<Scalars['Int']>;
  listing_transferType_lt?: InputMaybe<Scalars['Int']>;
  listing_transferType_gte?: InputMaybe<Scalars['Int']>;
  listing_transferType_lte?: InputMaybe<Scalars['Int']>;
  listing_transferType_in?: InputMaybe<Array<Scalars['Int']>>;
  listing_transferType_not_in?: InputMaybe<Array<Scalars['Int']>>;
  listing_rentalExpirationTimestamp?: InputMaybe<Scalars['BigInt']>;
  listing_rentalExpirationTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  listing_rentalExpirationTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  listing_rentalExpirationTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  listing_rentalExpirationTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  listing_rentalExpirationTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  listing_rentalExpirationTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  listing_rentalExpirationTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  listing_listingType?: InputMaybe<Scalars['Int']>;
  listing_listingType_not?: InputMaybe<Scalars['Int']>;
  listing_listingType_gt?: InputMaybe<Scalars['Int']>;
  listing_listingType_lt?: InputMaybe<Scalars['Int']>;
  listing_listingType_gte?: InputMaybe<Scalars['Int']>;
  listing_listingType_lte?: InputMaybe<Scalars['Int']>;
  listing_listingType_in?: InputMaybe<Array<Scalars['Int']>>;
  listing_listingType_not_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ListingAdded_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ListingAdded_filter>>>;
};

export type ListingAdded_orderBy =
  | 'id'
  | 'listingId'
  | 'assetContract'
  | 'lister'
  | 'listing_listingId'
  | 'listing_tokenOwner'
  | 'listing_assetContract'
  | 'listing_tokenId'
  | 'listing_startTime'
  | 'listing_endTime'
  | 'listing_quantity'
  | 'listing_currency'
  | 'listing_reservePricePerToken'
  | 'listing_buyoutPricePerToken'
  | 'listing_tokenType'
  | 'listing_transferType'
  | 'listing_rentalExpirationTimestamp'
  | 'listing_listingType'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type ListingRemoved = {
  id: Scalars['Bytes'];
  listingId: Scalars['BigInt'];
  listingCreator: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type ListingRemoved_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  listingId?: InputMaybe<Scalars['BigInt']>;
  listingId_not?: InputMaybe<Scalars['BigInt']>;
  listingId_gt?: InputMaybe<Scalars['BigInt']>;
  listingId_lt?: InputMaybe<Scalars['BigInt']>;
  listingId_gte?: InputMaybe<Scalars['BigInt']>;
  listingId_lte?: InputMaybe<Scalars['BigInt']>;
  listingId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  listingId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  listingCreator?: InputMaybe<Scalars['Bytes']>;
  listingCreator_not?: InputMaybe<Scalars['Bytes']>;
  listingCreator_gt?: InputMaybe<Scalars['Bytes']>;
  listingCreator_lt?: InputMaybe<Scalars['Bytes']>;
  listingCreator_gte?: InputMaybe<Scalars['Bytes']>;
  listingCreator_lte?: InputMaybe<Scalars['Bytes']>;
  listingCreator_in?: InputMaybe<Array<Scalars['Bytes']>>;
  listingCreator_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  listingCreator_contains?: InputMaybe<Scalars['Bytes']>;
  listingCreator_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ListingRemoved_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ListingRemoved_filter>>>;
};

export type ListingRemoved_orderBy =
  | 'id'
  | 'listingId'
  | 'listingCreator'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type ListingType =
  | 'Direct'
  | 'Auction';

export type ListingUpdated = {
  id: Scalars['Bytes'];
  listingId: Scalars['BigInt'];
  listingCreator: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type ListingUpdated_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  listingId?: InputMaybe<Scalars['BigInt']>;
  listingId_not?: InputMaybe<Scalars['BigInt']>;
  listingId_gt?: InputMaybe<Scalars['BigInt']>;
  listingId_lt?: InputMaybe<Scalars['BigInt']>;
  listingId_gte?: InputMaybe<Scalars['BigInt']>;
  listingId_lte?: InputMaybe<Scalars['BigInt']>;
  listingId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  listingId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  listingCreator?: InputMaybe<Scalars['Bytes']>;
  listingCreator_not?: InputMaybe<Scalars['Bytes']>;
  listingCreator_gt?: InputMaybe<Scalars['Bytes']>;
  listingCreator_lt?: InputMaybe<Scalars['Bytes']>;
  listingCreator_gte?: InputMaybe<Scalars['Bytes']>;
  listingCreator_lte?: InputMaybe<Scalars['Bytes']>;
  listingCreator_in?: InputMaybe<Array<Scalars['Bytes']>>;
  listingCreator_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  listingCreator_contains?: InputMaybe<Scalars['Bytes']>;
  listingCreator_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ListingUpdated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ListingUpdated_filter>>>;
};

export type ListingUpdated_orderBy =
  | 'id'
  | 'listingId'
  | 'listingCreator'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type MarketplaceBid = {
  id: Scalars['Bytes'];
  listing: MarketplaceListing;
  bidder: Scalars['Bytes'];
  quantity: Scalars['BigInt'];
  totalBidAmount: Scalars['BigInt'];
  currency: Scalars['Bytes'];
  status: Status;
  creationTxHash: Scalars['Bytes'];
  revenueTransaction?: Maybe<RevenueTransaction>;
  creationTimestamp: Scalars['BigInt'];
  lastUpdateTimestamp: Scalars['BigInt'];
  feeMethodology?: Maybe<FeeMethodology>;
  amountSentToProtocol?: Maybe<Scalars['BigInt']>;
  protocolRecipient?: Maybe<Scalars['Bytes']>;
  amountSentToSeller?: Maybe<Scalars['BigInt']>;
  sellerRecipient?: Maybe<Scalars['Bytes']>;
  amountSentToCreator?: Maybe<Scalars['BigInt']>;
  creatorRecipient?: Maybe<Scalars['Bytes']>;
};

export type MarketplaceBid_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  listing?: InputMaybe<Scalars['String']>;
  listing_not?: InputMaybe<Scalars['String']>;
  listing_gt?: InputMaybe<Scalars['String']>;
  listing_lt?: InputMaybe<Scalars['String']>;
  listing_gte?: InputMaybe<Scalars['String']>;
  listing_lte?: InputMaybe<Scalars['String']>;
  listing_in?: InputMaybe<Array<Scalars['String']>>;
  listing_not_in?: InputMaybe<Array<Scalars['String']>>;
  listing_contains?: InputMaybe<Scalars['String']>;
  listing_contains_nocase?: InputMaybe<Scalars['String']>;
  listing_not_contains?: InputMaybe<Scalars['String']>;
  listing_not_contains_nocase?: InputMaybe<Scalars['String']>;
  listing_starts_with?: InputMaybe<Scalars['String']>;
  listing_starts_with_nocase?: InputMaybe<Scalars['String']>;
  listing_not_starts_with?: InputMaybe<Scalars['String']>;
  listing_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  listing_ends_with?: InputMaybe<Scalars['String']>;
  listing_ends_with_nocase?: InputMaybe<Scalars['String']>;
  listing_not_ends_with?: InputMaybe<Scalars['String']>;
  listing_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  listing_?: InputMaybe<MarketplaceListing_filter>;
  bidder?: InputMaybe<Scalars['Bytes']>;
  bidder_not?: InputMaybe<Scalars['Bytes']>;
  bidder_gt?: InputMaybe<Scalars['Bytes']>;
  bidder_lt?: InputMaybe<Scalars['Bytes']>;
  bidder_gte?: InputMaybe<Scalars['Bytes']>;
  bidder_lte?: InputMaybe<Scalars['Bytes']>;
  bidder_in?: InputMaybe<Array<Scalars['Bytes']>>;
  bidder_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  bidder_contains?: InputMaybe<Scalars['Bytes']>;
  bidder_not_contains?: InputMaybe<Scalars['Bytes']>;
  quantity?: InputMaybe<Scalars['BigInt']>;
  quantity_not?: InputMaybe<Scalars['BigInt']>;
  quantity_gt?: InputMaybe<Scalars['BigInt']>;
  quantity_lt?: InputMaybe<Scalars['BigInt']>;
  quantity_gte?: InputMaybe<Scalars['BigInt']>;
  quantity_lte?: InputMaybe<Scalars['BigInt']>;
  quantity_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quantity_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalBidAmount?: InputMaybe<Scalars['BigInt']>;
  totalBidAmount_not?: InputMaybe<Scalars['BigInt']>;
  totalBidAmount_gt?: InputMaybe<Scalars['BigInt']>;
  totalBidAmount_lt?: InputMaybe<Scalars['BigInt']>;
  totalBidAmount_gte?: InputMaybe<Scalars['BigInt']>;
  totalBidAmount_lte?: InputMaybe<Scalars['BigInt']>;
  totalBidAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalBidAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currency?: InputMaybe<Scalars['Bytes']>;
  currency_not?: InputMaybe<Scalars['Bytes']>;
  currency_gt?: InputMaybe<Scalars['Bytes']>;
  currency_lt?: InputMaybe<Scalars['Bytes']>;
  currency_gte?: InputMaybe<Scalars['Bytes']>;
  currency_lte?: InputMaybe<Scalars['Bytes']>;
  currency_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currency_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currency_contains?: InputMaybe<Scalars['Bytes']>;
  currency_not_contains?: InputMaybe<Scalars['Bytes']>;
  status?: InputMaybe<Status>;
  status_not?: InputMaybe<Status>;
  status_in?: InputMaybe<Array<Status>>;
  status_not_in?: InputMaybe<Array<Status>>;
  creationTxHash?: InputMaybe<Scalars['Bytes']>;
  creationTxHash_not?: InputMaybe<Scalars['Bytes']>;
  creationTxHash_gt?: InputMaybe<Scalars['Bytes']>;
  creationTxHash_lt?: InputMaybe<Scalars['Bytes']>;
  creationTxHash_gte?: InputMaybe<Scalars['Bytes']>;
  creationTxHash_lte?: InputMaybe<Scalars['Bytes']>;
  creationTxHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  creationTxHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  creationTxHash_contains?: InputMaybe<Scalars['Bytes']>;
  creationTxHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  revenueTransaction?: InputMaybe<Scalars['String']>;
  revenueTransaction_not?: InputMaybe<Scalars['String']>;
  revenueTransaction_gt?: InputMaybe<Scalars['String']>;
  revenueTransaction_lt?: InputMaybe<Scalars['String']>;
  revenueTransaction_gte?: InputMaybe<Scalars['String']>;
  revenueTransaction_lte?: InputMaybe<Scalars['String']>;
  revenueTransaction_in?: InputMaybe<Array<Scalars['String']>>;
  revenueTransaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  revenueTransaction_contains?: InputMaybe<Scalars['String']>;
  revenueTransaction_contains_nocase?: InputMaybe<Scalars['String']>;
  revenueTransaction_not_contains?: InputMaybe<Scalars['String']>;
  revenueTransaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  revenueTransaction_starts_with?: InputMaybe<Scalars['String']>;
  revenueTransaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  revenueTransaction_not_starts_with?: InputMaybe<Scalars['String']>;
  revenueTransaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  revenueTransaction_ends_with?: InputMaybe<Scalars['String']>;
  revenueTransaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  revenueTransaction_not_ends_with?: InputMaybe<Scalars['String']>;
  revenueTransaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  revenueTransaction_?: InputMaybe<RevenueTransaction_filter>;
  creationTimestamp?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  creationTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdateTimestamp?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdateTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feeMethodology?: InputMaybe<FeeMethodology>;
  feeMethodology_not?: InputMaybe<FeeMethodology>;
  feeMethodology_in?: InputMaybe<Array<FeeMethodology>>;
  feeMethodology_not_in?: InputMaybe<Array<FeeMethodology>>;
  amountSentToProtocol?: InputMaybe<Scalars['BigInt']>;
  amountSentToProtocol_not?: InputMaybe<Scalars['BigInt']>;
  amountSentToProtocol_gt?: InputMaybe<Scalars['BigInt']>;
  amountSentToProtocol_lt?: InputMaybe<Scalars['BigInt']>;
  amountSentToProtocol_gte?: InputMaybe<Scalars['BigInt']>;
  amountSentToProtocol_lte?: InputMaybe<Scalars['BigInt']>;
  amountSentToProtocol_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amountSentToProtocol_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  protocolRecipient?: InputMaybe<Scalars['Bytes']>;
  protocolRecipient_not?: InputMaybe<Scalars['Bytes']>;
  protocolRecipient_gt?: InputMaybe<Scalars['Bytes']>;
  protocolRecipient_lt?: InputMaybe<Scalars['Bytes']>;
  protocolRecipient_gte?: InputMaybe<Scalars['Bytes']>;
  protocolRecipient_lte?: InputMaybe<Scalars['Bytes']>;
  protocolRecipient_in?: InputMaybe<Array<Scalars['Bytes']>>;
  protocolRecipient_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  protocolRecipient_contains?: InputMaybe<Scalars['Bytes']>;
  protocolRecipient_not_contains?: InputMaybe<Scalars['Bytes']>;
  amountSentToSeller?: InputMaybe<Scalars['BigInt']>;
  amountSentToSeller_not?: InputMaybe<Scalars['BigInt']>;
  amountSentToSeller_gt?: InputMaybe<Scalars['BigInt']>;
  amountSentToSeller_lt?: InputMaybe<Scalars['BigInt']>;
  amountSentToSeller_gte?: InputMaybe<Scalars['BigInt']>;
  amountSentToSeller_lte?: InputMaybe<Scalars['BigInt']>;
  amountSentToSeller_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amountSentToSeller_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sellerRecipient?: InputMaybe<Scalars['Bytes']>;
  sellerRecipient_not?: InputMaybe<Scalars['Bytes']>;
  sellerRecipient_gt?: InputMaybe<Scalars['Bytes']>;
  sellerRecipient_lt?: InputMaybe<Scalars['Bytes']>;
  sellerRecipient_gte?: InputMaybe<Scalars['Bytes']>;
  sellerRecipient_lte?: InputMaybe<Scalars['Bytes']>;
  sellerRecipient_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sellerRecipient_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sellerRecipient_contains?: InputMaybe<Scalars['Bytes']>;
  sellerRecipient_not_contains?: InputMaybe<Scalars['Bytes']>;
  amountSentToCreator?: InputMaybe<Scalars['BigInt']>;
  amountSentToCreator_not?: InputMaybe<Scalars['BigInt']>;
  amountSentToCreator_gt?: InputMaybe<Scalars['BigInt']>;
  amountSentToCreator_lt?: InputMaybe<Scalars['BigInt']>;
  amountSentToCreator_gte?: InputMaybe<Scalars['BigInt']>;
  amountSentToCreator_lte?: InputMaybe<Scalars['BigInt']>;
  amountSentToCreator_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amountSentToCreator_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  creatorRecipient?: InputMaybe<Scalars['Bytes']>;
  creatorRecipient_not?: InputMaybe<Scalars['Bytes']>;
  creatorRecipient_gt?: InputMaybe<Scalars['Bytes']>;
  creatorRecipient_lt?: InputMaybe<Scalars['Bytes']>;
  creatorRecipient_gte?: InputMaybe<Scalars['Bytes']>;
  creatorRecipient_lte?: InputMaybe<Scalars['Bytes']>;
  creatorRecipient_in?: InputMaybe<Array<Scalars['Bytes']>>;
  creatorRecipient_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  creatorRecipient_contains?: InputMaybe<Scalars['Bytes']>;
  creatorRecipient_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MarketplaceBid_filter>>>;
  or?: InputMaybe<Array<InputMaybe<MarketplaceBid_filter>>>;
};

export type MarketplaceBid_orderBy =
  | 'id'
  | 'listing'
  | 'listing__id'
  | 'listing__listingType'
  | 'listing__lister'
  | 'listing__startTime'
  | 'listing__endTime'
  | 'listing__quantity'
  | 'listing__currency'
  | 'listing__reservePricePerToken'
  | 'listing__buyoutPricePerToken'
  | 'listing__tokenType'
  | 'listing__transferType'
  | 'listing__rentalExpirationTimestamp'
  | 'listing__status'
  | 'listing__creationTimestamp'
  | 'listing__lastUpdateTimestamp'
  | 'bidder'
  | 'quantity'
  | 'totalBidAmount'
  | 'currency'
  | 'status'
  | 'creationTxHash'
  | 'revenueTransaction'
  | 'revenueTransaction__id'
  | 'revenueTransaction__blockTimestamp'
  | 'creationTimestamp'
  | 'lastUpdateTimestamp'
  | 'feeMethodology'
  | 'amountSentToProtocol'
  | 'protocolRecipient'
  | 'amountSentToSeller'
  | 'sellerRecipient'
  | 'amountSentToCreator'
  | 'creatorRecipient';

export type MarketplaceDirectBuy = {
  id: Scalars['Bytes'];
  listing: MarketplaceListing;
  buyer: Scalars['Bytes'];
  quantityBought: Scalars['BigInt'];
  totalPricePaid: Scalars['BigInt'];
  revenueTransaction: RevenueTransaction;
  feeMethodology?: Maybe<FeeMethodology>;
  amountSentToProtocol?: Maybe<Scalars['BigInt']>;
  protocolRecipient?: Maybe<Scalars['Bytes']>;
  amountSentToSeller?: Maybe<Scalars['BigInt']>;
  sellerRecipient?: Maybe<Scalars['Bytes']>;
  amountSentToCreator?: Maybe<Scalars['BigInt']>;
  creatorRecipient?: Maybe<Scalars['Bytes']>;
};

export type MarketplaceDirectBuy_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  listing?: InputMaybe<Scalars['String']>;
  listing_not?: InputMaybe<Scalars['String']>;
  listing_gt?: InputMaybe<Scalars['String']>;
  listing_lt?: InputMaybe<Scalars['String']>;
  listing_gte?: InputMaybe<Scalars['String']>;
  listing_lte?: InputMaybe<Scalars['String']>;
  listing_in?: InputMaybe<Array<Scalars['String']>>;
  listing_not_in?: InputMaybe<Array<Scalars['String']>>;
  listing_contains?: InputMaybe<Scalars['String']>;
  listing_contains_nocase?: InputMaybe<Scalars['String']>;
  listing_not_contains?: InputMaybe<Scalars['String']>;
  listing_not_contains_nocase?: InputMaybe<Scalars['String']>;
  listing_starts_with?: InputMaybe<Scalars['String']>;
  listing_starts_with_nocase?: InputMaybe<Scalars['String']>;
  listing_not_starts_with?: InputMaybe<Scalars['String']>;
  listing_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  listing_ends_with?: InputMaybe<Scalars['String']>;
  listing_ends_with_nocase?: InputMaybe<Scalars['String']>;
  listing_not_ends_with?: InputMaybe<Scalars['String']>;
  listing_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  listing_?: InputMaybe<MarketplaceListing_filter>;
  buyer?: InputMaybe<Scalars['Bytes']>;
  buyer_not?: InputMaybe<Scalars['Bytes']>;
  buyer_gt?: InputMaybe<Scalars['Bytes']>;
  buyer_lt?: InputMaybe<Scalars['Bytes']>;
  buyer_gte?: InputMaybe<Scalars['Bytes']>;
  buyer_lte?: InputMaybe<Scalars['Bytes']>;
  buyer_in?: InputMaybe<Array<Scalars['Bytes']>>;
  buyer_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  buyer_contains?: InputMaybe<Scalars['Bytes']>;
  buyer_not_contains?: InputMaybe<Scalars['Bytes']>;
  quantityBought?: InputMaybe<Scalars['BigInt']>;
  quantityBought_not?: InputMaybe<Scalars['BigInt']>;
  quantityBought_gt?: InputMaybe<Scalars['BigInt']>;
  quantityBought_lt?: InputMaybe<Scalars['BigInt']>;
  quantityBought_gte?: InputMaybe<Scalars['BigInt']>;
  quantityBought_lte?: InputMaybe<Scalars['BigInt']>;
  quantityBought_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quantityBought_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalPricePaid?: InputMaybe<Scalars['BigInt']>;
  totalPricePaid_not?: InputMaybe<Scalars['BigInt']>;
  totalPricePaid_gt?: InputMaybe<Scalars['BigInt']>;
  totalPricePaid_lt?: InputMaybe<Scalars['BigInt']>;
  totalPricePaid_gte?: InputMaybe<Scalars['BigInt']>;
  totalPricePaid_lte?: InputMaybe<Scalars['BigInt']>;
  totalPricePaid_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalPricePaid_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  revenueTransaction?: InputMaybe<Scalars['String']>;
  revenueTransaction_not?: InputMaybe<Scalars['String']>;
  revenueTransaction_gt?: InputMaybe<Scalars['String']>;
  revenueTransaction_lt?: InputMaybe<Scalars['String']>;
  revenueTransaction_gte?: InputMaybe<Scalars['String']>;
  revenueTransaction_lte?: InputMaybe<Scalars['String']>;
  revenueTransaction_in?: InputMaybe<Array<Scalars['String']>>;
  revenueTransaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  revenueTransaction_contains?: InputMaybe<Scalars['String']>;
  revenueTransaction_contains_nocase?: InputMaybe<Scalars['String']>;
  revenueTransaction_not_contains?: InputMaybe<Scalars['String']>;
  revenueTransaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  revenueTransaction_starts_with?: InputMaybe<Scalars['String']>;
  revenueTransaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  revenueTransaction_not_starts_with?: InputMaybe<Scalars['String']>;
  revenueTransaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  revenueTransaction_ends_with?: InputMaybe<Scalars['String']>;
  revenueTransaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  revenueTransaction_not_ends_with?: InputMaybe<Scalars['String']>;
  revenueTransaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  revenueTransaction_?: InputMaybe<RevenueTransaction_filter>;
  feeMethodology?: InputMaybe<FeeMethodology>;
  feeMethodology_not?: InputMaybe<FeeMethodology>;
  feeMethodology_in?: InputMaybe<Array<FeeMethodology>>;
  feeMethodology_not_in?: InputMaybe<Array<FeeMethodology>>;
  amountSentToProtocol?: InputMaybe<Scalars['BigInt']>;
  amountSentToProtocol_not?: InputMaybe<Scalars['BigInt']>;
  amountSentToProtocol_gt?: InputMaybe<Scalars['BigInt']>;
  amountSentToProtocol_lt?: InputMaybe<Scalars['BigInt']>;
  amountSentToProtocol_gte?: InputMaybe<Scalars['BigInt']>;
  amountSentToProtocol_lte?: InputMaybe<Scalars['BigInt']>;
  amountSentToProtocol_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amountSentToProtocol_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  protocolRecipient?: InputMaybe<Scalars['Bytes']>;
  protocolRecipient_not?: InputMaybe<Scalars['Bytes']>;
  protocolRecipient_gt?: InputMaybe<Scalars['Bytes']>;
  protocolRecipient_lt?: InputMaybe<Scalars['Bytes']>;
  protocolRecipient_gte?: InputMaybe<Scalars['Bytes']>;
  protocolRecipient_lte?: InputMaybe<Scalars['Bytes']>;
  protocolRecipient_in?: InputMaybe<Array<Scalars['Bytes']>>;
  protocolRecipient_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  protocolRecipient_contains?: InputMaybe<Scalars['Bytes']>;
  protocolRecipient_not_contains?: InputMaybe<Scalars['Bytes']>;
  amountSentToSeller?: InputMaybe<Scalars['BigInt']>;
  amountSentToSeller_not?: InputMaybe<Scalars['BigInt']>;
  amountSentToSeller_gt?: InputMaybe<Scalars['BigInt']>;
  amountSentToSeller_lt?: InputMaybe<Scalars['BigInt']>;
  amountSentToSeller_gte?: InputMaybe<Scalars['BigInt']>;
  amountSentToSeller_lte?: InputMaybe<Scalars['BigInt']>;
  amountSentToSeller_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amountSentToSeller_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sellerRecipient?: InputMaybe<Scalars['Bytes']>;
  sellerRecipient_not?: InputMaybe<Scalars['Bytes']>;
  sellerRecipient_gt?: InputMaybe<Scalars['Bytes']>;
  sellerRecipient_lt?: InputMaybe<Scalars['Bytes']>;
  sellerRecipient_gte?: InputMaybe<Scalars['Bytes']>;
  sellerRecipient_lte?: InputMaybe<Scalars['Bytes']>;
  sellerRecipient_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sellerRecipient_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sellerRecipient_contains?: InputMaybe<Scalars['Bytes']>;
  sellerRecipient_not_contains?: InputMaybe<Scalars['Bytes']>;
  amountSentToCreator?: InputMaybe<Scalars['BigInt']>;
  amountSentToCreator_not?: InputMaybe<Scalars['BigInt']>;
  amountSentToCreator_gt?: InputMaybe<Scalars['BigInt']>;
  amountSentToCreator_lt?: InputMaybe<Scalars['BigInt']>;
  amountSentToCreator_gte?: InputMaybe<Scalars['BigInt']>;
  amountSentToCreator_lte?: InputMaybe<Scalars['BigInt']>;
  amountSentToCreator_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amountSentToCreator_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  creatorRecipient?: InputMaybe<Scalars['Bytes']>;
  creatorRecipient_not?: InputMaybe<Scalars['Bytes']>;
  creatorRecipient_gt?: InputMaybe<Scalars['Bytes']>;
  creatorRecipient_lt?: InputMaybe<Scalars['Bytes']>;
  creatorRecipient_gte?: InputMaybe<Scalars['Bytes']>;
  creatorRecipient_lte?: InputMaybe<Scalars['Bytes']>;
  creatorRecipient_in?: InputMaybe<Array<Scalars['Bytes']>>;
  creatorRecipient_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  creatorRecipient_contains?: InputMaybe<Scalars['Bytes']>;
  creatorRecipient_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MarketplaceDirectBuy_filter>>>;
  or?: InputMaybe<Array<InputMaybe<MarketplaceDirectBuy_filter>>>;
};

export type MarketplaceDirectBuy_orderBy =
  | 'id'
  | 'listing'
  | 'listing__id'
  | 'listing__listingType'
  | 'listing__lister'
  | 'listing__startTime'
  | 'listing__endTime'
  | 'listing__quantity'
  | 'listing__currency'
  | 'listing__reservePricePerToken'
  | 'listing__buyoutPricePerToken'
  | 'listing__tokenType'
  | 'listing__transferType'
  | 'listing__rentalExpirationTimestamp'
  | 'listing__status'
  | 'listing__creationTimestamp'
  | 'listing__lastUpdateTimestamp'
  | 'buyer'
  | 'quantityBought'
  | 'totalPricePaid'
  | 'revenueTransaction'
  | 'revenueTransaction__id'
  | 'revenueTransaction__blockTimestamp'
  | 'feeMethodology'
  | 'amountSentToProtocol'
  | 'protocolRecipient'
  | 'amountSentToSeller'
  | 'sellerRecipient'
  | 'amountSentToCreator'
  | 'creatorRecipient';

export type MarketplaceListing = {
  id: Scalars['String'];
  listingType: ListingType;
  lister: Scalars['Bytes'];
  token: Token;
  startTime: Scalars['BigInt'];
  endTime: Scalars['BigInt'];
  quantity: Scalars['BigInt'];
  currency: Scalars['Bytes'];
  reservePricePerToken: Scalars['BigInt'];
  buyoutPricePerToken: Scalars['BigInt'];
  tokenType: TokenType;
  transferType: TransferType;
  rentalExpirationTimestamp: Scalars['BigInt'];
  status: Status;
  creationTimestamp: Scalars['BigInt'];
  lastUpdateTimestamp: Scalars['BigInt'];
  completedBid?: Maybe<MarketplaceBid>;
  bids?: Maybe<Array<MarketplaceBid>>;
  directBuys?: Maybe<Array<MarketplaceDirectBuy>>;
};


export type MarketplaceListingbidsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarketplaceBid_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MarketplaceBid_filter>;
};


export type MarketplaceListingdirectBuysArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarketplaceDirectBuy_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MarketplaceDirectBuy_filter>;
};

export type MarketplaceListing_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  listingType?: InputMaybe<ListingType>;
  listingType_not?: InputMaybe<ListingType>;
  listingType_in?: InputMaybe<Array<ListingType>>;
  listingType_not_in?: InputMaybe<Array<ListingType>>;
  lister?: InputMaybe<Scalars['Bytes']>;
  lister_not?: InputMaybe<Scalars['Bytes']>;
  lister_gt?: InputMaybe<Scalars['Bytes']>;
  lister_lt?: InputMaybe<Scalars['Bytes']>;
  lister_gte?: InputMaybe<Scalars['Bytes']>;
  lister_lte?: InputMaybe<Scalars['Bytes']>;
  lister_in?: InputMaybe<Array<Scalars['Bytes']>>;
  lister_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  lister_contains?: InputMaybe<Scalars['Bytes']>;
  lister_not_contains?: InputMaybe<Scalars['Bytes']>;
  token?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_?: InputMaybe<Token_filter>;
  startTime?: InputMaybe<Scalars['BigInt']>;
  startTime_not?: InputMaybe<Scalars['BigInt']>;
  startTime_gt?: InputMaybe<Scalars['BigInt']>;
  startTime_lt?: InputMaybe<Scalars['BigInt']>;
  startTime_gte?: InputMaybe<Scalars['BigInt']>;
  startTime_lte?: InputMaybe<Scalars['BigInt']>;
  startTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  startTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  endTime?: InputMaybe<Scalars['BigInt']>;
  endTime_not?: InputMaybe<Scalars['BigInt']>;
  endTime_gt?: InputMaybe<Scalars['BigInt']>;
  endTime_lt?: InputMaybe<Scalars['BigInt']>;
  endTime_gte?: InputMaybe<Scalars['BigInt']>;
  endTime_lte?: InputMaybe<Scalars['BigInt']>;
  endTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  endTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quantity?: InputMaybe<Scalars['BigInt']>;
  quantity_not?: InputMaybe<Scalars['BigInt']>;
  quantity_gt?: InputMaybe<Scalars['BigInt']>;
  quantity_lt?: InputMaybe<Scalars['BigInt']>;
  quantity_gte?: InputMaybe<Scalars['BigInt']>;
  quantity_lte?: InputMaybe<Scalars['BigInt']>;
  quantity_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quantity_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currency?: InputMaybe<Scalars['Bytes']>;
  currency_not?: InputMaybe<Scalars['Bytes']>;
  currency_gt?: InputMaybe<Scalars['Bytes']>;
  currency_lt?: InputMaybe<Scalars['Bytes']>;
  currency_gte?: InputMaybe<Scalars['Bytes']>;
  currency_lte?: InputMaybe<Scalars['Bytes']>;
  currency_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currency_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currency_contains?: InputMaybe<Scalars['Bytes']>;
  currency_not_contains?: InputMaybe<Scalars['Bytes']>;
  reservePricePerToken?: InputMaybe<Scalars['BigInt']>;
  reservePricePerToken_not?: InputMaybe<Scalars['BigInt']>;
  reservePricePerToken_gt?: InputMaybe<Scalars['BigInt']>;
  reservePricePerToken_lt?: InputMaybe<Scalars['BigInt']>;
  reservePricePerToken_gte?: InputMaybe<Scalars['BigInt']>;
  reservePricePerToken_lte?: InputMaybe<Scalars['BigInt']>;
  reservePricePerToken_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reservePricePerToken_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  buyoutPricePerToken?: InputMaybe<Scalars['BigInt']>;
  buyoutPricePerToken_not?: InputMaybe<Scalars['BigInt']>;
  buyoutPricePerToken_gt?: InputMaybe<Scalars['BigInt']>;
  buyoutPricePerToken_lt?: InputMaybe<Scalars['BigInt']>;
  buyoutPricePerToken_gte?: InputMaybe<Scalars['BigInt']>;
  buyoutPricePerToken_lte?: InputMaybe<Scalars['BigInt']>;
  buyoutPricePerToken_in?: InputMaybe<Array<Scalars['BigInt']>>;
  buyoutPricePerToken_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenType?: InputMaybe<TokenType>;
  tokenType_not?: InputMaybe<TokenType>;
  tokenType_in?: InputMaybe<Array<TokenType>>;
  tokenType_not_in?: InputMaybe<Array<TokenType>>;
  transferType?: InputMaybe<TransferType>;
  transferType_not?: InputMaybe<TransferType>;
  transferType_in?: InputMaybe<Array<TransferType>>;
  transferType_not_in?: InputMaybe<Array<TransferType>>;
  rentalExpirationTimestamp?: InputMaybe<Scalars['BigInt']>;
  rentalExpirationTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  rentalExpirationTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  rentalExpirationTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  rentalExpirationTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  rentalExpirationTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  rentalExpirationTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rentalExpirationTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<Status>;
  status_not?: InputMaybe<Status>;
  status_in?: InputMaybe<Array<Status>>;
  status_not_in?: InputMaybe<Array<Status>>;
  creationTimestamp?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  creationTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdateTimestamp?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdateTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  completedBid?: InputMaybe<Scalars['String']>;
  completedBid_not?: InputMaybe<Scalars['String']>;
  completedBid_gt?: InputMaybe<Scalars['String']>;
  completedBid_lt?: InputMaybe<Scalars['String']>;
  completedBid_gte?: InputMaybe<Scalars['String']>;
  completedBid_lte?: InputMaybe<Scalars['String']>;
  completedBid_in?: InputMaybe<Array<Scalars['String']>>;
  completedBid_not_in?: InputMaybe<Array<Scalars['String']>>;
  completedBid_contains?: InputMaybe<Scalars['String']>;
  completedBid_contains_nocase?: InputMaybe<Scalars['String']>;
  completedBid_not_contains?: InputMaybe<Scalars['String']>;
  completedBid_not_contains_nocase?: InputMaybe<Scalars['String']>;
  completedBid_starts_with?: InputMaybe<Scalars['String']>;
  completedBid_starts_with_nocase?: InputMaybe<Scalars['String']>;
  completedBid_not_starts_with?: InputMaybe<Scalars['String']>;
  completedBid_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  completedBid_ends_with?: InputMaybe<Scalars['String']>;
  completedBid_ends_with_nocase?: InputMaybe<Scalars['String']>;
  completedBid_not_ends_with?: InputMaybe<Scalars['String']>;
  completedBid_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  completedBid_?: InputMaybe<MarketplaceBid_filter>;
  bids_?: InputMaybe<MarketplaceBid_filter>;
  directBuys_?: InputMaybe<MarketplaceDirectBuy_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MarketplaceListing_filter>>>;
  or?: InputMaybe<Array<InputMaybe<MarketplaceListing_filter>>>;
};

export type MarketplaceListing_orderBy =
  | 'id'
  | 'listingType'
  | 'lister'
  | 'token'
  | 'token__id'
  | 'token__tokenId'
  | 'token__setInAllowList'
  | 'startTime'
  | 'endTime'
  | 'quantity'
  | 'currency'
  | 'reservePricePerToken'
  | 'buyoutPricePerToken'
  | 'tokenType'
  | 'transferType'
  | 'rentalExpirationTimestamp'
  | 'status'
  | 'creationTimestamp'
  | 'lastUpdateTimestamp'
  | 'completedBid'
  | 'completedBid__id'
  | 'completedBid__bidder'
  | 'completedBid__quantity'
  | 'completedBid__totalBidAmount'
  | 'completedBid__currency'
  | 'completedBid__status'
  | 'completedBid__creationTxHash'
  | 'completedBid__creationTimestamp'
  | 'completedBid__lastUpdateTimestamp'
  | 'completedBid__feeMethodology'
  | 'completedBid__amountSentToProtocol'
  | 'completedBid__protocolRecipient'
  | 'completedBid__amountSentToSeller'
  | 'completedBid__sellerRecipient'
  | 'completedBid__amountSentToCreator'
  | 'completedBid__creatorRecipient'
  | 'bids'
  | 'directBuys';

export type MarketplaceOffer = {
  id: Scalars['String'];
  offeror: Scalars['Bytes'];
  token: Token;
  quantity: Scalars['BigInt'];
  currency: Scalars['Bytes'];
  totalPrice: Scalars['BigInt'];
  tokenType: TokenType;
  transferType: TransferType;
  expirationTimestamp: Scalars['BigInt'];
  rentalExpirationTimestamp: Scalars['BigInt'];
  status: Status;
  revenueTransaction?: Maybe<RevenueTransaction>;
  referralAdditionalInformation?: Maybe<Scalars['String']>;
  creationTimestamp: Scalars['BigInt'];
  lastUpdateTimestamp: Scalars['BigInt'];
  feeMethodology?: Maybe<FeeMethodology>;
  amountSentToProtocol?: Maybe<Scalars['BigInt']>;
  protocolRecipient?: Maybe<Scalars['Bytes']>;
  amountSentToSeller?: Maybe<Scalars['BigInt']>;
  sellerRecipient?: Maybe<Scalars['Bytes']>;
  amountSentToCreator?: Maybe<Scalars['BigInt']>;
  creatorRecipient?: Maybe<Scalars['Bytes']>;
};

export type MarketplaceOffer_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  offeror?: InputMaybe<Scalars['Bytes']>;
  offeror_not?: InputMaybe<Scalars['Bytes']>;
  offeror_gt?: InputMaybe<Scalars['Bytes']>;
  offeror_lt?: InputMaybe<Scalars['Bytes']>;
  offeror_gte?: InputMaybe<Scalars['Bytes']>;
  offeror_lte?: InputMaybe<Scalars['Bytes']>;
  offeror_in?: InputMaybe<Array<Scalars['Bytes']>>;
  offeror_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  offeror_contains?: InputMaybe<Scalars['Bytes']>;
  offeror_not_contains?: InputMaybe<Scalars['Bytes']>;
  token?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_?: InputMaybe<Token_filter>;
  quantity?: InputMaybe<Scalars['BigInt']>;
  quantity_not?: InputMaybe<Scalars['BigInt']>;
  quantity_gt?: InputMaybe<Scalars['BigInt']>;
  quantity_lt?: InputMaybe<Scalars['BigInt']>;
  quantity_gte?: InputMaybe<Scalars['BigInt']>;
  quantity_lte?: InputMaybe<Scalars['BigInt']>;
  quantity_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quantity_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currency?: InputMaybe<Scalars['Bytes']>;
  currency_not?: InputMaybe<Scalars['Bytes']>;
  currency_gt?: InputMaybe<Scalars['Bytes']>;
  currency_lt?: InputMaybe<Scalars['Bytes']>;
  currency_gte?: InputMaybe<Scalars['Bytes']>;
  currency_lte?: InputMaybe<Scalars['Bytes']>;
  currency_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currency_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currency_contains?: InputMaybe<Scalars['Bytes']>;
  currency_not_contains?: InputMaybe<Scalars['Bytes']>;
  totalPrice?: InputMaybe<Scalars['BigInt']>;
  totalPrice_not?: InputMaybe<Scalars['BigInt']>;
  totalPrice_gt?: InputMaybe<Scalars['BigInt']>;
  totalPrice_lt?: InputMaybe<Scalars['BigInt']>;
  totalPrice_gte?: InputMaybe<Scalars['BigInt']>;
  totalPrice_lte?: InputMaybe<Scalars['BigInt']>;
  totalPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenType?: InputMaybe<TokenType>;
  tokenType_not?: InputMaybe<TokenType>;
  tokenType_in?: InputMaybe<Array<TokenType>>;
  tokenType_not_in?: InputMaybe<Array<TokenType>>;
  transferType?: InputMaybe<TransferType>;
  transferType_not?: InputMaybe<TransferType>;
  transferType_in?: InputMaybe<Array<TransferType>>;
  transferType_not_in?: InputMaybe<Array<TransferType>>;
  expirationTimestamp?: InputMaybe<Scalars['BigInt']>;
  expirationTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  expirationTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  expirationTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  expirationTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  expirationTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  expirationTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expirationTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rentalExpirationTimestamp?: InputMaybe<Scalars['BigInt']>;
  rentalExpirationTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  rentalExpirationTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  rentalExpirationTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  rentalExpirationTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  rentalExpirationTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  rentalExpirationTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rentalExpirationTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<Status>;
  status_not?: InputMaybe<Status>;
  status_in?: InputMaybe<Array<Status>>;
  status_not_in?: InputMaybe<Array<Status>>;
  revenueTransaction?: InputMaybe<Scalars['String']>;
  revenueTransaction_not?: InputMaybe<Scalars['String']>;
  revenueTransaction_gt?: InputMaybe<Scalars['String']>;
  revenueTransaction_lt?: InputMaybe<Scalars['String']>;
  revenueTransaction_gte?: InputMaybe<Scalars['String']>;
  revenueTransaction_lte?: InputMaybe<Scalars['String']>;
  revenueTransaction_in?: InputMaybe<Array<Scalars['String']>>;
  revenueTransaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  revenueTransaction_contains?: InputMaybe<Scalars['String']>;
  revenueTransaction_contains_nocase?: InputMaybe<Scalars['String']>;
  revenueTransaction_not_contains?: InputMaybe<Scalars['String']>;
  revenueTransaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  revenueTransaction_starts_with?: InputMaybe<Scalars['String']>;
  revenueTransaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  revenueTransaction_not_starts_with?: InputMaybe<Scalars['String']>;
  revenueTransaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  revenueTransaction_ends_with?: InputMaybe<Scalars['String']>;
  revenueTransaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  revenueTransaction_not_ends_with?: InputMaybe<Scalars['String']>;
  revenueTransaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  revenueTransaction_?: InputMaybe<RevenueTransaction_filter>;
  referralAdditionalInformation?: InputMaybe<Scalars['String']>;
  referralAdditionalInformation_not?: InputMaybe<Scalars['String']>;
  referralAdditionalInformation_gt?: InputMaybe<Scalars['String']>;
  referralAdditionalInformation_lt?: InputMaybe<Scalars['String']>;
  referralAdditionalInformation_gte?: InputMaybe<Scalars['String']>;
  referralAdditionalInformation_lte?: InputMaybe<Scalars['String']>;
  referralAdditionalInformation_in?: InputMaybe<Array<Scalars['String']>>;
  referralAdditionalInformation_not_in?: InputMaybe<Array<Scalars['String']>>;
  referralAdditionalInformation_contains?: InputMaybe<Scalars['String']>;
  referralAdditionalInformation_contains_nocase?: InputMaybe<Scalars['String']>;
  referralAdditionalInformation_not_contains?: InputMaybe<Scalars['String']>;
  referralAdditionalInformation_not_contains_nocase?: InputMaybe<Scalars['String']>;
  referralAdditionalInformation_starts_with?: InputMaybe<Scalars['String']>;
  referralAdditionalInformation_starts_with_nocase?: InputMaybe<Scalars['String']>;
  referralAdditionalInformation_not_starts_with?: InputMaybe<Scalars['String']>;
  referralAdditionalInformation_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  referralAdditionalInformation_ends_with?: InputMaybe<Scalars['String']>;
  referralAdditionalInformation_ends_with_nocase?: InputMaybe<Scalars['String']>;
  referralAdditionalInformation_not_ends_with?: InputMaybe<Scalars['String']>;
  referralAdditionalInformation_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  creationTimestamp?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  creationTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  creationTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdateTimestamp?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  lastUpdateTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastUpdateTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feeMethodology?: InputMaybe<FeeMethodology>;
  feeMethodology_not?: InputMaybe<FeeMethodology>;
  feeMethodology_in?: InputMaybe<Array<FeeMethodology>>;
  feeMethodology_not_in?: InputMaybe<Array<FeeMethodology>>;
  amountSentToProtocol?: InputMaybe<Scalars['BigInt']>;
  amountSentToProtocol_not?: InputMaybe<Scalars['BigInt']>;
  amountSentToProtocol_gt?: InputMaybe<Scalars['BigInt']>;
  amountSentToProtocol_lt?: InputMaybe<Scalars['BigInt']>;
  amountSentToProtocol_gte?: InputMaybe<Scalars['BigInt']>;
  amountSentToProtocol_lte?: InputMaybe<Scalars['BigInt']>;
  amountSentToProtocol_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amountSentToProtocol_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  protocolRecipient?: InputMaybe<Scalars['Bytes']>;
  protocolRecipient_not?: InputMaybe<Scalars['Bytes']>;
  protocolRecipient_gt?: InputMaybe<Scalars['Bytes']>;
  protocolRecipient_lt?: InputMaybe<Scalars['Bytes']>;
  protocolRecipient_gte?: InputMaybe<Scalars['Bytes']>;
  protocolRecipient_lte?: InputMaybe<Scalars['Bytes']>;
  protocolRecipient_in?: InputMaybe<Array<Scalars['Bytes']>>;
  protocolRecipient_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  protocolRecipient_contains?: InputMaybe<Scalars['Bytes']>;
  protocolRecipient_not_contains?: InputMaybe<Scalars['Bytes']>;
  amountSentToSeller?: InputMaybe<Scalars['BigInt']>;
  amountSentToSeller_not?: InputMaybe<Scalars['BigInt']>;
  amountSentToSeller_gt?: InputMaybe<Scalars['BigInt']>;
  amountSentToSeller_lt?: InputMaybe<Scalars['BigInt']>;
  amountSentToSeller_gte?: InputMaybe<Scalars['BigInt']>;
  amountSentToSeller_lte?: InputMaybe<Scalars['BigInt']>;
  amountSentToSeller_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amountSentToSeller_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sellerRecipient?: InputMaybe<Scalars['Bytes']>;
  sellerRecipient_not?: InputMaybe<Scalars['Bytes']>;
  sellerRecipient_gt?: InputMaybe<Scalars['Bytes']>;
  sellerRecipient_lt?: InputMaybe<Scalars['Bytes']>;
  sellerRecipient_gte?: InputMaybe<Scalars['Bytes']>;
  sellerRecipient_lte?: InputMaybe<Scalars['Bytes']>;
  sellerRecipient_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sellerRecipient_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sellerRecipient_contains?: InputMaybe<Scalars['Bytes']>;
  sellerRecipient_not_contains?: InputMaybe<Scalars['Bytes']>;
  amountSentToCreator?: InputMaybe<Scalars['BigInt']>;
  amountSentToCreator_not?: InputMaybe<Scalars['BigInt']>;
  amountSentToCreator_gt?: InputMaybe<Scalars['BigInt']>;
  amountSentToCreator_lt?: InputMaybe<Scalars['BigInt']>;
  amountSentToCreator_gte?: InputMaybe<Scalars['BigInt']>;
  amountSentToCreator_lte?: InputMaybe<Scalars['BigInt']>;
  amountSentToCreator_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amountSentToCreator_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  creatorRecipient?: InputMaybe<Scalars['Bytes']>;
  creatorRecipient_not?: InputMaybe<Scalars['Bytes']>;
  creatorRecipient_gt?: InputMaybe<Scalars['Bytes']>;
  creatorRecipient_lt?: InputMaybe<Scalars['Bytes']>;
  creatorRecipient_gte?: InputMaybe<Scalars['Bytes']>;
  creatorRecipient_lte?: InputMaybe<Scalars['Bytes']>;
  creatorRecipient_in?: InputMaybe<Array<Scalars['Bytes']>>;
  creatorRecipient_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  creatorRecipient_contains?: InputMaybe<Scalars['Bytes']>;
  creatorRecipient_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MarketplaceOffer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<MarketplaceOffer_filter>>>;
};

export type MarketplaceOffer_orderBy =
  | 'id'
  | 'offeror'
  | 'token'
  | 'token__id'
  | 'token__tokenId'
  | 'token__setInAllowList'
  | 'quantity'
  | 'currency'
  | 'totalPrice'
  | 'tokenType'
  | 'transferType'
  | 'expirationTimestamp'
  | 'rentalExpirationTimestamp'
  | 'status'
  | 'revenueTransaction'
  | 'revenueTransaction__id'
  | 'revenueTransaction__blockTimestamp'
  | 'referralAdditionalInformation'
  | 'creationTimestamp'
  | 'lastUpdateTimestamp'
  | 'feeMethodology'
  | 'amountSentToProtocol'
  | 'protocolRecipient'
  | 'amountSentToSeller'
  | 'sellerRecipient'
  | 'amountSentToCreator'
  | 'creatorRecipient';

/**
 * type Initialized @entity(immutable: true) {
 *   id: Bytes!
 *   version: BigInt! # uint64
 *   blockNumber: BigInt!
 *   blockTimestamp: BigInt!
 *   transactionHash: Bytes!
 * }
 *
 */
export type Mint = {
  id: Scalars['Bytes'];
  contractAddress: Scalars['Bytes'];
  tokenId: Scalars['BigInt'];
  from: Scalars['Bytes'];
  to: Scalars['Bytes'];
  currency: Scalars['Bytes'];
  amount: Scalars['BigInt'];
  tokenData: Scalars['String'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
  revenueTransaction?: Maybe<RevenueTransaction>;
  token?: Maybe<Token>;
  feeMethodology?: Maybe<FeeMethodology>;
  amountSentToProtocol?: Maybe<Scalars['BigInt']>;
  protocolRecipient?: Maybe<Scalars['Bytes']>;
};

export type Mint_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  contractAddress?: InputMaybe<Scalars['Bytes']>;
  contractAddress_not?: InputMaybe<Scalars['Bytes']>;
  contractAddress_gt?: InputMaybe<Scalars['Bytes']>;
  contractAddress_lt?: InputMaybe<Scalars['Bytes']>;
  contractAddress_gte?: InputMaybe<Scalars['Bytes']>;
  contractAddress_lte?: InputMaybe<Scalars['Bytes']>;
  contractAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  contractAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  contractAddress_contains?: InputMaybe<Scalars['Bytes']>;
  contractAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  from?: InputMaybe<Scalars['Bytes']>;
  from_not?: InputMaybe<Scalars['Bytes']>;
  from_gt?: InputMaybe<Scalars['Bytes']>;
  from_lt?: InputMaybe<Scalars['Bytes']>;
  from_gte?: InputMaybe<Scalars['Bytes']>;
  from_lte?: InputMaybe<Scalars['Bytes']>;
  from_in?: InputMaybe<Array<Scalars['Bytes']>>;
  from_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  from_contains?: InputMaybe<Scalars['Bytes']>;
  from_not_contains?: InputMaybe<Scalars['Bytes']>;
  to?: InputMaybe<Scalars['Bytes']>;
  to_not?: InputMaybe<Scalars['Bytes']>;
  to_gt?: InputMaybe<Scalars['Bytes']>;
  to_lt?: InputMaybe<Scalars['Bytes']>;
  to_gte?: InputMaybe<Scalars['Bytes']>;
  to_lte?: InputMaybe<Scalars['Bytes']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_contains?: InputMaybe<Scalars['Bytes']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']>;
  currency?: InputMaybe<Scalars['Bytes']>;
  currency_not?: InputMaybe<Scalars['Bytes']>;
  currency_gt?: InputMaybe<Scalars['Bytes']>;
  currency_lt?: InputMaybe<Scalars['Bytes']>;
  currency_gte?: InputMaybe<Scalars['Bytes']>;
  currency_lte?: InputMaybe<Scalars['Bytes']>;
  currency_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currency_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currency_contains?: InputMaybe<Scalars['Bytes']>;
  currency_not_contains?: InputMaybe<Scalars['Bytes']>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenData?: InputMaybe<Scalars['String']>;
  tokenData_not?: InputMaybe<Scalars['String']>;
  tokenData_gt?: InputMaybe<Scalars['String']>;
  tokenData_lt?: InputMaybe<Scalars['String']>;
  tokenData_gte?: InputMaybe<Scalars['String']>;
  tokenData_lte?: InputMaybe<Scalars['String']>;
  tokenData_in?: InputMaybe<Array<Scalars['String']>>;
  tokenData_not_in?: InputMaybe<Array<Scalars['String']>>;
  tokenData_contains?: InputMaybe<Scalars['String']>;
  tokenData_contains_nocase?: InputMaybe<Scalars['String']>;
  tokenData_not_contains?: InputMaybe<Scalars['String']>;
  tokenData_not_contains_nocase?: InputMaybe<Scalars['String']>;
  tokenData_starts_with?: InputMaybe<Scalars['String']>;
  tokenData_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tokenData_not_starts_with?: InputMaybe<Scalars['String']>;
  tokenData_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tokenData_ends_with?: InputMaybe<Scalars['String']>;
  tokenData_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tokenData_not_ends_with?: InputMaybe<Scalars['String']>;
  tokenData_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  revenueTransaction?: InputMaybe<Scalars['String']>;
  revenueTransaction_not?: InputMaybe<Scalars['String']>;
  revenueTransaction_gt?: InputMaybe<Scalars['String']>;
  revenueTransaction_lt?: InputMaybe<Scalars['String']>;
  revenueTransaction_gte?: InputMaybe<Scalars['String']>;
  revenueTransaction_lte?: InputMaybe<Scalars['String']>;
  revenueTransaction_in?: InputMaybe<Array<Scalars['String']>>;
  revenueTransaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  revenueTransaction_contains?: InputMaybe<Scalars['String']>;
  revenueTransaction_contains_nocase?: InputMaybe<Scalars['String']>;
  revenueTransaction_not_contains?: InputMaybe<Scalars['String']>;
  revenueTransaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  revenueTransaction_starts_with?: InputMaybe<Scalars['String']>;
  revenueTransaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  revenueTransaction_not_starts_with?: InputMaybe<Scalars['String']>;
  revenueTransaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  revenueTransaction_ends_with?: InputMaybe<Scalars['String']>;
  revenueTransaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  revenueTransaction_not_ends_with?: InputMaybe<Scalars['String']>;
  revenueTransaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  revenueTransaction_?: InputMaybe<RevenueTransaction_filter>;
  token?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_?: InputMaybe<Token_filter>;
  feeMethodology?: InputMaybe<FeeMethodology>;
  feeMethodology_not?: InputMaybe<FeeMethodology>;
  feeMethodology_in?: InputMaybe<Array<FeeMethodology>>;
  feeMethodology_not_in?: InputMaybe<Array<FeeMethodology>>;
  amountSentToProtocol?: InputMaybe<Scalars['BigInt']>;
  amountSentToProtocol_not?: InputMaybe<Scalars['BigInt']>;
  amountSentToProtocol_gt?: InputMaybe<Scalars['BigInt']>;
  amountSentToProtocol_lt?: InputMaybe<Scalars['BigInt']>;
  amountSentToProtocol_gte?: InputMaybe<Scalars['BigInt']>;
  amountSentToProtocol_lte?: InputMaybe<Scalars['BigInt']>;
  amountSentToProtocol_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amountSentToProtocol_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  protocolRecipient?: InputMaybe<Scalars['Bytes']>;
  protocolRecipient_not?: InputMaybe<Scalars['Bytes']>;
  protocolRecipient_gt?: InputMaybe<Scalars['Bytes']>;
  protocolRecipient_lt?: InputMaybe<Scalars['Bytes']>;
  protocolRecipient_gte?: InputMaybe<Scalars['Bytes']>;
  protocolRecipient_lte?: InputMaybe<Scalars['Bytes']>;
  protocolRecipient_in?: InputMaybe<Array<Scalars['Bytes']>>;
  protocolRecipient_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  protocolRecipient_contains?: InputMaybe<Scalars['Bytes']>;
  protocolRecipient_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Mint_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Mint_filter>>>;
};

export type Mint_orderBy =
  | 'id'
  | 'contractAddress'
  | 'tokenId'
  | 'from'
  | 'to'
  | 'currency'
  | 'amount'
  | 'tokenData'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash'
  | 'revenueTransaction'
  | 'revenueTransaction__id'
  | 'revenueTransaction__blockTimestamp'
  | 'token'
  | 'token__id'
  | 'token__tokenId'
  | 'token__setInAllowList'
  | 'feeMethodology'
  | 'amountSentToProtocol'
  | 'protocolRecipient';

export type NewBid = {
  id: Scalars['Bytes'];
  listingId: Scalars['BigInt'];
  bidder: Scalars['Bytes'];
  quantityWanted: Scalars['BigInt'];
  totalBidAmount: Scalars['BigInt'];
  currency: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type NewBid_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  listingId?: InputMaybe<Scalars['BigInt']>;
  listingId_not?: InputMaybe<Scalars['BigInt']>;
  listingId_gt?: InputMaybe<Scalars['BigInt']>;
  listingId_lt?: InputMaybe<Scalars['BigInt']>;
  listingId_gte?: InputMaybe<Scalars['BigInt']>;
  listingId_lte?: InputMaybe<Scalars['BigInt']>;
  listingId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  listingId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bidder?: InputMaybe<Scalars['Bytes']>;
  bidder_not?: InputMaybe<Scalars['Bytes']>;
  bidder_gt?: InputMaybe<Scalars['Bytes']>;
  bidder_lt?: InputMaybe<Scalars['Bytes']>;
  bidder_gte?: InputMaybe<Scalars['Bytes']>;
  bidder_lte?: InputMaybe<Scalars['Bytes']>;
  bidder_in?: InputMaybe<Array<Scalars['Bytes']>>;
  bidder_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  bidder_contains?: InputMaybe<Scalars['Bytes']>;
  bidder_not_contains?: InputMaybe<Scalars['Bytes']>;
  quantityWanted?: InputMaybe<Scalars['BigInt']>;
  quantityWanted_not?: InputMaybe<Scalars['BigInt']>;
  quantityWanted_gt?: InputMaybe<Scalars['BigInt']>;
  quantityWanted_lt?: InputMaybe<Scalars['BigInt']>;
  quantityWanted_gte?: InputMaybe<Scalars['BigInt']>;
  quantityWanted_lte?: InputMaybe<Scalars['BigInt']>;
  quantityWanted_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quantityWanted_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalBidAmount?: InputMaybe<Scalars['BigInt']>;
  totalBidAmount_not?: InputMaybe<Scalars['BigInt']>;
  totalBidAmount_gt?: InputMaybe<Scalars['BigInt']>;
  totalBidAmount_lt?: InputMaybe<Scalars['BigInt']>;
  totalBidAmount_gte?: InputMaybe<Scalars['BigInt']>;
  totalBidAmount_lte?: InputMaybe<Scalars['BigInt']>;
  totalBidAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalBidAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currency?: InputMaybe<Scalars['Bytes']>;
  currency_not?: InputMaybe<Scalars['Bytes']>;
  currency_gt?: InputMaybe<Scalars['Bytes']>;
  currency_lt?: InputMaybe<Scalars['Bytes']>;
  currency_gte?: InputMaybe<Scalars['Bytes']>;
  currency_lte?: InputMaybe<Scalars['Bytes']>;
  currency_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currency_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currency_contains?: InputMaybe<Scalars['Bytes']>;
  currency_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<NewBid_filter>>>;
  or?: InputMaybe<Array<InputMaybe<NewBid_filter>>>;
};

export type NewBid_orderBy =
  | 'id'
  | 'listingId'
  | 'bidder'
  | 'quantityWanted'
  | 'totalBidAmount'
  | 'currency'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type NewDSponsorNFT = {
  id: Scalars['Bytes'];
  contractAddr: Scalars['Bytes'];
  owner: Scalars['Bytes'];
  name: Scalars['String'];
  symbol: Scalars['String'];
  baseURI: Scalars['String'];
  contractURI: Scalars['String'];
  maxSupply: Scalars['BigInt'];
  minter: Scalars['Bytes'];
  forwarder: Scalars['Bytes'];
  royaltyBps: Scalars['BigInt'];
  currencies: Array<Scalars['Bytes']>;
  prices: Array<Scalars['BigInt']>;
  allowedTokenIds: Array<Scalars['BigInt']>;
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type NewDSponsorNFT_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  contractAddr?: InputMaybe<Scalars['Bytes']>;
  contractAddr_not?: InputMaybe<Scalars['Bytes']>;
  contractAddr_gt?: InputMaybe<Scalars['Bytes']>;
  contractAddr_lt?: InputMaybe<Scalars['Bytes']>;
  contractAddr_gte?: InputMaybe<Scalars['Bytes']>;
  contractAddr_lte?: InputMaybe<Scalars['Bytes']>;
  contractAddr_in?: InputMaybe<Array<Scalars['Bytes']>>;
  contractAddr_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  contractAddr_contains?: InputMaybe<Scalars['Bytes']>;
  contractAddr_not_contains?: InputMaybe<Scalars['Bytes']>;
  owner?: InputMaybe<Scalars['Bytes']>;
  owner_not?: InputMaybe<Scalars['Bytes']>;
  owner_gt?: InputMaybe<Scalars['Bytes']>;
  owner_lt?: InputMaybe<Scalars['Bytes']>;
  owner_gte?: InputMaybe<Scalars['Bytes']>;
  owner_lte?: InputMaybe<Scalars['Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_contains?: InputMaybe<Scalars['Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  baseURI?: InputMaybe<Scalars['String']>;
  baseURI_not?: InputMaybe<Scalars['String']>;
  baseURI_gt?: InputMaybe<Scalars['String']>;
  baseURI_lt?: InputMaybe<Scalars['String']>;
  baseURI_gte?: InputMaybe<Scalars['String']>;
  baseURI_lte?: InputMaybe<Scalars['String']>;
  baseURI_in?: InputMaybe<Array<Scalars['String']>>;
  baseURI_not_in?: InputMaybe<Array<Scalars['String']>>;
  baseURI_contains?: InputMaybe<Scalars['String']>;
  baseURI_contains_nocase?: InputMaybe<Scalars['String']>;
  baseURI_not_contains?: InputMaybe<Scalars['String']>;
  baseURI_not_contains_nocase?: InputMaybe<Scalars['String']>;
  baseURI_starts_with?: InputMaybe<Scalars['String']>;
  baseURI_starts_with_nocase?: InputMaybe<Scalars['String']>;
  baseURI_not_starts_with?: InputMaybe<Scalars['String']>;
  baseURI_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  baseURI_ends_with?: InputMaybe<Scalars['String']>;
  baseURI_ends_with_nocase?: InputMaybe<Scalars['String']>;
  baseURI_not_ends_with?: InputMaybe<Scalars['String']>;
  baseURI_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contractURI?: InputMaybe<Scalars['String']>;
  contractURI_not?: InputMaybe<Scalars['String']>;
  contractURI_gt?: InputMaybe<Scalars['String']>;
  contractURI_lt?: InputMaybe<Scalars['String']>;
  contractURI_gte?: InputMaybe<Scalars['String']>;
  contractURI_lte?: InputMaybe<Scalars['String']>;
  contractURI_in?: InputMaybe<Array<Scalars['String']>>;
  contractURI_not_in?: InputMaybe<Array<Scalars['String']>>;
  contractURI_contains?: InputMaybe<Scalars['String']>;
  contractURI_contains_nocase?: InputMaybe<Scalars['String']>;
  contractURI_not_contains?: InputMaybe<Scalars['String']>;
  contractURI_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contractURI_starts_with?: InputMaybe<Scalars['String']>;
  contractURI_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contractURI_not_starts_with?: InputMaybe<Scalars['String']>;
  contractURI_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contractURI_ends_with?: InputMaybe<Scalars['String']>;
  contractURI_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contractURI_not_ends_with?: InputMaybe<Scalars['String']>;
  contractURI_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  maxSupply?: InputMaybe<Scalars['BigInt']>;
  maxSupply_not?: InputMaybe<Scalars['BigInt']>;
  maxSupply_gt?: InputMaybe<Scalars['BigInt']>;
  maxSupply_lt?: InputMaybe<Scalars['BigInt']>;
  maxSupply_gte?: InputMaybe<Scalars['BigInt']>;
  maxSupply_lte?: InputMaybe<Scalars['BigInt']>;
  maxSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  maxSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  minter?: InputMaybe<Scalars['Bytes']>;
  minter_not?: InputMaybe<Scalars['Bytes']>;
  minter_gt?: InputMaybe<Scalars['Bytes']>;
  minter_lt?: InputMaybe<Scalars['Bytes']>;
  minter_gte?: InputMaybe<Scalars['Bytes']>;
  minter_lte?: InputMaybe<Scalars['Bytes']>;
  minter_in?: InputMaybe<Array<Scalars['Bytes']>>;
  minter_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  minter_contains?: InputMaybe<Scalars['Bytes']>;
  minter_not_contains?: InputMaybe<Scalars['Bytes']>;
  forwarder?: InputMaybe<Scalars['Bytes']>;
  forwarder_not?: InputMaybe<Scalars['Bytes']>;
  forwarder_gt?: InputMaybe<Scalars['Bytes']>;
  forwarder_lt?: InputMaybe<Scalars['Bytes']>;
  forwarder_gte?: InputMaybe<Scalars['Bytes']>;
  forwarder_lte?: InputMaybe<Scalars['Bytes']>;
  forwarder_in?: InputMaybe<Array<Scalars['Bytes']>>;
  forwarder_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  forwarder_contains?: InputMaybe<Scalars['Bytes']>;
  forwarder_not_contains?: InputMaybe<Scalars['Bytes']>;
  royaltyBps?: InputMaybe<Scalars['BigInt']>;
  royaltyBps_not?: InputMaybe<Scalars['BigInt']>;
  royaltyBps_gt?: InputMaybe<Scalars['BigInt']>;
  royaltyBps_lt?: InputMaybe<Scalars['BigInt']>;
  royaltyBps_gte?: InputMaybe<Scalars['BigInt']>;
  royaltyBps_lte?: InputMaybe<Scalars['BigInt']>;
  royaltyBps_in?: InputMaybe<Array<Scalars['BigInt']>>;
  royaltyBps_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currencies?: InputMaybe<Array<Scalars['Bytes']>>;
  currencies_not?: InputMaybe<Array<Scalars['Bytes']>>;
  currencies_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  currencies_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  currencies_not_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  currencies_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  prices?: InputMaybe<Array<Scalars['BigInt']>>;
  prices_not?: InputMaybe<Array<Scalars['BigInt']>>;
  prices_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  prices_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  prices_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  prices_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  allowedTokenIds?: InputMaybe<Array<Scalars['BigInt']>>;
  allowedTokenIds_not?: InputMaybe<Array<Scalars['BigInt']>>;
  allowedTokenIds_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  allowedTokenIds_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  allowedTokenIds_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  allowedTokenIds_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<NewDSponsorNFT_filter>>>;
  or?: InputMaybe<Array<InputMaybe<NewDSponsorNFT_filter>>>;
};

export type NewDSponsorNFT_orderBy =
  | 'id'
  | 'contractAddr'
  | 'owner'
  | 'name'
  | 'symbol'
  | 'baseURI'
  | 'contractURI'
  | 'maxSupply'
  | 'minter'
  | 'forwarder'
  | 'royaltyBps'
  | 'currencies'
  | 'prices'
  | 'allowedTokenIds'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type NewOffer = {
  id: Scalars['Bytes'];
  offeror: Scalars['Bytes'];
  offerId: Scalars['BigInt'];
  assetContract: Scalars['Bytes'];
  offer_offerId: Scalars['BigInt'];
  offer_tokenId: Scalars['BigInt'];
  offer_quantity: Scalars['BigInt'];
  offer_totalPrice: Scalars['BigInt'];
  offer_expirationTimestamp: Scalars['BigInt'];
  offer_offeror: Scalars['Bytes'];
  offer_assetContract: Scalars['Bytes'];
  offer_currency: Scalars['Bytes'];
  offer_tokenType: Scalars['Int'];
  offer_transferType: Scalars['Int'];
  offer_rentalExpirationTimestamp: Scalars['BigInt'];
  offer_status: Scalars['Int'];
  offer_referralAdditionalInformation: Scalars['String'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type NewOffer_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  offeror?: InputMaybe<Scalars['Bytes']>;
  offeror_not?: InputMaybe<Scalars['Bytes']>;
  offeror_gt?: InputMaybe<Scalars['Bytes']>;
  offeror_lt?: InputMaybe<Scalars['Bytes']>;
  offeror_gte?: InputMaybe<Scalars['Bytes']>;
  offeror_lte?: InputMaybe<Scalars['Bytes']>;
  offeror_in?: InputMaybe<Array<Scalars['Bytes']>>;
  offeror_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  offeror_contains?: InputMaybe<Scalars['Bytes']>;
  offeror_not_contains?: InputMaybe<Scalars['Bytes']>;
  offerId?: InputMaybe<Scalars['BigInt']>;
  offerId_not?: InputMaybe<Scalars['BigInt']>;
  offerId_gt?: InputMaybe<Scalars['BigInt']>;
  offerId_lt?: InputMaybe<Scalars['BigInt']>;
  offerId_gte?: InputMaybe<Scalars['BigInt']>;
  offerId_lte?: InputMaybe<Scalars['BigInt']>;
  offerId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  offerId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetContract?: InputMaybe<Scalars['Bytes']>;
  assetContract_not?: InputMaybe<Scalars['Bytes']>;
  assetContract_gt?: InputMaybe<Scalars['Bytes']>;
  assetContract_lt?: InputMaybe<Scalars['Bytes']>;
  assetContract_gte?: InputMaybe<Scalars['Bytes']>;
  assetContract_lte?: InputMaybe<Scalars['Bytes']>;
  assetContract_in?: InputMaybe<Array<Scalars['Bytes']>>;
  assetContract_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  assetContract_contains?: InputMaybe<Scalars['Bytes']>;
  assetContract_not_contains?: InputMaybe<Scalars['Bytes']>;
  offer_offerId?: InputMaybe<Scalars['BigInt']>;
  offer_offerId_not?: InputMaybe<Scalars['BigInt']>;
  offer_offerId_gt?: InputMaybe<Scalars['BigInt']>;
  offer_offerId_lt?: InputMaybe<Scalars['BigInt']>;
  offer_offerId_gte?: InputMaybe<Scalars['BigInt']>;
  offer_offerId_lte?: InputMaybe<Scalars['BigInt']>;
  offer_offerId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  offer_offerId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  offer_tokenId?: InputMaybe<Scalars['BigInt']>;
  offer_tokenId_not?: InputMaybe<Scalars['BigInt']>;
  offer_tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  offer_tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  offer_tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  offer_tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  offer_tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  offer_tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  offer_quantity?: InputMaybe<Scalars['BigInt']>;
  offer_quantity_not?: InputMaybe<Scalars['BigInt']>;
  offer_quantity_gt?: InputMaybe<Scalars['BigInt']>;
  offer_quantity_lt?: InputMaybe<Scalars['BigInt']>;
  offer_quantity_gte?: InputMaybe<Scalars['BigInt']>;
  offer_quantity_lte?: InputMaybe<Scalars['BigInt']>;
  offer_quantity_in?: InputMaybe<Array<Scalars['BigInt']>>;
  offer_quantity_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  offer_totalPrice?: InputMaybe<Scalars['BigInt']>;
  offer_totalPrice_not?: InputMaybe<Scalars['BigInt']>;
  offer_totalPrice_gt?: InputMaybe<Scalars['BigInt']>;
  offer_totalPrice_lt?: InputMaybe<Scalars['BigInt']>;
  offer_totalPrice_gte?: InputMaybe<Scalars['BigInt']>;
  offer_totalPrice_lte?: InputMaybe<Scalars['BigInt']>;
  offer_totalPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  offer_totalPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  offer_expirationTimestamp?: InputMaybe<Scalars['BigInt']>;
  offer_expirationTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  offer_expirationTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  offer_expirationTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  offer_expirationTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  offer_expirationTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  offer_expirationTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  offer_expirationTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  offer_offeror?: InputMaybe<Scalars['Bytes']>;
  offer_offeror_not?: InputMaybe<Scalars['Bytes']>;
  offer_offeror_gt?: InputMaybe<Scalars['Bytes']>;
  offer_offeror_lt?: InputMaybe<Scalars['Bytes']>;
  offer_offeror_gte?: InputMaybe<Scalars['Bytes']>;
  offer_offeror_lte?: InputMaybe<Scalars['Bytes']>;
  offer_offeror_in?: InputMaybe<Array<Scalars['Bytes']>>;
  offer_offeror_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  offer_offeror_contains?: InputMaybe<Scalars['Bytes']>;
  offer_offeror_not_contains?: InputMaybe<Scalars['Bytes']>;
  offer_assetContract?: InputMaybe<Scalars['Bytes']>;
  offer_assetContract_not?: InputMaybe<Scalars['Bytes']>;
  offer_assetContract_gt?: InputMaybe<Scalars['Bytes']>;
  offer_assetContract_lt?: InputMaybe<Scalars['Bytes']>;
  offer_assetContract_gte?: InputMaybe<Scalars['Bytes']>;
  offer_assetContract_lte?: InputMaybe<Scalars['Bytes']>;
  offer_assetContract_in?: InputMaybe<Array<Scalars['Bytes']>>;
  offer_assetContract_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  offer_assetContract_contains?: InputMaybe<Scalars['Bytes']>;
  offer_assetContract_not_contains?: InputMaybe<Scalars['Bytes']>;
  offer_currency?: InputMaybe<Scalars['Bytes']>;
  offer_currency_not?: InputMaybe<Scalars['Bytes']>;
  offer_currency_gt?: InputMaybe<Scalars['Bytes']>;
  offer_currency_lt?: InputMaybe<Scalars['Bytes']>;
  offer_currency_gte?: InputMaybe<Scalars['Bytes']>;
  offer_currency_lte?: InputMaybe<Scalars['Bytes']>;
  offer_currency_in?: InputMaybe<Array<Scalars['Bytes']>>;
  offer_currency_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  offer_currency_contains?: InputMaybe<Scalars['Bytes']>;
  offer_currency_not_contains?: InputMaybe<Scalars['Bytes']>;
  offer_tokenType?: InputMaybe<Scalars['Int']>;
  offer_tokenType_not?: InputMaybe<Scalars['Int']>;
  offer_tokenType_gt?: InputMaybe<Scalars['Int']>;
  offer_tokenType_lt?: InputMaybe<Scalars['Int']>;
  offer_tokenType_gte?: InputMaybe<Scalars['Int']>;
  offer_tokenType_lte?: InputMaybe<Scalars['Int']>;
  offer_tokenType_in?: InputMaybe<Array<Scalars['Int']>>;
  offer_tokenType_not_in?: InputMaybe<Array<Scalars['Int']>>;
  offer_transferType?: InputMaybe<Scalars['Int']>;
  offer_transferType_not?: InputMaybe<Scalars['Int']>;
  offer_transferType_gt?: InputMaybe<Scalars['Int']>;
  offer_transferType_lt?: InputMaybe<Scalars['Int']>;
  offer_transferType_gte?: InputMaybe<Scalars['Int']>;
  offer_transferType_lte?: InputMaybe<Scalars['Int']>;
  offer_transferType_in?: InputMaybe<Array<Scalars['Int']>>;
  offer_transferType_not_in?: InputMaybe<Array<Scalars['Int']>>;
  offer_rentalExpirationTimestamp?: InputMaybe<Scalars['BigInt']>;
  offer_rentalExpirationTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  offer_rentalExpirationTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  offer_rentalExpirationTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  offer_rentalExpirationTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  offer_rentalExpirationTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  offer_rentalExpirationTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  offer_rentalExpirationTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  offer_status?: InputMaybe<Scalars['Int']>;
  offer_status_not?: InputMaybe<Scalars['Int']>;
  offer_status_gt?: InputMaybe<Scalars['Int']>;
  offer_status_lt?: InputMaybe<Scalars['Int']>;
  offer_status_gte?: InputMaybe<Scalars['Int']>;
  offer_status_lte?: InputMaybe<Scalars['Int']>;
  offer_status_in?: InputMaybe<Array<Scalars['Int']>>;
  offer_status_not_in?: InputMaybe<Array<Scalars['Int']>>;
  offer_referralAdditionalInformation?: InputMaybe<Scalars['String']>;
  offer_referralAdditionalInformation_not?: InputMaybe<Scalars['String']>;
  offer_referralAdditionalInformation_gt?: InputMaybe<Scalars['String']>;
  offer_referralAdditionalInformation_lt?: InputMaybe<Scalars['String']>;
  offer_referralAdditionalInformation_gte?: InputMaybe<Scalars['String']>;
  offer_referralAdditionalInformation_lte?: InputMaybe<Scalars['String']>;
  offer_referralAdditionalInformation_in?: InputMaybe<Array<Scalars['String']>>;
  offer_referralAdditionalInformation_not_in?: InputMaybe<Array<Scalars['String']>>;
  offer_referralAdditionalInformation_contains?: InputMaybe<Scalars['String']>;
  offer_referralAdditionalInformation_contains_nocase?: InputMaybe<Scalars['String']>;
  offer_referralAdditionalInformation_not_contains?: InputMaybe<Scalars['String']>;
  offer_referralAdditionalInformation_not_contains_nocase?: InputMaybe<Scalars['String']>;
  offer_referralAdditionalInformation_starts_with?: InputMaybe<Scalars['String']>;
  offer_referralAdditionalInformation_starts_with_nocase?: InputMaybe<Scalars['String']>;
  offer_referralAdditionalInformation_not_starts_with?: InputMaybe<Scalars['String']>;
  offer_referralAdditionalInformation_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  offer_referralAdditionalInformation_ends_with?: InputMaybe<Scalars['String']>;
  offer_referralAdditionalInformation_ends_with_nocase?: InputMaybe<Scalars['String']>;
  offer_referralAdditionalInformation_not_ends_with?: InputMaybe<Scalars['String']>;
  offer_referralAdditionalInformation_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<NewOffer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<NewOffer_filter>>>;
};

export type NewOffer_orderBy =
  | 'id'
  | 'offeror'
  | 'offerId'
  | 'assetContract'
  | 'offer_offerId'
  | 'offer_tokenId'
  | 'offer_quantity'
  | 'offer_totalPrice'
  | 'offer_expirationTimestamp'
  | 'offer_offeror'
  | 'offer_assetContract'
  | 'offer_currency'
  | 'offer_tokenType'
  | 'offer_transferType'
  | 'offer_rentalExpirationTimestamp'
  | 'offer_status'
  | 'offer_referralAdditionalInformation'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type NewSale = {
  id: Scalars['Bytes'];
  listingId: Scalars['BigInt'];
  assetContract: Scalars['Bytes'];
  lister: Scalars['Bytes'];
  buyer: Scalars['Bytes'];
  quantityBought: Scalars['BigInt'];
  totalPricePaid: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type NewSale_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  listingId?: InputMaybe<Scalars['BigInt']>;
  listingId_not?: InputMaybe<Scalars['BigInt']>;
  listingId_gt?: InputMaybe<Scalars['BigInt']>;
  listingId_lt?: InputMaybe<Scalars['BigInt']>;
  listingId_gte?: InputMaybe<Scalars['BigInt']>;
  listingId_lte?: InputMaybe<Scalars['BigInt']>;
  listingId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  listingId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetContract?: InputMaybe<Scalars['Bytes']>;
  assetContract_not?: InputMaybe<Scalars['Bytes']>;
  assetContract_gt?: InputMaybe<Scalars['Bytes']>;
  assetContract_lt?: InputMaybe<Scalars['Bytes']>;
  assetContract_gte?: InputMaybe<Scalars['Bytes']>;
  assetContract_lte?: InputMaybe<Scalars['Bytes']>;
  assetContract_in?: InputMaybe<Array<Scalars['Bytes']>>;
  assetContract_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  assetContract_contains?: InputMaybe<Scalars['Bytes']>;
  assetContract_not_contains?: InputMaybe<Scalars['Bytes']>;
  lister?: InputMaybe<Scalars['Bytes']>;
  lister_not?: InputMaybe<Scalars['Bytes']>;
  lister_gt?: InputMaybe<Scalars['Bytes']>;
  lister_lt?: InputMaybe<Scalars['Bytes']>;
  lister_gte?: InputMaybe<Scalars['Bytes']>;
  lister_lte?: InputMaybe<Scalars['Bytes']>;
  lister_in?: InputMaybe<Array<Scalars['Bytes']>>;
  lister_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  lister_contains?: InputMaybe<Scalars['Bytes']>;
  lister_not_contains?: InputMaybe<Scalars['Bytes']>;
  buyer?: InputMaybe<Scalars['Bytes']>;
  buyer_not?: InputMaybe<Scalars['Bytes']>;
  buyer_gt?: InputMaybe<Scalars['Bytes']>;
  buyer_lt?: InputMaybe<Scalars['Bytes']>;
  buyer_gte?: InputMaybe<Scalars['Bytes']>;
  buyer_lte?: InputMaybe<Scalars['Bytes']>;
  buyer_in?: InputMaybe<Array<Scalars['Bytes']>>;
  buyer_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  buyer_contains?: InputMaybe<Scalars['Bytes']>;
  buyer_not_contains?: InputMaybe<Scalars['Bytes']>;
  quantityBought?: InputMaybe<Scalars['BigInt']>;
  quantityBought_not?: InputMaybe<Scalars['BigInt']>;
  quantityBought_gt?: InputMaybe<Scalars['BigInt']>;
  quantityBought_lt?: InputMaybe<Scalars['BigInt']>;
  quantityBought_gte?: InputMaybe<Scalars['BigInt']>;
  quantityBought_lte?: InputMaybe<Scalars['BigInt']>;
  quantityBought_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quantityBought_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalPricePaid?: InputMaybe<Scalars['BigInt']>;
  totalPricePaid_not?: InputMaybe<Scalars['BigInt']>;
  totalPricePaid_gt?: InputMaybe<Scalars['BigInt']>;
  totalPricePaid_lt?: InputMaybe<Scalars['BigInt']>;
  totalPricePaid_gte?: InputMaybe<Scalars['BigInt']>;
  totalPricePaid_lte?: InputMaybe<Scalars['BigInt']>;
  totalPricePaid_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalPricePaid_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<NewSale_filter>>>;
  or?: InputMaybe<Array<InputMaybe<NewSale_filter>>>;
};

export type NewSale_orderBy =
  | 'id'
  | 'listingId'
  | 'assetContract'
  | 'lister'
  | 'buyer'
  | 'quantityBought'
  | 'totalPricePaid'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type NftContract = {
  id: Scalars['Bytes'];
  name?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  baseURI?: Maybe<Scalars['String']>;
  contractURI?: Maybe<Scalars['String']>;
  maxSupply?: Maybe<Scalars['BigInt']>;
  minter?: Maybe<Scalars['Bytes']>;
  forwarder?: Maybe<Scalars['Bytes']>;
  owner?: Maybe<OwnershipTransferred>;
  royaltyBps?: Maybe<Scalars['BigInt']>;
  allowList: Scalars['Boolean'];
  adOffers?: Maybe<Array<AdOffer>>;
  prices?: Maybe<Array<NftPrice>>;
  tokens?: Maybe<Array<Token>>;
};


export type NftContractadOffersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AdOffer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AdOffer_filter>;
};


export type NftContractpricesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NftPrice_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NftPrice_filter>;
};


export type NftContracttokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Token_filter>;
};

export type NftContract_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  baseURI?: InputMaybe<Scalars['String']>;
  baseURI_not?: InputMaybe<Scalars['String']>;
  baseURI_gt?: InputMaybe<Scalars['String']>;
  baseURI_lt?: InputMaybe<Scalars['String']>;
  baseURI_gte?: InputMaybe<Scalars['String']>;
  baseURI_lte?: InputMaybe<Scalars['String']>;
  baseURI_in?: InputMaybe<Array<Scalars['String']>>;
  baseURI_not_in?: InputMaybe<Array<Scalars['String']>>;
  baseURI_contains?: InputMaybe<Scalars['String']>;
  baseURI_contains_nocase?: InputMaybe<Scalars['String']>;
  baseURI_not_contains?: InputMaybe<Scalars['String']>;
  baseURI_not_contains_nocase?: InputMaybe<Scalars['String']>;
  baseURI_starts_with?: InputMaybe<Scalars['String']>;
  baseURI_starts_with_nocase?: InputMaybe<Scalars['String']>;
  baseURI_not_starts_with?: InputMaybe<Scalars['String']>;
  baseURI_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  baseURI_ends_with?: InputMaybe<Scalars['String']>;
  baseURI_ends_with_nocase?: InputMaybe<Scalars['String']>;
  baseURI_not_ends_with?: InputMaybe<Scalars['String']>;
  baseURI_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contractURI?: InputMaybe<Scalars['String']>;
  contractURI_not?: InputMaybe<Scalars['String']>;
  contractURI_gt?: InputMaybe<Scalars['String']>;
  contractURI_lt?: InputMaybe<Scalars['String']>;
  contractURI_gte?: InputMaybe<Scalars['String']>;
  contractURI_lte?: InputMaybe<Scalars['String']>;
  contractURI_in?: InputMaybe<Array<Scalars['String']>>;
  contractURI_not_in?: InputMaybe<Array<Scalars['String']>>;
  contractURI_contains?: InputMaybe<Scalars['String']>;
  contractURI_contains_nocase?: InputMaybe<Scalars['String']>;
  contractURI_not_contains?: InputMaybe<Scalars['String']>;
  contractURI_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contractURI_starts_with?: InputMaybe<Scalars['String']>;
  contractURI_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contractURI_not_starts_with?: InputMaybe<Scalars['String']>;
  contractURI_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contractURI_ends_with?: InputMaybe<Scalars['String']>;
  contractURI_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contractURI_not_ends_with?: InputMaybe<Scalars['String']>;
  contractURI_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  maxSupply?: InputMaybe<Scalars['BigInt']>;
  maxSupply_not?: InputMaybe<Scalars['BigInt']>;
  maxSupply_gt?: InputMaybe<Scalars['BigInt']>;
  maxSupply_lt?: InputMaybe<Scalars['BigInt']>;
  maxSupply_gte?: InputMaybe<Scalars['BigInt']>;
  maxSupply_lte?: InputMaybe<Scalars['BigInt']>;
  maxSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  maxSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  minter?: InputMaybe<Scalars['Bytes']>;
  minter_not?: InputMaybe<Scalars['Bytes']>;
  minter_gt?: InputMaybe<Scalars['Bytes']>;
  minter_lt?: InputMaybe<Scalars['Bytes']>;
  minter_gte?: InputMaybe<Scalars['Bytes']>;
  minter_lte?: InputMaybe<Scalars['Bytes']>;
  minter_in?: InputMaybe<Array<Scalars['Bytes']>>;
  minter_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  minter_contains?: InputMaybe<Scalars['Bytes']>;
  minter_not_contains?: InputMaybe<Scalars['Bytes']>;
  forwarder?: InputMaybe<Scalars['Bytes']>;
  forwarder_not?: InputMaybe<Scalars['Bytes']>;
  forwarder_gt?: InputMaybe<Scalars['Bytes']>;
  forwarder_lt?: InputMaybe<Scalars['Bytes']>;
  forwarder_gte?: InputMaybe<Scalars['Bytes']>;
  forwarder_lte?: InputMaybe<Scalars['Bytes']>;
  forwarder_in?: InputMaybe<Array<Scalars['Bytes']>>;
  forwarder_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  forwarder_contains?: InputMaybe<Scalars['Bytes']>;
  forwarder_not_contains?: InputMaybe<Scalars['Bytes']>;
  owner?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_?: InputMaybe<OwnershipTransferred_filter>;
  royaltyBps?: InputMaybe<Scalars['BigInt']>;
  royaltyBps_not?: InputMaybe<Scalars['BigInt']>;
  royaltyBps_gt?: InputMaybe<Scalars['BigInt']>;
  royaltyBps_lt?: InputMaybe<Scalars['BigInt']>;
  royaltyBps_gte?: InputMaybe<Scalars['BigInt']>;
  royaltyBps_lte?: InputMaybe<Scalars['BigInt']>;
  royaltyBps_in?: InputMaybe<Array<Scalars['BigInt']>>;
  royaltyBps_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  allowList?: InputMaybe<Scalars['Boolean']>;
  allowList_not?: InputMaybe<Scalars['Boolean']>;
  allowList_in?: InputMaybe<Array<Scalars['Boolean']>>;
  allowList_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  adOffers_?: InputMaybe<AdOffer_filter>;
  prices_?: InputMaybe<NftPrice_filter>;
  tokens_?: InputMaybe<Token_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<NftContract_filter>>>;
  or?: InputMaybe<Array<InputMaybe<NftContract_filter>>>;
};

export type NftContract_orderBy =
  | 'id'
  | 'name'
  | 'symbol'
  | 'baseURI'
  | 'contractURI'
  | 'maxSupply'
  | 'minter'
  | 'forwarder'
  | 'owner'
  | 'owner__id'
  | 'owner__previousOwner'
  | 'owner__newOwner'
  | 'owner__blockNumber'
  | 'owner__blockTimestamp'
  | 'owner__transactionHash'
  | 'royaltyBps'
  | 'allowList'
  | 'adOffers'
  | 'prices'
  | 'tokens';

export type NftPrice = {
  id: Scalars['String'];
  currency: Scalars['Bytes'];
  amount: Scalars['BigInt'];
  enabled: Scalars['Boolean'];
  nftContract: NftContract;
};

export type NftPrice_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['Bytes']>;
  currency_not?: InputMaybe<Scalars['Bytes']>;
  currency_gt?: InputMaybe<Scalars['Bytes']>;
  currency_lt?: InputMaybe<Scalars['Bytes']>;
  currency_gte?: InputMaybe<Scalars['Bytes']>;
  currency_lte?: InputMaybe<Scalars['Bytes']>;
  currency_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currency_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currency_contains?: InputMaybe<Scalars['Bytes']>;
  currency_not_contains?: InputMaybe<Scalars['Bytes']>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  enabled?: InputMaybe<Scalars['Boolean']>;
  enabled_not?: InputMaybe<Scalars['Boolean']>;
  enabled_in?: InputMaybe<Array<Scalars['Boolean']>>;
  enabled_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  nftContract?: InputMaybe<Scalars['String']>;
  nftContract_not?: InputMaybe<Scalars['String']>;
  nftContract_gt?: InputMaybe<Scalars['String']>;
  nftContract_lt?: InputMaybe<Scalars['String']>;
  nftContract_gte?: InputMaybe<Scalars['String']>;
  nftContract_lte?: InputMaybe<Scalars['String']>;
  nftContract_in?: InputMaybe<Array<Scalars['String']>>;
  nftContract_not_in?: InputMaybe<Array<Scalars['String']>>;
  nftContract_contains?: InputMaybe<Scalars['String']>;
  nftContract_contains_nocase?: InputMaybe<Scalars['String']>;
  nftContract_not_contains?: InputMaybe<Scalars['String']>;
  nftContract_not_contains_nocase?: InputMaybe<Scalars['String']>;
  nftContract_starts_with?: InputMaybe<Scalars['String']>;
  nftContract_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nftContract_not_starts_with?: InputMaybe<Scalars['String']>;
  nftContract_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nftContract_ends_with?: InputMaybe<Scalars['String']>;
  nftContract_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nftContract_not_ends_with?: InputMaybe<Scalars['String']>;
  nftContract_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nftContract_?: InputMaybe<NftContract_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<NftPrice_filter>>>;
  or?: InputMaybe<Array<InputMaybe<NftPrice_filter>>>;
};

export type NftPrice_orderBy =
  | 'id'
  | 'currency'
  | 'amount'
  | 'enabled'
  | 'nftContract'
  | 'nftContract__id'
  | 'nftContract__name'
  | 'nftContract__symbol'
  | 'nftContract__baseURI'
  | 'nftContract__contractURI'
  | 'nftContract__maxSupply'
  | 'nftContract__minter'
  | 'nftContract__forwarder'
  | 'nftContract__royaltyBps'
  | 'nftContract__allowList';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type OwnershipTransferred = {
  id: Scalars['Bytes'];
  previousOwner: Scalars['Bytes'];
  newOwner: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type OwnershipTransferred_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  previousOwner?: InputMaybe<Scalars['Bytes']>;
  previousOwner_not?: InputMaybe<Scalars['Bytes']>;
  previousOwner_gt?: InputMaybe<Scalars['Bytes']>;
  previousOwner_lt?: InputMaybe<Scalars['Bytes']>;
  previousOwner_gte?: InputMaybe<Scalars['Bytes']>;
  previousOwner_lte?: InputMaybe<Scalars['Bytes']>;
  previousOwner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  previousOwner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  previousOwner_contains?: InputMaybe<Scalars['Bytes']>;
  previousOwner_not_contains?: InputMaybe<Scalars['Bytes']>;
  newOwner?: InputMaybe<Scalars['Bytes']>;
  newOwner_not?: InputMaybe<Scalars['Bytes']>;
  newOwner_gt?: InputMaybe<Scalars['Bytes']>;
  newOwner_lt?: InputMaybe<Scalars['Bytes']>;
  newOwner_gte?: InputMaybe<Scalars['Bytes']>;
  newOwner_lte?: InputMaybe<Scalars['Bytes']>;
  newOwner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  newOwner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  newOwner_contains?: InputMaybe<Scalars['Bytes']>;
  newOwner_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<OwnershipTransferred_filter>>>;
  or?: InputMaybe<Array<InputMaybe<OwnershipTransferred_filter>>>;
};

export type OwnershipTransferred_orderBy =
  | 'id'
  | 'previousOwner'
  | 'newOwner'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Query = {
  adOffer?: Maybe<AdOffer>;
  adOffers: Array<AdOffer>;
  adOfferParameterLink?: Maybe<AdOfferParameterLink>;
  adOfferParameterLinks: Array<AdOfferParameterLink>;
  adParameter?: Maybe<AdParameter>;
  adParameters: Array<AdParameter>;
  adProposal?: Maybe<AdProposal>;
  adProposals: Array<AdProposal>;
  currentProposal?: Maybe<CurrentProposal>;
  currentProposals: Array<CurrentProposal>;
  epochCurrencyRevenue?: Maybe<EpochCurrencyRevenue>;
  epochCurrencyRevenues: Array<EpochCurrencyRevenue>;
  feeParamsForContract?: Maybe<FeeParamsForContract>;
  feeParamsForContracts: Array<FeeParamsForContract>;
  nftContract?: Maybe<NftContract>;
  nftContracts: Array<NftContract>;
  nftPrice?: Maybe<NftPrice>;
  nftPrices: Array<NftPrice>;
  marketplaceBid?: Maybe<MarketplaceBid>;
  marketplaceBids: Array<MarketplaceBid>;
  marketplaceDirectBuy?: Maybe<MarketplaceDirectBuy>;
  marketplaceDirectBuys: Array<MarketplaceDirectBuy>;
  marketplaceListing?: Maybe<MarketplaceListing>;
  marketplaceListings: Array<MarketplaceListing>;
  marketplaceOffer?: Maybe<MarketplaceOffer>;
  marketplaceOffers: Array<MarketplaceOffer>;
  revenueTransaction?: Maybe<RevenueTransaction>;
  revenueTransactions: Array<RevenueTransaction>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  tokenPrice?: Maybe<TokenPrice>;
  tokenPrices: Array<TokenPrice>;
  callWithProtocolFee?: Maybe<CallWithProtocolFee>;
  callWithProtocolFees: Array<CallWithProtocolFee>;
  feeUpdate?: Maybe<FeeUpdate>;
  feeUpdates: Array<FeeUpdate>;
  ownershipTransferred?: Maybe<OwnershipTransferred>;
  ownershipTransferreds: Array<OwnershipTransferred>;
  updateAdProposal?: Maybe<UpdateAdProposal>;
  updateAdProposals: Array<UpdateAdProposal>;
  updateAdValidation?: Maybe<UpdateAdValidation>;
  updateAdValidations: Array<UpdateAdValidation>;
  updateOffer?: Maybe<UpdateOffer>;
  updateOffers: Array<UpdateOffer>;
  updateOfferAdParameter?: Maybe<UpdateOfferAdParameter>;
  updateOfferAdParameters: Array<UpdateOfferAdParameter>;
  updateOfferAdmin?: Maybe<UpdateOfferAdmin>;
  updateOfferAdmins: Array<UpdateOfferAdmin>;
  updateOfferValidator?: Maybe<UpdateOfferValidator>;
  updateOfferValidators: Array<UpdateOfferValidator>;
  newDSponsorNFT?: Maybe<NewDSponsorNFT>;
  newDSponsorNFTs: Array<NewDSponsorNFT>;
  contractURIUpdated?: Maybe<ContractURIUpdated>;
  contractURIUpdateds: Array<ContractURIUpdated>;
  mint?: Maybe<Mint>;
  mints: Array<Mint>;
  tokensAllowlist?: Maybe<TokensAllowlist>;
  tokensAllowlists: Array<TokensAllowlist>;
  tokensAllowlistUpdated?: Maybe<TokensAllowlistUpdated>;
  tokensAllowlistUpdateds: Array<TokensAllowlistUpdated>;
  updateDefaultMintPrice?: Maybe<UpdateDefaultMintPrice>;
  updateDefaultMintPrices: Array<UpdateDefaultMintPrice>;
  updateMintPrice?: Maybe<UpdateMintPrice>;
  updateMintPrices: Array<UpdateMintPrice>;
  updateUser?: Maybe<UpdateUser>;
  updateUsers: Array<UpdateUser>;
  acceptedOffer?: Maybe<AcceptedOffer>;
  acceptedOffers: Array<AcceptedOffer>;
  auctionClosed?: Maybe<AuctionClosed>;
  auctionCloseds: Array<AuctionClosed>;
  cancelledOffer?: Maybe<CancelledOffer>;
  cancelledOffers: Array<CancelledOffer>;
  listingAdded?: Maybe<ListingAdded>;
  listingAddeds: Array<ListingAdded>;
  listingRemoved?: Maybe<ListingRemoved>;
  listingRemoveds: Array<ListingRemoved>;
  listingUpdated?: Maybe<ListingUpdated>;
  listingUpdateds: Array<ListingUpdated>;
  newBid?: Maybe<NewBid>;
  newBids: Array<NewBid>;
  newOffer?: Maybe<NewOffer>;
  newOffers: Array<NewOffer>;
  newSale?: Maybe<NewSale>;
  newSales: Array<NewSale>;
  offerSearch: Array<AdOffer>;
  offerSearchFR: Array<AdOffer>;
  offerSearchEN: Array<AdOffer>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryadOfferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryadOffersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AdOffer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AdOffer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryadOfferParameterLinkArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryadOfferParameterLinksArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AdOfferParameterLink_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AdOfferParameterLink_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryadParameterArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryadParametersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AdParameter_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AdParameter_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryadProposalArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryadProposalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AdProposal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AdProposal_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycurrentProposalArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycurrentProposalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CurrentProposal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CurrentProposal_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryepochCurrencyRevenueArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryepochCurrencyRevenuesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<EpochCurrencyRevenue_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<EpochCurrencyRevenue_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryfeeParamsForContractArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryfeeParamsForContractsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FeeParamsForContract_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<FeeParamsForContract_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynftContractArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynftContractsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NftContract_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NftContract_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynftPriceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynftPricesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NftPrice_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NftPrice_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymarketplaceBidArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymarketplaceBidsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarketplaceBid_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MarketplaceBid_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymarketplaceDirectBuyArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymarketplaceDirectBuysArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarketplaceDirectBuy_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MarketplaceDirectBuy_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymarketplaceListingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymarketplaceListingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarketplaceListing_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MarketplaceListing_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymarketplaceOfferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymarketplaceOffersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarketplaceOffer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MarketplaceOffer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryrevenueTransactionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryrevenueTransactionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RevenueTransaction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RevenueTransaction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Token_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokenPriceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokenPricesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenPrice_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenPrice_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycallWithProtocolFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycallWithProtocolFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CallWithProtocolFee_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CallWithProtocolFee_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryfeeUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryfeeUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FeeUpdate_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<FeeUpdate_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryownershipTransferredArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryownershipTransferredsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OwnershipTransferred_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<OwnershipTransferred_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryupdateAdProposalArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryupdateAdProposalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UpdateAdProposal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UpdateAdProposal_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryupdateAdValidationArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryupdateAdValidationsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UpdateAdValidation_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UpdateAdValidation_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryupdateOfferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryupdateOffersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UpdateOffer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UpdateOffer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryupdateOfferAdParameterArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryupdateOfferAdParametersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UpdateOfferAdParameter_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UpdateOfferAdParameter_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryupdateOfferAdminArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryupdateOfferAdminsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UpdateOfferAdmin_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UpdateOfferAdmin_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryupdateOfferValidatorArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryupdateOfferValidatorsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UpdateOfferValidator_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UpdateOfferValidator_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynewDSponsorNFTArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynewDSponsorNFTsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NewDSponsorNFT_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NewDSponsorNFT_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycontractURIUpdatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycontractURIUpdatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ContractURIUpdated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ContractURIUpdated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymintArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymintsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Mint_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Mint_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokensAllowlistArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokensAllowlistsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokensAllowlist_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokensAllowlist_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokensAllowlistUpdatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokensAllowlistUpdatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokensAllowlistUpdated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokensAllowlistUpdated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryupdateDefaultMintPriceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryupdateDefaultMintPricesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UpdateDefaultMintPrice_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UpdateDefaultMintPrice_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryupdateMintPriceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryupdateMintPricesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UpdateMintPrice_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UpdateMintPrice_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryupdateUserArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryupdateUsersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UpdateUser_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UpdateUser_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryacceptedOfferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryacceptedOffersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AcceptedOffer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AcceptedOffer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryauctionClosedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryauctionClosedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AuctionClosed_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AuctionClosed_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycancelledOfferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycancelledOffersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CancelledOffer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CancelledOffer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerylistingAddedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerylistingAddedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ListingAdded_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ListingAdded_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerylistingRemovedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerylistingRemovedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ListingRemoved_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ListingRemoved_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerylistingUpdatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerylistingUpdatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ListingUpdated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ListingUpdated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynewBidArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynewBidsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NewBid_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NewBid_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynewOfferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynewOffersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NewOffer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NewOffer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynewSaleArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynewSalesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NewSale_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NewSale_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryofferSearchArgs = {
  text: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  block?: InputMaybe<Block_height>;
  where?: InputMaybe<AdOffer_filter>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryofferSearchFRArgs = {
  text: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  block?: InputMaybe<Block_height>;
  where?: InputMaybe<AdOffer_filter>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryofferSearchENArgs = {
  text: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  block?: InputMaybe<Block_height>;
  where?: InputMaybe<AdOffer_filter>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type RevenueTransaction = {
  id: Scalars['Bytes'];
  blockTimestamp: Scalars['BigInt'];
  protocolFees?: Maybe<Array<CallWithProtocolFee>>;
  marketplaceBids?: Maybe<Array<MarketplaceBid>>;
  marketplaceDirectBuys?: Maybe<Array<MarketplaceDirectBuy>>;
  marketplaceOffers?: Maybe<Array<MarketplaceOffer>>;
  mints?: Maybe<Array<Mint>>;
};


export type RevenueTransactionprotocolFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CallWithProtocolFee_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CallWithProtocolFee_filter>;
};


export type RevenueTransactionmarketplaceBidsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarketplaceBid_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MarketplaceBid_filter>;
};


export type RevenueTransactionmarketplaceDirectBuysArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarketplaceDirectBuy_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MarketplaceDirectBuy_filter>;
};


export type RevenueTransactionmarketplaceOffersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarketplaceOffer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MarketplaceOffer_filter>;
};


export type RevenueTransactionmintsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Mint_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Mint_filter>;
};

export type RevenueTransaction_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  protocolFees_?: InputMaybe<CallWithProtocolFee_filter>;
  marketplaceBids_?: InputMaybe<MarketplaceBid_filter>;
  marketplaceDirectBuys_?: InputMaybe<MarketplaceDirectBuy_filter>;
  marketplaceOffers_?: InputMaybe<MarketplaceOffer_filter>;
  mints_?: InputMaybe<Mint_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RevenueTransaction_filter>>>;
  or?: InputMaybe<Array<InputMaybe<RevenueTransaction_filter>>>;
};

export type RevenueTransaction_orderBy =
  | 'id'
  | 'blockTimestamp'
  | 'protocolFees'
  | 'marketplaceBids'
  | 'marketplaceDirectBuys'
  | 'marketplaceOffers'
  | 'mints';

export type Status =
  | 'UNSET'
  | 'CREATED'
  | 'COMPLETED'
  | 'CANCELLED';

export type Subscription = {
  adOffer?: Maybe<AdOffer>;
  adOffers: Array<AdOffer>;
  adOfferParameterLink?: Maybe<AdOfferParameterLink>;
  adOfferParameterLinks: Array<AdOfferParameterLink>;
  adParameter?: Maybe<AdParameter>;
  adParameters: Array<AdParameter>;
  adProposal?: Maybe<AdProposal>;
  adProposals: Array<AdProposal>;
  currentProposal?: Maybe<CurrentProposal>;
  currentProposals: Array<CurrentProposal>;
  epochCurrencyRevenue?: Maybe<EpochCurrencyRevenue>;
  epochCurrencyRevenues: Array<EpochCurrencyRevenue>;
  feeParamsForContract?: Maybe<FeeParamsForContract>;
  feeParamsForContracts: Array<FeeParamsForContract>;
  nftContract?: Maybe<NftContract>;
  nftContracts: Array<NftContract>;
  nftPrice?: Maybe<NftPrice>;
  nftPrices: Array<NftPrice>;
  marketplaceBid?: Maybe<MarketplaceBid>;
  marketplaceBids: Array<MarketplaceBid>;
  marketplaceDirectBuy?: Maybe<MarketplaceDirectBuy>;
  marketplaceDirectBuys: Array<MarketplaceDirectBuy>;
  marketplaceListing?: Maybe<MarketplaceListing>;
  marketplaceListings: Array<MarketplaceListing>;
  marketplaceOffer?: Maybe<MarketplaceOffer>;
  marketplaceOffers: Array<MarketplaceOffer>;
  revenueTransaction?: Maybe<RevenueTransaction>;
  revenueTransactions: Array<RevenueTransaction>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  tokenPrice?: Maybe<TokenPrice>;
  tokenPrices: Array<TokenPrice>;
  callWithProtocolFee?: Maybe<CallWithProtocolFee>;
  callWithProtocolFees: Array<CallWithProtocolFee>;
  feeUpdate?: Maybe<FeeUpdate>;
  feeUpdates: Array<FeeUpdate>;
  ownershipTransferred?: Maybe<OwnershipTransferred>;
  ownershipTransferreds: Array<OwnershipTransferred>;
  updateAdProposal?: Maybe<UpdateAdProposal>;
  updateAdProposals: Array<UpdateAdProposal>;
  updateAdValidation?: Maybe<UpdateAdValidation>;
  updateAdValidations: Array<UpdateAdValidation>;
  updateOffer?: Maybe<UpdateOffer>;
  updateOffers: Array<UpdateOffer>;
  updateOfferAdParameter?: Maybe<UpdateOfferAdParameter>;
  updateOfferAdParameters: Array<UpdateOfferAdParameter>;
  updateOfferAdmin?: Maybe<UpdateOfferAdmin>;
  updateOfferAdmins: Array<UpdateOfferAdmin>;
  updateOfferValidator?: Maybe<UpdateOfferValidator>;
  updateOfferValidators: Array<UpdateOfferValidator>;
  newDSponsorNFT?: Maybe<NewDSponsorNFT>;
  newDSponsorNFTs: Array<NewDSponsorNFT>;
  contractURIUpdated?: Maybe<ContractURIUpdated>;
  contractURIUpdateds: Array<ContractURIUpdated>;
  mint?: Maybe<Mint>;
  mints: Array<Mint>;
  tokensAllowlist?: Maybe<TokensAllowlist>;
  tokensAllowlists: Array<TokensAllowlist>;
  tokensAllowlistUpdated?: Maybe<TokensAllowlistUpdated>;
  tokensAllowlistUpdateds: Array<TokensAllowlistUpdated>;
  updateDefaultMintPrice?: Maybe<UpdateDefaultMintPrice>;
  updateDefaultMintPrices: Array<UpdateDefaultMintPrice>;
  updateMintPrice?: Maybe<UpdateMintPrice>;
  updateMintPrices: Array<UpdateMintPrice>;
  updateUser?: Maybe<UpdateUser>;
  updateUsers: Array<UpdateUser>;
  acceptedOffer?: Maybe<AcceptedOffer>;
  acceptedOffers: Array<AcceptedOffer>;
  auctionClosed?: Maybe<AuctionClosed>;
  auctionCloseds: Array<AuctionClosed>;
  cancelledOffer?: Maybe<CancelledOffer>;
  cancelledOffers: Array<CancelledOffer>;
  listingAdded?: Maybe<ListingAdded>;
  listingAddeds: Array<ListingAdded>;
  listingRemoved?: Maybe<ListingRemoved>;
  listingRemoveds: Array<ListingRemoved>;
  listingUpdated?: Maybe<ListingUpdated>;
  listingUpdateds: Array<ListingUpdated>;
  newBid?: Maybe<NewBid>;
  newBids: Array<NewBid>;
  newOffer?: Maybe<NewOffer>;
  newOffers: Array<NewOffer>;
  newSale?: Maybe<NewSale>;
  newSales: Array<NewSale>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionadOfferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionadOffersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AdOffer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AdOffer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionadOfferParameterLinkArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionadOfferParameterLinksArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AdOfferParameterLink_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AdOfferParameterLink_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionadParameterArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionadParametersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AdParameter_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AdParameter_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionadProposalArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionadProposalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AdProposal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AdProposal_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncurrentProposalArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncurrentProposalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CurrentProposal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CurrentProposal_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionepochCurrencyRevenueArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionepochCurrencyRevenuesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<EpochCurrencyRevenue_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<EpochCurrencyRevenue_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionfeeParamsForContractArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionfeeParamsForContractsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FeeParamsForContract_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<FeeParamsForContract_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnftContractArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnftContractsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NftContract_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NftContract_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnftPriceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnftPricesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NftPrice_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NftPrice_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmarketplaceBidArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmarketplaceBidsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarketplaceBid_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MarketplaceBid_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmarketplaceDirectBuyArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmarketplaceDirectBuysArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarketplaceDirectBuy_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MarketplaceDirectBuy_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmarketplaceListingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmarketplaceListingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarketplaceListing_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MarketplaceListing_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmarketplaceOfferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmarketplaceOffersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarketplaceOffer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MarketplaceOffer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionrevenueTransactionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionrevenueTransactionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RevenueTransaction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RevenueTransaction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Token_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokenPriceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokenPricesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenPrice_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenPrice_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncallWithProtocolFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncallWithProtocolFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CallWithProtocolFee_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CallWithProtocolFee_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionfeeUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionfeeUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FeeUpdate_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<FeeUpdate_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionownershipTransferredArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionownershipTransferredsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OwnershipTransferred_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<OwnershipTransferred_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionupdateAdProposalArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionupdateAdProposalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UpdateAdProposal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UpdateAdProposal_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionupdateAdValidationArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionupdateAdValidationsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UpdateAdValidation_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UpdateAdValidation_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionupdateOfferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionupdateOffersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UpdateOffer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UpdateOffer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionupdateOfferAdParameterArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionupdateOfferAdParametersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UpdateOfferAdParameter_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UpdateOfferAdParameter_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionupdateOfferAdminArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionupdateOfferAdminsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UpdateOfferAdmin_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UpdateOfferAdmin_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionupdateOfferValidatorArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionupdateOfferValidatorsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UpdateOfferValidator_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UpdateOfferValidator_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnewDSponsorNFTArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnewDSponsorNFTsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NewDSponsorNFT_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NewDSponsorNFT_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncontractURIUpdatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncontractURIUpdatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ContractURIUpdated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ContractURIUpdated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmintArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmintsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Mint_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Mint_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokensAllowlistArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokensAllowlistsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokensAllowlist_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokensAllowlist_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokensAllowlistUpdatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokensAllowlistUpdatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokensAllowlistUpdated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokensAllowlistUpdated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionupdateDefaultMintPriceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionupdateDefaultMintPricesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UpdateDefaultMintPrice_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UpdateDefaultMintPrice_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionupdateMintPriceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionupdateMintPricesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UpdateMintPrice_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UpdateMintPrice_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionupdateUserArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionupdateUsersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UpdateUser_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UpdateUser_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionacceptedOfferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionacceptedOffersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AcceptedOffer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AcceptedOffer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionauctionClosedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionauctionClosedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AuctionClosed_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AuctionClosed_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncancelledOfferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncancelledOffersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CancelledOffer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CancelledOffer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionlistingAddedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionlistingAddedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ListingAdded_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ListingAdded_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionlistingRemovedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionlistingRemovedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ListingRemoved_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ListingRemoved_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionlistingUpdatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionlistingUpdatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ListingUpdated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ListingUpdated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnewBidArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnewBidsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NewBid_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NewBid_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnewOfferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnewOffersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NewOffer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NewOffer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnewSaleArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnewSalesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NewSale_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NewSale_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Token = {
  id: Scalars['String'];
  nftContract: NftContract;
  tokenId: Scalars['BigInt'];
  setInAllowList: Scalars['Boolean'];
  mint?: Maybe<Mint>;
  user?: Maybe<UpdateUser>;
  prices?: Maybe<Array<TokenPrice>>;
  currentProposals?: Maybe<Array<CurrentProposal>>;
  allProposals?: Maybe<Array<AdProposal>>;
  marketplaceListings?: Maybe<Array<MarketplaceListing>>;
  marketplaceOffers?: Maybe<Array<MarketplaceOffer>>;
};


export type TokenpricesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenPrice_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenPrice_filter>;
};


export type TokencurrentProposalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CurrentProposal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CurrentProposal_filter>;
};


export type TokenallProposalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AdProposal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AdProposal_filter>;
};


export type TokenmarketplaceListingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarketplaceListing_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MarketplaceListing_filter>;
};


export type TokenmarketplaceOffersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarketplaceOffer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MarketplaceOffer_filter>;
};

export type TokenPrice = {
  id: Scalars['String'];
  currency: Scalars['Bytes'];
  amount: Scalars['BigInt'];
  enabled: Scalars['Boolean'];
  token: Token;
};

export type TokenPrice_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['Bytes']>;
  currency_not?: InputMaybe<Scalars['Bytes']>;
  currency_gt?: InputMaybe<Scalars['Bytes']>;
  currency_lt?: InputMaybe<Scalars['Bytes']>;
  currency_gte?: InputMaybe<Scalars['Bytes']>;
  currency_lte?: InputMaybe<Scalars['Bytes']>;
  currency_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currency_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currency_contains?: InputMaybe<Scalars['Bytes']>;
  currency_not_contains?: InputMaybe<Scalars['Bytes']>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  enabled?: InputMaybe<Scalars['Boolean']>;
  enabled_not?: InputMaybe<Scalars['Boolean']>;
  enabled_in?: InputMaybe<Array<Scalars['Boolean']>>;
  enabled_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  token?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_?: InputMaybe<Token_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TokenPrice_filter>>>;
  or?: InputMaybe<Array<InputMaybe<TokenPrice_filter>>>;
};

export type TokenPrice_orderBy =
  | 'id'
  | 'currency'
  | 'amount'
  | 'enabled'
  | 'token'
  | 'token__id'
  | 'token__tokenId'
  | 'token__setInAllowList';

export type TokenType =
  | 'ERC1155'
  | 'ERC721'
  | 'ERC20';

export type Token_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nftContract?: InputMaybe<Scalars['String']>;
  nftContract_not?: InputMaybe<Scalars['String']>;
  nftContract_gt?: InputMaybe<Scalars['String']>;
  nftContract_lt?: InputMaybe<Scalars['String']>;
  nftContract_gte?: InputMaybe<Scalars['String']>;
  nftContract_lte?: InputMaybe<Scalars['String']>;
  nftContract_in?: InputMaybe<Array<Scalars['String']>>;
  nftContract_not_in?: InputMaybe<Array<Scalars['String']>>;
  nftContract_contains?: InputMaybe<Scalars['String']>;
  nftContract_contains_nocase?: InputMaybe<Scalars['String']>;
  nftContract_not_contains?: InputMaybe<Scalars['String']>;
  nftContract_not_contains_nocase?: InputMaybe<Scalars['String']>;
  nftContract_starts_with?: InputMaybe<Scalars['String']>;
  nftContract_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nftContract_not_starts_with?: InputMaybe<Scalars['String']>;
  nftContract_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nftContract_ends_with?: InputMaybe<Scalars['String']>;
  nftContract_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nftContract_not_ends_with?: InputMaybe<Scalars['String']>;
  nftContract_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nftContract_?: InputMaybe<NftContract_filter>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  setInAllowList?: InputMaybe<Scalars['Boolean']>;
  setInAllowList_not?: InputMaybe<Scalars['Boolean']>;
  setInAllowList_in?: InputMaybe<Array<Scalars['Boolean']>>;
  setInAllowList_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  mint?: InputMaybe<Scalars['String']>;
  mint_not?: InputMaybe<Scalars['String']>;
  mint_gt?: InputMaybe<Scalars['String']>;
  mint_lt?: InputMaybe<Scalars['String']>;
  mint_gte?: InputMaybe<Scalars['String']>;
  mint_lte?: InputMaybe<Scalars['String']>;
  mint_in?: InputMaybe<Array<Scalars['String']>>;
  mint_not_in?: InputMaybe<Array<Scalars['String']>>;
  mint_contains?: InputMaybe<Scalars['String']>;
  mint_contains_nocase?: InputMaybe<Scalars['String']>;
  mint_not_contains?: InputMaybe<Scalars['String']>;
  mint_not_contains_nocase?: InputMaybe<Scalars['String']>;
  mint_starts_with?: InputMaybe<Scalars['String']>;
  mint_starts_with_nocase?: InputMaybe<Scalars['String']>;
  mint_not_starts_with?: InputMaybe<Scalars['String']>;
  mint_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  mint_ends_with?: InputMaybe<Scalars['String']>;
  mint_ends_with_nocase?: InputMaybe<Scalars['String']>;
  mint_not_ends_with?: InputMaybe<Scalars['String']>;
  mint_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  mint_?: InputMaybe<Mint_filter>;
  user?: InputMaybe<Scalars['String']>;
  user_not?: InputMaybe<Scalars['String']>;
  user_gt?: InputMaybe<Scalars['String']>;
  user_lt?: InputMaybe<Scalars['String']>;
  user_gte?: InputMaybe<Scalars['String']>;
  user_lte?: InputMaybe<Scalars['String']>;
  user_in?: InputMaybe<Array<Scalars['String']>>;
  user_not_in?: InputMaybe<Array<Scalars['String']>>;
  user_contains?: InputMaybe<Scalars['String']>;
  user_contains_nocase?: InputMaybe<Scalars['String']>;
  user_not_contains?: InputMaybe<Scalars['String']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']>;
  user_starts_with?: InputMaybe<Scalars['String']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user_not_starts_with?: InputMaybe<Scalars['String']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user_ends_with?: InputMaybe<Scalars['String']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_not_ends_with?: InputMaybe<Scalars['String']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_?: InputMaybe<UpdateUser_filter>;
  prices_?: InputMaybe<TokenPrice_filter>;
  currentProposals_?: InputMaybe<CurrentProposal_filter>;
  allProposals_?: InputMaybe<AdProposal_filter>;
  marketplaceListings_?: InputMaybe<MarketplaceListing_filter>;
  marketplaceOffers_?: InputMaybe<MarketplaceOffer_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Token_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Token_filter>>>;
};

export type Token_orderBy =
  | 'id'
  | 'nftContract'
  | 'nftContract__id'
  | 'nftContract__name'
  | 'nftContract__symbol'
  | 'nftContract__baseURI'
  | 'nftContract__contractURI'
  | 'nftContract__maxSupply'
  | 'nftContract__minter'
  | 'nftContract__forwarder'
  | 'nftContract__royaltyBps'
  | 'nftContract__allowList'
  | 'tokenId'
  | 'setInAllowList'
  | 'mint'
  | 'mint__id'
  | 'mint__contractAddress'
  | 'mint__tokenId'
  | 'mint__from'
  | 'mint__to'
  | 'mint__currency'
  | 'mint__amount'
  | 'mint__tokenData'
  | 'mint__blockNumber'
  | 'mint__blockTimestamp'
  | 'mint__transactionHash'
  | 'mint__feeMethodology'
  | 'mint__amountSentToProtocol'
  | 'mint__protocolRecipient'
  | 'user'
  | 'user__id'
  | 'user__tokenId'
  | 'user__user'
  | 'user__expires'
  | 'user__blockNumber'
  | 'user__blockTimestamp'
  | 'user__transactionHash'
  | 'prices'
  | 'currentProposals'
  | 'allProposals'
  | 'marketplaceListings'
  | 'marketplaceOffers';

export type TokensAllowlist = {
  id: Scalars['Bytes'];
  allowed: Scalars['Boolean'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type TokensAllowlistUpdated = {
  id: Scalars['Bytes'];
  tokenId: Scalars['BigInt'];
  allowed: Scalars['Boolean'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type TokensAllowlistUpdated_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  allowed?: InputMaybe<Scalars['Boolean']>;
  allowed_not?: InputMaybe<Scalars['Boolean']>;
  allowed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  allowed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TokensAllowlistUpdated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<TokensAllowlistUpdated_filter>>>;
};

export type TokensAllowlistUpdated_orderBy =
  | 'id'
  | 'tokenId'
  | 'allowed'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type TokensAllowlist_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  allowed?: InputMaybe<Scalars['Boolean']>;
  allowed_not?: InputMaybe<Scalars['Boolean']>;
  allowed_in?: InputMaybe<Array<Scalars['Boolean']>>;
  allowed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TokensAllowlist_filter>>>;
  or?: InputMaybe<Array<InputMaybe<TokensAllowlist_filter>>>;
};

export type TokensAllowlist_orderBy =
  | 'id'
  | 'allowed'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type TransferType =
  | 'Rent'
  | 'Sale';

export type UpdateAdProposal = {
  id: Scalars['Bytes'];
  offerId: Scalars['BigInt'];
  tokenId: Scalars['BigInt'];
  proposalId: Scalars['BigInt'];
  adParameter: Scalars['String'];
  data: Scalars['String'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type UpdateAdProposal_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  offerId?: InputMaybe<Scalars['BigInt']>;
  offerId_not?: InputMaybe<Scalars['BigInt']>;
  offerId_gt?: InputMaybe<Scalars['BigInt']>;
  offerId_lt?: InputMaybe<Scalars['BigInt']>;
  offerId_gte?: InputMaybe<Scalars['BigInt']>;
  offerId_lte?: InputMaybe<Scalars['BigInt']>;
  offerId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  offerId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposalId?: InputMaybe<Scalars['BigInt']>;
  proposalId_not?: InputMaybe<Scalars['BigInt']>;
  proposalId_gt?: InputMaybe<Scalars['BigInt']>;
  proposalId_lt?: InputMaybe<Scalars['BigInt']>;
  proposalId_gte?: InputMaybe<Scalars['BigInt']>;
  proposalId_lte?: InputMaybe<Scalars['BigInt']>;
  proposalId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposalId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adParameter?: InputMaybe<Scalars['String']>;
  adParameter_not?: InputMaybe<Scalars['String']>;
  adParameter_gt?: InputMaybe<Scalars['String']>;
  adParameter_lt?: InputMaybe<Scalars['String']>;
  adParameter_gte?: InputMaybe<Scalars['String']>;
  adParameter_lte?: InputMaybe<Scalars['String']>;
  adParameter_in?: InputMaybe<Array<Scalars['String']>>;
  adParameter_not_in?: InputMaybe<Array<Scalars['String']>>;
  adParameter_contains?: InputMaybe<Scalars['String']>;
  adParameter_contains_nocase?: InputMaybe<Scalars['String']>;
  adParameter_not_contains?: InputMaybe<Scalars['String']>;
  adParameter_not_contains_nocase?: InputMaybe<Scalars['String']>;
  adParameter_starts_with?: InputMaybe<Scalars['String']>;
  adParameter_starts_with_nocase?: InputMaybe<Scalars['String']>;
  adParameter_not_starts_with?: InputMaybe<Scalars['String']>;
  adParameter_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  adParameter_ends_with?: InputMaybe<Scalars['String']>;
  adParameter_ends_with_nocase?: InputMaybe<Scalars['String']>;
  adParameter_not_ends_with?: InputMaybe<Scalars['String']>;
  adParameter_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  data?: InputMaybe<Scalars['String']>;
  data_not?: InputMaybe<Scalars['String']>;
  data_gt?: InputMaybe<Scalars['String']>;
  data_lt?: InputMaybe<Scalars['String']>;
  data_gte?: InputMaybe<Scalars['String']>;
  data_lte?: InputMaybe<Scalars['String']>;
  data_in?: InputMaybe<Array<Scalars['String']>>;
  data_not_in?: InputMaybe<Array<Scalars['String']>>;
  data_contains?: InputMaybe<Scalars['String']>;
  data_contains_nocase?: InputMaybe<Scalars['String']>;
  data_not_contains?: InputMaybe<Scalars['String']>;
  data_not_contains_nocase?: InputMaybe<Scalars['String']>;
  data_starts_with?: InputMaybe<Scalars['String']>;
  data_starts_with_nocase?: InputMaybe<Scalars['String']>;
  data_not_starts_with?: InputMaybe<Scalars['String']>;
  data_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  data_ends_with?: InputMaybe<Scalars['String']>;
  data_ends_with_nocase?: InputMaybe<Scalars['String']>;
  data_not_ends_with?: InputMaybe<Scalars['String']>;
  data_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<UpdateAdProposal_filter>>>;
  or?: InputMaybe<Array<InputMaybe<UpdateAdProposal_filter>>>;
};

export type UpdateAdProposal_orderBy =
  | 'id'
  | 'offerId'
  | 'tokenId'
  | 'proposalId'
  | 'adParameter'
  | 'data'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type UpdateAdValidation = {
  id: Scalars['Bytes'];
  offerId: Scalars['BigInt'];
  tokenId: Scalars['BigInt'];
  proposalId: Scalars['BigInt'];
  adParameter: Scalars['String'];
  validated: Scalars['Boolean'];
  reason: Scalars['String'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type UpdateAdValidation_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  offerId?: InputMaybe<Scalars['BigInt']>;
  offerId_not?: InputMaybe<Scalars['BigInt']>;
  offerId_gt?: InputMaybe<Scalars['BigInt']>;
  offerId_lt?: InputMaybe<Scalars['BigInt']>;
  offerId_gte?: InputMaybe<Scalars['BigInt']>;
  offerId_lte?: InputMaybe<Scalars['BigInt']>;
  offerId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  offerId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposalId?: InputMaybe<Scalars['BigInt']>;
  proposalId_not?: InputMaybe<Scalars['BigInt']>;
  proposalId_gt?: InputMaybe<Scalars['BigInt']>;
  proposalId_lt?: InputMaybe<Scalars['BigInt']>;
  proposalId_gte?: InputMaybe<Scalars['BigInt']>;
  proposalId_lte?: InputMaybe<Scalars['BigInt']>;
  proposalId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposalId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adParameter?: InputMaybe<Scalars['String']>;
  adParameter_not?: InputMaybe<Scalars['String']>;
  adParameter_gt?: InputMaybe<Scalars['String']>;
  adParameter_lt?: InputMaybe<Scalars['String']>;
  adParameter_gte?: InputMaybe<Scalars['String']>;
  adParameter_lte?: InputMaybe<Scalars['String']>;
  adParameter_in?: InputMaybe<Array<Scalars['String']>>;
  adParameter_not_in?: InputMaybe<Array<Scalars['String']>>;
  adParameter_contains?: InputMaybe<Scalars['String']>;
  adParameter_contains_nocase?: InputMaybe<Scalars['String']>;
  adParameter_not_contains?: InputMaybe<Scalars['String']>;
  adParameter_not_contains_nocase?: InputMaybe<Scalars['String']>;
  adParameter_starts_with?: InputMaybe<Scalars['String']>;
  adParameter_starts_with_nocase?: InputMaybe<Scalars['String']>;
  adParameter_not_starts_with?: InputMaybe<Scalars['String']>;
  adParameter_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  adParameter_ends_with?: InputMaybe<Scalars['String']>;
  adParameter_ends_with_nocase?: InputMaybe<Scalars['String']>;
  adParameter_not_ends_with?: InputMaybe<Scalars['String']>;
  adParameter_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  validated?: InputMaybe<Scalars['Boolean']>;
  validated_not?: InputMaybe<Scalars['Boolean']>;
  validated_in?: InputMaybe<Array<Scalars['Boolean']>>;
  validated_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  reason?: InputMaybe<Scalars['String']>;
  reason_not?: InputMaybe<Scalars['String']>;
  reason_gt?: InputMaybe<Scalars['String']>;
  reason_lt?: InputMaybe<Scalars['String']>;
  reason_gte?: InputMaybe<Scalars['String']>;
  reason_lte?: InputMaybe<Scalars['String']>;
  reason_in?: InputMaybe<Array<Scalars['String']>>;
  reason_not_in?: InputMaybe<Array<Scalars['String']>>;
  reason_contains?: InputMaybe<Scalars['String']>;
  reason_contains_nocase?: InputMaybe<Scalars['String']>;
  reason_not_contains?: InputMaybe<Scalars['String']>;
  reason_not_contains_nocase?: InputMaybe<Scalars['String']>;
  reason_starts_with?: InputMaybe<Scalars['String']>;
  reason_starts_with_nocase?: InputMaybe<Scalars['String']>;
  reason_not_starts_with?: InputMaybe<Scalars['String']>;
  reason_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  reason_ends_with?: InputMaybe<Scalars['String']>;
  reason_ends_with_nocase?: InputMaybe<Scalars['String']>;
  reason_not_ends_with?: InputMaybe<Scalars['String']>;
  reason_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<UpdateAdValidation_filter>>>;
  or?: InputMaybe<Array<InputMaybe<UpdateAdValidation_filter>>>;
};

export type UpdateAdValidation_orderBy =
  | 'id'
  | 'offerId'
  | 'tokenId'
  | 'proposalId'
  | 'adParameter'
  | 'validated'
  | 'reason'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

/**
 * type Transfer @entity(immutable: true) {
 *   id: Bytes!
 *   from: Bytes! # address
 *   to: Bytes! # address
 *   tokenId: BigInt! # uint256
 *   blockNumber: BigInt!
 *   blockTimestamp: BigInt!
 *   transactionHash: Bytes!
 * }
 *
 */
export type UpdateDefaultMintPrice = {
  id: Scalars['Bytes'];
  currency: Scalars['Bytes'];
  enabled: Scalars['Boolean'];
  amount: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type UpdateDefaultMintPrice_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  currency?: InputMaybe<Scalars['Bytes']>;
  currency_not?: InputMaybe<Scalars['Bytes']>;
  currency_gt?: InputMaybe<Scalars['Bytes']>;
  currency_lt?: InputMaybe<Scalars['Bytes']>;
  currency_gte?: InputMaybe<Scalars['Bytes']>;
  currency_lte?: InputMaybe<Scalars['Bytes']>;
  currency_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currency_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currency_contains?: InputMaybe<Scalars['Bytes']>;
  currency_not_contains?: InputMaybe<Scalars['Bytes']>;
  enabled?: InputMaybe<Scalars['Boolean']>;
  enabled_not?: InputMaybe<Scalars['Boolean']>;
  enabled_in?: InputMaybe<Array<Scalars['Boolean']>>;
  enabled_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<UpdateDefaultMintPrice_filter>>>;
  or?: InputMaybe<Array<InputMaybe<UpdateDefaultMintPrice_filter>>>;
};

export type UpdateDefaultMintPrice_orderBy =
  | 'id'
  | 'currency'
  | 'enabled'
  | 'amount'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type UpdateMintPrice = {
  id: Scalars['Bytes'];
  tokenId: Scalars['BigInt'];
  currency: Scalars['Bytes'];
  enabled: Scalars['Boolean'];
  amount: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type UpdateMintPrice_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currency?: InputMaybe<Scalars['Bytes']>;
  currency_not?: InputMaybe<Scalars['Bytes']>;
  currency_gt?: InputMaybe<Scalars['Bytes']>;
  currency_lt?: InputMaybe<Scalars['Bytes']>;
  currency_gte?: InputMaybe<Scalars['Bytes']>;
  currency_lte?: InputMaybe<Scalars['Bytes']>;
  currency_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currency_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  currency_contains?: InputMaybe<Scalars['Bytes']>;
  currency_not_contains?: InputMaybe<Scalars['Bytes']>;
  enabled?: InputMaybe<Scalars['Boolean']>;
  enabled_not?: InputMaybe<Scalars['Boolean']>;
  enabled_in?: InputMaybe<Array<Scalars['Boolean']>>;
  enabled_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<UpdateMintPrice_filter>>>;
  or?: InputMaybe<Array<InputMaybe<UpdateMintPrice_filter>>>;
};

export type UpdateMintPrice_orderBy =
  | 'id'
  | 'tokenId'
  | 'currency'
  | 'enabled'
  | 'amount'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type UpdateOffer = {
  id: Scalars['Bytes'];
  offerId: Scalars['BigInt'];
  disable: Scalars['Boolean'];
  name: Scalars['String'];
  offerMetadata: Scalars['String'];
  nftContract: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type UpdateOfferAdParameter = {
  id: Scalars['Bytes'];
  offerId: Scalars['BigInt'];
  adParameter: Scalars['String'];
  enable: Scalars['Boolean'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type UpdateOfferAdParameter_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  offerId?: InputMaybe<Scalars['BigInt']>;
  offerId_not?: InputMaybe<Scalars['BigInt']>;
  offerId_gt?: InputMaybe<Scalars['BigInt']>;
  offerId_lt?: InputMaybe<Scalars['BigInt']>;
  offerId_gte?: InputMaybe<Scalars['BigInt']>;
  offerId_lte?: InputMaybe<Scalars['BigInt']>;
  offerId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  offerId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  adParameter?: InputMaybe<Scalars['String']>;
  adParameter_not?: InputMaybe<Scalars['String']>;
  adParameter_gt?: InputMaybe<Scalars['String']>;
  adParameter_lt?: InputMaybe<Scalars['String']>;
  adParameter_gte?: InputMaybe<Scalars['String']>;
  adParameter_lte?: InputMaybe<Scalars['String']>;
  adParameter_in?: InputMaybe<Array<Scalars['String']>>;
  adParameter_not_in?: InputMaybe<Array<Scalars['String']>>;
  adParameter_contains?: InputMaybe<Scalars['String']>;
  adParameter_contains_nocase?: InputMaybe<Scalars['String']>;
  adParameter_not_contains?: InputMaybe<Scalars['String']>;
  adParameter_not_contains_nocase?: InputMaybe<Scalars['String']>;
  adParameter_starts_with?: InputMaybe<Scalars['String']>;
  adParameter_starts_with_nocase?: InputMaybe<Scalars['String']>;
  adParameter_not_starts_with?: InputMaybe<Scalars['String']>;
  adParameter_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  adParameter_ends_with?: InputMaybe<Scalars['String']>;
  adParameter_ends_with_nocase?: InputMaybe<Scalars['String']>;
  adParameter_not_ends_with?: InputMaybe<Scalars['String']>;
  adParameter_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  enable?: InputMaybe<Scalars['Boolean']>;
  enable_not?: InputMaybe<Scalars['Boolean']>;
  enable_in?: InputMaybe<Array<Scalars['Boolean']>>;
  enable_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<UpdateOfferAdParameter_filter>>>;
  or?: InputMaybe<Array<InputMaybe<UpdateOfferAdParameter_filter>>>;
};

export type UpdateOfferAdParameter_orderBy =
  | 'id'
  | 'offerId'
  | 'adParameter'
  | 'enable'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type UpdateOfferAdmin = {
  id: Scalars['Bytes'];
  offerId: Scalars['BigInt'];
  admin: Scalars['Bytes'];
  enable: Scalars['Boolean'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type UpdateOfferAdmin_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  offerId?: InputMaybe<Scalars['BigInt']>;
  offerId_not?: InputMaybe<Scalars['BigInt']>;
  offerId_gt?: InputMaybe<Scalars['BigInt']>;
  offerId_lt?: InputMaybe<Scalars['BigInt']>;
  offerId_gte?: InputMaybe<Scalars['BigInt']>;
  offerId_lte?: InputMaybe<Scalars['BigInt']>;
  offerId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  offerId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  admin?: InputMaybe<Scalars['Bytes']>;
  admin_not?: InputMaybe<Scalars['Bytes']>;
  admin_gt?: InputMaybe<Scalars['Bytes']>;
  admin_lt?: InputMaybe<Scalars['Bytes']>;
  admin_gte?: InputMaybe<Scalars['Bytes']>;
  admin_lte?: InputMaybe<Scalars['Bytes']>;
  admin_in?: InputMaybe<Array<Scalars['Bytes']>>;
  admin_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  admin_contains?: InputMaybe<Scalars['Bytes']>;
  admin_not_contains?: InputMaybe<Scalars['Bytes']>;
  enable?: InputMaybe<Scalars['Boolean']>;
  enable_not?: InputMaybe<Scalars['Boolean']>;
  enable_in?: InputMaybe<Array<Scalars['Boolean']>>;
  enable_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<UpdateOfferAdmin_filter>>>;
  or?: InputMaybe<Array<InputMaybe<UpdateOfferAdmin_filter>>>;
};

export type UpdateOfferAdmin_orderBy =
  | 'id'
  | 'offerId'
  | 'admin'
  | 'enable'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type UpdateOfferValidator = {
  id: Scalars['Bytes'];
  offerId: Scalars['BigInt'];
  validator: Scalars['Bytes'];
  enable: Scalars['Boolean'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type UpdateOfferValidator_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  offerId?: InputMaybe<Scalars['BigInt']>;
  offerId_not?: InputMaybe<Scalars['BigInt']>;
  offerId_gt?: InputMaybe<Scalars['BigInt']>;
  offerId_lt?: InputMaybe<Scalars['BigInt']>;
  offerId_gte?: InputMaybe<Scalars['BigInt']>;
  offerId_lte?: InputMaybe<Scalars['BigInt']>;
  offerId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  offerId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  validator?: InputMaybe<Scalars['Bytes']>;
  validator_not?: InputMaybe<Scalars['Bytes']>;
  validator_gt?: InputMaybe<Scalars['Bytes']>;
  validator_lt?: InputMaybe<Scalars['Bytes']>;
  validator_gte?: InputMaybe<Scalars['Bytes']>;
  validator_lte?: InputMaybe<Scalars['Bytes']>;
  validator_in?: InputMaybe<Array<Scalars['Bytes']>>;
  validator_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  validator_contains?: InputMaybe<Scalars['Bytes']>;
  validator_not_contains?: InputMaybe<Scalars['Bytes']>;
  enable?: InputMaybe<Scalars['Boolean']>;
  enable_not?: InputMaybe<Scalars['Boolean']>;
  enable_in?: InputMaybe<Array<Scalars['Boolean']>>;
  enable_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<UpdateOfferValidator_filter>>>;
  or?: InputMaybe<Array<InputMaybe<UpdateOfferValidator_filter>>>;
};

export type UpdateOfferValidator_orderBy =
  | 'id'
  | 'offerId'
  | 'validator'
  | 'enable'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type UpdateOffer_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  offerId?: InputMaybe<Scalars['BigInt']>;
  offerId_not?: InputMaybe<Scalars['BigInt']>;
  offerId_gt?: InputMaybe<Scalars['BigInt']>;
  offerId_lt?: InputMaybe<Scalars['BigInt']>;
  offerId_gte?: InputMaybe<Scalars['BigInt']>;
  offerId_lte?: InputMaybe<Scalars['BigInt']>;
  offerId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  offerId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  disable?: InputMaybe<Scalars['Boolean']>;
  disable_not?: InputMaybe<Scalars['Boolean']>;
  disable_in?: InputMaybe<Array<Scalars['Boolean']>>;
  disable_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  offerMetadata?: InputMaybe<Scalars['String']>;
  offerMetadata_not?: InputMaybe<Scalars['String']>;
  offerMetadata_gt?: InputMaybe<Scalars['String']>;
  offerMetadata_lt?: InputMaybe<Scalars['String']>;
  offerMetadata_gte?: InputMaybe<Scalars['String']>;
  offerMetadata_lte?: InputMaybe<Scalars['String']>;
  offerMetadata_in?: InputMaybe<Array<Scalars['String']>>;
  offerMetadata_not_in?: InputMaybe<Array<Scalars['String']>>;
  offerMetadata_contains?: InputMaybe<Scalars['String']>;
  offerMetadata_contains_nocase?: InputMaybe<Scalars['String']>;
  offerMetadata_not_contains?: InputMaybe<Scalars['String']>;
  offerMetadata_not_contains_nocase?: InputMaybe<Scalars['String']>;
  offerMetadata_starts_with?: InputMaybe<Scalars['String']>;
  offerMetadata_starts_with_nocase?: InputMaybe<Scalars['String']>;
  offerMetadata_not_starts_with?: InputMaybe<Scalars['String']>;
  offerMetadata_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  offerMetadata_ends_with?: InputMaybe<Scalars['String']>;
  offerMetadata_ends_with_nocase?: InputMaybe<Scalars['String']>;
  offerMetadata_not_ends_with?: InputMaybe<Scalars['String']>;
  offerMetadata_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nftContract?: InputMaybe<Scalars['Bytes']>;
  nftContract_not?: InputMaybe<Scalars['Bytes']>;
  nftContract_gt?: InputMaybe<Scalars['Bytes']>;
  nftContract_lt?: InputMaybe<Scalars['Bytes']>;
  nftContract_gte?: InputMaybe<Scalars['Bytes']>;
  nftContract_lte?: InputMaybe<Scalars['Bytes']>;
  nftContract_in?: InputMaybe<Array<Scalars['Bytes']>>;
  nftContract_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  nftContract_contains?: InputMaybe<Scalars['Bytes']>;
  nftContract_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<UpdateOffer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<UpdateOffer_filter>>>;
};

export type UpdateOffer_orderBy =
  | 'id'
  | 'offerId'
  | 'disable'
  | 'name'
  | 'offerMetadata'
  | 'nftContract'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type UpdateUser = {
  id: Scalars['Bytes'];
  tokenId: Scalars['BigInt'];
  user: Scalars['Bytes'];
  expires: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type UpdateUser_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  user?: InputMaybe<Scalars['Bytes']>;
  user_not?: InputMaybe<Scalars['Bytes']>;
  user_gt?: InputMaybe<Scalars['Bytes']>;
  user_lt?: InputMaybe<Scalars['Bytes']>;
  user_gte?: InputMaybe<Scalars['Bytes']>;
  user_lte?: InputMaybe<Scalars['Bytes']>;
  user_in?: InputMaybe<Array<Scalars['Bytes']>>;
  user_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  user_contains?: InputMaybe<Scalars['Bytes']>;
  user_not_contains?: InputMaybe<Scalars['Bytes']>;
  expires?: InputMaybe<Scalars['BigInt']>;
  expires_not?: InputMaybe<Scalars['BigInt']>;
  expires_gt?: InputMaybe<Scalars['BigInt']>;
  expires_lt?: InputMaybe<Scalars['BigInt']>;
  expires_gte?: InputMaybe<Scalars['BigInt']>;
  expires_lte?: InputMaybe<Scalars['BigInt']>;
  expires_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expires_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<UpdateUser_filter>>>;
  or?: InputMaybe<Array<InputMaybe<UpdateUser_filter>>>;
};

export type UpdateUser_orderBy =
  | 'id'
  | 'tokenId'
  | 'user'
  | 'expires'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

  export type QuerySdk = {
      /** null **/
  adOffer: InContextSdkMethod<Query['adOffer'], QueryadOfferArgs, MeshContext>,
  /** null **/
  adOffers: InContextSdkMethod<Query['adOffers'], QueryadOffersArgs, MeshContext>,
  /** null **/
  adOfferParameterLink: InContextSdkMethod<Query['adOfferParameterLink'], QueryadOfferParameterLinkArgs, MeshContext>,
  /** null **/
  adOfferParameterLinks: InContextSdkMethod<Query['adOfferParameterLinks'], QueryadOfferParameterLinksArgs, MeshContext>,
  /** null **/
  adParameter: InContextSdkMethod<Query['adParameter'], QueryadParameterArgs, MeshContext>,
  /** null **/
  adParameters: InContextSdkMethod<Query['adParameters'], QueryadParametersArgs, MeshContext>,
  /** null **/
  adProposal: InContextSdkMethod<Query['adProposal'], QueryadProposalArgs, MeshContext>,
  /** null **/
  adProposals: InContextSdkMethod<Query['adProposals'], QueryadProposalsArgs, MeshContext>,
  /** null **/
  currentProposal: InContextSdkMethod<Query['currentProposal'], QuerycurrentProposalArgs, MeshContext>,
  /** null **/
  currentProposals: InContextSdkMethod<Query['currentProposals'], QuerycurrentProposalsArgs, MeshContext>,
  /** null **/
  epochCurrencyRevenue: InContextSdkMethod<Query['epochCurrencyRevenue'], QueryepochCurrencyRevenueArgs, MeshContext>,
  /** null **/
  epochCurrencyRevenues: InContextSdkMethod<Query['epochCurrencyRevenues'], QueryepochCurrencyRevenuesArgs, MeshContext>,
  /** null **/
  feeParamsForContract: InContextSdkMethod<Query['feeParamsForContract'], QueryfeeParamsForContractArgs, MeshContext>,
  /** null **/
  feeParamsForContracts: InContextSdkMethod<Query['feeParamsForContracts'], QueryfeeParamsForContractsArgs, MeshContext>,
  /** null **/
  nftContract: InContextSdkMethod<Query['nftContract'], QuerynftContractArgs, MeshContext>,
  /** null **/
  nftContracts: InContextSdkMethod<Query['nftContracts'], QuerynftContractsArgs, MeshContext>,
  /** null **/
  nftPrice: InContextSdkMethod<Query['nftPrice'], QuerynftPriceArgs, MeshContext>,
  /** null **/
  nftPrices: InContextSdkMethod<Query['nftPrices'], QuerynftPricesArgs, MeshContext>,
  /** null **/
  marketplaceBid: InContextSdkMethod<Query['marketplaceBid'], QuerymarketplaceBidArgs, MeshContext>,
  /** null **/
  marketplaceBids: InContextSdkMethod<Query['marketplaceBids'], QuerymarketplaceBidsArgs, MeshContext>,
  /** null **/
  marketplaceDirectBuy: InContextSdkMethod<Query['marketplaceDirectBuy'], QuerymarketplaceDirectBuyArgs, MeshContext>,
  /** null **/
  marketplaceDirectBuys: InContextSdkMethod<Query['marketplaceDirectBuys'], QuerymarketplaceDirectBuysArgs, MeshContext>,
  /** null **/
  marketplaceListing: InContextSdkMethod<Query['marketplaceListing'], QuerymarketplaceListingArgs, MeshContext>,
  /** null **/
  marketplaceListings: InContextSdkMethod<Query['marketplaceListings'], QuerymarketplaceListingsArgs, MeshContext>,
  /** null **/
  marketplaceOffer: InContextSdkMethod<Query['marketplaceOffer'], QuerymarketplaceOfferArgs, MeshContext>,
  /** null **/
  marketplaceOffers: InContextSdkMethod<Query['marketplaceOffers'], QuerymarketplaceOffersArgs, MeshContext>,
  /** null **/
  revenueTransaction: InContextSdkMethod<Query['revenueTransaction'], QueryrevenueTransactionArgs, MeshContext>,
  /** null **/
  revenueTransactions: InContextSdkMethod<Query['revenueTransactions'], QueryrevenueTransactionsArgs, MeshContext>,
  /** null **/
  token: InContextSdkMethod<Query['token'], QuerytokenArgs, MeshContext>,
  /** null **/
  tokens: InContextSdkMethod<Query['tokens'], QuerytokensArgs, MeshContext>,
  /** null **/
  tokenPrice: InContextSdkMethod<Query['tokenPrice'], QuerytokenPriceArgs, MeshContext>,
  /** null **/
  tokenPrices: InContextSdkMethod<Query['tokenPrices'], QuerytokenPricesArgs, MeshContext>,
  /** null **/
  callWithProtocolFee: InContextSdkMethod<Query['callWithProtocolFee'], QuerycallWithProtocolFeeArgs, MeshContext>,
  /** null **/
  callWithProtocolFees: InContextSdkMethod<Query['callWithProtocolFees'], QuerycallWithProtocolFeesArgs, MeshContext>,
  /** null **/
  feeUpdate: InContextSdkMethod<Query['feeUpdate'], QueryfeeUpdateArgs, MeshContext>,
  /** null **/
  feeUpdates: InContextSdkMethod<Query['feeUpdates'], QueryfeeUpdatesArgs, MeshContext>,
  /** null **/
  ownershipTransferred: InContextSdkMethod<Query['ownershipTransferred'], QueryownershipTransferredArgs, MeshContext>,
  /** null **/
  ownershipTransferreds: InContextSdkMethod<Query['ownershipTransferreds'], QueryownershipTransferredsArgs, MeshContext>,
  /** null **/
  updateAdProposal: InContextSdkMethod<Query['updateAdProposal'], QueryupdateAdProposalArgs, MeshContext>,
  /** null **/
  updateAdProposals: InContextSdkMethod<Query['updateAdProposals'], QueryupdateAdProposalsArgs, MeshContext>,
  /** null **/
  updateAdValidation: InContextSdkMethod<Query['updateAdValidation'], QueryupdateAdValidationArgs, MeshContext>,
  /** null **/
  updateAdValidations: InContextSdkMethod<Query['updateAdValidations'], QueryupdateAdValidationsArgs, MeshContext>,
  /** null **/
  updateOffer: InContextSdkMethod<Query['updateOffer'], QueryupdateOfferArgs, MeshContext>,
  /** null **/
  updateOffers: InContextSdkMethod<Query['updateOffers'], QueryupdateOffersArgs, MeshContext>,
  /** null **/
  updateOfferAdParameter: InContextSdkMethod<Query['updateOfferAdParameter'], QueryupdateOfferAdParameterArgs, MeshContext>,
  /** null **/
  updateOfferAdParameters: InContextSdkMethod<Query['updateOfferAdParameters'], QueryupdateOfferAdParametersArgs, MeshContext>,
  /** null **/
  updateOfferAdmin: InContextSdkMethod<Query['updateOfferAdmin'], QueryupdateOfferAdminArgs, MeshContext>,
  /** null **/
  updateOfferAdmins: InContextSdkMethod<Query['updateOfferAdmins'], QueryupdateOfferAdminsArgs, MeshContext>,
  /** null **/
  updateOfferValidator: InContextSdkMethod<Query['updateOfferValidator'], QueryupdateOfferValidatorArgs, MeshContext>,
  /** null **/
  updateOfferValidators: InContextSdkMethod<Query['updateOfferValidators'], QueryupdateOfferValidatorsArgs, MeshContext>,
  /** null **/
  newDSponsorNFT: InContextSdkMethod<Query['newDSponsorNFT'], QuerynewDSponsorNFTArgs, MeshContext>,
  /** null **/
  newDSponsorNFTs: InContextSdkMethod<Query['newDSponsorNFTs'], QuerynewDSponsorNFTsArgs, MeshContext>,
  /** null **/
  contractURIUpdated: InContextSdkMethod<Query['contractURIUpdated'], QuerycontractURIUpdatedArgs, MeshContext>,
  /** null **/
  contractURIUpdateds: InContextSdkMethod<Query['contractURIUpdateds'], QuerycontractURIUpdatedsArgs, MeshContext>,
  /** null **/
  mint: InContextSdkMethod<Query['mint'], QuerymintArgs, MeshContext>,
  /** null **/
  mints: InContextSdkMethod<Query['mints'], QuerymintsArgs, MeshContext>,
  /** null **/
  tokensAllowlist: InContextSdkMethod<Query['tokensAllowlist'], QuerytokensAllowlistArgs, MeshContext>,
  /** null **/
  tokensAllowlists: InContextSdkMethod<Query['tokensAllowlists'], QuerytokensAllowlistsArgs, MeshContext>,
  /** null **/
  tokensAllowlistUpdated: InContextSdkMethod<Query['tokensAllowlistUpdated'], QuerytokensAllowlistUpdatedArgs, MeshContext>,
  /** null **/
  tokensAllowlistUpdateds: InContextSdkMethod<Query['tokensAllowlistUpdateds'], QuerytokensAllowlistUpdatedsArgs, MeshContext>,
  /** null **/
  updateDefaultMintPrice: InContextSdkMethod<Query['updateDefaultMintPrice'], QueryupdateDefaultMintPriceArgs, MeshContext>,
  /** null **/
  updateDefaultMintPrices: InContextSdkMethod<Query['updateDefaultMintPrices'], QueryupdateDefaultMintPricesArgs, MeshContext>,
  /** null **/
  updateMintPrice: InContextSdkMethod<Query['updateMintPrice'], QueryupdateMintPriceArgs, MeshContext>,
  /** null **/
  updateMintPrices: InContextSdkMethod<Query['updateMintPrices'], QueryupdateMintPricesArgs, MeshContext>,
  /** null **/
  updateUser: InContextSdkMethod<Query['updateUser'], QueryupdateUserArgs, MeshContext>,
  /** null **/
  updateUsers: InContextSdkMethod<Query['updateUsers'], QueryupdateUsersArgs, MeshContext>,
  /** null **/
  acceptedOffer: InContextSdkMethod<Query['acceptedOffer'], QueryacceptedOfferArgs, MeshContext>,
  /** null **/
  acceptedOffers: InContextSdkMethod<Query['acceptedOffers'], QueryacceptedOffersArgs, MeshContext>,
  /** null **/
  auctionClosed: InContextSdkMethod<Query['auctionClosed'], QueryauctionClosedArgs, MeshContext>,
  /** null **/
  auctionCloseds: InContextSdkMethod<Query['auctionCloseds'], QueryauctionClosedsArgs, MeshContext>,
  /** null **/
  cancelledOffer: InContextSdkMethod<Query['cancelledOffer'], QuerycancelledOfferArgs, MeshContext>,
  /** null **/
  cancelledOffers: InContextSdkMethod<Query['cancelledOffers'], QuerycancelledOffersArgs, MeshContext>,
  /** null **/
  listingAdded: InContextSdkMethod<Query['listingAdded'], QuerylistingAddedArgs, MeshContext>,
  /** null **/
  listingAddeds: InContextSdkMethod<Query['listingAddeds'], QuerylistingAddedsArgs, MeshContext>,
  /** null **/
  listingRemoved: InContextSdkMethod<Query['listingRemoved'], QuerylistingRemovedArgs, MeshContext>,
  /** null **/
  listingRemoveds: InContextSdkMethod<Query['listingRemoveds'], QuerylistingRemovedsArgs, MeshContext>,
  /** null **/
  listingUpdated: InContextSdkMethod<Query['listingUpdated'], QuerylistingUpdatedArgs, MeshContext>,
  /** null **/
  listingUpdateds: InContextSdkMethod<Query['listingUpdateds'], QuerylistingUpdatedsArgs, MeshContext>,
  /** null **/
  newBid: InContextSdkMethod<Query['newBid'], QuerynewBidArgs, MeshContext>,
  /** null **/
  newBids: InContextSdkMethod<Query['newBids'], QuerynewBidsArgs, MeshContext>,
  /** null **/
  newOffer: InContextSdkMethod<Query['newOffer'], QuerynewOfferArgs, MeshContext>,
  /** null **/
  newOffers: InContextSdkMethod<Query['newOffers'], QuerynewOffersArgs, MeshContext>,
  /** null **/
  newSale: InContextSdkMethod<Query['newSale'], QuerynewSaleArgs, MeshContext>,
  /** null **/
  newSales: InContextSdkMethod<Query['newSales'], QuerynewSalesArgs, MeshContext>,
  /** null **/
  offerSearch: InContextSdkMethod<Query['offerSearch'], QueryofferSearchArgs, MeshContext>,
  /** null **/
  offerSearchFR: InContextSdkMethod<Query['offerSearchFR'], QueryofferSearchFRArgs, MeshContext>,
  /** null **/
  offerSearchEN: InContextSdkMethod<Query['offerSearchEN'], QueryofferSearchENArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  adOffer: InContextSdkMethod<Subscription['adOffer'], SubscriptionadOfferArgs, MeshContext>,
  /** null **/
  adOffers: InContextSdkMethod<Subscription['adOffers'], SubscriptionadOffersArgs, MeshContext>,
  /** null **/
  adOfferParameterLink: InContextSdkMethod<Subscription['adOfferParameterLink'], SubscriptionadOfferParameterLinkArgs, MeshContext>,
  /** null **/
  adOfferParameterLinks: InContextSdkMethod<Subscription['adOfferParameterLinks'], SubscriptionadOfferParameterLinksArgs, MeshContext>,
  /** null **/
  adParameter: InContextSdkMethod<Subscription['adParameter'], SubscriptionadParameterArgs, MeshContext>,
  /** null **/
  adParameters: InContextSdkMethod<Subscription['adParameters'], SubscriptionadParametersArgs, MeshContext>,
  /** null **/
  adProposal: InContextSdkMethod<Subscription['adProposal'], SubscriptionadProposalArgs, MeshContext>,
  /** null **/
  adProposals: InContextSdkMethod<Subscription['adProposals'], SubscriptionadProposalsArgs, MeshContext>,
  /** null **/
  currentProposal: InContextSdkMethod<Subscription['currentProposal'], SubscriptioncurrentProposalArgs, MeshContext>,
  /** null **/
  currentProposals: InContextSdkMethod<Subscription['currentProposals'], SubscriptioncurrentProposalsArgs, MeshContext>,
  /** null **/
  epochCurrencyRevenue: InContextSdkMethod<Subscription['epochCurrencyRevenue'], SubscriptionepochCurrencyRevenueArgs, MeshContext>,
  /** null **/
  epochCurrencyRevenues: InContextSdkMethod<Subscription['epochCurrencyRevenues'], SubscriptionepochCurrencyRevenuesArgs, MeshContext>,
  /** null **/
  feeParamsForContract: InContextSdkMethod<Subscription['feeParamsForContract'], SubscriptionfeeParamsForContractArgs, MeshContext>,
  /** null **/
  feeParamsForContracts: InContextSdkMethod<Subscription['feeParamsForContracts'], SubscriptionfeeParamsForContractsArgs, MeshContext>,
  /** null **/
  nftContract: InContextSdkMethod<Subscription['nftContract'], SubscriptionnftContractArgs, MeshContext>,
  /** null **/
  nftContracts: InContextSdkMethod<Subscription['nftContracts'], SubscriptionnftContractsArgs, MeshContext>,
  /** null **/
  nftPrice: InContextSdkMethod<Subscription['nftPrice'], SubscriptionnftPriceArgs, MeshContext>,
  /** null **/
  nftPrices: InContextSdkMethod<Subscription['nftPrices'], SubscriptionnftPricesArgs, MeshContext>,
  /** null **/
  marketplaceBid: InContextSdkMethod<Subscription['marketplaceBid'], SubscriptionmarketplaceBidArgs, MeshContext>,
  /** null **/
  marketplaceBids: InContextSdkMethod<Subscription['marketplaceBids'], SubscriptionmarketplaceBidsArgs, MeshContext>,
  /** null **/
  marketplaceDirectBuy: InContextSdkMethod<Subscription['marketplaceDirectBuy'], SubscriptionmarketplaceDirectBuyArgs, MeshContext>,
  /** null **/
  marketplaceDirectBuys: InContextSdkMethod<Subscription['marketplaceDirectBuys'], SubscriptionmarketplaceDirectBuysArgs, MeshContext>,
  /** null **/
  marketplaceListing: InContextSdkMethod<Subscription['marketplaceListing'], SubscriptionmarketplaceListingArgs, MeshContext>,
  /** null **/
  marketplaceListings: InContextSdkMethod<Subscription['marketplaceListings'], SubscriptionmarketplaceListingsArgs, MeshContext>,
  /** null **/
  marketplaceOffer: InContextSdkMethod<Subscription['marketplaceOffer'], SubscriptionmarketplaceOfferArgs, MeshContext>,
  /** null **/
  marketplaceOffers: InContextSdkMethod<Subscription['marketplaceOffers'], SubscriptionmarketplaceOffersArgs, MeshContext>,
  /** null **/
  revenueTransaction: InContextSdkMethod<Subscription['revenueTransaction'], SubscriptionrevenueTransactionArgs, MeshContext>,
  /** null **/
  revenueTransactions: InContextSdkMethod<Subscription['revenueTransactions'], SubscriptionrevenueTransactionsArgs, MeshContext>,
  /** null **/
  token: InContextSdkMethod<Subscription['token'], SubscriptiontokenArgs, MeshContext>,
  /** null **/
  tokens: InContextSdkMethod<Subscription['tokens'], SubscriptiontokensArgs, MeshContext>,
  /** null **/
  tokenPrice: InContextSdkMethod<Subscription['tokenPrice'], SubscriptiontokenPriceArgs, MeshContext>,
  /** null **/
  tokenPrices: InContextSdkMethod<Subscription['tokenPrices'], SubscriptiontokenPricesArgs, MeshContext>,
  /** null **/
  callWithProtocolFee: InContextSdkMethod<Subscription['callWithProtocolFee'], SubscriptioncallWithProtocolFeeArgs, MeshContext>,
  /** null **/
  callWithProtocolFees: InContextSdkMethod<Subscription['callWithProtocolFees'], SubscriptioncallWithProtocolFeesArgs, MeshContext>,
  /** null **/
  feeUpdate: InContextSdkMethod<Subscription['feeUpdate'], SubscriptionfeeUpdateArgs, MeshContext>,
  /** null **/
  feeUpdates: InContextSdkMethod<Subscription['feeUpdates'], SubscriptionfeeUpdatesArgs, MeshContext>,
  /** null **/
  ownershipTransferred: InContextSdkMethod<Subscription['ownershipTransferred'], SubscriptionownershipTransferredArgs, MeshContext>,
  /** null **/
  ownershipTransferreds: InContextSdkMethod<Subscription['ownershipTransferreds'], SubscriptionownershipTransferredsArgs, MeshContext>,
  /** null **/
  updateAdProposal: InContextSdkMethod<Subscription['updateAdProposal'], SubscriptionupdateAdProposalArgs, MeshContext>,
  /** null **/
  updateAdProposals: InContextSdkMethod<Subscription['updateAdProposals'], SubscriptionupdateAdProposalsArgs, MeshContext>,
  /** null **/
  updateAdValidation: InContextSdkMethod<Subscription['updateAdValidation'], SubscriptionupdateAdValidationArgs, MeshContext>,
  /** null **/
  updateAdValidations: InContextSdkMethod<Subscription['updateAdValidations'], SubscriptionupdateAdValidationsArgs, MeshContext>,
  /** null **/
  updateOffer: InContextSdkMethod<Subscription['updateOffer'], SubscriptionupdateOfferArgs, MeshContext>,
  /** null **/
  updateOffers: InContextSdkMethod<Subscription['updateOffers'], SubscriptionupdateOffersArgs, MeshContext>,
  /** null **/
  updateOfferAdParameter: InContextSdkMethod<Subscription['updateOfferAdParameter'], SubscriptionupdateOfferAdParameterArgs, MeshContext>,
  /** null **/
  updateOfferAdParameters: InContextSdkMethod<Subscription['updateOfferAdParameters'], SubscriptionupdateOfferAdParametersArgs, MeshContext>,
  /** null **/
  updateOfferAdmin: InContextSdkMethod<Subscription['updateOfferAdmin'], SubscriptionupdateOfferAdminArgs, MeshContext>,
  /** null **/
  updateOfferAdmins: InContextSdkMethod<Subscription['updateOfferAdmins'], SubscriptionupdateOfferAdminsArgs, MeshContext>,
  /** null **/
  updateOfferValidator: InContextSdkMethod<Subscription['updateOfferValidator'], SubscriptionupdateOfferValidatorArgs, MeshContext>,
  /** null **/
  updateOfferValidators: InContextSdkMethod<Subscription['updateOfferValidators'], SubscriptionupdateOfferValidatorsArgs, MeshContext>,
  /** null **/
  newDSponsorNFT: InContextSdkMethod<Subscription['newDSponsorNFT'], SubscriptionnewDSponsorNFTArgs, MeshContext>,
  /** null **/
  newDSponsorNFTs: InContextSdkMethod<Subscription['newDSponsorNFTs'], SubscriptionnewDSponsorNFTsArgs, MeshContext>,
  /** null **/
  contractURIUpdated: InContextSdkMethod<Subscription['contractURIUpdated'], SubscriptioncontractURIUpdatedArgs, MeshContext>,
  /** null **/
  contractURIUpdateds: InContextSdkMethod<Subscription['contractURIUpdateds'], SubscriptioncontractURIUpdatedsArgs, MeshContext>,
  /** null **/
  mint: InContextSdkMethod<Subscription['mint'], SubscriptionmintArgs, MeshContext>,
  /** null **/
  mints: InContextSdkMethod<Subscription['mints'], SubscriptionmintsArgs, MeshContext>,
  /** null **/
  tokensAllowlist: InContextSdkMethod<Subscription['tokensAllowlist'], SubscriptiontokensAllowlistArgs, MeshContext>,
  /** null **/
  tokensAllowlists: InContextSdkMethod<Subscription['tokensAllowlists'], SubscriptiontokensAllowlistsArgs, MeshContext>,
  /** null **/
  tokensAllowlistUpdated: InContextSdkMethod<Subscription['tokensAllowlistUpdated'], SubscriptiontokensAllowlistUpdatedArgs, MeshContext>,
  /** null **/
  tokensAllowlistUpdateds: InContextSdkMethod<Subscription['tokensAllowlistUpdateds'], SubscriptiontokensAllowlistUpdatedsArgs, MeshContext>,
  /** null **/
  updateDefaultMintPrice: InContextSdkMethod<Subscription['updateDefaultMintPrice'], SubscriptionupdateDefaultMintPriceArgs, MeshContext>,
  /** null **/
  updateDefaultMintPrices: InContextSdkMethod<Subscription['updateDefaultMintPrices'], SubscriptionupdateDefaultMintPricesArgs, MeshContext>,
  /** null **/
  updateMintPrice: InContextSdkMethod<Subscription['updateMintPrice'], SubscriptionupdateMintPriceArgs, MeshContext>,
  /** null **/
  updateMintPrices: InContextSdkMethod<Subscription['updateMintPrices'], SubscriptionupdateMintPricesArgs, MeshContext>,
  /** null **/
  updateUser: InContextSdkMethod<Subscription['updateUser'], SubscriptionupdateUserArgs, MeshContext>,
  /** null **/
  updateUsers: InContextSdkMethod<Subscription['updateUsers'], SubscriptionupdateUsersArgs, MeshContext>,
  /** null **/
  acceptedOffer: InContextSdkMethod<Subscription['acceptedOffer'], SubscriptionacceptedOfferArgs, MeshContext>,
  /** null **/
  acceptedOffers: InContextSdkMethod<Subscription['acceptedOffers'], SubscriptionacceptedOffersArgs, MeshContext>,
  /** null **/
  auctionClosed: InContextSdkMethod<Subscription['auctionClosed'], SubscriptionauctionClosedArgs, MeshContext>,
  /** null **/
  auctionCloseds: InContextSdkMethod<Subscription['auctionCloseds'], SubscriptionauctionClosedsArgs, MeshContext>,
  /** null **/
  cancelledOffer: InContextSdkMethod<Subscription['cancelledOffer'], SubscriptioncancelledOfferArgs, MeshContext>,
  /** null **/
  cancelledOffers: InContextSdkMethod<Subscription['cancelledOffers'], SubscriptioncancelledOffersArgs, MeshContext>,
  /** null **/
  listingAdded: InContextSdkMethod<Subscription['listingAdded'], SubscriptionlistingAddedArgs, MeshContext>,
  /** null **/
  listingAddeds: InContextSdkMethod<Subscription['listingAddeds'], SubscriptionlistingAddedsArgs, MeshContext>,
  /** null **/
  listingRemoved: InContextSdkMethod<Subscription['listingRemoved'], SubscriptionlistingRemovedArgs, MeshContext>,
  /** null **/
  listingRemoveds: InContextSdkMethod<Subscription['listingRemoveds'], SubscriptionlistingRemovedsArgs, MeshContext>,
  /** null **/
  listingUpdated: InContextSdkMethod<Subscription['listingUpdated'], SubscriptionlistingUpdatedArgs, MeshContext>,
  /** null **/
  listingUpdateds: InContextSdkMethod<Subscription['listingUpdateds'], SubscriptionlistingUpdatedsArgs, MeshContext>,
  /** null **/
  newBid: InContextSdkMethod<Subscription['newBid'], SubscriptionnewBidArgs, MeshContext>,
  /** null **/
  newBids: InContextSdkMethod<Subscription['newBids'], SubscriptionnewBidsArgs, MeshContext>,
  /** null **/
  newOffer: InContextSdkMethod<Subscription['newOffer'], SubscriptionnewOfferArgs, MeshContext>,
  /** null **/
  newOffers: InContextSdkMethod<Subscription['newOffers'], SubscriptionnewOffersArgs, MeshContext>,
  /** null **/
  newSale: InContextSdkMethod<Subscription['newSale'], SubscriptionnewSaleArgs, MeshContext>,
  /** null **/
  newSales: InContextSdkMethod<Subscription['newSales'], SubscriptionnewSalesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["mySubgraph"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
