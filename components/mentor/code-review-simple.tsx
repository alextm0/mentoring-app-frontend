"use client";

import {
  useState,
  useRef,
  useLayoutEffect,
  useMemo,
  type RefObject,
} from "react";
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
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Plus,
  X,
} from "lucide-react";
import {
  CodeEditor,
  type CodeLanguage,
} from "@/components/ui/code-editor-sheet";
import { useAppContext } from "@/lib/app-context";
import toast from "react-hot-toast";

/* ------------------------------------------------------------------ */
/* 🪝  tiny utility to keep overlay perfectly aligned with the editor */
/* ------------------------------------------------------------------ */
function useEditorMetrics(ref: RefObject<HTMLElement | null>) {
  const [m, setM] = useState({ lh: 21, padT: 4, padL: 4 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const read = () => {
      const line = ref.current!.querySelector(
        ".ace_line",
      ) as HTMLElement | null;
      const content = ref.current!.querySelector(
        ".ace_content",
      ) as HTMLElement | null;
      if (line && content) {
        setM({
          lh: line.getBoundingClientRect().height,
          padT: parseFloat(getComputedStyle(content).paddingTop),
          padL: parseFloat(getComputedStyle(content).paddingLeft),
        });
      }
    };
    read();
    const ro = new ResizeObserver(read);
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [ref]);

  return m; // { lh: lineHeight, padT, padL }
}

/* ------------------------------------------------------------------ */
/* 🧩  main component                                                 */
/* ------------------------------------------------------------------ */
interface InlineComment {
  id: string;
  line: number;
  comment: string;
  timestamp: string;
}
interface CodeReviewSimpleProps {
  submissionId: number;
  onBack: () => void;
}

export default function CodeReviewSimple({
  submissionId,
  onBack,
}: CodeReviewSimpleProps) {
  const { dispatch } = useAppContext();

  /* ––––– state ––––– */
  const [comment, setComment] = useState("");
  const [isReviewed, setIsReviewed] = useState(false);
  const [inlineComments, setInlineComments] = useState<InlineComment[]>([]);
  const [showingLine, setShowingLine] = useState<number | null>(null);
  const [newComment, setNewComment] = useState("");

  /* ––––– mock submission (replace with real fetch) ––––– */
  const submission = {
    id: submissionId,
    assignment: {
      title: "Binary Search Implementation",
      description:
        "Implement binary search algorithm with proper error handling",
    },
    mentee: { name: "Alex Chen", avatar: "/placeholder-user.jpg" },
    code: `def binary_search(arr, target):
    """
    Performs binary search on a sorted array.
    ...
    return -1`,
    language: "python",
    submittedAt: "2024-01-26T10:30:00Z",
    problem: {
      title: "Binary Search",
      platform: "LeetCode",
      url: "https://leetcode.com/problems/binary-search/",
    },
  };

  /* ––––– helpers ––––– */
  const addInlineComment = (line: number) => {
    setInlineComments((p) => [
      ...p,
      {
        id: Date.now().toString(),
        line,
        comment: newComment.trim(),
        timestamp: new Date().toLocaleString(),
      },
    ]);
    toast.success("Comment added");
    setNewComment("");
    setShowingLine(null);
  };
  const removeInlineComment = (id: string) =>
    setInlineComments((p) => p.filter((c) => c.id !== id));
  const completeReview = () => {
    if (!comment.trim() && inlineComments.length === 0) {
      toast.error("Add some feedback first");
      return;
    }
    setIsReviewed(true);
    dispatch({
      type: "UPDATE_ASSIGNMENT_STATUS",
      assignmentId: submission.id,
      status: "completed",
    });
    toast.success("✅ Review completed");
  };
  const statusColor = isReviewed
    ? "bg-green-500/10 text-green-500 border-green-500/20"
    : "bg-orange-500/10 text-orange-500 border-orange-500/20";

  /* ––––– editor overlay metrics ––––– */
  const editorRef = useRef<HTMLDivElement | null>(null);
  const { lh, padT, padL } = useEditorMetrics(editorRef);

  /* ––––– derived memo ––––– */
  const codeLines = useMemo(
    () => submission.code.split("\n"),
    [submission.code],
  );

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
          <h1 className="text-2xl font-bold">{submission.assignment.title}</h1>
          <p className="text-muted-foreground">
            {submission.assignment.description}
          </p>
        </div>
        <Badge className={statusColor}>
          {isReviewed ? "Reviewed" : "Pending"}
        </Badge>
      </div>

      {/* ========== INFO BAR ========== */}
      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={submission.mentee.avatar} />
            <AvatarFallback>
              {submission.mentee.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold">{submission.mentee.name}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(submission.submittedAt).toLocaleDateString()}
              </span>
              <span>•</span>
              <span>
                {submission.problem.title} ({submission.problem.platform})
              </span>
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
        </CardContent>
      </Card>

      {/* ========== GRID ========== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ==== CODE REVIEW PANE ==== */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Code Review</CardTitle>
          </CardHeader>
          <CardContent>
            {/* --- code editor + overlay --- */}
            <div
              ref={editorRef}
              className="relative rounded-lg border bg-background overflow-hidden"
            >
              <CodeEditor
                language={submission.language as CodeLanguage}
                value={submission.code}
                className="h-[500px]"
              />
              {/* overlay */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                <div
                  className="h-full w-full pointer-events-auto select-none"
                  style={{ paddingTop: padT, paddingLeft: padL }}
                >
                  {codeLines.map((_, i) => {
                    const ln = i + 1;
                    const hasComment = inlineComments.some(
                      (c) => c.line === ln,
                    );
                    return (
                      <button
                        key={ln}
                        type="button"
                        aria-label={`Line ${ln}`}
                        onClick={() => setShowingLine(ln)}
                        className={`group relative w-full flex items-center text-left transition-colors duration-100 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                          hasComment
                            ? "bg-blue-500/10 border-l-4 border-blue-500"
                            : "hover:bg-blue-500/5 hover:border-l-4 hover:border-blue-300"
                        }`}
                        style={{ height: lh }}
                      >
                        {/* right indicator */}
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                          {hasComment ? (
                            <>
                              <MessageSquare className="h-3 w-3 text-blue-600" />
                              <span className="text-xs text-blue-600">
                                Comment
                              </span>
                            </>
                          ) : (
                            <span className="opacity-0 group-hover:opacity-100 flex items-center gap-1">
                              <Plus className="h-3 w-3 text-blue-600" />
                              <span className="text-xs text-blue-600">
                                Add
                              </span>
                            </span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* --- inline comments list --- */}
            {inlineComments.length > 0 && (
              <div className="space-y-4 mt-6">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  Line Comments ({inlineComments.length})
                </h3>
                {inlineComments
                  .sort((a, b) => a.line - b.line)
                  .map((c) => (
                    <div
                      key={c.id}
                      className="group relative bg-card border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      {/* Header with line number and actions */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="font-mono text-xs">
                            Line {c.line}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {c.timestamp}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeInlineComment(c.id)}
                          className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-red-600"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {/* Code snippet */}
                      <div className="mb-3 p-3 bg-muted/50 rounded-md border">
                        <code className="text-sm font-mono text-foreground">
                          {codeLines[c.line - 1]}
                        </code>
                      </div>
                      
                      {/* Comment content */}
                      <div className="bg-background border rounded-md p-3">
                        <p className="text-sm leading-relaxed text-foreground">
                          {c.comment}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* ==== SIDEBAR ==== */}
        <div className="space-y-6">
          {/* feedback summary */}
          {inlineComments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Feedback ({inlineComments.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  You commented on {inlineComments.length}{" "}
                  {inlineComments.length === 1 ? "line" : "lines"}.
                </p>
              </CardContent>
            </Card>
          )}
          {/* overall feedback */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Overall Feedback
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                rows={4}
                placeholder="Write overall feedback..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={isReviewed}
              />
              <Button
                onClick={completeReview}
                disabled={
                  isReviewed ||
                  (!comment.trim() && inlineComments.length === 0)
                }
                className="w-full gap-2"
                variant={isReviewed ? "outline" : "default"}
              >
                <CheckCircle2 className="h-4 w-4" />
                {isReviewed ? "Review Completed" : "Complete Review"}
              </Button>
              {isReviewed && (
                <p className="rounded-lg border bg-green-50 p-3 text-sm font-medium text-green-700 dark:bg-green-900/20 dark:text-green-300">
                  ✅ Review completed! The mentee has been notified.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ========== COMMENT MODAL ========== */}
      {showingLine && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowingLine(null)}
        >
          <div
            className="w-full max-w-md space-y-4 rounded-lg border bg-background p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <MessageSquare className="h-5 w-5 text-blue-500" />
              Comment on line {showingLine}
            </h3>
            <code className="block rounded border bg-muted px-3 py-2 font-mono text-sm">
              {codeLines[showingLine - 1]}
            </code>
            <Textarea
              rows={4}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Provide specific feedback…"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setNewComment("");
                  setShowingLine(null);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => addInlineComment(showingLine)}
                disabled={!newComment.trim()}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Comment
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
