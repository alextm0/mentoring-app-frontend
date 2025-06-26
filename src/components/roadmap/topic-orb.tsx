"use client"

import { motion } from "framer-motion"
import { Topic } from "./shared-types"
import { calculateTopicProgress } from "./roadmap-utils"
import { CheckCircle, Play, Circle } from "lucide-react"

interface TopicOrbProps {
  topic: Topic
  onClick?: () => void
  menteeProgress?: any
  size?: "sm" | "md" | "lg"
}

export function TopicOrb({ topic, onClick, menteeProgress, size = "md" }: TopicOrbProps) {
  // Calculate progress based on completed problems
  const progress = calculateTopicProgress(topic, menteeProgress)
  
  // Determine status based on progress and mentee data
  const getActualStatus = () => {
    if (!menteeProgress?.topicProgress[topic.id]) {
      return topic.status
    }
    
    const topicProg = menteeProgress.topicProgress[topic.id]
    if (progress === 100) return "completed"
    if (progress > 0) return "in_progress"
    return "available"
  }
  
  const actualStatus = getActualStatus()
  
  // Size variants
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16"
  }
  
  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6"
  }

  // Status-based styling
  const getOrbStyle = () => {
    switch (actualStatus) {
      case "completed":
        return "bg-green-500/20 border-green-500 text-green-400"
      case "in_progress":
        return "bg-blue-500/20 border-blue-500 text-blue-400"
      case "available":
        return "bg-yellow-500/20 border-yellow-500 text-yellow-400 hover:bg-yellow-500/30"
      default:
        return "bg-gray-500/20 border-gray-500 text-gray-400"
    }
  }

  const getIcon = () => {
    const iconClass = iconSizes[size]
    switch (actualStatus) {
      case "completed":
        return <CheckCircle className={iconClass} />
      case "in_progress":
        return <Play className={iconClass} />
      case "available":
        return <Circle className={iconClass} />
      default:
        return <Circle className={iconClass} />
    }
  }

  const isClickable = actualStatus === "available" || actualStatus === "in_progress"

  return (
    <motion.div
      className={`
        relative ${sizeClasses[size]} 
        rounded-full border-2 
        flex items-center justify-center
        transition-all duration-200
        ${getOrbStyle()}
        ${isClickable && onClick ? 'cursor-pointer' : 'cursor-default'}
      `}
      onClick={isClickable ? onClick : undefined}
      whileHover={isClickable ? { scale: 1.1 } : {}}
      whileTap={isClickable ? { scale: 0.95 } : {}}
      title={`${topic.title} - ${progress}% complete`}
    >
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
            strokeWidth="8"
            strokeOpacity="0.2"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 45}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
            animate={{ 
              strokeDashoffset: 2 * Math.PI * 45 * (1 - progress / 100)
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
      )}
      
      {/* Icon */}
      <div className="relative z-10">
        {getIcon()}
      </div>
      
      {/* Difficulty indicator (small dot) */}
      <div 
        className={`
          absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background
          ${topic.difficulty === 'Easy' ? 'bg-green-400' : ''}
          ${topic.difficulty === 'Medium' ? 'bg-yellow-400' : ''}
          ${topic.difficulty === 'Hard' ? 'bg-red-400' : ''}
        `}
      />
      
      {/* Progress percentage for larger sizes */}
      {size === "lg" && progress > 0 && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
          <span className="text-xs text-muted-foreground font-medium">
            {progress}%
          </span>
        </div>
      )}
    </motion.div>
  )
} 