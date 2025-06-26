"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { 
  BookOpen, 
  Trophy, 
  Edit,
  Plus,
  Users,
  ExternalLink,
  Code
} from "lucide-react"
import toast from "react-hot-toast"

// Import shared components and utilities
import { PhaseTimeline } from "@/components/roadmap/phase-timeline"
import { TopicOrb } from "@/components/roadmap/topic-orb"
import { 
  getDifficultyColor, 
  getStatusColor, 
  getProgressBarColor,
  calculateOverallProgress 
} from "@/components/roadmap/roadmap-utils"
import { competitiveProgrammingRoadmap } from "@/lib/roadmap-data"

export function RoadmapPlanner() {
  const [selectedPhase, setSelectedPhase] = useState<number | null>(1)
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null)
  const [isAddingPhase, setIsAddingPhase] = useState(false)
  const [isAddingTopic, setIsAddingTopic] = useState(false)

  const currentPhase = competitiveProgrammingRoadmap.phases.find(p => p.id === selectedPhase)
  const overallProgress = calculateOverallProgress(competitiveProgrammingRoadmap.phases)
  
  const handleCreatePhase = () => {
    toast.success("Phase created successfully!")
    setIsAddingPhase(false)
  }

  const handleCreateTopic = () => {
    toast.success("Topic added successfully!")
    setIsAddingTopic(false)
  }

    return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Roadmap Planner</h1>
            <p className="text-muted-foreground">Create and manage learning roadmaps for your mentees</p>
          </div>

        </div>

        {/* Phase Timeline */}
      <PhaseTimeline
        phases={competitiveProgrammingRoadmap.phases}
        selectedPhase={selectedPhase}
        onPhaseSelect={setSelectedPhase}
        onAddPhase={() => setIsAddingPhase(true)}
        showAddButton={true}
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
                                    toast.success("Edit topic functionality")
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
                                          {topic.problems} problems • {topic.difficulty} level
                                        </p>
                                      </div>
                                      <Badge variant="outline" className={getDifficultyColor(topic.difficulty)}>
                                        {topic.difficulty}
                                      </Badge>
                                          </div>
                                  </CardHeader>
                                  <CardContent className="space-y-6">
                                    {/* Problem Management Section */}
                                    <div>
                                      <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-medium text-sm flex items-center gap-2">
                                          <Code className="h-4 w-4" />
                                          Problem Bank
                                        </h4>
                                        <Button 
                                          size="sm" 
                                          onClick={() => toast.success("Add Problem functionality")}
                                          className="h-7 text-xs"
                                        >
                                          <Plus className="h-3 w-3 mr-1" />
                                          Add Problem
                                        </Button>
                                      </div>
                                      <div className="space-y-2">
                                        {Array.from({ length: topic.problems }, (_, i) => (
                                          <div 
                                            key={i}
                                            className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 border border-muted hover:border-muted-foreground/20 cursor-pointer transition-all"
                                            onClick={() => toast.success(`Edit Problem ${i + 1}`)}
                                          >
                                            <div className="flex items-center space-x-3">
                                              <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                                                <Code className="h-2.5 w-2.5 text-primary" />
                                              </div>
                                              <div>
                                                <h5 className="text-sm font-medium">{topic.title} - Problem {i + 1}</h5>
                                                <p className="text-xs text-muted-foreground">
                                                  {topic.difficulty} • Click to edit
                                                </p>
                                              </div>
                                            </div>
                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                                                  <Edit className="h-3 w-3" />
                                                </Button>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Resources Management Section */}
                                    <div>
                                      <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-medium text-sm flex items-center gap-2">
                                          <BookOpen className="h-4 w-4" />
                                          Study Resources
                                        </h4>
                                                <Button 
                                                  size="sm" 
                                          variant="outline"
                                          onClick={() => toast.success("Add Resource functionality")}
                                          className="h-7 text-xs"
                                        >
                                          <Plus className="h-3 w-3 mr-1" />
                                          Add Resource
                                                </Button>
                                      </div>
                                      <div className="space-y-2">
                                        {topic.resources && topic.resources.length > 0 ? (
                                          topic.resources.map((resource, idx) => (
                                            <div 
                                              key={idx}
                                              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 border border-muted hover:border-muted-foreground/20 cursor-pointer transition-all"
                                              onClick={() => toast.success(`Edit resource: ${resource}`)}
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
                                                <Edit className="h-3 w-3" />
                                              </Button>
                                            </div>
                                          ))
                                        ) : (
                                          <div className="text-center py-4 text-muted-foreground">
                                            <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                            <p className="text-sm">No resources added yet</p>
                                            <p className="text-xs">Click "Add Resource" to get started</p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>

                  {/* Add Topic Button */}
                  <div className="pt-4 border-t border-muted">
                  <Button 
                    variant="outline" 
                      className="w-full"
                    onClick={() => setIsAddingTopic(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                      Add New Topic
                  </Button>
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
                Roadmap Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add Phase Button */}
              <Button 
                className="w-full"
                onClick={() => setIsAddingPhase(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Phase
              </Button>


              {/* Phase Overview - No Progress for Mentors */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Phase Overview</h4>
                {competitiveProgrammingRoadmap.phases.map((phase) => (
                  <div key={phase.id} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground truncate">{phase.title}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {phase.topics.length} topics
                      </Badge>
                      <span className="text-xs font-medium">{phase.problems} problems</span>
                    </div>
                        </div>
                      ))}
              </div>

              {/* Basic Template Stats */}
              <div className="pt-4 border-t border-muted">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {competitiveProgrammingRoadmap.phases.length}
                  </div>
                  <div className="text-xs text-muted-foreground">Total Phases</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Phase Modal */}
      <Dialog open={isAddingPhase} onOpenChange={setIsAddingPhase}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Phase</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="phase-title">Phase Title</Label>
              <Input id="phase-title" placeholder="e.g., Advanced Algorithms" />
            </div>
            <div>
              <Label htmlFor="phase-description">Description</Label>
              <Textarea id="phase-description" placeholder="Describe what this phase covers..." />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddingPhase(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreatePhase}>
                Create Phase
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Topic Modal */}
      <Dialog open={isAddingTopic} onOpenChange={setIsAddingTopic}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Topic</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="topic-title">Topic Title</Label>
              <Input id="topic-title" placeholder="e.g., Binary Search" />
            </div>
            <div>
              <Label htmlFor="topic-difficulty">Difficulty</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="topic-problems">Number of Problems</Label>
              <Input id="topic-problems" type="number" placeholder="5" min="1" />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddingTopic(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTopic}>
                Add Topic
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}