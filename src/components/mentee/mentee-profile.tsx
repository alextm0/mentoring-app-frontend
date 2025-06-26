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
  Award,
  Flame,
  Star
} from "lucide-react"
import { getCurrentMentee } from "@/lib/mock-data"

export function MenteeProfile() {
  const mentee = getCurrentMentee()

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
                  <AvatarImage src={mentee.avatar} />
                  <AvatarFallback className="text-2xl">
                    {mentee.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm font-bold">
                  Lv.{mentee.currentLevel}
                </div>
              </motion.div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{mentee.name}</h1>
                <div className="flex items-center gap-4 text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {mentee.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <GraduationCap className="h-4 w-4" />
                    Computer Science Student
                  </div>
                </div>
              </div>

              <div className="text-right">
                <Button variant="outline" size="sm" className="mb-2">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <div className="text-sm text-muted-foreground">
                  Member since January 2024
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
                {mentee.name}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <div className="mt-1 p-3 bg-muted/30 rounded-lg border">
                {mentee.email}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Current Level</label>
              <div className="mt-1 p-3 bg-muted/30 rounded-lg border flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                Level {mentee.currentLevel}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Total XP</label>
              <div className="mt-1 p-3 bg-muted/30 rounded-lg border flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                {mentee.totalXP} XP
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Join Date</label>
              <div className="mt-1 p-3 bg-muted/30 rounded-lg border">
                January 2024
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