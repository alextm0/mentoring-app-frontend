export interface Topic {
  id: number
  title: string
  progress: number
  difficulty: "Easy" | "Medium" | "Hard" | "Expert" | "Mixed"
  problems: number
  completedProblems?: number
  locked: boolean
  problemList?: Problem[]
  resources?: string[]
}

export interface Phase {
  id: number
  title: string
  duration?: string
  status: "active" | "completed" | "locked"
  problems: number
  completedProblems?: number
  xp?: number
  studyTime?: string
  description?: string
  resources?: string[]
  topics: Topic[]
}

export interface RoadmapData {
  id: number
  title: string
  description: string
  totalPhases?: number
  totalProblems?: number
  estimatedWeeks?: number
  phases: Phase[]
}

export interface Problem {
  id: number
  title: string
  difficulty: "Easy" | "Medium" | "Hard" | "Expert"
  status: "completed" | "in_progress" | "not_started" | "locked"
} 