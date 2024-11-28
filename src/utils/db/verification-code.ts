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

export const deleteVerificationCodeById = async (id: string) => {
  try {
    await VerificationCodeModel.deleteOne({ _id: id })
  } catch (err) {
    console.error(
      'Error deleting verification code by id:',
      getErrorMessage(err)
    )
  }
}
