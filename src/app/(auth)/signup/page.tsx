"use client"

import { useState } from "react"
import { SignupForm } from "@/components/auth/signup-form"

interface SignupData {
  fullName: string
  email: string
  password: string
  role: 'mentor' | 'mentee'
  acceptTerms: boolean
}

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSignup = async (data: SignupData) => {
    setIsLoading(true)
    setError("")

    try {
      // Simulate API call - replace with actual registration logic
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock successful registration
      console.log("User registered:", data)
      
      // Redirect based on role
      if (data.role === 'mentor') {
        window.location.href = "/mentor"
      } else {
        window.location.href = "/mentee"
      }
      
    } catch (err) {
      setError("Failed to create account. Please try again.")
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
        
        <SignupForm 
          onSignup={handleSignup}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  )
} 