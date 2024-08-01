declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string
      JWT_SECRET: string
      JWT_EXPIRATION_TIME: string
      GOOGLE_CLIENT_ID: string
      GOOGLE_CLIENT_SECRET: string
      NEXTAUTH_SECRET: string
      NODEMAILER_SERVICE: string
      NODEMAILER_SENDER_EMAIL: string
      NODE_ENV: 'development' | 'production'
    }
  }
}
