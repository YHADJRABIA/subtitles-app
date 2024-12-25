import { DefaultSession } from 'next-auth'
import { Locale } from './locale'

// Client data exposed to authenticated user
export type UserType = {
  id: string
  email: string
  lastUpdateDate: string
  creationDate: string
  lastLoginDate?: string
  favoriteLocale: Locale
  isTwoFactorEnabled: boolean
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
}

export type ExtendedUser = DefaultSession['user'] & UserType
