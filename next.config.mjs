/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'newjeans.kr',
      },
      {
        hostname: 'avatars.githubusercontent.com',
      },
      { hostname: 'imagedelivery.net' },
    ],
  },
};

export default nextConfig;
