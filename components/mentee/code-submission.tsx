"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Code, Upload, MessageSquare, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lightbulb, Play, XCircle, FileText, Trophy } from "lucide-react"
import { motion } from "framer-motion"
import toast from "react-hot-toast"

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
  submissionId?: number
  onBack?: () => void
}

export function CodeSubmission({ submissionId, onBack }: CodeSubmissionProps = {}) {
  const [selectedProblem] = useState<Problem>(sampleProblem)
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("python")
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [testResults, setTestResults] = useState<TestCase[]>([])
  const [showResults, setShowResults] = useState(false)
  const [currentTab, setCurrentTab] = useState("problem")

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 border-green-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Hard":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleRunCode = async () => {
    if (!code.trim()) {
      toast.error("Please write some code first!")
      return
    }

    setIsRunning(true)
    setCurrentTab("results")
    
    // Simulate API call to run code
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock test results
    const mockResults = selectedProblem.testCases.map((testCase, index) => ({
      ...testCase,
      passed: Math.random() > 0.3, // Random pass/fail for demo
      actualOutput: index === 0 ? "[0,1]" : testCase.expectedOutput
    }))
    
    setTestResults(mockResults)
    setShowResults(true)
    setIsRunning(false)
    
    const passedCount = mockResults.filter(t => t.passed).length
    if (passedCount === mockResults.length) {
      toast.success("All test cases passed! 🎉")
    } else {
      toast.error(`${passedCount}/${mockResults.length} test cases passed`)
    }
  }

  const handleSubmit = async () => {
    if (!code.trim()) {
      toast.error("Please write some code first!")
      return
    }

    setIsSubmitting(true)
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setIsSubmitting(false)
    toast.success("Solution submitted successfully!")
    
    // Reset for next problem
    setCode("")
    setTestResults([])
    setShowResults(false)
  }

  const getLanguageTemplate = (lang: string) => {
    switch (lang) {
      case "python":
        return `def twoSum(nums, target):
    # Your solution here
    pass`
      case "javascript":
        return `function twoSum(nums, target) {
    // Your solution here
}`
      case "java":
        return `public int[] twoSum(int[] nums, int target) {
    // Your solution here
}`
      case "cpp":
        return `vector<int> twoSum(vector<int>& nums, int target) {
    // Your solution here
}`
      default:
        return ""
    }
  }

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
    setCode(getLanguageTemplate(newLanguage))
  }

  return (
    <div className="space-y-6 slide-up">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Problems
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">{selectedProblem.title}</h1>
            <Badge className={getDifficultyColor(selectedProblem.difficulty)}>
              {selectedProblem.difficulty}
            </Badge>
          </div>
          <p className="text-muted-foreground">Solve this coding problem and submit your solution</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Problem Panel */}
        <Card className="h-fit">
          <CardHeader>
            <Tabs value={currentTab} onValueChange={setCurrentTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="problem" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Problem
                </TabsTrigger>
                <TabsTrigger value="results" className="gap-2">
                  <Trophy className="h-4 w-4" />
                  Results
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          
          <CardContent>
            <Tabs value={currentTab} onValueChange={setCurrentTab}>
              <TabsContent value="problem" className="space-y-6 mt-0">
                {/* Problem Description */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Description</h3>
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {selectedProblem.description}
                  </p>
                </div>

                {/* Examples */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Examples</h3>
                  <div className="space-y-4">
                    {selectedProblem.examples.map((example, index) => (
                      <div key={index} className="bg-muted/30 p-4 rounded-lg border">
                        <div className="font-medium text-sm mb-2">Example {index + 1}:</div>
                        <div className="space-y-2 text-sm font-mono">
                          <div>
                            <span className="text-blue-600 font-semibold">Input:</span> {example.input}
                          </div>
                          <div>
                            <span className="text-green-600 font-semibold">Output:</span> {example.output}
                          </div>
                          {example.explanation && (
                            <div className="text-muted-foreground">
                              <span className="font-semibold">Explanation:</span> {example.explanation}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Constraints */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Constraints</h3>
                  <ul className="space-y-1 text-sm">
                    {selectedProblem.constraints.map((constraint, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full"></div>
                        <code className="text-sm bg-muted px-1 rounded">{constraint}</code>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hints */}
                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Hint:</strong> Consider using a hash map to store the numbers you've seen and their indices.
                  </AlertDescription>
                </Alert>
              </TabsContent>

              <TabsContent value="results" className="space-y-4 mt-0">
                {!showResults ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Trophy className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Run your code to see test results</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Overall Status */}
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-700">
                          {testResults.filter(t => t.passed).length}/{testResults.length} Test Cases Passed
                        </span>
                      </div>
                    </div>

                    {/* Test Case Results */}
                    <div className="space-y-3">
                      {testResults.map((result, index) => (
                        <motion.div
                          key={result.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-4 rounded-lg border ${
                            result.passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {result.passed ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-600" />
                            )}
                            <span className="font-medium">Test Case {index + 1}</span>
                            <Badge variant={result.passed ? "default" : "destructive"}>
                              {result.passed ? "Passed" : "Failed"}
                            </Badge>
                          </div>
                          <div className="space-y-2 text-sm font-mono">
                            <div>
                              <span className="font-semibold">Input:</span> {result.input}
                            </div>
                            <div>
                              <span className="font-semibold">Expected:</span> {result.expectedOutput}
                            </div>
                            <div>
                              <span className="font-semibold">Actual:</span> {result.actualOutput || "N/A"}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Code Editor Panel */}
        <Card className="h-fit">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Solution
              </CardTitle>
              <div className="flex items-center gap-2">
                <Label htmlFor="language">Language:</Label>
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger id="language" className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Code Editor */}
            <div>
              <Textarea
                placeholder="Write your solution here..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="min-h-[400px] font-mono text-sm resize-none"
              />
            </div>

            {/* Time and Memory Limits */}
            <div className="flex gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Time Limit: {selectedProblem.timeLimit}s
              </div>
              <div className="flex items-center gap-1">
                <Trophy className="h-4 w-4" />
                Memory Limit: {selectedProblem.memoryLimit}MB
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleRunCode}
                disabled={isRunning || isSubmitting}
                variant="outline"
                className="flex-1 gap-2"
              >
                {isRunning ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Run Code
                  </>
                )}
              </Button>
              
              <Button
                onClick={handleSubmit}
                disabled={isRunning || isSubmitting}
                className="flex-1 gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Submit Solution
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
