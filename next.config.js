/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    forceSwcTransforms: true,
  },
  compress: true,
  productionBrowserSourceMaps: false, // Set to true for debugging production
  // Remove optimizeFonts
}

module.exports = nextConfig