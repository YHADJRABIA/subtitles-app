import { DefaultSession } from 'next-auth'
import { Locale } from './locale'

// Client data exposed to authenticated user
export type UserType = {
  id: string
  email: string
  creationDate: string
  lastLoginDate?: string
  lastUpdateDate: string
  favoriteLocale: Locale
  isTwoFactorEnabled: boolean
  hasCredentialsProvider: boolean
  error?: 'user-not-found'
}

export type UserAPIType = DefaultSession['user'] & {
  id: string
  email: string
  emailVerified?: Date
  password?: string
  createdAt: Date
  updatedAt?: Date
  lastLogin?: Date
  lastUpdate?: Date
  favoriteLocale: Locale
  isTwoFactorEnabled: boolean
  hasCredentialsProvider: boolean
}

export type ExtendedUser = DefaultSession['user'] & UserType
