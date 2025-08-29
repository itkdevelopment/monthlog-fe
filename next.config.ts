import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    domains: ["dev-files.monthler.kr"], 
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
