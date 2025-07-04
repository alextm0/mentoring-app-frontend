
# 🎯 MVP Feature Backlog — Competitive‑Programming Mentoring Platform  

> **Mission**: Deliver a lean, demo‑ready app that proves the mentor → task → *code review* → feedback loop and a Gen‑Z‑friendly motivation layer — all with in‑memory data.

---

## TODOs

### Both dashboards
[ ] Create a banger main page with screenshots from dashboards
[ ] Improve 'Roadmap' page for simplicity and simple user experience
[ ] Work on creating a specific color scheme for design consistency
[✅] Simplify 'Code Review' pages for my website (no running code and storing results yet for MVP) -> Just a code editor and with comments from mentor for feedback
[ ] Refactor the components so that they are built in a clean way for ease of use later on

### Mentor Dashboard
[ ] Improve Mentee card from 'My Mentees' page
[ ] Remove tooltip circle for fast creation for MVP

### Mentee Dashboard 

## Cool UI components
- Code editor with code completition: https://21st.dev/bankkroll/code-editor-sheet/default
- Loader: https://21st.dev/paceui/dot-loader/default
- Cool gradient buttons: https://21st.dev/serafimcloud/gradient-button/default
- Square background pattern : https://21st.dev/davidhzdev/squares-background/default
- Cool feature section: https://21st.dev/meschacirung/features-8/default
- Auth component: https://21st.dev/bankkroll/auth-form-1/default

## 📌 Core Pillars (MUST ship)

1. **Session Management**  
2. **Problem Assignment & Tracking**  
3. **Learning Roadmap**  
4. **Lightweight Code Review**  ← *(new simplified)*  
5. **Minimal Progress / XP System**  

---

## ✅ KEEP — No Further Cuts

| Component / File | Why It Stays |
|------------------|-------------|
| `mentor/mentor-overview.tsx` | Daily control‑tower (sessions + pending reviews). |
| `mentor/mentees-list.tsx` | Multi‑student visibility in one glance. |
| `mentor/navigation.tsx` | Core nav between mentor screens. |
| `mentor/assignments-list.tsx` *(simplified)* | CRUD of tasks; the heart of the workflow. |
| `mentor/roadmap-planner.tsx` *(simplified)* | Shows learning plan per mentee. |
| `mentor/code-review-simple.tsx` | **New lightweight reviewer** – read‑only code block, comment box, “Mark Reviewed”. |
| `mentee/mentee-overview.tsx` | Student’s home (tasks, XP bar, next session). |
| `mentee/mentee-assignments.tsx` *(simplified)* | Task list & submission action (paste link / code). |
| `mentee/mentee-roadmap.tsx` | Visual path of algorithm topics. |
| `mentee/mentee-sessions.tsx` *(simplified)* | Upcoming & past sessions list. |
| `mentee/motivation-row.tsx` | XP bar + small gamification widgets. |
| `notifications-panel.tsx` | Reminders for due tasks & sessions. |
| `roadmap/*` (phase-timeline, topic-orb, utils) | Core visual differentiator. |
| Global toast / XP utilities | Immediate feedback loop. |

---

## 🔄 SIMPLIFY (Target Line Counts)

| File | Now → Goal | Simplification Notes |
|------|------------|----------------------|
| `mentor/assignments-list.tsx` | 852 → ≈300 | Table rows only: task, mentee, due, status. |
| `mentee/mentee-assignments.tsx` | 587 → ≈250 | Drop Kanban; simple list + submit drawer. |
| `mentee/mentee-sessions.tsx` | 436 → ≈200 | Read‑only list; no reschedule logic. |
| `mentor/roadmap-planner.tsx` | 444 → ≈300 | Up/Down buttons instead of drag‑drop. |
| `mentor/code-review-simple.tsx` | – → **≤200** | Use `react-syntax-highlighter`; global textarea comment + “Reviewed” toggle. |

---

## ❌ REMOVE / ARCHIVE for Post‑MVP

- Advanced analytics (`analytics-snapshot.tsx`)  
- Full inline diff viewer (`code-review-detail.tsx`, multi-line comments)  
- Complex scheduling (`session-scheduler.tsx`)  
- Practice-problem manager, resource libraries  
- Kanban board (`task-board.tsx`), badge systems, leaderboards  
- Payment, invoices, CSV export, third‑party integrations

---

## 🚀 Vertical Slice Acceptance Test

> **Scenario:** Mentor assigns “Climbing Stairs” → mentee pastes code → mentor opens **simple code-review**, comments, marks reviewed → mentee gains XP.

- ✅ Mentor dashboard shows task in **Pending Reviews**.  
- ✅ Code appears in read‑only block; mentor comment saved, status flips to “Reviewed”.  
- ✅ Mentee dashboard XP bar jumps +10 on submit, +20 on review.  
- ✅ Notifications log “Task reviewed by Mentor”.  
- ✅ Roadmap topic auto-marks *Complete* when all tasks under it are reviewed.

---

*Last Edited : 25 Jun 2025 — This is now the authoritative backlog for the demo MVP.*
