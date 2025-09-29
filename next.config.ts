import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        hostname: "img.clerk.com",
        protocol: "https",
      },
      {
        hostname: "cdn.sanity.io",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
