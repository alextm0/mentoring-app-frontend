"use client"

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { getCurrentMentee, getCurrentMentor } from '@/lib/mock-data'
import { DashboardLayout } from '@/components/shared/dashboard-layout'

interface DashboardLayoutWrapperProps {
  children: ReactNode
}

// This layout wraps all dashboard routes
export default function DashboardLayoutWrapper({ children }: DashboardLayoutWrapperProps) {
  const pathname = usePathname()
  
  // Determine role from pathname
  const role = pathname.includes('/mentor') ? 'mentor' : 'mentee'
  
  // Get user data based on role
  const user = role === 'mentor' ? getCurrentMentor() : getCurrentMentee()

  return (
    <DashboardLayout role={role} user={user}>
      {children}
    </DashboardLayout>
  )
} 