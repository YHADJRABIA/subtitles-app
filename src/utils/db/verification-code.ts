import { VerificationCodeModel } from '@/models/verificationCode.model'
import { getErrorMessage } from '../errors'

export const getVerificationCodeByEmail = async (email: string) => {
  try {
    const verificationCode = await VerificationCodeModel.findOne({ email })
    return verificationCode
  } catch (err) {
    console.error(
      'Error getting verification code by email:',
      getErrorMessage(err)
    )
  }
}
