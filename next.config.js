/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com', // Replace with your image host domain
        port: '',
        pathname: '/**',
      },
      // Add more patterns as needed
    ],
  },
};

module.exports = nextConfig;