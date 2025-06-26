"use client"

import { useState } from 'react'
import { MenteesList } from '@/components/mentor/mentees-list'
import { MenteeDetail } from '@/components/mentor/mentee-detail'

export default function MentorMenteesPage() {
  const [selectedMenteeId, setSelectedMenteeId] = useState<number | null>(null)
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<number | null>(null)

  // If viewing a specific submission from mentee detail
  if (selectedSubmissionId) {
    return (
      <div>
        {/* You could import CodeReviewSimple here if needed */}
        <p>Code review for submission {selectedSubmissionId}</p>
        <button onClick={() => setSelectedSubmissionId(null)}>Back to Mentee</button>
      </div>
    )
  }

  // If viewing a specific mentee
  if (selectedMenteeId) {
    return (
      <MenteeDetail
        menteeId={selectedMenteeId}
        onBack={() => setSelectedMenteeId(null)}
        onViewSubmission={(submissionId: number) => setSelectedSubmissionId(submissionId)}
      />
    )
  }

  // Main mentees list
  return (
    <MenteesList 
      onSelectMentee={(menteeId: number) => setSelectedMenteeId(menteeId)} 
    />
  )
} 