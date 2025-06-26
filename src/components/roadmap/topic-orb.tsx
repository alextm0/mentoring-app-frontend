"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { Topic } from "./shared-types"

interface TopicOrbProps {
  topic: Topic
  onClick?: () => void
}

export function TopicOrb({ topic, onClick }: TopicOrbProps) {
  const isCompleted = topic.progress === 100
  const isInProgress = topic.progress > 0 && topic.progress < 100

  return (
    <div 
      className="relative w-5 h-5 flex items-center justify-center cursor-pointer"
      onClick={onClick}
      aria-valuenow={topic.progress}
      aria-valuetext={`${topic.progress}% complete`}
    >
      {isCompleted ? (
        <motion.div 
          className="w-5 h-5 rounded-full bg-[#12B76A] flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <CheckCircle className="h-3 w-3 text-white" />
        </motion.div>
      ) : isInProgress ? (
        <div className="w-5 h-5 rounded-full border-2 border-[#12B76A] relative bg-[#111317]">
          <motion.div 
            className="absolute inset-0 rounded-full"
            style={{ 
              background: `conic-gradient(#12B76A ${topic.progress * 3.6}deg, transparent 0deg)` 
            }}
          />
          {topic.progress >= 90 && (
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-[#12B76A]" 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </div>
      ) : (
        <div className="w-5 h-5 rounded-full border-2 border-gray-500 bg-[#111317] hover:border-[#12B76A] transition-colors" />
      )}
    </div>
  )
} 