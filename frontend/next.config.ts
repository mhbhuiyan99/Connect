import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "api.hasibul.com",
      },
    ],
  },
  eslint: {
    // new add for vercel
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
