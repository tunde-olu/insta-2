/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['links.papareact.com', 'cloudflare-ipfs.com'],
  },
};

module.exports = nextConfig;
