import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export const config = {
  matcher: ["/admin/:path*"],
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Skip middleware for API routes
  if (path.startsWith("/api")) {
    return NextResponse.next()
  }

  // Skip middleware for login page
  if (path === "/admin/login") {
    return NextResponse.next()
  }

  try {
    const session = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })

    // If no session and trying to access admin pages, redirect to login
    if (!session) {
      const url = new URL("/admin/login", request.url)
      url.searchParams.set("callbackUrl", encodeURI(request.url))
      return NextResponse.redirect(url)
    }

    // If session exists but user is not admin, redirect to homepage
    if (session.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.error("Middleware error:", error)
    // In case of error, redirect to login
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }
}
