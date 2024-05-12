import mongoose from 'mongoose'
const { Schema } = mongoose

const passwordResetTokenSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    trim: true,
    unique: true,
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

passwordResetTokenSchema.index({ email: 1, token: 1 }, { unique: true }) // Email-token combination has to be unique

export const PasswordResetTokenModel =
  mongoose.models.PasswordResetToken ||
  mongoose.model('PasswordResetToken', passwordResetTokenSchema)
