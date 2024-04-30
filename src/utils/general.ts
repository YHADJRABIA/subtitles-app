export const PORTFOLIO_LINK = 'https://yhr.vercel.app'
export const PRODUCTION_URL = '' // TODO: complete before hosting

const DEVELOPMENT_URL = 'http://localhost:3000'

export const isProduction = process.env.NODE_ENV === 'production'
export const isDevelopment = process.env.NODE_ENV === 'development'
export const isClient = typeof window !== 'undefined'
export const websiteUrl = isProduction ? PRODUCTION_URL : DEVELOPMENT_URL
