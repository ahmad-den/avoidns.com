import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  // Uncomment the following line if you need to use custom domains
  // images: {
  //   domains: ['yourdomain.com'],
  // },
  // Add any environment variables you want to expose to the browser
  env: {
    NEXT_PUBLIC_APP_NAME: 'avoiDNS',
  },
  // Add custom webpack configurations if needed
  webpack: (config, { isServer }) => {
    // Custom webpack configs go here
    return config
  },
}

export default nextConfig


