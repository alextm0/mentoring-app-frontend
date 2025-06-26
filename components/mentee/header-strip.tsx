"use client"

import { Clock, Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function HeaderStrip() {
  const nextSession = {
    mentor: "John Doe",
    avatar: "/placeholder.svg",
    timeLeft: "3h 12m",
  }

  const currentLevel = {
    level: 5,
    xp: 1250,
    nextLevelXp: 1500,
    progress: 83,
  }

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          {/* Left 70% - Next Session Banner */}
          <div className="lg:col-span-7">
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={nextSession.avatar || "/placeholder.svg"} />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">Next Session with {nextSession.mentor}</h2>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Starting in {nextSession.timeLeft}</span>
                  </div>
                </div>
                <div className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                  <span className="text-sm font-medium text-blue-700">Ready</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right 30% - XP & Level */}
          <div className="lg:col-span-3">
            <Card className="p-6 text-center bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="h-6 w-6 text-yellow-600 pulse-glow" />
                <span className="text-2xl font-bold">Level {currentLevel.level}</span>
              </div>
              <div className="text-sm text-gray-600 mb-3">
                {currentLevel.xp} / {currentLevel.nextLevelXp} XP
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div
                  className="progress-gradient h-3 rounded-full transition-all"
                  style={{ width: `${currentLevel.progress}%` }}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
