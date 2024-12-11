import mongoose from 'mongoose'
const { Schema } = mongoose

const verificationCodeSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    trim: true,
  },
  code: {
    type: String,
    required: [true, 'Missing code'],
  },
  expires: {
    type: Date,
    required: [true, 'Missing expiry date'],
  },
})

verificationCodeSchema.index({ email: 1, code: 1 }, { unique: true }) // Email-code combination has to be unique

export const VerificationCodeModel =
  mongoose.models.VerificationCode ||
  mongoose.model('VerificationCode', verificationCodeSchema)
