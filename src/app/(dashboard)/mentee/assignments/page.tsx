"use client"

import { useState } from 'react'
import { MenteeAssignmentsRedesigned } from '@/components/mentee/mentee-assignments-redesigned'
import { CodeSubmission } from '@/components/mentee/code-submission'
import CodeSubmissionCreate from '@/components/mentee/code-submission-create'

export default function MenteeAssignmentsPage() {
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<number | null>(null)
  const [selectedProblemId, setSelectedProblemId] = useState<number | null>(null)

  // If creating a new submission
  if (selectedProblemId) {
    return (
      <CodeSubmissionCreate 
        problemId={selectedProblemId} 
        onBack={() => setSelectedProblemId(null)} 
      />
    )
  }

  // If viewing a specific submission
  if (selectedSubmissionId) {
    return (
      <CodeSubmission 
        submissionId={selectedSubmissionId} 
        onBack={() => setSelectedSubmissionId(null)} 
      />
    )
  }

  // Main assignments list
  return (
    <MenteeAssignmentsRedesigned 
      onViewSubmission={(submissionId: number) => setSelectedSubmissionId(submissionId)}
      onSubmitProblem={(problemId: number) => setSelectedProblemId(problemId)}
    />
  )
} 