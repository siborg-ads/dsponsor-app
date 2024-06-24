const tranding_category_filter = [
  {
    id: 0,

    text: "all"
  },
  {
    id: 1,
    svg: "art",
    text: "art"
  },

  {
    id: 2,
    svg: "collection",
    text: "Collectibles"
  },
  {
    id: 3,
    svg: "domain",
    text: "domain"
  },
  {
    id: 4,
    svg: "music",
    text: "music"
  },
  {
    id: 5,
    svg: "photography",
    text: "photography"
  },
  {
    id: 6,
    svg: "world",
    text: "virtual world"
  }
];
const ownedAdProposals_categories_filter = [
  {
    id: 0,
    svg: "collection",
    text: "All"
  }

  // {
  //   id: 1,
  //   svg: "art",
  //   text: "Pending review",
  // },
  // {
  //   id: 2,
  //   svg: "art",
  //   text: "Validated ads",
  // },

  // {
  //   id: 3,
  //   svg: "collection",
  //   text: "Refused ads",
  // },
];

const trendingCategoryData = [
  {
    image: "/images/products/MTG-GRADE.png",
    id: "Flourishing Cat #1800",
    offerId: "8",
    category: "art",
    title: "Collection title",
    isAlreadyMinted: true,
    nfsw: true,
    lazyMinted: false,
    verified: true,
    addDate: 1,
    sortPrice: 8.49,
    price: "2 USDC",
    maxToken: 4,
    tokenId: 1,
    likes: 15,
    creator: {
      name: "Sussygirl",
      image: "/images/avatars/creator_1.png"
    },
    ownerName: "Sussygirl"
  },
  {
    image: "/images/products/item_4.jpg",
    id: "Amazing NFT art1",
    offerId: "8",
    category: "Collectibles",
    title: "Collection title",
    isAlreadyMinted: false,
    nfsw: true,
    lazyMinted: false,
    verified: false,
    addDate: 2,
    sortPrice: 5.9,
    price: "2 USDC",
    maxToken: 4,
    tokenId: 2,
    likes: 188,
    creator: {
      name: "Sussygirl",
      image: "/images/avatars/creator_2.png"
    },
    ownerName: null
  },
  {
    image: "/images/products/item_7.jpg",
    id: "SwagFox#1332",
    offerId: "8",
    category: "domain",
    title: "Collection title",
    isAlreadyMinted: false,
    nfsw: false,
    lazyMinted: true,
    verified: true,
    addDate: 3,
    sortPrice: 0.078,
    price: "2 USDC",
    maxToken: 4,
    tokenId: 3,
    likes: 160,
    creator: {
      name: "Sussygirl",
      image: "/images/avatars/creator_3.png"
    },
    ownerName: null
  },
  {
    image: "/images/products/item_6.jpg",
    id: "Splendid Girl3",
    offerId: "8",
    category: "music",
    title: "Collection title",
    isAlreadyMinted: false,
    nfsw: true,
    lazyMinted: true,
    verified: false,
    addDate: 4,
    sortPrice: 10,
    price: "2 USDC",
    maxToken: 4,
    tokenId: 4,
    likes: 159,
    creator: {
      name: "Sussygirl",
      image: "/images/avatars/creator_4.png"
    },
    ownerName: null
  }
];

export { tranding_category_filter, trendingCategoryData, ownedAdProposals_categories_filter };
