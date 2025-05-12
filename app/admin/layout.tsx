import type React from "react"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    const session = await getServerSession(authOptions)

    // Check if the user is on the login page
    const isLoginPage = children.props?.childProp?.segment === "login"

    // If not authenticated and not on login page, redirect to login
    if (!session && !isLoginPage) {
      redirect("/admin/login")
    }

    // If authenticated and on login page, redirect to admin dashboard
    if (session && isLoginPage) {
      redirect("/admin")
    }

    return <>{children}</>
  } catch (error) {
    console.error("Error in admin layout:", error)

    // If there's an error and we're not on the login page, redirect to login
    const isLoginPage = children.props?.childProp?.segment === "login"
    if (!isLoginPage) {
      redirect("/admin/login?error=ServerError")
    }

    return <>{children}</>
  }
}
