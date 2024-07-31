import OfferPageContainer from "../../../containers/OfferPageContainer/OfferPageContainer";

// export async function generateMetadata({
//                                            params,
//                                        }) {
//     const offerId = params.offerId;
//     const chainName = params.chainName;

//     // We use headers as a way to get the chainID
//     const headersList = headers()
//     const chainID= headersList.get('chainID')

//     const offerRequest = await fetchOffer({chainID,offerId})
//     const offer = offerRequest?.adOffers?.[0] || null

//     return {
//         title: `${offer?.metadata?.offer?.name} || DSponsor | The Web3 Monetization Solution`,
//         description: offer?.metadata?.offer?.description,
//         keywords: `DSponsor, offer, ${offer?.metadata?.offer?.name}, ${offer?.metadata?.offer?.description}`,
//     }
// }
export default function OfferPage() {
  // const offerId = params.offerId;

  // // We use headers as a way to get the chainID
  // const headersList = headers()
  // const chainID= headersList.get('chainID')

  // const offerRequest = await fetchOffer({chainID,offerId})
  // const offer = offerRequest?.adOffers?.[0] || null

  return (
    <div className="">
      <div className="relative pb-16">
        <OfferPageContainer />
      </div>
    </div>
  );
}
