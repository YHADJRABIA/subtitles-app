import { TwoFactorConfirmationModel } from '@/models/twoFactorConfirmation.model'
import { getErrorMessage } from '../errors'
import { VerificationResponse } from '@/types/api'

export const getTwoFactorConfirmationByUserId = async (
  userId: string
): Promise<VerificationResponse> => {
  try {
    return await TwoFactorConfirmationModel.findOne({ userId })
  } catch (err) {
    console.error(
      'Error getting two-factor token by token:',
      getErrorMessage(err)
    )
  }
}

export const createTwoFactorConfirmation = async (userId: string) => {
  try {
    return await TwoFactorConfirmationModel.create({ userId })
  } catch (err) {
    console.error(
      'Error creating two-factor confirmation:',
      getErrorMessage(err)
    )
  }
}

export const deleteTwoFactorConfirmationById = async (id: string) => {
  try {
    await TwoFactorConfirmationModel.deleteOne({ _id: id })
  } catch (err) {
    console.error(
      'Error deleting two-factor confirmation by id:',
      getErrorMessage(err)
    )
  }
}
