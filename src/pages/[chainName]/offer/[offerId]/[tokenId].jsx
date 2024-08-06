import React from "react";

import TokenPageContainer from "@/@/containers/TokenPageContainer/TokenPageContainer";

// export async function generateMetadata({
//                                            params,
//                                        }) {
//     const offerId = params.offerId;
//     const tokenId = params.tokenId;

//     // We use headers as a way to get the chainID
//     const headersList = headers()
//     const chainID= headersList.get('chainID')

//     const lastOffersRequest = await fetchOfferToken({chainID,offerId,tokenId})
//     const offer = lastOffersRequest?.adOffers?.[0] || null

//     return {
//         title: `${offer?.metadata?.offer?.name} - Token ${tokenId} || DSponsor | The Web3 Monetization Solution`,
//         description: offer?.metadata?.offer?.description,
//         keywords: `DSponsor, offer, ${offer?.metadata?.offer?.name}, ${offer?.metadata?.offer?.description}`,
//     }
// }
export default function TokenPage() {
  // const offerId = params.offerId;
  // const tokenId = params.tokenId;

  // // We use headers as a way to get the chainID
  // const headersList = headers()
  // const chainID= headersList.get('chainID')

  // const lastOffersRequest = await fetchOfferToken({chainID,offerId,tokenId})
  // const offer = lastOffersRequest?.adOffers?.[0] || null

  // console.dir({offer},{depth:10})
  // const listingsRequest = await fetchMarketplaceListingForToken({chainID,tokenId, offer})
  // const listings = listingsRequest?.marketplaceListings || []
  // console.dir({listings},{depth:10})

  return (
    <div className="">
      <div className="relative pb-16 ">
        <TokenPageContainer />
      </div>
    </div>
  );
}
