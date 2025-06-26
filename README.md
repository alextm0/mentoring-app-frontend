# MentorHub - Mentorship Platform Frontend Demo

A modern, interactive web demo showcasing a comprehensive coding mentorship platform built with Next.js 14, TypeScript, and Tailwind CSS.

## 🎯 Overview

This frontend demo demonstrates the core mentor-mentee experience with a polished, gamified interface designed for Gen-Z learners and efficient mentor management. The application features role-based dashboards, roadmap planning, task management, and progress tracking.

## ✨ Features

### 🧑‍🏫 Mentor Dashboard
- **Overview**: Quick stats, upcoming sessions, pending feedback
- **Mentee Management**: Roster view with progress tracking
- **Assignment System**: Create, assign, and review submissions
- **Session Scheduler**: Calendar integration with automated reminders
- **Resource Manager**: Curated learning materials library
- **Roadmap Planner**: Visual drag-and-drop curriculum builder
- **Practice Problems**: Code challenge management
- **Real-time Notifications**: Assignment submissions, session reminders

### 🎓 Mentee Dashboard
- **Gamified Progress**: XP system, levels, badges, streak tracking
- **Task Management**: Assignment cards with progress indicators
- **Next Session**: Upcoming mentorship session display
- **Achievement System**: Badge collection and milestone tracking
- **Weekly Goals**: Progress visualization and motivation
- **Resource Access**: Learning materials and documentation
- **Interactive Feedback**: Confetti animations and toast notifications

### 🎨 Design Features
- **Modern UI**: Clean, accessible design with neon accents
- **Dark/Light Mode**: System-aware theme switching
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Micro-animations**: Framer Motion powered interactions
- **Accessibility**: WCAG AA compliance with keyboard navigation
- **Performance**: Optimized components and animations

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui component library
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast
- **Theme**: next-themes for dark mode support

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd mentoring-platform
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
mentoring-platform/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and theme variables
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx          # Landing page with role selection
│   ├── mentor/           # Mentor dashboard routes
│   └── mentee/           # Mentee dashboard routes
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui base components
│   ├── mentor/          # Mentor-specific components
│   ├── mentee/          # Mentee-specific components
│   └── theme-provider.tsx
├── lib/                 # Utilities and mock data
│   ├── utils.ts         # Utility functions
│   └── mock-data.ts     # Static demo data
└── public/             # Static assets
```

## 🔄 Demo Flow

### 1. Landing Page
- Clean role selection interface
- Quick access to mentor or mentee dashboards
- Feature highlights and branding

### 2. Mentor Experience
- **Overview**: Dashboard with key metrics and actions
- **Mentee Management**: Track multiple students' progress
- **Roadmap Builder**: Visual curriculum planning tool
- **Assignment System**: Create and review coding tasks
- **Session Management**: Schedule and track meetings

### 3. Mentee Experience
- **Gamified Dashboard**: XP, levels, and achievement tracking
- **Task Board**: Interactive assignment management
- **Progress Visualization**: Weekly goals and streak tracking
- **Next Steps**: Clear direction for continued learning

## 🎮 Interactive Features

### Gamification
- **XP System**: Points for completed tasks and achievements
- **Level Progression**: Visual advancement with unlock mechanics
- **Badge Collection**: Achievement system with categories
- **Streak Tracking**: Daily activity motivation
- **Weekly Goals**: Customizable targets with progress bars

### Animations
- **Micro-interactions**: Hover effects and state transitions
- **Progress Animations**: Animated progress bars and counters
- **Confetti Effects**: Celebration animations for achievements
- **Smooth Transitions**: Page and component state changes
- **Loading States**: Skeleton loaders and shimmer effects

### Responsive Design
- **Mobile Navigation**: Collapsible menu with touch-friendly controls
- **Tablet Layout**: Optimized grid systems and spacing
- **Desktop Experience**: Multi-column layouts with sidebar navigation
- **Accessibility**: Keyboard navigation and screen reader support

## 📊 Mock Data

The demo includes comprehensive mock data covering:
- User profiles (mentors and mentees)
- Assignment and submission data
- Session scheduling information
- Progress tracking metrics
- Notification system
- Achievement and badge data
- Resource libraries

## 🎨 Theming

### Color System
- **Primary**: Neon green accent (#059669)
- **Background**: Dark/light adaptive
- **Text**: High contrast for accessibility
- **Borders**: Subtle neon glows and gradients

### Typography
- **Font**: Inter for clean readability
- **Scale**: Responsive type system
- **Hierarchy**: Clear information architecture

## 🔧 Customization

### Adding New Features
1. Create component in appropriate directory
2. Add route in app directory if needed
3. Update navigation components
4. Add mock data to `lib/mock-data.ts`
5. Update types and interfaces

### Styling Changes
- Modify theme variables in `app/globals.css`
- Update component classes using Tailwind
- Customize shadcn/ui components as needed

## 📱 Mobile Experience

The application is fully responsive with:
- Touch-optimized interface elements
- Swipe gestures for navigation
- Optimized typography and spacing
- Collapsible navigation menus
- Fast loading and smooth scrolling

## 🎯 Future Enhancements

For a production version, consider adding:
- Real authentication system
- Database integration
- API endpoints
- Payment processing
- Video conferencing
- File upload capabilities
- Advanced analytics
- Email notifications
- Mobile app version

## 📄 License

This is a demo project. Check with the project owner for licensing details.

## 🤝 Contributing

This is a frontend demo project. For contributions:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For questions about this demo:
- Review the `requirements.md` file
- Check component documentation
- Examine mock data structure in `lib/mock-data.ts`

---

**Built with ❤️ for the coding education community** 