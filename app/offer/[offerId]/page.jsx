import OfferPageContainer from "../../../containers/OfferPageContainer/OfferPageContainer";

export async function generateMetadata({
                                           params,
                                       }) {
    const offerId = params.offerId;
    return {
        title: `Offer ${offerId} || DSponsor | smarter monetization for your content`,
    }
}
export default async function OfferPage({params}) {
    const offerId = params.offerId;

    return <OfferPageContainer offerId={offerId} />
}
