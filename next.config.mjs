/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["backend.rplsmknusa.com", "img.icons8.com"],
    unoptimized: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
