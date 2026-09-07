# Knowledge Graph — WGU CS Course Tracker

One entry per concept this codebase embodies (or is missing). Statuses:

- **seed** — identified, not yet taught.
- **introduced** — explained once, in conversation; learner followed the explanation.
- **practicing** — learner has used it in a change, with help.
- **understood** — learner explained it in their own words AND used it independently; evidence recorded.

Statuses move on demonstrated evidence only, never self-report. Date format: YYYY-MM-DD.

---

## Web app fundamentals

### separation-of-concerns
- status: introduced
- date: 2026-09-07
- evidence: In probes, learner correctly assigned data→courses.js, style→styles.css, behavior→app.js; index.html (structure) filled in by me.
- note: The mental model that HTML = structure, CSS = looks, JS = behavior, and a data file = content.

### how-the-browser-loads-a-page
- status: introduced
- date: 2026-09-07
- last-reviewed: 2026-09-07
- depends-on: separation-of-concerns
- evidence: Opened index.html directly, read the `file:///D:/...` address, and confirmed the app fully works with no server. Followed the explanation that an `https://` URL implies a server; hasn't seen the server side yet.
- note: Browser opens index.html first; `<link>` and `<script>` tags pull in the rest; script order matters. `file://` = read from disk, no server; `http(s)://` = a server hands out the files.

### dom-manipulation
- status: introduced
- date: 2026-09-07
- depends-on: separation-of-concerns
- evidence: Learner understood after probe 2 that app.js (not CSS) builds card HTML and injects it into the empty #courseSections div; restated the data→build→style flow.

### render-loop
- status: introduced
- date: 2026-09-07
- depends-on: dom-manipulation
- evidence: Probe 4 — learner explained that changing one status re-runs render() so filtered views stay correct ("it would still be sorted by the previous Not started value").

### app-state
- status: seed
- depends-on: dom-manipulation
- note: The `state` object as the single in-memory source of truth that render() reads from.

---

## HTML

### html-structure
- status: seed
- note: Tags, nesting, semantic elements (`<header>`, `<main>`, `<section>`, `<footer>`), `id` vs `class`.

### html-attributes
- status: introduced
- date: 2026-09-07
- depends-on: html-structure
- evidence: Probe 5 — learner did not get the reason for `data-value` (guessed type-safety), but followed the explanation of code-name vs display-name and matching stored data. Partial; revisit when building checkboxes.

### html-forms-and-inputs
- status: seed
- depends-on: html-structure
- note: `<input>`, `<select>`/`<option>`, `<button>`, `<label>`, `for`/`id` pairing. Needed for the checkbox + progress feature.

### accessibility-basics
- status: seed
- depends-on: html-structure
- note: `aria-label`, `role`, `:focus-visible` — already used in the code, not yet understood.

---

## CSS

### css-selectors
- status: seed
- note: Class, id, element, attribute selectors (`[data-status="done"]`), descendant selectors.

### css-box-model
- status: seed
- note: margin / border / padding / content; `box-sizing: border-box`.

### css-custom-properties
- status: seed
- depends-on: css-selectors
- note: The `--name` variables in `:root`, reused via `var(--name)`.

### css-layout-flex-grid
- status: seed
- depends-on: css-box-model
- note: Flexbox (the controls bar, card internals) and Grid (the course grid, `auto-fill minmax`).

### responsive-design
- status: seed
- depends-on: css-layout-flex-grid
- note: `@media` queries, `clamp()`, `prefers-reduced-motion`.

---

## JavaScript

### js-variables-const-let
- status: seed
- note: `const` vs `let`, scope, why `app.js` wraps everything in an IIFE to keep variables private.

### js-data-structures
- status: introduced
- date: 2026-09-07
- evidence: Learner described courses.js as "a database where all the courses and information is stored" — correct intuition for an array of objects; formal treatment pending.
- note: Arrays, objects, array-of-objects as the shape of `COURSES`.

### js-functions
- status: seed
- note: Declaring, calling, parameters, return values; the many small named functions in app.js.

### array-methods
- status: seed
- depends-on: js-data-structures, js-functions
- note: `.map()`, `.filter()`, `.reduce()`, `.join()` — used throughout render and stats.

### template-literals
- status: seed
- depends-on: js-functions
- note: Backtick strings with `${...}` — how every card's HTML is assembled.

### conditional-rendering
- status: seed
- depends-on: template-literals
- note: `? :` and `&&` inside template literals to include/skip chunks of HTML.

### event-listeners
- status: seed
- depends-on: dom-manipulation
- note: `addEventListener`, the event object, `"click"` / `"input"` / `"change"`.

### event-delegation
- status: seed
- depends-on: event-listeners
- note: One listener on a parent, `e.target.closest(...)` — how the filter groups and status dropdowns are wired.

### js-set
- status: seed
- depends-on: js-data-structures
- note: `Set` for active filters; `.has()` / `.add()` / `.delete()`.

### filtering-logic
- status: seed
- depends-on: js-set, array-methods
- evidence: Learner has good intuition here already (probe 4) but hasn't seen matchesFilters().
- note: How search + status + transfer combine — AND across groups, OR within.

### localstorage
- status: introduced
- date: 2026-09-07
- depends-on: js-data-structures
- evidence: Probe 3 — learner initially placed persistence "in render()"; after explanation understood it's a per-browser, per-machine storage box, empty on a different computer.

### json
- status: seed
- depends-on: js-data-structures, localstorage
- note: `JSON.stringify` / `JSON.parse` — localStorage only stores text.

### error-handling-trycatch
- status: seed
- depends-on: js-functions
- note: The `try/catch` around localStorage and JSON parsing.

### html-escaping
- status: seed
- depends-on: template-literals
- note: `escapeHtml` / `escapeAttr` — why raw data in HTML strings is dangerous.

### xss-basics
- status: seed
- depends-on: html-escaping
- note: What could go wrong without escaping; low stakes here (data is your own) but a real concept.

---

## Engineering practices (mostly missing — absence is curriculum)

### git-basics
- status: introduced
- date: 2026-09-07
- last-reviewed: 2026-09-07
- evidence: Ran `git init` (predicted correctly that no files would change, only `.git` added). Read `git status`, explained "untracked" as git not watching the files, and predicted correctly that git can't diff an untracked file because it has no baseline snapshot. Wrote a `.gitignore`; after the `touch Thumbs.db` test, saw that an ignored file is invisible to git, not "listed but ignored". Explained that a secret committed to a public repo is exposed, and (with prompting) that removing it later doesn't clear history.
- note: `init`, `status`, `.gitignore` covered. Still to do: `add`, `commit`, `log`, writing messages (tasks 4–5). Learner's #1 goal.

### git-branching
- status: seed
- depends-on: git-basics
- note: Branches, merging — introduced once the commit habit is solid.

### github-remote
- status: seed
- depends-on: git-basics
- note: Pushing to a remote, what GitHub adds on top of git.

### readme
- status: practicing
- date: 2026-09-07
- last-reviewed: 2026-09-07
- evidence: Wrote README.md across three revisions. First draft was context-dependent ("open index file"); after feedback on writing for a reader with no prior knowledge, revised the run instructions to name `index.html`, the browser, and the no-server point.
- note: Understands the what / who / how-to-run structure.

### markdown
- status: introduced
- date: 2026-09-07
- last-reviewed: 2026-09-07
- depends-on: readme
- evidence: Edited README.md in Markdown — used `#`/`##` headings, removed HTML comment prompts. Light exposure so far.
- note: `#` headings, `-` bullets, HTML comments; GitHub renders `.md` to a web page.

### testing-basics
- status: seed
- depends-on: js-functions
- note: NOT PRESENT. Manual browser checking is the only verification today.

### deployment-static-site
- status: seed
- depends-on: github-remote
- note: NOT PRESENT. Site only exists as local files. Parking lot / later section.

### data-vs-database
- status: seed
- depends-on: js-data-structures
- note: Why COURSES is a hard-coded file, what a real database would change, when you'd need one.
