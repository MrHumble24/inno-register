"use client"

import { useEffect, useState } from "react"
import { BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Fallback data
const FALLBACK_COURSES = [
  {
    _id: "course1",
    title: "Beginner English",
    description:
      "Perfect for those starting their English language journey. Focus on basic vocabulary and simple conversations.",
    color: "blue",
    order: 0,
  },
  {
    _id: "course2",
    title: "Intermediate English",
    description:
      "Build on your foundation with more complex grammar, expanded vocabulary, and practical conversation skills.",
    color: "green",
    order: 1,
  },
  {
    _id: "course3",
    title: "Advanced English",
    description:
      "Perfect your English with advanced grammar, idiomatic expressions, and professional communication skills.",
    color: "purple",
    order: 2,
  },
]

export function DynamicCourses() {
  const [courses, setCourses] = useState(FALLBACK_COURSES)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses")
        if (!response.ok) {
          throw new Error("Failed to fetch courses")
        }
        const data = await response.json()
        if (data && data.length > 0) {
          setCourses(data)
        }
      } catch (err) {
        console.error("Error fetching courses:", err)
        setError("Failed to load courses. Using default data.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const getGradient = (color: string) => {
    switch (color) {
      case "blue":
        return "from-blue-400 to-blue-500"
      case "green":
        return "from-green-400 to-green-500"
      case "purple":
        return "from-purple-400 to-purple-500"
      case "orange":
        return "from-orange-400 to-orange-500"
      case "red":
        return "from-red-400 to-red-500"
      case "teal":
        return "from-teal-400 to-teal-500"
      default:
        return "from-blue-400 to-blue-500"
    }
  }

  if (isLoading) {
    return <p className="text-center col-span-3">Loading courses...</p>
  }

  if (error) {
    return (
      <div className="text-center col-span-3">
        <p className="text-amber-600 mb-2">{error}</p>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-4 md:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} getGradient={getGradient} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-4 md:grid-cols-3">
      {courses.length === 0 ? (
        <p className="text-center col-span-3">No courses available at the moment. Check back soon!</p>
      ) : (
        courses.map((course) => <CourseCard key={course._id} course={course} getGradient={getGradient} />)
      )}
    </div>
  )
}

function CourseCard({ course, getGradient }: { course: any; getGradient: (color: string) => string }) {
  return (
    <Card className="overflow-hidden rounded-xl border-0 shadow-lg">
      <div className={`h-48 w-full bg-gradient-to-r ${getGradient(course.color)} flex items-center justify-center`}>
        <BookOpen className="h-16 w-16 text-white" />
      </div>
      <CardContent className="p-8">
        <h3 className="text-2xl font-bold text-gray-900">{course.title}</h3>
        <p className="mt-3 text-gray-600">{course.description}</p>
        <Button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 rounded-full">Learn More</Button>
      </CardContent>
    </Card>
  )
}
