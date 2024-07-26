import { DefaultSession } from 'next-auth'
import { Locale } from './locale'

export type UserType = {
  email: string
  id: string
  isVerifiedEmail: boolean
  lastUpdateDate: Date
  creationDate: Date
  lastLoginDate?: Date
  favoriteLocale: Locale
  isTwoFactorEnabled: boolean
}

export type UserAPIType = DefaultSession['user'] & {
  email: string
  emailVerified?: Date
  createdAt: Date
  updatedAt?: Date
  lastLogin?: Date
  favoriteLocale: Locale
  isTwoFactorEnabled: boolean
}

export type ExtendedUser = DefaultSession['user'] & UserType
