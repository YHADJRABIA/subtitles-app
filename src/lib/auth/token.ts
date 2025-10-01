import { PasswordResetTokenModel } from '@/models/passwordResetToken.model'
import { VerificationTokenModel } from '@/models/verificationToken.model'
import { TwoFactorTokenModel } from '@/models/twoFactorToken.model'
import {
  deletePasswordResetTokenById,
  getPasswordResetTokenByEmail,
} from '@/utils/db/password-reset-token'
import {
  deleteVerificationTokenById,
  getVerificationTokenByEmail,
} from '@/utils/db/verification-token'
import {
  deleteTwoFactorTokenById,
  getTwoFactorTokenByEmail,
} from '@/utils/db/two-factor-token'
import { generateNDigitCode, generateUUIDToken } from '@/utils/random'

const {
  EMAIL_VERIFICATION_TOKEN_LIFETIME_HOURS,
  EMAIL_VERIFICATION_CODE_LIFETIME_MINUTES,
  PASSWORD_RESET_TOKEN_LIFETIME_HOURS,
} = process.env

export const generateVerificationToken = async (email: string) => {
  // Generate random token
  const { token, expirationDate } = generateUUIDToken(
    Number(EMAIL_VERIFICATION_TOKEN_LIFETIME_HOURS)
  ) // Not using JWT because storing data in the token is irrelevant here. Token expires in 24 hours

  // Check if existing token already sent for this email to delete it
  const existingToken = await getVerificationTokenByEmail(email)

  if (existingToken) {
    await deleteVerificationTokenById(existingToken.id)
  }

  // Create verification token
  const verificationToken = await VerificationTokenModel.create({
    email,
    token,
    expires: new Date(expirationDate),
  })

  return verificationToken
}

export const generatePasswordResetToken = async (email: string) => {
  // Generate random token, valid for 2 hours
  const { token, expirationDate } = generateUUIDToken(
    Number(PASSWORD_RESET_TOKEN_LIFETIME_HOURS)
  )

  // Check if existing token already sent for this email to delete it
  const existingToken = await getPasswordResetTokenByEmail(email)

  if (existingToken) {
    await deletePasswordResetTokenById(existingToken.id)
  }

  // Create password reset token
  const passwordResetToken = await PasswordResetTokenModel.create({
    email,
    token,
    expires: new Date(expirationDate),
  })

  return passwordResetToken
}

export const generateTwoFactorToken = async (email: string) => {
  const { code, expirationDate } = generateNDigitCode(
    Number(EMAIL_VERIFICATION_CODE_LIFETIME_MINUTES)
  )

  const existingToken = await getTwoFactorTokenByEmail(email)

  if (existingToken) {
    await deleteTwoFactorTokenById(existingToken.id)
  }

  const twoFactorToken = await TwoFactorTokenModel.create({
    email,
    token: code,
    expires: new Date(expirationDate),
  })

  return twoFactorToken
}
