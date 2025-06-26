import { api } from './api'
import { endpoints } from './endpoints'
import type { Mentee, Assignment, MentorshipSession } from '../types'

// Mentee service - all mentee-related backend calls
export const menteeService = {
  // Get mentee profile
  async getProfile(id: number) {
    return api.get<Mentee>(endpoints.mentee(id))
  },

  // Get mentee's assignments
  async getAssignments(menteeId: number) {
    return api.get<Assignment[]>(endpoints.menteeAssignments(menteeId))
  },

  // Submit assignment
  async submitAssignment(assignmentId: number, submission: any) {
    return api.post(`${endpoints.assignment(assignmentId)}/submit`, submission)
  },

  // Get mentee's mentoring sessions
  async getSessions(menteeId: number) {
    return api.get<MentorshipSession[]>(endpoints.menteeSessions(menteeId))
  },

  // Request mentoring session
  async requestSession(menteeId: number, session: Partial<MentorshipSession>) {
    return api.post<MentorshipSession>(endpoints.menteeSessions(menteeId), session)
  },
} 