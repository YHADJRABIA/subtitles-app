import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Please provide an e-mail.'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password.'],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: Number,
      default: 0, // 0 = user, 1 = admin
    },
    avatar: {
      type: String,
      default: '', // TODO: Add default image url
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  {
    timestamps: true,
  }
)

export const User = mongoose.models.users || mongoose.model('User', userSchema)
