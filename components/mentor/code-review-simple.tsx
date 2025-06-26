"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, CheckCircle2, MessageSquare, Calendar, ExternalLink } from "lucide-react"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useAppContext } from "@/lib/app-context"
import toast from "react-hot-toast"

interface CodeReviewSimpleProps {
  submissionId: number
  onBack: () => void
}

export function CodeReviewSimple({ submissionId, onBack }: CodeReviewSimpleProps) {
  const { state, dispatch } = useAppContext()
  const [comment, setComment] = useState("")
  const [isReviewed, setIsReviewed] = useState(false)

  // Mock submission data - in real app, would fetch by submissionId
  const submission = {
    id: submissionId,
    assignment: {
      title: "Binary Search Implementation",
      description: "Implement binary search algorithm with proper error handling"
    },
    mentee: {
      name: "Alex Chen",
      avatar: "/placeholder-user.jpg"
    },
    code: `def binary_search(arr, target):
    """
    Performs binary search on a sorted array.
    
    Args:
        arr: Sorted array to search in
        target: Element to find
        
    Returns:
        Index of target if found, -1 otherwise
    """
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1

# Test cases
test_array = [1, 3, 5, 7, 9, 11, 13, 15]
print(binary_search(test_array, 7))  # Should return 3
print(binary_search(test_array, 4))  # Should return -1`,
    language: "python",
    submittedAt: "2024-01-26T10:30:00Z",
    problem: {
      title: "Binary Search",
      platform: "LeetCode",
      url: "https://leetcode.com/problems/binary-search/"
    }
  }

  const handleMarkReviewed = () => {
    if (!comment.trim()) {
      toast.error("Please add a comment before marking as reviewed")
      return
    }

    setIsReviewed(true)
    
    // Update assignment status in context (using mock assignment ID for demo)
    dispatch({
      type: 'UPDATE_ASSIGNMENT_STATUS',
      assignmentId: 1, // would get from submission data
      status: 'completed'
    })

    toast.success("✅ Code review completed! Mentee has been notified")
  }

  const getStatusColor = (reviewed: boolean) => {
    return reviewed 
      ? "bg-green-500/10 text-green-500 border-green-500/20"
      : "bg-orange-500/10 text-orange-500 border-orange-500/20"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{submission.assignment.title}</h1>
          <p className="text-muted-foreground">{submission.assignment.description}</p>
        </div>
        <Badge className={getStatusColor(isReviewed)}>
          {isReviewed ? "Reviewed" : "Pending Review"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Code Display */}
        <div className="lg:col-span-2">
          <Card className="neon-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  Submitted Code
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{submission.language}</Badge>
                  <Button size="sm" variant="outline" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    View Problem
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg overflow-hidden border">
                <SyntaxHighlighter
                  language={submission.language}
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    fontSize: '14px',
                    lineHeight: '1.5'
                  }}
                  showLineNumbers
                >
                  {submission.code}
                </SyntaxHighlighter>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Review Panel */}
        <div className="space-y-6">
          {/* Mentee Info */}
          <Card className="neon-border">
            <CardHeader>
              <CardTitle className="text-lg">Submitted by</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={submission.mentee.avatar} />
                  <AvatarFallback>
                    {submission.mentee.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{submission.mentee.name}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(submission.submittedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <strong>Problem:</strong> {submission.problem.title}
                <br />
                <strong>Platform:</strong> {submission.problem.platform}
              </div>
            </CardContent>
          </Card>

          {/* Review Form */}
          <Card className="neon-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Your Review
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Textarea
                  placeholder="Write your feedback here... (e.g., Great implementation! Consider edge cases like empty arrays.)"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={6}
                  disabled={isReviewed}
                />
              </div>
              
              <Button 
                onClick={handleMarkReviewed}
                disabled={isReviewed || !comment.trim()}
                className="w-full gap-2"
                variant={isReviewed ? "outline" : "default"}
              >
                <CheckCircle2 className="h-4 w-4" />
                {isReviewed ? "Review Completed" : "Mark as Reviewed"}
              </Button>
              
              {isReviewed && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-sm text-green-600 font-medium">
                    ✅ Review completed! Mentee has been notified.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 