import { DefaultSession } from 'next-auth'

export type UserAPIType = {
  email: string
  emailVerified?: Date
  name?: string
  image?: string
}

export type ExtendedUser = DefaultSession['user'] & UserAPIType
