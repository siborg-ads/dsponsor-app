import { readContract, getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { erc20ContractAbi } from "../erc20-contract-abi.js"
import { client } from "../../../data/services/client.js";
import { marketplaceConfig } from "../marketplace.config.js"



async function fetchTotalListings(contract) {
  try {
    const totalListings = await readContract({
      contract: contract,
      method: "totalListings",
    });
    return totalListings;

  } catch (error) {
    return null
  }
}


// Function to fetch listings for "Hot bids" and "Buy now"
async function fetchListingsForMarketplace(contract, totalListings, chainId) {
  const listingFetched = [];
  const listingsForBids = [];
  const listingsForBuyNow = [];


  while (true) {
    const randomIndexBoundary = Number(totalListings) - 1;

    // pick a number between 0 and totalListings
    const randomIndex = Math.floor(Math.random() * randomIndexBoundary);

    const listingResponse = await readContract({
      contract,
      method: "listings",
      params: [BigInt(randomIndex)],
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
    // checking if the listing is active
    const now = Math.floor(Date.now() / 1000);
    const {
      listingId,
      tokenId,
      startTime,
      endTime,
      quantity,
      listingType,
    } = listing;
    // checking if the end time is greater than time now and the quantity is greater than 0
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

        // check and skip if the listing is already added
        const isListingAlreadyAdded = listingsForBids.some((item) => item.listingId === listingId);
        if (isListingAlreadyAdded) continue;

        if (listingsForBids.length < 3)
          listingsForBids.push({
            ...listing,
            symbol,
            price: Math.max(winningBidPricePerToken, reservePricePerToken),
          });
      }

      // if the listing type is buy now, get the buyout price
      else if (listingType === 0) {
        const buyoutPricePerToken = Number(listing.buyoutPricePerToken) / (10 ** decimals);

        // check and skip if the listing is already added
        const isListingAlreadyAdded = listingsForBuyNow.some((item) => item.listingId === listingId);
        if (isListingAlreadyAdded) continue;

        if (listingsForBuyNow.length < 3)
          listingsForBuyNow.push({ ...listing, symbol, price: buyoutPricePerToken });
      }
    }
    if (listingsForBids.length === 3 && listingsForBuyNow.length === 3) break;
  }


  // Shuffle the arrays
  shuffleArray(listingsForBids);
  shuffleArray(listingsForBuyNow);

  // Select only the first 3 elements
  listingsForBids.splice(3);
  listingsForBuyNow.splice(3);

  return { listingsForBids, listingsForBuyNow };
}

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


// getting the winning bid of a listing
async function getWinningBid(contract, listingId) {
  const winningBidResponse = await readContract({
    contract,
    method: "winningBid",
    params: [listingId],
  });


  const winningBidObject = {
    listingId: winningBidResponse[0],
    bidder: winningBidResponse[1],
    pricePerToken: winningBidResponse[2],
    referralAdditionalInformation: winningBidResponse[3]
  };


  return winningBidObject
}



// Testnet ERC 20 Token Contract Address
const getERC20SymbolsAndDecimals = async (currencyContractAddress, chainId) => {

  const contract = getContract({
    client,
    chain: marketplaceConfig[chainId].chain,
    address: currencyContractAddress,
    abi: erc20ContractAbi,
  });


  const decimalsResponse = await readContract({
    contract,
    method: "decimals",
  });

  const symbolResponse = await readContract({
    contract,
    method: "symbol",
  });


  return { symbol: symbolResponse, decimals: decimalsResponse }

}


export { fetchTotalListings, fetchListingsForMarketplace, getERC20SymbolsAndDecimals, getWinningBid }