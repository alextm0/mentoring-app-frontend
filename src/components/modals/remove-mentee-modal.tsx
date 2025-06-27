"use client"

import { useState } from "react"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, AlertTriangle } from "lucide-react"

interface RemoveMenteeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mentee: {
    id: number
    name: string
    email: string
  } | null
  onMenteeRemoved: (menteeId: number) => void
}

export function RemoveMenteeModal({ 
  open, 
  onOpenChange, 
  mentee, 
  onMenteeRemoved 
}: RemoveMenteeModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [confirmationText, setConfirmationText] = useState("")

  const handleRemove = async () => {
    if (!mentee || confirmationText !== "REMOVE") return

    setIsLoading(true)

    try {
      // Simulate API call - replace with actual removal logic
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      console.log(`Mentee removed: ${mentee.name} (${mentee.email})`)
      onMenteeRemoved(mentee.id)
      
      // Reset and close
      setConfirmationText("")
      onOpenChange(false)
      
    } catch (error) {
      console.error("Failed to remove mentee:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setConfirmationText("")
    onOpenChange(false)
  }

  if (!mentee) return null

  const isConfirmed = confirmationText === "REMOVE"

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <AlertDialogTitle>Remove Mentee</AlertDialogTitle>
              <AlertDialogDescription className="text-left">
                This action cannot be undone.
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 p-4">
            <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">
              You are about to remove:
            </h4>
            <div className="space-y-1 text-sm text-red-700 dark:text-red-300">
              <p><strong>Name:</strong> {mentee.name}</p>
              <p><strong>Email:</strong> {mentee.email}</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              This will permanently remove the mentee from your account. They will lose access to:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• All assignment progress and submissions</li>
              <li>• Scheduled sessions and meeting history</li>
              <li>• Access to your guidance and resources</li>
              <li>• Learning roadmap and achievements</li>
            </ul>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmation" className="text-sm font-medium">
              Type <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-red-600 dark:text-red-400 font-mono">REMOVE</code> to confirm:
            </Label>
            <Input
              id="confirmation"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              placeholder="Type REMOVE to confirm"
              disabled={isLoading}
              className="font-mono"
            />
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel} disabled={isLoading}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleRemove}
            disabled={!isConfirmed || isLoading}
            className="bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Removing..." : "Remove Mentee"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
} 