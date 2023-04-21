/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@prisma/client"],
    swcPlugins: [["next-superjson-plugin", {}]],
  },
};

module.exports = nextConfig;
