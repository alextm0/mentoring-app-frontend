// Core application types - keep it simple for MVP

export interface User {
  id: number
  name: string
  email: string
  avatar: string
  role: 'mentor' | 'mentee'
}

export interface Mentor extends User {
  expertise: string[]
  activeMentees: number
  totalSessions: number
}

export interface Mentee extends User {
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
  status: 'pending' | 'in_progress' | 'submitted' | 'completed'
  menteeId: number
  mentorId: number
}

export interface MentorshipSession {
  id: number
  mentorId: number
  menteeId: number
  scheduledAt: string
  duration: number
  topic: string
  status: 'scheduled' | 'completed' | 'cancelled'
}

// Notifications removed for MVP - will be added back with backend 