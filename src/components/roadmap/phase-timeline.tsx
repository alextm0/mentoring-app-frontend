"use client"

import { motion } from "framer-motion"
import { Phase } from "./shared-types"
import { getStatusColor, calculatePhaseProgress } from "./roadmap-utils"
import { CheckCircle, Play, Circle, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PhaseTimelineProps {
  phases: Phase[]
  selectedPhase?: number | null
  onPhaseSelect?: (phaseId: number) => void
  onAddPhase?: () => void
  showAddButton?: boolean
  menteeProgress?: any
}

export function PhaseTimeline({ 
  phases, 
  selectedPhase, 
  onPhaseSelect, 
  onAddPhase, 
  showAddButton = false,
  menteeProgress 
}: PhaseTimelineProps) {

  const getPhaseIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "in_progress": 
        return <Play className="w-4 h-4" />
      case "available":
        return <Circle className="w-4 h-4" />
      default:
        return <Circle className="w-4 h-4" />
    }
  }

  // All phases are clickable now (no locks)
  const isPhaseClickable = (phase: Phase) => {
    return true
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Learning Path</h3>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-border" />
        
        <div className="space-y-4">
          {phases.map((phase, index) => {
            const progress = calculatePhaseProgress(phase, menteeProgress)
            const isSelected = selectedPhase === phase.id
            const isClickable = isPhaseClickable(phase)
            
            // Determine actual phase status based on progress
            const getPhaseStatus = () => {
              if (!menteeProgress) return phase.status
              if (progress === 100) return "completed"
              if (progress > 0) return "in_progress"
              return "available"
            }
            
            const actualStatus = getPhaseStatus()
            
            return (
              <motion.div
                key={phase.id}
                className={`
                  relative flex items-start space-x-4 p-4 rounded-lg border transition-all
                  ${isSelected ? 'bg-primary/5 border-primary/20' : 'bg-background border-border'}
                  ${isClickable ? 'hover:bg-muted/50 cursor-pointer' : 'cursor-default'}
                `}
                onClick={() => isClickable && onPhaseSelect?.(phase.id)}
                whileHover={isClickable ? { x: 4 } : {}}
              >
                {/* Phase icon */}
                <div className={`
                  relative z-10 w-12 h-12 rounded-full border-2 
                  flex items-center justify-center transition-all
                  ${getStatusColor(actualStatus)}
                `}>
                  {getPhaseIcon(actualStatus)}
                  
                  {/* Progress ring */}
                  {progress > 0 && (
                    <svg
                      className="absolute inset-0 w-full h-full -rotate-90"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeOpacity="0.2"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 45}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                        animate={{ 
                          strokeDashoffset: 2 * Math.PI * 45 * (1 - progress / 100)
                        }}
                        transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
                      />
                    </svg>
                  )}
                </div>

                {/* Phase content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">{phase.title}</h4>
                    {progress > 0 && (
                      <span className="text-sm text-muted-foreground">
                        {progress}%
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {phase.description}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs text-muted-foreground">
                      {phase.topics.length} topics
                    </span>
                    <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                    <span className={`text-xs ${getStatusColor(actualStatus).split(' ')[1]}`}>
                      {actualStatus.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
          
          {/* Add Phase Button */}
            {showAddButton && onAddPhase && (
            <motion.div
              className="relative flex items-start space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: phases.length * 0.1 }}
            >
              <Button 
                variant="outline" 
                size="sm" 
                className="w-12 h-12 rounded-full border-dashed border-2 hover:border-primary"
                onClick={onAddPhase}
              >
                <Plus className="w-4 h-4" />
              </Button>
              <div className="flex-1 flex items-center h-12">
                <span className="text-sm text-muted-foreground">Add new phase</span>
              </div>
            </motion.div>
            )}
          </div>
      </div>
    </div>
  )
} 