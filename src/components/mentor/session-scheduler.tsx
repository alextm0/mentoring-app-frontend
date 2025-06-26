"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Plus, Video, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const sessions = [
  {
    id: 1,
    mentee: "Alex Chen",
    avatar: "/placeholder.svg",
    date: "2024-01-20",
    time: "14:00",
    duration: 60,
    status: "confirmed",
    type: "Algorithm Review",
    meetingLink: "https://meet.google.com/abc-def-ghi",
  },
  {
    id: 2,
    mentee: "Sarah Kim",
    avatar: "/placeholder.svg",
    date: "2024-01-20",
    time: "16:30",
    duration: 45,
    status: "pending",
    type: "Code Review",
    meetingLink: null,
  },
  {
    id: 3,
    mentee: "Mike Johnson",
    avatar: "/placeholder.svg",
    date: "2024-01-21",
    time: "10:00",
    duration: 90,
    status: "confirmed",
    type: "System Design",
    meetingLink: "https://zoom.us/j/123456789",
  },
]

const pastSessions = [
  {
    id: 4,
    mentee: "Alex Chen",
    avatar: "/placeholder.svg",
    date: "2024-01-18",
    time: "14:00",
    duration: 60,
    type: "Binary Search Deep Dive",
    notes:
      "Covered binary search implementation, discussed edge cases and optimization techniques. Alex showed good understanding of the algorithm.",
    topics: ["Binary Search", "Time Complexity", "Edge Cases"],
    // rating removed for MVP
  },
  {
    id: 5,
    mentee: "Sarah Kim",
    avatar: "/placeholder.svg",
    date: "2024-01-15",
    time: "16:00",
    duration: 45,
    type: "Graph Algorithms Introduction",
    notes:
      "Introduced DFS and BFS concepts. Sarah needs more practice with graph representation and traversal patterns.",
    topics: ["DFS", "BFS", "Graph Representation"],
    // rating removed for MVP
  },
]

export function SessionScheduler() {
  const [selectedDate, setSelectedDate] = useState("2024-01-20")
  const [showPastSessions, setShowPastSessions] = useState(false)
  const [currentWeek, setCurrentWeek] = useState(0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20"
    }
  }

  const todaySessions = sessions.filter((session) => session.date === selectedDate)
  const upcomingSessions = sessions.filter((session) => new Date(session.date) > new Date(selectedDate))

  // Generate week view
  const generateWeekDays = () => {
    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay() + currentWeek * 7)

    const days = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      days.push(day)
    }
    return days
  }

  const weekDays = generateWeekDays()

  if (showPastSessions) {
    return (
      <div className="space-y-6 slide-up">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setShowPastSessions(false)}>
            ← Back to Sessions
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Past Sessions</h1>
            <p className="text-muted-foreground">Review your previous mentoring sessions</p>
          </div>
        </div>

        {/* Past Sessions List */}
        <div className="space-y-4">
          {pastSessions.map((session) => (
            <Card key={session.id} className="neon-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={session.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {session.mentee
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{session.mentee}</h3>
                      <Badge variant="outline">{session.type}</Badge>
                      {/* Rating display removed for MVP */}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span>{session.date}</span>
                      <span>{session.time}</span>
                      <span>{session.duration} minutes</span>
                    </div>
                    <p className="text-sm mb-3">{session.notes}</p>
                    <div className="flex gap-2">
                      {session.topics.map((topic) => (
                        <Badge key={topic} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sessions</h1>
          <p className="text-muted-foreground">Schedule and manage mentoring sessions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowPastSessions(true)}>
            View Past Sessions
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2 neon-glow">
                <Plus className="h-4 w-4" />
                Schedule Session
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Schedule New Session</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="mentee">Mentee</Label>
                    <Select>
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
                  <div>
                    <Label htmlFor="type">Session Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-on-1">1-on-1 Mentoring</SelectItem>
                        <SelectItem value="code-review">Code Review</SelectItem>
                        <SelectItem value="algorithm">Algorithm Discussion</SelectItem>
                        <SelectItem value="career">Career Guidance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" type="time" />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="90">90 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="agenda">Session Agenda</Label>
                  <Textarea id="agenda" placeholder="What will you cover in this session?" rows={3} />
                </div>
                <div>
                  <Label htmlFor="meeting-link">Meeting Link (optional)</Label>
                  <Input id="meeting-link" placeholder="https://meet.google.com/..." />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Schedule Session</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Week View */}
      <Card className="neon-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Week View
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setCurrentWeek(currentWeek - 1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentWeek(0)}>
                Today
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentWeek(currentWeek + 1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, index) => {
              const dayStr = day.toISOString().split("T")[0]
              const daySessions = sessions.filter((s) => s.date === dayStr)
              const isToday = day.toDateString() === new Date().toDateString()

              return (
                <div
                  key={index}
                  className={`p-3 rounded-lg border transition-all cursor-pointer hover:border-primary/50 ${
                    isToday ? "bg-primary/10 border-primary/30" : "bg-muted/30 border-border"
                  }`}
                  onClick={() => setSelectedDate(dayStr)}
                >
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground mb-1">
                      {day.toLocaleDateString("en", { weekday: "short" })}
                    </div>
                    <div className={`text-lg font-semibold mb-2 ${isToday ? "text-primary" : ""}`}>{day.getDate()}</div>
                    <div className="space-y-1">
                      {daySessions.slice(0, 2).map((session) => (
                        <div key={session.id} className="text-xs p-1 bg-primary/20 rounded text-primary">
                          {session.time}
                        </div>
                      ))}
                      {daySessions.length > 2 && (
                        <div className="text-xs text-muted-foreground">+{daySessions.length - 2} more</div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Sessions */}
        <div className="lg:col-span-2">
          <Card className="neon-border">
            <CardHeader>
              <CardTitle>
                Sessions for{" "}
                {new Date(selectedDate).toLocaleDateString("en", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {todaySessions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No sessions scheduled for this day</p>
                </div>
              ) : (
                todaySessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-4 bg-muted/30 rounded-xl border border-border hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={session.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {session.mentee
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{session.mentee}</h4>
                          <Badge className={getStatusColor(session.status)}>{session.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{session.type}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {session.time} ({session.duration}min)
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {session.meetingLink && (
                          <div className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                            Video link ready
                          </div>
                        )}
                        <Button size="sm" variant="ghost">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Sessions */}
        <div>
          <Card className="neon-border">
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingSessions.slice(0, 5).map((session) => (
                <div key={session.id} className="p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs">
                        {session.mentee
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{session.mentee}</p>
                      <p className="text-xs text-muted-foreground">{session.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>
                      {session.date} at {session.time}
                    </span>
                    <Badge className={getStatusColor(session.status)} variant="outline">
                      {session.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
