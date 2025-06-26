"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Search, Filter, Edit, Trash2, ExternalLink, BookOpen, Users, Code } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AssignmentsListProps {
  onViewSubmission?: (submissionId: number) => void
}

const assignments = [
  {
    id: 1,
    title: "Binary Search Mastery",
    description: "Master binary search algorithm through progressive problem solving",
    mentee: "Alex Chen",
    avatar: "/placeholder.svg",
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
        submissionId: 1,
      },
      {
        title: "Search Insert Position",
        platform: "LeetCode",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/search-insert-position/",
        completed: true,
        submissionId: 2,
      },
      {
        title: "Find First and Last Position",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
        completed: true,
        submissionId: 3,
      },
      {
        title: "Search in Rotated Sorted Array",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
        completed: false,
        submissionId: 4,
      },
      {
        title: "Find Peak Element",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/find-peak-element/",
        completed: false,
        submissionId: 5,
      },
    ],
    resources: [
      { title: "Binary Search Algorithm Guide", type: "pdf", url: "#" },
      { title: "Binary Search Visualization", type: "interactive", url: "#" },
    ],
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Graph Fundamentals",
    description: "Build strong foundation in graph algorithms and traversal techniques",
    mentee: "Sarah Kim",
    avatar: "/placeholder.svg",
    dueDate: "2024-01-25",
    status: "not-started",
    difficulty: "Hard",
    topic: "Graphs",
    progress: 0,
    totalProblems: 4,
    completedProblems: 0,

    problems: [
      {
        title: "Number of Islands",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/number-of-islands/",
        completed: false,
        submissionId: 6,
      },
      {
        title: "Course Schedule",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/course-schedule/",
        completed: false,
        submissionId: 7,
      },
      {
        title: "Clone Graph",
        platform: "LeetCode",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/clone-graph/",
        completed: false,
        submissionId: 8,
      },
      {
        title: "Word Ladder",
        platform: "LeetCode",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/word-ladder/",
        completed: false,
        submissionId: 9,
      },
    ],
    resources: [
      { title: "Graph Theory Basics", type: "video", url: "#" },
      { title: "DFS vs BFS Explained", type: "article", url: "#" },
    ],
    createdAt: "2024-01-12",
  },
]

export function AssignmentsList({ onViewSubmission }: AssignmentsListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedAssignment, setSelectedAssignment] = useState<number | null>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    mentee: "",
    difficulty: "",
    topic: "",
    dueDate: "",
    problems: [{ title: "", platform: "LeetCode", difficulty: "Easy", url: "" }],
    resources: [{ title: "", type: "pdf", url: "" }],
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "in-progress":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "overdue":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "not-started":
        return "bg-gray-500/10 text-gray-400 border-gray-500/20"
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
      assignment.mentee.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || assignment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const addProblem = () => {
    setNewAssignment({
      ...newAssignment,
      problems: [...newAssignment.problems, { title: "", platform: "LeetCode", difficulty: "Easy", url: "" }],
    })
  }

  const addResource = () => {
    setNewAssignment({
      ...newAssignment,
      resources: [...newAssignment.resources, { title: "", type: "pdf", url: "" }],
    })
  }

  if (selectedAssignment) {
    const assignment = assignments.find((a) => a.id === selectedAssignment)!
    return (
      <div className="space-y-6 slide-up">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setSelectedAssignment(null)}>
            ← Back
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{assignment.title}</h1>
            <p className="text-muted-foreground">{assignment.description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        {/* Assignment Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="neon-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{assignment.progress}%</div>
              <div className="text-sm text-muted-foreground">Progress</div>
            </CardContent>
          </Card>
          <Card className="neon-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-500 mb-1">
                {assignment.completedProblems}/{assignment.totalProblems}
              </div>
              <div className="text-sm text-muted-foreground">Problems</div>
            </CardContent>
          </Card>
          <Card className="neon-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-500 mb-1">{assignment.topic}</div>
              <div className="text-sm text-muted-foreground">Topic</div>
            </CardContent>
          </Card>
          <Card className="neon-border">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-500 mb-1">{assignment.dueDate}</div>
              <div className="text-sm text-muted-foreground">Due Date</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Problems List */}
          <div className="lg:col-span-2">
            <Card className="neon-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Problems ({assignment.completedProblems}/{assignment.totalProblems})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {assignment.problems.map((problem, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border transition-all ${
                      problem.completed ? "bg-green-500/5 border-green-500/20" : "bg-muted/30 border-border"
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
                        <div>
                          <h4 className="font-semibold text-lg mb-1">{problem.title}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={getPlatformColor(problem.platform)}>
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
                          <ExternalLink className="h-4 w-4" />
                          View
                        </Button>
                        {problem.completed && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-2"
                            onClick={() => onViewSubmission?.(problem.submissionId || 1)}
                          >
                            <Code className="h-4 w-4" />
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
            <Card className="neon-border">
              <CardHeader>
                <CardTitle>Assigned To</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={assignment.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {assignment.mentee
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{assignment.mentee}</p>
                    <Badge className={getStatusColor(assignment.status)}>{assignment.status.replace("-", " ")}</Badge>
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
                  <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                    <span className="text-sm">{resource.title}</span>
                    <Button size="sm" variant="ghost">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Assignment Details */}
            <Card className="neon-border">
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Topic:</span>
                  <span className="font-medium">{assignment.topic}</span>
                </div>
                <div className="flex justify-between">
                  <span>Difficulty:</span>
                  <Badge variant="outline" className={getDifficultyColor(assignment.difficulty)}>
                    {assignment.difficulty}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Created:</span>
                  <span className="font-medium">{assignment.createdAt}</span>
                </div>
                <div className="flex justify-between">
                  <span>Due:</span>
                  <span className="font-medium">{assignment.dueDate}</span>
                </div>
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Assignments</h1>
          <p className="text-muted-foreground">Create and manage coding assignments for your mentees</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2 neon-glow">
              <Plus className="h-4 w-4" />
              Create Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Assignment</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Assignment Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Binary Search Mastery"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="mentee">Assign to Mentee</Label>
                  <Select
                    value={newAssignment.mentee}
                    onValueChange={(value) => setNewAssignment({ ...newAssignment, mentee: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select mentee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alex">Alex Chen</SelectItem>
                      <SelectItem value="sarah">Sarah Kim</SelectItem>
                      <SelectItem value="mike">Mike Johnson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the learning objectives and goals..."
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select
                    value={newAssignment.difficulty}
                    onValueChange={(value) => setNewAssignment({ ...newAssignment, difficulty: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="topic">Topic</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., Algorithms"
                    value={newAssignment.topic}
                    onChange={(e) => setNewAssignment({ ...newAssignment, topic: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="due-date">Due Date</Label>
                  <Input
                    id="due-date"
                    type="date"
                    value={newAssignment.dueDate}
                    onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                  />
                </div>
              </div>

              {/* Problems Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-base font-semibold">Problems</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addProblem}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Problem
                  </Button>
                </div>
                <div className="space-y-4">
                  {newAssignment.problems.map((problem, index) => (
                    <Card key={index} className="p-4">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label>Problem Title</Label>
                          <Input
                            placeholder="e.g., Binary Search"
                            value={problem.title}
                            onChange={(e) => {
                              const updatedProblems = [...newAssignment.problems]
                              updatedProblems[index].title = e.target.value
                              setNewAssignment({ ...newAssignment, problems: updatedProblems })
                            }}
                          />
                        </div>
                        <div>
                          <Label>Platform</Label>
                          <Select
                            value={problem.platform}
                            onValueChange={(value) => {
                              const updatedProblems = [...newAssignment.problems]
                              updatedProblems[index].platform = value
                              setNewAssignment({ ...newAssignment, problems: updatedProblems })
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="LeetCode">LeetCode</SelectItem>
                              <SelectItem value="HackerRank">HackerRank</SelectItem>
                              <SelectItem value="CodeForces">CodeForces</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Difficulty</Label>
                          <Select
                            value={problem.difficulty}
                            onValueChange={(value) => {
                              const updatedProblems = [...newAssignment.problems]
                              updatedProblems[index].difficulty = value
                              setNewAssignment({ ...newAssignment, problems: updatedProblems })
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Easy">Easy</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="Hard">Hard</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Problem URL</Label>
                          <Input
                            placeholder="https://leetcode.com/problems/..."
                            value={problem.url}
                            onChange={(e) => {
                              const updatedProblems = [...newAssignment.problems]
                              updatedProblems[index].url = e.target.value
                              setNewAssignment({ ...newAssignment, problems: updatedProblems })
                            }}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Resources Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-base font-semibold">Resources</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addResource}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Resource
                  </Button>
                </div>
                <div className="space-y-4">
                  {newAssignment.resources.map((resource, index) => (
                    <Card key={index} className="p-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label>Resource Title</Label>
                          <Input
                            placeholder="e.g., Binary Search Guide"
                            value={resource.title}
                            onChange={(e) => {
                              const updatedResources = [...newAssignment.resources]
                              updatedResources[index].title = e.target.value
                              setNewAssignment({ ...newAssignment, resources: updatedResources })
                            }}
                          />
                        </div>
                        <div>
                          <Label>Type</Label>
                          <Select
                            value={resource.type}
                            onValueChange={(value) => {
                              const updatedResources = [...newAssignment.resources]
                              updatedResources[index].type = value
                              setNewAssignment({ ...newAssignment, resources: updatedResources })
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pdf">PDF Document</SelectItem>
                              <SelectItem value="video">Video</SelectItem>
                              <SelectItem value="article">Article</SelectItem>
                              <SelectItem value="interactive">Interactive</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>URL</Label>
                          <Input
                            placeholder="https://..."
                            value={resource.url}
                            onChange={(e) => {
                              const updatedResources = [...newAssignment.resources]
                              updatedResources[index].url = e.target.value
                              setNewAssignment({ ...newAssignment, resources: updatedResources })
                            }}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowCreateDialog(false)}>Create Assignment</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Basic Stats Only */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="neon-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">{assignments.length}</div>
            <div className="text-sm text-muted-foreground">Total Assignments</div>
          </CardContent>
        </Card>

        <Card className="neon-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500 mb-1">
              {assignments.filter((a) => a.status === "completed").length}
            </div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>

        <Card className="neon-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-500 mb-1">
              {assignments.filter((a) => a.status === "in-progress").length}
            </div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="neon-border">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assignments or mentees..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
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
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assignments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssignments.map((assignment) => (
          <Card
            key={assignment.id}
            className="neon-border hover:neon-glow transition-all cursor-pointer"
            onClick={() => setSelectedAssignment(assignment.id)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(assignment.status)}>{assignment.status.replace("-", " ")}</Badge>
                  <Badge variant="outline" className={getDifficultyColor(assignment.difficulty)}>
                    {assignment.difficulty}
                  </Badge>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-xl">{assignment.title}</CardTitle>
              <p className="text-muted-foreground text-sm">{assignment.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Mentee Info */}
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={assignment.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {assignment.mentee
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{assignment.mentee}</p>
                  <p className="text-xs text-muted-foreground">Due {assignment.dueDate}</p>
                </div>
              </div>

              {/* Progress */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span className="font-medium">{assignment.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${assignment.progress}%` }}
                  />
                </div>
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
                <span>{assignment.topic}</span>
                <span>{assignment.difficulty}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
