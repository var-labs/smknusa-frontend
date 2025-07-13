/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["backend.rplsmknusa.com", "img.icons8.com"],
    unoptimized: true,
  },
  compiler: {
    removeConsole: true,
  },
};

export default nextConfig;
