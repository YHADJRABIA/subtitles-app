/* Connection to MongoDB database */
import mongoose from 'mongoose'

const URI = process.env.MONGODB_URI

const isConnected = mongoose.connection.readyState === 1

export const connectDB = async () => {
  if (isConnected) return true

  try {
    await mongoose.connect(URI!)
    const connection = mongoose.connection

    connection.on('connected', () => {
      console.log('MongoDB connection successful ✓')
    })

    connection.on('error', err => {
      console.error(
        `MongoDB connection failed ✗. Ensure MongoDB is running. ${err}`
      )
      process.exit(1)
    })
  } catch (err) {
    console.error(`Something went wrong ${err}`)
  }
}
