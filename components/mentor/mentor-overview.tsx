"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Clock, 
  Calendar, 
  MessageSquare, 
  CheckCircle,
  ArrowRight,
  Target
} from "lucide-react"
import { useAppContext } from "@/lib/app-context"
import { ScheduleSessionModal } from "@/components/modals/schedule-session-modal"
import { CreateAssignmentModal } from "@/components/modals/create-assignment-modal"


export function MentorOverview() {
  const { state } = useAppContext()
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showAssignmentModal, setShowAssignmentModal] = useState(false)

  const mentor = state.mentor
  const upcomingSession = state.sessions.filter(session => 
    new Date(session.scheduledAt).toDateString() === new Date().toDateString()
  )[0]
  const pendingFeedback = state.assignments.filter(a => a.status === 'submitted').slice(0, 3)



  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden"
      >
        <Card className="border shadow-sm">
          <CardContent className="p-8">
            <div className="flex items-center gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <Avatar className="h-20 w-20">
                  <AvatarImage src={mentor.avatar} />
                  <AvatarFallback className="text-2xl">
                    {mentor.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">Welcome back, {mentor.name.split(' ')[0]}! 👋</h1>
                <p className="text-muted-foreground mb-4">Ready to guide your mentees today?</p>
                

              </div>

              {/* Quick Actions */}
              <div className="hidden lg:flex flex-col gap-2">
                <Button 
                  size="sm" 
                  className="gap-2"
                  onClick={() => setShowScheduleModal(true)}
                >
                  <Calendar className="h-4 w-4" />
                  Schedule Session
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => setShowAssignmentModal(true)}
                >
                  <Target className="h-4 w-4" />
                  Create Task
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>



      {/* Today's Focus */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Next Session */}
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              Next Session
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingSession ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>
                      {state.mentees.find((m) => m.id === upcomingSession.menteeId)?.name?.split(' ').map((n: string) => n[0]).join('') || 'M'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold">{upcomingSession.topic}</h4>
                    <p className="text-sm text-muted-foreground">
                      with {state.mentees.find((m) => m.id === upcomingSession.menteeId)?.name || 'Mentee'}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    {new Date(upcomingSession.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Badge>
                </div>
                <div className="text-center py-2 px-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-sm text-green-700 dark:text-green-300 font-medium">Session scheduled</p>
                  <p className="text-xs text-green-600 dark:text-green-400">Prepare your agenda and materials</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground mb-4">No sessions today</p>
                <Button 
                  variant="outline" 
                  onClick={() => setShowScheduleModal(true)}
                  className="gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Schedule Session
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pending Reviews */}
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-orange-500" />
              Pending Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pendingFeedback.length > 0 ? (
              <div className="space-y-3">
                {pendingFeedback.map((assignment) => {
                  const mentee = state.mentees.find((m) => m.id === assignment.menteeId)
                  return (
                    <div key={assignment.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>
                          {mentee?.name?.split(' ').map((n: string) => n[0]).join('') || 'M'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h5 className="font-medium text-sm">{assignment.title}</h5>
                        <p className="text-xs text-muted-foreground">{mentee?.name || 'Unknown'}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  )
                })}
                <Button className="w-full" variant="outline">
                  View All Reviews
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 mx-auto text-green-500/30 mb-4" />
                <p className="text-muted-foreground">All caught up! 🎉</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>



      {/* Modals */}
      <ScheduleSessionModal 
        open={showScheduleModal} 
        onOpenChange={setShowScheduleModal}
      />
      <CreateAssignmentModal 
        open={showAssignmentModal} 
        onOpenChange={setShowAssignmentModal}
      />
    </div>
  )
}
