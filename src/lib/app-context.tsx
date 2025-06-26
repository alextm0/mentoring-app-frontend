"use client"

import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { 
  mockMentees, 
  mockAssignments, 
  mockSessions, 
  getCurrentMentor,
  type Mentee, 
  type Assignment, 
  type MentorshipSession,
  type Mentor
} from './mock-data'

interface AppState {
  mentor: Mentor
  mentees: Mentee[]
  assignments: Assignment[]
  sessions: MentorshipSession[]
  searchQuery: string
  activeFilters: {
    menteeStatus?: string
    assignmentStatus?: string
    sessionStatus?: string
  }
}

type AppAction =
  | { type: 'UPDATE_ASSIGNMENT_STATUS'; assignmentId: number; status: Assignment['status'] }
  | { type: 'UPDATE_SESSION_STATUS'; sessionId: number; status: MentorshipSession['status'] }
  | { type: 'ADD_ASSIGNMENT'; assignment: Assignment }
  | { type: 'ADD_SESSION'; session: MentorshipSession }
  | { type: 'SET_SEARCH_QUERY'; query: string }
  | { type: 'SET_FILTER'; filterType: keyof AppState['activeFilters']; value: string | undefined }

const initialState: AppState = {
  mentor: getCurrentMentor(),
  mentees: mockMentees,
  assignments: mockAssignments,
  sessions: mockSessions,
  searchQuery: '',
  activeFilters: {}
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'UPDATE_ASSIGNMENT_STATUS':
      return {
        ...state,
        assignments: state.assignments.map(assignment =>
          assignment.id === action.assignmentId
            ? { ...assignment, status: action.status }
            : assignment
        )
      }
    
    case 'UPDATE_SESSION_STATUS':
      return {
        ...state,
        sessions: state.sessions.map(session =>
          session.id === action.sessionId
            ? { ...session, status: action.status }
            : session
        )
      }
    
    case 'ADD_ASSIGNMENT':
      return {
        ...state,
        assignments: [...state.assignments, action.assignment]
      }
    
    case 'ADD_SESSION':
      return {
        ...state,
        sessions: [...state.sessions, action.session]
      }
    
    // Notification cases removed for MVP
    
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.query
      }
    
    case 'SET_FILTER':
      return {
        ...state,
        activeFilters: {
          ...state.activeFilters,
          [action.filterType]: action.value
        }
      }
    
    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

// Basic stats only (removed detailed analytics)
export function useStats() {
  const { state } = useAppContext()
  
  const activeMentees = state.mentees.length
  const pendingReviews = state.assignments.filter(a => a.status === 'submitted').length
  const todaySessions = state.sessions.filter(s => {
    const today = new Date().toDateString()
    return new Date(s.scheduledAt).toDateString() === today
  }).length
  
  return {
    activeMentees,
    pendingReviews,
    todaySessions
  }
}

export function useFilteredMentees() {
  const { state } = useAppContext()
  
  let filtered = state.mentees
  
  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase()
    filtered = filtered.filter(mentee => 
      mentee.name.toLowerCase().includes(query) ||
      mentee.email.toLowerCase().includes(query)
    )
  }
  
  return filtered
}

export function useFilteredAssignments() {
  const { state } = useAppContext()
  
  let filtered = state.assignments
  
  if (state.activeFilters.assignmentStatus) {
    filtered = filtered.filter(assignment => 
      assignment.status === state.activeFilters.assignmentStatus
    )
  }
  
  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase()
    filtered = filtered.filter(assignment => 
      assignment.title.toLowerCase().includes(query) ||
      assignment.description.toLowerCase().includes(query)
    )
  }
  
  return filtered
}

export function useFilteredSessions() {
  const { state } = useAppContext()
  
  let filtered = state.sessions
  
  if (state.activeFilters.sessionStatus) {
    filtered = filtered.filter(session => 
      session.status === state.activeFilters.sessionStatus
    )
  }
  
  return filtered
} 