import Offer from "@/components/layout/Offer";
import { GetServerSideProps } from "next";

export const getServerSideProps = (async (context) => {
  return {
    props: {
      params: context.params
    }
  };
}) satisfies GetServerSideProps<{}>;

export default function OfferPage({ params }) {
  return (
    <div className="">
      <div className="relative pb-16">
        <Offer chainId={params.chainId} offerId={params.offerId} />
      </div>
    </div>
  );
}
