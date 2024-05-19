import HomePageContainer from '../containers/HomePage/HomePageContainer';
import {headers} from "next/headers";
import fetchLastOffers from "../providers/methods/fetchLastOffers";
export default async function DefaultPage() {
    // We use headers as a way to get the chainID
    const headersList = headers()
    const chainID= headersList.get('chainID')

    const lastOffersRequest = await fetchLastOffers(chainID);
    const lastOffers = lastOffersRequest?.adOffers || []

    return <HomePageContainer lastOffers={lastOffers} />
}
