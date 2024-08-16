const PRODUCTION_URL = 'https://pysubs.vercel.app'
const STAGING_URL = 'https://staging.pysubs.vercel.app'
const DEVELOPMENT_URL = 'http://localhost:3000'

export const isProduction = process.env.NODE_ENV === 'production'
export const isDevelopment = process.env.NODE_ENV === 'development'
export const isStaging = process.env.NODE_ENV === 'test'
export const isClient = typeof window !== 'undefined'
export const websiteUrl = isProduction
  ? PRODUCTION_URL
  : isStaging
    ? STAGING_URL
    : DEVELOPMENT_URL
