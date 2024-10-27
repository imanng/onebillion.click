/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imgcdn.stablediffusionweb.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
