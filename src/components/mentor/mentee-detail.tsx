"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Calendar,
  Code,
  BookOpen,
  Clock,
} from "lucide-react"

interface MenteeDetailProps {
  menteeId: number
  onBack: () => void
  onViewSubmission?: (submissionId: number) => void
}

const menteeData = {
  id: 1,
  name: "Alex Chen",
  email: "alex@example.com",
  avatar: "/placeholder.svg",
  level: "Intermediate",
  joinedDate: "2023-10-15",
  totalSessions: 12,
  completedAssignments: 8,
  totalAssignments: 10,
  focusAreas: ["Algorithms", "Data Structures", "System Design"],
  recentActivity: [
    {
      id: 1,
      type: "submission",
      title: "Binary Search - Submitted",
      date: "2024-01-19",
      status: "pending-review",
    },
    {
      id: 2,
      type: "session",
      title: "Algorithm Review Session",
      date: "2024-01-18",
      status: "completed",
    },
    {
      id: 3,
      type: "assignment",
      title: "Dynamic Programming Basics - Started",
      date: "2024-01-17",
      status: "in-progress",
    },
  ],
  assignments: [
    {
      id: 1,
      title: "Binary Search Mastery",
      problems: 5,
      completed: 4,
      status: "in-progress",
      dueDate: "2024-01-25",
    },
    {
      id: 2,
      title: "Dynamic Programming Basics",
      problems: 8,
      completed: 2,
      status: "in-progress",
      dueDate: "2024-01-30",
    },
  ],
  sessions: [
    {
      id: 1,
      date: "2024-01-18",
      topic: "Algorithm Review",
      duration: 60,
      // rating removed for MVP
      notes: "Great progress on binary search implementation",
    },
    {
      id: 2,
      date: "2024-01-15",
      topic: "Data Structures Overview",
      duration: 45,
      // rating removed for MVP
      notes: "Need more practice with linked lists",
    },
  ],
}

export function MenteeDetail({ menteeId, onBack, onViewSubmission }: MenteeDetailProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "submission":
        return <Code className="h-4 w-4 text-blue-500" />
      case "session":
        return <Calendar className="h-4 w-4 text-green-500" />
      case "assignment":
        return <BookOpen className="h-4 w-4 text-purple-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500"
      case "in-progress":
        return "bg-blue-500/10 text-blue-500"
      case "pending-review":
        return "bg-yellow-500/10 text-yellow-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Mentees
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Mentee Profile</h1>
          <p className="text-muted-foreground">Detailed view and progress tracking</p>
        </div>
        <Button className="gap-2">
          <Calendar className="h-4 w-4" />
          Schedule Session
        </Button>
      </div>

      {/* Profile Header */}
      <Card className="border shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={menteeData.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-xl">AC</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold">{menteeData.name}</h2>
                <Badge variant="secondary">{menteeData.level}</Badge>
              </div>
              <p className="text-muted-foreground mb-3">{menteeData.email}</p>
              <div className="flex items-center gap-6 text-sm">
                <div>
                  <span className="text-muted-foreground">Joined: </span>
                  <span className="font-medium">{menteeData.joinedDate}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">XP: </span>
                  <span className="font-medium text-primary">1,250</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>



      {/* Detailed Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          {/* Recent Activity */}
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {menteeData.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">{activity.date}</span>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(activity.status)} variant="outline">
                          {activity.status.replace("-", " ")}
                        </Badge>
                        {activity.type === "submission" && activity.status === "pending-review" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs h-6"
                            onClick={() => onViewSubmission?.(activity.id)}
                          >
                            Review
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="mt-4">
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle>Current Assignments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {menteeData.assignments.map((assignment) => (
                <div key={assignment.id} className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{assignment.title}</h3>
                    <Badge className={getStatusColor(assignment.status)}>{assignment.status.replace("-", " ")}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>
                        {assignment.completed}/{assignment.problems} problems
                      </span>
                    </div>
                    <Progress value={(assignment.completed / assignment.problems) * 100} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Due: {assignment.dueDate}</span>
                      <span>{Math.round((assignment.completed / assignment.problems) * 100)}% complete</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>


      </Tabs>
    </div>
  )
}
