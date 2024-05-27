import MarketplaceContainer from "../../containers/MarketplaceContainer/MarketplaceContainer";
import TokenPageContainer from "../../containers/TokenPageContainer/TokenPageContainer";

const metadata = {
    title: "Marketplace || DSponsor | smarter monetization for your content",
    description: "DSponsor is a platform that connects content creators with sponsors. Our platform helps creators monetize their content and helps sponsors find creators to promote their products.",
    keywords: "DSponsor, marketplace, token, creator, sponsor, monetize, content, creator, sponsor, monetize, content",
};
export default async function MarketplacePage() {
    return (
        <div className="pt-[5.5rem] lg:pt-24">
            <div className="dark:bg-jacarta-800 relative py-16 md:py-24">
                <MarketplaceContainer />
            </div>
        </div>
    )
}
