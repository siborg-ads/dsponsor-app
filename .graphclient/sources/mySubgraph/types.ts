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
};

export type Aggregation_interval =
  | 'hour'
  | 'day';

export type Approval = {
  id: Scalars['Bytes'];
  owner: Scalars['Bytes'];
  approved: Scalars['Bytes'];
  tokenId: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type ApprovalForAll = {
  id: Scalars['Bytes'];
  owner: Scalars['Bytes'];
  operator: Scalars['Bytes'];
  approved: Scalars['Boolean'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type ApprovalForAll_filter = {
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
  operator?: InputMaybe<Scalars['Bytes']>;
  operator_not?: InputMaybe<Scalars['Bytes']>;
  operator_gt?: InputMaybe<Scalars['Bytes']>;
  operator_lt?: InputMaybe<Scalars['Bytes']>;
  operator_gte?: InputMaybe<Scalars['Bytes']>;
  operator_lte?: InputMaybe<Scalars['Bytes']>;
  operator_in?: InputMaybe<Array<Scalars['Bytes']>>;
  operator_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  operator_contains?: InputMaybe<Scalars['Bytes']>;
  operator_not_contains?: InputMaybe<Scalars['Bytes']>;
  approved?: InputMaybe<Scalars['Boolean']>;
  approved_not?: InputMaybe<Scalars['Boolean']>;
  approved_in?: InputMaybe<Array<Scalars['Boolean']>>;
  approved_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
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
  and?: InputMaybe<Array<InputMaybe<ApprovalForAll_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ApprovalForAll_filter>>>;
};

export type ApprovalForAll_orderBy =
  | 'id'
  | 'owner'
  | 'operator'
  | 'approved'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Approval_filter = {
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
  approved?: InputMaybe<Scalars['Bytes']>;
  approved_not?: InputMaybe<Scalars['Bytes']>;
  approved_gt?: InputMaybe<Scalars['Bytes']>;
  approved_lt?: InputMaybe<Scalars['Bytes']>;
  approved_gte?: InputMaybe<Scalars['Bytes']>;
  approved_lte?: InputMaybe<Scalars['Bytes']>;
  approved_in?: InputMaybe<Array<Scalars['Bytes']>>;
  approved_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  approved_contains?: InputMaybe<Scalars['Bytes']>;
  approved_not_contains?: InputMaybe<Scalars['Bytes']>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  and?: InputMaybe<Array<InputMaybe<Approval_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Approval_filter>>>;
};

export type Approval_orderBy =
  | 'id'
  | 'owner'
  | 'approved'
  | 'tokenId'
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
  additionalInformation: Scalars['String'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
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
  additionalInformation?: InputMaybe<Scalars['String']>;
  additionalInformation_not?: InputMaybe<Scalars['String']>;
  additionalInformation_gt?: InputMaybe<Scalars['String']>;
  additionalInformation_lt?: InputMaybe<Scalars['String']>;
  additionalInformation_gte?: InputMaybe<Scalars['String']>;
  additionalInformation_lte?: InputMaybe<Scalars['String']>;
  additionalInformation_in?: InputMaybe<Array<Scalars['String']>>;
  additionalInformation_not_in?: InputMaybe<Array<Scalars['String']>>;
  additionalInformation_contains?: InputMaybe<Scalars['String']>;
  additionalInformation_contains_nocase?: InputMaybe<Scalars['String']>;
  additionalInformation_not_contains?: InputMaybe<Scalars['String']>;
  additionalInformation_not_contains_nocase?: InputMaybe<Scalars['String']>;
  additionalInformation_starts_with?: InputMaybe<Scalars['String']>;
  additionalInformation_starts_with_nocase?: InputMaybe<Scalars['String']>;
  additionalInformation_not_starts_with?: InputMaybe<Scalars['String']>;
  additionalInformation_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  additionalInformation_ends_with?: InputMaybe<Scalars['String']>;
  additionalInformation_ends_with_nocase?: InputMaybe<Scalars['String']>;
  additionalInformation_not_ends_with?: InputMaybe<Scalars['String']>;
  additionalInformation_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
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
  | 'additionalInformation'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

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

export type DSponsorNFTOwnershipTransferred = {
  id: Scalars['Bytes'];
  previousOwner: Scalars['Bytes'];
  newOwner: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type DSponsorNFTOwnershipTransferred_filter = {
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
  and?: InputMaybe<Array<InputMaybe<DSponsorNFTOwnershipTransferred_filter>>>;
  or?: InputMaybe<Array<InputMaybe<DSponsorNFTOwnershipTransferred_filter>>>;
};

export type DSponsorNFTOwnershipTransferred_orderBy =
  | 'id'
  | 'previousOwner'
  | 'newOwner'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type FeeUpdate = {
  id: Scalars['Bytes'];
  recipient: Scalars['Bytes'];
  bps: Scalars['BigInt'];
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
  recipient?: InputMaybe<Scalars['Bytes']>;
  recipient_not?: InputMaybe<Scalars['Bytes']>;
  recipient_gt?: InputMaybe<Scalars['Bytes']>;
  recipient_lt?: InputMaybe<Scalars['Bytes']>;
  recipient_gte?: InputMaybe<Scalars['Bytes']>;
  recipient_lte?: InputMaybe<Scalars['Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['Bytes']>;
  bps?: InputMaybe<Scalars['BigInt']>;
  bps_not?: InputMaybe<Scalars['BigInt']>;
  bps_gt?: InputMaybe<Scalars['BigInt']>;
  bps_lt?: InputMaybe<Scalars['BigInt']>;
  bps_gte?: InputMaybe<Scalars['BigInt']>;
  bps_lte?: InputMaybe<Scalars['BigInt']>;
  bps_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bps_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  | 'recipient'
  | 'bps'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Initialized = {
  id: Scalars['Bytes'];
  version: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type Initialized_filter = {
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
  version?: InputMaybe<Scalars['BigInt']>;
  version_not?: InputMaybe<Scalars['BigInt']>;
  version_gt?: InputMaybe<Scalars['BigInt']>;
  version_lt?: InputMaybe<Scalars['BigInt']>;
  version_gte?: InputMaybe<Scalars['BigInt']>;
  version_lte?: InputMaybe<Scalars['BigInt']>;
  version_in?: InputMaybe<Array<Scalars['BigInt']>>;
  version_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  and?: InputMaybe<Array<InputMaybe<Initialized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Initialized_filter>>>;
};

export type Initialized_orderBy =
  | 'id'
  | 'version'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Mint = {
  id: Scalars['Bytes'];
  tokenId: Scalars['BigInt'];
  from: Scalars['Bytes'];
  to: Scalars['Bytes'];
  currency: Scalars['Bytes'];
  amount: Scalars['BigInt'];
  tokenData: Scalars['String'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
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
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Mint_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Mint_filter>>>;
};

export type Mint_orderBy =
  | 'id'
  | 'tokenId'
  | 'from'
  | 'to'
  | 'currency'
  | 'amount'
  | 'tokenData'
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
  approval?: Maybe<Approval>;
  approvals: Array<Approval>;
  approvalForAll?: Maybe<ApprovalForAll>;
  approvalForAlls: Array<ApprovalForAll>;
  contractURIUpdated?: Maybe<ContractURIUpdated>;
  contractURIUpdateds: Array<ContractURIUpdated>;
  initialized?: Maybe<Initialized>;
  initializeds: Array<Initialized>;
  mint?: Maybe<Mint>;
  mints: Array<Mint>;
  dsponsorNFTOwnershipTransferred?: Maybe<DSponsorNFTOwnershipTransferred>;
  dsponsorNFTOwnershipTransferreds: Array<DSponsorNFTOwnershipTransferred>;
  tokensAllowlist?: Maybe<TokensAllowlist>;
  tokensAllowlists: Array<TokensAllowlist>;
  tokensAllowlistUpdated?: Maybe<TokensAllowlistUpdated>;
  tokensAllowlistUpdateds: Array<TokensAllowlistUpdated>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  updateDefaultMintPrice?: Maybe<UpdateDefaultMintPrice>;
  updateDefaultMintPrices: Array<UpdateDefaultMintPrice>;
  updateMintPrice?: Maybe<UpdateMintPrice>;
  updateMintPrices: Array<UpdateMintPrice>;
  updateUser?: Maybe<UpdateUser>;
  updateUsers: Array<UpdateUser>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
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


export type QueryapprovalArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryapprovalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Approval_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Approval_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryapprovalForAllArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryapprovalForAllsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ApprovalForAll_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ApprovalForAll_filter>;
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


export type QueryinitializedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryinitializedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Initialized_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Initialized_filter>;
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


export type QuerydsponsorNFTOwnershipTransferredArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydsponsorNFTOwnershipTransferredsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DSponsorNFTOwnershipTransferred_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DSponsorNFTOwnershipTransferred_filter>;
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


export type QuerytransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transfer_filter>;
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


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Subscription = {
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
  approval?: Maybe<Approval>;
  approvals: Array<Approval>;
  approvalForAll?: Maybe<ApprovalForAll>;
  approvalForAlls: Array<ApprovalForAll>;
  contractURIUpdated?: Maybe<ContractURIUpdated>;
  contractURIUpdateds: Array<ContractURIUpdated>;
  initialized?: Maybe<Initialized>;
  initializeds: Array<Initialized>;
  mint?: Maybe<Mint>;
  mints: Array<Mint>;
  dsponsorNFTOwnershipTransferred?: Maybe<DSponsorNFTOwnershipTransferred>;
  dsponsorNFTOwnershipTransferreds: Array<DSponsorNFTOwnershipTransferred>;
  tokensAllowlist?: Maybe<TokensAllowlist>;
  tokensAllowlists: Array<TokensAllowlist>;
  tokensAllowlistUpdated?: Maybe<TokensAllowlistUpdated>;
  tokensAllowlistUpdateds: Array<TokensAllowlistUpdated>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  updateDefaultMintPrice?: Maybe<UpdateDefaultMintPrice>;
  updateDefaultMintPrices: Array<UpdateDefaultMintPrice>;
  updateMintPrice?: Maybe<UpdateMintPrice>;
  updateMintPrices: Array<UpdateMintPrice>;
  updateUser?: Maybe<UpdateUser>;
  updateUsers: Array<UpdateUser>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
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


export type SubscriptionapprovalArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionapprovalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Approval_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Approval_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionapprovalForAllArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionapprovalForAllsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ApprovalForAll_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ApprovalForAll_filter>;
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


export type SubscriptioninitializedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioninitializedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Initialized_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Initialized_filter>;
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


export type SubscriptiondsponsorNFTOwnershipTransferredArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondsponsorNFTOwnershipTransferredsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DSponsorNFTOwnershipTransferred_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DSponsorNFTOwnershipTransferred_filter>;
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


export type SubscriptiontransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transfer_filter>;
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


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

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

export type Transfer = {
  id: Scalars['Bytes'];
  from: Scalars['Bytes'];
  to: Scalars['Bytes'];
  tokenId: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type Transfer_filter = {
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
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  and?: InputMaybe<Array<InputMaybe<Transfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Transfer_filter>>>;
};

export type Transfer_orderBy =
  | 'id'
  | 'from'
  | 'to'
  | 'tokenId'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

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
  rulesURI: Scalars['String'];
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
  rulesURI?: InputMaybe<Scalars['String']>;
  rulesURI_not?: InputMaybe<Scalars['String']>;
  rulesURI_gt?: InputMaybe<Scalars['String']>;
  rulesURI_lt?: InputMaybe<Scalars['String']>;
  rulesURI_gte?: InputMaybe<Scalars['String']>;
  rulesURI_lte?: InputMaybe<Scalars['String']>;
  rulesURI_in?: InputMaybe<Array<Scalars['String']>>;
  rulesURI_not_in?: InputMaybe<Array<Scalars['String']>>;
  rulesURI_contains?: InputMaybe<Scalars['String']>;
  rulesURI_contains_nocase?: InputMaybe<Scalars['String']>;
  rulesURI_not_contains?: InputMaybe<Scalars['String']>;
  rulesURI_not_contains_nocase?: InputMaybe<Scalars['String']>;
  rulesURI_starts_with?: InputMaybe<Scalars['String']>;
  rulesURI_starts_with_nocase?: InputMaybe<Scalars['String']>;
  rulesURI_not_starts_with?: InputMaybe<Scalars['String']>;
  rulesURI_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  rulesURI_ends_with?: InputMaybe<Scalars['String']>;
  rulesURI_ends_with_nocase?: InputMaybe<Scalars['String']>;
  rulesURI_not_ends_with?: InputMaybe<Scalars['String']>;
  rulesURI_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
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
  | 'rulesURI'
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
  approval: InContextSdkMethod<Query['approval'], QueryapprovalArgs, MeshContext>,
  /** null **/
  approvals: InContextSdkMethod<Query['approvals'], QueryapprovalsArgs, MeshContext>,
  /** null **/
  approvalForAll: InContextSdkMethod<Query['approvalForAll'], QueryapprovalForAllArgs, MeshContext>,
  /** null **/
  approvalForAlls: InContextSdkMethod<Query['approvalForAlls'], QueryapprovalForAllsArgs, MeshContext>,
  /** null **/
  contractURIUpdated: InContextSdkMethod<Query['contractURIUpdated'], QuerycontractURIUpdatedArgs, MeshContext>,
  /** null **/
  contractURIUpdateds: InContextSdkMethod<Query['contractURIUpdateds'], QuerycontractURIUpdatedsArgs, MeshContext>,
  /** null **/
  initialized: InContextSdkMethod<Query['initialized'], QueryinitializedArgs, MeshContext>,
  /** null **/
  initializeds: InContextSdkMethod<Query['initializeds'], QueryinitializedsArgs, MeshContext>,
  /** null **/
  mint: InContextSdkMethod<Query['mint'], QuerymintArgs, MeshContext>,
  /** null **/
  mints: InContextSdkMethod<Query['mints'], QuerymintsArgs, MeshContext>,
  /** null **/
  dsponsorNFTOwnershipTransferred: InContextSdkMethod<Query['dsponsorNFTOwnershipTransferred'], QuerydsponsorNFTOwnershipTransferredArgs, MeshContext>,
  /** null **/
  dsponsorNFTOwnershipTransferreds: InContextSdkMethod<Query['dsponsorNFTOwnershipTransferreds'], QuerydsponsorNFTOwnershipTransferredsArgs, MeshContext>,
  /** null **/
  tokensAllowlist: InContextSdkMethod<Query['tokensAllowlist'], QuerytokensAllowlistArgs, MeshContext>,
  /** null **/
  tokensAllowlists: InContextSdkMethod<Query['tokensAllowlists'], QuerytokensAllowlistsArgs, MeshContext>,
  /** null **/
  tokensAllowlistUpdated: InContextSdkMethod<Query['tokensAllowlistUpdated'], QuerytokensAllowlistUpdatedArgs, MeshContext>,
  /** null **/
  tokensAllowlistUpdateds: InContextSdkMethod<Query['tokensAllowlistUpdateds'], QuerytokensAllowlistUpdatedsArgs, MeshContext>,
  /** null **/
  transfer: InContextSdkMethod<Query['transfer'], QuerytransferArgs, MeshContext>,
  /** null **/
  transfers: InContextSdkMethod<Query['transfers'], QuerytransfersArgs, MeshContext>,
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
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
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
  approval: InContextSdkMethod<Subscription['approval'], SubscriptionapprovalArgs, MeshContext>,
  /** null **/
  approvals: InContextSdkMethod<Subscription['approvals'], SubscriptionapprovalsArgs, MeshContext>,
  /** null **/
  approvalForAll: InContextSdkMethod<Subscription['approvalForAll'], SubscriptionapprovalForAllArgs, MeshContext>,
  /** null **/
  approvalForAlls: InContextSdkMethod<Subscription['approvalForAlls'], SubscriptionapprovalForAllsArgs, MeshContext>,
  /** null **/
  contractURIUpdated: InContextSdkMethod<Subscription['contractURIUpdated'], SubscriptioncontractURIUpdatedArgs, MeshContext>,
  /** null **/
  contractURIUpdateds: InContextSdkMethod<Subscription['contractURIUpdateds'], SubscriptioncontractURIUpdatedsArgs, MeshContext>,
  /** null **/
  initialized: InContextSdkMethod<Subscription['initialized'], SubscriptioninitializedArgs, MeshContext>,
  /** null **/
  initializeds: InContextSdkMethod<Subscription['initializeds'], SubscriptioninitializedsArgs, MeshContext>,
  /** null **/
  mint: InContextSdkMethod<Subscription['mint'], SubscriptionmintArgs, MeshContext>,
  /** null **/
  mints: InContextSdkMethod<Subscription['mints'], SubscriptionmintsArgs, MeshContext>,
  /** null **/
  dsponsorNFTOwnershipTransferred: InContextSdkMethod<Subscription['dsponsorNFTOwnershipTransferred'], SubscriptiondsponsorNFTOwnershipTransferredArgs, MeshContext>,
  /** null **/
  dsponsorNFTOwnershipTransferreds: InContextSdkMethod<Subscription['dsponsorNFTOwnershipTransferreds'], SubscriptiondsponsorNFTOwnershipTransferredsArgs, MeshContext>,
  /** null **/
  tokensAllowlist: InContextSdkMethod<Subscription['tokensAllowlist'], SubscriptiontokensAllowlistArgs, MeshContext>,
  /** null **/
  tokensAllowlists: InContextSdkMethod<Subscription['tokensAllowlists'], SubscriptiontokensAllowlistsArgs, MeshContext>,
  /** null **/
  tokensAllowlistUpdated: InContextSdkMethod<Subscription['tokensAllowlistUpdated'], SubscriptiontokensAllowlistUpdatedArgs, MeshContext>,
  /** null **/
  tokensAllowlistUpdateds: InContextSdkMethod<Subscription['tokensAllowlistUpdateds'], SubscriptiontokensAllowlistUpdatedsArgs, MeshContext>,
  /** null **/
  transfer: InContextSdkMethod<Subscription['transfer'], SubscriptiontransferArgs, MeshContext>,
  /** null **/
  transfers: InContextSdkMethod<Subscription['transfers'], SubscriptiontransfersArgs, MeshContext>,
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
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["mySubgraph"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
