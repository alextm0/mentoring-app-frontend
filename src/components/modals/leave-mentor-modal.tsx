"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, UserMinus, AlertTriangle } from "lucide-react"

interface LeaveMentorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mentorName: string
  onMentorLeft?: () => void
}

type LeaveStatus = 'idle' | 'loading' | 'success' | 'error'

export function LeaveMentorModal({ open, onOpenChange, mentorName, onMentorLeft }: LeaveMentorModalProps) {
  const [status, setStatus] = useState<LeaveStatus>('idle')

  const handleLeave = async () => {
    setStatus('loading')

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In real implementation, you would:
      // const response = await api.leaveMentor()
      
      setStatus('success')
      onMentorLeft?.()
      
      // Close modal after a short delay
      setTimeout(() => {
        setStatus('idle')
        onOpenChange(false)
      }, 1500)
      
    } catch (error) {
      setStatus('error')
    }
  }

  const handleClose = () => {
    if (status !== 'loading') {
      setStatus('idle')
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserMinus className="h-5 w-5 text-orange-500" />
            Leave Mentor
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to leave {mentorName}? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-700 dark:text-orange-400">
              Leaving will remove you from {mentorName}'s mentoring program. You'll lose access to your current assignments and progress.
            </AlertDescription>
          </Alert>

          {status === 'success' && (
            <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
              <UserMinus className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700 dark:text-green-400">
                You have successfully left the mentoring program.
              </AlertDescription>
            </Alert>
          )}

          {status === 'error' && (
            <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700 dark:text-red-400">
                Failed to leave mentor. Please try again.
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
              onClick={handleLeave}
              disabled={status === 'loading' || status === 'success'}
              variant="destructive"
              className="flex-1"
            >
              {status === 'loading' && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {status === 'loading' ? 'Leaving...' : 'Leave Mentor'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 