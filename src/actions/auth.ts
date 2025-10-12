import { DEFAULT_LOGOUT_REDIRECT_ROUTE } from '@/routes/routes'
import { APIResponse } from '@/types/api'
import {
  AccountLoginSchema,
  AccountRegistrationSchema,
  EmailVerificationByTokenSchema,
  PasswordRecoverySchema,
  PasswordResetSchema,
  TwoFactorVerificationSchema,
} from '@/types/schemas/auth'
import { SendEmailVerificationSchema } from '@/types/schemas/general'
import { getErrorMessage } from '@/utils/errors'
import { isClient } from '@/utils/general'
import { TWO_FACTOR_OTP_SENT } from '@/utils/constants'
import axios from 'axios'
import { signIn, signOut } from 'next-auth/react'

// Logout & redirect
export const handleLogout = async () => {
  try {
    if (isClient) localStorage.removeItem('otp-modal') // Clear pending email update on logout
    return await signOut({ callbackUrl: DEFAULT_LOGOUT_REDIRECT_ROUTE })
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

export const handleCredentialsLogin = async (
  user: AccountLoginSchema
): Promise<{ data: APIResponse } | null> => {
  try {
    const res = await signIn('credentials', { ...user, redirect: false })

    if (res?.ok && !res.error) {
      return {
        data: {
          message: '',
          success: true,
        },
      }
    } else if (res?.error) {
      // Handle 2FA requirement
      if (res.error === TWO_FACTOR_OTP_SENT) {
        return {
          data: {
            message: '2FA code sent to your email',
            success: true,
            requiresUserAction: true,
          },
        }
      }
      throw new Error(res.error)
    }
    return null
  } catch (err) {
    console.error('Error signing in user:', getErrorMessage(err))
    throw err
  }
}

export const handleRegister = async (
  user: AccountRegistrationSchema
): Promise<{ data: APIResponse }> => {
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
    console.error('Error sending verification email:', getErrorMessage(err))
    throw err
  }
}

export const handleVerifyEmailValidationToken = async (
  user: EmailVerificationByTokenSchema
) => {
  try {
    return await axios.post('/api/users/verify-token', user)
  } catch (err) {
    console.error('Error verifying validation token:', getErrorMessage(err))
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

export const handleResetPassword = async (user: PasswordResetSchema) => {
  try {
    return await axios.post('/api/users/password/reset', user)
  } catch (err) {
    console.error('Error resetting password:', getErrorMessage(err))
    throw err
  }
}

export const handleVerifyTwoFactorCode = async (
  data: TwoFactorVerificationSchema
) => {
  try {
    return await axios.post('/api/users/verify-2fa', data)
  } catch (err) {
    console.error('Error verifying 2FA code:', getErrorMessage(err))
    throw err
  }
}
