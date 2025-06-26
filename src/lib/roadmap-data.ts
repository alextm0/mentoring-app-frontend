import { RoadmapTemplate } from "@/components/roadmap/shared-types"

export const programmingRoadmapTemplate: RoadmapTemplate = {
  id: 1,
  title: "Programming Fundamentals",
  description: "Master essential programming concepts through hands-on problems and comprehensive resources",
  difficulty: "Beginner",
  phases: [
    {
      id: 1,
      title: "Foundations",
      status: "available",
      description: "Learn programming basics and fundamental concepts",
      topics: [
        { 
          id: 1, 
          title: "Variables & Data Types",
          status: "available",
          difficulty: "Easy",
          description: "Understanding basic programming constructs and how to store and manipulate data",
          problems: [
            {
              id: 1,
              title: "Variable Declaration Practice",
              description: "Create variables of different types and perform basic operations",
              difficulty: "Easy", 
              status: "not_started",
              isImportant: true,
              externalUrl: "https://codewars.com/kata/variable-practice"
            },
            { 
              id: 2, 
              title: "Type Conversion Challenge",
              description: "Convert between different data types and understand implicit vs explicit conversion",
              difficulty: "Easy", 
              status: "not_started",
              externalUrl: "https://leetcode.com/problems/type-conversion"
            }
          ],
          resources: [
            {
              id: 1,
              title: "Variables Explained",
              description: "Complete guide to variables and data types",
              isRequired: true,
              isImportant: true,
              url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types"
            },
            { 
              id: 2,
              title: "Data Types in Programming",
              description: "Visual explanation of primitive and complex data types",
              isRequired: true,
              url: "https://www.youtube.com/watch?v=example"
            },
            {
              id: 3,
              title: "Interactive Type Practice",
              description: "Hands-on exercises with immediate feedback",
              isRequired: false,
              url: "https://codewars.com/kata/variables-practice"
            }
          ]
        },
        {
          id: 2,
          title: "Control Flow",
          status: "available",
          difficulty: "Easy",
          description: "Master conditional statements, loops, and program flow control",
          problems: [
            {
              id: 4,
              title: "If-Else Logic Builder",
              description: "Create a program that makes decisions based on user input",
              difficulty: "Easy",
              status: "not_started",
              externalUrl: "https://codewars.com/kata/if-else-practice"
            },
            { 
              id: 5, 
              title: "Loop Patterns",
              description: "Implement different types of loops for various scenarios",
              difficulty: "Medium",
              status: "not_started",
              externalUrl: "https://hackerrank.com/challenges/loops-practice"
            },
            { 
              id: 6, 
              title: "Nested Control Structures",
              description: "Combine loops and conditionals to solve complex problems",
              difficulty: "Medium", 
              status: "not_started",
              externalUrl: "https://leetcode.com/problems/nested-loops"
            },
            { 
              id: 7, 
              title: "Control Flow Challenge",
              description: "Build a number guessing game using everything you've learned",
              difficulty: "Medium", 
              status: "not_started",
              externalUrl: "https://hackerrank.com/challenges/guessing-game"
            }
          ],
          resources: [
            {
              id: 4,
              title: "Conditional Statements Guide",
              description: "Comprehensive guide to if-else statements and switch cases",
              isRequired: true,
              url: "https://javascript.info/ifelse"
            },
            { 
              id: 5,
              title: "Loops Masterclass",
              description: "Everything you need to know about for, while, and do-while loops",
              isRequired: true,
              url: "https://www.youtube.com/watch?v=loops-example"
            },
            {
              id: 6,
              title: "Logic Building Exercises",
              description: "Step-by-step practice problems",
              isRequired: false,
              url: "https://codecademy.com/learn/logic-building"
            }
          ]
        },
        {
          id: 3,
          title: "Functions",
          status: "available",
          difficulty: "Medium",
          description: "Learn to write reusable code with functions, parameters, and return values",
          problems: [
            {
              id: 8,
              title: "Basic Function Creation",
              description: "Write functions with different parameter types and return values",
              difficulty: "Easy",
              status: "not_started",
              externalUrl: "https://codewars.com/kata/basic-functions"
            },
            { 
              id: 9, 
              title: "Function Scope Challenge",
              description: "Understand local vs global scope and variable accessibility",
              difficulty: "Medium", 
              status: "not_started",
              externalUrl: "https://leetcode.com/problems/function-scope"
            },
            { 
              id: 10, 
              title: "Higher-Order Functions",
              description: "Create functions that take other functions as parameters",
              difficulty: "Hard", 
              status: "not_started",
              externalUrl: "https://hackerrank.com/challenges/higher-order-functions"
            },
            { 
              id: 11, 
              title: "Calculator Project",
              description: "Build a calculator using functions for each operation",
              difficulty: "Medium", 
              status: "not_started",
              externalUrl: "https://freecodecamp.org/learn/calculator-project"
            }
          ],
          resources: [
            {
              id: 7,
              title: "Functions Fundamentals",
              description: "Complete guide to writing and using functions",
              isRequired: true,
              url: "https://javascript.info/function-basics"
            },
            { 
              id: 8,
              title: "Function Parameters Deep Dive",
              description: "Understanding parameters, arguments, and return values",
              isRequired: true,
              url: "https://www.youtube.com/watch?v=function-parameters"
            },
            {
              id: 9,
              title: "Scope and Closures",
              description: "Advanced concepts about variable scope",
              isRequired: false,
              url: "https://javascript.info/closures"
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Data Structures",
      status: "available", 
      description: "Essential data structures for organizing and manipulating data efficiently",
      topics: [
        {
          id: 4,
          title: "Arrays",
          status: "available",
          difficulty: "Easy",
          description: "Working with collections of data using arrays and lists",
          problems: [
            {
              id: 12,
              title: "Array Basics",
              description: "Create, access, and modify arrays",
              difficulty: "Easy",
              status: "not_started",
              externalUrl: "https://codewars.com/kata/array-basics"
            },
            { 
              id: 13, 
              title: "Array Searching",
              description: "Find elements in arrays using different methods",
              difficulty: "Easy",
              status: "not_started",
              externalUrl: "https://leetcode.com/problems/search-in-array"
            },
            { 
              id: 14, 
              title: "Two Pointer Technique",
              description: "Solve array problems using two pointers approach",
              difficulty: "Medium",
              status: "not_started",
              externalUrl: "https://leetcode.com/tag/two-pointers/"
            },
            { 
              id: 15, 
              title: "Array Manipulation Project",
              description: "Build a todo list application using arrays",
              difficulty: "Medium",
              status: "not_started",
              externalUrl: "https://freecodecamp.org/learn/todo-list-project"
            }
          ],
          resources: [
            {
              id: 10,
              title: "Array Operations Guide",
              description: "Comprehensive guide to array methods and operations",
              isRequired: true,
              url: "https://javascript.info/array"
            },
            {
              id: 11,
              title: "Array Algorithms Visualized",
              description: "Visual representation of common array algorithms",
              isRequired: true,
              url: "https://www.youtube.com/watch?v=array-algorithms"
            }
          ]
        },
        {
          id: 5,
          title: "Objects & Classes",
          status: "available",
          difficulty: "Medium",
          description: "Object-oriented programming concepts and data modeling",
          problems: [
            { 
              id: 16, 
              title: "Object Creation Practice",
              description: "Create objects with properties and methods",
              difficulty: "Easy",
              status: "not_started",
              externalUrl: "https://codewars.com/kata/object-creation"
            },
            {
              id: 17,
              title: "Class Design Challenge",
              description: "Design classes for a library management system",
              difficulty: "Medium",
              status: "not_started",
              externalUrl: "https://hackerrank.com/challenges/class-design"
            },
            {
              id: 18,
              title: "Inheritance Project",
              description: "Build an animal hierarchy using inheritance",
              difficulty: "Medium",
              status: "not_started",
              externalUrl: "https://freecodecamp.org/learn/inheritance-project"
            }
          ],
          resources: [
            {
              id: 12,
              title: "OOP Principles",
              description: "Object-oriented programming fundamentals",
              isRequired: true,
              url: "https://javascript.info/classes"
            },
            {
              id: 13,
              title: "Classes and Objects Tutorial",
              description: "Hands-on guide to creating and using classes",
              isRequired: true,
              url: "https://www.youtube.com/watch?v=classes-tutorial"
            }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Algorithms",
      status: "available",
      description: "Problem-solving with fundamental algorithms and optimization techniques",
      topics: [
        { 
          id: 6,
          title: "Searching Algorithms",
          status: "available",
          difficulty: "Medium",
          description: "Efficient methods for finding elements in data structures",
          problems: [
            { 
              id: 19, 
              title: "Linear Search Implementation",
              description: "Implement linear search from scratch",
              difficulty: "Easy",
              status: "not_started",
              externalUrl: "https://codewars.com/kata/linear-search"
            },
            { 
              id: 20, 
              title: "Binary Search Challenge",
              description: "Master binary search and its variations",
              difficulty: "Medium",
              status: "not_started",
              externalUrl: "https://leetcode.com/tag/binary-search/"
            },
            {
              id: 21,
              title: "Search Algorithm Comparison",
              description: "Compare performance of different search algorithms",
              difficulty: "Medium",
              status: "not_started",
              externalUrl: "https://hackerrank.com/challenges/search-comparison"
            }
          ],
          resources: [
            {
              id: 14,
              title: "Search Algorithms Explained",
              description: "Comprehensive guide to search algorithms",
              isRequired: true,
              url: "https://geeksforgeeks.org/searching-algorithms"
            },
            {
              id: 15,
              title: "Binary Search Visualization",
              description: "Visual explanation of binary search algorithm",
              isRequired: true,
              url: "https://www.youtube.com/watch?v=binary-search-visual"
            }
          ]
        }
      ]
    }
  ]
}

// Enhanced helper functions
export const getTopicProgress = (topic: any, menteeProgress?: any) => {
  if (!menteeProgress?.topicProgress[topic.id]) return 0
  
  const topicProg = menteeProgress.topicProgress[topic.id]
  const totalProblems = topic.problems.length
  const completedProblems = Object.values(topicProg.problemProgress || {}).filter(
    (p: any) => p.status === 'completed'
  ).length
  
  return Math.round((completedProblems / totalProblems) * 100)
}

export const getPhaseProgress = (phase: any, menteeProgress?: any) => {
  if (!menteeProgress) return 0
  
  const totalProgress = phase.topics.reduce((sum: number, topic: any) => {
    return sum + getTopicProgress(topic, menteeProgress)
  }, 0)
  
  return Math.round(totalProgress / phase.topics.length)
}

export const getNextAvailableProblem = (template: RoadmapTemplate, menteeProgress?: any) => {
  for (const phase of template.phases) {
    for (const topic of phase.topics) {
      for (const problem of topic.problems) {
        const topicProgress = menteeProgress?.topicProgress[topic.id]
        const problemStatus = topicProgress?.problemProgress[problem.id]?.status || 'not_started'
        if (problemStatus === 'not_started' || problemStatus === 'in_progress') {
          return { phase, topic, problem }
        }
      }
    }
  }
  return null
} 