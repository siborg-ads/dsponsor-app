import "../styles/globals.css";
import Providers from "../providers/providers";
import ThemeLayout from "./themeLayout";

export const metadata = {
    title: "DSponsor | Unlock smarter monetization for your content.",
    keyword: "audience engagement, web3, creator economic, NFT, creator monetization, creator economy, creator token, creator coin, creator tokenization, creator economy",
    description: "DSponsor is a platform that enables creators to monetize their content and engage with their audience in a smarter way."
}

export default function RootLayout({
                                       children,
                                   }) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <ThemeLayout>
                        {children}
                    </ThemeLayout>
                </Providers>
            </body>
        </html>
    )
}
