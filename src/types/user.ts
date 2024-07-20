import { DefaultSession } from 'next-auth'

export type UserAPIType = {
  email: string
  emailVerified?: Date
}

export type ExtendedUser = DefaultSession['user'] & UserAPIType
