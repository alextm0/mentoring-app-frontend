"use client"

import { useState } from "react"
import { MentorNavigation } from "@/components/mentor/mentor-navigation"
import { MentorOverview } from "@/components/mentor/mentor-overview"
import { AssignmentsListRedesigned } from "@/components/mentor/assignments-list-redesigned"
import { MenteesList } from "@/components/mentor/mentees-list"
import { SessionScheduler } from "@/components/mentor/session-scheduler"
import { RoadmapPlanner } from "@/components/mentor/roadmap-planner"
import { MenteeDetail } from "@/components/mentor/mentee-detail"
import CodeReviewSimple from "@/components/mentor/code-review-simple"
import { MentorProfile } from "@/components/mentor/mentor-profile"

export default function MentorDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedMenteeId, setSelectedMenteeId] = useState<number | null>(null)
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<number | null>(null)

  const renderContent = () => {
    // Code Review Simple View
    if (selectedSubmissionId) {
      return <CodeReviewSimple submissionId={selectedSubmissionId} onBack={() => setSelectedSubmissionId(null)} />
    }

    // Mentee Detail View
    if (selectedMenteeId) {
      return (
        <MenteeDetail
          menteeId={selectedMenteeId}
          onBack={() => setSelectedMenteeId(null)}
          onViewSubmission={(submissionId: number) => setSelectedSubmissionId(submissionId)}
        />
      )
    }

    // Main Tab Views
    switch (activeTab) {
      case "overview":
        return <MentorOverview />
      case "assignments":
        return <AssignmentsListRedesigned onViewSubmission={(submissionId: number) => setSelectedSubmissionId(submissionId)} />
      case "mentees":
        return <MenteesList onSelectMentee={(menteeId: number) => setSelectedMenteeId(menteeId)} />
      case "sessions":
        return <SessionScheduler />
      case "roadmap":
        return <RoadmapPlanner />
      case "profile":
        return <MentorProfile />
      default:
        return <MentorOverview />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <MentorNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto px-6 py-8">{renderContent()}</main>
    </div>
  )
}
