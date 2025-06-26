"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell, Calendar, MessageSquare, BookOpen } from "lucide-react"

// Simple mock notifications
const mockNotifications = [
  {
    id: 1,
    title: "New feedback received",
    time: "2h ago",
    unread: true,
    icon: BookOpen,
  },
  {
    id: 2,
    title: "Session starting soon",
    time: "1h",
    unread: true,
    icon: Calendar,
  },
  {
    id: 3,
    title: "Assignment submitted",
    time: "5h ago",
    unread: false,
    icon: MessageSquare,
  },
]

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const unreadCount = notifications.filter(n => n.unread).length

  const markAsRead = (notificationId: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, unread: false } : n)
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-3 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <p className="text-sm text-muted-foreground">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.map((notification) => {
            const Icon = notification.icon
            return (
              <DropdownMenuItem
                key={notification.id}
                className="flex items-start gap-3 p-3 cursor-pointer"
                onClick={() => markAsRead(notification.id)}
              >
                <div className={`p-2 rounded-full ${
                  notification.unread ? 'bg-primary/10' : 'bg-muted'
                }`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className={`text-sm ${
                    notification.unread ? 'font-medium' : 'text-muted-foreground'
                  }`}>
                    {notification.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {notification.time}
                  </p>
                </div>
                {notification.unread && (
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                )}
              </DropdownMenuItem>
            )
          })}
        </div>
        {notifications.length === 0 && (
          <div className="p-4 text-center text-muted-foreground">
            No notifications
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 