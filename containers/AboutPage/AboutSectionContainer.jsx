import Link from "next/link";

export default function AboutSectionContainer() {
    return (
            <section className="container mx-auto max-w-lg text-center">
                    <h1 className="text-jacarta-700 font-bold font-display mb-6 text-center text-5xl dark:text-white lg:text-6xl xl:text-7xl">About D-Sponsor</h1>
                    <p className="dark:text-jacarta-200 mb-8 text-center text-lg">DSponsor is a platform built with the idea that everyone should be able to monetize their content. </p>
                    <p className="dark:text-jacarta-200 mb-8 text-center text-lg">We believe that the future of the internet is decentralized and that everyone should be able to benefit from the value they create. </p>
                    <p className="dark:text-jacarta-200 mb-8 text-center text-lg">Our platform allows creators to create offers that their audience can buy into, allowing them to monetize their content in a new way. </p>
                    <p className="dark:text-jacarta-200 mb-8 text-center text-lg">We believe that this new model will revolutionize the way that creators monetize their content and will create a more equitable internet for everyone. </p>
                    <p className="dark:text-jacarta-200 mb-8 text-center text-lg">We are excited to be a part of this new era of the internet and we hope that you will join us on this journey. </p>
                    <p className="dark:text-jacarta-200 mb-8 text-center text-lg">Together, we can create a more equitable internet for everyone. </p>
                    <div className="flex space-x-4 justify-center w-full">
                        <Link href="/about"
                              className="bg-accent shadow-accent-volume hover:bg-accent-dark w-36 rounded-full py-3 px-8 text-center font-semibold text-white transition-all">
                            Create
                        </Link>
                        <Link
                            href="#hot-offers"
                            className="text-accent shadow-white-volume ici hover:bg-accent-dark hover:shadow-accent-volume w-36 rounded-full bg-white py-3 px-8 text-center font-semibold transition-all hover:text-white"
                        >
                            Buy
                        </Link>
                    </div>
            </section>
    );
}
