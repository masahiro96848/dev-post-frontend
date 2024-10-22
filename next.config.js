/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx'],
  env: {
    ...require(`./config/${process.env.APP_ENV || 'local'}.json`),
  },
}

module.exports = nextConfig
