import { PasswordResetTokenModel } from '@/models/passwordResetToken.model'
import { VerificationTokenModel } from '@/models/verificationToken.model'
import { deletePasswordResetTokenById, getPasswordResetTokenByEmail } from '@/utils/db/password-reset-token'
import {
  deleteVerificationTokenById,
  getVerificationTokenByEmail,
} from '@/utils/db/verification-token'
import { generateUUIDToken } from '@/utils/random'

export const generateVerificationToken = async (email: string) => {
  // Generate random token
  const { token, expirationDate } = generateUUIDToken() // Not using JWT because storing data in the token is irrelevant here. Token expires in 1 hour

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
  // Generate random token
  const { token, expirationDate } = generateUUIDToken()

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
}
