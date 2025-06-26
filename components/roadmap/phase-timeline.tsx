"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, CheckCircle } from "lucide-react"
import { Phase } from "./shared-types"
import { getStatusColor } from "./roadmap-utils"

interface PhaseTimelineProps {
  phases: Phase[]
  selectedPhase: number | null
  onPhaseSelect: (phaseId: number) => void
  onAddPhase?: () => void
  showAddButton?: boolean
}

export function PhaseTimeline({ 
  phases, 
  selectedPhase, 
  onPhaseSelect, 
  onAddPhase, 
  showAddButton = false 
}: PhaseTimelineProps) {
  return (
    <Card className="bg-[#111317] border border-[#12B76A]/15">
      <CardContent className="p-6">
        <ScrollArea className="w-full">
          <div className="flex space-x-3 min-w-max pb-2">
            {phases.map((phase) => (
              <motion.button
                key={phase.id}
                onClick={() => onPhaseSelect(phase.id)}
                className={`relative px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedPhase === phase.id 
                    ? "bg-[#12B76A] text-white" 
                    : `${getStatusColor(phase.status)} opacity-60 hover:opacity-100`
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">{phase.title}</span>
                {phase.status === "completed" && (
                  <CheckCircle className="h-3 w-3 ml-2 inline relative z-10" />
                )}
              </motion.button>
            ))}
            {showAddButton && onAddPhase && (
              <Button 
                variant="outline" 
                size="sm" 
                className="border-dashed border-gray-600 text-gray-400 hover:text-white hover:border-[#12B76A]"
                onClick={onAddPhase}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Phase
              </Button>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
} 