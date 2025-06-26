"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { CheckCircle, Clock, Upload, ExternalLink, Calendar, Code2 } from "lucide-react"
import toast from "react-hot-toast"

interface MenteeAssignmentsSimpleProps {
  onViewSubmission?: (submissionId: number) => void
}

export function MenteeAssignmentsSimple({ onViewSubmission }: MenteeAssignmentsSimpleProps) {
  const [submissionCode, setSubmissionCode] = useState("")
  const [submissionNotes, setSubmissionNotes] = useState("")
  const [selectedAssignment, setSelectedAssignment] = useState<number | null>(null)
  const [showSubmitDrawer, setShowSubmitDrawer] = useState(false)

  // Simplified mock data
  const assignments = [
    {
      id: 1,
      title: "Binary Search Implementation",
      description: "Implement binary search with proper error handling",
      dueDate: "2024-01-28",
      status: "in_progress" as const,
      progress: 75,
      difficulty: "Medium",
      hasSubmission: false,
      submissionId: null
    },
    {
      id: 2,
      title: "Two Sum Problem",
      description: "Find two numbers that add up to target",
      dueDate: "2024-01-30", 
      status: "submitted" as const,
      progress: 100,
      difficulty: "Easy",
      hasSubmission: true,
      submissionId: 1
    },
    {
      id: 3,
      title: "Graph Traversal - DFS",
      description: "Implement depth-first search algorithm",
      dueDate: "2024-02-05",
      status: "pending" as const,
      progress: 0,
      difficulty: "Hard",
      hasSubmission: false,
      submissionId: null
    },
    {
      id: 4,
      title: "Dynamic Programming - Fibonacci",
      description: "Solve using memoization and tabulation",
      dueDate: "2024-02-10",
      status: "completed" as const,
      progress: 100,
      difficulty: "Medium",
      hasSubmission: true,
      submissionId: 2
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-green-500" />
      case "submitted": return <Upload className="h-4 w-4 text-blue-500" />
      case "in_progress": return <Clock className="h-4 w-4 text-orange-500" />
      default: return <Calendar className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500/10 text-green-500 border-green-500/20"
      case "submitted": return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "in_progress": return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/20"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-500/10 text-green-500"
      case "Medium": return "bg-yellow-500/10 text-yellow-500"
      case "Hard": return "bg-red-500/10 text-red-500"
      default: return "bg-gray-500/10 text-gray-400"
    }
  }

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate)
    const today = new Date()
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return { text: "Overdue", color: "text-red-500" }
    if (diffDays === 0) return { text: "Due today", color: "text-orange-500" }
    if (diffDays === 1) return { text: "Due tomorrow", color: "text-orange-500" }
    return { text: `${diffDays} days left`, color: "text-muted-foreground" }
  }

  const handleSubmit = (assignmentId: number) => {
    if (!submissionCode.trim()) {
      toast.error("Please paste your code before submitting")
      return
    }

    // Simulate submission
    toast.success("Assignment submitted successfully! 🎉")
    setSubmissionCode("")
    setSubmissionNotes("")
    setShowSubmitDrawer(false)
    setSelectedAssignment(null)
  }

  const completedCount = assignments.filter(a => a.status === 'completed').length
  const inProgressCount = assignments.filter(a => a.status === 'in_progress').length
  const submittedCount = assignments.filter(a => a.status === 'submitted').length
  const totalProgress = Math.round(assignments.reduce((sum, a) => sum + a.progress, 0) / assignments.length)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">My Assignments</h1>
        <p className="text-muted-foreground">Complete your coding assignments and track your progress</p>
      </div>

      {/* Basic Stats Only */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{assignments.length}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500">{completedCount}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-500">{inProgressCount}</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </CardContent>
        </Card>
      </div>



      {/* Assignments List */}
      <div className="space-y-4">
        {assignments.map((assignment) => {
          const dueInfo = getDaysUntilDue(assignment.dueDate)
          
          return (
            <Card key={assignment.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {getStatusIcon(assignment.status)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{assignment.title}</h3>
                        <p className="text-muted-foreground text-sm">{assignment.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <Badge variant="outline" className={getStatusColor(assignment.status)}>
                        {assignment.status.replace('_', ' ')}
                      </Badge>
                      <Badge variant="outline" className={getDifficultyColor(assignment.difficulty)}>
                        {assignment.difficulty}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(assignment.dueDate).toLocaleDateString()}
                      </span>
                      <span className={dueInfo.color}>
                        {dueInfo.text}
                      </span>
                    </div>

                    {assignment.progress > 0 && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{assignment.progress}%</span>
                        </div>
                        <Progress value={assignment.progress} className="h-1" />
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 ml-4">
                    {assignment.status === 'submitted' && assignment.submissionId && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onViewSubmission?.(assignment.submissionId!)}
                      >
                        View Submission
                      </Button>
                    )}
                    
                    {(assignment.status === 'pending' || assignment.status === 'in_progress') && (
                      <Sheet open={showSubmitDrawer && selectedAssignment === assignment.id} 
                             onOpenChange={(open) => {
                               setShowSubmitDrawer(open)
                               if (!open) setSelectedAssignment(null)
                             }}>
                        <SheetTrigger asChild>
                          <Button
                            size="sm"
                            className="gap-2"
                            onClick={() => setSelectedAssignment(assignment.id)}
                          >
                            <Upload className="h-3 w-3" />
                            Submit Code
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="sm:max-w-md">
                          <SheetHeader>
                            <SheetTitle>Submit Assignment</SheetTitle>
                          </SheetHeader>
                          <div className="space-y-4 mt-6">
                            <div>
                              <h4 className="font-medium mb-2">{assignment.title}</h4>
                              <p className="text-sm text-muted-foreground">{assignment.description}</p>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="code">Your Code Solution</Label>
                              <Textarea
                                id="code"
                                placeholder="Paste your code here..."
                                value={submissionCode}
                                onChange={(e) => setSubmissionCode(e.target.value)}
                                rows={12}
                                className="font-mono text-sm"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="notes">Notes (Optional)</Label>
                              <Textarea
                                id="notes"
                                placeholder="Any notes about your solution..."
                                value={submissionNotes}
                                onChange={(e) => setSubmissionNotes(e.target.value)}
                                rows={3}
                              />
                            </div>
                            
                            <div className="flex gap-2 pt-4">
                              <Button 
                                onClick={() => handleSubmit(assignment.id)}
                                className="flex-1 gap-2"
                              >
                                <Code2 className="h-4 w-4" />
                                Submit Assignment
                              </Button>
                              <Button 
                                variant="outline"
                                onClick={() => {
                                  setShowSubmitDrawer(false)
                                  setSelectedAssignment(null)
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </SheetContent>
                      </Sheet>
                    )}
                    
                    <Button size="sm" variant="ghost" className="gap-2">
                      <ExternalLink className="h-3 w-3" />
                      View Problem
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {assignments.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-muted-foreground">No assignments yet</div>
            <p className="text-sm text-muted-foreground mt-2">
              Your mentor will assign coding problems for you to practice
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 