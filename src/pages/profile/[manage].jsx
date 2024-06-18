import ManageSpaceContainer from "../../containers/profile/ManageSpaceContainer";

export async function generateMetadata({ params }) {
  const { manage } = params;
  return {
    title: "SiBorg Ads | Manage your ad spaces - " + manage,
    keyword:
      "audience engagement, web3, creator economic, NFT, creator monetization, creator economy, creator token, creator coin, creator tokenization, creator economy",
    description: "Manage your ad spaces on SiBorg Ads."
  };
}

export default function ManagePage() {
  return <ManageSpaceContainer />;
}
