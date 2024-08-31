import mongoose from 'mongoose'
const { Schema } = mongoose

export const accountSchema = new Schema({
  userId: {
    type: String,
  },
  type: String,
  provider: String,
  providerAccountId: String,
})

accountSchema.index({ userId: 1 }, { unique: true, sparse: true })

export const AccountModel =
  mongoose.models.Account || mongoose.model('Account', accountSchema)
