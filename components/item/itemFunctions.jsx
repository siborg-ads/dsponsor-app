import { useQuery, gql, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.studio.thegraph.com/proxy/65744/dsponsor-sepolia/version/latest",
  cache: new InMemoryCache(),
});

// fetching item data
export const fetchItemInfo = async (id, assetContract) => {
  const GET_LATEST_LISTING_ID = gql`
    query GetLatestListingId($tokenId: BigInt, $assetContract: Bytes) {
      listingAddeds(
        orderBy: blockTimestamp
        orderDirection: desc
        where: {
          listing_tokenId: $tokenId
          listing_assetContract: $assetContract
        }
      ) {
        listing_listingId
      }
    }
  `;
  try {
    const { data, loading, error } = await client.query({
      query: GET_LATEST_LISTING_ID,
      variables: {
        tokenId: id,
        assetContract: assetContract,
      },
    });
  } catch (error) {
    console.error("Error fetching item info:", error);
  }
};
