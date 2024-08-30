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
import { NextResponse } from 'next/server'

export const handleLogout = async () => {
  try {
    return await signOut({ callbackUrl: '/' })
  } catch (err) {
    console.error('Error Logging out user:', getErrorMessage(err))
    throw err
  }
}

export const handleGoogleLogin = async () => {
  try {
    return await signIn('google')
  } catch (err) {
    console.error('Error Logging in with Google:', getErrorMessage(err))
    throw err
  }
}

export const handleCredentialsLogin = async (user: AccountLoginSchema) => {
  // {redirect: false} to disable default redirection. Especially in case of invalid credentials, this might lead to Next-Auth's /api/auth/error page.
  // Instead, we want to process signIn response on same page for UX.

  try {
    const res = await signIn('credentials', { ...user, redirect: false })

    if (res?.ok && res.error !== null) {
      return NextResponse.json(
        { message: res.error, success: false },
        { status: 400 }
      )
    } else if (res?.error) {
      throw new Error(res.error)
    }
  } catch (err) {
    console.error('Error signing in user:', getErrorMessage(err)) // TODO: fix redirect to /api/auth/error after too many failed logins
    throw err
  }
}

export const handleRegister = async (user: AccountRegistrationSchema) => {
  try {
    return await axios.post('/api/users/register', user)
  } catch (err) {
    console.error('Error creating user:', getErrorMessage(err))
    throw err
  }
}

export const handleSendVerificationEmail = async (
  user: SendEmailVerificationSchema
) => {
  try {
    return await axios.post('/api/users/send-verification-email', user)
  } catch (err) {
    console.error('Error sending verificaiton email:', getErrorMessage(err))
    throw err
  }
}

export const handleVerifyEmailValidationToken = async (
  user: EmailVerificationSchema
) => {
  try {
    return await axios.post('/api/users/verify-token', user)
  } catch (err) {
    console.error('Error verifying validaiton token:', getErrorMessage(err))
    throw err
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
    throw err
  }
}
