# User Stories

## Mentor User Stories – MVP Set

### B-1 Problem & Resource Banks
**User story**  
As a mentor, I can add coding problems and learning resources to a personal bank so I can reuse them later.

**Acceptance criteria**  
- “Add Problem” and “Add Resource” buttons open a form (title, description/URL, tag).  
- Clicking **Save** stores the item and shows it in the bank list.  
- Bank list is searchable by keyword.

---

### A-1 Create Assignment from Bank
**User story**  
As a mentor, I can create an assignment by selecting a problem (and optional resources) from the bank, or by adding a new one on the spot and saving it.

**Acceptance criteria**  
- “New Assignment” flow lets the mentor choose an existing problem **or** enter a new one.  
- Mentor can tick 0-n resources to attach.  
- Assignment appears in the mentee’s **Active Assignments** list.

---

### S-1 Session Scheduling
**User story**  
As a mentor, I can pick a date and time for a mentee session so we both know when to meet next.

**Acceptance criteria**  
- Creates a mentoring session record linked to mentor & mentee.  
- Session appears in the upcoming-sessions list / calendar for both users.  

---

### M-1 Mentee List & Profiles
**User story**  
As a mentor, I can see a list of my mentees with their name, email, current XP, and next-session date so I have a quick overview.

**Acceptance criteria**  
- API returns the four required fields.    
- Clicking a row opens the mentee’s profile page.

---

### R-1 Code Review & Mark Solved
**User story**  
As a mentor, I can open a mentee’s code submission, leave inline comments, and mark the assignment “Solved” so the mentee gets actionable feedback.

**Acceptance criteria**  
- Diff viewer shows code with line numbers.  
- Mentor comments save instantly.  
- “Mark Solved” button sets assignment status to **REVIEWED** and triggers XP grant.
