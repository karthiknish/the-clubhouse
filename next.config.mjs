/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lirp.cdn-website.com",
      },
    ],
  },
};

export default nextConfig;
