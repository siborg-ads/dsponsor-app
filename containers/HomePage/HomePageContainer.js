import React from "react";
import Hero from "../../components/hero/hero.jsx";
import Bids from "../../components/marketplace-modals/bids.jsx";
import HowItWorks from "../../components/explication/howItWorks";

const HomePageContainer = ({lastOffers}) => {
    const mappedData = lastOffers.map((element) => {
        const tokenIdAllowedToMint = element.nftContract.tokens.find((token) => token.mint === null) || false;

        const combinedData = {
            ...element,
            tokenIdAllowedToMint : tokenIdAllowedToMint,
        };

        if (!tokenIdAllowedToMint && element.nftContract.allowList === true){
            return null;
        }

        return combinedData;
    }).filter((element) => element !== null);

    return (
        <main>
            <Hero />
            <HowItWorks />
            <Bids data={mappedData} />
        </main>
    );
};

export default HomePageContainer;
