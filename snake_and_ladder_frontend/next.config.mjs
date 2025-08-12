/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
  async redirects() {
    return [
      {
        source: '/auth/callback',
        destination: '/',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
