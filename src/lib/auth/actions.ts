import {
  AccountLoginSchema,
  AccountRegistrationSchema,
  EmailVerificationSchema,
  PasswordRecoverySchema,
  SendEmailVerificationSchema,
} from '@/types/schemas/auth'
import axios from 'axios'
import { signIn, signOut } from 'next-auth/react'

export const handleLogout = async () => await signOut({ callbackUrl: '/' })

export const handleGoogleLogin = async () => {
  await signIn('google')
}

export const handleCredentialsLogin = async (user: AccountLoginSchema) => {
  // {redirect: false} to disable default redirection. Especially in case of invalid credentials, this might lead to Next-Auth's /api/auth/error page.
  // Instead, we want to process signIn response on same page for UX.
  return await signIn('credentials', { ...user, redirect: false })
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
