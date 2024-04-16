const createNextIntlPlugin = require('next-intl/plugin')
const path = require('path')

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true, // Development mode only – highlights potential problems.
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = withNextIntl(nextConfig)
