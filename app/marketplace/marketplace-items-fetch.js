import { useQuery, gql, ApolloClient, InMemoryCache } from "@apollo/client";
import { fetchDataFromIPFS } from "../../data/services/ipfsService";
import { marketplaceConfig } from "./marketplace.config.js";

export const fetchOffer = async (nftContracts, tokenIds, chainId) => {

  const client = new ApolloClient({
    uri: marketplaceConfig[chainId].marketplace_offer_gql_endpoint,
    cache: new InMemoryCache(),
  });

  const GET_TOKEN_DATA = gql`
  query 
  ( $nftContracts: [Bytes!],  $tokenIds: [BigInt!] )
  {
    updateOffers(
      orderBy: blockTimestamp
      orderDirection: desc
     where: {nftContract_in: $nftContracts}
    ) {
      offerId
      nftContract
      offerMetadata
      blockTimestamp
    }
    mints(
      orderBy: blockTimestamp
      orderDirection: desc
     where: { tokenId_in: $tokenIds }
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
        nftContracts,
        tokenIds
      }
    });

    const updateOffers = data.updateOffers;

    // Group updateOffers by nftContract
    const groupedOffers = {};
    updateOffers.forEach(offer => {
      const { nftContract, blockTimestamp } = offer;
      if (!groupedOffers[nftContract] || blockTimestamp > groupedOffers[nftContract].blockTimestamp) {
        groupedOffers[nftContract] = offer;
      }
    });

    // Create an array of latestOffers for each item in updateOffers
    const latestOffers = updateOffers.map(offer => groupedOffers[offer.nftContract]);

    // Get tokenDatas and offerMetadatas
    const tokenDatas = data.mints.map(mint => mint.tokenData);
    const offerMetadatas = latestOffers.map(offer => offer.offerMetadata);

    return { tokenDatas, offerMetadatas };

  } catch (error) {
    console.log("Error fetching item info:", error);
    return { tokenDatas: [], offerMetadatas: [] };
  }
};



export const parseOfferMetadata = async (offerMetadata, tokenData) => {

  const isIPFSLink = offerMetadata.startsWith("ipfs://");
  const isHTTPSLink = offerMetadata.startsWith("https://");

  let metadataUrl = "";

  if (isIPFSLink) {
    // Handle IPFS link
    const ipfsHash = offerMetadata.split("ipfs://")[1];
    metadataUrl = `https://nftstorage.link/ipfs/${ipfsHash}`;

  } else if (isHTTPSLink) {
    // Handle HTTPS link
    metadataUrl = offerMetadata;
  }

  // fetch the metadata from the IPFS hash
  const ipfsData = await fetchDataFromIPFS(metadataUrl);

  const parsed_token_metadata = ipfsData.offer.token_metadata;

  // Replace {tokenData} with the provided tokenData parameter
  ipfsData.offer.description = parsed_token_metadata.description.replace(/{tokenData}/g, tokenData);
  ipfsData.offer.image = parsed_token_metadata.image.replace(/{tokenData}/g, tokenData);
  ipfsData.offer.name = parsed_token_metadata.name.replace(/{tokenData}/g, tokenData)

  return ipfsData.offer;
};
