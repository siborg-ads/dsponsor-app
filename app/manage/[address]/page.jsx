import ManageSpaceContainer from "../../../containers/manage/ManageSpaceContainer";

export async function generateMetadata({params, searchParams}, parent) {
    const {address} = params;
    return {
        title: "DSponsor | Manage your ad spaces - " + address,
        keyword: "audience engagement, web3, creator economic, NFT, creator monetization, creator economy, creator token, creator coin, creator tokenization, creator economy",
        description: "Manage your ad spaces on DSponsor."
    };
}
export default async function ManagePage({params}) {
    const {address} = params;
    return <ManageSpaceContainer address={address}/>
}
