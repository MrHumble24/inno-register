import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Course from "@/models/Course"
import Testimonial from "@/models/Testimonial"

// This endpoint will seed the database with initial data
export async function GET() {
  try {
    const db = await connectToDatabase()
    if (!db) {
      return NextResponse.json({ error: "Database connection failed" }, { status: 500 })
    }

    // Check if courses already exist
    const coursesCount = await Course.countDocuments()

    if (coursesCount === 0) {
      // Seed courses
      await Course.create([
        {
          title: "Beginner English",
          description:
            "Perfect for those starting their English language journey. Focus on basic vocabulary and simple conversations.",
          color: "blue",
          order: 0,
        },
        {
          title: "Intermediate English",
          description:
            "Build on your foundation with more complex grammar, expanded vocabulary, and practical conversation skills.",
          color: "green",
          order: 1,
        },
        {
          title: "Advanced English",
          description:
            "Perfect your English with advanced grammar, idiomatic expressions, and professional communication skills.",
          color: "purple",
          order: 2,
        },
      ])
    }

    // Check if testimonials already exist
    const testimonialsCount = await Testimonial.countDocuments()

    if (testimonialsCount === 0) {
      // Seed testimonials
      await Testimonial.create([
        {
          name: "John Doe",
          course: "Beginner Course",
          text: "The teaching methods at Innovative Centre made learning English enjoyable and effective. I've made significant progress in just a few months.",
          initials: "JD",
          order: 0,
        },
        {
          name: "Jane Smith",
          course: "Intermediate Course",
          text: "The small class sizes and personalized attention helped me overcome my fear of speaking English. Now I feel confident in my communication skills.",
          initials: "JS",
          order: 1,
        },
        {
          name: "Robert Johnson",
          course: "Advanced Course",
          text: "Thanks to Innovative Centre, I was able to pass my English proficiency exam with flying colors. The instructors are knowledgeable and supportive.",
          initials: "RJ",
          order: 2,
        },
      ])
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
      coursesAdded: coursesCount === 0 ? 3 : 0,
      testimonialsAdded: testimonialsCount === 0 ? 3 : 0,
    })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 })
  }
}
