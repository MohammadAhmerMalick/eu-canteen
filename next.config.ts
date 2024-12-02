import type { NextConfig } from 'next'

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
      },
    ],
  },
}

export default nextConfig
