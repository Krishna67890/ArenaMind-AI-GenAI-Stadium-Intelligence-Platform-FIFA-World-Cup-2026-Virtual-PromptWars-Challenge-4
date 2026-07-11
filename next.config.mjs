/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Disable persistent caching to prevent memory allocation errors during dev
      config.cache = false;
    }
    return config;
  },
  experimental: {
    // any specific experimental flags if needed
  }
};

export default nextConfig;
