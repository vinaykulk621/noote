/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    NEXT_PUBLIC_SOCKET_URL: "http://localhost:3000",
    CORS_ORIGIN: "http://localhost:3000",
    PORT: 4000,
  },
};

module.exports = nextConfig
