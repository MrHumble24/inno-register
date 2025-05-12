"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, MessageSquare } from "lucide-react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    leads: "Loading...",
    courses: "Loading...",
    testimonials: "Loading...",
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch leads count
        const leadsRes = await fetch("/api/leads")
        const leadsData = await leadsRes.json()

        // Fetch courses count
        const coursesRes = await fetch("/api/courses")
        const coursesData = await coursesRes.json()

        // Fetch testimonials count
        const testimonialsRes = await fetch("/api/testimonials")
        const testimonialsData = await testimonialsRes.json()

        setStats({
          leads: leadsData.length.toString(),
          courses: coursesData.length.toString(),
          testimonials: testimonialsData.length.toString(),
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
        setStats({
          leads: "Error",
          courses: "Error",
          testimonials: "Error",
        })
      }
    }

    fetchStats()
  }, [])

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-500">Welcome to the Innovative Centre admin panel.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <Users className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.leads}</div>
              <p className="text-xs text-gray-500">Manage your leads</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Courses</CardTitle>
              <BookOpen className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.courses}</div>
              <p className="text-xs text-gray-500">Manage your courses</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
              <MessageSquare className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.testimonials}</div>
              <p className="text-xs text-gray-500">Manage your testimonials</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
