"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  BookOpen,
  Code2,
  ExternalLink,
  Users,
  Target,
  ArrowLeft,

  CheckCircle
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AssignmentsListRedesignedProps {
  onViewSubmission?: (submissionId: number) => void
}

export function AssignmentsListRedesigned({ onViewSubmission }: AssignmentsListRedesignedProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedAssignment, setSelectedAssignment] = useState<number | null>(null)

  // Enhanced mock data with multiple problems and resources per assignment
  const assignments = [
    {
      id: 1,
      title: "Binary Search Mastery",
      description: "Master binary search algorithm through progressive problem solving and theoretical understanding",
      menteeId: 1,
      menteeName: "Alex Chen",
      menteeAvatar: "/placeholder-user.jpg",
      dueDate: "2024-01-30",
      status: "in_progress" as const,
      createdAt: "2024-01-20",
      totalProblems: 5,
      completedProblems: 3,
      problems: [
        {
          id: 1,
          title: "Binary Search",
          platform: "LeetCode",
          difficulty: "Easy",
          url: "https://leetcode.com/problems/binary-search/",
          completed: true,
          submissionId: 1
        },
        {
          id: 2,
          title: "Search Insert Position",
          platform: "LeetCode", 
          difficulty: "Easy",
          url: "https://leetcode.com/problems/search-insert-position/",
          completed: true,
          submissionId: 2
        },
        {
          id: 3,
          title: "Find First and Last Position",
          platform: "LeetCode",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
          completed: true,
          submissionId: 3
        },
        {
          id: 4,
          title: "Search in Rotated Sorted Array",
          platform: "LeetCode",
          difficulty: "Medium", 
          url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
          completed: false,
          submissionId: null
        },
        {
          id: 5,
          title: "Find Peak Element",
          platform: "LeetCode",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/find-peak-element/",
          completed: false,
          submissionId: null
        }
      ],
      resources: [
        {
          id: 1,
          title: "Binary Search Algorithm Guide",
          url: "https://example.com/binary-search-guide",
          description: "Comprehensive guide covering implementation and edge cases"
        },
        {
          id: 2,
          title: "Binary Search Visualization",
          url: "https://visualgo.net/en/bst",
          description: "Interactive visualization of binary search in action"
        }
      ]
    },
    {
      id: 2,
      title: "Graph Algorithms Foundation",
      description: "Build strong foundation in graph algorithms with DFS, BFS, and basic graph problems",
      menteeId: 1,
      menteeName: "Alex Chen",
      menteeAvatar: "/placeholder-user.jpg",
      dueDate: "2024-02-05",
      status: "pending" as const,

      createdAt: "2024-01-22",
      totalProblems: 4,
      completedProblems: 0,
      problems: [
        {
          id: 6,
          title: "Number of Islands",
          platform: "LeetCode",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/number-of-islands/",
          completed: false,
          submissionId: null
        },
        {
          id: 7,
          title: "Course Schedule",
          platform: "LeetCode",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/course-schedule/",
          completed: false,
          submissionId: null
        },
        {
          id: 8,
          title: "Clone Graph",
          platform: "LeetCode",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/clone-graph/",
          completed: false,
          submissionId: null
        },
        {
          id: 9,
          title: "Word Ladder",
          platform: "LeetCode", 
          difficulty: "Hard",
          url: "https://leetcode.com/problems/word-ladder/",
          completed: false,
          submissionId: null
        }
      ],
      resources: [
        {
          id: 3,
          title: "Graph Theory Fundamentals",
          url: "https://youtube.com/watch?v=example",
          description: "45-minute video covering graph representation and traversal"
        },
        {
          id: 4,
          title: "DFS vs BFS Comparison",
          url: "https://example.com/dfs-vs-bfs",
          description: "When to use depth-first vs breadth-first search"
        }
      ]
    },
    {
      id: 3,
      title: "Dynamic Programming Fundamentals",
      description: "Learn DP patterns through classic problems and build problem-solving intuition",
      menteeId: 2,
      menteeName: "Sarah Kim",
      menteeAvatar: "/placeholder-user.jpg",
      dueDate: "2024-02-10",
      status: "submitted" as const,
      createdAt: "2024-01-25",
      totalProblems: 3,
      completedProblems: 3,
      problems: [
        {
          id: 10,
          title: "Climbing Stairs",
          platform: "LeetCode",
          difficulty: "Easy",
          url: "https://leetcode.com/problems/climbing-stairs/",
          completed: true,
          submissionId: 4
        },
        {
          id: 11,
          title: "House Robber",
          platform: "LeetCode",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/house-robber/",
          completed: true,
          submissionId: 5
        },
        {
          id: 12,
          title: "Coin Change",
          platform: "LeetCode",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/coin-change/",
          completed: true,
          submissionId: 6
        }
      ],
      resources: [
        {
          id: 5,
          title: "Dynamic Programming Patterns",
          url: "https://example.com/dp-patterns.pdf",
          description: "Common DP patterns with examples and practice problems"
        }
      ]
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "submitted": return <Eye className="h-4 w-4 text-blue-500" />
      case "in_progress": return <Clock className="h-4 w-4 text-orange-500" />
      case "pending": return <Calendar className="h-4 w-4 text-gray-400" />
      default: return <AlertTriangle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusColor = (status: string) => {
    return ""
  }



  const getDifficultyColor = (difficulty: string) => {
    return "bg-muted text-muted-foreground"
  }

  const getResourceIcon = () => {
    return <BookOpen className="h-4 w-4 text-muted-foreground" />
  }

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch = 
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.menteeName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || assignment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Assignment Detail View
  if (selectedAssignment) {
    const assignment = assignments.find(a => a.id === selectedAssignment)!
    const progressPercentage = Math.round((assignment.completedProblems / assignment.totalProblems) * 100)

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
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{progressPercentage}%</div>
              <div className="text-sm text-muted-foreground">Progress</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground mb-1">
                {assignment.completedProblems}/{assignment.totalProblems}
              </div>
              <div className="text-sm text-muted-foreground">Problems</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground mb-1">{assignment.resources.length}</div>
              <div className="text-sm text-muted-foreground">Resources</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground mb-1">
                {new Date(assignment.dueDate).toLocaleDateString()}
              </div>
              <div className="text-sm text-muted-foreground">Due Date</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Problems List */}
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
                        ? "bg-muted/30 border-border" 
                        : "bg-muted/30 border-border"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            problem.completed
                              ? "bg-primary text-primary-foreground"
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
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="gap-2">
                          <ExternalLink className="h-3 w-3" />
                          View
                        </Button>
                        {problem.completed && problem.submissionId && (
                          <Button
                            size="sm"
                            className="gap-2"
                            onClick={() => onViewSubmission?.(problem.submissionId!)}
                          >
                            <Eye className="h-3 w-3" />
                            Review
                          </Button>
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
            {/* Mentee Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Assigned To
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={assignment.menteeAvatar} />
                    <AvatarFallback>
                      {assignment.menteeName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{assignment.menteeName}</p>
                    <div className="flex items-center gap-2 mt-1">

                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{progressPercentage}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
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
                {assignment.resources.map((resource) => {
                  const ResourceComponent = (
                    <div className="p-4 bg-muted/30 rounded-lg border transition-all cursor-pointer hover:bg-muted/50">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-md bg-muted/50 flex items-center justify-center">
                          {getResourceIcon()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h5 className="text-sm font-medium">{resource.title}</h5>
                            {resource.url && (
                              <span title="Opens in external site">
                                <ExternalLink className="h-3 w-3 text-blue-400" />
                              </span>
                            )}
                          </div>
                          {resource.description && (
                            <p className="text-xs text-muted-foreground mt-2">
                              {resource.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                  
                  return resource.url ? (
                    <Link 
                      key={resource.id}
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                    >
                      {ResourceComponent}
                    </Link>
                  ) : (
                    <div key={resource.id}>
                      {ResourceComponent}
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Assignment Details */}
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Created:</span>
                  <span className="font-medium">{new Date(assignment.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Due:</span>
                  <span className="font-medium">{new Date(assignment.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <Badge variant="outline" className={getStatusColor(assignment.status)}>
                    {assignment.status.replace('_', ' ')}
                  </Badge>
                </div>
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Assignments</h1>
          <p className="text-muted-foreground">Manage coding assignments with multiple problems and resources</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Assignment
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search assignments or mentees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Assignments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredAssignments.map((assignment) => {
          const progressPercentage = Math.round((assignment.completedProblems / assignment.totalProblems) * 100)
          const isOverdue = new Date(assignment.dueDate) < new Date() && !['completed', 'submitted'].includes(assignment.status)
          
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
                  {isOverdue && (
                    <Badge variant="destructive" className="text-xs">
                      Overdue
                    </Badge>
                  )}
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

                  {/* Mentee and Due Date */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Avatar className="h-4 w-4">
                        <AvatarImage src={assignment.menteeAvatar} />
                        <AvatarFallback className="text-xs">
                          {assignment.menteeName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium text-foreground">{assignment.menteeName}</span>
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
                </div>
              </CardContent>

              {/* Action Button for Submitted Assignments */}
              {assignment.status === 'submitted' && (
                <CardContent className="pt-0">
                  <Button size="sm" variant="default" className="w-full text-xs gap-2 font-medium" 
                          onClick={(e) => {
                            e.stopPropagation()
                            const submittedProblem = assignment.problems.find(p => p.completed && p.submissionId)
                            if (submittedProblem?.submissionId) {
                              onViewSubmission?.(submittedProblem.submissionId)
                            }
                          }}>
                    <Eye className="h-3.5 w-3.5" />
                    Review Submission
                  </Button>
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>

      {filteredAssignments.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Target className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
            <div className="text-muted-foreground">No assignments found</div>
            <Button variant="outline" className="mt-4 gap-2">
              <Plus className="h-4 w-4" />
              Create First Assignment
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 