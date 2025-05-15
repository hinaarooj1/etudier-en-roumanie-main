/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.pixabay.com", // Correct hostname for your image
      },
    ],
  },
};

export default nextConfig;
