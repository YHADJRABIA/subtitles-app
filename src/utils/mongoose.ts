import { UserModel } from '@/models/user.model'

export const getUserByEmail = (email: string) => UserModel.findOne({ email })
