"use client"

import { useState } from "react"
import { Plus, FileText, Calendar, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export function QuickAddFAB() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Radial menu items */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 space-y-2">
          <Button
            size="sm"
            className="flex items-center gap-2 shadow-lg animate-in slide-in-from-bottom-2"
            style={{ animationDelay: "0ms" }}
          >
            <FileText className="h-4 w-4" />
            New Task
          </Button>
          <Button
            size="sm"
            className="flex items-center gap-2 shadow-lg animate-in slide-in-from-bottom-2"
            style={{ animationDelay: "50ms" }}
          >
            <Calendar className="h-4 w-4" />
            New Session
          </Button>
          <Button
            size="sm"
            className="flex items-center gap-2 shadow-lg animate-in slide-in-from-bottom-2"
            style={{ animationDelay: "100ms" }}
          >
            <BookOpen className="h-4 w-4" />
            New Resource
          </Button>
        </div>
      )}

      {/* Main FAB */}
      <Button
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Plus className={`h-6 w-6 transition-transform ${isOpen ? "rotate-45" : ""}`} />
      </Button>
    </div>
  )
}
