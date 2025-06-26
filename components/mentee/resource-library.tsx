"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Heart, ExternalLink, FileText, Video, Link } from "lucide-react"

const resourceTopics = [
  {
    id: 1,
    title: "Quick References",
    description: "Essential cheat sheets and quick reference guides",
    resources: [
      {
        id: 1,
        title: "Binary Search Explained",
        type: "video",
        url: "#",
        description: "Quick video explanation of binary search algorithm",
      },
      {
        id: 2,
        title: "Algorithm Complexity Cheat Sheet",
        type: "pdf",
        url: "#",
        description: "Time and space complexity reference for common algorithms",
      },
    ],
  },
  {
    id: 2,
    title: "Study Materials", 
    description: "Comprehensive guides and learning materials",
    resources: [
      {
        id: 3,
        title: "Dynamic Programming Guide",
        type: "pdf",
        url: "#",
        description: "Complete guide to dynamic programming patterns",
      },
      {
        id: 4,
        title: "LeetCode Practice Problems",
        type: "link",
        url: "#",
        description: "Curated list of practice problems",
      },
    ],
  },
  {
    id: 3,
    title: "Advanced Topics",
    description: "Advanced algorithms and data structures",
    resources: [
      {
        id: 5,
        title: "Graph Theory Fundamentals", 
        type: "pdf",
        url: "#",
        description: "Introduction to graph algorithms and theory",
      },
    ],
  },
]

export function ResourceLibrary() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null)

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-5 w-5 text-red-500" />
      case "pdf":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "link":
        return <Link className="h-5 w-5 text-green-500" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  const filteredTopics = resourceTopics.filter(
    (topic) =>
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (selectedTopic) {
    const topic = resourceTopics.find((t) => t.id === selectedTopic)!
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setSelectedTopic(null)}>
            ← Back to Topics
          </Button>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{topic.title}</h2>
            <p className="text-muted-foreground">{topic.description}</p>
          </div>
        </div>

        {/* Resources List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topic.resources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-md transition-all">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  {getResourceIcon(resource.type)}
                  <Badge variant="outline" className="capitalize">
                    {resource.type}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{resource.description}</p>
                <Button size="sm" className="w-full gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Open Resource
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Resource Library</h2>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search topics..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTopics.map((topic) => (
          <Card
            key={topic.id}
            className="hover:shadow-md transition-all cursor-pointer"
            onClick={() => setSelectedTopic(topic.id)}
          >
            <CardHeader>
              <CardTitle className="text-lg">{topic.title}</CardTitle>
              <p className="text-muted-foreground text-sm">{topic.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Resources</span>
                  <Badge variant="secondary">{topic.resources.length}</Badge>
                </div>

                {/* Resource Types Preview */}
                <div className="flex gap-2">
                  {Array.from(new Set(topic.resources.map((r) => r.type))).map((type) => (
                    <div key={type} className="flex items-center gap-1">
                      {getResourceIcon(type)}
                      <span className="text-xs text-muted-foreground capitalize">{type}</span>
                    </div>
                  ))}
                </div>

                {/* Recent Resources */}
                <div className="space-y-2">
                  {topic.resources.slice(0, 2).map((resource) => (
                    <div key={resource.id} className="flex items-center gap-2 p-2 bg-muted/30 rounded text-sm">
                      {getResourceIcon(resource.type)}
                      <span className="truncate">{resource.title}</span>
                    </div>
                  ))}
                  {topic.resources.length > 2 && (
                    <div className="text-xs text-muted-foreground text-center">
                      +{topic.resources.length - 2} more resources
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
