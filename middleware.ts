import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Check if the path starts with /admin
  const isAdminPath = path.startsWith("/admin")

  // Skip middleware for API routes and non-admin paths
  if (!isAdminPath || path.startsWith("/api")) {
    return NextResponse.next()
  }

  // Skip middleware for login page
  if (path === "/admin/login") {
    return NextResponse.next()
  }

  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // If no session and trying to access admin pages, redirect to login
  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  // If session exists but user is not admin, redirect to homepage
  if (session.role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
