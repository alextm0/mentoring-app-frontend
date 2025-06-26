export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy": return "text-green-400"
    case "Medium": return "text-yellow-400" 
    case "Hard": return "text-orange-400"
    case "Expert": return "text-red-400"
    case "Mixed": return "text-purple-400"
    default: return "text-gray-400"
  }
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

export const getStatusColor = (status: string) => {
  switch (status) {
    case "active": return "bg-[#12B76A] text-white"
    case "completed": return "bg-[#12B76A] text-white"
    case "locked": return "bg-gray-600 text-gray-300"
    default: return "bg-gray-500 text-white"
  }
}

export const getProgressBarColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy": return "bg-green-500"
    case "Medium": return "bg-yellow-500" 
    case "Hard": return "bg-orange-500"
    case "Expert": return "bg-red-500"
    default: return "bg-gray-500"
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