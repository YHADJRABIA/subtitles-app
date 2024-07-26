import {
  AccountLoginSchema,
  AccountRegistrationSchema,
  EmailVerificationSchema,
  PasswordRecoverySchema,
  SendEmailVerificationSchema,
} from '@/types/schemas/auth'
import { getErrorMessage } from '@/utils/errors'
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
  try {
    return await axios.post('/api/users/register', user)
  } catch (err) {
    console.error('Error creating user:', getErrorMessage(err))
  }
}

export const handleSendVerificationEmail = async (
  user: SendEmailVerificationSchema
) => {
  try {
    return await axios.post('/api/users/send-verification-email', user)
  } catch (err) {
    console.error('Error sending verificaiton email:', getErrorMessage(err))
  }
}

export const handleVerifyEmailValidationToken = async (
  user: EmailVerificationSchema
) => {
  try {
    return await axios.post('/api/users/verify-token', user)
  } catch (err) {
    console.error('Error verifying validaiton token:', getErrorMessage(err))
  }
}

export const handleSendPasswordRecoveryEmail = async (
  user: PasswordRecoverySchema
) => {
  try {
    return await axios.post('/api/users/password/recover', user)
  } catch (err) {
    console.error(
      'Error sending password recovery email:',
      getErrorMessage(err)
    )
  }
}
