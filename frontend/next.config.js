const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/my-personal-next",
  assetPrefix: isProd
    ? '"https://github.com/aryavaziri/my-personal-next/"'
    : undefined,
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
