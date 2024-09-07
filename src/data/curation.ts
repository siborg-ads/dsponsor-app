export type Filter = "all" | "medias" | "dapps" | "websites" | "newsletters";

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
  11155111: [1, ...Array.from({ length: 50 }, (_, i) => 20 + i)],
  8453: [1]
};

export function curationData(baseURL: string): CurationData {
  return {
    11155111: [
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

      {
        logo: "/images/cryptoast/cryptoast.webp",
        description:
          "Cryptoast is a leading French-language media outlet focused on Bitcoin, blockchain, and cryptocurrencies. Established in 2017, it aims to provide comprehensive and accessible information to both newcomers and experienced users in the crypto space.",
        offerId: 35,
        buttonText: "Get your ads on Cryptoast",
        buttonLink: `${baseURL}/${11155111}/offer/${35}`,
        type: ["medias", "newsletters"] as Filter[],
        inTrending: true
      }
    ],
    8453: [
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
      {
        logo: "/images/cryptoast/cryptoast.webp",
        description:
          "Cryptoast is a leading French-language media outlet focused on Bitcoin, blockchain, and cryptocurrencies. Established in 2017, it aims to provide comprehensive and accessible information to both newcomers and experienced users in the crypto space.",
        offerId: 2,
        buttonText: "Coming soon!",
        buttonLink: `#`, // `${baseURL}/${8453}/offer/${2}`,
        type: ["medias", "newsletters"] as Filter[],
        inTrending: false
      }
    ]
  };
}
