import { api } from './api'
import { endpoints } from './endpoints'
import type { Mentor, Assignment, MentorshipSession } from '../types'

// Mentor service - all mentor-related backend calls
export const mentorService = {
  // Get mentor profile
  async getProfile(id: number) {
    return api.get<Mentor>(endpoints.mentor(id))
  },

  // Get mentor's assignments
  async getAssignments(mentorId: number) {
    return api.get<Assignment[]>(endpoints.mentorAssignments(mentorId))
  },

  // Create new assignment
  async createAssignment(mentorId: number, assignment: Partial<Assignment>) {
    return api.post<Assignment>(endpoints.mentorAssignments(mentorId), assignment)
  },

  // Get mentor's mentoring sessions
  async getSessions(mentorId: number) {
    return api.get<MentorshipSession[]>(endpoints.mentorSessions(mentorId))
  },

  // Schedule new mentoring session
  async scheduleSession(mentorId: number, session: Partial<MentorshipSession>) {
    return api.post<MentorshipSession>(endpoints.mentorSessions(mentorId), session)
  },
} 