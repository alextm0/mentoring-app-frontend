// API endpoint constants
export const endpoints = {
  // Mentor endpoints
  mentors: '/mentors',
  mentor: (id: number) => `/mentors/${id}`,
  mentorAssignments: (id: number) => `/mentors/${id}/assignments`,
  mentorSessions: (id: number) => `/mentors/${id}/sessions`,
  
  // Mentee endpoints  
  mentees: '/mentees',
  mentee: (id: number) => `/mentees/${id}`,
  menteeAssignments: (id: number) => `/mentees/${id}/assignments`,
  menteeSessions: (id: number) => `/mentees/${id}/sessions`,
  
  // Assignments
  assignments: '/assignments',
  assignment: (id: number) => `/assignments/${id}`,
  
  // Mentoring Sessions
  sessions: '/sessions',
  session: (id: number) => `/sessions/${id}`,
} as const 