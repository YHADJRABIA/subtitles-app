/* Connection to MongoDB database */
import mongoose from 'mongoose'

const URI = process.env.MONGODB_URI

let isConnected = false
let connectionPromise: Promise<typeof mongoose> | null = null

export const connectDB = async () => {
  if (isConnected) return true

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(URI!)

    mongoose.connection.on('disconnected', () => {
      isConnected = false
      console.warn('MongoDB disconnected')
    })

    mongoose.connection.on('error', err => {
      isConnected = false
      console.error('MongoDB connection error:', err)
    })
  }

  try {
    await connectionPromise

    if (!isConnected) {
      isConnected = true
      console.log('MongoDB connection successful ✓')
    }

    return true
  } catch (err) {
    console.error(
      'MongoDB connection failed ✗. Ensure MongoDB is running.',
      err
    )
    throw err
  }
}
