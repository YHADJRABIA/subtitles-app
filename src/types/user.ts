import { DefaultSession } from 'next-auth'

export type UserType = {
  email: string
  isVerifiedEmail: boolean
  creationDate: Date
  lastLoginDate?: Date
}

export type UserAPIType = DefaultSession['user'] & {
  email: string
  emailVerified?: Date
  createdAt: Date
  lastLogin?: Date
}

export type ExtendedUser = DefaultSession['user'] & UserType
