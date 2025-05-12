import { type NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Testimonial from "@/models/Testimonial"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// Get all testimonials
export async function GET(req: NextRequest) {
  try {
    const db = await connectToDatabase()
    if (!db) {
      return NextResponse.json([], { status: 200 })
    }

    const testimonials = await Testimonial.find({})
      .sort({ order: 1 })
      .catch(() => [])
    return NextResponse.json(testimonials)
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return NextResponse.json([], { status: 200 })
  }
}

// Create a new testimonial
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()
    const body = await req.json()

    const testimonial = await Testimonial.create(body)

    return NextResponse.json(testimonial, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 })
  }
}
