"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Calendar as CalendarIcon, BookOpen, Users, Target, Link, X } from "lucide-react"
import { useAppContext } from "@/lib/app-context"
import { cn } from "@/lib/utils"
import toast from "react-hot-toast"

interface CreateAssignmentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateAssignmentModal({ open, onOpenChange }: CreateAssignmentModalProps) {
  const { state, dispatch } = useAppContext()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: undefined as Date | undefined,
    selectedMentees: [] as number[],
    topics: [] as string[],
    newTopic: "",
    resourceLinks: [] as string[],
    newResourceLink: "",
    xpReward: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.description || !formData.dueDate || formData.selectedMentees.length === 0) {
      toast.error("Please fill in all required fields")
      return
    }

    // Create assignments for each selected mentee
    formData.selectedMentees.forEach(menteeId => {
      const newAssignment = {
        id: Date.now() + menteeId, // Simple ID generation for demo
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate!.toISOString(),
        status: "pending" as const,
        menteeId: menteeId,
        mentorId: state.mentor.id,
        topics: formData.topics,
        resourceLinks: formData.resourceLinks,
        submissions: [],
        progress: 0,

        xpReward: parseInt(formData.xpReward) || 100,
        createdAt: new Date().toISOString()
      }

      dispatch({ type: 'ADD_ASSIGNMENT', assignment: newAssignment })
    })

    toast.success(`Assignment created for ${formData.selectedMentees.length} mentee(s)!`)
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      dueDate: undefined,
      selectedMentees: [],
      topics: [],
      newTopic: "",
      resourceLinks: [],
      newResourceLink: "",
      xpReward: ""
    })
    
    onOpenChange(false)
  }

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleMenteeToggle = (menteeId: number) => {
    setFormData(prev => ({
      ...prev,
      selectedMentees: prev.selectedMentees.includes(menteeId)
        ? prev.selectedMentees.filter(id => id !== menteeId)
        : [...prev.selectedMentees, menteeId]
    }))
  }

  const addTopic = () => {
    if (formData.newTopic.trim() && !formData.topics.includes(formData.newTopic.trim())) {
      setFormData(prev => ({
        ...prev,
        topics: [...prev.topics, prev.newTopic.trim()],
        newTopic: ""
      }))
    }
  }

  const removeTopic = (topic: string) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.filter(t => t !== topic)
    }))
  }

  const addResourceLink = () => {
    if (formData.newResourceLink.trim() && !formData.resourceLinks.includes(formData.newResourceLink.trim())) {
      setFormData(prev => ({
        ...prev,
        resourceLinks: [...prev.resourceLinks, prev.newResourceLink.trim()],
        newResourceLink: ""
      }))
    }
  }

  const removeResourceLink = (link: string) => {
    setFormData(prev => ({
      ...prev,
      resourceLinks: prev.resourceLinks.filter(l => l !== link)
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-green-500" />
            Create New Assignment
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="e.g., React Components Exercise"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Detailed description of the assignment..."
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Due Date *
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.dueDate && "text-muted-foreground"
                    )}
                  >
                    {formData.dueDate ? format(formData.dueDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.dueDate}
                    onSelect={(date) => handleChange('dueDate', date)}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Mentee Selection */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Assign to Mentees * ({formData.selectedMentees.length} selected)
            </Label>
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto p-2 border rounded-md">
              {state.mentees.map((mentee) => (
                <div key={mentee.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`mentee-${mentee.id}`}
                    checked={formData.selectedMentees.includes(mentee.id)}
                    onCheckedChange={() => handleMenteeToggle(mentee.id)}
                  />
                  <Label 
                    htmlFor={`mentee-${mentee.id}`}
                    className="text-sm font-medium cursor-pointer"
                  >
                    {mentee.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Topics */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Topics
            </Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a topic..."
                value={formData.newTopic}
                onChange={(e) => handleChange('newTopic', e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTopic())}
              />
              <Button type="button" onClick={addTopic} size="sm">
                Add
              </Button>
            </div>
            {formData.topics.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.topics.map((topic) => (
                  <Badge key={topic} variant="secondary" className="flex items-center gap-1">
                    {topic}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeTopic(topic)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Resource Links */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              Resource Links
            </Label>
            <div className="flex gap-2">
              <Input
                placeholder="https://..."
                value={formData.newResourceLink}
                onChange={(e) => handleChange('newResourceLink', e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addResourceLink())}
              />
              <Button type="button" onClick={addResourceLink} size="sm">
                Add
              </Button>
            </div>
            {formData.resourceLinks.length > 0 && (
              <div className="space-y-1">
                {formData.resourceLinks.map((link, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded text-sm">
                    <Link className="h-3 w-3" />
                    <span className="flex-1 truncate">{link}</span>
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeResourceLink(link)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Additional Settings */}
                          <div className="space-y-2">
                  <Label htmlFor="xpReward">XP Reward</Label>
                  <Input
                    id="xpReward"
                    type="number"
                    placeholder="100"
                    value={formData.xpReward}
                    onChange={(e) => handleChange('xpReward', e.target.value)}
                  />
                </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Create Assignment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 