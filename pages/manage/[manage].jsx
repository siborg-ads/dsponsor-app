import ManageSpaceContainer from "../../containers/manage/ManageSpaceContainer";

export async function generateMetadata({ params }) {
  const { manage } = params;
  return {
    title: "DSponsor | Manage your ad spaces - " + manage,
    keyword: "audience engagement, web3, creator economic, NFT, creator monetization, creator economy, creator token, creator coin, creator tokenization, creator economy",
    description: "Manage your ad spaces on DSponsor.",
  };
}

export async function getServerSideProps(context) {
  const { params } = context;

  if (!params || !params.manage) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      params,
    },
  };
}

export default function ManagePage({ params }) {
  const { manage } = params;


  return <ManageSpaceContainer userAddress={manage} />;
}
