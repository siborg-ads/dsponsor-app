// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import BareMerger from "@graphql-mesh/merger-bare";
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { MySubgraphTypes } from './sources/mySubgraph/types';
import * as importedModule$0 from "./sources/mySubgraph/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



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
  adParameters: Array<AdParameter>;
  admins?: Maybe<Array<Scalars['Bytes']>>;
  validators?: Maybe<Array<Scalars['Bytes']>>;
  allProposals?: Maybe<Array<AdProposal>>;
  currentProposals?: Maybe<Array<CurrentProposal>>;
};


export type AdOfferadParametersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AdParameter_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AdParameter_filter>;
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
  adParameters?: InputMaybe<Array<Scalars['String']>>;
  adParameters_not?: InputMaybe<Array<Scalars['String']>>;
  adParameters_contains?: InputMaybe<Array<Scalars['String']>>;
  adParameters_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  adParameters_not_contains?: InputMaybe<Array<Scalars['String']>>;
  adParameters_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  adParameters_?: InputMaybe<AdParameter_filter>;
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
  | 'adParameters'
  | 'admins'
  | 'validators'
  | 'allProposals'
  | 'currentProposals';

export type AdParameter = {
  id: Scalars['String'];
  base: Scalars['String'];
  variants: Array<Scalars['String']>;
  adOffers?: Maybe<Array<AdOffer>>;
  proposals?: Maybe<Array<AdProposal>>;
  currentProposals?: Maybe<Array<CurrentProposal>>;
};


export type AdParameteradOffersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AdOffer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AdOffer_filter>;
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
  adOffers_?: InputMaybe<AdOffer_filter>;
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
  | 'referralNb';

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
  | 'lastUpdateTimestamp';

export type MarketplaceDirectBuy = {
  id: Scalars['Bytes'];
  listing: MarketplaceListing;
  buyer: Scalars['Bytes'];
  quantityBought: Scalars['BigInt'];
  totalPricePaid: Scalars['BigInt'];
  revenueTransaction: RevenueTransaction;
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
  | 'revenueTransaction__blockTimestamp';

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
  | 'lastUpdateTimestamp';

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
  | 'token__setInAllowList';

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
  adParameter?: Maybe<AdParameter>;
  adParameters: Array<AdParameter>;
  adProposal?: Maybe<AdProposal>;
  adProposals: Array<AdProposal>;
  currentProposal?: Maybe<CurrentProposal>;
  currentProposals: Array<CurrentProposal>;
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
  adParameter?: Maybe<AdParameter>;
  adParameters: Array<AdParameter>;
  adProposal?: Maybe<AdProposal>;
  adProposals: Array<AdProposal>;
  currentProposal?: Maybe<CurrentProposal>;
  currentProposals: Array<CurrentProposal>;
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AcceptedOffer: ResolverTypeWrapper<AcceptedOffer>;
  AcceptedOffer_filter: AcceptedOffer_filter;
  AcceptedOffer_orderBy: AcceptedOffer_orderBy;
  AdOffer: ResolverTypeWrapper<AdOffer>;
  AdOffer_filter: AdOffer_filter;
  AdOffer_orderBy: AdOffer_orderBy;
  AdParameter: ResolverTypeWrapper<AdParameter>;
  AdParameter_filter: AdParameter_filter;
  AdParameter_orderBy: AdParameter_orderBy;
  AdProposal: ResolverTypeWrapper<AdProposal>;
  AdProposalStatus: AdProposalStatus;
  AdProposal_filter: AdProposal_filter;
  AdProposal_orderBy: AdProposal_orderBy;
  Aggregation_interval: Aggregation_interval;
  AuctionClosed: ResolverTypeWrapper<AuctionClosed>;
  AuctionClosed_filter: AuctionClosed_filter;
  AuctionClosed_orderBy: AuctionClosed_orderBy;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  CallWithProtocolFee: ResolverTypeWrapper<CallWithProtocolFee>;
  CallWithProtocolFee_filter: CallWithProtocolFee_filter;
  CallWithProtocolFee_orderBy: CallWithProtocolFee_orderBy;
  CancelledOffer: ResolverTypeWrapper<CancelledOffer>;
  CancelledOffer_filter: CancelledOffer_filter;
  CancelledOffer_orderBy: CancelledOffer_orderBy;
  ContractURIUpdated: ResolverTypeWrapper<ContractURIUpdated>;
  ContractURIUpdated_filter: ContractURIUpdated_filter;
  ContractURIUpdated_orderBy: ContractURIUpdated_orderBy;
  CurrentProposal: ResolverTypeWrapper<CurrentProposal>;
  CurrentProposal_filter: CurrentProposal_filter;
  CurrentProposal_orderBy: CurrentProposal_orderBy;
  FeeUpdate: ResolverTypeWrapper<FeeUpdate>;
  FeeUpdate_filter: FeeUpdate_filter;
  FeeUpdate_orderBy: FeeUpdate_orderBy;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']>;
  ListingAdded: ResolverTypeWrapper<ListingAdded>;
  ListingAdded_filter: ListingAdded_filter;
  ListingAdded_orderBy: ListingAdded_orderBy;
  ListingRemoved: ResolverTypeWrapper<ListingRemoved>;
  ListingRemoved_filter: ListingRemoved_filter;
  ListingRemoved_orderBy: ListingRemoved_orderBy;
  ListingType: ListingType;
  ListingUpdated: ResolverTypeWrapper<ListingUpdated>;
  ListingUpdated_filter: ListingUpdated_filter;
  ListingUpdated_orderBy: ListingUpdated_orderBy;
  MarketplaceBid: ResolverTypeWrapper<MarketplaceBid>;
  MarketplaceBid_filter: MarketplaceBid_filter;
  MarketplaceBid_orderBy: MarketplaceBid_orderBy;
  MarketplaceDirectBuy: ResolverTypeWrapper<MarketplaceDirectBuy>;
  MarketplaceDirectBuy_filter: MarketplaceDirectBuy_filter;
  MarketplaceDirectBuy_orderBy: MarketplaceDirectBuy_orderBy;
  MarketplaceListing: ResolverTypeWrapper<MarketplaceListing>;
  MarketplaceListing_filter: MarketplaceListing_filter;
  MarketplaceListing_orderBy: MarketplaceListing_orderBy;
  MarketplaceOffer: ResolverTypeWrapper<MarketplaceOffer>;
  MarketplaceOffer_filter: MarketplaceOffer_filter;
  MarketplaceOffer_orderBy: MarketplaceOffer_orderBy;
  Mint: ResolverTypeWrapper<Mint>;
  Mint_filter: Mint_filter;
  Mint_orderBy: Mint_orderBy;
  NewBid: ResolverTypeWrapper<NewBid>;
  NewBid_filter: NewBid_filter;
  NewBid_orderBy: NewBid_orderBy;
  NewDSponsorNFT: ResolverTypeWrapper<NewDSponsorNFT>;
  NewDSponsorNFT_filter: NewDSponsorNFT_filter;
  NewDSponsorNFT_orderBy: NewDSponsorNFT_orderBy;
  NewOffer: ResolverTypeWrapper<NewOffer>;
  NewOffer_filter: NewOffer_filter;
  NewOffer_orderBy: NewOffer_orderBy;
  NewSale: ResolverTypeWrapper<NewSale>;
  NewSale_filter: NewSale_filter;
  NewSale_orderBy: NewSale_orderBy;
  NftContract: ResolverTypeWrapper<NftContract>;
  NftContract_filter: NftContract_filter;
  NftContract_orderBy: NftContract_orderBy;
  NftPrice: ResolverTypeWrapper<NftPrice>;
  NftPrice_filter: NftPrice_filter;
  NftPrice_orderBy: NftPrice_orderBy;
  OrderDirection: OrderDirection;
  OwnershipTransferred: ResolverTypeWrapper<OwnershipTransferred>;
  OwnershipTransferred_filter: OwnershipTransferred_filter;
  OwnershipTransferred_orderBy: OwnershipTransferred_orderBy;
  Query: ResolverTypeWrapper<{}>;
  RevenueTransaction: ResolverTypeWrapper<RevenueTransaction>;
  RevenueTransaction_filter: RevenueTransaction_filter;
  RevenueTransaction_orderBy: RevenueTransaction_orderBy;
  Status: Status;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']>;
  Token: ResolverTypeWrapper<Token>;
  TokenPrice: ResolverTypeWrapper<TokenPrice>;
  TokenPrice_filter: TokenPrice_filter;
  TokenPrice_orderBy: TokenPrice_orderBy;
  TokenType: TokenType;
  Token_filter: Token_filter;
  Token_orderBy: Token_orderBy;
  TokensAllowlist: ResolverTypeWrapper<TokensAllowlist>;
  TokensAllowlistUpdated: ResolverTypeWrapper<TokensAllowlistUpdated>;
  TokensAllowlistUpdated_filter: TokensAllowlistUpdated_filter;
  TokensAllowlistUpdated_orderBy: TokensAllowlistUpdated_orderBy;
  TokensAllowlist_filter: TokensAllowlist_filter;
  TokensAllowlist_orderBy: TokensAllowlist_orderBy;
  TransferType: TransferType;
  UpdateAdProposal: ResolverTypeWrapper<UpdateAdProposal>;
  UpdateAdProposal_filter: UpdateAdProposal_filter;
  UpdateAdProposal_orderBy: UpdateAdProposal_orderBy;
  UpdateAdValidation: ResolverTypeWrapper<UpdateAdValidation>;
  UpdateAdValidation_filter: UpdateAdValidation_filter;
  UpdateAdValidation_orderBy: UpdateAdValidation_orderBy;
  UpdateDefaultMintPrice: ResolverTypeWrapper<UpdateDefaultMintPrice>;
  UpdateDefaultMintPrice_filter: UpdateDefaultMintPrice_filter;
  UpdateDefaultMintPrice_orderBy: UpdateDefaultMintPrice_orderBy;
  UpdateMintPrice: ResolverTypeWrapper<UpdateMintPrice>;
  UpdateMintPrice_filter: UpdateMintPrice_filter;
  UpdateMintPrice_orderBy: UpdateMintPrice_orderBy;
  UpdateOffer: ResolverTypeWrapper<UpdateOffer>;
  UpdateOfferAdParameter: ResolverTypeWrapper<UpdateOfferAdParameter>;
  UpdateOfferAdParameter_filter: UpdateOfferAdParameter_filter;
  UpdateOfferAdParameter_orderBy: UpdateOfferAdParameter_orderBy;
  UpdateOfferAdmin: ResolverTypeWrapper<UpdateOfferAdmin>;
  UpdateOfferAdmin_filter: UpdateOfferAdmin_filter;
  UpdateOfferAdmin_orderBy: UpdateOfferAdmin_orderBy;
  UpdateOfferValidator: ResolverTypeWrapper<UpdateOfferValidator>;
  UpdateOfferValidator_filter: UpdateOfferValidator_filter;
  UpdateOfferValidator_orderBy: UpdateOfferValidator_orderBy;
  UpdateOffer_filter: UpdateOffer_filter;
  UpdateOffer_orderBy: UpdateOffer_orderBy;
  UpdateUser: ResolverTypeWrapper<UpdateUser>;
  UpdateUser_filter: UpdateUser_filter;
  UpdateUser_orderBy: UpdateUser_orderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AcceptedOffer: AcceptedOffer;
  AcceptedOffer_filter: AcceptedOffer_filter;
  AdOffer: AdOffer;
  AdOffer_filter: AdOffer_filter;
  AdParameter: AdParameter;
  AdParameter_filter: AdParameter_filter;
  AdProposal: AdProposal;
  AdProposal_filter: AdProposal_filter;
  AuctionClosed: AuctionClosed;
  AuctionClosed_filter: AuctionClosed_filter;
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean'];
  Bytes: Scalars['Bytes'];
  CallWithProtocolFee: CallWithProtocolFee;
  CallWithProtocolFee_filter: CallWithProtocolFee_filter;
  CancelledOffer: CancelledOffer;
  CancelledOffer_filter: CancelledOffer_filter;
  ContractURIUpdated: ContractURIUpdated;
  ContractURIUpdated_filter: ContractURIUpdated_filter;
  CurrentProposal: CurrentProposal;
  CurrentProposal_filter: CurrentProposal_filter;
  FeeUpdate: FeeUpdate;
  FeeUpdate_filter: FeeUpdate_filter;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Int8: Scalars['Int8'];
  ListingAdded: ListingAdded;
  ListingAdded_filter: ListingAdded_filter;
  ListingRemoved: ListingRemoved;
  ListingRemoved_filter: ListingRemoved_filter;
  ListingUpdated: ListingUpdated;
  ListingUpdated_filter: ListingUpdated_filter;
  MarketplaceBid: MarketplaceBid;
  MarketplaceBid_filter: MarketplaceBid_filter;
  MarketplaceDirectBuy: MarketplaceDirectBuy;
  MarketplaceDirectBuy_filter: MarketplaceDirectBuy_filter;
  MarketplaceListing: MarketplaceListing;
  MarketplaceListing_filter: MarketplaceListing_filter;
  MarketplaceOffer: MarketplaceOffer;
  MarketplaceOffer_filter: MarketplaceOffer_filter;
  Mint: Mint;
  Mint_filter: Mint_filter;
  NewBid: NewBid;
  NewBid_filter: NewBid_filter;
  NewDSponsorNFT: NewDSponsorNFT;
  NewDSponsorNFT_filter: NewDSponsorNFT_filter;
  NewOffer: NewOffer;
  NewOffer_filter: NewOffer_filter;
  NewSale: NewSale;
  NewSale_filter: NewSale_filter;
  NftContract: NftContract;
  NftContract_filter: NftContract_filter;
  NftPrice: NftPrice;
  NftPrice_filter: NftPrice_filter;
  OwnershipTransferred: OwnershipTransferred;
  OwnershipTransferred_filter: OwnershipTransferred_filter;
  Query: {};
  RevenueTransaction: RevenueTransaction;
  RevenueTransaction_filter: RevenueTransaction_filter;
  String: Scalars['String'];
  Subscription: {};
  Timestamp: Scalars['Timestamp'];
  Token: Token;
  TokenPrice: TokenPrice;
  TokenPrice_filter: TokenPrice_filter;
  Token_filter: Token_filter;
  TokensAllowlist: TokensAllowlist;
  TokensAllowlistUpdated: TokensAllowlistUpdated;
  TokensAllowlistUpdated_filter: TokensAllowlistUpdated_filter;
  TokensAllowlist_filter: TokensAllowlist_filter;
  UpdateAdProposal: UpdateAdProposal;
  UpdateAdProposal_filter: UpdateAdProposal_filter;
  UpdateAdValidation: UpdateAdValidation;
  UpdateAdValidation_filter: UpdateAdValidation_filter;
  UpdateDefaultMintPrice: UpdateDefaultMintPrice;
  UpdateDefaultMintPrice_filter: UpdateDefaultMintPrice_filter;
  UpdateMintPrice: UpdateMintPrice;
  UpdateMintPrice_filter: UpdateMintPrice_filter;
  UpdateOffer: UpdateOffer;
  UpdateOfferAdParameter: UpdateOfferAdParameter;
  UpdateOfferAdParameter_filter: UpdateOfferAdParameter_filter;
  UpdateOfferAdmin: UpdateOfferAdmin;
  UpdateOfferAdmin_filter: UpdateOfferAdmin_filter;
  UpdateOfferValidator: UpdateOfferValidator;
  UpdateOfferValidator_filter: UpdateOfferValidator_filter;
  UpdateOffer_filter: UpdateOffer_filter;
  UpdateUser: UpdateUser;
  UpdateUser_filter: UpdateUser_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AcceptedOfferResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['AcceptedOffer'] = ResolversParentTypes['AcceptedOffer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  offeror?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  offerId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  assetContract?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  seller?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  quantityBought?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalPricePaid?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AdOfferResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['AdOffer'] = ResolversParentTypes['AdOffer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  disable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  metadataURL?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nftContract?: Resolver<ResolversTypes['NftContract'], ParentType, ContextType>;
  initialCreator?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  creationTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  adParameters?: Resolver<Array<ResolversTypes['AdParameter']>, ParentType, ContextType, RequireFields<AdOfferadParametersArgs, 'skip' | 'first'>>;
  admins?: Resolver<Maybe<Array<ResolversTypes['Bytes']>>, ParentType, ContextType>;
  validators?: Resolver<Maybe<Array<ResolversTypes['Bytes']>>, ParentType, ContextType>;
  allProposals?: Resolver<Maybe<Array<ResolversTypes['AdProposal']>>, ParentType, ContextType, RequireFields<AdOfferallProposalsArgs, 'skip' | 'first'>>;
  currentProposals?: Resolver<Maybe<Array<ResolversTypes['CurrentProposal']>>, ParentType, ContextType, RequireFields<AdOffercurrentProposalsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AdParameterResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['AdParameter'] = ResolversParentTypes['AdParameter']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  base?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  variants?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  adOffers?: Resolver<Maybe<Array<ResolversTypes['AdOffer']>>, ParentType, ContextType, RequireFields<AdParameteradOffersArgs, 'skip' | 'first'>>;
  proposals?: Resolver<Maybe<Array<ResolversTypes['AdProposal']>>, ParentType, ContextType, RequireFields<AdParameterproposalsArgs, 'skip' | 'first'>>;
  currentProposals?: Resolver<Maybe<Array<ResolversTypes['CurrentProposal']>>, ParentType, ContextType, RequireFields<AdParametercurrentProposalsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AdProposalResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['AdProposal'] = ResolversParentTypes['AdProposal']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  adOffer?: Resolver<ResolversTypes['AdOffer'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  adParameter?: Resolver<ResolversTypes['AdParameter'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['AdProposalStatus'], ParentType, ContextType>;
  data?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rejectReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creationTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lastUpdateTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuctionClosedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['AuctionClosed'] = ResolversParentTypes['AuctionClosed']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  listingId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  closer?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  cancelled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  auctionCreator?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  winningBidder?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type CallWithProtocolFeeResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['CallWithProtocolFee'] = ResolversParentTypes['CallWithProtocolFee']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  target?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  fee?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  enabler?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  spender?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  referralAdditionalInformation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  revenueTransaction?: Resolver<Maybe<ResolversTypes['RevenueTransaction']>, ParentType, ContextType>;
  referralAddresses?: Resolver<Array<ResolversTypes['Bytes']>, ParentType, ContextType>;
  referralUnitShare?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  referralNb?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CancelledOfferResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['CancelledOffer'] = ResolversParentTypes['CancelledOffer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  offeror?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  offerId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContractURIUpdatedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ContractURIUpdated'] = ResolversParentTypes['ContractURIUpdated']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CurrentProposalResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['CurrentProposal'] = ResolversParentTypes['CurrentProposal']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  adOffer?: Resolver<ResolversTypes['AdOffer'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  adParameter?: Resolver<ResolversTypes['AdParameter'], ParentType, ContextType>;
  pendingProposal?: Resolver<Maybe<ResolversTypes['AdProposal']>, ParentType, ContextType>;
  acceptedProposal?: Resolver<Maybe<ResolversTypes['AdProposal']>, ParentType, ContextType>;
  rejectedProposal?: Resolver<Maybe<ResolversTypes['AdProposal']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FeeUpdateResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['FeeUpdate'] = ResolversParentTypes['FeeUpdate']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  feeRecipient?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  feeBps?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type ListingAddedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ListingAdded'] = ResolversParentTypes['ListingAdded']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  listingId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  assetContract?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  lister?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  listing_listingId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  listing_tokenOwner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  listing_assetContract?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  listing_tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  listing_startTime?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  listing_endTime?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  listing_quantity?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  listing_currency?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  listing_reservePricePerToken?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  listing_buyoutPricePerToken?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  listing_tokenType?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  listing_transferType?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  listing_rentalExpirationTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  listing_listingType?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ListingRemovedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ListingRemoved'] = ResolversParentTypes['ListingRemoved']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  listingId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  listingCreator?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ListingUpdatedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ListingUpdated'] = ResolversParentTypes['ListingUpdated']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  listingId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  listingCreator?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MarketplaceBidResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['MarketplaceBid'] = ResolversParentTypes['MarketplaceBid']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  listing?: Resolver<ResolversTypes['MarketplaceListing'], ParentType, ContextType>;
  bidder?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalBidAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
  creationTxHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  revenueTransaction?: Resolver<Maybe<ResolversTypes['RevenueTransaction']>, ParentType, ContextType>;
  creationTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lastUpdateTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MarketplaceDirectBuyResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['MarketplaceDirectBuy'] = ResolversParentTypes['MarketplaceDirectBuy']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  listing?: Resolver<ResolversTypes['MarketplaceListing'], ParentType, ContextType>;
  buyer?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  quantityBought?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalPricePaid?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  revenueTransaction?: Resolver<ResolversTypes['RevenueTransaction'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MarketplaceListingResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['MarketplaceListing'] = ResolversParentTypes['MarketplaceListing']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  listingType?: Resolver<ResolversTypes['ListingType'], ParentType, ContextType>;
  lister?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  startTime?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  endTime?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  reservePricePerToken?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  buyoutPricePerToken?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tokenType?: Resolver<ResolversTypes['TokenType'], ParentType, ContextType>;
  transferType?: Resolver<ResolversTypes['TransferType'], ParentType, ContextType>;
  rentalExpirationTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
  creationTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lastUpdateTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  completedBid?: Resolver<Maybe<ResolversTypes['MarketplaceBid']>, ParentType, ContextType>;
  bids?: Resolver<Maybe<Array<ResolversTypes['MarketplaceBid']>>, ParentType, ContextType, RequireFields<MarketplaceListingbidsArgs, 'skip' | 'first'>>;
  directBuys?: Resolver<Maybe<Array<ResolversTypes['MarketplaceDirectBuy']>>, ParentType, ContextType, RequireFields<MarketplaceListingdirectBuysArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MarketplaceOfferResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['MarketplaceOffer'] = ResolversParentTypes['MarketplaceOffer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  offeror?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  totalPrice?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tokenType?: Resolver<ResolversTypes['TokenType'], ParentType, ContextType>;
  transferType?: Resolver<ResolversTypes['TransferType'], ParentType, ContextType>;
  expirationTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  rentalExpirationTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
  revenueTransaction?: Resolver<Maybe<ResolversTypes['RevenueTransaction']>, ParentType, ContextType>;
  referralAdditionalInformation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creationTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lastUpdateTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MintResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Mint'] = ResolversParentTypes['Mint']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  contractAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tokenData?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  revenueTransaction?: Resolver<Maybe<ResolversTypes['RevenueTransaction']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NewBidResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['NewBid'] = ResolversParentTypes['NewBid']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  listingId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  bidder?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  quantityWanted?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalBidAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NewDSponsorNFTResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['NewDSponsorNFT'] = ResolversParentTypes['NewDSponsorNFT']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  contractAddr?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  baseURI?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contractURI?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  maxSupply?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  minter?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  forwarder?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  royaltyBps?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  currencies?: Resolver<Array<ResolversTypes['Bytes']>, ParentType, ContextType>;
  prices?: Resolver<Array<ResolversTypes['BigInt']>, ParentType, ContextType>;
  allowedTokenIds?: Resolver<Array<ResolversTypes['BigInt']>, ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NewOfferResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['NewOffer'] = ResolversParentTypes['NewOffer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  offeror?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  offerId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  assetContract?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  offer_offerId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  offer_tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  offer_quantity?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  offer_totalPrice?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  offer_expirationTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  offer_offeror?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  offer_assetContract?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  offer_currency?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  offer_tokenType?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  offer_transferType?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  offer_rentalExpirationTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  offer_status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  offer_referralAdditionalInformation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NewSaleResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['NewSale'] = ResolversParentTypes['NewSale']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  listingId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  assetContract?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  lister?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  buyer?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  quantityBought?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalPricePaid?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NftContractResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['NftContract'] = ResolversParentTypes['NftContract']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  baseURI?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contractURI?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  maxSupply?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  minter?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  forwarder?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['OwnershipTransferred']>, ParentType, ContextType>;
  royaltyBps?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  allowList?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  adOffers?: Resolver<Maybe<Array<ResolversTypes['AdOffer']>>, ParentType, ContextType, RequireFields<NftContractadOffersArgs, 'skip' | 'first'>>;
  prices?: Resolver<Maybe<Array<ResolversTypes['NftPrice']>>, ParentType, ContextType, RequireFields<NftContractpricesArgs, 'skip' | 'first'>>;
  tokens?: Resolver<Maybe<Array<ResolversTypes['Token']>>, ParentType, ContextType, RequireFields<NftContracttokensArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NftPriceResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['NftPrice'] = ResolversParentTypes['NftPrice']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  nftContract?: Resolver<ResolversTypes['NftContract'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OwnershipTransferredResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['OwnershipTransferred'] = ResolversParentTypes['OwnershipTransferred']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  previousOwner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  newOwner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  adOffer?: Resolver<Maybe<ResolversTypes['AdOffer']>, ParentType, ContextType, RequireFields<QueryadOfferArgs, 'id' | 'subgraphError'>>;
  adOffers?: Resolver<Array<ResolversTypes['AdOffer']>, ParentType, ContextType, RequireFields<QueryadOffersArgs, 'skip' | 'first' | 'subgraphError'>>;
  adParameter?: Resolver<Maybe<ResolversTypes['AdParameter']>, ParentType, ContextType, RequireFields<QueryadParameterArgs, 'id' | 'subgraphError'>>;
  adParameters?: Resolver<Array<ResolversTypes['AdParameter']>, ParentType, ContextType, RequireFields<QueryadParametersArgs, 'skip' | 'first' | 'subgraphError'>>;
  adProposal?: Resolver<Maybe<ResolversTypes['AdProposal']>, ParentType, ContextType, RequireFields<QueryadProposalArgs, 'id' | 'subgraphError'>>;
  adProposals?: Resolver<Array<ResolversTypes['AdProposal']>, ParentType, ContextType, RequireFields<QueryadProposalsArgs, 'skip' | 'first' | 'subgraphError'>>;
  currentProposal?: Resolver<Maybe<ResolversTypes['CurrentProposal']>, ParentType, ContextType, RequireFields<QuerycurrentProposalArgs, 'id' | 'subgraphError'>>;
  currentProposals?: Resolver<Array<ResolversTypes['CurrentProposal']>, ParentType, ContextType, RequireFields<QuerycurrentProposalsArgs, 'skip' | 'first' | 'subgraphError'>>;
  nftContract?: Resolver<Maybe<ResolversTypes['NftContract']>, ParentType, ContextType, RequireFields<QuerynftContractArgs, 'id' | 'subgraphError'>>;
  nftContracts?: Resolver<Array<ResolversTypes['NftContract']>, ParentType, ContextType, RequireFields<QuerynftContractsArgs, 'skip' | 'first' | 'subgraphError'>>;
  nftPrice?: Resolver<Maybe<ResolversTypes['NftPrice']>, ParentType, ContextType, RequireFields<QuerynftPriceArgs, 'id' | 'subgraphError'>>;
  nftPrices?: Resolver<Array<ResolversTypes['NftPrice']>, ParentType, ContextType, RequireFields<QuerynftPricesArgs, 'skip' | 'first' | 'subgraphError'>>;
  marketplaceBid?: Resolver<Maybe<ResolversTypes['MarketplaceBid']>, ParentType, ContextType, RequireFields<QuerymarketplaceBidArgs, 'id' | 'subgraphError'>>;
  marketplaceBids?: Resolver<Array<ResolversTypes['MarketplaceBid']>, ParentType, ContextType, RequireFields<QuerymarketplaceBidsArgs, 'skip' | 'first' | 'subgraphError'>>;
  marketplaceDirectBuy?: Resolver<Maybe<ResolversTypes['MarketplaceDirectBuy']>, ParentType, ContextType, RequireFields<QuerymarketplaceDirectBuyArgs, 'id' | 'subgraphError'>>;
  marketplaceDirectBuys?: Resolver<Array<ResolversTypes['MarketplaceDirectBuy']>, ParentType, ContextType, RequireFields<QuerymarketplaceDirectBuysArgs, 'skip' | 'first' | 'subgraphError'>>;
  marketplaceListing?: Resolver<Maybe<ResolversTypes['MarketplaceListing']>, ParentType, ContextType, RequireFields<QuerymarketplaceListingArgs, 'id' | 'subgraphError'>>;
  marketplaceListings?: Resolver<Array<ResolversTypes['MarketplaceListing']>, ParentType, ContextType, RequireFields<QuerymarketplaceListingsArgs, 'skip' | 'first' | 'subgraphError'>>;
  marketplaceOffer?: Resolver<Maybe<ResolversTypes['MarketplaceOffer']>, ParentType, ContextType, RequireFields<QuerymarketplaceOfferArgs, 'id' | 'subgraphError'>>;
  marketplaceOffers?: Resolver<Array<ResolversTypes['MarketplaceOffer']>, ParentType, ContextType, RequireFields<QuerymarketplaceOffersArgs, 'skip' | 'first' | 'subgraphError'>>;
  revenueTransaction?: Resolver<Maybe<ResolversTypes['RevenueTransaction']>, ParentType, ContextType, RequireFields<QueryrevenueTransactionArgs, 'id' | 'subgraphError'>>;
  revenueTransactions?: Resolver<Array<ResolversTypes['RevenueTransaction']>, ParentType, ContextType, RequireFields<QueryrevenueTransactionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  token?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<QuerytokenArgs, 'id' | 'subgraphError'>>;
  tokens?: Resolver<Array<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<QuerytokensArgs, 'skip' | 'first' | 'subgraphError'>>;
  tokenPrice?: Resolver<Maybe<ResolversTypes['TokenPrice']>, ParentType, ContextType, RequireFields<QuerytokenPriceArgs, 'id' | 'subgraphError'>>;
  tokenPrices?: Resolver<Array<ResolversTypes['TokenPrice']>, ParentType, ContextType, RequireFields<QuerytokenPricesArgs, 'skip' | 'first' | 'subgraphError'>>;
  callWithProtocolFee?: Resolver<Maybe<ResolversTypes['CallWithProtocolFee']>, ParentType, ContextType, RequireFields<QuerycallWithProtocolFeeArgs, 'id' | 'subgraphError'>>;
  callWithProtocolFees?: Resolver<Array<ResolversTypes['CallWithProtocolFee']>, ParentType, ContextType, RequireFields<QuerycallWithProtocolFeesArgs, 'skip' | 'first' | 'subgraphError'>>;
  feeUpdate?: Resolver<Maybe<ResolversTypes['FeeUpdate']>, ParentType, ContextType, RequireFields<QueryfeeUpdateArgs, 'id' | 'subgraphError'>>;
  feeUpdates?: Resolver<Array<ResolversTypes['FeeUpdate']>, ParentType, ContextType, RequireFields<QueryfeeUpdatesArgs, 'skip' | 'first' | 'subgraphError'>>;
  ownershipTransferred?: Resolver<Maybe<ResolversTypes['OwnershipTransferred']>, ParentType, ContextType, RequireFields<QueryownershipTransferredArgs, 'id' | 'subgraphError'>>;
  ownershipTransferreds?: Resolver<Array<ResolversTypes['OwnershipTransferred']>, ParentType, ContextType, RequireFields<QueryownershipTransferredsArgs, 'skip' | 'first' | 'subgraphError'>>;
  updateAdProposal?: Resolver<Maybe<ResolversTypes['UpdateAdProposal']>, ParentType, ContextType, RequireFields<QueryupdateAdProposalArgs, 'id' | 'subgraphError'>>;
  updateAdProposals?: Resolver<Array<ResolversTypes['UpdateAdProposal']>, ParentType, ContextType, RequireFields<QueryupdateAdProposalsArgs, 'skip' | 'first' | 'subgraphError'>>;
  updateAdValidation?: Resolver<Maybe<ResolversTypes['UpdateAdValidation']>, ParentType, ContextType, RequireFields<QueryupdateAdValidationArgs, 'id' | 'subgraphError'>>;
  updateAdValidations?: Resolver<Array<ResolversTypes['UpdateAdValidation']>, ParentType, ContextType, RequireFields<QueryupdateAdValidationsArgs, 'skip' | 'first' | 'subgraphError'>>;
  updateOffer?: Resolver<Maybe<ResolversTypes['UpdateOffer']>, ParentType, ContextType, RequireFields<QueryupdateOfferArgs, 'id' | 'subgraphError'>>;
  updateOffers?: Resolver<Array<ResolversTypes['UpdateOffer']>, ParentType, ContextType, RequireFields<QueryupdateOffersArgs, 'skip' | 'first' | 'subgraphError'>>;
  updateOfferAdParameter?: Resolver<Maybe<ResolversTypes['UpdateOfferAdParameter']>, ParentType, ContextType, RequireFields<QueryupdateOfferAdParameterArgs, 'id' | 'subgraphError'>>;
  updateOfferAdParameters?: Resolver<Array<ResolversTypes['UpdateOfferAdParameter']>, ParentType, ContextType, RequireFields<QueryupdateOfferAdParametersArgs, 'skip' | 'first' | 'subgraphError'>>;
  updateOfferAdmin?: Resolver<Maybe<ResolversTypes['UpdateOfferAdmin']>, ParentType, ContextType, RequireFields<QueryupdateOfferAdminArgs, 'id' | 'subgraphError'>>;
  updateOfferAdmins?: Resolver<Array<ResolversTypes['UpdateOfferAdmin']>, ParentType, ContextType, RequireFields<QueryupdateOfferAdminsArgs, 'skip' | 'first' | 'subgraphError'>>;
  updateOfferValidator?: Resolver<Maybe<ResolversTypes['UpdateOfferValidator']>, ParentType, ContextType, RequireFields<QueryupdateOfferValidatorArgs, 'id' | 'subgraphError'>>;
  updateOfferValidators?: Resolver<Array<ResolversTypes['UpdateOfferValidator']>, ParentType, ContextType, RequireFields<QueryupdateOfferValidatorsArgs, 'skip' | 'first' | 'subgraphError'>>;
  newDSponsorNFT?: Resolver<Maybe<ResolversTypes['NewDSponsorNFT']>, ParentType, ContextType, RequireFields<QuerynewDSponsorNFTArgs, 'id' | 'subgraphError'>>;
  newDSponsorNFTs?: Resolver<Array<ResolversTypes['NewDSponsorNFT']>, ParentType, ContextType, RequireFields<QuerynewDSponsorNFTsArgs, 'skip' | 'first' | 'subgraphError'>>;
  contractURIUpdated?: Resolver<Maybe<ResolversTypes['ContractURIUpdated']>, ParentType, ContextType, RequireFields<QuerycontractURIUpdatedArgs, 'id' | 'subgraphError'>>;
  contractURIUpdateds?: Resolver<Array<ResolversTypes['ContractURIUpdated']>, ParentType, ContextType, RequireFields<QuerycontractURIUpdatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  mint?: Resolver<Maybe<ResolversTypes['Mint']>, ParentType, ContextType, RequireFields<QuerymintArgs, 'id' | 'subgraphError'>>;
  mints?: Resolver<Array<ResolversTypes['Mint']>, ParentType, ContextType, RequireFields<QuerymintsArgs, 'skip' | 'first' | 'subgraphError'>>;
  tokensAllowlist?: Resolver<Maybe<ResolversTypes['TokensAllowlist']>, ParentType, ContextType, RequireFields<QuerytokensAllowlistArgs, 'id' | 'subgraphError'>>;
  tokensAllowlists?: Resolver<Array<ResolversTypes['TokensAllowlist']>, ParentType, ContextType, RequireFields<QuerytokensAllowlistsArgs, 'skip' | 'first' | 'subgraphError'>>;
  tokensAllowlistUpdated?: Resolver<Maybe<ResolversTypes['TokensAllowlistUpdated']>, ParentType, ContextType, RequireFields<QuerytokensAllowlistUpdatedArgs, 'id' | 'subgraphError'>>;
  tokensAllowlistUpdateds?: Resolver<Array<ResolversTypes['TokensAllowlistUpdated']>, ParentType, ContextType, RequireFields<QuerytokensAllowlistUpdatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  updateDefaultMintPrice?: Resolver<Maybe<ResolversTypes['UpdateDefaultMintPrice']>, ParentType, ContextType, RequireFields<QueryupdateDefaultMintPriceArgs, 'id' | 'subgraphError'>>;
  updateDefaultMintPrices?: Resolver<Array<ResolversTypes['UpdateDefaultMintPrice']>, ParentType, ContextType, RequireFields<QueryupdateDefaultMintPricesArgs, 'skip' | 'first' | 'subgraphError'>>;
  updateMintPrice?: Resolver<Maybe<ResolversTypes['UpdateMintPrice']>, ParentType, ContextType, RequireFields<QueryupdateMintPriceArgs, 'id' | 'subgraphError'>>;
  updateMintPrices?: Resolver<Array<ResolversTypes['UpdateMintPrice']>, ParentType, ContextType, RequireFields<QueryupdateMintPricesArgs, 'skip' | 'first' | 'subgraphError'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['UpdateUser']>, ParentType, ContextType, RequireFields<QueryupdateUserArgs, 'id' | 'subgraphError'>>;
  updateUsers?: Resolver<Array<ResolversTypes['UpdateUser']>, ParentType, ContextType, RequireFields<QueryupdateUsersArgs, 'skip' | 'first' | 'subgraphError'>>;
  acceptedOffer?: Resolver<Maybe<ResolversTypes['AcceptedOffer']>, ParentType, ContextType, RequireFields<QueryacceptedOfferArgs, 'id' | 'subgraphError'>>;
  acceptedOffers?: Resolver<Array<ResolversTypes['AcceptedOffer']>, ParentType, ContextType, RequireFields<QueryacceptedOffersArgs, 'skip' | 'first' | 'subgraphError'>>;
  auctionClosed?: Resolver<Maybe<ResolversTypes['AuctionClosed']>, ParentType, ContextType, RequireFields<QueryauctionClosedArgs, 'id' | 'subgraphError'>>;
  auctionCloseds?: Resolver<Array<ResolversTypes['AuctionClosed']>, ParentType, ContextType, RequireFields<QueryauctionClosedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  cancelledOffer?: Resolver<Maybe<ResolversTypes['CancelledOffer']>, ParentType, ContextType, RequireFields<QuerycancelledOfferArgs, 'id' | 'subgraphError'>>;
  cancelledOffers?: Resolver<Array<ResolversTypes['CancelledOffer']>, ParentType, ContextType, RequireFields<QuerycancelledOffersArgs, 'skip' | 'first' | 'subgraphError'>>;
  listingAdded?: Resolver<Maybe<ResolversTypes['ListingAdded']>, ParentType, ContextType, RequireFields<QuerylistingAddedArgs, 'id' | 'subgraphError'>>;
  listingAddeds?: Resolver<Array<ResolversTypes['ListingAdded']>, ParentType, ContextType, RequireFields<QuerylistingAddedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  listingRemoved?: Resolver<Maybe<ResolversTypes['ListingRemoved']>, ParentType, ContextType, RequireFields<QuerylistingRemovedArgs, 'id' | 'subgraphError'>>;
  listingRemoveds?: Resolver<Array<ResolversTypes['ListingRemoved']>, ParentType, ContextType, RequireFields<QuerylistingRemovedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  listingUpdated?: Resolver<Maybe<ResolversTypes['ListingUpdated']>, ParentType, ContextType, RequireFields<QuerylistingUpdatedArgs, 'id' | 'subgraphError'>>;
  listingUpdateds?: Resolver<Array<ResolversTypes['ListingUpdated']>, ParentType, ContextType, RequireFields<QuerylistingUpdatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  newBid?: Resolver<Maybe<ResolversTypes['NewBid']>, ParentType, ContextType, RequireFields<QuerynewBidArgs, 'id' | 'subgraphError'>>;
  newBids?: Resolver<Array<ResolversTypes['NewBid']>, ParentType, ContextType, RequireFields<QuerynewBidsArgs, 'skip' | 'first' | 'subgraphError'>>;
  newOffer?: Resolver<Maybe<ResolversTypes['NewOffer']>, ParentType, ContextType, RequireFields<QuerynewOfferArgs, 'id' | 'subgraphError'>>;
  newOffers?: Resolver<Array<ResolversTypes['NewOffer']>, ParentType, ContextType, RequireFields<QuerynewOffersArgs, 'skip' | 'first' | 'subgraphError'>>;
  newSale?: Resolver<Maybe<ResolversTypes['NewSale']>, ParentType, ContextType, RequireFields<QuerynewSaleArgs, 'id' | 'subgraphError'>>;
  newSales?: Resolver<Array<ResolversTypes['NewSale']>, ParentType, ContextType, RequireFields<QuerynewSalesArgs, 'skip' | 'first' | 'subgraphError'>>;
  offerSearch?: Resolver<Array<ResolversTypes['AdOffer']>, ParentType, ContextType, RequireFields<QueryofferSearchArgs, 'text' | 'first' | 'skip' | 'subgraphError'>>;
  offerSearchFR?: Resolver<Array<ResolversTypes['AdOffer']>, ParentType, ContextType, RequireFields<QueryofferSearchFRArgs, 'text' | 'first' | 'skip' | 'subgraphError'>>;
  offerSearchEN?: Resolver<Array<ResolversTypes['AdOffer']>, ParentType, ContextType, RequireFields<QueryofferSearchENArgs, 'text' | 'first' | 'skip' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type RevenueTransactionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['RevenueTransaction'] = ResolversParentTypes['RevenueTransaction']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  protocolFees?: Resolver<Maybe<Array<ResolversTypes['CallWithProtocolFee']>>, ParentType, ContextType, RequireFields<RevenueTransactionprotocolFeesArgs, 'skip' | 'first'>>;
  marketplaceBids?: Resolver<Maybe<Array<ResolversTypes['MarketplaceBid']>>, ParentType, ContextType, RequireFields<RevenueTransactionmarketplaceBidsArgs, 'skip' | 'first'>>;
  marketplaceDirectBuys?: Resolver<Maybe<Array<ResolversTypes['MarketplaceDirectBuy']>>, ParentType, ContextType, RequireFields<RevenueTransactionmarketplaceDirectBuysArgs, 'skip' | 'first'>>;
  marketplaceOffers?: Resolver<Maybe<Array<ResolversTypes['MarketplaceOffer']>>, ParentType, ContextType, RequireFields<RevenueTransactionmarketplaceOffersArgs, 'skip' | 'first'>>;
  mints?: Resolver<Maybe<Array<ResolversTypes['Mint']>>, ParentType, ContextType, RequireFields<RevenueTransactionmintsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  adOffer?: SubscriptionResolver<Maybe<ResolversTypes['AdOffer']>, "adOffer", ParentType, ContextType, RequireFields<SubscriptionadOfferArgs, 'id' | 'subgraphError'>>;
  adOffers?: SubscriptionResolver<Array<ResolversTypes['AdOffer']>, "adOffers", ParentType, ContextType, RequireFields<SubscriptionadOffersArgs, 'skip' | 'first' | 'subgraphError'>>;
  adParameter?: SubscriptionResolver<Maybe<ResolversTypes['AdParameter']>, "adParameter", ParentType, ContextType, RequireFields<SubscriptionadParameterArgs, 'id' | 'subgraphError'>>;
  adParameters?: SubscriptionResolver<Array<ResolversTypes['AdParameter']>, "adParameters", ParentType, ContextType, RequireFields<SubscriptionadParametersArgs, 'skip' | 'first' | 'subgraphError'>>;
  adProposal?: SubscriptionResolver<Maybe<ResolversTypes['AdProposal']>, "adProposal", ParentType, ContextType, RequireFields<SubscriptionadProposalArgs, 'id' | 'subgraphError'>>;
  adProposals?: SubscriptionResolver<Array<ResolversTypes['AdProposal']>, "adProposals", ParentType, ContextType, RequireFields<SubscriptionadProposalsArgs, 'skip' | 'first' | 'subgraphError'>>;
  currentProposal?: SubscriptionResolver<Maybe<ResolversTypes['CurrentProposal']>, "currentProposal", ParentType, ContextType, RequireFields<SubscriptioncurrentProposalArgs, 'id' | 'subgraphError'>>;
  currentProposals?: SubscriptionResolver<Array<ResolversTypes['CurrentProposal']>, "currentProposals", ParentType, ContextType, RequireFields<SubscriptioncurrentProposalsArgs, 'skip' | 'first' | 'subgraphError'>>;
  nftContract?: SubscriptionResolver<Maybe<ResolversTypes['NftContract']>, "nftContract", ParentType, ContextType, RequireFields<SubscriptionnftContractArgs, 'id' | 'subgraphError'>>;
  nftContracts?: SubscriptionResolver<Array<ResolversTypes['NftContract']>, "nftContracts", ParentType, ContextType, RequireFields<SubscriptionnftContractsArgs, 'skip' | 'first' | 'subgraphError'>>;
  nftPrice?: SubscriptionResolver<Maybe<ResolversTypes['NftPrice']>, "nftPrice", ParentType, ContextType, RequireFields<SubscriptionnftPriceArgs, 'id' | 'subgraphError'>>;
  nftPrices?: SubscriptionResolver<Array<ResolversTypes['NftPrice']>, "nftPrices", ParentType, ContextType, RequireFields<SubscriptionnftPricesArgs, 'skip' | 'first' | 'subgraphError'>>;
  marketplaceBid?: SubscriptionResolver<Maybe<ResolversTypes['MarketplaceBid']>, "marketplaceBid", ParentType, ContextType, RequireFields<SubscriptionmarketplaceBidArgs, 'id' | 'subgraphError'>>;
  marketplaceBids?: SubscriptionResolver<Array<ResolversTypes['MarketplaceBid']>, "marketplaceBids", ParentType, ContextType, RequireFields<SubscriptionmarketplaceBidsArgs, 'skip' | 'first' | 'subgraphError'>>;
  marketplaceDirectBuy?: SubscriptionResolver<Maybe<ResolversTypes['MarketplaceDirectBuy']>, "marketplaceDirectBuy", ParentType, ContextType, RequireFields<SubscriptionmarketplaceDirectBuyArgs, 'id' | 'subgraphError'>>;
  marketplaceDirectBuys?: SubscriptionResolver<Array<ResolversTypes['MarketplaceDirectBuy']>, "marketplaceDirectBuys", ParentType, ContextType, RequireFields<SubscriptionmarketplaceDirectBuysArgs, 'skip' | 'first' | 'subgraphError'>>;
  marketplaceListing?: SubscriptionResolver<Maybe<ResolversTypes['MarketplaceListing']>, "marketplaceListing", ParentType, ContextType, RequireFields<SubscriptionmarketplaceListingArgs, 'id' | 'subgraphError'>>;
  marketplaceListings?: SubscriptionResolver<Array<ResolversTypes['MarketplaceListing']>, "marketplaceListings", ParentType, ContextType, RequireFields<SubscriptionmarketplaceListingsArgs, 'skip' | 'first' | 'subgraphError'>>;
  marketplaceOffer?: SubscriptionResolver<Maybe<ResolversTypes['MarketplaceOffer']>, "marketplaceOffer", ParentType, ContextType, RequireFields<SubscriptionmarketplaceOfferArgs, 'id' | 'subgraphError'>>;
  marketplaceOffers?: SubscriptionResolver<Array<ResolversTypes['MarketplaceOffer']>, "marketplaceOffers", ParentType, ContextType, RequireFields<SubscriptionmarketplaceOffersArgs, 'skip' | 'first' | 'subgraphError'>>;
  revenueTransaction?: SubscriptionResolver<Maybe<ResolversTypes['RevenueTransaction']>, "revenueTransaction", ParentType, ContextType, RequireFields<SubscriptionrevenueTransactionArgs, 'id' | 'subgraphError'>>;
  revenueTransactions?: SubscriptionResolver<Array<ResolversTypes['RevenueTransaction']>, "revenueTransactions", ParentType, ContextType, RequireFields<SubscriptionrevenueTransactionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  token?: SubscriptionResolver<Maybe<ResolversTypes['Token']>, "token", ParentType, ContextType, RequireFields<SubscriptiontokenArgs, 'id' | 'subgraphError'>>;
  tokens?: SubscriptionResolver<Array<ResolversTypes['Token']>, "tokens", ParentType, ContextType, RequireFields<SubscriptiontokensArgs, 'skip' | 'first' | 'subgraphError'>>;
  tokenPrice?: SubscriptionResolver<Maybe<ResolversTypes['TokenPrice']>, "tokenPrice", ParentType, ContextType, RequireFields<SubscriptiontokenPriceArgs, 'id' | 'subgraphError'>>;
  tokenPrices?: SubscriptionResolver<Array<ResolversTypes['TokenPrice']>, "tokenPrices", ParentType, ContextType, RequireFields<SubscriptiontokenPricesArgs, 'skip' | 'first' | 'subgraphError'>>;
  callWithProtocolFee?: SubscriptionResolver<Maybe<ResolversTypes['CallWithProtocolFee']>, "callWithProtocolFee", ParentType, ContextType, RequireFields<SubscriptioncallWithProtocolFeeArgs, 'id' | 'subgraphError'>>;
  callWithProtocolFees?: SubscriptionResolver<Array<ResolversTypes['CallWithProtocolFee']>, "callWithProtocolFees", ParentType, ContextType, RequireFields<SubscriptioncallWithProtocolFeesArgs, 'skip' | 'first' | 'subgraphError'>>;
  feeUpdate?: SubscriptionResolver<Maybe<ResolversTypes['FeeUpdate']>, "feeUpdate", ParentType, ContextType, RequireFields<SubscriptionfeeUpdateArgs, 'id' | 'subgraphError'>>;
  feeUpdates?: SubscriptionResolver<Array<ResolversTypes['FeeUpdate']>, "feeUpdates", ParentType, ContextType, RequireFields<SubscriptionfeeUpdatesArgs, 'skip' | 'first' | 'subgraphError'>>;
  ownershipTransferred?: SubscriptionResolver<Maybe<ResolversTypes['OwnershipTransferred']>, "ownershipTransferred", ParentType, ContextType, RequireFields<SubscriptionownershipTransferredArgs, 'id' | 'subgraphError'>>;
  ownershipTransferreds?: SubscriptionResolver<Array<ResolversTypes['OwnershipTransferred']>, "ownershipTransferreds", ParentType, ContextType, RequireFields<SubscriptionownershipTransferredsArgs, 'skip' | 'first' | 'subgraphError'>>;
  updateAdProposal?: SubscriptionResolver<Maybe<ResolversTypes['UpdateAdProposal']>, "updateAdProposal", ParentType, ContextType, RequireFields<SubscriptionupdateAdProposalArgs, 'id' | 'subgraphError'>>;
  updateAdProposals?: SubscriptionResolver<Array<ResolversTypes['UpdateAdProposal']>, "updateAdProposals", ParentType, ContextType, RequireFields<SubscriptionupdateAdProposalsArgs, 'skip' | 'first' | 'subgraphError'>>;
  updateAdValidation?: SubscriptionResolver<Maybe<ResolversTypes['UpdateAdValidation']>, "updateAdValidation", ParentType, ContextType, RequireFields<SubscriptionupdateAdValidationArgs, 'id' | 'subgraphError'>>;
  updateAdValidations?: SubscriptionResolver<Array<ResolversTypes['UpdateAdValidation']>, "updateAdValidations", ParentType, ContextType, RequireFields<SubscriptionupdateAdValidationsArgs, 'skip' | 'first' | 'subgraphError'>>;
  updateOffer?: SubscriptionResolver<Maybe<ResolversTypes['UpdateOffer']>, "updateOffer", ParentType, ContextType, RequireFields<SubscriptionupdateOfferArgs, 'id' | 'subgraphError'>>;
  updateOffers?: SubscriptionResolver<Array<ResolversTypes['UpdateOffer']>, "updateOffers", ParentType, ContextType, RequireFields<SubscriptionupdateOffersArgs, 'skip' | 'first' | 'subgraphError'>>;
  updateOfferAdParameter?: SubscriptionResolver<Maybe<ResolversTypes['UpdateOfferAdParameter']>, "updateOfferAdParameter", ParentType, ContextType, RequireFields<SubscriptionupdateOfferAdParameterArgs, 'id' | 'subgraphError'>>;
  updateOfferAdParameters?: SubscriptionResolver<Array<ResolversTypes['UpdateOfferAdParameter']>, "updateOfferAdParameters", ParentType, ContextType, RequireFields<SubscriptionupdateOfferAdParametersArgs, 'skip' | 'first' | 'subgraphError'>>;
  updateOfferAdmin?: SubscriptionResolver<Maybe<ResolversTypes['UpdateOfferAdmin']>, "updateOfferAdmin", ParentType, ContextType, RequireFields<SubscriptionupdateOfferAdminArgs, 'id' | 'subgraphError'>>;
  updateOfferAdmins?: SubscriptionResolver<Array<ResolversTypes['UpdateOfferAdmin']>, "updateOfferAdmins", ParentType, ContextType, RequireFields<SubscriptionupdateOfferAdminsArgs, 'skip' | 'first' | 'subgraphError'>>;
  updateOfferValidator?: SubscriptionResolver<Maybe<ResolversTypes['UpdateOfferValidator']>, "updateOfferValidator", ParentType, ContextType, RequireFields<SubscriptionupdateOfferValidatorArgs, 'id' | 'subgraphError'>>;
  updateOfferValidators?: SubscriptionResolver<Array<ResolversTypes['UpdateOfferValidator']>, "updateOfferValidators", ParentType, ContextType, RequireFields<SubscriptionupdateOfferValidatorsArgs, 'skip' | 'first' | 'subgraphError'>>;
  newDSponsorNFT?: SubscriptionResolver<Maybe<ResolversTypes['NewDSponsorNFT']>, "newDSponsorNFT", ParentType, ContextType, RequireFields<SubscriptionnewDSponsorNFTArgs, 'id' | 'subgraphError'>>;
  newDSponsorNFTs?: SubscriptionResolver<Array<ResolversTypes['NewDSponsorNFT']>, "newDSponsorNFTs", ParentType, ContextType, RequireFields<SubscriptionnewDSponsorNFTsArgs, 'skip' | 'first' | 'subgraphError'>>;
  contractURIUpdated?: SubscriptionResolver<Maybe<ResolversTypes['ContractURIUpdated']>, "contractURIUpdated", ParentType, ContextType, RequireFields<SubscriptioncontractURIUpdatedArgs, 'id' | 'subgraphError'>>;
  contractURIUpdateds?: SubscriptionResolver<Array<ResolversTypes['ContractURIUpdated']>, "contractURIUpdateds", ParentType, ContextType, RequireFields<SubscriptioncontractURIUpdatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  mint?: SubscriptionResolver<Maybe<ResolversTypes['Mint']>, "mint", ParentType, ContextType, RequireFields<SubscriptionmintArgs, 'id' | 'subgraphError'>>;
  mints?: SubscriptionResolver<Array<ResolversTypes['Mint']>, "mints", ParentType, ContextType, RequireFields<SubscriptionmintsArgs, 'skip' | 'first' | 'subgraphError'>>;
  tokensAllowlist?: SubscriptionResolver<Maybe<ResolversTypes['TokensAllowlist']>, "tokensAllowlist", ParentType, ContextType, RequireFields<SubscriptiontokensAllowlistArgs, 'id' | 'subgraphError'>>;
  tokensAllowlists?: SubscriptionResolver<Array<ResolversTypes['TokensAllowlist']>, "tokensAllowlists", ParentType, ContextType, RequireFields<SubscriptiontokensAllowlistsArgs, 'skip' | 'first' | 'subgraphError'>>;
  tokensAllowlistUpdated?: SubscriptionResolver<Maybe<ResolversTypes['TokensAllowlistUpdated']>, "tokensAllowlistUpdated", ParentType, ContextType, RequireFields<SubscriptiontokensAllowlistUpdatedArgs, 'id' | 'subgraphError'>>;
  tokensAllowlistUpdateds?: SubscriptionResolver<Array<ResolversTypes['TokensAllowlistUpdated']>, "tokensAllowlistUpdateds", ParentType, ContextType, RequireFields<SubscriptiontokensAllowlistUpdatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  updateDefaultMintPrice?: SubscriptionResolver<Maybe<ResolversTypes['UpdateDefaultMintPrice']>, "updateDefaultMintPrice", ParentType, ContextType, RequireFields<SubscriptionupdateDefaultMintPriceArgs, 'id' | 'subgraphError'>>;
  updateDefaultMintPrices?: SubscriptionResolver<Array<ResolversTypes['UpdateDefaultMintPrice']>, "updateDefaultMintPrices", ParentType, ContextType, RequireFields<SubscriptionupdateDefaultMintPricesArgs, 'skip' | 'first' | 'subgraphError'>>;
  updateMintPrice?: SubscriptionResolver<Maybe<ResolversTypes['UpdateMintPrice']>, "updateMintPrice", ParentType, ContextType, RequireFields<SubscriptionupdateMintPriceArgs, 'id' | 'subgraphError'>>;
  updateMintPrices?: SubscriptionResolver<Array<ResolversTypes['UpdateMintPrice']>, "updateMintPrices", ParentType, ContextType, RequireFields<SubscriptionupdateMintPricesArgs, 'skip' | 'first' | 'subgraphError'>>;
  updateUser?: SubscriptionResolver<Maybe<ResolversTypes['UpdateUser']>, "updateUser", ParentType, ContextType, RequireFields<SubscriptionupdateUserArgs, 'id' | 'subgraphError'>>;
  updateUsers?: SubscriptionResolver<Array<ResolversTypes['UpdateUser']>, "updateUsers", ParentType, ContextType, RequireFields<SubscriptionupdateUsersArgs, 'skip' | 'first' | 'subgraphError'>>;
  acceptedOffer?: SubscriptionResolver<Maybe<ResolversTypes['AcceptedOffer']>, "acceptedOffer", ParentType, ContextType, RequireFields<SubscriptionacceptedOfferArgs, 'id' | 'subgraphError'>>;
  acceptedOffers?: SubscriptionResolver<Array<ResolversTypes['AcceptedOffer']>, "acceptedOffers", ParentType, ContextType, RequireFields<SubscriptionacceptedOffersArgs, 'skip' | 'first' | 'subgraphError'>>;
  auctionClosed?: SubscriptionResolver<Maybe<ResolversTypes['AuctionClosed']>, "auctionClosed", ParentType, ContextType, RequireFields<SubscriptionauctionClosedArgs, 'id' | 'subgraphError'>>;
  auctionCloseds?: SubscriptionResolver<Array<ResolversTypes['AuctionClosed']>, "auctionCloseds", ParentType, ContextType, RequireFields<SubscriptionauctionClosedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  cancelledOffer?: SubscriptionResolver<Maybe<ResolversTypes['CancelledOffer']>, "cancelledOffer", ParentType, ContextType, RequireFields<SubscriptioncancelledOfferArgs, 'id' | 'subgraphError'>>;
  cancelledOffers?: SubscriptionResolver<Array<ResolversTypes['CancelledOffer']>, "cancelledOffers", ParentType, ContextType, RequireFields<SubscriptioncancelledOffersArgs, 'skip' | 'first' | 'subgraphError'>>;
  listingAdded?: SubscriptionResolver<Maybe<ResolversTypes['ListingAdded']>, "listingAdded", ParentType, ContextType, RequireFields<SubscriptionlistingAddedArgs, 'id' | 'subgraphError'>>;
  listingAddeds?: SubscriptionResolver<Array<ResolversTypes['ListingAdded']>, "listingAddeds", ParentType, ContextType, RequireFields<SubscriptionlistingAddedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  listingRemoved?: SubscriptionResolver<Maybe<ResolversTypes['ListingRemoved']>, "listingRemoved", ParentType, ContextType, RequireFields<SubscriptionlistingRemovedArgs, 'id' | 'subgraphError'>>;
  listingRemoveds?: SubscriptionResolver<Array<ResolversTypes['ListingRemoved']>, "listingRemoveds", ParentType, ContextType, RequireFields<SubscriptionlistingRemovedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  listingUpdated?: SubscriptionResolver<Maybe<ResolversTypes['ListingUpdated']>, "listingUpdated", ParentType, ContextType, RequireFields<SubscriptionlistingUpdatedArgs, 'id' | 'subgraphError'>>;
  listingUpdateds?: SubscriptionResolver<Array<ResolversTypes['ListingUpdated']>, "listingUpdateds", ParentType, ContextType, RequireFields<SubscriptionlistingUpdatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  newBid?: SubscriptionResolver<Maybe<ResolversTypes['NewBid']>, "newBid", ParentType, ContextType, RequireFields<SubscriptionnewBidArgs, 'id' | 'subgraphError'>>;
  newBids?: SubscriptionResolver<Array<ResolversTypes['NewBid']>, "newBids", ParentType, ContextType, RequireFields<SubscriptionnewBidsArgs, 'skip' | 'first' | 'subgraphError'>>;
  newOffer?: SubscriptionResolver<Maybe<ResolversTypes['NewOffer']>, "newOffer", ParentType, ContextType, RequireFields<SubscriptionnewOfferArgs, 'id' | 'subgraphError'>>;
  newOffers?: SubscriptionResolver<Array<ResolversTypes['NewOffer']>, "newOffers", ParentType, ContextType, RequireFields<SubscriptionnewOffersArgs, 'skip' | 'first' | 'subgraphError'>>;
  newSale?: SubscriptionResolver<Maybe<ResolversTypes['NewSale']>, "newSale", ParentType, ContextType, RequireFields<SubscriptionnewSaleArgs, 'id' | 'subgraphError'>>;
  newSales?: SubscriptionResolver<Array<ResolversTypes['NewSale']>, "newSales", ParentType, ContextType, RequireFields<SubscriptionnewSalesArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type TokenResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nftContract?: Resolver<ResolversTypes['NftContract'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  setInAllowList?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  mint?: Resolver<Maybe<ResolversTypes['Mint']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['UpdateUser']>, ParentType, ContextType>;
  prices?: Resolver<Maybe<Array<ResolversTypes['TokenPrice']>>, ParentType, ContextType, RequireFields<TokenpricesArgs, 'skip' | 'first'>>;
  currentProposals?: Resolver<Maybe<Array<ResolversTypes['CurrentProposal']>>, ParentType, ContextType, RequireFields<TokencurrentProposalsArgs, 'skip' | 'first'>>;
  allProposals?: Resolver<Maybe<Array<ResolversTypes['AdProposal']>>, ParentType, ContextType, RequireFields<TokenallProposalsArgs, 'skip' | 'first'>>;
  marketplaceListings?: Resolver<Maybe<Array<ResolversTypes['MarketplaceListing']>>, ParentType, ContextType, RequireFields<TokenmarketplaceListingsArgs, 'skip' | 'first'>>;
  marketplaceOffers?: Resolver<Maybe<Array<ResolversTypes['MarketplaceOffer']>>, ParentType, ContextType, RequireFields<TokenmarketplaceOffersArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TokenPriceResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TokenPrice'] = ResolversParentTypes['TokenPrice']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TokensAllowlistResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TokensAllowlist'] = ResolversParentTypes['TokensAllowlist']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  allowed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TokensAllowlistUpdatedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TokensAllowlistUpdated'] = ResolversParentTypes['TokensAllowlistUpdated']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  allowed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpdateAdProposalResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['UpdateAdProposal'] = ResolversParentTypes['UpdateAdProposal']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  offerId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  proposalId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  adParameter?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpdateAdValidationResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['UpdateAdValidation'] = ResolversParentTypes['UpdateAdValidation']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  offerId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  proposalId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  adParameter?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  validated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  reason?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpdateDefaultMintPriceResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['UpdateDefaultMintPrice'] = ResolversParentTypes['UpdateDefaultMintPrice']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpdateMintPriceResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['UpdateMintPrice'] = ResolversParentTypes['UpdateMintPrice']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpdateOfferResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['UpdateOffer'] = ResolversParentTypes['UpdateOffer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  offerId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  disable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  offerMetadata?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nftContract?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpdateOfferAdParameterResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['UpdateOfferAdParameter'] = ResolversParentTypes['UpdateOfferAdParameter']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  offerId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  adParameter?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  enable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpdateOfferAdminResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['UpdateOfferAdmin'] = ResolversParentTypes['UpdateOfferAdmin']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  offerId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  admin?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  enable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpdateOfferValidatorResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['UpdateOfferValidator'] = ResolversParentTypes['UpdateOfferValidator']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  offerId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  validator?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  enable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpdateUserResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['UpdateUser'] = ResolversParentTypes['UpdateUser']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  expires?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  parentHash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  AcceptedOffer?: AcceptedOfferResolvers<ContextType>;
  AdOffer?: AdOfferResolvers<ContextType>;
  AdParameter?: AdParameterResolvers<ContextType>;
  AdProposal?: AdProposalResolvers<ContextType>;
  AuctionClosed?: AuctionClosedResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  CallWithProtocolFee?: CallWithProtocolFeeResolvers<ContextType>;
  CancelledOffer?: CancelledOfferResolvers<ContextType>;
  ContractURIUpdated?: ContractURIUpdatedResolvers<ContextType>;
  CurrentProposal?: CurrentProposalResolvers<ContextType>;
  FeeUpdate?: FeeUpdateResolvers<ContextType>;
  Int8?: GraphQLScalarType;
  ListingAdded?: ListingAddedResolvers<ContextType>;
  ListingRemoved?: ListingRemovedResolvers<ContextType>;
  ListingUpdated?: ListingUpdatedResolvers<ContextType>;
  MarketplaceBid?: MarketplaceBidResolvers<ContextType>;
  MarketplaceDirectBuy?: MarketplaceDirectBuyResolvers<ContextType>;
  MarketplaceListing?: MarketplaceListingResolvers<ContextType>;
  MarketplaceOffer?: MarketplaceOfferResolvers<ContextType>;
  Mint?: MintResolvers<ContextType>;
  NewBid?: NewBidResolvers<ContextType>;
  NewDSponsorNFT?: NewDSponsorNFTResolvers<ContextType>;
  NewOffer?: NewOfferResolvers<ContextType>;
  NewSale?: NewSaleResolvers<ContextType>;
  NftContract?: NftContractResolvers<ContextType>;
  NftPrice?: NftPriceResolvers<ContextType>;
  OwnershipTransferred?: OwnershipTransferredResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RevenueTransaction?: RevenueTransactionResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  Token?: TokenResolvers<ContextType>;
  TokenPrice?: TokenPriceResolvers<ContextType>;
  TokensAllowlist?: TokensAllowlistResolvers<ContextType>;
  TokensAllowlistUpdated?: TokensAllowlistUpdatedResolvers<ContextType>;
  UpdateAdProposal?: UpdateAdProposalResolvers<ContextType>;
  UpdateAdValidation?: UpdateAdValidationResolvers<ContextType>;
  UpdateDefaultMintPrice?: UpdateDefaultMintPriceResolvers<ContextType>;
  UpdateMintPrice?: UpdateMintPriceResolvers<ContextType>;
  UpdateOffer?: UpdateOfferResolvers<ContextType>;
  UpdateOfferAdParameter?: UpdateOfferAdParameterResolvers<ContextType>;
  UpdateOfferAdmin?: UpdateOfferAdminResolvers<ContextType>;
  UpdateOfferValidator?: UpdateOfferValidatorResolvers<ContextType>;
  UpdateUser?: UpdateUserResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = MySubgraphTypes.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/mySubgraph/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const mySubgraphTransforms = [];
const additionalTypeDefs = [] as any[];
const mySubgraphHandler = new GraphqlHandler({
              name: "mySubgraph",
              config: {"endpoint":"https://api.studio.thegraph.com/proxy/65744/dsponsor-sepolia/version/latest"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("mySubgraph"),
              logger: logger.child("mySubgraph"),
              importFn,
            });
sources[0] = {
          name: 'mySubgraph',
          handler: mySubgraphHandler,
          transforms: mySubgraphTransforms
        }
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));