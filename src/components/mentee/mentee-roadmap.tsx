"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { 
  BookOpen, 
  Play,
  CheckCircle,
  Code,
  ExternalLink,
  Target,
  ChevronDown,
  PenTool,
  Rocket,

  Star
} from "lucide-react"

// Import enhanced components
import { PhaseTimeline } from "@/components/roadmap/phase-timeline"
import { TopicOrb } from "@/components/roadmap/topic-orb"
import { 
  getDifficultyColor, 
  calculatePhaseProgress,
  getTopicProblemStats
} from "@/components/roadmap/roadmap-utils"
import { programmingRoadmapTemplate } from "@/lib/roadmap-data"
import { Phase, Topic, Problem, Resource, MenteeRoadmapProgress } from "@/components/roadmap/shared-types"

// Enhanced mock mentee progress data with simplified problem progress
const mockMenteeProgress: MenteeRoadmapProgress = {
  id: 1,
  menteeId: 1,
  templateId: 1,
  currentPhaseId: 1,
  topicProgress: {
    1: { 
      status: "completed", 
      startedAt: "2024-01-01", 
      completedAt: "2024-01-03",
      problemProgress: {
        1: { status: "completed", completedAt: "2024-01-01" },
        2: { status: "completed", completedAt: "2024-01-02" }
      },
      resourceProgress: {
        1: { status: "completed", completedAt: "2024-01-01" },
        2: { status: "completed", completedAt: "2024-01-01" },
        3: { status: "completed", completedAt: "2024-01-02" }
      }
    },
    2: { 
      status: "in_progress", 
      startedAt: "2024-01-04",
      problemProgress: {
        4: { status: "completed", completedAt: "2024-01-04" },
        5: { status: "in_progress", startedAt: "2024-01-05" },
        6: { status: "not_started" },
        7: { status: "not_started" }
      },
      resourceProgress: {
        4: { status: "completed", completedAt: "2024-01-04" },
        5: { status: "in_progress" },
        6: { status: "not_started" }
      }
    },
    3: { 
      status: "available",
      problemProgress: {},
      resourceProgress: {}
    },
    4: { 
      status: "available",
      problemProgress: {},
      resourceProgress: {}
    },
    5: { 
      status: "available",
      problemProgress: {},
      resourceProgress: {}
    },
    6: { 
      status: "available",
      problemProgress: {},
      resourceProgress: {}
    }
  }
}

// Helper function to render problem icon (all problems are coding for MVP)
const renderProblemIcon = () => {
  return <Code className="h-5 w-5 text-primary" />
}

// Helper function to render resource icon - simplified to single type
const renderResourceIcon = () => {
  return <BookOpen className="h-4 w-4 text-muted-foreground" />
}

export function MenteeRoadmap() {
  const [selectedPhase, setSelectedPhase] = useState<number | null>(1)
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null)

  const currentPhase = programmingRoadmapTemplate.phases.find((p: Phase) => p.id === selectedPhase)
  const overallProgress = calculateOverallProgress()
  
  // Calculate overall progress based on completed problems
  function calculateOverallProgress() {
    const allProblems = programmingRoadmapTemplate.phases.reduce((problems: Problem[], phase) => {
      const phaseProblems = phase.topics.reduce((topicProblems: Problem[], topic) => {
        return [...topicProblems, ...topic.problems]
      }, [])
      return [...problems, ...phaseProblems]
    }, [])
    
    const completedProblems = allProblems.filter(problem => {
      const topic = programmingRoadmapTemplate.phases
        .flatMap(phase => phase.topics)
        .find(topic => topic.problems.find(p => p.id === problem.id))
      
      if (!topic) return false
      
      const topicProgress = mockMenteeProgress.topicProgress[topic.id]
      return topicProgress?.problemProgress[problem.id]?.status === 'completed'
    })
    
    return Math.round((completedProblems.length / allProblems.length) * 100)
  }

  const handleStartProblem = (topicId: number, problemId: number) => {
    // In a real app, this would update the mentee's progress
    console.log(`Starting problem ${problemId} in topic ${topicId}`)
  }

  return (
    <div className="space-y-6">
      {/* Header with Progress */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Learning Path</h1>
          <p className="text-muted-foreground">Track your progress through programming problems and concepts</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{overallProgress}%</div>
          <div className="text-sm text-muted-foreground">Complete</div>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
        </CardContent>
      </Card>



      {/* Phase Timeline */}
      <PhaseTimeline
        phases={programmingRoadmapTemplate.phases}
        selectedPhase={selectedPhase}
        onPhaseSelect={setSelectedPhase}
        menteeProgress={mockMenteeProgress}
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {currentPhase && (
            <motion.div
              key={currentPhase.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {/* Phase Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{currentPhase.title}</CardTitle>
                      <p className="text-muted-foreground text-sm mt-1">{currentPhase.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">
                        {calculatePhaseProgress(currentPhase, mockMenteeProgress)}%
                      </div>
                      <div className="text-xs text-muted-foreground">Progress</div>
                    </div>
                  </div>
                  
                  {/* Phase Progress Bar */}
                  <div className="mt-4">
                    <Progress 
                      value={calculatePhaseProgress(currentPhase, mockMenteeProgress)} 
                      className="h-2" 
                    />
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Topic List with Problem Details */}
                  <div className="space-y-4">
                    {currentPhase.topics.map((topic: Topic) => {
                      const topicStatus = mockMenteeProgress.topicProgress[topic.id]?.status || topic.status
                      const isClickable = true // All topics are accessible now
                      const problemStats = getTopicProblemStats(topic, mockMenteeProgress)
                      
                      return (
                      <div key={topic.id} className="space-y-0">
                        <motion.div
                            className={`
                              flex items-center space-x-4 p-5 rounded-lg border transition-all cursor-pointer
                              ${topicStatus === 'completed' ? 'bg-green-500/5 border-green-500/20' : ''}
                              ${topicStatus === 'in_progress' ? 'bg-blue-500/5 border-blue-500/20' : ''}
                              hover:bg-muted/50
                            `}
                          onClick={() => setSelectedTopic(selectedTopic === topic.id ? null : topic.id)}
                            whileHover={{ x: 4 }}
                        >
                          <TopicOrb 
                            topic={topic} 
                              menteeProgress={mockMenteeProgress}
                              size="md"
                            />
                            
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium">{topic.title}</h4>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Badge variant="outline" className={getDifficultyColor(topic.difficulty)}>
                                  {topic.difficulty}
                                  </Badge>
                                <Badge variant="outline" className="text-xs">
                                    {problemStats.completed}/{problemStats.total} problems
                                  </Badge>
                                  {topicStatus === 'completed' && (
                                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                      <CheckCircle className="w-3 h-3 mr-1" />
                                      Completed
                                    </Badge>
                                  )}
                                  {topicStatus === 'in_progress' && (
                                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                      <Play className="w-3 h-3 mr-1" />
                                      In Progress
                                </Badge>
                                  )}
                                <motion.div
                                  animate={{ rotate: selectedTopic === topic.id ? 180 : 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="text-muted-foreground"
                                >
                                    <ChevronDown className="w-4 h-4" />
                                </motion.div>
                              </div>
                            </div>
                              <p className="text-sm text-muted-foreground mt-1">{topic.description}</p>
                              
                              {/* Problem progress summary */}
                              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                {problemStats.completed > 0 && (
                                  <span className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                                    {problemStats.completed} completed
                                  </span>
                                )}
                                {problemStats.inProgress > 0 && (
                                  <span className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                                    {problemStats.inProgress} in progress
                                  </span>
                                )}
                                {problemStats.notStarted > 0 && (
                                  <span className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                                    {problemStats.notStarted} not started
                                  </span>
                                )}
                            </div>
                          </div>
                        </motion.div>

                          {/* Topic Details with Problems */}
                        <AnimatePresence>
                          {selectedTopic === topic.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                                <div className="ml-16 mt-4 mr-4">
                                <Card className="border-muted">
                                    <CardContent className="pt-6 space-y-8">
                                      {/* Problems Section */}
                                      <div>
                                        <h4 className="font-medium text-sm flex items-center gap-2 mb-4">
                                          <Code className="h-4 w-4" />
                                          Problems ({topic.problems.length})
                                      </h4>
                                      <div className="space-y-3">
                                          {topic.problems.map((problem: Problem) => {
                                            const topicProgress = mockMenteeProgress.topicProgress[topic.id]
                                            const problemStatus = topicProgress?.problemProgress[problem.id]?.status || 'not_started'
                                            
                                            const ProblemComponent = (
                                              <div 
                                                className={`
                                                  flex items-center justify-between p-4 rounded-lg border transition-all cursor-pointer
                                                  ${problemStatus === 'completed' ? 'bg-green-500/5 border-green-500/20' : ''}
                                                  ${problemStatus === 'in_progress' ? 'bg-blue-500/5 border-blue-500/20' : ''}
                                                  hover:bg-muted/50
                                                `}
                                                onClick={!problem.externalUrl ? () => handleStartProblem(topic.id, problem.id) : undefined}
                                              >
                                            <div className="flex items-center space-x-4">
                                                  <div className="flex-shrink-0 w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                                                    {renderProblemIcon()}
                                                  </div>
                                              <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                      <h5 className="text-sm font-medium">{problem.title}</h5>
                                                      {problem.isImportant && (
                                                        <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                                                      )}
                                                      {problem.externalUrl && (
                                                        <span title="Opens in external site">
                                                          <ExternalLink className="h-3 w-3 text-blue-400" />
                                                        </span>
                                                      )}
                                                      {problemStatus === 'completed' && (
                                                        <CheckCircle className="h-3 w-3 text-green-400" />
                                                      )}
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-1">
                                                      <span className={`text-xs ${getDifficultyColor(problem.difficulty)}`}>
                                                        {problem.difficulty}
                                                      </span>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground mt-2">
                                                      {problem.description}
                                                    </p>
                                              </div>
                                            </div>
                                                <div className="flex items-center space-x-2 flex-shrink-0">
                                                  {problemStatus === 'completed' && (
                                                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                                                      Done
                                                    </Badge>
                                                  )}
                                                  {problemStatus === 'in_progress' && (
                                                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                                                      Working
                                                    </Badge>
                                                  )}
                                                  {problemStatus === 'not_started' && (
                                                    <Button size="sm" variant="outline" className="h-7 text-xs">
                                                      Start
                                                    </Button>
                                                  )}
                                                </div>
                                              </div>
                                            )
                                            
                                            return problem.externalUrl ? (
                                              <Link 
                                                key={problem.id}
                                                href={problem.externalUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="block"
                                              >
                                                {ProblemComponent}
                                              </Link>
                                            ) : (
                                              <div key={problem.id}>
                                                {ProblemComponent}
                                              </div>
                                            )
                                          })}
                                        </div>
                                      </div>

                                      {/* Resources Section */}
                                      <div>
                                        <h4 className="font-medium text-sm flex items-center gap-2 mb-4">
                                          <BookOpen className="h-4 w-4" />
                                          Resources ({topic.resources.length})
                                        </h4>
                                        <div className="space-y-3">
                                          {topic.resources.map((resource: Resource) => {
                                            const topicProgress = mockMenteeProgress.topicProgress[topic.id]
                                            const resourceStatus = topicProgress?.resourceProgress[resource.id]?.status || 'not_started'
                                            
                                            const ResourceComponent = (
                                              <div 
                                                className={`
                                                  flex items-center justify-between p-4 rounded-lg border transition-all cursor-pointer
                                                  ${resourceStatus === 'completed' ? 'bg-green-500/5 border-green-500/20' : ''}
                                                  ${resourceStatus === 'in_progress' ? 'bg-blue-500/5 border-blue-500/20' : ''}
                                                  hover:bg-muted/50
                                                `}
                                              >
                                                <div className="flex items-center space-x-4">
                                                  <div className="flex-shrink-0 w-8 h-8 rounded-md bg-muted/50 flex items-center justify-center">
                                                    {renderResourceIcon()}
                                                  </div>
                                                  <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                      <h5 className="text-sm font-medium">{resource.title}</h5>
                                                      {resource.isImportant && (
                                                        <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                                                      )}
                                                      {resource.url && (
                                                        <span title="Opens in external site">
                                                          <ExternalLink className="h-3 w-3 text-blue-400" />
                                                        </span>
                                                      )}
                                                      {resourceStatus === 'completed' && (
                                                        <CheckCircle className="h-3 w-3 text-green-400" />
                                                      )}
                                                    </div>
                                                    {resource.description && (
                                                      <p className="text-xs text-muted-foreground mt-2">
                                                        {resource.description}
                                                      </p>
                                                    )}
                                                  </div>
                                                </div>
                                                <div className="flex items-center space-x-2 flex-shrink-0">
                                                  {resourceStatus === 'completed' && (
                                                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                                                      Done
                                                    </Badge>
                                                  )}
                                                  {resourceStatus === 'in_progress' && (
                                                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                                                      Reading
                                                    </Badge>
                                                  )}
                                                  {resourceStatus === 'not_started' && (
                                                    <Button size="sm" variant="outline" className="h-7 text-xs">
                                                      View
                                                    </Button>
                                                  )}
                                                </div>
                                              </div>
                                            )
                                            
                                            return resource.url ? (
                                              <Link 
                                                key={resource.id}
                                                href={resource.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="block"
                                              >
                                                {ResourceComponent}
                                              </Link>
                                            ) : (
                                              <div key={resource.id}>
                                                {ResourceComponent}
                                              </div>
                                            )
                                          })}
                                        </div>
                                      </div>
                                    </CardContent>
                                </Card>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Sidebar - Progress Summary */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5" />
                Progress Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {programmingRoadmapTemplate.phases.map((phase: Phase) => {
                  const phaseProgress = calculatePhaseProgress(phase, mockMenteeProgress)
                  return (
                    <div key={phase.id} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{phase.title}</span>
                        <span className="text-muted-foreground">{phaseProgress}%</span>
                      </div>
                      <Progress value={phaseProgress} className="h-1" />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 