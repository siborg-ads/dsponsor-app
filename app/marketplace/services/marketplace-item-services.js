import { useQuery, gql, ApolloClient, InMemoryCache } from "@apollo/client";
import { marketplaceConfig } from "../marketplace.config";
import { fetchOffer, parseOfferMetadata } from "../marketplace-items-fetch";
import { readContract, getContract } from "thirdweb";
import { getERC20SymbolsAndDecimals, getWinningBid } from "./services";
import dSponsorNFTAbi from "../dsponsor-nft-abi.json";
import { client } from "../../../data/services/client.js";





const fetchLatestListingIdOfItem = async (assetContract, tokenId, chainId, marketplaceContract) => {

  const client = new ApolloClient({
    uri: marketplaceConfig[chainId].marketplace_offer_gql_endpoint,
    cache: new InMemoryCache(),
  });

  const GET_LATEST_LISTING_ID = gql`
  query 
    ($tokenId: BigInt, $assetContract: Bytes){
        listingAddeds(    
        where: { listing_tokenId: $tokenId, listing_assetContract: $assetContract }
        orderBy: blockTimestamp
        orderDirection: desc
      ){
    listing_listingId
  }
}`;


  // execute graph ql query
  try {
    const { data, loading, error } = await client.query({
      query: GET_LATEST_LISTING_ID,
      variables: {
        assetContract,
        tokenId
      }
    });

    const listingId = data.listingAddeds[0].listing_listingId;

    const { tokenDatas, offerMetadatas } = await fetchOffer([assetContract], [tokenId], chainId);

    const parsedOfferInformation = await parseOfferMetadata(
      offerMetadatas[0],
      tokenDatas[0]
    );

    return { listingId, offer: parsedOfferInformation };

  } catch (error) {
    console.log("Error fetching latest listing id:", error);
    return null
  }
}


const parseListingValuesToObj = (listingResponse) => {
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
}

// get marketplaceSingle listing
const getMarketplaceSingleListing = async (contract, listingId) => {
  console.log("contract", contract)
  const listingResponse = await readContract({
    contract,
    method: "listings",
    params: [BigInt(listingId)],
  });
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
}

const getMarketplaceItemsSymbolsAndPrice = async (listing, contract, chainId) => {
  const {
    listingId,
    tokenId,
    startTime,
    endTime,
    quantity,
    listingType,
  } = listing;

  // checking if the end time is greater than time now and the quantity is greater than 0
  const now = Math.floor(Date.now() / 1000);

  if (
    Number(endTime) > now &&
    Number(quantity) > 0 &&
    (listingType === 1 || listingType === 0)
  ) {
    const currencyCodeOfListing = listing.currency;
    const { decimals, symbol } = await getERC20SymbolsAndDecimals(listing.currency, chainId)
    const reservePricePerToken = Number(listing.reservePricePerToken) / (10 ** decimals);
    // if the listing type is bid, get the winning bid and compare it with the reserve price
    if (listingType === 1) {
      const winningBidResponse = await getWinningBid(contract, listingId);
      const winningBidPricePerToken = Number(winningBidResponse.pricePerToken) / (10 ** decimals);
      const price = Math.max(winningBidPricePerToken, reservePricePerToken);
      const salePrice = BigInt(price * (10 ** decimals));

      console.log("salePrice", salePrice)
      return {
        ...listing,
        symbol,
        price,
        salePrice,
        decimals
      }

      // if the listing type is buy now, get the buyout price
    } else if (listingType === 0) {
      const buyoutPricePerToken = Number(listing.buyoutPricePerToken) / (10 ** decimals);
      const salePrice = listing.buyoutPricePerToken;

      console.log("salePrice", salePrice)

      return {
        ...listing,
        symbol,
        price: buyoutPricePerToken,
        salePrice,
        decimals
      }

    }

  }
}





const getRoyaltyInfo = async (listing, chainId, contractAddress) => {

  console.log(listing)

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
  const royaltyAmountDecimal = Number(royaltyAmount) / (10 ** listing.decimals);


  const royaltyInfo = {
    royaltyAmount,
    royaltyAmountDecimal,
    royaltyRecipient: royaltyInfoResponse[0],
  }

  return royaltyInfo;
}





export { fetchLatestListingIdOfItem, getRoyaltyInfo, parseListingValuesToObj, getMarketplaceSingleListing, getMarketplaceItemsSymbolsAndPrice };