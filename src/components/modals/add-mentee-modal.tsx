"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, UserPlus, Check, AlertCircle } from "lucide-react"

interface AddMenteeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onMenteeAdded?: (email: string) => void
}

type AddStatus = 'idle' | 'loading' | 'success' | 'error'

export function AddMenteeModal({ open, onOpenChange, onMenteeAdded }: AddMenteeModalProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<AddStatus>('idle')
  const [errorMessage, setErrorMessage] = useState("")

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setErrorMessage("Email is required")
      return
    }

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address")
      return
    }

    setStatus('loading')
    setErrorMessage("")

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // For now, simulate success - directly add mentee
      // In real implementation, you would:
      // const response = await api.addMentee({ email })
      
      setStatus('success')
      onMenteeAdded?.(email)
      
      // Reset form after a short delay
      setTimeout(() => {
        setEmail("")
        setStatus('idle')
        onOpenChange(false)
      }, 1500)
      
    } catch (error) {
      setStatus('error')
      setErrorMessage("Failed to add mentee. Please try again.")
    }
  }

  const handleClose = () => {
    if (status !== 'loading') {
      setEmail("")
      setStatus('idle')
      setErrorMessage("")
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Add New Mentee
          </DialogTitle>
          <DialogDescription>
            Add a mentee to your program by entering their email address.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="mentee@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading' || status === 'success'}
              className={errorMessage ? "border-red-500" : ""}
            />
            {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}
          </div>

          {status === 'success' && (
            <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
              <Check className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700 dark:text-green-400">
                Mentee added successfully!
              </AlertDescription>
            </Alert>
          )}

          {status === 'error' && (
            <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700 dark:text-red-400">
                {errorMessage}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={status === 'loading'}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="flex-1"
            >
              {status === 'loading' && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {status === 'loading' ? 'Adding...' : 'Add Mentee'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 