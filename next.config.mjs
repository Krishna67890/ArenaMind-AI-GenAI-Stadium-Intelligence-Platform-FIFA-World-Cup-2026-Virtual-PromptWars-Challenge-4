/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' blob:; worker-src 'self' blob:; script-src 'self' 'unsafe-eval' 'unsafe-inline' blob: https://sketchfab.com https://*.sketchfab.com https://*.cesium.com https://apis.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; frame-src 'self' https://sketchfab.com https://*.sketchfab.com https://ion.cesium.com; connect-src 'self' https://*.firebaseio.com https://*.googleapis.com https://*.firebasestorage.googleapis.com https://raw.githack.com https://cdn.jsdelivr.net https://*.google-analytics.com https://fonts.gstatic.com https://raw.githubusercontent.com https://*.cesium.com; font-src 'self' https://fonts.gstatic.com data:;"
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ],
      },
    ]
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.cache = false;
    }
    return config;
  }
};

export default nextConfig;
