export interface User {
  id: number
  name: string
  email: string
  avatar: string
  role: 'mentor' | 'mentee'
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

export interface Mentor extends User {
  expertise: string[]
  activeMentees: number
  totalSessions: number
}

export interface Assignment {
  id: number
  title: string
  description: string
  dueDate: string
  status: 'pending' | 'in_progress' | 'submitted' | 'completed'
  menteeId: number
  mentorId: number
  topics: string[]
  resourceLinks: string[]
  submissions: Submission[]
  xpReward: number
  createdAt: string
}

export interface Submission {
  id: number
  assignmentId: number
  menteeId: number
  content: string
  files: string[]
  submittedAt: string
  feedback?: string
  grade?: 'excellent' | 'good' | 'needs_improvement'
  reviewedAt?: string
  reviewedBy?: number
}

export interface MentorshipSession {
  id: number
  mentorId: number
  menteeId: number
  scheduledAt: string
  duration: number
  topic: string
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
  notes?: string
  recordingUrl?: string
  agenda: string[]
}

export interface RoadmapTopic {
  id: number
  title: string
  description: string
  position: { x: number; y: number }
  status: 'locked' | 'available' | 'in_progress' | 'completed'
  prerequisites: number[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  resources: Resource[]
  assignments: number[]
}

export interface Resource {
  id: number
  title: string
  type: 'video' | 'article' | 'documentation' | 'book' | 'practice'
  url: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
}

// Notifications removed for MVP

// Mock Data
export const mockMentees: Mentee[] = [
  {
    id: 1,
    name: "Alex Chen",
    email: "alex@example.com",
    avatar: "/placeholder-user.jpg",
    role: "mentee",
    level: "Intermediate",
    totalXP: 2850,
    currentLevel: 8,
    assignmentStats: {
      completed: 32,
      total: 45,
      inProgress: 5
    }
  },
  {
    id: 2,
    name: "Sarah Kim",
    email: "sarah@example.com",
    avatar: "/placeholder-user.jpg",
    role: "mentee",
    level: "Beginner",
    totalXP: 1250,
    currentLevel: 4,
    assignmentStats: {
      completed: 15,
      total: 25,
      inProgress: 3
    }
  }
]

export const mockMentors: Mentor[] = [
  {
    id: 10,
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder-user.jpg",
    role: "mentor",
    expertise: ["JavaScript", "React", "Node.js", "System Design"],
    activeMentees: 12,
    totalSessions: 156
  }
]

export const mockAssignments: Assignment[] = [
  {
    id: 1,
    title: "Binary Search Implementation",
    description: "Implement binary search algorithm with proper error handling and edge cases",
    dueDate: "2024-01-28",
    status: "in_progress",
    menteeId: 1,
    mentorId: 10,
    topics: ["Algorithms", "Binary Search", "Recursion"],
    resourceLinks: [
      "https://leetcode.com/problems/binary-search/",
      "https://www.geeksforgeeks.org/binary-search/"
    ],
    submissions: [],
    xpReward: 150,
    createdAt: "2024-01-20"
  },
  {
    id: 2,
    title: "Graph Traversal Fundamentals",
    description: "Learn and implement DFS and BFS algorithms",
    dueDate: "2024-02-05",
    status: "pending",
    menteeId: 1,
    mentorId: 10,
    topics: ["Data Structures", "Graphs", "DFS", "BFS"],
    resourceLinks: [
      "https://www.youtube.com/watch?v=TIbUeeksXcI"
    ],
    submissions: [],
    xpReward: 200,
    createdAt: "2024-01-22"
  }
]

export const mockSessions: MentorshipSession[] = [
  {
    id: 1,
    mentorId: 10,
    menteeId: 1,
    scheduledAt: "2024-01-26T14:00:00Z",
    duration: 60,
    topic: "Dynamic Programming Review",
    status: "scheduled",
    agenda: [
      "Review previous week's assignments",
      "Introduction to Dynamic Programming",
      "Solve example problems together",
      "Q&A mentoring session"
    ]
  },
  {
    id: 2,
    mentorId: 10,
    menteeId: 2,
    scheduledAt: "2024-01-26T16:30:00Z",
    duration: 45,
    topic: "JavaScript Fundamentals",
    status: "scheduled",
    agenda: [
      "Variables and data types",
      "Functions and scope",
      "Practice exercises"
    ]
  }
]

export const mockRoadmapTopics: RoadmapTopic[] = [
  {
    id: 1,
    title: "JavaScript Basics",
    description: "Learn fundamental JavaScript concepts",
    position: { x: 100, y: 100 },
    status: "completed",
    prerequisites: [],
    difficulty: "beginner",
    resources: [
      {
        id: 1,
        title: "MDN JavaScript Guide",
        type: "documentation",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
        description: "Comprehensive JavaScript documentation",
        difficulty: "beginner",
        tags: ["javascript", "basics"]
      }
    ],
    assignments: [1]
  },
  {
    id: 2,
    title: "Data Structures",
    description: "Arrays, Objects, and basic data structures",
    position: { x: 300, y: 100 },
    status: "in_progress",
    prerequisites: [1],
    difficulty: "intermediate",
    resources: [],
    assignments: [2]
  }
]

// Notifications removed for MVP

// Helper functions
export const getCurrentMentee = (): Mentee => mockMentees[0]
export const getCurrentMentor = (): Mentor => mockMentors[0]

export const getMenteeAssignments = (menteeId: number): Assignment[] => 
  mockAssignments.filter(assignment => assignment.menteeId === menteeId)

export const getUpcomingMentoringSessions = (userId: number, role: 'mentor' | 'mentee'): MentorshipSession[] => {
  const now = new Date()
  return mockSessions
    .filter(mentorshipSession => {
      if (role === 'mentor') {
        return mentorshipSession.mentorId === userId
      } else {
        return mentorshipSession.menteeId === userId
      }
    })
    .filter(mentorshipSession => new Date(mentorshipSession.scheduledAt) > now)
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
}

// getNotifications removed for MVP 