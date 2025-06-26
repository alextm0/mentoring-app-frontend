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
import { format } from "date-fns"
import { Calendar as CalendarIcon, Clock, Users, Video } from "lucide-react"
import { useAppContext } from "@/lib/app-context"
import { cn } from "@/lib/utils"
import toast from "react-hot-toast"

interface ScheduleSessionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ScheduleSessionModal({ open, onOpenChange }: ScheduleSessionModalProps) {
  const { state, dispatch } = useAppContext()
  const [formData, setFormData] = useState({
    menteeId: "",
    date: undefined as Date | undefined,
    time: "",
    duration: "60",
    topic: "",
    agenda: "",
    videoLink: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.menteeId || !formData.date || !formData.time || !formData.topic) {
      toast.error("Please fill in all required fields")
      return
    }

    // Combine date and time
    const [hours, minutes] = formData.time.split(":").map(Number)
    const scheduledAt = new Date(formData.date)
    scheduledAt.setHours(hours, minutes)

    const newSession = {
      id: Date.now(), // Simple ID generation for demo
      mentorId: state.mentor.id,
      menteeId: parseInt(formData.menteeId),
      scheduledAt: scheduledAt.toISOString(),
      duration: parseInt(formData.duration),
      topic: formData.topic,
      status: "scheduled" as const,
      agenda: formData.agenda.split('\n').filter(item => item.trim()),
      notes: formData.videoLink ? `Video Link: ${formData.videoLink}` : undefined
    }

    dispatch({ type: 'ADD_SESSION', session: newSession })
    toast.success("Mentoring session scheduled successfully!")
    
    // Reset form
    setFormData({
      menteeId: "",
      date: undefined,
      time: "",
      duration: "60",
      topic: "",
      agenda: "",
      videoLink: ""
    })
    
    onOpenChange(false)
  }

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Video className="h-5 w-5 text-blue-500" />
            Schedule New Mentoring Session
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Mentee Selection */}
          <div className="space-y-2">
            <Label htmlFor="mentee" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Mentee *
            </Label>
            <Select value={formData.menteeId} onValueChange={(value) => handleChange('menteeId', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a mentee" />
              </SelectTrigger>
              <SelectContent>
                {state.mentees.map((mentee) => (
                  <SelectItem key={mentee.id} value={mentee.id.toString()}>
                    {mentee.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              Date *
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.date && "text-muted-foreground"
                  )}
                >
                  {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={(date) => handleChange('date', date)}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time and Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="time" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Time *
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleChange('time', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (min)</Label>
              <Select value={formData.duration} onValueChange={(value) => handleChange('duration', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Topic */}
          <div className="space-y-2">
            <Label htmlFor="topic">Topic *</Label>
            <Input
              id="topic"
              placeholder="e.g., React Hooks Deep Dive"
              value={formData.topic}
              onChange={(e) => handleChange('topic', e.target.value)}
              required
            />
          </div>

          {/* Agenda */}
          <div className="space-y-2">
            <Label htmlFor="agenda">Agenda (one item per line)</Label>
            <Textarea
              id="agenda"
                              placeholder="• Review last week's progress&#10;• Discuss new concepts&#10;• Live coding mentoring session"
              value={formData.agenda}
              onChange={(e) => handleChange('agenda', e.target.value)}
              rows={3}
            />
          </div>

          {/* Video Link */}
          <div className="space-y-2">
            <Label htmlFor="videoLink">Video Call Link</Label>
            <Input
              id="videoLink"
              placeholder="https://meet.google.com/..."
              value={formData.videoLink}
              onChange={(e) => handleChange('videoLink', e.target.value)}
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
              Schedule Mentoring Session
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 