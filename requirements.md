# Mentorship Platform – Front‑End Demo **High‑Level Requirements**

> **Objective:** Deliver a polished, interactive **web demo** that proves the core mentor‑mentee experience without a real back‑end.  
> The demo must clearly communicate the product vision to stakeholders and future developers.

---

## 1. Mission Statement  
Create a modern, motivational interface where **mentors plan and track** their students’ journeys, and **mentees stay engaged** with clear tasks, gamified progress, and an inviting Gen‑Z‑friendly design.

---

## 2. Core Problems to Solve

| # | Current Pain Point | Demo Solution |
|---|--------------------|---------------|
| 1 | Mentors lack reusable, structured plans. | Visual **Roadmap** builder & drag‑and‑drop topic cards. |
| 2 | Students don’t know “what’s next.” | **Mentee dashboard** highlights next session + task list. |
| 3 | Motivation drops quickly (short attention spans). | XP bar, streak counter, micro‑animations for positive feedback. |
| 4 | Mentors juggle many students & forget details. | Dashboard shows sessions timeline, pending reviews, per‑student quick cards. |

---

## 3. Primary Personas & Non‑Negotiable MVP Features

### Mentor (role = organiser, reviewer)
- **Dashboard Overview** – upcoming sessions, tasks awaiting review.
- **Roadmap / Curriculum Builder** – create & reorder topics for each mentee.
- **Task Assignment** – title, description, due date, optional resource link.
- **Feedback Modal** – comment & mark submission “Reviewed”.
- **Session Scheduler** – calendar with automated reminder badges.

### Mentee (role = learner, engager)
- **Home Dashboard** – next session card, to‑do list, points & streak display.
- **Task Cards** – open, submit link/file, mark done.
- **Gamification Layer** – XP points, level progress bar, latest badge banner.
- **Resource Viewer** – list of links/files attached to tasks or roadmap topics.
- **Notifications** – gentle reminders for upcoming sessions & due tasks.

*(All data is static/mock in the demo; flows must **feel** live.)*

---

## 4. UX & Design Principles

| Principle | Implementation Cue |
|-----------|--------------------|
| **Clarity First** | Large “Next Session” banner, colour‑coded status pills. |
| **Gameful Feedback** | Instant XP toast & confetti on task completion. |
| **Mobile‑Priority** | Layout adapts gracefully to ≤640 px screens. |
| **Consistency** | Use v0.dev design tokens for colours, spacing, typography. |
| **Accessibility** | WCAG AA contrast, keyboard focus rings, alt‑text on icons. |

---

## 5. Tech & Libraries (demo scope)

- **Framework:** Next.js 14 (App Router, React 18).
- **Styling:** Tailwind CSS tokens + dark mode toggle.
- **Component Kits:**  
  - **shadcn/ui** – foundational forms, cards, navigation.  
  - **Tailark** – data tables & badge lists.  
  - **Skiper UI** – Kanban drag‑drop for tasks.  
  - **Acernity UI** – charts & progress bars.
- **Animation:** Framer Motion for micro‑interactions.
- **Mock Data:** Hard‑coded JSON; state kept in React Context.
- **No Auth / No API Calls** – role toggle on landing page to switch perspectives.

---

## 6. Out‑of‑Scope (for this demo)

1. Real authentication & multi‑tenant security.  
2. Persistent database or API integration.  
3. Payment flows.  
4. Detailed analytics dashboards.  

These can be layered once stakeholder feedback validates the UI.

---

## 7. Definition of “Demo Done”

- Mentor and Mentee dashboards fully navigable via menu or deep‑links.
- All interactive elements respond with believable UI changes (mocked).
- Mobile & desktop views pass basic Lighthouse A11y & Perf ≥90.
- Deployed to Vercel preview for click‑through demo.

---

*Drafted Jun 25 2025 – keep this document in `/requirements.md` as the single source of truth for the front‑end demo.*