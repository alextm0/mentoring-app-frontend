"use client"

import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
// Theme and notifications removed for MVP
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { 
  Home, 
  FileText, 
  Users, 
  Calendar, 
  Map, 
  Trophy, 
  Menu,
  User,
  Settings,
  LogOut
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface NavItem {
  id: string
  label: string
  icon: any
  href: string
}

interface User {
  name: string
  email: string
  avatar: string
  totalXP?: number
  currentLevel?: number
}

interface AppNavigationProps {
  role: 'mentor' | 'mentee'
  user: User
}

export function AppNavigation({ role, user }: AppNavigationProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems: NavItem[] = role === 'mentor' 
    ? [
        { id: 'overview', label: 'Overview', icon: Home, href: `/mentor` },
        { id: 'mentees', label: 'Mentees', icon: Users, href: `/mentor/mentees` },
        { id: 'assignments', label: 'Assignments', icon: FileText, href: `/mentor/assignments` },
        { id: 'sessions', label: 'Mentoring Sessions', icon: Calendar, href: `/mentor/sessions` },
        { id: 'roadmap', label: 'Roadmap', icon: Map, href: `/mentor/roadmap` },
      ]
    : [
        { id: 'overview', label: 'Overview', icon: Home, href: `/mentee` },
        { id: 'assignments', label: 'Assignments', icon: FileText, href: `/mentee/assignments` },
        { id: 'sessions', label: 'Mentoring Sessions', icon: Calendar, href: `/mentee/sessions` },
        { id: 'roadmap', label: 'Roadmap', icon: Map, href: `/mentee/roadmap` },
      ]

  const NavItems = ({ isMobile = false, onItemClick }: { isMobile?: boolean; onItemClick?: () => void }) => (
    <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center gap-2'}`}>
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href
        
        return (
          <Link key={item.id} href={item.href} onClick={onItemClick}>
            <Button
              variant={isActive ? "default" : "ghost"}
              size={isMobile ? "default" : "sm"}
              className={`${isMobile ? 'justify-start w-full' : 'gap-2 px-3 py-2'} transition-all duration-200 ${
                isActive 
                  ? "shadow-sm bg-primary text-primary-foreground" 
                  : "hover:bg-muted/80 text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className={isMobile ? '' : 'hidden xl:inline font-medium'}>{item.label}</span>
            </Button>
          </Link>
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
                {role === 'mentor' ? 'Mentor' : 'Mentee'}
              </Badge>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <NavItems />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* XP Display for Mentees */}
            {role === 'mentee' && user.totalXP && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                <Trophy className="h-4 w-4 text-primary" />
                <span className="font-bold text-sm">{user.totalXP} XP</span>
                <div className="text-xs text-muted-foreground">
                  Level {user.currentLevel}
                </div>
              </div>
            )}

            {/* Theme and notifications removed for MVP */}

            {/* Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-3 p-2 hover:bg-muted/80 transition-colors rounded-lg">
                  <Avatar className="h-8 w-8 ring-2 ring-border">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-xs font-medium">
                      {user.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm font-medium text-foreground">{user.name.split(' ')[0]}</span>
                    <span className="text-xs text-muted-foreground">
                      {role === 'mentee' ? `Level ${user.currentLevel}` : 'Mentor'}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-3 border-b">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>
                        {user.name.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  {role === 'mentee' && user.totalXP && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs">
                        <span>Level {user.currentLevel}</span>
                        <span>{user.totalXP} XP</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <DropdownMenuItem className="gap-2" asChild>
                  <Link href={`/${role}/profile`} className="flex items-center gap-2 w-full">
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
                      {role === 'mentor' ? 'Mentor' : 'Mentee'}
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