import mongoose from 'mongoose'
const { Schema } = mongoose

const twoFactorConfirmationSchema = new Schema({
  userId: {
    type: String,
    required: [true, 'Please provide a user ID'],
    ref: 'User',
  },
})

twoFactorConfirmationSchema.index({ userId: 1 }, { unique: true })

export const TwoFactorConfirmationModel =
  mongoose.models.TwoFactorConfirmation ||
  mongoose.model('TwoFactorConfirmation', twoFactorConfirmationSchema)
