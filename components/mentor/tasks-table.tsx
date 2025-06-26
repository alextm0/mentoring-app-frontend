"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const tasks = [
  {
    id: 1,
    mentee: "Alex Chen",
    avatar: "/placeholder.svg",
    task: "Binary Search Implementation",
    due: "2024-01-15",
    status: "submitted",
    urgent: false,
    overdue: false,
  },
  {
    id: 2,
    mentee: "Sarah Kim",
    avatar: "/placeholder.svg",
    task: "Dynamic Programming - Fibonacci",
    due: "2024-01-14",
    status: "in-progress",
    urgent: true,
    overdue: false,
  },
  {
    id: 3,
    mentee: "Mike Johnson",
    avatar: "/placeholder.svg",
    task: "Graph Traversal - DFS/BFS",
    due: "2024-01-12",
    status: "not-started",
    urgent: false,
    overdue: true,
  },
]

export function TasksTable() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-blue-100 text-blue-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      case "not-started":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRowBg = (urgent: boolean, overdue: boolean) => {
    if (overdue) return "bg-red-50"
    if (urgent) return "bg-yellow-50"
    return ""
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Tasks Overview</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mentee</TableHead>
            <TableHead>Task</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id} className={getRowBg(task.urgent, task.overdue)}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={task.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {task.mentee
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{task.mentee}</span>
                </div>
              </TableCell>
              <TableCell>{task.task}</TableCell>
              <TableCell>{task.due}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(task.status)}>{task.status.replace("-", " ")}</Badge>
              </TableCell>
              <TableCell>
                <Button size="sm" variant={task.status === "submitted" ? "default" : "outline"}>
                  {task.status === "submitted" ? "Review" : "View"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
