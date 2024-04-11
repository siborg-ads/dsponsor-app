import { readContract } from "thirdweb";

async function fetchTotalListings(contract) {
  console.log(contract, "Contract Information...");
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

// Function to fetch listings details
async function fetchListingDetails(contract, id) {
  const listingDetails = await readContract({
    contract,
    method: "listings",
    params: [BigInt(id)],
  });

  const listing = {
    listingId: listingDetails[0],
    tokenOwner: listingDetails[1],
    assetContract: listingDetails[2],
    tokenId: listingDetails[3],
    startTime: listingDetails[4],
    endTime: listingDetails[5],
    quantity: listingDetails[6],
    currency: listingDetails[7],
    reservePricePerToken: listingDetails[8],
    buyoutPricePerToken: listingDetails[9],
    tokenType: listingDetails[10],
    transferType: listingDetails[11],
    rentalExpirationTimestamp: listingDetails[12],
    listingType: listingDetails[13],
  };

  // checking if the listing is active
  const now = Math.floor(Date.now() / 1000);
  if (Number(listing.endTime) > now && Number(listing.quantity) > 0) {
    return listing;
  } else {
    return null;
  }
}

// Function to fetch listings for "Hot bids" and "Buy now"
async function fetchListingsForMarketplace(contract, totalListings) {
  const listingFetched = [];
  const listingsForBids = [];
  const listingsForBuyNow = [];

  for (let i = 0; i < Number(totalListings); i++) {

    // TO-DO : to delete all commented code after confirmatino w/ Juhan
    // const listingResponse = await readContract({
    //   contract,
    //   method: "listings",
    //   params: [BigInt(i)],
    // });

    // const listing = {
    //   listingId: listingResponse[0],
    //   tokenOwner: listingResponse[1],
    //   assetContract: listingResponse[2],
    //   tokenId: listingResponse[3],
    //   startTime: listingResponse[4],
    //   endTime: listingResponse[5],
    //   quantity: listingResponse[6],
    //   currency: listingResponse[7],
    //   reservePricePerToken: listingResponse[8],
    //   buyoutPricePerToken: listingResponse[9],
    //   tokenType: listingResponse[10],
    //   transferType: listingResponse[11],
    //   rentalExpirationTimestamp: listingResponse[12],
    //   listingType: listingResponse[13],
    // };

    // // checking if the listing is active
    // const now = Math.floor(Date.now() / 1000);

    // const {
    //   listingId,
    //   tokenId,
    //   startTime,
    //   endTime,
    //   quantity,
    //   listingType,
    // } = listing;

    // checking if the end time is greater than time now and the quantity is greater than 0

    const listing = await fetchListingDetails(contract, i);

    if (
      Number(listing.endTime) > now &&
      Number(listing.quantity) > 0 &&
      (listing.listingType === 1 || listingType === 0)
    ) {
      if (listing.listingType === 1) {
        listingsForBids.push(listing);
      } else if (listingType === 0) {
        listingsForBuyNow.push(listing);
      }
    }

    return { listingsForBids, listingsForBuyNow };
  }
}

export { fetchTotalListings, fetchListingsForMarketplace, fetchListingDetails };
