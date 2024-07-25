import { UserModel } from '@/models/user.model'

export const getUserByEmail = async (email: string) =>
  await UserModel.findOne({ email })

export const getUserById = async (id: string) => await UserModel.findById(id)

export const deleteUserById = async (id: string) => {
  await UserModel.findByIdAndDelete(id)
}

export const updateNameById = async (id: string, name: string) => {
  await UserModel.updateOne({ _id: id }, { name })
}
