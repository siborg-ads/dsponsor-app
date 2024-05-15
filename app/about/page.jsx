import AboutSectionContainer from "../../containers/AboutPage/AboutSectionContainer";

const metadata = {
    title: "About Us || DSponsor | smarter monetization for your content",
    description: "DSponsor is a platform that connects content creators with sponsors. Our platform helps creators monetize their content and helps sponsors find creators to promote their products.",
    keyword: "audience engagement, web3 monetization, web3, creator economic, NFT, creator monetization, creator economy, creator token, creator coin, creator tokenization, creator economy",
};
export default async function AboutPage() {
    return (
        <div className="pt-[5.5rem] lg:pt-24">
            <div className="dark:bg-jacarta-800 relative py-16 md:py-24">
                <AboutSectionContainer />
            </div>
        </div>
    )
}
