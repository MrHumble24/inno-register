import mongoose from "mongoose"

const TestimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
  },
  course: {
    type: String,
    required: [true, "Please provide a course"],
    trim: true,
  },
  text: {
    type: String,
    required: [true, "Please provide a testimonial text"],
    trim: true,
  },
  initials: {
    type: String,
    required: [true, "Please provide initials"],
    trim: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema)
