import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/images/logo.png";
import WhiteLogo from "../../public/images/logo_white.png";

export default function LogoContainer() {
    return (
        <Link className="shrink-0" href="/">
            <div className="dark flex justify-center items-center font-semibold">
                <Image src={Logo} height={80} width={80} alt="DSponsor | smarter monetization for your content" className=" h-auto " />
                <span>d&gt;sponsor</span>
            </div>
        </Link>
    )
}