"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, Plus, ExternalLink, Eye, Users, TrendingUp } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PracticeProblemsProps {
  onSelectProblem: (problemId: number) => void
}

const problems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays",
    platform: "LeetCode",
    url: "https://leetcode.com/problems/two-sum/",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    tags: ["arrays", "hash-table", "beginner"],
    stats: {
      totalAttempts: 45,
      successRate: 78,
      assignedTo: 12,
    },
    submissions: 8,
    lastUsed: "2024-01-19",
  },
  {
    id: 2,
    title: "Binary Search",
    difficulty: "Easy",
    category: "Algorithms",
    platform: "LeetCode",
    url: "https://leetcode.com/problems/binary-search/",
    description:
      "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums.",
    tags: ["binary-search", "algorithms"],
    stats: {
      totalAttempts: 32,
      successRate: 85,
      assignedTo: 8,
    },
    submissions: 12,
    lastUsed: "2024-01-20",
  },
  {
    id: 3,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    category: "Strings",
    platform: "LeetCode",
    url: "https://leetcode.com/problems/longest-palindromic-substring/",
    description: "Given a string s, return the longest palindromic substring in s.",
    tags: ["strings", "dynamic-programming"],
    stats: {
      totalAttempts: 28,
      successRate: 65,
      assignedTo: 6,
    },
    submissions: 5,
    lastUsed: "2024-01-18",
  },
  {
    id: 4,
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    category: "Linked Lists",
    platform: "LeetCode",
    url: "https://leetcode.com/problems/merge-k-sorted-lists/",
    description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.",
    tags: ["linked-list", "divide-and-conquer", "heap"],
    stats: {
      totalAttempts: 15,
      successRate: 42,
      assignedTo: 3,
    },
    submissions: 2,
    lastUsed: "2024-01-15",
  },
  {
    id: 5,
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    platform: "LeetCode",
    url: "https://leetcode.com/problems/valid-parentheses/",
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    tags: ["stack", "string"],
    stats: {
      totalAttempts: 38,
      successRate: 82,
      assignedTo: 10,
    },
    submissions: 15,
    lastUsed: "2024-01-21",
  },
]

export function PracticeProblems({ onSelectProblem }: PracticeProblemsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "Medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "Hard":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20"
    }
  }

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesDifficulty = difficultyFilter === "all" || problem.difficulty.toLowerCase() === difficultyFilter
    const matchesCategory = categoryFilter === "all" || problem.category.toLowerCase() === categoryFilter
    return matchesSearch && matchesDifficulty && matchesCategory
  })

  const categories = [...new Set(problems.map((p) => p.category))]

  return (
    <div className="space-y-6 slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Problem Bank</h1>
          <p className="text-muted-foreground">Manage coding problems and track submissions</p>
        </div>
        <Button className="gap-2 neon-glow">
          <Plus className="h-4 w-4" />
          Add Problem
        </Button>
      </div>

      {/* Basic Stats Only */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="neon-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">{problems.length}</div>
            <div className="text-sm text-muted-foreground">Total Problems</div>
          </CardContent>
        </Card>

        <Card className="neon-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-500 mb-1">
              {problems.reduce((acc, p) => acc + p.stats.assignedTo, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Active Assignments</div>
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
                placeholder="Search problems, categories, or tags..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="w-32">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Problems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProblems.map((problem) => (
          <Card key={problem.id} className="neon-border hover:neon-glow transition-all">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge className={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</Badge>
                  <Badge variant="outline">{problem.category}</Badge>
                </div>
                <Badge variant="outline" className="bg-orange-500/10 text-orange-500">
                  {problem.platform}
                </Badge>
              </div>
              <CardTitle className="text-xl">{problem.title}</CardTitle>
              <p className="text-muted-foreground text-sm line-clamp-2">{problem.description}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Tags */}
              <div className="flex gap-1 flex-wrap">
                {problem.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {problem.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{problem.tags.length - 3}
                  </Badge>
                )}
              </div>

              {/* Basic Stats Only */}
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-center gap-1">
                    <Users className="h-3 w-3 text-blue-500" />
                    <span className="text-sm font-bold text-blue-500">{problem.stats.assignedTo}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Assigned</div>
                </div>
                <div className="p-2 bg-muted/30 rounded-lg">
                  <div className="text-sm font-bold text-purple-500">{problem.submissions}</div>
                  <div className="text-xs text-muted-foreground">Submissions</div>
                </div>
              </div>

              {/* Last Used */}
              <div className="text-xs text-muted-foreground">Last used: {problem.lastUsed}</div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1 gap-2" onClick={() => onSelectProblem(problem.id)}>
                  <Eye className="h-4 w-4" />
                  View Details
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Open
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
