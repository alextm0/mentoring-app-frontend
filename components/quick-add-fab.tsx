"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Plus, BookOpen, Video, FileText, X } from "lucide-react"
import { ScheduleSessionModal } from "@/components/modals/schedule-session-modal"
import { CreateAssignmentModal } from "@/components/modals/create-assignment-modal"

interface QuickAction {
  id: string
  label: string
  icon: React.ElementType
  color: string
  bgColor: string
  onClick: () => void
}

export function QuickAddFAB() {
  const [isOpen, setIsOpen] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showAssignmentModal, setShowAssignmentModal] = useState(false)

  const quickActions: QuickAction[] = [
    {
      id: "assignment",
      label: "Create Assignment",
      icon: BookOpen,
      color: "text-green-600",
      bgColor: "bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800",
      onClick: () => {
        setShowAssignmentModal(true)
        setIsOpen(false)
      }
    },
    {
      id: "session",
      label: "Schedule Session",
      icon: Video,
      color: "text-blue-600",
      bgColor: "bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800",
      onClick: () => {
        setShowScheduleModal(true)
        setIsOpen(false)
      }
    },
    {
      id: "resource",
      label: "Add Resource",
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-100 hover:bg-purple-200 dark:bg-purple-900 dark:hover:bg-purple-800",
      onClick: () => {
        // TODO: Implement resource modal
        alert("Add Resource functionality coming soon!")
        setIsOpen(false)
      }
    }
  ]

  return (
    <TooltipProvider>
      <div className="fixed bottom-6 right-6 z-50">
        {/* Quick Action Items */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-16 right-0 flex flex-col gap-3"
            >
              {quickActions.map((action, index) => {
                const Icon = action.icon
                return (
                  <motion.div
                    key={action.id}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: { delay: index * 0.05 }
                    }}
                    exit={{ 
                      opacity: 0, 
                      y: 20, 
                      scale: 0.8,
                      transition: { delay: (quickActions.length - index - 1) * 0.05 }
                    }}
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="lg"
                          className={`h-12 w-12 rounded-full shadow-lg ${action.bgColor} ${action.color} border-0 hover:scale-110 transition-transform`}
                          onClick={action.onClick}
                        >
                          <Icon className="h-5 w-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="left" className="font-medium">
                        {action.label}
                      </TooltipContent>
                    </Tooltip>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground border-0"
                onClick={() => setIsOpen(!isOpen)}
              >
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
                </motion.div>
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent side="left" className="font-medium">
            {isOpen ? "Close" : "Quick Actions"}
          </TooltipContent>
        </Tooltip>

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
    </TooltipProvider>
  )
} 