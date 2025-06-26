"use client"

import { Bell, Search, User, Home, FileText, Users, Calendar, BookOpen, Code, Settings, LogOut, Map, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { NotificationsPanel } from "@/components/notifications-panel"
import { useAppContext } from "@/lib/app-context"
import Link from "next/link"
import { useState } from "react"

interface MentorNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navItems = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "mentees", label: "Mentees", icon: Users },
  { id: "assignments", label: "Assignments", icon: FileText },
  { id: "sessions", label: "Sessions", icon: Calendar },
  { id: "roadmap", label: "Roadmap", icon: Map },
]

export function MentorNavigation({ activeTab, onTabChange }: MentorNavigationProps) {
  const { state } = useAppContext()
  const mentor = state.mentor
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const NavItems = ({ isMobile = false, onItemClick }: { isMobile?: boolean; onItemClick?: () => void }) => (
    <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center gap-2'}`}>
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = activeTab === item.id
        return (
          <Button
            key={item.id}
            variant={isActive ? "default" : "ghost"}
            size={isMobile ? "default" : "sm"}
            className={`${isMobile ? 'justify-start w-full' : 'gap-2 px-3 py-2'} transition-all duration-200 ${
              isActive 
                ? "shadow-sm bg-primary text-primary-foreground" 
                : "hover:bg-muted/80 text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => {
              onTabChange(item.id)
              onItemClick?.()
            }}
          >
            <Icon className="h-4 w-4" />
            <span className={isMobile ? '' : 'hidden xl:inline font-medium'}>{item.label}</span>
          </Button>
        )
      })}
    </div>
  )

  return (
    <nav className="border-b border-border/50 bg-background/95 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="text-xl font-bold text-foreground">MentorHub</div>
              <Badge variant="outline" className="text-xs font-medium border-primary/20 text-primary">
                Mentor
              </Badge>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <NavItems />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notifications */}
            <NotificationsPanel />

            {/* Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-3 p-2 hover:bg-muted/80 transition-colors rounded-lg">
                  <Avatar className="h-8 w-8 ring-2 ring-border">
                    <AvatarImage src={mentor.avatar} />
                    <AvatarFallback className="text-xs font-medium">
                      {mentor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm font-medium text-foreground">{mentor.name.split(' ')[0]}</span>
                    <span className="text-xs text-muted-foreground">Mentor</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-3 border-b">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={mentor.avatar} />
                      <AvatarFallback>
                        {mentor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{mentor.name}</p>
                      <p className="text-sm text-muted-foreground">{mentor.email}</p>
                    </div>
                  </div>
                </div>
                
                <DropdownMenuItem className="gap-2" asChild>
                  <Link href="/profile" className="flex items-center gap-2 w-full">
                    <User className="h-4 w-4" />
                    Profile Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <Settings className="h-4 w-4" />
                  Preferences
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2">
                  <Link href="/" className="flex items-center gap-2 w-full">
                    <Home className="h-4 w-4" />
                    Back to Home
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 text-destructive">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="py-6">
                  <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border/50">
                    <div className="text-lg font-bold text-foreground">MentorHub</div>
                    <Badge variant="outline" className="text-xs font-medium border-primary/20 text-primary">
                      Mentor
                    </Badge>
                  </div>

                  <NavItems isMobile onItemClick={() => setMobileMenuOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
