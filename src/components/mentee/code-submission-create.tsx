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
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  MessageSquare,
  Upload,
  CheckCircle2,
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
import { useAppContext } from "@/lib/app-context";
import toast from "react-hot-toast";

interface CodeSubmissionCreateProps {
  problemId: number;
  onBack: () => void;
}

export default function CodeSubmissionCreate({
  problemId,
  onBack,
}: CodeSubmissionCreateProps) {
  const { dispatch } = useAppContext();

  /* ––––– state ––––– */
  const [code, setCode] = useState("");
  const [notes, setNotes] = useState("");
  const [language, setLanguage] = useState<CodeLanguage>("python");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ––––– mock problem data (replace with real fetch) ––––– */
  const problem = {
    id: problemId,
    title: "Search in Rotated Sorted Array",
    platform: "LeetCode",
    difficulty: "Medium",
    url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    description: "There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k.",
    xp: 150,
    assignment: {
      title: "Binary Search Mastery",
      description: "Master binary search algorithm through progressive problem solving",
    },
    mentor: {
      name: "Sarah Johnson",
      avatar: "/placeholder-user.jpg",
    },
  };

  /* ––––– helpers ––––– */
  const submitSolution = async () => {
    if (!code.trim()) {
      toast.error("Please write some code before submitting");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update context (mock submission creation)
      dispatch({
        type: "UPDATE_ASSIGNMENT_STATUS",
        assignmentId: problem.id,
        status: "submitted",
      });

      toast.success("🎉 Solution submitted successfully!");
      onBack();
    } catch (error) {
      toast.error("Failed to submit solution. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-500/10 text-green-600 border-green-500/20";
      case "Medium": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "Hard": return "bg-red-500/10 text-red-600 border-red-500/20";
      default: return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  /* ––––– render ––––– */
  return (
    <div className="space-y-6">
      {/* ========== HEADER ========== */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{problem.title}</h1>
          <p className="text-muted-foreground">{problem.assignment.title}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={getDifficultyColor(problem.difficulty)}>
            {problem.difficulty}
          </Badge>
          <Badge variant="secondary">{problem.xp} XP</Badge>
        </div>
      </div>

      {/* ========== PROBLEM INFO ========== */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-1">{problem.platform} Problem</h3>
              <p className="text-sm text-muted-foreground">
                Solve this coding problem and submit your solution
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => window.open(problem.url, "_blank")}
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
        {/* LEFT COLUMN - Approach */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Your Approach
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Plan your solution before coding
              </p>
            </CardHeader>
            <CardContent>
              <Textarea
                rows={8}
                placeholder="• What algorithm will you use?&#10;• What's the time/space complexity?&#10;• Any edge cases to consider?&#10;• Step-by-step approach..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="resize-none"
              />
            </CardContent>
          </Card>

          {/* Submit Button - Moved to left column */}
          <Card>
            <CardContent className="p-4">
              <Button
                onClick={submitSolution}
                disabled={isSubmitting || !code.trim()}
                className="w-full gap-2"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Submit Solution
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Make sure to document your approach above before submitting
              </p>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN - Code Editor */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Code Solution</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Language:</span>
                  <Select value={language} onValueChange={(value) => setLanguage(value as CodeLanguage)}>
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
                  onChange={setCode}
                  className="h-[400px]"
                  placeholder="Write your solution here..."
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 