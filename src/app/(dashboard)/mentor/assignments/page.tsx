"use client"

import { useState } from 'react'
import { AssignmentsListRedesigned } from '@/components/mentor/assignments-list-redesigned'
import CodeReviewSimple from '@/components/mentor/code-review-simple'

export default function MentorAssignmentsPage() {
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<number | null>(null)

  // If viewing a specific submission
  if (selectedSubmissionId) {
    return (
      <CodeReviewSimple 
        submissionId={selectedSubmissionId} 
        onBack={() => setSelectedSubmissionId(null)} 
      />
    )
  }

  // Main assignments list
  return (
    <AssignmentsListRedesigned 
      onViewSubmission={(submissionId: number) => setSelectedSubmissionId(submissionId)} 
    />
  )
} 