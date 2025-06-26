"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Code, Send, ThumbsUp, AlertCircle } from "lucide-react"

const submission = {
  id: 1,
  mentee: "Alex Chen",
  avatar: "/placeholder.svg",
  assignment: "Binary Search Implementation",
  problem: "Search Insert Position",
  submittedAt: "2024-01-20 14:30",
  language: "Python",
  code: `def searchInsert(nums, target):
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
nums = [1, 3, 5, 6]
target = 5
print(searchInsert(nums, target))  # Output: 2`,
  comments: [
    {
      id: 1,
      line: 5,
      author: "John Doe",
      content: "Good use of binary search! Consider adding a comment explaining why we use `//` for integer division.",
      timestamp: "2024-01-20 15:00",
    },
    {
      id: 2,
      line: 12,
      author: "John Doe",
      content:
        "Perfect! This handles the case when the target is not found and returns the correct insertion position.",
      timestamp: "2024-01-20 15:02",
    },
  ],
}

export function CodeFeedback() {
  const [selectedLine, setSelectedLine] = useState<number | null>(null)
  const [newComment, setNewComment] = useState("")
  const [showAllComments, setShowAllComments] = useState(false)

  const codeLines = submission.code.split("\n")

  const addComment = () => {
    if (newComment.trim() && selectedLine !== null) {
      // Add comment logic here
      setNewComment("")
      setSelectedLine(null)
    }
  }

  const getLineComments = (lineNumber: number) => {
    return submission.comments.filter((comment) => comment.line === lineNumber)
  }

  return (
    <div className="space-y-6 slide-up">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline">← Back to Submissions</Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Code Review</h1>
          <p className="text-muted-foreground">
            {submission.assignment} - {submission.problem}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <ThumbsUp className="h-4 w-4" />
            Approve
          </Button>
          <Button variant="outline" className="gap-2">
            <AlertCircle className="h-4 w-4" />
            Request Changes
          </Button>
        </div>
      </div>

      {/* Submission Info */}
      <Card className="neon-border">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={submission.avatar || "/placeholder.svg"} />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold">{submission.mentee}</h3>
              <p className="text-sm text-muted-foreground">Submitted {submission.submittedAt}</p>
            </div>
            <Badge variant="outline">{submission.language}</Badge>
            <Badge variant="outline" className="gap-1">
              <MessageSquare className="h-3 w-3" />
              {submission.comments.length} comments
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Code View */}
        <div className="lg:col-span-3">
          <Card className="neon-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Code
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="bg-muted/30 border-b border-border p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{submission.problem}.py</span>
                  <Button variant="ghost" size="sm" onClick={() => setShowAllComments(!showAllComments)}>
                    {showAllComments ? "Hide" : "Show"} All Comments
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="font-mono text-sm">
                  {codeLines.map((line, index) => {
                    const lineNumber = index + 1
                    const lineComments = getLineComments(lineNumber)
                    const hasComments = lineComments.length > 0
                    const isSelected = selectedLine === lineNumber

                    return (
                      <div key={index}>
                        <div
                          className={`flex hover:bg-muted/50 transition-colors ${
                            isSelected ? "bg-primary/10" : ""
                          } ${hasComments ? "bg-blue-500/5" : ""}`}
                          onClick={() => setSelectedLine(lineNumber)}
                        >
                          <div className="w-12 text-center text-muted-foreground bg-muted/30 border-r border-border py-2 text-xs select-none">
                            {lineNumber}
                          </div>
                          <div className="flex-1 px-4 py-2 whitespace-pre-wrap">{line || " "}</div>
                          {hasComments && (
                            <div className="w-8 flex items-center justify-center">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            </div>
                          )}
                        </div>

                        {/* Inline Comments */}
                        {(showAllComments || isSelected) &&
                          lineComments.map((comment) => (
                            <div key={comment.id} className="bg-blue-500/5 border-l-4 border-blue-500 ml-12 p-4">
                              <div className="flex items-start gap-3">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="text-xs">JD</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm font-medium">{comment.author}</span>
                                    <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                                  </div>
                                  <p className="text-sm">{comment.content}</p>
                                </div>
                              </div>
                            </div>
                          ))}

                        {/* Add Comment Form */}
                        {isSelected && (
                          <div className="bg-muted/30 border-l-4 border-primary ml-12 p-4">
                            <div className="flex items-start gap-3">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs">JD</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 space-y-2">
                                <Textarea
                                  placeholder={`Add comment for line ${lineNumber}...`}
                                  value={newComment}
                                  onChange={(e) => setNewComment(e.target.value)}
                                  rows={3}
                                  className="text-sm"
                                />
                                <div className="flex gap-2">
                                  <Button size="sm" onClick={addComment} disabled={!newComment.trim()}>
                                    <Send className="h-3 w-3 mr-1" />
                                    Add Comment
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={() => setSelectedLine(null)}>
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comments Sidebar */}
        <div>
          <Card className="neon-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Comments ({submission.comments.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {submission.comments.map((comment) => (
                <div key={comment.id} className="p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{comment.author}</p>
                      <p className="text-xs text-muted-foreground">Line {comment.line}</p>
                    </div>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                  <p className="text-xs text-muted-foreground mt-2">{comment.timestamp}</p>
                </div>
              ))}

              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">Click on any line to add a comment</p>
                <Button size="sm" variant="outline" className="w-full">
                  Add General Comment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
