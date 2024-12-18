import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    if (!isServer)
      config.resolve.fallback = {
        fs: false,
      }

    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dnu2o9j8f/image/upload/v1733138863/**',
        // pathname: '/dhpsasm22/image/upload/v1733138863/**',
      },
    ],
  },
}

export default withNextIntl(nextConfig)
