import { gql, ApolloClient, InMemoryCache } from "@apollo/client";
import { marketplaceConfig } from "../marketplace.config";
import { fetchOffer, parseOfferMetadata } from "../marketplace-items-fetch";
import { readContract, getContract } from "thirdweb";
import { getERC20SymbolsAndDecimals, getWinningBid } from "./services";
import dSponsorNFTAbi from "../dsponsor-nft-abi.json";
import { client } from "../../../data/services/client.js";
import { defaultChainId } from "../marketplace.config";

const queryClient = new ApolloClient({
  uri: marketplaceConfig[defaultChainId].marketplace_offer_gql_endpoint,
  cache: new InMemoryCache(),
});

const fetchLatestListingIdOfItem = async (assetContract, tokenId, chainId) => {
  const GET_LATEST_LISTING_ID = gql`
    query ($tokenId: BigInt, $assetContract: Bytes) {
      listingAddeds(
        where: {
          listing_tokenId: $tokenId
          listing_assetContract: $assetContract
        }
        orderBy: blockTimestamp
        orderDirection: desc
      ) {
        listing_listingId
      }
    }
  `;

  try {
    const { data } = await queryClient.query({
      query: GET_LATEST_LISTING_ID,
      variables: {
        assetContract,
        tokenId,
      },
    });

    const listingId = data.listingAddeds[0].listing_listingId;

    const { tokenDatas, offerMetadatas } = await fetchOffer(
      [assetContract],
      [tokenId],
      chainId
    );

    const parsedOfferInformation = await parseOfferMetadata(
      offerMetadatas[0],
      tokenDatas[0]
    );

    return { listingId, offer: parsedOfferInformation };
  } catch (error) {
    console.log("Error fetching latest listing id:", error);
    return null;
  }
};

// for /marketplace
const fetchAllMpListings = async () => {
  const currentTimestamp = Math.floor(Date.now() / 1000);

  const GET_ALL_MP_LISTINGS_DATA = gql`
    query getAllMarketplaceListings {
      # totalListings = data.marketplaceListings.length
      marketplaceListings(
        orderBy: endTime
        orderDirection: asc
        where: {
          and: [
            {
              status: CREATED
              quantity_gt: 0
              # startTime_lte: ${currentTimestamp} 
              # endTime_gte: ${currentTimestamp} 
            }
          ]
        }
      ) {
        id # listingId
        # METADATA - if INVALID, ignore this listing
        # offerMetadata = adOffers[0].metadataURL
        # if tokenData?.length
        #    if offerMetadata.offer.token_metadata.name exists => replace all {tokenData} by tokenData value
        #    (same for offerMetadata.offer.token_metadata.description & offerMetadata.offer.token_metadata.image)
        # NAME = offerMetadata.offer.token_metadata.name || offerMetadata.offer.name || INVALID
        # DESCRIPTION = offerMetadata.offer.token_metadata.description || offerMetadata.offer.description || INVALID
        # IMAGE = offerMetadata.offer.token_metadata.image || offerMetadata.offer.image || INVALID
        token {
          tokenId
          nftContract {
            id # = assetContract
            adOffers {
              metadataURL # offerMetadata
            }
          }
          mint {
            tokenData
          }
        }

        # listingType = 0 <-> 'Direct', listingType = 1 <-> 'Auction'
        # 'Direct' or 'Auction'
        listingType

        currency # ERC20 smart contract addr
        # PRICE
        # if listingType = 'Direct'
        #    price = buyoutPricePerToken
        # else if listingType = 'Auction'
        #    price = bids[0].totalBidAmount || reservePricePerToken
        reservePricePerToken
        buyoutPricePerToken
        bids(orderBy: totalBidAmount, orderDirection: desc, first: 1) {
          bidder
          totalBidAmount
          status
        }

        lister

        startTime
        endTime

        # 'UNSET', 'CREATED', 'COMPLETED' or 'CANCELLED'
        status

        # will be useful later
        tokenType
        transferType
        rentalExpirationTimestamp
      }
    }
  `;

  try {
    const { data } = await queryClient.query({
      query: GET_ALL_MP_LISTINGS_DATA,
    });
    return data;
  } catch (error) {
    console.log("Error fetching all mp listings", error);
    return null;
  }
};

//TODO: rename to fetchFirstValidListing
const fetchAllMpListingsPerToken = async (assetContract, tokenId) => {
  const GET_ALL_LISTINGS_DATA = gql`
    query getMarketplaceListingsForToken ($assetContract: Bytes, $tokenId: BigInt) {
    
      marketplaceListings(    
        orderBy: id, orderDirection: desc
        where: {        
            # TO REPLACE BY idFilter
            #idFilter :  "${assetContract}-${tokenId}",
            token_ : { id: "${assetContract}-${tokenId}"}      
        }
      ) {
        
        id # listingId   
        
        # METADATA - if INVALID, ignore this listing
        # try to fetch metadataURL 
        # if tokenData?.length 
        #    if offerMetadata.offer.token_metadata.name exists => replace all {tokenData} by tokenData value  
        #    (same for offerMetadata.offer.token_metadata.description & offerMetadata.offer.token_metadata.image) 
        # NAME = offerMetadata.offer.token_metadata.name || offerMetadata.offer.name || INVALID
        # DESCRIPTION = offerMetadata.offer.token_metadata.description || offerMetadata.offer.description || INVALID
        # IMAGE = offerMetadata.offer.token_metadata.image || offerMetadata.offer.image || INVALID
        token {
          tokenId
          nftContract {
            id # = assetContract
            adOffers {
              metadataURL # offerMetadata
            }
            royaltyBps # bps -> 690 == 6.90 %
          }
          mint {
            tokenData
          }
        } 
        
        # listingType = 0 <-> 'Direct', listingType = 1 <-> 'Auction'
        # 'Direct' or 'Auction' 
        listingType
        
        currency # ERC20 smart contract addr
        
        # PRICE
        # if listingType = 'Direct' 
        #    price = buyoutPricePerToken
        # else if listingType = 'Auction'
        #    price = bids[0].totalBidAmount || reservePricePerToken
        reservePricePerToken
        buyoutPricePerToken    
        bids(orderBy: totalBidAmount, orderDirection: desc, first: 1) {
          bidder
          totalBidAmount
          status      
        }    
        
        lister
        
        startTime
        endTime
        
        
        # 'UNSET', 'CREATED', 'COMPLETED' or 'CANCELLED'
        status 
        
        # will be useful later 
        tokenType
        transferType
        rentalExpirationTimestamp   
        
       
     }
   }
  `;

  try {
    const { data } = await queryClient.query({
      query: GET_ALL_LISTINGS_DATA,
    });
    const listings = data.marketplaceListings;

    // no valid listing
    if (listings.length === 0) {
      return { error: "No listings available" };
    }

    //finding the first valid one
    // TODO : return the first VALID listing, not stop with a return
    for (const listing of listings) {
      if (isValidListing(listing)) {
        return listing;
      } else if (isNotValidListing(listing)) {
        return { error: "No valid listing available" };
      }
    }
  } catch (error) {
    console.log("Error fetching latest listing id:", error);
    return null;
  }
};

const parseListingValuesToObj = (listingResponse) => {
  // TODO: make this as a type
  const listing = {
    listingId: listingResponse[0],
    tokenOwner: listingResponse[1],
    assetContract: listingResponse[2],
    tokenId: listingResponse[3],
    startTime: listingResponse[4],
    endTime: listingResponse[5],
    quantity: listingResponse[6],
    currency: listingResponse[7],
    reservePricePerToken: listingResponse[8],
    buyoutPricePerToken: listingResponse[9],
    tokenType: listingResponse[10],
    transferType: listingResponse[11],
    rentalExpirationTimestamp: listingResponse[12],
    listingType: listingResponse[13],
  };

  return listing;
};

// TODO : get marketplaceSingle listing
const getMarketplaceSingleListing = async (contract, listingId) => {
  const listingResponse = await readContract({
    contract,
    method: "listings",
    params: [BigInt(listingId)],
  });
  return parseListingValuesToObj(listingResponse);
};

const getMarketplaceItemsSymbolsAndPrice = async (
  listing,
  contract,
  chainId
) => {
  const { listingId, tokenId, startTime, endTime, quantity, listingType } =
    listing;

  // checking if the end time is greater than time now and the quantity is greater than 0
  const now = Math.floor(Date.now() / 1000);

  if (
    Number(endTime) > now &&
    Number(quantity) > 0 &&
    (listingType === 1 || listingType === 0)
  ) {
    const currencyCodeOfListing = listing.currency;
    const { decimals, symbol } = await getERC20SymbolsAndDecimals(
      listing.currency,
      chainId
    );
    const reservePricePerToken =
      Number(listing.reservePricePerToken) / 10 ** decimals;
    // if the listing type is bid, get the winning bid and compare it with the reserve price
    if (listingType === 1) {
      const winningBidResponse = await getWinningBid(contract, listingId);
      const winningBidPricePerToken =
        Number(winningBidResponse.pricePerToken) / 10 ** decimals;
      const price = Math.max(winningBidPricePerToken, reservePricePerToken);
      const salePrice = BigInt(price * 10 ** decimals);
      return {
        ...listing,
        symbol,
        price,
        salePrice,
        decimals,
      };

      // if the listing type is buy now, get the buyout price
    } else if (listingType === 0) {
      const buyoutPricePerToken =
        Number(listing.buyoutPricePerToken) / 10 ** decimals;
      const salePrice = listing.buyoutPricePerToken;
      return {
        ...listing,
        symbol,
        price: buyoutPricePerToken,
        salePrice,
        decimals,
      };
    }
  }
};

const getRoyaltyInfo = async (listing, chainId, contractAddress) => {
  const dSponsorRoyaltyContract = getContract({
    client,
    chain: marketplaceConfig[chainId].chain,
    address: contractAddress,
    abi: dSponsorNFTAbi,
  });

  const royaltyInfoResponse = await readContract({
    contract: dSponsorRoyaltyContract,
    method: "royaltyInfo",
    params: [BigInt(listing.tokenId), listing.salePrice],
  });

  const royaltyAmount = royaltyInfoResponse[1];
  const royaltyAmountDecimal = Number(royaltyAmount) / 10 ** listing.decimals;

  const royaltyInfo = {
    royaltyAmount,
    royaltyAmountDecimal,
    royaltyRecipient: royaltyInfoResponse[0],
  };
  return royaltyInfo;
};

// TODO: redo this
const isValidListing = (listing) => {
  return (
    listing.token &&
    listing.token.nftContract &&
    listing.token.nftContract.adOffers &&
    listing.token.nftContract.adOffers.length > 0
  );
};

const isNotValidListing = (listing) => {
  return (
    listing.status === "CANCELLED" &&
    listing.status === "UNSET" &&
    !listing.token
  );
};

export {
  fetchLatestListingIdOfItem,
  getRoyaltyInfo,
  parseListingValuesToObj,
  getMarketplaceSingleListing,
  getMarketplaceItemsSymbolsAndPrice,
  fetchAllMpListingsPerToken,
  fetchAllMpListings,
};
