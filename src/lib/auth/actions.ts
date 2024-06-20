import {
  AccountLoginSchema,
  AccountRegistrationSchema,
  EmailVerificationSchema,
  PasswordRecoverySchema,
  SendEmailVerificationSchema,
} from '@/types/schemas/auth'
import axios from 'axios'
import { signIn, signOut } from 'next-auth/react'

export const handleLogout = async () => await signOut()

export const handleGoogleLogin = async () => {
  await signIn('google', { callbackUrl: '/dashboard' })
}

export const handleCredentialsLogin = async (user: AccountLoginSchema) => {
  return await signIn('credentials', {
    ...user,
    redirect: true,
    callbackUrl: '/dashboard',
  })
}

export const handleRegister = async (user: AccountRegistrationSchema) => {
  return await axios.post('/api/users/register', user)
}

export const handleSendVerificationEmail = async (
  user: SendEmailVerificationSchema
) => {
  return await axios.post('/api/users/send-verification-email', user)
}

export const handleVerifyEmailValidationToken = async (
  user: EmailVerificationSchema
) => {
  return await axios.post('/api/users/verify-token', user)
}

export const handleSendPasswordRecoveryEmail = async (
  user: PasswordRecoverySchema
) => {
  return await axios.post('/api/users/password/recover', user)
}
