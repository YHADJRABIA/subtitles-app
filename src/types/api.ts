import { UserAPIType } from './user'

export type APIResponse = {
  message?: string
  error?: string | Promise<string>
  success?: boolean
  requiresUserAction?: boolean
} | null

export type VerificationResponse =
  | {
      expires: Date
      email: string
      id: string
      userId?: string
      code?: string
      token?: string
    }
  | null
  | undefined

export type UserResponse = UserAPIType | null | undefined
