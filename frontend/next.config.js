const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/my-personal-next",
  assetPrefix: isProd ? "/my-personal-next/" : undefined,
  images: {
    remotePatterns: [
      {
        hostname: "**.googleusercontent.com",
        protocol: "https",
      },
      {
        protocol: 'https',
        hostname: 'github.io',
      },
    ],
  },
};

module.exports = nextConfig;
