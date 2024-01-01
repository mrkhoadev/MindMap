/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*",
      },
    ],
  },
  // async redirects() {
  //   return [
  //       {
  //           source: "/",
  //           destination: "/home",
  //           permanent: true
  //       }
  //   ]
  // },
};

module.exports = nextConfig;
