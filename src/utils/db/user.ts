import { UserModel } from '@/models/user.model'
import { getErrorMessage } from '../errors'
import { UserAPIType } from '@/types/user'

export const getUserByEmail = async (email: string) => {
  try {
    return await UserModel.findOne({ email })
  } catch (err) {
    console.error('Error getting user by email:', getErrorMessage(err))
  }
}

export const getUserById = async (id: string) => {
  try {
    return await UserModel.findById(id)
  } catch (err) {
    console.error('Error finding user by id:', getErrorMessage(err))
  }
}

export const deleteUserById = async (id: string) => {
  try {
    return await UserModel.findByIdAndDelete(id)
  } catch (err) {
    console.error('Error deleting user by id:', getErrorMessage(err))
  }
}

export const updateNameById = async (id: string, name: string) => {
  try {
    return await UserModel.updateOne({ _id: id }, { name })
  } catch (err) {
    console.error("Error updating user's name by id:", getErrorMessage(err))
  }
}

export const verifyEmailByUserId = async (id: string) => {
  try {
    return await UserModel.updateOne({ _id: id }, { emailVerified: new Date() })
  } catch (err) {
    console.error(
      "Error updating user's verifiedEmail by id:",
      getErrorMessage(err)
    )
  }
}

export const restrictedUserFields = [
  'createdAt',
  'email',
  'password',
  'role',
  'emailVerified',
]

export const updateUserById = async (
  id: string,
  updateData: Partial<UserAPIType>
) => {
  try {
    const allowedFields = Object.fromEntries(
      Object.entries(updateData).filter(
        ([key]) => !restrictedUserFields.includes(key)
      )
    )

    if (!Object.keys(allowedFields).length) {
      console.error('Error updating user by id: No valid fields to update.')
      return null
    }

    return await UserModel.findByIdAndUpdate(id, allowedFields, {
      new: true,
      runValidators: true,
    })
  } catch (err) {
    console.error('Error updating user:', getErrorMessage(err))
    return null
  }
}
