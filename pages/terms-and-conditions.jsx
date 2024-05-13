import termsAndConditionsData from '../data/terms-and-conditions';
import Meta from "../components/Meta";
import Image from "next/image";
import React from "react";

export default function Terms() {
    return (
        <>
            <Meta title="Terms and conditions || DSponsor | smarter monetization for your content"/>
            <div className="pt-[5.5rem] lg:pt-24">
                <section className="dark:bg-jacarta-800 relative py-16 md:py-24">
                    <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
                        <Image
                            src="/images/gradient_light.jpg"
                            alt="gradient"
                            width={1920}
                            height={789}
                        />
                    </picture>

                    <div className="container">
                        <div className="mx-auto max-w-lg text-center">
                            <div>
                                <h1>{termsAndConditionsData.title}</h1>
                                <p>{termsAndConditionsData.intro}</p>
                                {termsAndConditionsData.sections.map((section, index) => (
                                    <div key={index}>
                                        <h2>{section.title}</h2>
                                        <p>{section.content}</p>
                                    </div>
                                ))}
                                <p>Last updated: {termsAndConditionsData.lastUpdated}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
        ;
}
