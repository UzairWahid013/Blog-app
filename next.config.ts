import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*'
      }
    ],
    domains: ["placehold.co", "avatars.githubusercontent.com","file-uploads.teachablecdn.com",    ],
  },
  // other config options here
};

export default nextConfig;
