import path from 'path'
import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from 'next'

const withNextIntl = createNextIntlPlugin()

// Content Security Policy
const cspHeader = `
  default-src 'self' https://www.datocms-assets.com https://stream.mux.com https://inferred.litix.io;
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com https://www.gstatic.com https://vercel.live;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https://www.datocms-assets.com https://stream.mux.com https://inferred.litix.io https://image.mux.com;
  media-src 'self' blob: https://stream.mux.com https://*.mux.com https://*.fastly.mux.com;
  connect-src 'self' https://www.datocms-assets.com https://stream.mux.com https://*.mux.com https://*.fastly.mux.com https://inferred.litix.io;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'self' https://pysubs.admin.datocms.com https://plugins-cdn.datocms.com;
  upgrade-insecure-requests;
`

const nextConfig: NextConfig = {
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
  async headers() {
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
    const fileLoaderRule = config.module?.rules.find((rule: any) =>
      rule.test?.test?.('.svg')
    )

    if (fileLoaderRule) {
      config.module?.rules.push(
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
          resourceQuery: {
            not: [...(fileLoaderRule.resourceQuery?.not || []), /url/],
          }, // exclude if *.svg?url
          use: ['@svgr/webpack'],
        }
      )

      // Modify the file loader rule to ignore *.svg, since we have it handled now.
      fileLoaderRule.exclude = /\.svg$/i
    }

    return config
  },
}

export default withNextIntl(nextConfig)
