import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
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

export const User = mongoose.models.User || mongoose.model('User', userSchema)
