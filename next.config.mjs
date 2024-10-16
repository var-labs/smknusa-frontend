/** @type {import('next').NextConfig} */
const nextConfig = {
  staticPageGenerationTimeout: 3600,
  // images: {
  //   domains: ['backend.rplsmknusa.com', 'img.icons8.com'],
  // },
  output: "export",
  images: {
    domains: ["backend.rplsmknusa.com", "img.icons8.com"],
    unoptimized: true,
  },
};

export default nextConfig;
