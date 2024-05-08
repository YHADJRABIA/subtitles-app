import { DefaultSession } from 'next-auth'

export type UserAPIType = {
  emailVerified: Date
  name: string
  email: string
  image: string
}

export type ExtendedUser = DefaultSession['user'] & UserAPIType
