"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { 
  BookOpen, 
  Edit,
  Plus,
  ExternalLink,
  Code,
  Target,
  Video,
  ChevronDown,
  PenTool,
  Rocket,
  Star
} from "lucide-react"
import toast from "react-hot-toast"

// Import enhanced components
import { PhaseTimeline } from "@/components/roadmap/phase-timeline"
import { TopicOrb } from "@/components/roadmap/topic-orb"
import { 
  getDifficultyColor, 
  getStatusColor
} from "@/components/roadmap/roadmap-utils"
import { programmingRoadmapTemplate } from "@/lib/roadmap-data"
import { Phase, Topic, Problem, Resource } from "@/components/roadmap/shared-types"

// Helper function to render problem icon (all problems are coding for MVP)
const renderProblemIcon = () => {
  return <Code className="h-4 w-4 text-primary" />
}

// Helper function to render resource icon - simplified to single type
const renderResourceIcon = () => {
  return <BookOpen className="h-4 w-4 text-muted-foreground" />
}

export function RoadmapPlanner() {
  const [selectedPhase, setSelectedPhase] = useState<number | null>(1)
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null)
  const [isAddingPhase, setIsAddingPhase] = useState(false)
  const [isAddingTopic, setIsAddingTopic] = useState(false)

  const currentPhase = programmingRoadmapTemplate.phases.find((p: Phase) => p.id === selectedPhase)
  
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
          <p className="text-muted-foreground">Create and manage learning roadmaps with problems and resources</p>
          </div>
        </div>

        {/* Phase Timeline */}
      <PhaseTimeline
        phases={programmingRoadmapTemplate.phases}
        selectedPhase={selectedPhase}
        onPhaseSelect={setSelectedPhase}
        onAddPhase={() => setIsAddingPhase(true)}
        showAddButton={true}
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
              <Card className="border-primary/20 hover:border-primary/40 transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-xl">{currentPhase.title}</CardTitle>
                      <Badge className={getStatusColor(currentPhase.status)}>
                        {currentPhase.status.replace('_', ' ')}
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
                  
                  <p className="text-muted-foreground text-sm">{currentPhase.description}</p>
                  
                  {/* Metrics */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3">
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {currentPhase.topics.length} Topics
                    </span>
                    <span className="flex items-center gap-1">
                      <Code className="w-3 h-3" />
                      {currentPhase.topics.reduce((sum, topic) => sum + topic.problems.length, 0)} Problems
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {currentPhase.topics.reduce((sum, topic) => sum + topic.resources.length, 0)} Resources
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Topic List */}
                  <div className="space-y-3">
                    {currentPhase.topics.map((topic: Topic) => (
                      <div key={topic.id} className="space-y-0">
                        <motion.div
                          className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer group"
                          onClick={() => setSelectedTopic(selectedTopic === topic.id ? null : topic.id)}
                          whileHover={{ x: 4 }}
                        >
                          <TopicOrb 
                            topic={topic} 
                            onClick={() => setSelectedTopic(topic.id)} 
                            size="sm"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{topic.title}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className={`text-sm ${getDifficultyColor(topic.difficulty)}`}>
                                  {topic.difficulty}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {topic.problems.length} problems
                                </Badge>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
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
                                  <ChevronDown className="h-4 w-4" />
                                </motion.div>
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Simplified Topic Dropdown */}
                        <AnimatePresence>
                          {selectedTopic === topic.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="ml-12 mt-4 mr-4">
                                <Card className="border-muted">
                                  <CardContent className="p-6 space-y-6">
                                    {/* Topic Description */}
                                    <div>
                                      <p className="text-sm text-muted-foreground">{topic.description}</p>
                                    </div>

                                    {/* Problems Section */}
                                    <div>
                                      <div className="flex items-center justify-between mb-4">
                                        <h4 className="font-medium text-sm flex items-center gap-2">
                                          <Code className="h-4 w-4" />
                                          Problems ({topic.problems.length})
                                        </h4>
                                        <Button 
                                          size="sm" 
                                          variant="outline"
                                          onClick={() => toast.success("Add Problem functionality")}
                                          className="h-7 text-xs"
                                        >
                                          <Plus className="h-3 w-3 mr-1" />
                                          Add
                                        </Button>
                                      </div>
                                      <div className="space-y-3">
                                        {topic.problems.map((problem: Problem) => {
                                          const ProblemComponent = (
                                            <div 
                                              className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 cursor-pointer transition-all"
                                              onClick={!problem.externalUrl ? () => toast.success(`Edit Problem: ${problem.title}`) : undefined}
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
                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground flex-shrink-0">
                                              <Edit className="h-3 w-3" />
                                            </Button>
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
                                      <div className="flex items-center justify-between mb-4">
                                        <h4 className="font-medium text-sm flex items-center gap-2">
                                          <BookOpen className="h-4 w-4" />
                                          Resources ({topic.resources.length})
                                        </h4>
                                        <Button 
                                          size="sm" 
                                          variant="outline"
                                          onClick={() => toast.success("Add Resource functionality")}
                                          className="h-7 text-xs"
                                        >
                                          <Plus className="h-3 w-3 mr-1" />
                                          Add
                                        </Button>
                                      </div>
                                      <div className="space-y-3">
                                        {topic.resources.map((resource: Resource) => {
                                          const ResourceComponent = (
                                            <div 
                                              className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 cursor-pointer transition-all"
                                              onClick={!resource.url ? () => toast.success(`Edit resource: ${resource.title}`) : undefined}
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
                                                </div>
                                                {resource.description && (
                                                  <p className="text-xs text-muted-foreground mt-2">
                                                    {resource.description}
                                                  </p>
                                                )}
                                              </div>
                                            </div>
                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground flex-shrink-0">
                                              <Edit className="h-3 w-3" />
                                            </Button>
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
                    ))}
                  </div>

                  {/* Add Topic Button */}
                  <Button 
                    variant="outline" 
                    className="w-full border-dashed"
                    onClick={() => setIsAddingTopic(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Topic
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Sidebar - Template Info */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Template Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">{programmingRoadmapTemplate.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {programmingRoadmapTemplate.description}
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Difficulty</span>
                  <Badge variant="outline" className={getDifficultyColor(programmingRoadmapTemplate.difficulty)}>
                    {programmingRoadmapTemplate.difficulty}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Phases</span>
                  <span>{programmingRoadmapTemplate.phases.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Topics</span>
                  <span>{programmingRoadmapTemplate.phases.reduce((sum, phase) => sum + phase.topics.length, 0)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Problems</span>
                  <span>{programmingRoadmapTemplate.phases.reduce((sum, phase) => 
                    sum + phase.topics.reduce((topicSum, topic) => topicSum + topic.problems.length, 0), 0
                  )}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Phase Dialog */}
      <Dialog open={isAddingPhase} onOpenChange={setIsAddingPhase}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Phase</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="phase-title">Phase Title</Label>
              <Input id="phase-title" placeholder="Enter phase title" />
            </div>
            <div>
              <Label htmlFor="phase-description">Description</Label>
              <Textarea id="phase-description" placeholder="Describe what this phase covers" />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddingPhase(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreatePhase}>Create Phase</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Topic Dialog */}
      <Dialog open={isAddingTopic} onOpenChange={setIsAddingTopic}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Topic</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="topic-title">Topic Title</Label>
              <Input id="topic-title" placeholder="Enter topic title" />
            </div>
            <div>
              <Label htmlFor="topic-description">Description</Label>
              <Textarea id="topic-description" placeholder="Describe what this topic covers" />
            </div>
            <div>
              <Label htmlFor="topic-difficulty">Difficulty</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddingTopic(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTopic}>Create Topic</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}