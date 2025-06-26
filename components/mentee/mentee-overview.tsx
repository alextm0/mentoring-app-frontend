"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  Trophy,
  Target,
  BookOpen,
  Clock,
  CheckCircle,
  Zap,
  ArrowRight
} from "lucide-react"
import { getCurrentMentee, getMenteeAssignments, getUpcomingSessions } from "@/lib/mock-data"
import toast from "react-hot-toast"

// Extend Date prototype for week calculation
declare global {
  interface Date {
    getWeek(): number
  }
}

Date.prototype.getWeek = function() {
  const date = new Date(this.getTime())
  date.setHours(0, 0, 0, 0)
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7)
  const week1 = new Date(date.getFullYear(), 0, 4)
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7)
}

export function MenteeOverview() {
  const menteeData = getCurrentMentee()
  const assignments = getMenteeAssignments(menteeData.id)
  const upcomingSessions = getUpcomingSessions(menteeData.id, 'mentee')
  const [showConfetti, setShowConfetti] = useState(false)

  const nextSession = upcomingSessions[0]
  const pendingAssignments = assignments.filter(a => a.status === 'pending' || a.status === 'in_progress').slice(0, 3)

  const handleCompleteTask = (taskId: number) => {
    setShowConfetti(true)
    toast.success("🎉 Task completed! +50 XP gained!", {
      duration: 3000,
      style: {
        background: '#10B981',
        color: 'white',
      }
    })
    setTimeout(() => setShowConfetti(false), 3000)
  }





  const levelProgress = (menteeData.totalXP % 400) / 400 * 100
  const nextLevelXP = (menteeData.currentLevel + 1) * 400
  const currentLevelXP = menteeData.currentLevel * 400
  const xpToNextLevel = nextLevelXP - menteeData.totalXP

  return (
    <div className="space-y-6">
      {/* Clean Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden"
      >
        <Card className="border shadow-sm bg-card">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative flex-shrink-0"
              >
                <Avatar className="h-16 w-16 ring-2 ring-primary/20">
                  <AvatarImage src={menteeData.avatar} />
                  <AvatarFallback className="text-lg font-medium">
                    {menteeData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs font-bold">
                  Lv.{menteeData.currentLevel}
                </div>
              </motion.div>
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-1">Welcome back, {menteeData.name}! 👋</h1>
                <p className="text-muted-foreground mb-4">Ready to continue your coding journey?</p>
                
                {/* Key metrics inline */}
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-primary" />
                    <span className="font-medium">{menteeData.assignmentStats.completed} completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span className="font-medium">{menteeData.totalXP.toLocaleString()} XP</span>
                  </div>
                </div>

                {/* XP Progress Bar */}
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">Level {menteeData.currentLevel}</span>
                    <span className="text-muted-foreground">{xpToNextLevel} XP to next level</span>
                  </div>
                  <Progress value={levelProgress} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Session */}
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Next Session
            </CardTitle>
          </CardHeader>
          <CardContent>
            {nextSession ? (
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-4 bg-muted/30 rounded-lg border"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{nextSession.topic}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(nextSession.scheduledAt).toLocaleDateString()} at{' '}
                      {new Date(nextSession.scheduledAt).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                  <Badge variant="secondary">Scheduled</Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  Duration: {nextSession.duration} minutes
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No upcoming sessions</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Schedule Session
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Current Assignments */}
        <div className="lg:col-span-2">
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Current Assignments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingAssignments.map((assignment, index) => (
                <motion.div
                  key={assignment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-muted/30 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer group"
                  onClick={() => handleCompleteTask(assignment.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        assignment.status === 'in_progress' ? 'bg-blue-500' : 'bg-muted-foreground'
                      }`} />
                      <div>
                        <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                          {assignment.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {assignment.description}
                        </p>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="text-xs gap-1 h-7 px-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCompleteTask(assignment.id)
                      }}
                    >
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Due {new Date(assignment.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Trophy className="h-3 w-3" />
                        +{assignment.xpReward} XP
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium">{assignment.progress}%</span>
                      <div className="w-16 bg-muted rounded-full h-1.5">
                        <div 
                          className="bg-primary h-1.5 rounded-full transition-all" 
                          style={{ width: `${assignment.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {pendingAssignments.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>All caught up! Great work!</p>
                </div>
              )}
              
              <Button variant="outline" className="w-full mt-4">
                View All Assignments
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>



      {/* Confetti Animation */}
      {showConfetti && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none z-50"
        >
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -10,
                rotate: 0,
              }}
              animate={{
                y: window.innerHeight + 10,
                rotate: 360,
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  )
}
