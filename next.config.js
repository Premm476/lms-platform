/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // For Docker or standalone deployment
  images: {
    domains: ["your-image-domain.com"], // Add domains for external images
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint during build
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during build
  },
};

module.exports = nextConfig;