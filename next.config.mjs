/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["backend.rplsmknusa.com", "img.icons8.com"],
    unoptimized: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
