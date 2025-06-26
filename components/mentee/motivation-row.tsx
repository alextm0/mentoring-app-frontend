"use client"

import { Clock, Flame, Star, ExternalLink } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const dueSoonTasks = [
  { id: 1, title: "Binary Search", topic: "Algorithms", due: "Today" },
  { id: 2, title: "Hash Tables", topic: "Data Structures", due: "Tomorrow" },
  { id: 3, title: "Graph DFS", topic: "Graphs", due: "Jan 16" },
]

export function MotivationRow() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Tasks Due Soon */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-orange-600" />
          <h3 className="font-semibold">Due Soon</h3>
        </div>
        <div className="space-y-3">
          {dueSoonTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 p-2 rounded-lg bg-orange-50 border-l-4 border-orange-400"
            >
              <div className="flex-1">
                <div className="font-medium text-sm">{task.title}</div>
                <Badge variant="secondary" className="text-xs">
                  {task.topic}
                </Badge>
              </div>
              <div className="text-xs text-orange-600 font-medium">{task.due}</div>
            </div>
          ))}
        </div>
        <Button variant="ghost" size="sm" className="w-full mt-3 text-orange-600">
          <ExternalLink className="h-4 w-4 mr-2" />
          View All Tasks
        </Button>
      </Card>

      {/* Streak Widget */}
      <Card className="p-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Flame className="h-8 w-8 text-orange-500 pulse-glow" />
        </div>
        <div className="text-2xl font-bold mb-1">5-Day</div>
        <div className="text-gray-600 mb-3">Practice Streak</div>
        <div className="text-xs text-gray-500">Practice daily to keep your streak alive! 🔥</div>
      </Card>

      {/* Level Progress */}
      <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Star className="h-8 w-8 text-blue-600" />
        </div>
        <div className="font-semibold mb-1">Level 8</div>
        <div className="text-sm text-gray-600 mb-3">2,400 / 3,200 XP</div>
        <Progress value={75} className="h-2 mb-3" />
        <div className="text-xs text-gray-500">800 XP to Level 9!</div>
      </Card>
    </div>
  )
}
