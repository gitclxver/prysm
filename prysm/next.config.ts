import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizeCss: true,
  },
  // Reduce polyfills for modern browsers
  transpilePackages: [],
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  async rewrites() {
    // Forward Firebase auth handler requests to Firebase's default handler
    // This is needed because Firebase email links and OAuth callbacks use /__/auth/* routes
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    if (projectId) {
      return [
        {
          source: '/__/auth/:path*',
          destination: `https://${projectId}.firebaseapp.com/__/auth/:path*`,
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
