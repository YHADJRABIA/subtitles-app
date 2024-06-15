import { AuthFormData } from '@/types/schemas/auth'
import axios from 'axios'
import { signIn } from 'next-auth/react'

export const handleGoogleLogin = async () => {
  await signIn('google', { callbackUrl: '/dashboard' })
}

export const handleCredentialsLogin = async (user: AuthFormData) => {
  await signIn('credentials', {
    ...user,
    redirect: false,
  })
}

export const handleRegister = async (user: AuthFormData) => {
  await axios.post('/api/users/register', user)
}
