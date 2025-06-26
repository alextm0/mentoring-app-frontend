"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Search, 
  Heart, 
  ExternalLink, 
  FileText, 
  Video, 
  Link, 
  Download, 
  Filter,
  Eye,
  Clock,
  BookOpen,
  Play,
  Star,
  Users,
  Calendar,
  ChevronRight,
  X,
  Tag
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import toast from "react-hot-toast"

interface Resource {
  id: number
  title: string
  type: "video" | "pdf" | "link" | "article"
  category: string
  description: string
  url: string
  favorite: boolean
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "All Levels"
  readTime: string
  tags: string[]
  author?: string
  publishedDate?: string
  rating?: number
  views?: number
  content?: string
  prerequisites?: string[]
}

const resources: Resource[] = [
  {
    id: 1,
    title: "Binary Search Algorithm Guide",
    type: "pdf",
    category: "Algorithms",
    description: "Comprehensive guide to binary search with step-by-step examples and complexity analysis",
    url: "#",
    favorite: true,
    difficulty: "Beginner",
    readTime: "15 min",
    tags: ["algorithms", "search", "beginner", "complexity"],
    author: "John Doe",
    publishedDate: "2024-01-15",
    rating: 4.8,
    views: 1234,
    content: `# Binary Search Algorithm

Binary search is a highly efficient algorithm for finding a target value in a sorted array. It works by repeatedly dividing the search interval in half.

## Key Concepts:
- **Time Complexity**: O(log n)
- **Space Complexity**: O(1) for iterative, O(log n) for recursive
- **Prerequisite**: Array must be sorted

## Implementation:
1. Initialize left and right pointers
2. Calculate middle index
3. Compare target with middle element
4. Adjust search range based on comparison
5. Repeat until found or exhausted

## Applications:
- Finding elements in sorted arrays
- Finding insertion points
- Peak finding in mountain arrays`,
    prerequisites: ["Basic programming", "Array data structure"]
  },
  {
    id: 2,
    title: "Dynamic Programming Explained",
    type: "video",
    category: "Dynamic Programming",
    description: "Video tutorial covering DP concepts with real-world examples and common patterns",
    url: "#",
    favorite: false,
    difficulty: "Intermediate",
    readTime: "45 min",
    tags: ["dp", "optimization", "intermediate", "memoization"],
    author: "Jane Smith",
    publishedDate: "2024-01-10",
    rating: 4.9,
    views: 2567,
    content: `# Dynamic Programming Fundamentals

Dynamic Programming is a powerful problem-solving technique that breaks down complex problems into simpler subproblems.

## Core Principles:
- **Optimal Substructure**: Problem can be broken into subproblems
- **Overlapping Subproblems**: Subproblems are solved multiple times
- **Memoization**: Store results to avoid recomputation

## Common Patterns:
1. Linear DP (Fibonacci, House Robber)
2. 2D DP (Longest Common Subsequence)
3. Knapsack Problems
4. Interval DP

## When to Use DP:
- Optimization problems (min/max)
- Counting problems
- Decision problems with overlapping subproblems`,
    prerequisites: ["Recursion", "Problem-solving basics"]
  },
  {
    id: 3,
    title: "LeetCode Practice Problems",
    type: "link",
    category: "Practice",
    description: "Curated list of essential problems for interview preparation with difficulty progression",
    url: "https://leetcode.com",
    favorite: true,
    difficulty: "All Levels",
    readTime: "Varies",
    tags: ["practice", "interview", "coding", "problems"],
    author: "LeetCode Team",
    publishedDate: "2024-01-01",
    rating: 4.7,
    views: 5432,
    content: `# Essential LeetCode Problems

A carefully curated list of problems that cover all important patterns for technical interviews.

## Problem Categories:
1. **Arrays & Strings** (20 problems)
2. **Linked Lists** (15 problems)
3. **Trees & Graphs** (25 problems)
4. **Dynamic Programming** (20 problems)
5. **System Design** (10 problems)

## Study Plan:
- Week 1-2: Arrays and Two Pointers
- Week 3-4: Linked Lists and Stacks
- Week 5-6: Trees and Graph Traversal
- Week 7-8: Dynamic Programming
- Week 9-10: Advanced Topics

## Success Tips:
- Practice consistently (1-2 problems daily)
- Focus on understanding patterns
- Time yourself during practice
- Review and optimize solutions`,
    prerequisites: ["Basic programming", "Data structures knowledge"]
  },
  {
    id: 4,
    title: "Graph Theory Fundamentals",
    type: "pdf",
    category: "Graphs",
    description: "Introduction to graph algorithms and data structures with visual examples",
    url: "#",
    favorite: false,
    difficulty: "Advanced",
    readTime: "30 min",
    tags: ["graphs", "algorithms", "advanced", "traversal"],
    author: "Dr. Alice Johnson",
    publishedDate: "2024-01-08",
    rating: 4.6,
    views: 876,
    content: `# Graph Theory Fundamentals

Graphs are versatile data structures that model relationships between entities.

## Graph Representations:
- **Adjacency Matrix**: Good for dense graphs
- **Adjacency List**: Memory efficient for sparse graphs
- **Edge List**: Simple representation for algorithms

## Essential Algorithms:
1. **Traversal**: DFS, BFS
2. **Shortest Path**: Dijkstra, Bellman-Ford
3. **Minimum Spanning Tree**: Kruskal, Prim
4. **Topological Sorting**: DAG processing

## Applications:
- Social networks
- Navigation systems
- Dependency resolution
- Network analysis`,
    prerequisites: ["Data structures", "Recursion", "Algorithm analysis"]
  },
  {
    id: 5,
    title: "React Hooks Deep Dive",
    type: "video",
    category: "Web Development",
    description: "Advanced React hooks patterns and best practices for modern React development",
    url: "#",
    favorite: true,
    difficulty: "Intermediate",
    readTime: "60 min",
    tags: ["react", "hooks", "frontend", "javascript"],
    author: "React Team",
    publishedDate: "2024-01-12",
    rating: 4.9,
    views: 3421,
    content: `# React Hooks Deep Dive

Modern React development relies heavily on hooks for state management and side effects.

## Essential Hooks:
- **useState**: Local component state
- **useEffect**: Side effects and lifecycle
- **useContext**: Global state management
- **useReducer**: Complex state logic
- **useMemo**: Performance optimization
- **useCallback**: Function memoization

## Custom Hooks:
Create reusable logic by building custom hooks:
- useLocalStorage
- useFetch
- useDebounce
- useToggle

## Best Practices:
- Keep hooks at component top level
- Use dependency arrays correctly
- Optimize with useMemo and useCallback
- Extract logic into custom hooks`,
    prerequisites: ["JavaScript ES6+", "React basics", "Component lifecycle"]
  },
  {
    id: 6,
    title: "System Design Interview Guide",
    type: "article",
    category: "System Design",
    description: "Complete guide to system design interviews with examples and common patterns",
    url: "#",
    favorite: false,
    difficulty: "Advanced",
    readTime: "90 min",
    tags: ["system-design", "interview", "architecture", "scalability"],
    author: "System Design Team",
    publishedDate: "2024-01-05",
    rating: 4.8,
    views: 2109,
    content: `# System Design Interview Guide

System design interviews test your ability to architect large-scale distributed systems.

## Key Concepts:
- **Scalability**: Horizontal vs Vertical scaling
- **Reliability**: Fault tolerance and redundancy
- **Availability**: Uptime and disaster recovery
- **Consistency**: CAP theorem and trade-offs

## Design Process:
1. Clarify requirements and constraints
2. Estimate scale and capacity
3. Design high-level architecture
4. Deep dive into components
5. Address bottlenecks and scale

## Common Systems:
- URL Shortener (like bit.ly)
- Chat System (like WhatsApp)
- News Feed (like Twitter)
- Video Streaming (like YouTube)
- Search Engine (like Google)

## Tools and Technologies:
- Load Balancers: NGINX, HAProxy
- Databases: MySQL, PostgreSQL, MongoDB
- Caching: Redis, Memcached
- Message Queues: RabbitMQ, Apache Kafka`,
    prerequisites: ["Database concepts", "Network protocols", "Software architecture"]
  }
]

const categories = [
  "All",
  "Algorithms",
  "Data Structures", 
  "Dynamic Programming",
  "Graphs",
  "Web Development",
  "System Design",
  "Practice",
]

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
        difficulty: "Beginner",
        readTime: "15 min",
        favorite: true,
      },
      {
        id: 2,
        title: "Binary Search Visualization",
        type: "link",
        url: "#",
        description: "Interactive tool to visualize binary search step by step",
        difficulty: "Beginner",
        readTime: "10 min",
        favorite: false,
      },
      {
        id: 3,
        title: "Binary Search Video Tutorial",
        type: "video",
        url: "#",
        description: "30-minute video explaining binary search with examples",
        difficulty: "Beginner",
        readTime: "30 min",
        favorite: false,
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
        difficulty: "Advanced",
        readTime: "45 min",
        favorite: true,
      },
      {
        id: 5,
        title: "DFS vs BFS Explained",
        type: "article",
        url: "#",
        description: "Detailed comparison of depth-first and breadth-first search",
        difficulty: "Intermediate",
        readTime: "20 min",
        favorite: false,
      },
      {
        id: 6,
        title: "Graph Algorithms Playlist",
        type: "video",
        url: "#",
        description: "Complete video series covering all essential graph algorithms",
        difficulty: "Advanced",
        readTime: "2 hours",
        favorite: true,
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
        difficulty: "Intermediate",
        readTime: "35 min",
        favorite: false,
      },
      {
        id: 8,
        title: "Memoization vs Tabulation",
        type: "article",
        url: "#",
        description: "Understanding the two main approaches to dynamic programming",
        difficulty: "Intermediate",
        readTime: "15 min",
        favorite: true,
      },
      {
        id: 9,
        title: "DP Problem Solving Workshop",
        type: "video",
        url: "#",
        description: "Live workshop solving classic DP problems step by step",
        difficulty: "Advanced",
        readTime: "90 min",
        favorite: false,
      },
    ],
  },
]

export function MenteeResources() {
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
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-950/20 dark:text-green-300"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/20 dark:text-yellow-300"
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-950/20 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-950/20 dark:text-gray-300"
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
        </div>

        {/* Resources List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topic.resources.map((resource) => (
            <Card key={resource.id} className="neon-border hover:neon-glow transition-all">
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
                <div className="flex items-center gap-2">
                  <Badge className={getDifficultyColor(resource.difficulty)}>
                    {resource.difficulty}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{resource.readTime}</span>
                </div>
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
          <p className="text-muted-foreground">Access curated materials to support your learning journey</p>
        </div>
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
