import { Phase, Topic } from "./shared-types"

// Visual styling functions (keep these for UI consistency)
export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy":
      return "text-green-400"
    case "Medium":
      return "text-yellow-400" 
    case "Hard":
      return "text-red-400"
    default:
      return "text-gray-400"
  }
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-500/20 text-green-400 border-green-500/30"
    case "in_progress":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    case "available":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    case "not_started":
      return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }
}

export const getProgressBarColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy":
      return "bg-green-400"
    case "Medium":
      return "bg-yellow-400"
    case "Hard":
      return "bg-red-400"
    default:
      return "bg-gray-400"
  }
}

// Since all problems are coding problems for MVP, we use a simple coding icon
export const getProblemIcon = () => {
  return "Code"
}

// Resource icon - simplified to single icon
export const getResourceIcon = () => {
  return "BookOpen"
}

// Enhanced progress calculation with problems
export const calculateTopicProgress = (topic: Topic, menteeProgress?: any) => {
  if (!menteeProgress?.topicProgress[topic.id]) {
    // For template view - show availability
    return topic.status === 'available' ? 10 : 0
  }
  
  // For mentee view - calculate based on completed problems
  const topicProg = menteeProgress.topicProgress[topic.id]
  const totalProblems = topic.problems.length
  if (totalProblems === 0) return 100
  
  const completedProblems = Object.values(topicProg.problemProgress || {}).filter(
    (p: any) => p.status === 'completed'
  ).length
  
  return Math.round((completedProblems / totalProblems) * 100)
}

export const calculatePhaseProgress = (phase: Phase, menteeProgress?: any) => {
  if (!menteeProgress) {
    // For templates/planning view - show basic availability
    const availableTopics = phase.topics.filter(topic => topic.status === 'available').length
    return Math.round((availableTopics / phase.topics.length) * 100)
  }
  
  // For mentee view - show actual progress based on completed problems
  const totalProgress = phase.topics.reduce((sum, topic) => {
    return sum + calculateTopicProgress(topic, menteeProgress)
  }, 0)
  
  return Math.round(totalProgress / phase.topics.length)
}

// Get problem completion stats for a topic
export const getTopicProblemStats = (topic: Topic, menteeProgress?: any) => {
  if (!menteeProgress?.topicProgress[topic.id]) {
    return {
      total: topic.problems.length,
      completed: 0,
      inProgress: 0,
      notStarted: topic.problems.length
    }
  }
  
  const problemProgress = menteeProgress.topicProgress[topic.id].problemProgress || {}
  const stats = {
    total: topic.problems.length,
    completed: 0,
    inProgress: 0,
    notStarted: 0
  }
  
  topic.problems.forEach(problem => {
    const status = problemProgress[problem.id]?.status || 'not_started'
    switch (status) {
      case 'completed':
        stats.completed++
        break
      case 'in_progress':
        stats.inProgress++
        break
      default:
        stats.notStarted++
    }
  })
  
  return stats
}

export const getDifficultyBadgeColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy": return "bg-green-500/10 text-green-400 border-green-500/20"
    case "Medium": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
    case "Hard": return "bg-orange-500/10 text-orange-400 border-orange-500/20"
    case "Expert": return "bg-red-500/10 text-red-400 border-red-500/20"
    case "Mixed": return "bg-purple-500/10 text-purple-400 border-purple-500/20"
    default: return "bg-gray-500/10 text-gray-400 border-gray-500/20"
  }
}

export const getProblemStatusColor = (status: string) => {
  switch (status) {
    case "completed": return "bg-[#12B76A] text-white"
    case "in_progress": return "bg-blue-500 text-white"
    case "not_started": return "bg-gray-600 text-gray-300"
    case "locked": return "bg-gray-700 text-gray-400"
    default: return "bg-gray-500 text-white"
  }
}

export const getStatusText = (status: string) => {
  switch (status) {
    case "completed": return "Completed"
    case "in_progress": return "In Progress"
    case "not_started": return "Not Started"
    case "locked": return "Locked"
    default: return "Unknown"
  }
}

// Simplified: basic progress tracking only (removed detailed analytics)
export const calculateOverallProgress = (phases: any[]) => {
  const completedPhases = phases.filter(phase => phase.status === 'completed').length
  return Math.round((completedPhases / phases.length) * 100)
} 