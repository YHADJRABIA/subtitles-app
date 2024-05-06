import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: null,
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
    image: {
      type: String,
      default: null,
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

export const UserModel =
  mongoose.models.User || mongoose.model('User', userSchema)
