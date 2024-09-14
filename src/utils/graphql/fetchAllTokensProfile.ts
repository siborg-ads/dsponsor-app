import config from "@/config/config";
import { Address } from "@thirdweb-dev/sdk";
import { executeQuery } from "@/utils/graphql/helper/executeQuery";

interface AdParameter {
  adParameter: {
    id: string;
    base: string;
    variants: string[];
  };
}

interface Royalty {
  bps: string;
  receiver: string;
}

interface PriceStructure {
  creatorAmount: string;
  protocolFeeAmount: string;
  totalAmount: string;
}

interface PriceStructureFormatted {
  creatorAmount: string;
  protocolFeeAmount: string;
  totalAmount: string;
}

interface Price {
  currency: string;
  amount: string;
  currencySymbol: string;
  currencyDecimals: string;
  currencyPriceUSDC: string;
  currencyPriceUSDCFormatted: string;
  minterAddress: string;
  protocolFeeBps: string;
  mintPriceStructure: PriceStructure;
  mintPriceStructureFormatted: PriceStructureFormatted;
  mintPriceStructureUsdcFormatted: PriceStructureFormatted;
}

interface MarketplaceListing {
  id: string;
  quantity: string;
  listingType: string;
  startTime: string;
  endTime: string;
  currency: string;
  buyoutPricePerToken: string;
  reservePricePerToken: string;
  status: string;
  bids: any[];
  currencySymbol: string;
  currencyDecimals: string;
  currencyPriceUSDC: string;
  currencyPriceUSDCFormatted: string;
  marketplaceAddress: string;
  protocolFeeBps: string;
  minimalBidBps: string;
  previousBidAmountBps: string;
  bidPriceStructure: any;
  bidPriceStructureFormatted: any;
  bidPriceStructureUsdcFormatted: any;
  buyPriceStructure: any;
  buyPriceStructureFormatted: any;
  buyPriceStructureUsdcFormatted: any;
}

interface Token {
  tokenId: string;
  setInAllowList: boolean;
  marketplaceListings: MarketplaceListing[];
  nftContract: {
    id: string;
    allowList: boolean;
    maxSupply: string;
    royalty: Royalty;
    prices: Price[];
  };
  mint: {
    tokenData: string;
    blockTimestamp: string;
  };
  prices: any[];
  metadata: any;
}

interface NftContract {
  id: string;
  allowList: boolean;
  maxSupply: string;
  royalty: Royalty;
  prices: Price[];
  tokens: Token[];
}

interface Metadata {
  creator: {
    name: string;
    description: string;
    image: string;
    external_link: string;
    categories: string[];
  };
  offer: {
    name: string;
    description: string;
    image: string;
    terms: string;
    external_link: string;
    valid_from: string;
    valid_to: string;
    categories: string[];
    token_metadata: any;
  };
}

interface ResponseType {
  id: string;
  disable: boolean;
  metadataURL: string;
  name: string;
  initialCreator: string;
  validators: any;
  admins: string[];
  creationTimestamp: string;
  adParameters: AdParameter[];
  nftContract: NftContract;
  metadata: Metadata;
}

/**
 * Fetches all tokens owned by a specific user address for a given blockchain chain ID.
 *
 * @param {string} ownerAddress - The address of the user whose tokens are to be fetched.
 * @param {string} chainId - The ID of the blockchain chain to fetch tokens from.
 * @returns {Promise<Array>} - A promise that resolves to an array of tokens owned by the user, with additional chain configuration.
 */
export const fetchAllTokensProfile = async (ownerAddress: Address, chainId: number) => {
  const relayerURL = config[chainId].relayerURL;

  const path = new URL(`${relayerURL}/api/${chainId}/graph`);

  const GET_DATA = `
    query OwnedTokens($ownerAddress: Bytes!) {
      adOffers(
        first: 1000
      ) {
        id
        disable
        metadataURL        
        name
        initialCreator
        validators
        admins
        creationTimestamp # data (unix time)
        adParameters(where: { enable: true }) {
          enable
          adParameter {
            id # adParameter value, ex: imageURL-320x50 or linkURL
            base # ex: imageURL or linkURL
            variants # ex: ["320x50"]
          }
        }
        nftContract {
          id # DSponsorNFT smart contract address
          allowList
          maxSupply
          royalty {
            bps
            receiver
          }
          prices {
            currency # ERC20 smart contract
            amount # wei, mind decimals() function to transform in human readable value !
            enabled
          }
          tokens(
            where: { owner: $ownerAddress }
            first: 1000            
          ) {
            tokenId            
            setInAllowList
            marketplaceListings(
              first: 1000
              orderBy: lastUpdateTimestamp
              orderDirection: desc
              where: { status: CREATED }
           ) {
              id # listingId
              lister
              quantity
              listingType
              startTime
              endTime
              currency
              buyoutPricePerToken
              reservePricePerToken
              status
              bids(orderBy: totalBidAmount, orderDirection: desc, first: 1) {                  
                  amountSentToCreator
                  creatorRecipient
                  amountSentToProtocol
                  amountSentToSeller
                  sellerRecipient
                  ####
                  creationTxHash
                  creationTimestamp
                  bidder
                  totalBidAmount # current bid / new price per token * quantity
                  paidBidAmount # how much bidder paid
                  refundBonus
                  refundAmount # refund (outbid case)
                  refundProfit # how much bidder gains from refund
                  currency
                  status
              }
            }
            nftContract {
              id
              allowList
              maxSupply
              royalty {
                bps
                receiver
              }
              prices {
                currency
                amount
                enabled
              }            
            }
            mint {
              tokenData
              blockTimestamp
              totalPaid
              currency
            }       
            currentProposals {
              adOffer {
                id
              }
              adParameter {
                id
                base
                variants
              }
              acceptedProposal {
                id
                status
                data
                creationTimestamp
              }
              pendingProposal {
                id
                status
                data
                creationTimestamp
              }
              rejectedProposal {
                id
                status
                data
                rejectReason
                creationTimestamp
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    ownerAddress
  };
  const options = {
    populate: true,
    next: { tags: [`${chainId}-userAddress-${ownerAddress}`] }
  };
  const response = await executeQuery(path.href, GET_DATA, variables, options);

  const data = response.adOffers as ResponseType[];

  const resultMappedData = data
    ?.filter((item) => {
      return item.nftContract.tokens.length > 0;
    })
    .map((item) => {
      const combinedData = {
        ...item,
        chainConfig: config[chainId]
      };
      return combinedData;
    });

  return resultMappedData;
};
