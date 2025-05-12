import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  role: {
    type: String,
    enum: ["admin"],
    default: "admin",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Hash password before saving
UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    console.error("Error hashing password:", error)
    next(error as Error)
  }
})

// Compare entered password with stored hash
UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  try {
    return await bcrypt.compare(enteredPassword, this.password)
  } catch (error) {
    console.error("Error comparing passwords:", error)
    return false
  }
}

// Check if the model already exists to prevent overwriting
export default mongoose.models.User || mongoose.model("User", UserSchema)
