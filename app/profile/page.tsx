"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { 
  User, 
  Mail, 
  Calendar, 
  Edit,
  Save,
  Camera,
  ArrowLeft
} from "lucide-react"
import Link from "next/link"
import { MenteeNavigation } from "@/components/mentee/mentee-navigation"
import { MentorNavigation } from "@/components/mentor/mentor-navigation"

// Mock user data - this would come from your auth/user context in a real app
const mockUser = {
  id: 1,
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  bio: "Passionate software engineer with 3 years of experience in full-stack development. Currently focusing on competitive programming and data structures.",
  avatar: "/placeholder-user.jpg",
  joinDate: "January 2024",
  role: "Mentee", // or "Mentor"
  level: 12,
  totalXP: 2400,
  progress: 75,
  stats: {
    problemsSolved: 145,
    sessionsAttended: 23,
    streakDays: 15
  }
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState(mockUser)
  const [activeTab, setActiveTab] = useState("profile")

  const handleSave = () => {
    // In a real app, this would save to your backend
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      {userData.role === "Mentee" ? (
        <MenteeNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      ) : (
        <MentorNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href={userData.role === "Mentee" ? "/mentee" : "/mentor"}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-muted-foreground">Manage your account information</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="relative inline-block">
                    <Avatar className="h-24 w-24 mx-auto">
                      <AvatarImage src={userData.avatar} />
                      <AvatarFallback className="text-lg">
                        {userData.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full p-0"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <h2 className="text-xl font-semibold mt-4">{userData.name}</h2>
                  <p className="text-muted-foreground">{userData.email}</p>
                  
                  <Badge variant="secondary" className="mt-2">
                    {userData.role}
                  </Badge>
                  
                  {userData.role === "Mentee" && (
                    <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Level {userData.level}</span>
                        <span>{userData.totalXP} XP</span>
                      </div>
                      <Progress value={userData.progress} className="h-2" />
                    </div>
                  )}
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{userData.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Joined {userData.joinDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Basic Stats Card - Only for Mentees */}
            {userData.role === "Mentee" && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Basic Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Problems Solved</span>
                    <span className="font-medium">{userData.stats.problemsSolved}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Sessions Attended</span>
                    <span className="font-medium">{userData.stats.sessionsAttended}</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Profile Information</CardTitle>
                  <Button
                    variant={isEditing ? "default" : "outline"}
                    size="sm"
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  >
                    {isEditing ? (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    ) : (
                      <>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={userData.name}
                      disabled={!isEditing}
                      onChange={(e) => setUserData({...userData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userData.email}
                      disabled={!isEditing}
                      onChange={(e) => setUserData({...userData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={userData.bio}
                    disabled={!isEditing}
                    onChange={(e) => setUserData({...userData, bio: e.target.value})}
                    rows={4}
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 