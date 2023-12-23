/** @type {import('next').NextConfig} */
// const withMDX = require('@next/mdx')()
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*",
      },
    ],
  },
};

module.exports = nextConfig
;
