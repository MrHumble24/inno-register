import { type NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Course from "@/models/Course"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// Get a single course
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()
    const course = await Course.findById(params.id)

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    return NextResponse.json(course)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 })
  }
}

// Update a course
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()
    const body = await req.json()

    const course = await Course.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    })

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    return NextResponse.json(course)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 })
  }
}

// Delete a course
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()
    const course = await Course.findByIdAndDelete(params.id)

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Course deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 })
  }
}
