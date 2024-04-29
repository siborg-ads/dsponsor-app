import { readContract, getContract, sendTransaction } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { client } from "../../data/services/client";
import { erc20Contract } from "./marketplace.config.js";

async function fetchTotalListings(contract) {
  try {
    const totalListings = await readContract({
      contract: contract,
      method: "totalListings",
    });
    return totalListings;
  } catch (error) {
    return null;
  }
}

// /Marketplace --> Function to fetch listings for "Hot bids" and "Buy now"
// async function fetchListingsForMarketplace(
//   contract,
//   totalListings,
//   allMpListings,
//   chainId
// ) {
//   const listingsForBids = [];
//   const listingsForBuyNow = [];

//   while (true) {
//     const randomIndexBoundary = Number(totalListings) - 1;
//     const randomIndex = Math.floor(Math.random() * randomIndexBoundary);

//     // const listingResponse = await readContract({
//     //   contract,
//     //   method: "listings",
//     //   params: [BigInt(randomIndex)],
//     // });

//     const randomListing = allMpListings.marketplaceListings[randomIndex];

//     // const listing = {
//     //   listingId: listingResponse[0],
//     //   tokenOwner: listingResponse[1],
//     //   assetContract: listingResponse[2],
//     //   tokenId: listingResponse[3],
//     //   startTime: listingResponse[4],
//     //   endTime: listingResponse[5],
//     //   quantity: listingResponse[6],
//     //   currency: listingResponse[7],
//     //   reservePricePerToken: listingResponse[8],
//     //   buyoutPricePerToken: listingResponse[9],
//     //   tokenType: listingResponse[10],
//     //   transferType: listingResponse[11],
//     //   rentalExpirationTimestamp: listingResponse[12],
//     //   listingType: listingResponse[13],
//     // };

//     // checking if the listing is active
//     const now = Math.floor(Date.now() / 1000);

//     if (
//       Number(randomListing.endTime) > now &&
//       (randomListing.listingType === "Auction" ||
//         randomListing.listingType === "Direct")
//     ) {
//       const currencyAddress = randomListing.currency;
//       const { decimals, symbol } = await getERC20SymbolsAndDecimals(
//         currencyAddress,
//         chainId
//       );

//       const reservePricePerToken =
//         Number(randomListing.reservePricePerToken) / 10 ** decimals;
//       // if the listing type is bid, get the winning bid and compare it with the reserve price
//       if (randomListing.listingType === "Auction") {
//         let winningBidPricePerToken = 0;
//         if (randomListing.bids.length > 0) {
//           winningBidPricePerToken = randomListing.bids[0].totalBidAmount;
//         }

//         const isListingAlreadyAdded = listingsForBids.some(
//           (item) => item.id === randomListing.id
//         );
//         if (isListingAlreadyAdded) continue;

//         if (listingsForBids.length < 3)
//           listingsForBids.push({
//             ...randomListing,
//             symbol,
//             price: Math.max(winningBidPricePerToken, reservePricePerToken),
//           });
//       }

//       // if the listing type is buy now, get the buyout price
//       else if (randomListing.listingType === "Direct") {
//         const buyoutPricePerToken =
//           Number(randomListing.buyoutPricePerToken) / 10 ** decimals;

//         // // check and skip if the listing is already added
//         const isListingAlreadyAdded = listingsForBuyNow.some(
//           (item) => item.id === randomListing.id
//         );
//         if (isListingAlreadyAdded) continue;

//         if (listingsForBuyNow.length < 3)
//           listingsForBuyNow.push({
//             ...randomListing,
//             symbol,
//             price: buyoutPricePerToken,
//           });
//       }
//     }
//     if (listingsForBids.length === 3 && listingsForBuyNow.length === 3) break;
//   }

//   // Shuffle the arrays
//   shuffleArray(listingsForBids);
//   shuffleArray(listingsForBuyNow);

//   // Select only the first 3 elements
//   listingsForBids.splice(3);
//   listingsForBuyNow.splice(3);

//   return { listingsForBids, listingsForBuyNow };
// }

async function fetchRandomListingsForMarketplace(allMpListings, chainId) {
  const listingsForBids = [];
  const listingsForBuyNow = [];

  const activeListings = allMpListings.marketplaceListings.filter(
    (listing) =>
      Number(listing.endTime) > Math.floor(Date.now() / 1000) &&
      (listing.listingType === "Auction" || listing.listingType === "Direct")
  );

  shuffleArray(activeListings);

  for (const listing of activeListings) {
    const currencyAddress = listing.currency;
    const { decimals, symbol } = await getERC20SymbolsAndDecimals(
      currencyAddress,
      chainId
    );

    const reservePricePerToken =
      Number(listing.reservePricePerToken) / 10 ** decimals;

    if (listing.listingType === "Auction" && listingsForBids.length < 3) {
      let winningBidPricePerToken = 0;
      if (listing.bids.length > 0) {
        winningBidPricePerToken = listing.bids[0].totalBidAmount;
      }
      listingsForBids.push({
        ...listing,
        symbol,
        price: Math.max(winningBidPricePerToken, reservePricePerToken),
      });
    } else if (
      listing.listingType === "Direct" &&
      listingsForBuyNow.length < 3
    ) {
      const buyoutPricePerToken =
        Number(listing.buyoutPricePerToken) / 10 ** decimals;
      listingsForBuyNow.push({
        ...listing,
        symbol,
        price: buyoutPricePerToken,
      });
    }
    if (listingsForBids.length === 3 && listingsForBuyNow.length === 3) {
      break;
    }
  }

  return { listingsForBids, listingsForBuyNow };
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const getERC20SymbolsAndDecimals = async (currencyContractAddress, chainId) => {
  const erc20ContractAdd = erc20Contract(chainId, currencyContractAddress);

  const decimalsResponse = await readContract({
    contract: erc20ContractAdd,
    method: "decimals",
  });

  const symbolResponse = await readContract({
    contract: erc20ContractAdd,
    method: "symbol",
  });

  return { symbol: symbolResponse, decimals: decimalsResponse };
};

export { fetchTotalListings, fetchRandomListingsForMarketplace };
