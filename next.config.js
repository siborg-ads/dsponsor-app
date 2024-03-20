/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  images: {
    domains: ["cdn.jsdelivr.net", "6f375d41f2a33f1f08f6042a65d49ec9.ipfscdn.io", "pbs.twimg.com"],
  },
};

module.exports = nextConfig;
