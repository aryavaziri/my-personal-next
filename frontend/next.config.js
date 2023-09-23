const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/my-personal-next",
  assetPrefix: "https://aryavaziri.github.io/my-personal-next/",
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
