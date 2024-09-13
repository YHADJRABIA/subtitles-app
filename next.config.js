const createNextIntlPlugin = require('next-intl/plugin')
const path = require('path')

const withNextIntl = createNextIntlPlugin()

// TODO: complete default-src to better secure CORS policy
/*
    default-src 'self' data: https://www.datocms-assets.com https://stream.mux.com/ https://inferred.litix.io/;
 */

// Content Security Policy
const cspHeader = `
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com/ https://www.gstatic.com/;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://www.datocms-assets.com  https://image.mux.com/;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'self' http://localhost:* https://plugins-cdn.datocms.com;
    upgrade-insecure-requests;
`

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true, // Development mode only – highlights potential problems.
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
    prependData: `@import "utilities.scss";`, // Scss code that'd be prepended to every single scss file.
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        port: '',
        pathname: '**',
      },
    ],
  },
  headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
    ]
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find(rule =>
      rule.test?.test?.('.svg')
    )

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      }
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
}

module.exports = withNextIntl(nextConfig)
