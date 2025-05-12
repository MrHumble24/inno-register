import mongoose from "mongoose"

const LeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "Please provide a phone number"],
    trim: true,
  },
  age: {
    type: String,
    required: [true, "Please provide an age"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "Please provide a city"],
    trim: true,
  },
  status: {
    type: String,
    enum: ["new", "contacted", "converted", "closed"],
    default: "new",
  },
  notes: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema)
