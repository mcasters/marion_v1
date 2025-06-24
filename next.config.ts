import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [768, 1200],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "30mb",
    },
  },
};
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
