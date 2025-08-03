import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/todo-list",
  assetPrefix: "/todo-list",
};

export default nextConfig;
