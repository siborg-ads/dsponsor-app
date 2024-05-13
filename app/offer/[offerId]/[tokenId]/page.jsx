import TokenPageContainer from "../../../../containers/TokenPageContainer/TokenPageContainer";
import {gql} from "@apollo/client";
import {GetAdOffer, GetTokenAdOffer} from "../../../../data/services/TokenOffersService";

export async function generateMetadata({
                                           params,
                                       }) {
    const offerId = params.offerId;
    const tokenId = params.tokenId;
    // const data = await GetTokenAdOffer(offerId,tokenId);
    return {
        title: `Token ${tokenId} || DSponsor | smarter monetization for your content`,
    }
}
export default async function TokenPage({params}) {
    const offerId = params.offerId;
    const tokenId = params.tokenId;

    return <TokenPageContainer offerId={offerId} tokenId={tokenId} />
}
