"use client"

import { useState } from "react"
import { MenteeNavigation } from "@/components/mentee/mentee-navigation"
import { MenteeOverview } from "@/components/mentee/mentee-overview"
import { MenteeAssignmentsRedesigned } from "@/components/mentee/mentee-assignments-redesigned"

import { MenteeSessionsSimple } from "@/components/mentee/mentee-sessions-simple"
import { MenteeProfile } from "@/components/mentee/mentee-profile"
import { CodeSubmission } from "@/components/mentee/code-submission"
import { MenteeRoadmap } from "@/components/mentee/mentee-roadmap"

export default function MenteeDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<number | null>(null)

  const renderContent = () => {
    // Code Submission View
    if (selectedSubmissionId) {
      return <CodeSubmission submissionId={selectedSubmissionId} onBack={() => setSelectedSubmissionId(null)} />
    }

    // Main Tab Views
    switch (activeTab) {
      case "overview":
        return <MenteeOverview />
      case "assignments":
        return <MenteeAssignmentsRedesigned onViewSubmission={(submissionId: number) => setSelectedSubmissionId(submissionId)} />
      case "sessions":
        return <MenteeSessionsSimple />
      case "roadmap":
        return <MenteeRoadmap />
      case "profile":
        return <MenteeProfile />
      default:
        return <MenteeOverview />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <MenteeNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto px-6 py-8">{renderContent()}</main>
    </div>
  )
}
