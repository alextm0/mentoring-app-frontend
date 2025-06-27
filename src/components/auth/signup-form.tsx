"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, User, Mail, Lock, Eye, EyeOff, AlertCircle, GraduationCap, Users } from "lucide-react"
import Link from "next/link"

interface SignupFormProps {
  onSignup?: (data: SignupData) => void
  isLoading?: boolean
  error?: string
}

interface SignupData {
  fullName: string
  email: string
  password: string
  role: 'mentor' | 'mentee'
  acceptTerms: boolean
}

export function SignupForm({ onSignup, isLoading = false, error }: SignupFormProps) {
  const [formData, setFormData] = useState<SignupData>({
    fullName: "",
    email: "",
    password: "",
    role: 'mentee',
    acceptTerms: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{[K in keyof SignupData]?: string}>({})

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Reset errors
    setErrors({})

    // Validation
    const newErrors: {[K in keyof SignupData]?: string} = {}
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = "Name must be at least 2 characters"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number"
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions"
    }

    if (Object.keys(newErrors).length === 0) {
      onSignup?.(formData)
    } else {
      setErrors(newErrors)
    }
  }

  const updateFormData = (field: keyof SignupData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Create account</CardTitle>
        <CardDescription className="text-center">
          Join our mentoring platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => updateFormData('fullName', e.target.value)}
                disabled={isLoading}
                className={`pl-10 ${errors.fullName ? "border-red-500" : ""}`}
              />
            </div>
                         {errors.fullName && (
               <p className="text-sm text-red-500 dark:text-red-400">{errors.fullName}</p>
             )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                disabled={isLoading}
                className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
              />
            </div>
                         {errors.email && (
               <p className="text-sm text-red-500 dark:text-red-400">{errors.email}</p>
             )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => updateFormData('password', e.target.value)}
                disabled={isLoading}
                className={`pl-10 pr-10 ${errors.password ? "border-red-500" : ""}`}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
                         {errors.password && (
               <p className="text-sm text-red-500 dark:text-red-400">{errors.password}</p>
             )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">I want to be a...</Label>
            <Select 
              value={formData.role} 
              onValueChange={(value: 'mentor' | 'mentee') => updateFormData('role', value)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mentee">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    <span>Mentee - I want to learn</span>
                  </div>
                </SelectItem>
                <SelectItem value="mentor">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Mentor - I want to teach</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="acceptTerms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => updateFormData('acceptTerms', checked)}
                disabled={isLoading}
              />
              <Label htmlFor="acceptTerms" className="text-sm leading-none">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:text-primary/80 font-medium">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:text-primary/80 font-medium">
                  Privacy Policy
                </Link>
              </Label>
            </div>
                         {errors.acceptTerms && (
               <p className="text-sm text-red-500 dark:text-red-400">{errors.acceptTerms}</p>
             )}
          </div>

                     {error && (
             <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20">
               <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
               <AlertDescription className="text-red-700 dark:text-red-400">
                 {error}
               </AlertDescription>
             </Alert>
           )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Creating account..." : "Create account"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link
              href="/login"
              className="text-primary hover:text-primary/80 font-medium"
            >
              Sign in
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 