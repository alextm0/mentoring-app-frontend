import { ReactNode } from 'react'
import { AppNavigation } from './app-navigation'

interface User {
  name: string
  email: string
  avatar: string
  totalXP?: number
  currentLevel?: number
  progress?: number
}

interface DashboardLayoutProps {
  children: ReactNode
  role: 'mentor' | 'mentee'
  user: User
}

export function DashboardLayout({ children, role, user }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <AppNavigation role={role} user={user} />
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  )
} 