"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

// Fallback data
const FALLBACK_TESTIMONIALS = [
  {
    _id: "testimonial1",
    name: "John Doe",
    course: "Beginner Course",
    text: "The teaching methods at Innovative Centre made learning English enjoyable and effective. I've made significant progress in just a few months.",
    initials: "JD",
    order: 0,
  },
  {
    _id: "testimonial2",
    name: "Jane Smith",
    course: "Intermediate Course",
    text: "The small class sizes and personalized attention helped me overcome my fear of speaking English. Now I feel confident in my communication skills.",
    initials: "JS",
    order: 1,
  },
  {
    _id: "testimonial3",
    name: "Robert Johnson",
    course: "Advanced Course",
    text: "Thanks to Innovative Centre, I was able to pass my English proficiency exam with flying colors. The instructors are knowledgeable and supportive.",
    initials: "RJ",
    order: 2,
  },
]

export function DynamicTestimonials() {
  const [testimonials, setTestimonials] = useState(FALLBACK_TESTIMONIALS)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials")
        if (!response.ok) {
          throw new Error("Failed to fetch testimonials")
        }
        const data = await response.json()
        if (data && data.length > 0) {
          setTestimonials(data)
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err)
        setError("Failed to load testimonials. Using default data.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  if (isLoading) {
    return <p className="text-center col-span-3">Loading testimonials...</p>
  }

  if (error) {
    return (
      <div className="text-center col-span-3">
        <p className="text-amber-600 mb-2">{error}</p>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial._id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-4 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.length === 0 ? (
        <p className="text-center col-span-3">No testimonials available at the moment. Check back soon!</p>
      ) : (
        testimonials.map((testimonial) => <TestimonialCard key={testimonial._id} testimonial={testimonial} />)
      )}
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: any }) {
  return (
    <Card className="p-8 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-lg font-bold text-blue-600">{testimonial.initials}</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{testimonial.name}</h3>
            <p className="text-sm text-gray-500">{testimonial.course}</p>
          </div>
        </div>
        <p className="text-gray-600">{testimonial.text}</p>
      </div>
    </Card>
  )
}
