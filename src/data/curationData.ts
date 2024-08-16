import { Filter } from "@/components/layout/Home";

export const curationData: {
  logo: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  type: Filter;
}[] = [
  {
    logo: "/images/siborg-ads/siborg-ads.png",
    description:
      "SiBorg App is a web3-based Spotify-like application for Twitter Spaces and podcasts, featuring SocialFi capabilities.",
    buttonText: "Own a part of SiBorg App",
    buttonLink: "https://siborg.io",
    type: "dapps"
  },
  {
    logo: "/images/cryptoast/cryptoast.webp",
    description:
      "Cryptoast is a leading French-language media outlet focused on Bitcoin, blockchain, and cryptocurrencies. Established in 2017, it aims to provide comprehensive and accessible information to both newcomers and experienced users in the crypto space.",
    buttonText: "Get your ads on Cryptoast",
    buttonLink: "https://cryptoast.fr",
    type: "medias"
  }
];
