import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
}

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination:
          'https://n3zus4sx65.execute-api.us-east-1.amazonaws.com/staging/api/:path*',
      },
    ];
  },
};;

export default nextConfig;
