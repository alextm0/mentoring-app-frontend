"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const mentees = [
  {
    id: 1,
    name: "Alex Chen",
    avatar: "/placeholder.svg",
    progress: 85,
    nextSession: "Today 2:00 PM",
    tasksComplete: 17,
    totalTasks: 20,
  },
  {
    id: 2,
    name: "Sarah Kim",
    avatar: "/placeholder.svg",
    progress: 72,
    nextSession: "Today 4:30 PM",
    tasksComplete: 13,
    totalTasks: 18,
  },
  {
    id: 3,
    name: "Mike Johnson",
    avatar: "/placeholder.svg",
    progress: 45,
    nextSession: "Tomorrow 10:00 AM",
    tasksComplete: 9,
    totalTasks: 20,
  },
]

interface MenteeRosterProps {
  onSelectMentee: (menteeId: string) => void
}

export function MenteeRoster({ onSelectMentee }: MenteeRosterProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Mentee Roster</h2>
      {mentees.map((mentee) => (
        <Card
          key={mentee.id}
          className="p-4 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onSelectMentee(mentee.id.toString())}
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={mentee.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {mentee.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {/* Progress ring */}
              <svg className="absolute -inset-1 h-14 w-14 transform -rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r="26"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-gray-200"
                />
                <circle
                  cx="28"
                  cy="28"
                  r="26"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 26}`}
                  strokeDashoffset={`${2 * Math.PI * 26 * (1 - mentee.progress / 100)}`}
                  className="text-primary transition-all"
                />
              </svg>
            </div>

            <div className="flex-1">
              <h3 className="font-medium">{mentee.name}</h3>
              <p className="text-sm text-gray-600">
                {mentee.tasksComplete}/{mentee.totalTasks} tasks complete
              </p>
              <Badge variant="secondary" className="text-xs mt-1">
                {mentee.nextSession}
              </Badge>
            </div>

            <div className="text-right">
              <div className="text-lg font-bold text-primary">{mentee.progress}%</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
