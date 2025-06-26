import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Users, BookOpen, TrendingUp } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to MentorHub</h1>
          <p className="text-xl text-gray-600 mb-8">
            A comprehensive platform for coding mentorship and progress tracking
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="p-8 text-center hover:shadow-lg transition-shadow">
            <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-4">For Mentors</h2>
            <p className="text-gray-600 mb-6">
              Manage your mentees, track their progress, and provide personalized guidance
            </p>
            <Link href="/mentor">
              <Button size="lg" className="w-full">
                Enter Mentor Dashboard
              </Button>
            </Link>
          </Card>

          <Card className="p-8 text-center hover:shadow-lg transition-shadow">
            <BookOpen className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-4">For Mentees</h2>
            <p className="text-gray-600 mb-6">Track your learning journey, complete tasks, and level up your skills</p>
            <Link href="/mentee">
              <Button size="lg" className="w-full">
                Enter Mentee Dashboard
              </Button>
            </Link>
          </Card>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
            <TrendingUp className="h-5 w-5" />
            <span>Built with modern design principles and accessibility in mind</span>
          </div>
          <p className="text-sm text-gray-500">
            8px grid system • AA contrast ratios • Keyboard navigation • Gamified learning
          </p>
        </div>
      </div>
    </div>
  )
}
