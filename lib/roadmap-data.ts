import { RoadmapData } from "@/components/roadmap/shared-types"

export const competitiveProgrammingRoadmap: RoadmapData = {
  id: 1,
  title: "Competitive Programming Mastery",
  description: "Complete journey from algorithms to advanced competitive programming techniques",
  totalPhases: 6,
  totalProblems: 180,
  phases: [
    {
      id: 1,
      title: "Foundation",
      status: "completed",
      problems: 25,
      completedProblems: 25,
      description: "Master the fundamentals of programming and basic problem-solving",
      topics: [
        { 
          id: 1, 
          title: "Time & Space Complexity", 
          progress: 100, 
          difficulty: "Easy", 
          problems: 8, 
          completedProblems: 8, 
          locked: false,
          resources: ["Big O Notation Guide", "Time Complexity Analysis", "Space Complexity Basics"]
        },
        { 
          id: 2, 
          title: "Arrays & Strings", 
          progress: 100, 
          difficulty: "Easy", 
          problems: 12, 
          completedProblems: 12, 
          locked: false,
          resources: ["Array Manipulation Techniques", "String Algorithms", "Two Pointer Technique"]
        },
        { 
          id: 3, 
          title: "Basic Sorting", 
          progress: 100, 
          difficulty: "Easy", 
          problems: 5, 
          completedProblems: 5, 
          locked: false,
          resources: ["Sorting Algorithms Visualized", "Bubble Sort vs Selection Sort", "Insertion Sort Guide"]
        },
        { 
          id: 4, 
          title: "Binary Search", 
          progress: 100, 
          difficulty: "Medium", 
          problems: 8, 
          completedProblems: 8, 
          locked: false,
          resources: ["Binary Search Template", "Lower & Upper Bound", "Binary Search Applications"]
        }
      ]
    },
    {
      id: 2,
      title: "Data Structures",
      status: "active",
      problems: 35,
      completedProblems: 18,
      description: "Deep dive into essential data structures and their applications",
      topics: [
        { 
          id: 5, 
          title: "Stacks & Queues", 
          progress: 100, 
          difficulty: "Easy", 
          problems: 10, 
          completedProblems: 10, 
          locked: false,
          resources: ["Stack Implementation", "Queue Applications", "Deque Operations"]
        },
        { 
          id: 6, 
          title: "Linked Lists", 
          progress: 75, 
          difficulty: "Medium", 
          problems: 8, 
          completedProblems: 6, 
          locked: false,
          resources: ["Linked List Basics", "Two Pointer in Lists", "Cycle Detection Floyd's Algorithm"]
        },
        { 
          id: 7, 
          title: "Trees & BST", 
          progress: 25, 
          difficulty: "Medium", 
          problems: 12, 
          completedProblems: 3, 
          locked: false,
          resources: ["Binary Tree Traversal", "BST Operations", "Tree Construction Problems"]
        },
        { 
          id: 8, 
          title: "Heaps & Priority Queues", 
          progress: 0, 
          difficulty: "Hard", 
          problems: 5, 
          completedProblems: 0, 
          locked: false,
          resources: ["Heap Implementation", "Priority Queue STL", "K-th Largest Element"]
        }
      ]
    },
    {
      id: 3,
      title: "Algorithms",
      status: "active",
      problems: 40,
      completedProblems: 8,
      description: "Master fundamental algorithms and optimization techniques",
      topics: [
        { 
          id: 9, 
          title: "Greedy Algorithms", 
          progress: 60, 
          difficulty: "Medium", 
          problems: 10, 
          completedProblems: 6, 
          locked: false,
          resources: ["Greedy Choice Property", "Activity Selection", "Fractional Knapsack"]
        },
        { 
          id: 10, 
          title: "Dynamic Programming", 
          progress: 20, 
          difficulty: "Hard", 
          problems: 15, 
          completedProblems: 3, 
          locked: false,
          resources: ["DP Patterns", "Memoization vs Tabulation", "Classic DP Problems"]
        },
        { 
          id: 11, 
          title: "Graph Basics", 
          progress: 0, 
          difficulty: "Medium", 
          problems: 10, 
          completedProblems: 0, 
          locked: false,
          resources: ["Graph Representation", "Adjacency List vs Matrix", "Graph Traversal Basics"]
        },
        { 
          id: 12, 
          title: "Advanced Sorting", 
          progress: 0, 
          difficulty: "Hard", 
          problems: 5, 
          completedProblems: 0, 
          locked: false,
          resources: ["Merge Sort", "Quick Sort", "Counting Sort"]
        }
      ]
    },
    {
      id: 4,
      title: "Graph Theory",
      status: "active",
      problems: 30,
      completedProblems: 3,
      description: "Explore graph algorithms and their competitive programming applications",
      topics: [
        { 
          id: 13, 
          title: "DFS & BFS", 
          progress: 37, 
          difficulty: "Medium", 
          problems: 8, 
          completedProblems: 3, 
          locked: false,
          resources: ["DFS Implementation", "BFS for Shortest Path", "Connected Components"]
        },
        { 
          id: 14, 
          title: "Shortest Paths", 
          progress: 0, 
          difficulty: "Hard", 
          problems: 8, 
          completedProblems: 0, 
          locked: false,
          resources: ["Dijkstra's Algorithm", "Bellman-Ford", "Floyd-Warshall"]
        },
        { 
          id: 15, 
          title: "Minimum Spanning Tree", 
          progress: 0, 
          difficulty: "Hard", 
          problems: 6, 
          completedProblems: 0, 
          locked: false,
          resources: ["Kruskal's Algorithm", "Prim's Algorithm", "Union Find"]
        },
        { 
          id: 16, 
          title: "Network Flows", 
          progress: 0, 
          difficulty: "Expert", 
          problems: 8, 
          completedProblems: 0, 
          locked: false,
          resources: ["Max Flow Min Cut", "Ford-Fulkerson", "Edmonds-Karp"]
        }
      ]
    },
    {
      id: 5,
      title: "Advanced Topics",
      status: "active",
      problems: 25,
      completedProblems: 0,
      description: "Advanced mathematical and algorithmic concepts for competitive programming",
      topics: [
        { 
          id: 17, 
          title: "Number Theory", 
          progress: 0, 
          difficulty: "Hard", 
          problems: 8, 
          completedProblems: 0, 
          locked: false,
          resources: ["Prime Numbers", "GCD & LCM", "Modular Arithmetic"]
        },
        { 
          id: 18, 
          title: "String Algorithms", 
          progress: 0, 
          difficulty: "Expert", 
          problems: 7, 
          completedProblems: 0, 
          locked: false,
          resources: ["KMP Algorithm", "Rabin-Karp", "Suffix Arrays"]
        },
        { 
          id: 19, 
          title: "Game Theory", 
          progress: 0, 
          difficulty: "Expert", 
          problems: 6, 
          completedProblems: 0, 
          locked: false,
          resources: ["Nim Game", "Minimax Algorithm", "Grundy Numbers"]
        },
        { 
          id: 20, 
          title: "Computational Geometry", 
          progress: 0, 
          difficulty: "Expert", 
          problems: 4, 
          completedProblems: 0, 
          locked: false,
          resources: ["Convex Hull", "Line Intersection", "Closest Pair of Points"]
        }
      ]
    }
  ]
} 