import { type NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Course from "@/models/Course"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export const dynamic = "force-dynamic"

// Get all courses
export async function GET(req: NextRequest) {
  try {
    const db = await connectToDatabase()
    if (!db) {
      return NextResponse.json([], { status: 200 })
    }

    const courses = await Course.find({})
      .sort({ order: 1 })
      .catch(() => [])
    return NextResponse.json(courses)
  } catch (error) {
    console.error("Error fetching courses:", error)
    return NextResponse.json([], { status: 200 })
  }
}

// Create a new course
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()
    const body = await req.json()

    const course = await Course.create(body)

    return NextResponse.json(course, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 })
  }
}
