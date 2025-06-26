"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  Clock,
  AlertCircle,
  ExternalLink,
  Search,
  Filter,
  BookOpen,
  Play,
  Trophy,
  Upload,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MenteeAssignmentsProps {
  onViewSubmission?: (submissionId: number) => void
}

const assignments = [
  {
    id: 1,
    title: "Binary Search Mastery",
    description: "Master binary search algorithm through progressive problem solving",
    dueDate: "2024-01-22",
    status: "in-progress",
    difficulty: "Medium",
    topic: "Algorithms",
    progress: 60,
    totalProblems: 5,
    completedProblems: 3,
    problems: [
      {
        title: "Binary Search",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/binary-search/",
        completed: true,
        timeSpent: 25,
        submissionId: 1,
      },
      {
        title: "Search Insert Position",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/search-insert-position/",
        completed: true,
        timeSpent: 20,
        submissionId: 2,
      },
      {
        title: "Find First and Last Position",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
        completed: true,
        timeSpent: 45,
        submissionId: 3,
      },
      {
        title: "Search in Rotated Sorted Array",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
        completed: false,
        timeSpent: 0,
        submissionId: null,
      },
      {
        title: "Find Peak Element",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/find-peak-element/",
        completed: false,
        timeSpent: 0,
        submissionId: null,
      },
    ],
    resources: [
      { title: "Binary Search Algorithm Guide", type: "pdf", url: "#" },
      { title: "Binary Search Visualization", type: "interactive", url: "#" },
    ],
  },
  {
    id: 2,
    title: "Graph Fundamentals",
    description: "Build strong foundation in graph algorithms and traversal techniques",
    dueDate: "2024-01-25",
    status: "in-progress",
    difficulty: "Hard",
    topic: "Graphs",
    progress: 25,
    totalProblems: 4,
    completedProblems: 1,
    problems: [
      {
        title: "Number of Islands",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/number-of-islands/",
        completed: true,
        timeSpent: 60,
        submissionId: 4,
      },
      {
        title: "Course Schedule",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/course-schedule/",
        completed: false,
        timeSpent: 0,
        submissionId: null,
      },
      {
        title: "Clone Graph",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/clone-graph/",
        completed: false,
        timeSpent: 0,
        submissionId: null,
      },
      {
        title: "Word Ladder",
        platform: "LeetCode",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/word-ladder/",
        completed: false,
        timeSpent: 0,
        submissionId: null,
      },
    ],
    resources: [
      { title: "Graph Theory Basics", type: "video", url: "#" },
      { title: "DFS vs BFS Explained", type: "article", url: "#" },
    ],
  },
  {
    id: 3,
    title: "Dynamic Programming Foundations",
    description: "Learn DP patterns through classic problems",
    dueDate: "2024-01-28",
    status: "not-started",
    difficulty: "Hard",
    topic: "Dynamic Programming",
    progress: 0,
    totalProblems: 6,
    completedProblems: 0,
    problems: [
      {
        title: "Climbing Stairs",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/climbing-stairs/",
        completed: false,
        timeSpent: 0,
        submissionId: null,
      },
      {
        title: "House Robber",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/house-robber/",
        completed: false,
        timeSpent: 0,
        submissionId: null,
      },
      {
        title: "Coin Change",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/coin-change/",
        completed: false,
        timeSpent: 0,
        submissionId: null,
      },
      {
        title: "Longest Increasing Subsequence",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/longest-increasing-subsequence/",
        completed: false,
        timeSpent: 0,
        submissionId: null,
      },
      {
        title: "Edit Distance",
        platform: "LeetCode",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/edit-distance/",
        completed: false,
        timeSpent: 0,
        submissionId: null,
      },
      {
        title: "Maximum Subarray",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/maximum-subarray/",
        completed: false,
        timeSpent: 0,
        submissionId: null,
      },
    ],
    resources: [
      { title: "DP Patterns Guide", type: "pdf", url: "#" },
      { title: "Memoization vs Tabulation", type: "video", url: "#" },
    ],
  },
]

export function MenteeAssignments({ onViewSubmission }: MenteeAssignmentsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedAssignment, setSelectedAssignment] = useState<number | null>(null)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "overdue":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "in-progress":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "overdue":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/10 text-green-500"
      case "Medium":
        return "bg-yellow-500/10 text-yellow-500"
      case "Hard":
        return "bg-red-500/10 text-red-500"
      default:
        return "bg-gray-500/10 text-gray-400"
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "LeetCode":
        return "bg-orange-500/10 text-orange-500"
      case "HackerRank":
        return "bg-green-500/10 text-green-500"
      case "CodeForces":
        return "bg-blue-500/10 text-blue-500"
      default:
        return "bg-gray-500/10 text-gray-400"
    }
  }

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.topic.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || assignment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const completedCount = assignments.filter((a) => a.status === "completed").length
  const inProgressCount = assignments.filter((a) => a.status === "in-progress").length
  const totalProblems = assignments.reduce((acc, a) => acc + a.totalProblems, 0)
  const completedProblems = assignments.reduce((acc, a) => acc + a.completedProblems, 0)

  if (selectedAssignment) {
    const assignment = assignments.find((a) => a.id === selectedAssignment)!
    return (
      <div className="space-y-6 slide-up">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setSelectedAssignment(null)}>
            ← Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{assignment.title}</h1>
            <p className="text-muted-foreground">{assignment.description}</p>
          </div>
        </div>

        {/* Assignment Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Problems List */}
          <div className="lg:col-span-2">
            <Card className="neon-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Problems ({assignment.completedProblems}/{assignment.totalProblems})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {assignment.problems.map((problem, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border transition-all hover:shadow-lg ${
                      problem.completed
                        ? "bg-green-500/5 border-green-500/20"
                        : "bg-muted/30 border-border hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
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
                        <div>
                          <h4 className="font-semibold text-lg mb-1">{problem.title}</h4>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className={getPlatformColor(problem.platform)}>
                              {problem.platform}
                            </Badge>
                            <Badge variant="outline" className={getDifficultyColor(problem.difficulty)}>
                              {problem.difficulty}
                            </Badge>
                          </div>
                          {problem.timeSpent > 0 && (
                            <p className="text-sm text-muted-foreground">Time spent: {problem.timeSpent} minutes</p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="gap-2">
                          <ExternalLink className="h-4 w-4" />
                          {problem.completed ? "Review" : "Solve"}
                        </Button>
                        {problem.completed && problem.submissionId ? (
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-2"
                            onClick={() => onViewSubmission?.(problem.submissionId!)}
                          >
                            <Upload className="h-4 w-4" />
                            View Submission
                          </Button>
                        ) : (
                          !problem.completed && (
                            <Button
                              size="sm"
                              className="gap-2"
                              onClick={() => onViewSubmission?.(0)} // 0 for new submission
                            >
                              <Upload className="h-4 w-4" />
                              Submit
                            </Button>
                          )
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
            {/* Progress */}
            <Card className="neon-border">
              <CardHeader>
                <CardTitle>Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-primary mb-1">{assignment.progress}%</div>
                  <p className="text-sm text-muted-foreground">Complete</p>
                </div>
                <Progress value={assignment.progress} className="h-3 mb-4" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Problems solved:</span>
                    <span className="font-medium">
                      {assignment.completedProblems}/{assignment.totalProblems}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Due date:</span>
                    <span className="font-medium">{assignment.dueDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card className="neon-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {assignment.resources.map((resource, index) => (
                  <Button key={index} variant="outline" size="sm" className="w-full justify-start gap-2">
                    <ExternalLink className="h-4 w-4" />
                    {resource.title}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="neon-border">
              <CardContent className="p-4 space-y-2">
                <Button className="w-full gap-2">
                  <Play className="h-4 w-4" />
                  Continue Assignment
                </Button>
                <Button variant="outline" className="w-full">
                  Mark as Complete
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 slide-up">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">My Assignments</h1>
        <p className="text-muted-foreground">Track your progress and solve coding problems</p>
      </div>

      {/* Progress Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="neon-border bg-gradient-to-br from-primary/5 to-background">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">{assignments.length}</div>
            <div className="text-sm text-muted-foreground">Total Assignments</div>
          </CardContent>
        </Card>
        <Card className="neon-border bg-gradient-to-br from-green-500/5 to-background">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500 mb-1">{completedProblems}</div>
            <div className="text-sm text-muted-foreground">Problems Solved</div>
          </CardContent>
        </Card>
        <Card className="neon-border bg-gradient-to-br from-blue-500/5 to-background">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-500 mb-1">{inProgressCount}</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </CardContent>
        </Card>
        <Card className="neon-border bg-gradient-to-br from-orange-500/5 to-background">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-500 mb-1">
              {Math.round((completedProblems / totalProblems) * 100)}%
            </div>
            <div className="text-sm text-muted-foreground">Overall Progress</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="neon-border">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assignments..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="not-started">Not Started</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Assignments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAssignments.map((assignment) => (
          <Card
            key={assignment.id}
            className="neon-border hover:neon-glow transition-all cursor-pointer"
            onClick={() => setSelectedAssignment(assignment.id)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(assignment.status)}
                  <Badge className={getStatusColor(assignment.status)}>{assignment.status.replace("-", " ")}</Badge>
                </div>
                <Badge variant="outline" className={getDifficultyColor(assignment.difficulty)}>
                  {assignment.difficulty}
                </Badge>
              </div>
              <CardTitle className="text-xl">{assignment.title}</CardTitle>
              <p className="text-muted-foreground text-sm">{assignment.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span className="font-medium">{assignment.progress}%</span>
                </div>
                <Progress value={assignment.progress} className="h-2" />
              </div>

              {/* Problems Preview */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Problems</span>
                  <span className="font-medium">
                    {assignment.completedProblems}/{assignment.totalProblems}
                  </span>
                </div>
                <div className="flex -space-x-1">
                  {assignment.problems.slice(0, 5).map((problem, idx) => (
                    <div
                      key={idx}
                      className={`w-6 h-6 rounded-full border-2 border-background flex items-center justify-center text-xs ${
                        problem.completed ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {problem.completed ? "✓" : idx + 1}
                    </div>
                  ))}
                  {assignment.problems.length > 5 && (
                    <div className="w-6 h-6 rounded-full border-2 border-background bg-muted text-muted-foreground flex items-center justify-center text-xs">
                      +{assignment.problems.length - 5}
                    </div>
                  )}
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t border-border">
                <span>Due {assignment.dueDate}</span>
                <span>{assignment.topic}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
