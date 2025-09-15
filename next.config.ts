// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimisation des images
  images: {
    domains: ['localhost', 'achateur-comcombremer.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compression et optimisation
  compress: true,
  poweredByHeader: false,

  // Headers de sécurité et SEO
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
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
            value: 'origin-when-cross-origin'
          }
        ]
      },
      // Cache headers pour les images
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  },

  // Redirections SEO importantes
  async redirects() {
    return [
      // Redirection de l'ancien format vers le nouveau
      {
        source: '/product/:slug',
        destination: '/produits/:slug',
        permanent: true,
      },
      // Redirection du pluriel vers singulier pour les articles
      {
        source: '/blogs/:slug',
        destination: '/blog/:slug',
        permanent: true,
      }
    ];
  },

  // Génération statique optimisée
  trailingSlash: false,
  
  // Variables d'environnement publiques
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SITE_NAME: 'ConcombresPharm',
  },

  // Optimisation du build
  // swcMinify: true,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@heroicons/react'],
  }
};

module.exports = nextConfig;