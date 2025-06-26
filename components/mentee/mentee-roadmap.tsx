"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { 
  BookOpen, 
  Trophy, 
  Edit,
  Users,
  Star,
  ExternalLink,
  Play
} from "lucide-react"
import toast from "react-hot-toast"

// Import shared components and utilities
import { PhaseTimeline } from "@/components/roadmap/phase-timeline"
import { TopicOrb } from "@/components/roadmap/topic-orb"
import { 
  getDifficultyColor, 
  getDifficultyBadgeColor, 
  getStatusColor, 
  getProgressBarColor,
  calculateOverallProgress 
} from "@/components/roadmap/roadmap-utils"
import { competitiveProgrammingRoadmap } from "@/lib/roadmap-data"

export function MenteeRoadmap() {
  const [selectedPhase, setSelectedPhase] = useState<number | null>(2)
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null)

  const currentPhase = competitiveProgrammingRoadmap.phases.find(p => p.id === selectedPhase)
  const overallProgress = calculateOverallProgress(competitiveProgrammingRoadmap.phases)
  
  const handleProblemStart = (problemId: number, problemTitle: string) => {
    toast.success(`Opening: ${problemTitle}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Learning Roadmap</h1>
          <p className="text-muted-foreground">Track your progress through {competitiveProgrammingRoadmap.title}</p>
        </div>
      </div>

      {/* Phase Timeline */}
      <PhaseTimeline
        phases={competitiveProgrammingRoadmap.phases}
        selectedPhase={selectedPhase}
        onPhaseSelect={setSelectedPhase}
      />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1">
          {currentPhase && (
            <motion.div
              key={currentPhase.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-4xl mx-auto"
            >
              {/* Phase Card */}
              <Card className="border-primary/20 hover:border-primary/40 transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <CardTitle className="text-xl lg:text-2xl">{currentPhase.title}</CardTitle>

                      <Badge className={getStatusColor(currentPhase.status)}>
                        {currentPhase.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Metrics */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mt-3">
                    <span>{currentPhase.problems} Problems</span>
                    {currentPhase.completedProblems !== undefined && (
                      <>
                        <span>•</span>
                        <span>{currentPhase.completedProblems} Completed</span>
                      </>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Topic List */}
                  <div className="space-y-3">
                    {currentPhase.topics.map((topic) => (
                      <div key={topic.id} className="space-y-0">
                        <motion.div
                          className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer group"
                          onClick={() => setSelectedTopic(selectedTopic === topic.id ? null : topic.id)}
                          whileHover={{ x: 4, y: -2 }}
                        >
                          <TopicOrb 
                            topic={topic} 
                            onClick={() => setSelectedTopic(topic.id)} 
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <span className="font-medium truncate">{topic.title}</span>
                              <div className="flex items-center space-x-2 shrink-0">
                                <span className={`text-sm ${getDifficultyColor(topic.difficulty)}`}>
                                  {topic.difficulty}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {topic.problems} problems
                                </Badge>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toast.success("View topic details")
                                  }}
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <motion.div
                                  animate={{ rotate: selectedTopic === topic.id ? 180 : 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="text-muted-foreground"
                                >
                                  ▼
                                </motion.div>
                              </div>
                            </div>
                            <div className="mt-2 bg-muted rounded-full h-1 overflow-hidden">
                              <motion.div 
                                className={`h-full ${getProgressBarColor(topic.difficulty)}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${topic.progress}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                              />
                            </div>
                          </div>
                        </motion.div>

                        {/* Enhanced Topic Dropdown */}
                        <AnimatePresence>
                          {selectedTopic === topic.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="ml-6 lg:ml-12 mt-3 mr-2 lg:mr-4">
                                <Card className="border-muted">
                                  <CardHeader className="pb-4">
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <CardTitle className="text-lg">{topic.title}</CardTitle>
                                        <p className="text-sm text-muted-foreground">
                                          {topic.completedProblems || 0} of {topic.problems} completed
                                        </p>
                                      </div>
                                      <Badge variant="outline" className={getDifficultyColor(topic.difficulty)}>
                                        {topic.difficulty}
                                      </Badge>
                                    </div>
                                  </CardHeader>
                                  <CardContent className="space-y-6">
                                    {/* Practice Problems Section */}
                                    <div>
                                      <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                                        <Play className="h-4 w-4" />
                                        Practice Problems
                                      </h4>
                                      <div className="space-y-2">
                                        {Array.from({ length: topic.problems }, (_, i) => (
                                          <div 
                                            key={i}
                                            className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 border border-muted hover:border-muted-foreground/20 cursor-pointer transition-all"
                                            onClick={() => handleProblemStart(i + 1, `${topic.title} - Problem ${i + 1}`)}
                                          >
                                            <div className="flex items-center space-x-3">
                                              <div className={`w-4 h-4 rounded-full ${
                                                i < (topic.completedProblems || 0) ? 'bg-primary' : 'bg-muted-foreground/30'
                                              }`} />
                                              <div>
                                                <h5 className="text-sm font-medium">{topic.title} - Problem {i + 1}</h5>
                                                <p className="text-xs text-muted-foreground">
                                                  {topic.difficulty} • Click to start
                                                </p>
                                              </div>
                                            </div>
                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                                              <Play className="h-3 w-3" />
                                            </Button>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Resources Section */}
                                    {topic.resources && topic.resources.length > 0 && (
                                      <div>
                                        <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                                          <BookOpen className="h-4 w-4" />
                                          Study Resources
                                        </h4>
                                        <div className="space-y-2">
                                          {topic.resources.map((resource, idx) => (
                                            <div 
                                              key={idx}
                                              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 border border-muted hover:border-muted-foreground/20 cursor-pointer transition-all"
                                              onClick={() => toast.success(`Opening: ${resource}`)}
                                            >
                                              <div className="flex items-center space-x-3">
                                                <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                                                  <BookOpen className="h-2.5 w-2.5 text-blue-600" />
                                                </div>
                                                <div>
                                                  <h5 className="text-sm font-medium">{resource}</h5>
                                                  <p className="text-xs text-muted-foreground">Study material</p>
                                                </div>
                                              </div>
                                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                                                <ExternalLink className="h-3 w-3" />
                                              </Button>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:w-80">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Learning Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Basic Progress Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Phases Completed</span>
                  <span className="font-medium">{competitiveProgrammingRoadmap.phases.filter(p => p.status === 'completed').length}/{competitiveProgrammingRoadmap.phases.length}</span>
                </div>
              </div>

              {/* Basic Phase Status */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Phase Status</h4>
                {competitiveProgrammingRoadmap.phases.map((phase) => (
                  <div key={phase.id} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground truncate">{phase.title}</span>
                    <Badge variant="outline" className={getStatusColor(phase.status)}>
                      {phase.status}
                    </Badge>
                  </div>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="pt-4 border-t border-muted">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {competitiveProgrammingRoadmap.phases.reduce((acc, phase) => acc + (phase.completedProblems || 0), 0)}
                    </div>
                    <div className="text-xs text-muted-foreground">Problems Solved</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-500">
                      {competitiveProgrammingRoadmap.phases.filter(p => p.status === 'active').length}
                    </div>
                    <div className="text-xs text-muted-foreground">Active Phases</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 