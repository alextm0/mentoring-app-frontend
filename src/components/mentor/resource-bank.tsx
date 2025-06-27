"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Plus, 
  Search, 
  BookOpen, 
  Copy,
  Edit,
  Trash2,
  MoreHorizontal,
  ExternalLink
} from "lucide-react"
import { BankResource } from "@/types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data - will be replaced with API calls
const mockResources: BankResource[] = [
  {
    id: 1,
    title: "JavaScript Closures Explained",
    description: "A comprehensive guide to understanding closures in JavaScript with practical examples.",
    externalUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
    mentorId: 1
  },
  {
    id: 2,
    title: "React Hooks Deep Dive",
    description: "Advanced patterns and best practices for React Hooks including custom hooks.",
    externalUrl: "https://www.youtube.com/watch?v=example",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-12",
    mentorId: 1
  },
  {
    id: 3,
    title: "Clean Code Principles",
    description: "Essential principles for writing maintainable and readable code.",
    externalUrl: "https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350884",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-05",
    mentorId: 1
  },
  {
    id: 4,
    title: "TypeScript Official Documentation",
    description: "Complete reference for TypeScript language features and usage.",
    externalUrl: "https://www.typescriptlang.org/docs/",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
    mentorId: 1
  }
]

export function ResourceBank() {
  const [resources, setResources] = useState<BankResource[]>(mockResources)
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [newResource, setNewResource] = useState<{
    title: string
    description: string
    externalUrl: string
  }>({
    title: "",
    description: "",
    externalUrl: ""
  })

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesSearch
  })

  const handleAddResource = () => {
    const resource: BankResource = {
      id: Math.max(...resources.map(r => r.id)) + 1,
      title: newResource.title,
      description: newResource.description,
      externalUrl: newResource.externalUrl,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      mentorId: 1
    }

    setResources([resource, ...resources])
    setShowAddModal(false)
    setNewResource({
      title: "",
      description: "",
      externalUrl: ""
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Resource Bank</h1>
          <p className="text-muted-foreground">Manage your learning resources for reuse across assignments</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Resource</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newResource.title}
                  onChange={(e) => setNewResource(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., JavaScript Closures Explained"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newResource.description}
                  onChange={(e) => setNewResource(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what this resource covers..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="externalUrl">External URL</Label>
                <Input
                  id="externalUrl"
                  type="url"
                  value={newResource.externalUrl}
                  onChange={(e) => setNewResource(prev => ({ ...prev, externalUrl: e.target.value }))}
                  placeholder="https://example.com/resource"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddResource} disabled={!newResource.title || !newResource.description || !newResource.externalUrl}>
                  Add Resource
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resources List */}
      <div className="space-y-4">
        {filteredResources.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-medium mb-2">No resources found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery 
                  ? "Try adjusting your search filters" 
                  : "Add your first learning resource to get started"
                }
              </p>
              {!searchQuery && (
                <Button onClick={() => setShowAddModal(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Your First Resource
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredResources.map((resource) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group"
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <h3 className="text-lg font-semibold">{resource.title}</h3>
                        </div>
                        {resource.externalUrl && (
                          <Button variant="ghost" size="sm" className="gap-1 h-6 px-2" asChild>
                            <a href={resource.externalUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                        )}
                      </div>

                      <p className="text-muted-foreground">{resource.description}</p>

                      <div className="text-xs text-muted-foreground">
                        Created {new Date(resource.createdAt).toLocaleDateString()}
                        {resource.updatedAt !== resource.createdAt && (
                          <span> • Updated {new Date(resource.updatedAt).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Copy className="h-4 w-4" />
                          Use in Assignment
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Edit className="h-4 w-4" />
                          Edit Resource
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive">
                          <Trash2 className="h-4 w-4" />
                          Delete Resource
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Stats */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{resources.length}</div>
              <div className="text-sm text-muted-foreground">Total Resources</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 