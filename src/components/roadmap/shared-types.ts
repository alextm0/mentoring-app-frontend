// Enhanced roadmap types with problems and resources - keeping visual design

export interface Problem {
  id: number
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  status: "not_started" | "in_progress" | "completed"
  isImportant?: boolean
  solution?: string
  externalUrl?: string // For LeetCode, HackerRank, etc.
}

export interface Resource {
  id: number
  title: string
  url?: string
  description?: string
  isRequired: boolean
  isImportant?: boolean
}

export interface Topic {
  id: number
  title: string
  status: "available" | "in_progress" | "completed" // Removed "locked" - all open for MVP
  difficulty: "Easy" | "Medium" | "Hard"
  description: string
  problems: Problem[]
  resources: Resource[]
}

export interface Phase {
  id: number
  title: string
  status: "available" | "in_progress" | "completed" // Removed "locked" - all open for MVP
  description: string
  topics: Topic[]
}

export interface RoadmapTemplate {
  id: number
  title: string
  description: string
  phases: Phase[]
  difficulty: "Beginner" | "Intermediate" | "Advanced"
}

// For mentee progress tracking - separate from template
export interface MenteeRoadmapProgress {
  id: number
  menteeId: number
  templateId: number
  currentPhaseId: number
  topicProgress: Record<number, {
    status: "available" | "in_progress" | "completed"
    startedAt?: string
    completedAt?: string
    problemProgress: Record<number, {
      status: "not_started" | "in_progress" | "completed"
      startedAt?: string
      completedAt?: string
    }>
    resourceProgress: Record<number, {
      status: "not_started" | "in_progress" | "completed"
      completedAt?: string
    }>
  }>
} 