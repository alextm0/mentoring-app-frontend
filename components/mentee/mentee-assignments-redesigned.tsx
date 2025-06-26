"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { 
  CheckCircle, 
  Clock, 
  Upload, 
  ExternalLink, 
  Calendar, 
  Code2, 
  BookOpen,
  ArrowLeft,
  Play,
  Target,
  Trophy,
  Users
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MenteeAssignmentsRedesignedProps {
  onViewSubmission?: (submissionId: number) => void
}

export function MenteeAssignmentsRedesigned({ onViewSubmission }: MenteeAssignmentsRedesignedProps) {
  const { toast } = useToast()
  const [submissionCode, setSubmissionCode] = useState("")
  const [submissionNotes, setSubmissionNotes] = useState("")
  const [selectedAssignment, setSelectedAssignment] = useState<number | null>(null)
  const [selectedProblem, setSelectedProblem] = useState<number | null>(null)
  const [showSubmitDrawer, setShowSubmitDrawer] = useState(false)

  // Enhanced mock data with multiple problems and resources per assignment
  const assignments = [
    {
      id: 1,
      title: "Binary Search Mastery",
      description: "Master binary search algorithm through progressive problem solving and theoretical understanding",
      dueDate: "2024-01-30",
      status: "in_progress" as const,
      difficulty: "Medium",
      createdAt: "2024-01-20",
      totalProblems: 5,
      completedProblems: 3,
      totalXP: 500,
      earnedXP: 300,
      problems: [
        {
          id: 1,
          title: "Binary Search",
          platform: "LeetCode",
          difficulty: "Easy",
          url: "https://leetcode.com/problems/binary-search/",
          completed: true,
          submissionId: 1,
          xp: 100
        },
        {
          id: 2,
          title: "Search Insert Position",
          platform: "LeetCode", 
          difficulty: "Easy",
          url: "https://leetcode.com/problems/search-insert-position/",
          completed: true,
          submissionId: 2,
          xp: 100
        },
        {
          id: 3,
          title: "Find First and Last Position",
          platform: "LeetCode",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
          completed: true,
          submissionId: 3,
          xp: 150
        },
        {
          id: 4,
          title: "Search in Rotated Sorted Array",
          platform: "LeetCode",
          difficulty: "Medium", 
          url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
          completed: false,
          submissionId: null,
          xp: 150
        },
        {
          id: 5,
          title: "Find Peak Element",
          platform: "LeetCode",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/find-peak-element/",
          completed: false,
          submissionId: null,
          xp: 150
        }
      ],
      resources: [
        {
          id: 1,
          title: "Binary Search Algorithm Guide",
          type: "article",
          url: "https://example.com/binary-search-guide",
          description: "Comprehensive guide covering implementation and edge cases",
          completed: true
        },
        {
          id: 2,
          title: "Binary Search Visualization",
          type: "interactive",
          url: "https://visualgo.net/en/bst",
          description: "Interactive visualization of binary search in action",
          completed: false
        }
      ]
    },
    {
      id: 2,
      title: "Graph Algorithms Foundation",
      description: "Build strong foundation in graph algorithms with DFS, BFS, and basic graph problems",
      dueDate: "2024-02-05",
      status: "pending" as const,
      difficulty: "Hard",
      createdAt: "2024-01-22",
      totalProblems: 4,
      completedProblems: 0,
      totalXP: 600,
      earnedXP: 0,
      problems: [
        {
          id: 6,
          title: "Number of Islands",
          platform: "LeetCode",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/number-of-islands/",
          completed: false,
          submissionId: null,
          xp: 150
        },
        {
          id: 7,
          title: "Course Schedule",
          platform: "LeetCode",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/course-schedule/",
          completed: false,
          submissionId: null,
          xp: 150
        },
        {
          id: 8,
          title: "Clone Graph",
          platform: "LeetCode",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/clone-graph/",
          completed: false,
          submissionId: null,
          xp: 150
        },
        {
          id: 9,
          title: "Word Ladder",
          platform: "LeetCode", 
          difficulty: "Hard",
          url: "https://leetcode.com/problems/word-ladder/",
          completed: false,
          submissionId: null,
          xp: 200
        }
      ],
      resources: [
        {
          id: 3,
          title: "Graph Theory Fundamentals",
          type: "video",
          url: "https://youtube.com/watch?v=example",
          description: "45-minute video covering graph representation and traversal",
          completed: false
        },
        {
          id: 4,
          title: "DFS vs BFS Comparison",
          type: "article",
          url: "https://example.com/dfs-vs-bfs",
          description: "When to use depth-first vs breadth-first search",
          completed: false
        }
      ]
    },
    {
      id: 3,
      title: "Dynamic Programming Fundamentals",
      description: "Learn DP patterns through classic problems and build problem-solving intuition",
      dueDate: "2024-02-10",
      status: "completed" as const,
      difficulty: "Hard",
      createdAt: "2024-01-25",
      totalProblems: 3,
      completedProblems: 3,
      totalXP: 450,
      earnedXP: 450,
      problems: [
        {
          id: 10,
          title: "Climbing Stairs",
          platform: "LeetCode",
          difficulty: "Easy",
          url: "https://leetcode.com/problems/climbing-stairs/",
          completed: true,
          submissionId: 4,
          xp: 100
        },
        {
          id: 11,
          title: "House Robber",
          platform: "LeetCode",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/house-robber/",
          completed: true,
          submissionId: 5,
          xp: 150
        },
        {
          id: 12,
          title: "Coin Change",
          platform: "LeetCode",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/coin-change/",
          completed: true,
          submissionId: 6,
          xp: 200
        }
      ],
      resources: [
        {
          id: 5,
          title: "Dynamic Programming Patterns",
          type: "pdf",
          url: "https://example.com/dp-patterns.pdf",
          description: "Common DP patterns with examples and practice problems",
          completed: true
        }
      ]
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
    return ""
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-500/10 text-green-500"
      case "Medium": return "bg-yellow-500/10 text-yellow-500" 
      case "Hard": return "bg-red-500/10 text-red-500"
      default: return "bg-gray-500/10 text-gray-400"
    }
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "video": return "🎥"
      case "article": return "📄"
      case "pdf": return "📋"
      case "interactive": return "🎮"
      default: return "📚"
    }
  }

  const getDaysUntilDue = (dateStr: string) => {
    const due = new Date(dateStr)
    const today = new Date()
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return { text: "Overdue", color: "text-red-500" }
    if (diffDays === 0) return { text: "Due today", color: "text-orange-500" }
    if (diffDays === 1) return { text: "Due tomorrow", color: "text-orange-500" }
    return { text: `${diffDays} days left`, color: "text-muted-foreground" }
  }

  const handleSubmit = (problemId: number) => {
    if (!submissionCode.trim()) {
      toast({
        title: "Error",
        description: "Please paste your code before submitting",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Success!",
      description: "Solution submitted successfully! 🎉"
    })
    setSubmissionCode("")
    setSubmissionNotes("")
    setShowSubmitDrawer(false)
    setSelectedProblem(null)
  }

  const completedAssignments = assignments.filter(a => a.status === 'completed').length
  const inProgressAssignments = assignments.filter(a => a.status === 'in_progress').length
  const totalXP = assignments.reduce((sum, a) => sum + a.earnedXP, 0)
  const totalProblems = assignments.reduce((sum, a) => sum + a.completedProblems, 0)

  // Assignment Detail View
  if (selectedAssignment) {
    const assignment = assignments.find(a => a.id === selectedAssignment)!
    const progressPercentage = Math.round((assignment.completedProblems / assignment.totalProblems) * 100)
    const xpPercentage = Math.round((assignment.earnedXP / assignment.totalXP) * 100)
    const dueInfo = getDaysUntilDue(assignment.dueDate)

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setSelectedAssignment(null)} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Assignments
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{assignment.title}</h1>
            <p className="text-muted-foreground">{assignment.description}</p>
          </div>
          <Badge variant="outline" className={getStatusColor(assignment.status)}>
            <div className="flex items-center gap-1">
              {getStatusIcon(assignment.status)}
              {assignment.status.replace('_', ' ')}
            </div>
          </Badge>
        </div>

        {/* Assignment Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-primary/5 to-background">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{progressPercentage}%</div>
              <div className="text-sm text-muted-foreground">Progress</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500/5 to-background">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-500 mb-1">
                {assignment.completedProblems}/{assignment.totalProblems}
              </div>
              <div className="text-sm text-muted-foreground">Problems</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500/5 to-background">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-500 mb-1">
                {assignment.earnedXP}/{assignment.totalXP}
              </div>
              <div className="text-sm text-muted-foreground">XP</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500/5 to-background">
            <CardContent className="p-4 text-center">
              <div className={`text-2xl font-bold mb-1 ${dueInfo.color}`}>
                {dueInfo.text}
              </div>
              <div className="text-sm text-muted-foreground">Due Date</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Problems Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-primary" />
                  Problems ({assignment.completedProblems}/{assignment.totalProblems})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {assignment.problems.map((problem, index) => (
                  <div
                    key={problem.id}
                    className={`p-4 rounded-lg border transition-all ${
                      problem.completed 
                        ? "bg-green-500/5 border-green-500/20" 
                        : "bg-muted/30 border-border hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            problem.completed
                              ? "bg-green-500 text-white"
                              : "bg-muted text-muted-foreground border-2 border-border"
                          }`}
                        >
                          {problem.completed ? "✓" : index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{problem.title}</h4>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {problem.platform}
                            </Badge>
                            <Badge variant="outline" className={getDifficultyColor(problem.difficulty)}>
                              {problem.difficulty}
                            </Badge>
                            <Badge variant="outline" className="bg-purple-500/10 text-purple-500">
                              {problem.xp} XP
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="gap-2">
                          <ExternalLink className="h-3 w-3" />
                          Open
                        </Button>
                        {problem.completed ? (
                          problem.submissionId && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onViewSubmission?.(problem.submissionId!)}
                            >
                              View Submission
                            </Button>
                          )
                        ) : (
                          <Sheet open={showSubmitDrawer && selectedProblem === problem.id} 
                                 onOpenChange={(open) => {
                                   setShowSubmitDrawer(open)
                                   if (!open) setSelectedProblem(null)
                                 }}>
                            <SheetTrigger asChild>
                              <Button
                                size="sm"
                                className="gap-2"
                                onClick={() => setSelectedProblem(problem.id)}
                              >
                                <Upload className="h-3 w-3" />
                                Submit
                              </Button>
                            </SheetTrigger>
                            <SheetContent className="sm:max-w-md">
                              <SheetHeader>
                                <SheetTitle>Submit Solution</SheetTitle>
                              </SheetHeader>
                              <div className="space-y-4 mt-6">
                                <div>
                                  <h4 className="font-medium mb-2">{problem.title}</h4>
                                  <div className="flex gap-2 mb-3">
                                    <Badge variant="outline" className={getDifficultyColor(problem.difficulty)}>
                                      {problem.difficulty}
                                    </Badge>
                                    <Badge variant="outline" className="bg-purple-500/10 text-purple-500">
                                      {problem.xp} XP
                                    </Badge>
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <Label htmlFor="code">Your Solution</Label>
                                  <Textarea
                                    id="code"
                                    placeholder="Paste your code solution here..."
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
                                    placeholder="Any thoughts about your approach..."
                                    value={submissionNotes}
                                    onChange={(e) => setSubmissionNotes(e.target.value)}
                                    rows={3}
                                  />
                                </div>
                                
                                <div className="flex gap-2 pt-4">
                                  <Button 
                                    onClick={() => handleSubmit(problem.id)}
                                    className="flex-1 gap-2"
                                  >
                                    <Code2 className="h-4 w-4" />
                                    Submit Solution
                                  </Button>
                                  <Button 
                                    variant="outline"
                                    onClick={() => {
                                      setShowSubmitDrawer(false)
                                      setSelectedProblem(null)
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            </SheetContent>
                          </Sheet>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Problems Completed</span>
                    <span className="font-medium">{assignment.completedProblems}/{assignment.totalProblems}</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>XP Earned</span>
                    <span className="font-medium">{assignment.earnedXP}/{assignment.totalXP}</span>
                  </div>
                  <Progress value={xpPercentage} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Study Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {assignment.resources.map((resource) => (
                  <div key={resource.id} className={`p-3 rounded-lg border ${
                    resource.completed ? "bg-green-500/5 border-green-500/20" : "bg-muted/30 border-border"
                  }`}>
                    <div className="flex items-start gap-3">
                      <span className="text-lg">{getResourceIcon(resource.type)}</span>
                      <div className="flex-1">
                        <h5 className="font-medium text-sm">{resource.title}</h5>
                        <p className="text-xs text-muted-foreground mb-2">{resource.description}</p>
                        <Button size="sm" variant="outline" className="gap-2 h-7">
                          <ExternalLink className="h-3 w-3" />
                          {resource.completed ? "Review" : "Study"}
                        </Button>
                      </div>
                      {resource.completed && (
                        <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">My Assignments</h1>
        <p className="text-muted-foreground">Complete coding assignments to master algorithms and earn XP</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{assignments.length}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-emerald-500">{completedAssignments}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-amber-500">{inProgressAssignments}</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{totalXP}</div>
            <div className="text-sm text-muted-foreground">Total XP</div>
          </CardContent>
        </Card>
      </div>

      {/* Assignments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {assignments.map((assignment) => {
          const progressPercentage = Math.round((assignment.completedProblems / assignment.totalProblems) * 100)
          const dueInfo = getDaysUntilDue(assignment.dueDate)
          
          return (
            <Card key={assignment.id} className="hover:shadow-md transition-all duration-200 cursor-pointer border-l-4 border-l-transparent hover:border-l-primary group"
                  onClick={() => setSelectedAssignment(assignment.id)}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">
                    <div className="flex items-center gap-1">
                      {getStatusIcon(assignment.status)}
                      {assignment.status.replace('_', ' ')}
                    </div>
                  </Badge>
                </div>
                <h3 className="font-semibold text-base leading-tight mb-2 group-hover:text-primary transition-colors">
                  {assignment.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {assignment.description}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Progress</span>
                      <span className="text-xs font-medium">{assignment.completedProblems}/{assignment.totalProblems}</span>
                    </div>
                    <Progress value={progressPercentage} className="h-1.5" />
                  </div>

                  {/* XP and Due Date */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Trophy className="h-3 w-3 text-primary" />
                      <span className="text-xs font-medium text-foreground">{assignment.earnedXP}/{assignment.totalXP} XP</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Due {new Date(assignment.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>

                  {/* Bottom Stats */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Code2 className="h-3 w-3" />
                        {assignment.totalProblems}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {assignment.resources.length}
                      </span>
                    </div>
                  </div>



                  {/* Action Button */}
                  {assignment.status === 'pending' && (
                    <Button 
                      size="sm" 
                      variant="secondary"
                      className="w-full h-7 text-xs gap-1 mt-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedAssignment(assignment.id)
                      }}
                    >
                      <Play className="h-3 w-3" />
                      Start
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {assignments.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Target className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
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