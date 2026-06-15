// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },

  compress: true,

  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
    optimizePackageImports: ['framer-motion', 'gsap', '@prisma/client'],
  },

  redirects: async () => [
    { source: '/accueil', destination: '/', permanent: true },
    { source: '/home', destination: '/', permanent: true },
  ],
};

export default nextConfig;