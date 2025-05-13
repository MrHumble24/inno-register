import Link from "next/link"
import { ArrowRight, Globe, GraduationCap, Users, ChevronDown } from "lucide-react"
import { Suspense } from "react"

import { Button } from "@/components/ui/button"
import RegistrationForm from "@/components/registration-form"
import { DynamicCourses } from "@/components/dynamic-courses"
import { DynamicTestimonials } from "@/components/dynamic-testimonials"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ImageCarousel } from "@/components/image-carousel"

// Carousel images
const carouselImages = [
  {
    src: "/images/classroom-1.png",
    alt: "Students in a modern classroom setting",
  },
  {
    src: "/images/classroom-2.png",
    alt: "Teacher helping students with language exercises",
  },
  {
    src: "/images/classroom-3.png",
    alt: "Group of students practicing conversation skills",
  },
  {
    src: "/images/classroom-4.png",
    alt: "Student giving a presentation in English",
  },
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Innovative Centre</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="#about" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="#courses" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Courses
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Testimonials
            </Link>
            <Link href="#contact" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </nav>
          <Button asChild className="hidden md:inline-flex bg-blue-600 hover:bg-blue-700">
            <Link href="#register">Register Now</Link>
          </Button>
          <Button variant="outline" size="icon" className="md:hidden border-gray-200">
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-blue-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-6 fade-in">
                <div className="space-y-4">
                  {/* Carousel added above the Premium Language Education text */}
                  <div className="mb-6 h-[200px] md:h-[250px] lg:h-[300px] w-full rounded-2xl overflow-hidden shadow-lg">
                    <ImageCarousel images={carouselImages} />
                  </div>
                  <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600 font-medium">
                    Premium Language Education
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-gray-900">
                    Want to Learn English?
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl leading-relaxed">
                    Join Innovative Centre and master English with our expert instructors and proven methodology in a
                    premium learning environment.
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 rounded-full">
                    <Link href="#register">Register Now</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-blue-200 text-blue-600 hover:bg-blue-50 rounded-full"
                  >
                    <Link href="#courses">
                      Explore Courses
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="flex justify-center mt-8">
                  <Link href="#about" className="text-blue-600 flex flex-col items-center">
                    <span className="text-sm mb-2">Learn More</span>
                    <ChevronDown className="h-6 w-6 bounce" />
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center slide-in-right">
                <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-8 shadow-xl border border-gray-100">
                  <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-100/50"></div>
                  <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-blue-100/50"></div>
                  <RegistrationForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rest of the page content remains the same */}
        <section id="about" className="w-full py-16 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center slide-up">
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600 font-medium">
                  About Us
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                  Innovative Centre
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We are a premium educational institution dedicated to providing high-quality language learning
                  experiences. Our innovative teaching methods and experienced instructors ensure that you achieve your
                  language goals efficiently.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              <div
                className="flex flex-col items-center space-y-3 rounded-xl border border-gray-100 p-8 shadow-sm bg-white transition-all duration-200 hover:shadow-md hover:-translate-y-1 slide-in-left"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="rounded-full bg-blue-100 p-3">
                  <GraduationCap className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Expert Teachers</h3>
                <p className="text-center text-gray-600">
                  Learn from certified language instructors with years of teaching experience.
                </p>
              </div>
              <div
                className="flex flex-col items-center space-y-3 rounded-xl border border-gray-100 p-8 shadow-sm bg-white transition-all duration-200 hover:shadow-md hover:-translate-y-1 slide-in-left"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="rounded-full bg-blue-100 p-3">
                  <Globe className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Modern Methodology</h3>
                <p className="text-center text-gray-600">
                  Our teaching approach combines traditional techniques with innovative digital tools.
                </p>
              </div>
              <div
                className="flex flex-col items-center space-y-3 rounded-xl border border-gray-100 p-8 shadow-sm bg-white transition-all duration-200 hover:shadow-md hover:-translate-y-1 slide-in-left"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="rounded-full bg-blue-100 p-3">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Small Groups</h3>
                <p className="text-center text-gray-600">
                  We maintain small class sizes to ensure personalized attention for every student.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="courses" className="w-full py-16 md:py-24 lg:py-32 bg-blue-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center slide-up">
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600 font-medium">
                  Our Courses
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                  Premium Language Programs
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover our comprehensive range of language courses designed to meet your specific needs and goals.
                </p>
              </div>
            </div>
            <Suspense fallback={<p className="text-center py-12">Loading courses...</p>}>
              <DynamicCourses />
            </Suspense>
          </div>
        </section>

        <section id="testimonials" className="w-full py-16 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center slide-up">
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600 font-medium">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                  What Our Students Say
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from our students about their experiences learning at Innovative Centre.
                </p>
              </div>
            </div>
            <Suspense fallback={<p className="text-center py-12">Loading testimonials...</p>}>
              <DynamicTestimonials />
            </Suspense>
          </div>
        </section>

        <section id="register" className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-blue-600 to-blue-700">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-6 slide-in-left">
                <div className="space-y-3">
                  <div className="inline-block rounded-full bg-white/20 px-3 py-1 text-sm text-white font-medium">
                    Register Now
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                    Start Your Language Journey Today
                  </h2>
                  <p className="max-w-[600px] text-blue-100 md:text-xl">
                    Fill out the form to register for our premium courses. Our team will contact you to discuss your
                    language learning goals and help you choose the right program.
                  </p>
                </div>
                <ul className="grid gap-3 text-blue-50">
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-white"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Flexible class schedules</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-white"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Online and in-person options</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-white"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Free placement test</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center slide-in-right">
                <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-8 shadow-2xl">
                  <RegistrationForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-8 bg-white">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-blue-600" />
            <p className="text-sm text-gray-500">© 2025 Innovative Centre. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
      <ScrollToTop />
    </div>
  )
}
