import { VerificationCodeModel } from '@/models/verificationCode.model'
import {
  deleteVerificationCodeById,
  getVerificationCodeByEmail,
} from '@/utils/db/verification-code'
import { generateNDigitCode } from '@/utils/random'

const { EMAIL_VERIFICATION_CODE_LIFETIME_HOURS } = process.env

export const generateVerificationCode = async (email: string) => {
  // Generate random code
  const { code, expirationDate } = generateNDigitCode(
    Number(EMAIL_VERIFICATION_CODE_LIFETIME_HOURS)
  )

  // Check if existing code already sent for this email to delete it
  const existingCode = await getVerificationCodeByEmail(email)

  if (existingCode) {
    await deleteVerificationCodeById(existingCode.id)
  }

  // Create verification code
  const verificationCode = await VerificationCodeModel.create({
    email,
    code,
    expires: new Date(expirationDate),
  })

  return verificationCode
}
