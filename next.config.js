/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
  nextScriptWorkers: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/api/:slug*",
        destination: `${process.env.BACKEND_URL}/api/:slug*`,
      },
    ];
  },
};

module.exports = nextConfig;
