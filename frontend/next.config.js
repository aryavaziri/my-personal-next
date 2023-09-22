/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  images: {
    remotePatterns: [
      {
        hostname: "**.googleusercontent.com",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
