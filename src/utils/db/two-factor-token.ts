import { TwoFactorTokenModel } from '@/models/twoFactorToken.model'
import { getErrorMessage } from '../errors'
import { VerificationResponse } from '@/types/api'

export const getTwoFactorTokenByToken = async (
  token: string
): Promise<VerificationResponse> => {
  try {
    return await TwoFactorTokenModel.findOne({ token })
  } catch (err) {
    console.error(
      'Error getting two-factor token by token:',
      getErrorMessage(err)
    )
  }
}

export const getTwoFactorTokenByEmail = async (
  email: string
): Promise<VerificationResponse> => {
  try {
    return await TwoFactorTokenModel.findOne({ email })
  } catch (err) {
    console.error(
      'Error getting two-factor token by email:',
      getErrorMessage(err)
    )
  }
}

export const deleteTwoFactorTokenById = async (id: string) => {
  try {
    await TwoFactorTokenModel.deleteOne({ _id: id })
  } catch (err) {
    console.error(
      'Error deleting two-factor token by id:',
      getErrorMessage(err)
    )
  }
}

export const getTwoFactorTokenByCode = async (
  code: string
): Promise<VerificationResponse> => {
  try {
    return await TwoFactorTokenModel.findOne({ token: code })
  } catch (err) {
    console.error(
      'Error getting two-factor token by code:',
      getErrorMessage(err)
    )
  }
}

export const getTwoFactorTokenByEmailAndCode = async (
  email: string,
  code: string
): Promise<VerificationResponse> => {
  try {
    return await TwoFactorTokenModel.findOne({ email, token: code })
  } catch (err) {
    console.error(
      'Error getting two-factor token by email and code:',
      getErrorMessage(err)
    )
  }
}
