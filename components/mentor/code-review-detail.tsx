"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeft, 
  MessageSquare, 
  Code, 
  Send, 
  CheckCircle, 
  Copy,
  Clock,
  User,
  Hash,
  X
} from "lucide-react"
import { mockMentees } from "@/lib/mock-data"
import toast from "react-hot-toast"

const submissionData = {
  id: 1,
  menteeId: 1,
  assignment: "Binary Search Implementation",
  problem: "Search Insert Position",
  submittedAt: "2024-01-20 14:30",
  language: "Python",
  status: "pending-review",
  code: `def searchInsert(nums, target):
    """
    Given a sorted array of distinct integers and a target value,
    return the index if the target is found. If not, return the 
    index where it would be if it were inserted in order.
    
    Time Complexity: O(log n)
    Space Complexity: O(1)
    """
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return left

# Test cases
def main():
    test_cases = [
        ([1, 3, 5, 6], 5, 2),
        ([1, 3, 5, 6], 2, 1),
        ([1, 3, 5, 6], 7, 4),
        ([1, 3, 5, 6], 0, 0),
    ]
    
    for nums, target, expected in test_cases:
        result = searchInsert(nums, target)
        assert result == expected
    
    print("All test cases passed!")

if __name__ == "__main__":
    main()`,
  comments: [
    {
      id: 1,
      line: 5,
      author: "John Doe",
      avatar: "/placeholder-user.jpg",
      content: "Excellent documentation! The time and space complexity analysis shows good understanding.",
      timestamp: "2024-01-20 15:00",
      resolved: false,
      type: "positive"
    },
    {
      id: 2,
      line: 17,
      author: "John Doe", 
      avatar: "/placeholder-user.jpg",
      content: "Perfect implementation of binary search! The boundary handling is correct.",
      timestamp: "2024-01-20 15:02",
      resolved: false,
      type: "positive"
    },
    {
      id: 3,
      line: 29,
      author: "John Doe",
      avatar: "/placeholder-user.jpg", 
      content: "Great test cases! Consider adding edge cases like empty arrays for completeness.",
      timestamp: "2024-01-20 15:05",
      resolved: false,
      type: "suggestion"
    }
  ],
  menteeNotes: "I implemented binary search as we discussed. I made sure to include proper documentation and test cases. Looking forward to your feedback!",
  topicTags: ["Binary Search", "Array"]
}

interface CodeReviewDetailProps {
  submissionId: number
  onBack: () => void
}

export function CodeReviewDetail({ submissionId, onBack }: CodeReviewDetailProps) {
  const [selectedLine, setSelectedLine] = useState<number | null>(null)
  const [newComment, setNewComment] = useState("")
  const [reviewStatus, setReviewStatus] = useState(submissionData.status)
  const [overallFeedback, setOverallFeedback] = useState("")

  const mentee = mockMentees.find(m => m.id === submissionData.menteeId)
  const codeLines = submissionData.code.split("\n")

  const addComment = () => {
    if (newComment.trim() && selectedLine !== null) {
      const newCommentObj = {
        id: Date.now(),
        line: selectedLine,
        author: "John Doe",
        avatar: "/placeholder-user.jpg",
        content: newComment,
        timestamp: new Date().toLocaleString(),
        resolved: false,
        type: "suggestion" as const
      }

      submissionData.comments.push(newCommentObj)
      setNewComment("")
      setSelectedLine(null)
      
      toast.success("Comment added")
    }
  }

  const getLineComments = (lineNumber: number) => {
    return submissionData.comments.filter((comment) => comment.line === lineNumber)
  }

  const approveSubmission = () => {
    setReviewStatus("approved")
    toast.success("Submission approved! 🎉")
  }

  const requestChanges = () => {
    setReviewStatus("needs-revision")
    toast("Changes requested")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-950/20 dark:text-green-300"
      case "needs-revision":
        return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-950/20 dark:text-orange-300" 
      case "pending-review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950/20 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCommentTypeColor = (type: string) => {
    switch (type) {
      case "positive":
        return "border-l-green-500 bg-green-50 dark:bg-green-950/10"
      case "suggestion":
        return "border-l-blue-500 bg-blue-50 dark:bg-blue-950/10"
      case "issue":
        return "border-l-red-500 bg-red-50 dark:bg-red-950/10"
      default:
        return "border-l-gray-500 bg-gray-50 dark:bg-gray-950/10"
    }
  }

  const resolveComment = (commentId: number) => {
    const comment = submissionData.comments.find(c => c.id === commentId)
    if (comment) {
      comment.resolved = true
      toast.success("Comment resolved")
    }
  }

  const copyCode = () => {
    navigator.clipboard.writeText(submissionData.code)
    toast.success("Code copied to clipboard")
  }

  return (
    <div className="space-y-8 slide-up">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack} size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Reviews
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{submissionData.assignment}</h1>
          <p className="text-muted-foreground">{submissionData.problem}</p>
        </div>
      </div>

      {/* Submission Info */}
      <Card className="neon-border">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={mentee?.avatar} />
                <AvatarFallback>
                  {mentee?.name?.split(' ').map(n => n[0]).join('') || 'M'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{mentee?.name}</h3>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {submissionData.submittedAt}
                  </div>
                  <div className="flex items-center gap-1">
                    <Code className="h-3 w-3" />
                    {submissionData.language}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={getStatusColor(reviewStatus)} variant="outline">
                {reviewStatus.replace('-', ' ')}
              </Badge>
              <div className="flex gap-2">
                {submissionData.topicTags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Mentee Notes */}
          {submissionData.menteeNotes && (
            <div className="mt-6 p-4 bg-muted/30 rounded-lg border">
              <h4 className="font-medium text-sm mb-2">Student Notes</h4>
              <p className="text-sm text-muted-foreground">{submissionData.menteeNotes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Code Panel */}
        <div className="xl:col-span-3">
          <Card className="neon-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Code Review
                </CardTitle>
                <Button size="sm" variant="outline" onClick={copyCode} className="gap-2">
                  <Copy className="h-3 w-3" />
                  Copy
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative">
                <ScrollArea className="h-[600px] p-6">
                  <div className="font-mono text-sm space-y-1">
                    {codeLines.map((line, index) => {
                      const lineNumber = index + 1
                      const lineComments = getLineComments(lineNumber)
                      const hasComments = lineComments.length > 0
                      const isSelected = selectedLine === lineNumber

                      return (
                        <div key={lineNumber} className="group">
                          <div
                            className={`flex items-start gap-4 py-2 px-3 rounded-md cursor-pointer transition-all ${
                              isSelected
                                ? "bg-primary/10 border-l-2 border-primary"
                                : hasComments
                                ? "bg-blue-50 dark:bg-blue-950/20 hover:bg-blue-100 dark:hover:bg-blue-950/30"
                                : "hover:bg-muted/30"
                            }`}
                            onClick={() => setSelectedLine(lineNumber)}
                          >
                            <div className="text-muted-foreground text-xs w-10 text-right shrink-0 mt-0.5 select-none">
                              {lineNumber}
                            </div>
                            <div className="flex-1 whitespace-pre-wrap break-all min-h-[20px]">
                              {line || " "}
                            </div>
                            {hasComments && (
                              <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                                <MessageSquare className="h-4 w-4" />
                                <span className="text-xs">{lineComments.length}</span>
                              </div>
                            )}
                          </div>
                          
                          {/* Line Comments */}
                          {hasComments && (
                            <div className="ml-14 space-y-3 py-3">
                              {lineComments.map((comment) => (
                                <motion.div
                                  key={comment.id}
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className={`p-4 rounded-lg border-l-4 ${getCommentTypeColor(comment.type)}`}
                                >
                                  <div className="flex items-start gap-3">
                                    <Avatar className="h-7 w-7">
                                      <AvatarImage src={comment.avatar} />
                                      <AvatarFallback className="text-xs">JD</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                          <span className="font-medium text-sm">{comment.author}</span>
                                          <span className="text-xs text-muted-foreground">
                                            {new Date(comment.timestamp).toLocaleTimeString()}
                                          </span>
                                        </div>
                                        {comment.resolved && (
                                          <Badge variant="outline" className="text-xs">
                                            <CheckCircle className="h-3 w-3 mr-1" />
                                            Resolved
                                          </Badge>
                                        )}
                                      </div>
                                      <p className="text-sm leading-relaxed mb-3">{comment.content}</p>
                                      {!comment.resolved && (
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          onClick={() => resolveComment(comment.id)}
                                          className="text-xs h-7"
                                        >
                                          Mark as Resolved
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>

                {/* Add Comment Panel */}
                {selectedLine && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-0 left-0 right-0 p-6 bg-card border-t"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-sm">
                          Add comment to line {selectedLine}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedLine(null)
                          setNewComment("")
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex gap-3">
                      <Textarea
                        placeholder="Write your feedback..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="resize-none"
                        rows={2}
                      />
                      <Button 
                        onClick={addComment} 
                        disabled={!newComment.trim()}
                        className="gap-2"
                      >
                        <Send className="h-4 w-4" />
                        Comment
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Review Panel */}
        <div className="space-y-6">
          {/* Comments Summary */}
          <Card className="neon-border">
            <CardHeader>
              <CardTitle className="text-lg">Comments ({submissionData.comments.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {submissionData.comments.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">
                    No comments yet. Click on any line to add feedback.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {submissionData.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className={`p-3 rounded-lg border-l-4 cursor-pointer transition-colors hover:bg-muted/20 ${getCommentTypeColor(comment.type)}`}
                      onClick={() => setSelectedLine(comment.line)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium">Line {comment.line}</span>
                        {comment.resolved && (
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        )}
                      </div>
                      <p className="text-xs line-clamp-2 text-muted-foreground">
                        {comment.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Review Actions */}
          <Card className="neon-border">
            <CardHeader>
              <CardTitle className="text-lg">Overall Review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Provide overall feedback on the submission..."
                value={overallFeedback}
                onChange={(e) => setOverallFeedback(e.target.value)}
                rows={4}
                className="resize-none"
              />
              
              <div className="space-y-2">
                <Button 
                  className="w-full" 
                  onClick={approveSubmission}
                  disabled={reviewStatus === "approved"}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Submission
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={requestChanges}
                  disabled={reviewStatus === "needs-revision"}
                >
                  Request Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
