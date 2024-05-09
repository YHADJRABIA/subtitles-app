import mongoose from 'mongoose'
const { Schema } = mongoose

export const accountSchema = new Schema({
  userId: {
    type: String,
    unique: true,
  },
  type: String,
  provider: String,
  providerAccountId: String,
})

export const AccountModel =
  mongoose.models.Account || mongoose.model('Account', accountSchema)
