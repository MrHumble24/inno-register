import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.warn("Please define the MONGODB_URI environment variable")
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }

    if (!MONGODB_URI) {
      console.error("MONGODB_URI is not defined")
      return null
    }

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("Connected to MongoDB")
        return mongoose
      })
      .catch((error) => {
        console.error("MongoDB connection error:", error)
        cached.promise = null
        return null
      })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    console.error("Failed to connect to MongoDB:", e)
    return null
  }

  return cached.conn
}

export default connectToDatabase
