import mongoose from 'mongoose'
import { accountSchema } from './account.model'
const { Schema } = mongoose

const userSchema = new Schema(
  {
    name: String,

    email: {
      type: String,
      required: [true, 'Please provide an email'],
      trim: true,
      unique: true,
    },

    password: {
      type: String,
    },

    emailVerified: Date,

    lastLogin: Date,

    role: {
      type: Number,
      default: 0, // 0 = user, 1 = admin
    },

    image: String,

    accounts: accountSchema,
  },
  {
    timestamps: true,
  }
)

export const UserModel =
  mongoose.models.User || mongoose.model('User', userSchema)
