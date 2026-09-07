# File Map — WGU CS Course Tracker

Every file on disk, with an honest label. Statuses:

- **known** — the learner explained this in conversation, in their own words.
- **parked** — not yet understood; a lesson is already scheduled for it. Not a failure — a to-do.
- **generated** — machine-made, never hand-edited, always rebuildable.

This map is parked-heavy on purpose. Every parked line is a lesson we've already planned, not a gap we're hiding.

---

## Root: `D:\wgu-dashboard\wgu-dashboard\`

No `package.json`, no build step, no `node_modules/`. Four source files, the `learning/` folder, and a `.git/` folder as of Section 1.

### `.git/` — generated
Git's history store, created by `git init`. Hidden (`ls -a` to see it). Never edit by hand; every git command reads and writes here. Delete it and you lose all commit history but none of your actual files. → [[git-basics]]

### `README.md` — known
Learner-authored (Section 1). The project's front page: what the app is, who it's for, how to run it, and what's planned next. Written in Markdown, which GitHub renders as a web page. → [[readme]] [[markdown]]

### `.gitignore` — known
Learner-authored (Section 1). A list of file patterns git should never track: OS junk (`.DS_Store`, `Thumbs.db`), editor folders (`.vscode/`, `.idea/`). Insurance for now — the project has none of these yet. Secrets and generated files get added here as they appear. → [[git-basics]]

### `index.html` — parked (partly known)
The skeleton of the page: defines what elements exist (dark header, search box, filter button groups, empty containers, footer) and loads the other three files. The browser opens this first.
- **known**: it's the structure; it holds mostly empty containers that JS fills; it links the other files together (lines 10, 63, 64).
- **parked**: HTML syntax itself — tags, attributes, nesting, `id` vs `class`, `data-*` attributes, semantic elements (`<header>`, `<main>`, `<section>`), accessibility attributes (`aria-label`, `role`). → [[html-structure]] [[html-attributes]]
- Empty containers `#heroStats`, `#courseSections`, `#emptyState` are populated by `app.js` at runtime. → [[dom-manipulation]]

### `courses.js` — parked (partly known)
The app's data: a single hard-coded array `COURSES` (39 entries). Each entry is an object with `id`, `name`, `units`, `sophia`, `study`, `certs`, `category`.
- **known**: it's the data store ("like a database"); `app.js` reads from it to fill the cards.
- **parked**: JavaScript objects and arrays as data structures; `const`; why this is a plain file and not a real database; the tradeoffs of hard-coded data (easy to read, must edit code to change). → [[js-data-structures]] [[data-vs-database]]
- This is the file that will grow a `reddit` field per course, and a module/unit breakdown. → planned work.

### `app.js` — parked (mechanics partly known)
All the behavior. Wrapped in `(function () { ... })();` — an IIFE (immediately-invoked function expression) that runs once and keeps its variables private.
- **known** (from probes): `app.js` builds the course-card HTML and injects it into the empty `#courseSections` div; `render()` rebuilds all cards from current data + filters; changing a status re-runs `render()` so filtered views stay correct; `localStorage` persistence lives in the browser on one machine, not in `render()` and not on a server.
- **parked**, section by section:
  - `STORAGE_KEY`, `CATEGORY_ORDER`, `CATEGORY_CLASS`, `STATUS_LABEL` (lines 4–16) — module-level constants and lookup objects. → [[js-constants-lookups]]
  - `state` object (lines 18–23) — the app's in-memory memory: current status map, search text, active filter `Set`s. → [[app-state]]
  - `loadStatus` / `saveStatus` / `getStatus` / `setStatus` (lines 25–49) — reading and writing `localStorage`, JSON serialization, `try/catch`. → [[localstorage]] [[json]] [[error-handling-trycatch]]
  - `matchesFilters` (lines 51–72) — the filter logic: how search + status + transfer filters combine (AND across groups, OR within a group). → [[filtering-logic]] [[js-set]]
  - `renderHeroStats` (lines 74–97) — computes totals with `reduce` / `filter`, builds HTML with `.map().join("")`. → [[array-methods]] [[template-literals]]
  - `courseCard` (lines 99–147) — builds one card's HTML string from a course object; conditional (`? :`) chunks for badges/transfer rows. → [[template-literals]] [[conditional-rendering]]
  - `render` (lines 149–179) — the main draw: loop categories, filter, build sections, set `innerHTML`, toggle the empty state. → [[dom-manipulation]] [[render-loop]]
  - `escapeHtml` / `escapeAttr` (lines 181–186) — turning `<`, `>`, `&`, `"` into safe text so course data can't inject markup. → [[html-escaping]] [[xss-basics]]
  - `setupSegmented` / `updateSegmentedUI` (lines 193–219) — wiring the filter button groups: one click listener per group (event delegation), toggling a `Set`, syncing the "is-active" styling. → [[event-listeners]] [[event-delegation]]
  - search input listener (lines 221–224), reset button (lines 229–237), status-select `change` listener (lines 239–248) — the rest of the event wiring. → [[event-listeners]]
  - init block (lines 251–252) — the two calls that draw the page on first load.

### `styles.css` — parked
All visual styling. Uses CSS custom properties (`--bg`, `--ink`, category colors, radii, fonts) defined in `:root`, then rules for the hero, controls, category sections, course grid (CSS Grid), course cards, badges, responsive `@media` blocks.
- **known**: it styles elements that already exist; it cannot create cards.
- **parked**: CSS selectors, the box model, custom properties (variables), Flexbox, Grid, `@media` queries, `clamp()`, attribute selectors like `[data-status="done"]`. → [[css-selectors]] [[css-custom-properties]] [[css-layout-flex-grid]] [[responsive-design]]

### `learning/` — known
The learning method's own files, not application code:
- `project.md` — triage decision + goals
- `file-map.md` — this file
- `knowledge-graph.md` — concept tracker
- `plan.md` — the 7-section build plan, with Section 1 broken into tasks
- `environment.md` — records that commands are written for Git Bash on Windows

---

## Missing from the project (absence is curriculum too)

- **git** — no version control at all. Nothing is committed; a bad edit can't be undone. → [[git-basics]] — Section 1 of the plan.
- **A README** — nothing explains the project to a newcomer (or to future you). → [[readme]]
- **Tests** — no automated checks; every verification is manual in the browser. → [[testing-basics]] (later, when it turns load-bearing)
- **Deployment** — the site only exists as files on your D: drive; no one else can open it. → [[deployment-static-site]] (parking lot / later)
- **A way to edit data without touching code** — course data lives in a `.js` file; changing it means editing JavaScript. Acceptable for now; worth knowing it's a choice.
