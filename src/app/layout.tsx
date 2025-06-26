import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
// Theme provider removed - using dark theme only for MVP
import { AppProvider } from "@/lib/app-context"
import { Toaster } from "react-hot-toast"
import { StagewiseToolbar } from "@stagewise/toolbar-next"
import { ReactPlugin } from "@stagewise-plugins/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MentorHub - Coding Mentorship Platform",
  description: "A comprehensive platform for coding mentorship and progress tracking",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'hsl(var(--background))',
                color: 'hsl(var(--foreground))',
                border: '1px solid hsl(var(--border))',
              },
            }}
          />
          <StagewiseToolbar 
            config={{
              plugins: [ReactPlugin]
            }}
          />
        </AppProvider>
      </body>
    </html>
  )
}
