import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://img.icons8.com/**")],
  },
};

export default nextConfig;
