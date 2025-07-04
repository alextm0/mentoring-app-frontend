"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { AddMenteeModal } from "@/components/modals/add-mentee-modal"
import { RemoveMenteeModal } from "@/components/modals/remove-mentee-modal"
import { 
  Search, 
  Calendar, 
  Eye, 
  Users,
  Plus,
  Clock,
  Trash2,
  MoreVertical
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface MenteesListProps {
  onSelectMentee: (menteeId: number) => void
}

const mentees = [
  {
    id: 1,
    name: "Alex Chen",
    email: "alex@example.com",
    avatar: "/placeholder-user.jpg",
    joinedDate: "Oct 15, 2023",
    nextSession: "Jan 22, 2:00 PM",
    completedTasks: 12,
    totalTasks: 16
  },
  {
    id: 2,
    name: "Sarah Kim",
    email: "sarah@example.com", 
    avatar: "/placeholder-user.jpg",
    joinedDate: "Nov 20, 2023",
    nextSession: "Jan 23, 4:00 PM",
    completedTasks: 8,
    totalTasks: 18
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    avatar: "/placeholder-user.jpg", 
    joinedDate: "Sep 10, 2023",
    nextSession: "Jan 24, 10:00 AM",
    completedTasks: 24,
    totalTasks: 27
  },
  {
    id: 4,
    name: "Emma Davis",
    email: "emma@example.com",
    avatar: "/placeholder-user.jpg",
    joinedDate: "Dec 5, 2023",
    nextSession: "No session scheduled",
    completedTasks: 9,
    totalTasks: 15
  }
]

export function MenteesList({ onSelectMentee }: MenteesListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddMenteeModal, setShowAddMenteeModal] = useState(false)
  const [showRemoveMenteeModal, setShowRemoveMenteeModal] = useState(false)
  const [selectedMenteeForRemoval, setSelectedMenteeForRemoval] = useState<{
    id: number
    name: string
    email: string
  } | null>(null)
  const [menteesList, setMenteesList] = useState(mentees)

  const filteredMentees = menteesList.filter((mentee) => {
    const matchesSearch =
      mentee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentee.email.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const handleMenteeAdded = (email: string) => {
    // This would typically trigger a refetch of mentees or update local state
    console.log(`Invitation sent to: ${email}`)
    // In a real app, you might want to show a toast notification or refresh the mentees list
  }

  const handleRemoveMentee = (mentee: { id: number; name: string; email: string }) => {
    setSelectedMenteeForRemoval(mentee)
    setShowRemoveMenteeModal(true)
  }

  const handleMenteeRemoved = (menteeId: number) => {
    // Remove mentee from local state
    setMenteesList(prev => prev.filter(mentee => mentee.id !== menteeId))
    // In a real app, you might want to show a toast notification
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Mentees</h1>
          <p className="text-muted-foreground">Manage your mentees and track their progress</p>
        </div>
        <Button 
          className="gap-2"
          onClick={() => setShowAddMenteeModal(true)}
        >
          <Plus className="h-4 w-4" />
          Add Mentee
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search mentees by name or email..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Mentees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentees.map((mentee) => (
          <Card key={mentee.id} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={mentee.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {mentee.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base truncate">{mentee.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">{mentee.email}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem 
                      className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
                      onClick={() => handleRemoveMentee({ 
                        id: mentee.id, 
                        name: mentee.name, 
                        email: mentee.email 
                      })}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove Mentee
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Assignment Stats */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Assignments</span>
                  <span className="text-sm text-muted-foreground">
                    {mentee.completedTasks}/{mentee.totalTasks}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {mentee.completedTasks} completed, {mentee.totalTasks - mentee.completedTasks} remaining
                </div>
              </div>

              {/* Next Session */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Next Session</span>
                </div>
                <p className="text-sm text-muted-foreground pl-6">
                  {mentee.nextSession}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button 
                  size="sm" 
                  className="flex-1" 
                  onClick={() => onSelectMentee(mentee.id)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button size="sm" variant="outline">
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Mentee Modal */}
      <AddMenteeModal
        open={showAddMenteeModal}
        onOpenChange={setShowAddMenteeModal}
        onMenteeAdded={handleMenteeAdded}
      />

      {/* Remove Mentee Modal */}
      <RemoveMenteeModal
        open={showRemoveMenteeModal}
        onOpenChange={setShowRemoveMenteeModal}
        mentee={selectedMenteeForRemoval}
        onMenteeRemoved={handleMenteeRemoved}
      />

      {filteredMentees.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="font-semibold text-lg mb-2">No mentees found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm
                ? "Try adjusting your search"
                : "Start by adding your first mentee"}
            </p>
            <Button 
              className="gap-2"
              onClick={() => setShowAddMenteeModal(true)}
            >
              <Plus className="h-4 w-4" />
              Add Mentee
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
