import { VerificationTokenModel } from '@/models/verificationToken.model'
import { getErrorMessage } from '../errors'

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await VerificationTokenModel.findOne({ email })
    return verificationToken
  } catch (err) {
    console.error(
      'Error getting verification token by email:',
      getErrorMessage(err)
    )
  }
}

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await VerificationTokenModel.findOne({ token })
    return verificationToken
  } catch (err) {
    console.error(
      'Error getting verification token by token:',
      getErrorMessage(err)
    )
  }
}

export const deleteVerificationTokenById = async (id: string) => {
  try {
    await VerificationTokenModel.deleteOne({ _id: id })
  } catch (err) {
    console.error(
      'Error deleting verification token by id:',
      getErrorMessage(err)
    )
  }
}

export const deleteVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await VerificationTokenModel.deleteOne({ email })
    return verificationToken
  } catch (err) {
    console.error(
      'Error deleting verification token by email:',
      getErrorMessage(err)
    )
  }
}
