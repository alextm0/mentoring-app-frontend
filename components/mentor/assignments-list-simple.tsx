"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Filter, Eye, Calendar, CheckCircle2, Clock, AlertTriangle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AssignmentsListSimpleProps {
  onViewSubmission?: (submissionId: number) => void
}

export function AssignmentsListSimple({ onViewSubmission }: AssignmentsListSimpleProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock data for demo
  const assignments = [
    {
      id: 1,
      title: "Binary Search Implementation",
      description: "Implement binary search with edge cases",
      menteeName: "Alex Chen",
      menteeAvatar: "/placeholder-user.jpg",
      dueDate: "2024-01-28",
      status: "submitted" as const,
      priority: "high" as const,
      submissionId: 1
    },
    {
      id: 2,
      title: "Graph Traversal - DFS & BFS", 
      description: "Master depth-first and breadth-first search",
      menteeName: "Alex Chen",
      menteeAvatar: "/placeholder-user.jpg",
      dueDate: "2024-02-05",
      status: "in_progress" as const,
      priority: "medium" as const,
      submissionId: null
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "submitted": return <Eye className="h-4 w-4 text-blue-500" />
      case "in_progress": return <Clock className="h-4 w-4 text-orange-500" />
      default: return <Calendar className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500/10 text-green-500 border-green-500/20"
      case "submitted": return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "in_progress": return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/20"
    }
  }

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch = 
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.menteeName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || assignment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Assignments</h1>
          <p className="text-muted-foreground">Manage coding assignments for your mentees</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Assignment
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search assignments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Assignments ({filteredAssignments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Mentee</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{assignment.title}</div>
                      <div className="text-sm text-muted-foreground">{assignment.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={assignment.menteeAvatar} />
                        <AvatarFallback>
                          {assignment.menteeName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{assignment.menteeName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(assignment.dueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(assignment.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(assignment.status)}
                        {assignment.status.replace('_', ' ')}
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {assignment.status === 'submitted' && assignment.submissionId && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onViewSubmission?.(assignment.submissionId!)}
                      >
                        Review Code
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 