"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ExternalLink,
  MessageSquare,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CodeEditor,
  type CodeLanguage,
} from "@/components/ui/code-editor-sheet";

interface TestCase {
  id: number
  input: string
  expectedOutput: string
  passed?: boolean
  actualOutput?: string
}

interface Problem {
  id: number
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  description: string
  examples: Array<{
    input: string
    output: string
    explanation?: string
  }>
  constraints: string[]
  testCases: TestCase[]
  timeLimit: number // in seconds
  memoryLimit: number // in MB
}

const sampleProblem: Problem = {
  id: 1,
  title: "Two Sum",
  difficulty: "Easy",
  description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
    },
    {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]"
    },
    {
      input: "nums = [3,3], target = 6",
      output: "[0,1]"
    }
  ],
  constraints: [
    "2 <= nums.length <= 10⁴",
    "-10⁹ <= nums[i] <= 10⁹",
    "-10⁹ <= target <= 10⁹",
    "Only one valid answer exists."
  ],
  testCases: [
    { id: 1, input: "[2,7,11,15]\n9", expectedOutput: "[0,1]" },
    { id: 2, input: "[3,2,4]\n6", expectedOutput: "[1,2]" },
    { id: 3, input: "[3,3]\n6", expectedOutput: "[0,1]" }
  ],
  timeLimit: 1,
  memoryLimit: 256
}

interface CodeSubmissionProps {
  submissionId: number
  onBack: () => void
}

export function CodeSubmission({ submissionId, onBack }: CodeSubmissionProps) {
  /* ––––– mock submission data (replace with real fetch) ––––– */
  const submission = {
    id: submissionId,
    problem: {
      title: "Two Sum",
      platform: "LeetCode",
      difficulty: "Easy",
      url: "https://leetcode.com/problems/two-sum/",
    },
    code: `def twoSum(nums, target):
    hash_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in hash_map:
            return [hash_map[complement], i]
        hash_map[num] = i
    return []`,
    language: "python" as CodeLanguage,
    notes: "Used hash map for O(n) time complexity. Space complexity is also O(n) in worst case.",
    submittedAt: "2024-01-26T15:30:00Z",
    status: "submitted",
  }

  const [code] = useState(submission.code)
  const [notes] = useState(submission.notes)
  const [language] = useState(submission.language)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-500/10 text-green-600 border-green-500/20"
      case "Medium": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "Hard": return "bg-red-500/10 text-red-600 border-red-500/20"
      default: return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted": return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      case "reviewed": return "bg-green-500/10 text-green-600 border-green-500/20"
      case "needs_revision": return "bg-orange-500/10 text-orange-600 border-orange-500/20"
      default: return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  return (
    <div className="space-y-6">
      {/* ========== HEADER ========== */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{submission.problem.title}</h1>
          <p className="text-muted-foreground">Your submitted solution</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={getDifficultyColor(submission.problem.difficulty)}>
            {submission.problem.difficulty}
          </Badge>
          <Badge className={getStatusColor(submission.status)}>
            {submission.status === "submitted" ? "Submitted" : submission.status}
          </Badge>
        </div>
      </div>

            {/* ========== SUBMISSION INFO ========== */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-1">{submission.problem.platform} Problem</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Submitted {new Date(submission.submittedAt).toLocaleDateString()}
                </span>
                <span>•</span>
                <span>Awaiting mentor review</span>
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => window.open(submission.problem.url, "_blank")}
              className="gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              View Problem
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ========== MAIN CONTENT GRID ========== */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* LEFT COLUMN - Approach & Status */}
        <div className="lg:col-span-2 space-y-6">
          {/* Your Approach */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Your Approach
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Your documented solution approach
              </p>
            </CardHeader>
            <CardContent>
              {notes ? (
                <div className="p-3 bg-muted/30 rounded-lg border min-h-[200px]">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{notes}</p>
                </div>
              ) : (
                <div className="p-3 bg-muted/30 rounded-lg border min-h-[200px] flex items-center justify-center">
                  <p className="text-sm text-muted-foreground italic">No approach notes were provided with this submission.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Status Section */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium text-blue-900 dark:text-blue-100">Submission Status</h4>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-700 dark:text-blue-200">
                  Your solution has been submitted successfully and is waiting for mentor review. 
                  You'll receive feedback once the review is complete.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN - Code Solution */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Submitted Solution
                </CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Language:</span>
                  <Select value={language} disabled>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="c_cpp">C++</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden bg-background">
                <CodeEditor
                  language={language}
                  value={code}
                  onChange={() => {}} // Read-only
                  className="h-[400px]"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
