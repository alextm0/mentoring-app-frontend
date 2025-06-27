import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Users, BookOpen, TrendingUp, LogIn, UserPlus } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header with Authentication */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-primary">MentorHub</h1>
          </div>
          <div className="flex gap-3">
            <Link href="/login">
              <Button variant="outline" size="sm">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Sign Up
              </Button>
            </Link>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Connect, Learn, Grow</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            A comprehensive platform for coding mentorship and progress tracking
          </p>
        </div>

        {/* Get Started Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 mb-12 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Get Started in 3 Easy Steps</h3>
            <p className="text-gray-600 dark:text-gray-300">Join thousands of learners and mentors already on their journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <UserPlus className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-semibold mb-2 dark:text-gray-100">1. Create Account</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Sign up as a mentor or mentee</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-semibold mb-2 dark:text-gray-100">2. Connect</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Find your perfect mentor or mentee match</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="font-semibold mb-2 dark:text-gray-100">3. Grow Together</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Track progress and achieve goals</p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/signup">
              <Button size="lg" className="mr-4">
                Start Your Journey
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Demo Access Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="p-8 text-center hover:shadow-lg transition-shadow">
            <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-4">For Mentors</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Manage your mentees, track their progress, and provide personalized guidance
            </p>
            <div className="space-y-3">
              <Link href="/mentor">
                <Button size="lg" className="w-full">
                  Demo Mentor Dashboard
                </Button>
              </Link>
              <p className="text-xs text-gray-500 dark:text-gray-400">No login required for demo</p>
            </div>
          </Card>

          <Card className="p-8 text-center hover:shadow-lg transition-shadow">
            <BookOpen className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-4">For Mentees</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Track your learning journey, complete tasks, and level up your skills</p>
            <div className="space-y-3">
              <Link href="/mentee">
                <Button size="lg" className="w-full">
                  Demo Mentee Dashboard
                </Button>
              </Link>
              <p className="text-xs text-gray-500 dark:text-gray-400">No login required for demo</p>
            </div>
          </Card>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300 mb-4">
            <TrendingUp className="h-5 w-5" />
            <span>Built with modern design principles and accessibility in mind</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            8px grid system • AA contrast ratios • Keyboard navigation • Gamified learning
          </p>
        </div>
      </div>
    </div>
  )
}
