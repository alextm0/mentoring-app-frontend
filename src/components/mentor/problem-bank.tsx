"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Plus, 
  Search, 
  Code, 
  Copy,
  Edit,
  Trash2,
  Filter,
  MoreHorizontal,
  ExternalLink
} from "lucide-react"
import { BankProblem } from "@/types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data - will be replaced with API calls
const mockProblems: BankProblem[] = [
  {
    id: 1,
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    difficulty: "Easy",
    externalUrl: "https://leetcode.com/problems/two-sum/",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
    mentorId: 1,
    solution: "Use a hash map to store seen numbers and their indices"
  },
  {
    id: 2,
    title: "Valid Parentheses",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    difficulty: "Easy",
    externalUrl: "https://leetcode.com/problems/valid-parentheses/",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-12",
    mentorId: 1
  },
  {
    id: 3,
    title: "Binary Tree Inorder Traversal",
    description: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
    difficulty: "Medium",
    externalUrl: "https://leetcode.com/problems/binary-tree-inorder-traversal/",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-05",
    mentorId: 1
  }
]

export function ProblemBank() {
  const [problems, setProblems] = useState<BankProblem[]>(mockProblems)
  const [searchQuery, setSearchQuery] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all")
  const [showAddModal, setShowAddModal] = useState(false)
  const [newProblem, setNewProblem] = useState<{
    title: string
    description: string
    difficulty: "Easy" | "Medium" | "Hard"
    solution: string
    testCases: string
    externalUrl: string
  }>({
    title: "",
    description: "",
    difficulty: "Easy",
    solution: "",
    testCases: "",
    externalUrl: ""
  })

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         problem.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesDifficulty = difficultyFilter === "all" || problem.difficulty === difficultyFilter
    
    return matchesSearch && matchesDifficulty
  })

  const handleAddProblem = () => {
    const problem: BankProblem = {
      id: Math.max(...problems.map(p => p.id)) + 1,
      title: newProblem.title,
      description: newProblem.description,
      difficulty: newProblem.difficulty,
      externalUrl: newProblem.externalUrl,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      mentorId: 1,
      solution: newProblem.solution || undefined,
      testCases: newProblem.testCases || undefined
    }

    setProblems([problem, ...problems])
    setShowAddModal(false)
    setNewProblem({
      title: "",
      description: "",
      difficulty: "Easy",
      solution: "",
      testCases: "",
      externalUrl: ""
    })
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "Hard": return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Problem Bank</h1>
          <p className="text-muted-foreground">Manage your coding problems for reuse across assignments</p>
        </div>
        
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Problem
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Problem</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newProblem.title}
                  onChange={(e) => setNewProblem(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Two Sum"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProblem.description}
                  onChange={(e) => setNewProblem(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the problem requirements..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select value={newProblem.difficulty} onValueChange={(value: "Easy" | "Medium" | "Hard") => 
                  setNewProblem(prev => ({ ...prev, difficulty: value }))
                }>
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

              <div className="space-y-2">
                <Label htmlFor="externalUrl">External URL</Label>
                <Input
                  id="externalUrl"
                  value={newProblem.externalUrl}
                  onChange={(e) => setNewProblem(prev => ({ ...prev, externalUrl: e.target.value }))}
                  placeholder="Enter the external URL of the problem..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="solution">Solution Hint (optional)</Label>
                <Textarea
                  id="solution"
                  value={newProblem.solution}
                  onChange={(e) => setNewProblem(prev => ({ ...prev, solution: e.target.value }))}
                  placeholder="Brief solution approach or hint..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="testCases">Test Cases (optional)</Label>
                <Textarea
                  id="testCases"
                  value={newProblem.testCases}
                  onChange={(e) => setNewProblem(prev => ({ ...prev, testCases: e.target.value }))}
                  placeholder="Example test cases..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddProblem} disabled={!newProblem.title || !newProblem.description || !newProblem.externalUrl}>
                  Add Problem
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search problems by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Problems List */}
      <div className="space-y-4">
        {filteredProblems.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Code className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-medium mb-2">No problems found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || difficultyFilter !== "all" 
                  ? "Try adjusting your search filters" 
                  : "Add your first coding problem to get started"
                }
              </p>
              {!searchQuery && difficultyFilter === "all" && (
                <Button onClick={() => setShowAddModal(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Your First Problem
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredProblems.map((problem) => (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group"
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-lg font-semibold">{problem.title}</h3>
                        <Badge className={getDifficultyColor(problem.difficulty)}>
                          {problem.difficulty}
                        </Badge>
                        {problem.externalUrl && (
                          <Button variant="ghost" size="sm" className="gap-1 h-6 px-2" asChild>
                            <a href={problem.externalUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                        )}
                      </div>

                      <p className="text-muted-foreground">{problem.description}</p>

                      <div className="text-xs text-muted-foreground">
                        Created {new Date(problem.createdAt).toLocaleDateString()}
                        {problem.updatedAt !== problem.createdAt && (
                          <span> • Updated {new Date(problem.updatedAt).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Copy className="h-4 w-4" />
                          Use in Assignment
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Edit className="h-4 w-4" />
                          Edit Problem
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive">
                          <Trash2 className="h-4 w-4" />
                          Delete Problem
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Stats */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{problems.length}</div>
              <div className="text-sm text-muted-foreground">Total Problems</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{problems.filter(p => p.difficulty === "Easy").length}</div>
              <div className="text-sm text-muted-foreground">Easy</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{problems.filter(p => p.difficulty === "Medium").length}</div>
              <div className="text-sm text-muted-foreground">Medium</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{problems.filter(p => p.difficulty === "Hard").length}</div>
              <div className="text-sm text-muted-foreground">Hard</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 