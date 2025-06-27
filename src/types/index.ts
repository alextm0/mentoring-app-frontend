// Core application types - keep it simple for MVP

export interface User {
  id: number
  name: string
  email: string
  avatar: string
  role: 'mentor' | 'mentee'
  totalXP: number
  currentLevel: number
}

export interface Mentor extends User {
  expertise: string[]
  bio: string
  profileImage?: string
  activeMentees: number
  totalSessions: number
}

export interface Mentee extends User {
  profileImage?: string
  bio?: string
  level: string
  totalXP: number
  currentLevel: number
  assignmentStats: {
    completed: number
    total: number
    inProgress: number
  }
}

export interface Assignment {
  id: number
  title: string
  description: string
  dueDate: string
  status: 'pending' | 'submitted' | 'completed'
  xpReward: number
  menteeId: number
  mentorId: number
}

export interface MentorshipSession {
  id: number
  mentorId: number
  menteeId: number
  title: string
  scheduledDate: string
  duration: number
  status: 'scheduled' | 'completed' | 'cancelled'
  type: 'one-on-one' | 'group' | 'workshop'
}

// Problem and Resource Bank types for mentors
export interface BankProblem {
  id: number
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  externalUrl: string
  createdAt: string
  updatedAt: string
  mentorId: number
  solution?: string
  testCases?: string
}

export interface BankResource {
  id: number
  title: string
  description: string
  externalUrl: string
  createdAt: string
  updatedAt: string
  mentorId: number
}

// Notifications removed for MVP - will be added back with backend 

// Enhanced Roadmap types with problems and resources
export interface Problem {
  id: number
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  status: "not_started" | "in_progress" | "completed"
  timeEstimate?: string
  solution?: string
  externalUrl?: string
}

export interface Resource {
  id: number
  title: string
  url?: string
  description?: string
  timeEstimate?: string
  isRequired: boolean
}

export interface Topic {
  id: number
  title: string
  status: "available" | "in_progress" | "completed"
  difficulty: "Easy" | "Medium" | "Hard"
  description: string
  problems: Problem[]
  resources: Resource[]
  estimatedTime?: string
}

export interface Phase {
  id: number
  title: string
  status: "available" | "in_progress" | "completed"
  description: string
  topics: Topic[]
  estimatedTime?: string
}

export interface RoadmapTemplate {
  id: number
  title: string
  description: string
  phases: Phase[]
  estimatedTime?: string
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
      attempts?: number
    }>
    resourceProgress: Record<number, {
      status: "not_started" | "in_progress" | "completed"
      completedAt?: string
    }>
  }>
} 