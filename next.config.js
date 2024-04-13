/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: ["cdn.jsdelivr.net", "6f375d41f2a33f1f08f6042a65d49ec9.ipfscdn.io", "pbs.twimg.com", "placehold.co"],
  },
};

module.exports = nextConfig;
