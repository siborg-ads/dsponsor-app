import { execute } from "../../.graphclient";
import { gql } from "@apollo/client";
import AdsOffersMapper from "../mappers/AdsOffersMapper";

export const GetAllAdsOffers = async () => {
  const GET_DATA = gql`
    query MyQuery {
      newDSponsorNFTs {
        contractURI
        id
        maxSupply
        name
        owner
        prices
        currencies
        allowedTokenIds
        royaltyBps
      }
    }
  `;
  const resultat = await execute(GET_DATA, {});

  const mapperResult = AdsOffersMapper(resultat);
  
  return mapperResult;
};

export const GetAdOfferById = async (adId) => {
  const GET_AD_OFFER = gql`
    query GetAdOffer($id: ID!) {
      newDSponsorNFTs(where: { id: $id }) {
        contractURI
        id
        maxSupply
        name
        owner
        prices
        currencies
        allowedTokenIds
        royaltyBps
      }
    }
  `;
  const variables = {
    id: adId,
  };

  const resultat = await execute(GET_AD_OFFER, variables);

  const mapperResult = AdsOffersMapper(resultat);

  return mapperResult;
};
