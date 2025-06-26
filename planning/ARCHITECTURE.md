# 🚀 Mentoring Platform - Simple Startup Architecture

## Overview
**Tiny startup mode** - Clean, simple Next.js 15 structure ready for **Spring Boot backend integration**.

## 🎯 Startup Philosophy
- **MVP-first**: Build fast, iterate quickly
- **No over-engineering**: Add complexity only when needed
- **Simple structure**: Easy to understand and maintain
- **Backend-ready**: Smooth Spring Boot integration

## 📁 Simple Folder Structure

```
mentoring-platform/
├── src/                     # Source code directory
│   ├── app/                 # Next.js 15 App Router
│   │   ├── (dashboard)/     # Route group for authenticated routes
│   │   │   ├── layout.tsx   # Shared dashboard layout
│   │   │   ├── mentor/      # Mentor routes
│   │   │   └── mentee/      # Mentee routes
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/          # UI components
│   │   ├── shared/          # Cross-role components
│   │   ├── mentor/          # Mentor-specific components
│   │   ├── mentee/          # Mentee-specific components
│   │   └── ui/              # Base UI components (shadcn/ui)
│   ├── hooks/               # UI hooks only
│   │   ├── use-api.ts       # Simple API state hook
│   │   └── use-mobile.tsx   # Mobile detection
│   ├── services/            # ALL backend calls
│   │   ├── api.ts           # Simple HTTP client
│   │   ├── endpoints.ts     # API endpoints
│   │   ├── mentor.ts        # Mentor service
│   │   └── mentee.ts        # Mentee service
│   ├── config/              # Environment & constants
│   │   └── env.ts           # Simple config
│   ├── lib/                 # Pure helpers (no I/O)
│   │   ├── utils.ts         # Utilities
│   │   ├── mock-data.ts     # Development data
│   │   └── roadmap-data.ts  # Static roadmap data
│   └── types/               # TypeScript types
│       └── index.ts         # All shared types
├── public/                  # Static assets
├── styles/                  # Global styles
└── package.json             # Dependencies
```

## 🔧 Simple API Integration

### **HTTP Client** (`services/api.ts`)
```typescript
// Simple client - no over-engineering
export const api = new ApiClient()

// Usage
const response = await api.get<Mentor>('/mentors/1')
```

### **Service Layer** (`services/mentor.ts`)
```typescript
// One service per backend resource
export const mentorService = {
  async getProfile(id: number) {
    return api.get<Mentor>(endpoints.mentor(id))
  },
  // ... other mentor calls
}
```

### **Simple Hook** (`hooks/use-api.ts`)
```typescript
// UI state only - keep it simple
const { data, loading, error } = useApi(() => mentorService.getProfile(1))
```

## 🎯 Startup Rules

### **When to Add Complexity**
- **Services**: Split `services/mentee/` when file > 200 lines
- **Global State**: Add store only after 3+ unrelated contexts
- **Barrel Files**: Add `index.ts` only when imports feel noisy

### **Weekly Cleanup** 
Every Friday run:
```bash
npm run lint && npm run test
# Delete unused files - dead code is the real over-engineering
```

## 🔄 Backend Integration (When Ready)

**Replace mock data in 3 steps:**

1. **Update service calls**:
   ```typescript
   // From mock
   return getCurrentMentor()
   
   // To API
   return mentorService.getProfile(id)
   ```

2. **Add loading states**:
   ```typescript
   const { data: mentor, loading, error } = useApi(
     () => mentorService.getProfile(mentorId)
   )
   ```

3. **Handle errors**:
   ```typescript
   if (error) return <div>Error: {error}</div>
   if (loading) return <div>Loading...</div>
   ```

## 🎯 Key Benefits

✅ **Fast Development** - No over-engineered abstractions  
✅ **Easy Backend Integration** - Clean service layer  
✅ **Type Safety** - Simple TypeScript setup  
✅ **Maintainable** - Clear, intuitive structure  
✅ **Scalable** - Add complexity only when needed  

## 🚀 Current Status

**MVP-ready frontend** with:
- ✅ Clean routing structure
- ✅ Simple API layer ready for Spring Boot
- ✅ Shared components and layouts
- ✅ Type-safe development
- ✅ No over-engineering

**Ready for backend integration** with minimal code changes!

---

*Remember: Stay in "tiny startup mode" - build fast, iterate quickly, add complexity only when you hit real pain points.* 