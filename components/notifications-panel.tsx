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
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-72 p-0">
        <div className="p-3 border-b">
          <h3 className="font-medium text-sm">Notifications</h3>
        </div>

        <div className="py-1">
          {notifications.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
          ) : (
            notifications.map((notification) => {
              const Icon = notification.icon
              
              return (
                <DropdownMenuItem
                  key={notification.id}
                  className="p-3 cursor-pointer"
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="p-1.5 rounded bg-muted">
                      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm leading-tight ${
                        notification.unread ? 'font-medium' : 'text-muted-foreground'
                      }`}>
                        {notification.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {notification.time}
                      </p>
                    </div>

                    {notification.unread && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    )}
                  </div>
                </DropdownMenuItem>
              )
            })
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 