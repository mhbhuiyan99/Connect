import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  eslint: { // new add for vercel
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;