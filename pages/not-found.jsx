import Error404Container from "../containers/Error404Page/Error404Container";
import PrivacyPolicyContainer from "../containers/PrivacyPolicy/PrivacyPolicyContainer";

function NotFoundPage() {
    return (
        <div className="pt-[5.5rem] lg:pt-24">
            <div className="dark:bg-jacarta-800 relative py-16 md:py-24">
                <Error404Container />
            </div>
        </div>
    )
}

export default NotFoundPage
