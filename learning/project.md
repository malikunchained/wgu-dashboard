# Project: WGU CS Course Tracker

## About me

- Complete beginner. This is my first real project to own and understand.
- The app was built entirely by Claude Code — I have not written any of the code myself and can't yet explain what any of it does. That's the starting point, not a problem.
- What I want to learn, in priority order:
  1. **git** — version control from scratch (there is no git here yet).
  2. **How web apps work** — the browser, HTML/CSS/JS, how the pieces talk to each other.
  3. Some **HTML syntax** along the way.

## The idea

A course-tracking dashboard for people planning to start a **WGU B.S. Computer Science** degree in 2026. It lists every course in the 2026 degree plan (39 courses), shows which ones can be transferred in via the Sophia and Study.com pathways, and lets you track your own progress through the program.

The intended edge over a spreadsheet:
- All transfer-credit equivalents in one place.
- Per-course links to a Reddit thread where someone who finished that course wrote up how they did it — so if you're stuck, help is one click away.
- Progress tracking granular enough to update **daily**, so the app stays part of your routine.

## MVP

### In (built, working)
- 39-course 2026 degree plan in `courses.js` (older 2024 courses already removed).
- Courses grouped by category (General Education, Core, Additional, Program Specific).
- Per-course status: Not started / In progress / Done, saved to this device via `localStorage`.
- Search box (course name, ID, or transfer course).
- Filter by status and by transfer source (Sophia / Study.com / Non-transferable).
- Hero stats: total courses, total units, done, in progress.

### In (MVP, not yet built — these drive the forward plan)
- **Reddit thread link per course.**
- **Granular progress**: per-course module/unit breakdown with clickable checkboxes and a progress bar for the course you're working on, replacing the coarse 3-state status.
- **Cleaner filter UI** — current one is functional but rough.

### Frozen (in the repo, not being worked on)
- None. Everything built so far is in scope.

### Parking lot (ideas for later, not MVP)
- Deploying the site online so other people can use it (open question — revisit in planning).

## Triage decision: ADOPT

Reasoning:
- The app **runs today** — it's a static site, opens straight in a browser, no build step.
- The stack is the most standard, boring, well-documented choice possible (plain HTML/CSS/JS). Learning on it means learning transferable fundamentals, not quirks.
- The MVP is mostly built; the gaps are additive features and refinements, not a pile of broken half-features. Nothing needs trimming.
- It maps cleanly onto the stated learning goals: git (add it), how web apps work (this is a whole small web app), HTML syntax (one hand-written HTML file to walk).

No trim, no rebuild. We map it, plan forward, and reclaim understanding as we build.
