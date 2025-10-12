import mongoose from 'mongoose'
const { Schema } = mongoose

const twoFactorTokenSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    trim: true,
  },
  token: {
    type: String,
    required: [true, 'Missing token'],
  },
  expires: {
    type: Date,
    required: [true, 'Missing expiry date'],
  },
})

twoFactorTokenSchema.index({ email: 1, token: 1 }, { unique: true }) // Email-token combination has to be unique

export const TwoFactorTokenModel =
  mongoose.models.TwoFactorToken ||
  mongoose.model('TwoFactorToken', twoFactorTokenSchema)
