/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/my-personal-next",
  assetPrefix: "/my-personal-next/",
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
