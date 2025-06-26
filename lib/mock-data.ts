export interface User {
  id: number
  name: string
  email: string
  avatar: string
  role: 'mentor' | 'mentee'
}

export interface Mentee extends User {
  level: string
  currentStreak: number
  totalXP: number
  currentLevel: number
  progress: number
  weeklyGoal: number
  weeklyCompleted: number
  assignmentStats: {
    completed: number
    total: number
    inProgress: number
    overdue: number
  }
}

export interface Mentor extends User {
  expertise: string[]
  activeMentees: number
  totalSessions: number
  rating: number
}

export interface Assignment {
  id: number
  title: string
  description: string
  dueDate: string
  priority: 'low' | 'medium' | 'high'
  status: 'pending' | 'in_progress' | 'submitted' | 'completed' | 'overdue'
  menteeId: number
  mentorId: number
  topics: string[]
  resourceLinks: string[]
  submissions: Submission[]
  progress: number
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

export interface Session {
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

export interface Notification {
  id: number
  userId: number
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: string
  actionUrl?: string
}

// Mock Data
export const mockMentees: Mentee[] = [
  {
    id: 1,
    name: "Alex Chen",
    email: "alex@example.com",
    avatar: "/placeholder-user.jpg",
    role: "mentee",
    level: "Intermediate",
    currentStreak: 15,
    totalXP: 2850,
    currentLevel: 8,
    progress: 75,
    weeklyGoal: 5,
    weeklyCompleted: 3,
    assignmentStats: {
      completed: 32,
      total: 45,
      inProgress: 5,
      overdue: 1
    }
  },
  {
    id: 2,
    name: "Sarah Kim",
    email: "sarah@example.com",
    avatar: "/placeholder-user.jpg",
    role: "mentee",
    level: "Beginner",
    currentStreak: 8,
    totalXP: 1250,
    currentLevel: 4,
    progress: 45,
    weeklyGoal: 3,
    weeklyCompleted: 2,
    assignmentStats: {
      completed: 15,
      total: 25,
      inProgress: 3,
      overdue: 0
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
    totalSessions: 156,
    rating: 4.8
  }
]

export const mockAssignments: Assignment[] = [
  {
    id: 1,
    title: "Binary Search Implementation",
    description: "Implement binary search algorithm with proper error handling and edge cases",
    dueDate: "2024-01-28",
    priority: "high",
    status: "in_progress",
    menteeId: 1,
    mentorId: 10,
    topics: ["Algorithms", "Binary Search", "Recursion"],
    resourceLinks: [
      "https://leetcode.com/problems/binary-search/",
      "https://www.geeksforgeeks.org/binary-search/"
    ],
    submissions: [],
    progress: 80,
    xpReward: 150,
    createdAt: "2024-01-20"
  },
  {
    id: 2,
    title: "Graph Traversal Fundamentals",
    description: "Learn and implement DFS and BFS algorithms",
    dueDate: "2024-02-05",
    priority: "medium",
    status: "pending",
    menteeId: 1,
    mentorId: 10,
    topics: ["Data Structures", "Graphs", "DFS", "BFS"],
    resourceLinks: [
      "https://www.youtube.com/watch?v=TIbUeeksXcI"
    ],
    submissions: [],
    progress: 25,
    xpReward: 200,
    createdAt: "2024-01-22"
  }
]

export const mockSessions: Session[] = [
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
      "Q&A session"
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

export const mockNotifications: Notification[] = [
  {
    id: 1,
    userId: 1,
    title: "New Assignment",
    message: "You have a new assignment: Binary Search Implementation",
    type: "info",
    read: false,
    createdAt: "2024-01-25T10:00:00Z",
    actionUrl: "/assignments/1"
  },
  {
    id: 2,
    userId: 1,
    title: "Session Reminder",
    message: "Your mentoring session with John starts in 30 minutes",
    type: "warning",
    read: false,
    createdAt: "2024-01-25T09:30:00Z"
  },
  {
    id: 3,
    userId: 1,
    title: "Assignment Completed",
    message: "Great job completing the Array Manipulation assignment!",
    type: "success",
    read: true,
    createdAt: "2024-01-24T16:45:00Z"
  }
]

// Helper functions
export const getCurrentMentee = (): Mentee => mockMentees[0]
export const getCurrentMentor = (): Mentor => mockMentors[0]

export const getMenteeAssignments = (menteeId: number): Assignment[] => 
  mockAssignments.filter(assignment => assignment.menteeId === menteeId)

export const getUpcomingSessions = (userId: number, role: 'mentor' | 'mentee'): Session[] => {
  const now = new Date()
  return mockSessions
    .filter(session => {
      if (role === 'mentor') {
        return session.mentorId === userId
      } else {
        return session.menteeId === userId
      }
    })
    .filter(session => new Date(session.scheduledAt) > now)
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
}

export const getNotifications = (userId: number): Notification[] =>
  mockNotifications.filter(notification => notification.userId === userId) 