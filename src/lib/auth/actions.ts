import {
  AccountLoginSchema,
  AccountRegistrationSchema,
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
    redirect: false,
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
