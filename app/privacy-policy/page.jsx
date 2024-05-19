import PrivacyPolicyContainer from "../../containers/PrivacyPolicy/PrivacyPolicyContainer";
import TermsAndConditionsContainer from "../../containers/TermsAndConditions/TermsAndConditionsContainer";

const metadata = {
    title: "Privacy Policy || DSponsor | smarter monetization for your content",
    description: "DSponsor is a platform that connects content creators with sponsors. Our platform helps creators monetize their content and helps sponsors find creators to promote their products.",
};
export default async function PrivacyPolicyPage() {

    return (
        <div className="pt-[5.5rem] lg:pt-24">
            <div className="dark:bg-jacarta-800 relative py-16 md:py-24">
                <PrivacyPolicyContainer/>
            </div>
        </div>
    )
}
