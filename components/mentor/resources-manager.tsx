"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, FileText, Video, Link, ExternalLink, Edit, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const resourceTopics = [
  {
    id: 1,
    title: "Binary Search",
    description: "Complete guide to binary search algorithm and its applications",
    resources: [
      {
        id: 1,
        title: "Binary Search Algorithm Guide",
        type: "pdf",
        url: "#",
        description: "Comprehensive PDF guide covering binary search implementation and edge cases",
      },
      {
        id: 2,
        title: "Binary Search Visualization",
        type: "interactive",
        url: "#",
        description: "Interactive tool to visualize binary search step by step",
      },
      {
        id: 3,
        title: "Binary Search Video Tutorial",
        type: "video",
        url: "#",
        description: "30-minute video explaining binary search with examples",
      },
    ],
  },
  {
    id: 2,
    title: "Graph Algorithms",
    description: "Essential graph algorithms including DFS, BFS, and shortest path",
    resources: [
      {
        id: 4,
        title: "Graph Theory Fundamentals",
        type: "pdf",
        url: "#",
        description: "Introduction to graph theory concepts and terminology",
      },
      {
        id: 5,
        title: "DFS vs BFS Explained",
        type: "article",
        url: "#",
        description: "Detailed comparison of depth-first and breadth-first search",
      },
      {
        id: 6,
        title: "Graph Algorithms Playlist",
        type: "video",
        url: "#",
        description: "Complete video series covering all essential graph algorithms",
      },
    ],
  },
  {
    id: 3,
    title: "Dynamic Programming",
    description: "Master dynamic programming patterns and problem-solving techniques",
    resources: [
      {
        id: 7,
        title: "DP Patterns Guide",
        type: "pdf",
        url: "#",
        description: "Comprehensive guide to common DP patterns and when to use them",
      },
      {
        id: 8,
        title: "Memoization vs Tabulation",
        type: "article",
        url: "#",
        description: "Understanding the two main approaches to dynamic programming",
      },
      {
        id: 9,
        title: "DP Problem Solving Workshop",
        type: "video",
        url: "#",
        description: "Live workshop solving classic DP problems step by step",
      },
    ],
  },
]

export function ResourcesManager() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null)

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-5 w-5 text-red-500" />
      case "pdf":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "article":
      case "link":
        return <Link className="h-5 w-5 text-green-500" />
      case "interactive":
        return <FileText className="h-5 w-5 text-purple-500" />
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
      <div className="space-y-6 slide-up">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setSelectedTopic(null)}>
            ← Back to Topics
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{topic.title}</h1>
            <p className="text-muted-foreground">{topic.description}</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Resource
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Resource to {topic.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Resource Title</Label>
                    <Input id="title" placeholder="e.g., Binary Search Guide" />
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF Document</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="article">Article</SelectItem>
                        <SelectItem value="interactive">Interactive Tool</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Brief description of the resource" rows={3} />
                </div>
                <div>
                  <Label htmlFor="url">URL</Label>
                  <Input id="url" placeholder="https://..." />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Add Resource</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Resources List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topic.resources.map((resource) => (
            <Card key={resource.id} className="neon-border hover:neon-glow transition-all">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getResourceIcon(resource.type)}
                    <Badge variant="outline" className="capitalize">
                      {resource.type}
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
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
    <div className="space-y-6 slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Learning Resources</h1>
          <p className="text-muted-foreground">Organize resources by topic for easy access</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2 neon-glow">
              <Plus className="h-4 w-4" />
              Create Topic
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Topic</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="topic-title">Topic Title</Label>
                <Input id="topic-title" placeholder="e.g., Binary Search" />
              </div>
              <div>
                <Label htmlFor="topic-description">Description</Label>
                <Textarea id="topic-description" placeholder="Brief description of what this topic covers" rows={3} />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Create Topic</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="neon-border">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search topics..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTopics.map((topic) => (
          <Card
            key={topic.id}
            className="neon-border hover:neon-glow transition-all cursor-pointer"
            onClick={() => setSelectedTopic(topic.id)}
          >
            <CardHeader>
              <CardTitle className="text-xl">{topic.title}</CardTitle>
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
