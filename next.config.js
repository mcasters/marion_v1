/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [768, 1200],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
};
module.exports = nextConfig;
