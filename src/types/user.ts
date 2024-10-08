import { DefaultSession } from 'next-auth'
import { Locale } from './locale'

export type UserType = {
  email: string
  id: string
  isVerifiedEmail: boolean
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
  createdAt: Date
  updatedAt?: Date
  lastLogin?: Date
  favoriteLocale: Locale
  isTwoFactorEnabled: boolean
}

export type ExtendedUser = DefaultSession['user'] & UserType
