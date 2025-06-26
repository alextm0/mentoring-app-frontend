"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Settings,
  User,
  Mail,
  GraduationCap,
  Users,
  Calendar,
  Award
} from "lucide-react"

export function MentorProfile() {
  const mentor = {
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "/placeholder.svg",
    title: "Senior Software Engineer",
    company: "Tech Corp",
    yearsExperience: 8,
    totalMentees: 12,
    activeMentees: 8,
    joinDate: "March 2023"
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="neon-border bg-gradient-to-br from-primary/10 via-background to-background">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <Avatar className="h-24 w-24 ring-4 ring-primary/20">
                  <AvatarImage src={mentor.avatar} />
                  <AvatarFallback className="text-2xl">
                    {mentor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm font-bold">
                  Mentor
                </div>
              </motion.div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{mentor.name}</h1>
                <div className="flex items-center gap-4 text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {mentor.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <GraduationCap className="h-4 w-4" />
                    {mentor.title} at {mentor.company}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <Button variant="outline" size="sm" className="mb-2">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <div className="text-sm text-muted-foreground">
                  Mentor since {mentor.joinDate}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Profile Information */}
      <Card className="neon-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <div className="mt-1 p-3 bg-muted/30 rounded-lg border">
                {mentor.name}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <div className="mt-1 p-3 bg-muted/30 rounded-lg border">
                {mentor.email}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Job Title</label>
              <div className="mt-1 p-3 bg-muted/30 rounded-lg border flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-primary" />
                {mentor.title}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Company</label>
              <div className="mt-1 p-3 bg-muted/30 rounded-lg border">
                {mentor.company}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Years of Experience</label>
              <div className="mt-1 p-3 bg-muted/30 rounded-lg border flex items-center gap-2">
                <Award className="h-4 w-4 text-yellow-500" />
                {mentor.yearsExperience} years
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Active Mentees</label>
              <div className="mt-1 p-3 bg-muted/30 rounded-lg border flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500" />
                {mentor.activeMentees} of {mentor.totalMentees}
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <Button className="gap-2">
              <Settings className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 