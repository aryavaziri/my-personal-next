// const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  output: "standalone",
  images: {
    remotePatterns: [
      {
        hostname: "**.googleusercontent.com",
        protocol: "https",
      },
      {
        hostname: "aryav.nl",
        protocol: "https",
      },
      // {
      //   protocol: 'https',
      //   hostname: 'github.io',
      // },
    ],
  },
};

module.exports = nextConfig;
