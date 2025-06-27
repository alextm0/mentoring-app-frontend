"use client"

import { useState } from "react"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true)
    setError("")

    try {
      // Simulate API call - replace with actual authentication logic
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock login validation
      if (email === "mentor@test.com" && password === "password") {
        // Redirect to mentor dashboard
        window.location.href = "/mentor"
      } else if (email === "mentee@test.com" && password === "password") {
        // Redirect to mentee dashboard
        window.location.href = "/mentee"
      } else {
        throw new Error("Invalid credentials")
      }
      
    } catch (err) {
      setError("Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">MentorHub</h1>
          <p className="text-muted-foreground mt-2">Connect, Learn, Grow</p>
        </div>
        
        <LoginForm 
          onLogin={handleLogin}
          isLoading={isLoading}
          error={error}
        />

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p className="mb-2 font-medium">Demo accounts:</p>
          <div className="space-y-1 text-xs">
            <p>Mentor: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">mentor@test.com</code> / <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">password</code></p>
            <p>Mentee: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">mentee@test.com</code> / <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">password</code></p>
          </div>
        </div>
      </div>
    </div>
  )
} 