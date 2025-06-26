"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Code, ExternalLink, Edit, Trash2, Users, TrendingUp, CheckCircle } from "lucide-react"

interface ProblemDetailProps {
  problemId: number
  onBack: () => void
  onViewSubmission?: (submissionId: number) => void
}

const problemData = {
  id: 1,
  title: "Two Sum",
  difficulty: "Easy",
  category: "Arrays",
  platform: "LeetCode",
  url: "https://leetcode.com/problems/two-sum/",
  description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]",
      explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
    },
  ],
  constraints: [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "-10^9 <= target <= 10^9",
    "Only one valid answer exists.",
  ],
  tags: ["arrays", "hash-table", "beginner"],
  hints: [
    "A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Again, it's best to try out brute force solutions for just for completeness. It is from these brute force solutions that you can come up with optimizations.",
    "So, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y which is value - x where value is the input parameter. Can we change our array somehow so that this search becomes faster?",
    "The second train of thought is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?",
  ],
  solutions: [
    {
      id: 1,
      language: "Python",
      code: `def twoSum(nums, target):
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      explanation:
        "Use a hash map to store numbers and their indices. For each number, check if its complement exists in the map.",
    },
  ],
  submissions: [
    {
      id: 1,
      mentee: "Alex Chen",
      submittedAt: "2024-01-19 16:30",
      status: "approved",
      language: "Python",
      feedback: "Excellent solution! Clean implementation with optimal time complexity.",
    },
    {
      id: 2,
      mentee: "Sarah Kim",
      submittedAt: "2024-01-18 14:20",
      status: "needs-revision",
      language: "JavaScript",
      feedback: "Good approach but consider edge cases and optimize the nested loops.",
    },
  ],
  stats: {
    totalAttempts: 45,
    successRate: 78,
    assignedTo: 12,
  },
}

export function ProblemDetail({ problemId, onBack, onViewSubmission }: ProblemDetailProps) {
  const [activeTab, setActiveTab] = useState("description")

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/10 text-green-500"
      case "needs-revision":
        return "bg-orange-500/10 text-orange-500"
      case "pending":
        return "bg-yellow-500/10 text-yellow-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  return (
    <div className="space-y-6 slide-up">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Problems
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{problemData.title}</h1>
          <p className="text-muted-foreground">Problem details and submissions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            View on {problemData.platform}
          </Button>
          <Button variant="outline" className="gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" className="gap-2 text-red-500 hover:text-red-600">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Problem Header */}
      <Card className="neon-border">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-2xl font-bold">{problemData.title}</h2>
                <Badge className={getDifficultyColor(problemData.difficulty)}>{problemData.difficulty}</Badge>
                <Badge variant="outline">{problemData.category}</Badge>
                <Badge variant="outline" className="bg-orange-500/10 text-orange-500">
                  {problemData.platform}
                </Badge>
              </div>
              <div className="flex gap-2 mb-3">
                {problemData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Basic Info Only */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Users className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <div className="text-xl font-bold">{problemData.stats.assignedTo}</div>
              <div className="text-sm text-muted-foreground">Assigned To</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="solutions">Solutions</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="hints">Hints</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="space-y-6">
          <Card className="neon-border">
            <CardHeader>
              <CardTitle>Problem Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm leading-relaxed whitespace-pre-line">{problemData.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Examples</h3>
                <div className="space-y-4">
                  {problemData.examples.map((example, index) => (
                    <div key={index} className="p-4 bg-muted/30 rounded-lg">
                      <div className="font-medium mb-2">Example {index + 1}:</div>
                      <div className="space-y-1 text-sm font-mono">
                        <div>
                          <span className="text-muted-foreground">Input:</span> {example.input}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Output:</span> {example.output}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Explanation:</span> {example.explanation}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Constraints</h3>
                <ul className="space-y-1 text-sm">
                  {problemData.constraints.map((constraint, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary rounded-full"></div>
                      <code className="bg-muted/50 px-2 py-1 rounded text-xs">{constraint}</code>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="solutions" className="space-y-6">
          <Card className="neon-border">
            <CardHeader>
              <CardTitle>Reference Solutions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {problemData.solutions.map((solution) => (
                <div key={solution.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{solution.language}</Badge>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>Time: {solution.timeComplexity}</span>
                      <span>Space: {solution.spaceComplexity}</span>
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-4">
                    <pre className="text-sm font-mono overflow-x-auto">
                      <code>{solution.code}</code>
                    </pre>
                  </div>

                  <div className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/20">
                    <h4 className="font-medium mb-2">Explanation:</h4>
                    <p className="text-sm text-muted-foreground">{solution.explanation}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submissions" className="space-y-6">
          <Card className="neon-border">
            <CardHeader>
              <CardTitle>Recent Submissions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {problemData.submissions.map((submission) => (
                <div key={submission.id} className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{submission.mentee}</span>
                      <Badge variant="outline">{submission.language}</Badge>
                      <Badge className={getStatusColor(submission.status)}>{submission.status.replace("-", " ")}</Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">{submission.submittedAt}</span>
                  </div>
                  <p className="text-sm">{submission.feedback}</p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" onClick={() => onViewSubmission?.(submission.id)}>
                      <Code className="h-4 w-4 mr-2" />
                      Review Code
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hints" className="space-y-6">
          <Card className="neon-border">
            <CardHeader>
              <CardTitle>Hints for Mentees</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {problemData.hints.map((hint, index) => (
                <div key={index} className="p-4 bg-yellow-500/5 rounded-lg border border-yellow-500/20">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center text-xs font-bold text-yellow-600">
                      {index + 1}
                    </div>
                    <p className="text-sm flex-1">{hint}</p>
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t border-border">
                <h4 className="font-medium mb-2">Add New Hint</h4>
                <div className="space-y-2">
                  <Textarea placeholder="Enter a helpful hint for mentees..." rows={3} />
                  <Button size="sm">Add Hint</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
