export type Filter = "all" | "medias" | "dapps" | "websites" | "newsletters" | "communities";

export type CurationDataItem = {
  chainId?: number;
  logo: string;
  description: string;
  buttonText: string;
  offerId: number;
  buttonLink: string;
  type: Filter[];
  inTrending: boolean;
};

type CurationData = {
  [key: number]: CurationDataItem[];
};

export const marketplaceOffersCuration = {
  8453: [1, 2, 3],
  11124: [1],
  34443: Array.from({ length: 50 }, (_, i) => i),
  11155111: [1, ...Array.from({ length: 50 }, (_, i) => 20 + i)]
};

export function curationData(baseURL: string): CurationData {
  return {
    8453: [
      /*
      {
        logo: "/images/siborg-ads/siborg-ads.png",
        description:
          "SiBorg App is a web3-based Spotify-like application for Twitter Spaces and podcasts, featuring SocialFi capabilities.",
        buttonText: "Own a part of SiBorg App",
        offerId: 1,
        buttonLink: `${baseURL}/${8453}/offer/${1}`,
        type: ["dapps"] as Filter[],
        inTrending: true
      },
         */

      {
        logo: "/images/cryptoast/cryptoast.webp",
        description:
          "Cryptoast is a leading French-language media outlet focused on Bitcoin, blockchain, and cryptocurrencies. Established in 2017, it aims to provide comprehensive and accessible information to both newcomers and experienced users in the crypto space.",
        offerId: 2,
        buttonText: "Sold out! New ad spaces available soon",
        buttonLink: `${baseURL}/${8453}/offer/${2}`,
        type: ["medias", "newsletters"] as Filter[],
        inTrending: true
      },

      {
        logo: "/images/curation/defifrance.png", // 2000 x 600
        description:
          "DeFi France is the leading French community related to the rise of Decentralized Finance. Members regularly organize meetups across France, particularly in Paris, Toulouse, Bordeaux, and Lyon.",
        offerId: 3,
        buttonText: "Join as a sponsor for DeFi France",
        buttonLink: `${baseURL}/${8453}/offer/${3}`,
        type: ["communities"] as Filter[],
        inTrending: true
      }
    ],
    34443: [
      {
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG4ECvF3PK6ADTOJOkmfmU4JOffleZqMuGdSBZSl0x3oXhDp2pLgy37pxUPA9L1eIkZw&usqp=CAU",
        description:
          "Mode is the Ethereum L2 that rewards you for growing the network via new economic mechanisms. Powered by Optimism.",
        buttonText: "Own a part of Mode website",
        offerId: 1,
        buttonLink: `${baseURL}/${34443}/offer/${1}`,
        type: ["dapps"] as Filter[],
        inTrending: true
      }
    ],
    11124: [],
    11155111: [
      /*
      {
        logo: "/images/siborg-ads/siborg-ads.png",
        description:
          "SiBorg App is a web3-based Spotify-like application for Twitter Spaces and podcasts, featuring SocialFi capabilities.",
        buttonText: "Own a part of SiBorg App",
        offerId: 1,
        buttonLink: `${baseURL}/${11155111}/offer/${1}`,
        type: ["dapps"] as Filter[],
        inTrending: true
      },
*/
      {
        logo: "/images/cryptoast/cryptoast.webp",
        description:
          "Cryptoast is a leading French-language media outlet focused on Bitcoin, blockchain, and cryptocurrencies. Established in 2017, it aims to provide comprehensive and accessible information to both newcomers and experienced users in the crypto space.",
        offerId: 70,
        buttonText: "Get your parcel on Cryptoast Journal",
        buttonLink: `${baseURL}/${11155111}/offer/${70}`,
        type: ["medias"] as Filter[],
        inTrending: true
      }
    ]
  };
}
