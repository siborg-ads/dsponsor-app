import HomePageContainer from '../containers/HomePage/HomePageContainer';
import fetchLastOffers from "../providers/methods/fetchLastOffers";
import { useChainContext } from "../../contexts/hooks/useChainContext";
export async function getServerSideProps(context) {
    const { chainID } = useChainContext();
 

  const lastOffersRequest = await fetchLastOffers(chainID);
  const lastOffers = lastOffersRequest?.adOffers || [];

  return {
    props: {
      lastOffers,
    },
  };
}

export default function DefaultPage({ lastOffers }) {
  return <HomePageContainer lastOffers={lastOffers} />;
}
