
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows all HTTPS hostnames
      },
      {
        protocol: "http",
        hostname: "**", // Allows all HTTP hostnames (optional, for development)
      },
    ],
  },
};

module.exports = nextConfig;