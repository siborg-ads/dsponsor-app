import { readContract, getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { erc20ContractAbi } from "./erc20-contract-abi.js"
import { client } from "../../data/services/client";



async function fetchTotalListings(contract) {
  console.log(contract, "Contract Information...");
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
async function fetchListingsForMarketplace(contract, totalListings) {
  const listingFetched = [];
  const listingsForBids = [];
  const listingsForBuyNow = [];

  for (let i = 0; i < Number(totalListings); i++) {
    console.log(i, "Index...")
    if (listingsForBids.length === 4 && listingsForBuyNow.length === 4) {
      break;
    }
    const listingResponse = await readContract({
      contract,
      method: "listings",
      params: [BigInt(i)],
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
      const { decimals, symbol } = await getERC20SymbolsAndDecimals("0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8")

      const reservePricePerToken = Number(listing.reservePricePerToken) / (10 ** decimals);

      console.log(listingType, "Listing Type...")
      if (listingType === 1) {
        const winningBidResponse = await getWinningBid(contract, listingId);
        const winningBidPricePerToken = Number(winningBidResponse.pricePerToken) / (10 ** decimals);
        if (listingsForBids.length !== 4)
          listingsForBids.push({
            ...listing,
            symbol,
            price: Math.max(winningBidPricePerToken, reservePricePerToken),
          });
      } else if (listingType === 0) {
        const buyoutPricePerToken = Number(listing.buyoutPricePerToken) / (10 ** decimals);
        if (listingsForBuyNow.length !== 4)
          listingsForBuyNow.push({ ...listing, symbol, price: buyoutPricePerToken });
      }
    }
  }

  return { listingsForBids, listingsForBuyNow };
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
const getERC20SymbolsAndDecimals = async (contractAddress) => {
  const contract = getContract({
    client,
    chain: sepolia,
    address: contractAddress,
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


export { fetchTotalListings, fetchListingsForMarketplace }