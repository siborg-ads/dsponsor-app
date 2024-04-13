import { useQuery, gql, ApolloClient, InMemoryCache } from "@apollo/client";
import { fetchDataFromIPFS } from "../../data/services/ipfsService";
import { marketplaceConfig } from "./marketplace.config.js";
const client = new ApolloClient({
  uri: marketplaceConfig.marketplace_offer_gql_endpoint,
  cache: new InMemoryCache(),
});

export const fetchOffer = async (nftContract, tokenId) => {
  const GET_TOKEN_DATA = gql`
    query($nftContract: Bytes!, $tokenId: BigInt!) {
      updateOffers(
        orderBy: blockTimestamp
        orderDirection: desc
        where: { nftContract: $nftContract }
      ) {
        offerId
        nftContract
        offerMetadata
        blockTimestamp
      }
      mints(
        orderBy: blockTimestamp
        orderDirection: desc
        where: { tokenId: $tokenId }
      ) {
        tokenId
        tokenData
        blockTimestamp
      }
    }
  `;
  try {
    const { data, loading, error } = await client.query({
      query: GET_TOKEN_DATA,
      variables: {
        nftContract,
        tokenId
      }
    });

    const tokenData = data.mints[0].tokenData;
    const offerMetadata = data.updateOffers[0].offerMetadata;

    return { tokenData, offerMetadata };

  } catch (error) {
    console.error("Error fetching item info:", error);
  }
};


export const parseOfferMetadata = async (offerMetadata, tokenData) => {
  const ipfsHash = offerMetadata.split("ipfs://")[1];
  const httpHash = offerMetadata.split("http://")[1];
  const metadataUrl = `https://nftstorage.link/ipfs/${ipfsHash ? ipfsHash : httpHash}`;

  // fetch the metadata from the IPFS hash
  const ipfsData = await fetchDataFromIPFS(metadataUrl);
  const parsed_token_metadata = ipfsData.offer.token_metadata;

  // Replace {tokenData} with the provided tokenData parameter
  ipfsData.offer.description = parsed_token_metadata.description.replace(/{tokenData}/g, tokenData);
  ipfsData.offer.image = parsed_token_metadata.image.replace(/{tokenData}/g, tokenData);
  ipfsData.offer.name = parsed_token_metadata.name.replace(/{tokenData}/g, tokenData)

  return ipfsData.offer;
};
