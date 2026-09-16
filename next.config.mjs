/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  env: {
    ACTIVE_STUDIO: process.env.ACTIVE_STUDIO || 'classy-craft',
  },
};
export default nextConfig;
