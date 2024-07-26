import { PasswordResetTokenModel } from '@/models/passwordResetToken.model'
import { getErrorMessage } from '../errors'

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const existingToken = await PasswordResetTokenModel.findOne({ token })
    return existingToken
  } catch (err) {
    console.error(
      'Error getting password reset token by token:',
      getErrorMessage(err)
    )
  }
}

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const existingToken = await PasswordResetTokenModel.findOne({ email })
    return existingToken
  } catch (err) {
    console.error(
      'Error getting password reset token by email:',
      getErrorMessage(err)
    )
  }
}

export const deletePasswordResetTokenById = async (id: string) => {
  try {
    await PasswordResetTokenModel.deleteOne({ _id: id })
  } catch (err) {
    console.error(
      'Error deleting password reset token by id:',
      getErrorMessage(err)
    )
  }
}
