"use client"

import { Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const upcomingSessions = [
  { id: 1, mentee: "Alex Chen", time: "2:00 PM", avatar: "/placeholder.svg", urgent: false },
  { id: 2, mentee: "Sarah Kim", time: "4:30 PM", avatar: "/placeholder.svg", urgent: true },
  { id: 3, mentee: "Mike Johnson", time: "6:00 PM", avatar: "/placeholder.svg", urgent: false },
]

export function TodayStrip() {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left 60% - Next 3 Sessions */}
          <div className="lg:col-span-3">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Today's Sessions
            </h2>
            <div className="flex flex-wrap gap-3">
              {upcomingSessions.map((session) => (
                <Card
                  key={session.id}
                  className={`p-3 cursor-pointer transition-all hover:shadow-md ${
                    session.urgent ? "bg-orange-50 border-orange-200" : "bg-blue-50 border-blue-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {session.mentee
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{session.mentee}</div>
                      <Badge variant={session.urgent ? "destructive" : "secondary"} className="text-xs">
                        {session.time}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Right 40% - Pending Reviews */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Pending Reviews
            </h2>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">4</div>
              <div className="text-gray-600 mb-4">Tasks Need Feedback</div>
              <Button className="w-full">Go to Review</Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
