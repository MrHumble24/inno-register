import { type NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Lead from "@/models/Lead"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export const dynamic = "force-dynamic"

// Get all leads
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()
    const leads = await Lead.find({}).sort({ createdAt: -1 })

    return NextResponse.json(leads)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 })
  }
}

// Create a new lead
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase()
    const body = await req.json()

    const lead = await Lead.create(body)

    return NextResponse.json(lead, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 })
  }
}
