/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "akamai",
    path: "",
  },
  basePath: "/mirkoalba.github.io",
  assetPrefix: "/mirkoalba.github.io",
};

module.exports = nextConfig;
