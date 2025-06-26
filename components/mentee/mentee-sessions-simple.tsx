"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Video, CheckCircle, CircleDot } from "lucide-react"

export function MenteeSessionsSimple() {
  const [showPastSessions, setShowPastSessions] = useState(false)

  // Simplified mock data
  const upcomingSessions = [
    {
      id: 1,
      mentor: "Dr. Sarah Johnson",
      avatar: "/placeholder-user.jpg",
      date: "2024-01-28",
      time: "14:00",
      duration: 60,
      status: "confirmed" as const,
      topic: "Binary Search Review",
      meetingLink: "https://meet.google.com/abc-def-ghi"
    },
    {
      id: 2,
      mentor: "Dr. Sarah Johnson", 
      avatar: "/placeholder-user.jpg",
      date: "2024-02-02",
      time: "16:30",
      duration: 45,
      status: "pending" as const,
      topic: "Graph Algorithms",
      meetingLink: null
    },
    {
      id: 3,
      mentor: "Dr. Sarah Johnson",
      avatar: "/placeholder-user.jpg",
      date: "2024-02-05",
      time: "10:00",
      duration: 90,
      status: "confirmed" as const,
      topic: "System Design Basics",
      meetingLink: "https://zoom.us/j/123456789"
    }
  ]

  const pastSessions = [
    {
      id: 4,
      mentor: "Dr. Sarah Johnson",
      avatar: "/placeholder-user.jpg",
      date: "2024-01-20",
      time: "14:00",
      duration: 60,
      topic: "Array Algorithms",
      status: "completed" as const,
      notes: "Covered sorting algorithms and time complexity analysis. Great progress on understanding Big O notation."
    },
    {
      id: 5,
      mentor: "Dr. Sarah Johnson",
      avatar: "/placeholder-user.jpg",
      date: "2024-01-15",
      time: "16:00", 
      duration: 45,
      topic: "Introduction to Recursion",
      status: "completed" as const,
      notes: "Learned recursive thinking and practiced with factorial and fibonacci examples."
    },
    {
      id: 6,
      mentor: "Dr. Sarah Johnson",
      avatar: "/placeholder-user.jpg",
      date: "2024-01-10",
      time: "15:30",
      duration: 60,
      topic: "Getting Started",
      status: "completed" as const,
      notes: "Initial assessment and goal setting. Discussed learning path and expectations."
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed": return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending": return <CircleDot className="h-4 w-4 text-orange-500" />
      case "completed": return <CheckCircle className="h-4 w-4 text-blue-500" />
      default: return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-500/10 text-green-500 border-green-500/20"
      case "pending": return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      case "completed": return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/20"
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getDaysUntilSession = (dateStr: string) => {
    const sessionDate = new Date(dateStr)
    const today = new Date()
    const diffTime = sessionDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Tomorrow"
    if (diffDays > 0) return `In ${diffDays} days`
    return "Past"
  }

  if (showPastSessions) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setShowPastSessions(false)}>
            ← Back to Sessions
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Past Sessions</h1>
            <p className="text-muted-foreground">Review your completed mentoring sessions</p>
          </div>
        </div>

        <div className="space-y-4">
          {pastSessions.map((session) => (
            <Card key={session.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={session.avatar} />
                    <AvatarFallback>
                      {session.mentor.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{session.topic}</h3>
                      <Badge variant="outline" className={getStatusColor(session.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(session.status)}
                          {session.status}
                        </div>
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(session.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {session.time} • {session.duration} min
                      </span>
                      <span>with {session.mentor}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{session.notes}</p>
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Sessions</h1>
          <p className="text-muted-foreground">View your mentoring sessions and upcoming meetings</p>
        </div>
        <Button variant="outline" onClick={() => setShowPastSessions(true)}>
          View Past Sessions
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{upcomingSessions.length}</div>
            <div className="text-sm text-muted-foreground">Upcoming</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">{pastSessions.length}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500">
              {Math.round(pastSessions.length / (pastSessions.length + upcomingSessions.length) * 100)}%
            </div>
            <div className="text-sm text-muted-foreground">Attendance</div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingSessions.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">No upcoming sessions</p>
              <p className="text-sm text-muted-foreground mt-2">
                Contact your mentor to schedule your next session
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="p-4 bg-muted/30 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={session.avatar} />
                        <AvatarFallback>
                          {session.mentor.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{session.topic}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(session.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {session.time} • {session.duration} min
                          </span>
                          <span>with {session.mentor}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className={getStatusColor(session.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(session.status)}
                              {session.status}
                            </div>
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {getDaysUntilSession(session.date)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {session.meetingLink && session.status === 'confirmed' && (
                        <Button size="sm" className="gap-2">
                          <Video className="h-4 w-4" />
                          Join Session
                        </Button>
                      )}
                      {session.status === 'pending' && (
                        <Button size="sm" variant="outline" disabled>
                          Awaiting Confirmation
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 