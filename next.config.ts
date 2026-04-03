import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // Disabled for API functionality
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
