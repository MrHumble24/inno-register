"use client"

import { useEffect } from "react"
import Link from "next/link"
import { GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Admin error:", error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <GraduationCap className="mx-auto h-16 w-16 text-blue-600" />
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="text-gray-600">
          We're sorry, but there was an error loading the admin panel. Please try again or contact support if the
          problem persists.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center">
          <Button onClick={reset} variant="outline">
            Try again
          </Button>
          <Button asChild>
            <Link href="/admin/login">Return to login</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
