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
- status: practicing
- date: 2026-09-07
- last-reviewed: 2026-09-07
- depends-on: separation-of-concerns
- evidence: Opened index.html directly, read the `file:///` address, confirmed no server needed. Then the reclaim task: predicted the effect of swapping the `<script>` order, made the swap, read `COURSES is not defined` in the console, and correctly reasoned out the partial failure — listeners attach before the bottom-of-file `render()` call crashes, so filters still work once `courses.js` later defines `COURSES`. Connected it to the earlier "full re-render on every click" point and understood (with guidance) that the redundancy masking the bug is a coincidence/trap, not a design win. Fixed by restoring order; verified clean console. Also saw git report no change to `index.html` after the swap-and-revert (content, not touch, is what git compares).
- note: Scripts run top to bottom, in tag order, each fully before the next. `file://` = disk, no server; `http(s)://` = a server serves the files.

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

### arrow-functions
- status: seed
- depends-on: js-functions
- note: `=>` syntax, used everywhere in `app.js` (`.map((s) => ...)`, event callbacks). Section 4.

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
- status: introduced
- date: 2026-09-07
- last-reviewed: 2026-09-07
- depends-on: js-data-structures
- evidence: In the `matchesFilters()` walk, used `.size` (count) and `.has(x)` (membership → boolean), and the "size === 0 means no filter" idiom. Hasn't yet seen `.add()`/`.delete()` (those are in `setupSegmented`).
- note: `Set` for active filters; `.has()` / `.add()` / `.delete()`.

### filtering-logic
- status: practicing
- date: 2026-09-07
- last-reviewed: 2026-09-07
- depends-on: js-set, array-methods
- evidence: Walked all of `matchesFilters()`. Identified `&&` on the return as "all three groups must pass". Translated `statusOk` (after a correction that the Set holds status values, not course IDs). Predicted correctly that with both Sophia + Study.com active, a Study.com-only course shows via the OR'd line. Stated the case-insensitive-search reason for `.toLowerCase()`. Understands the model: OR within a group, AND across groups; empty Set = everything passes.
- note: Also met "truthy/falsy" lightly (`course.sophia` is a string-or-null used as a condition).

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
- status: practicing
- date: 2026-09-07
- last-reviewed: 2026-09-07
- evidence: Ran `git init` (predicted correctly that no files would change, only `.git` added). Read `git status`, explained "untracked" as git not watching the files. Wrote a `.gitignore`; after the `touch Thumbs.db` test, saw that an ignored file is invisible to git. Explained that a secret committed to a public repo is exposed. Set `user.name`/`user.email` with `--global`; understood why the shell needs quotes around a value with a space; understood the commit email must match the GitHub account to link commits. Ran `git add .`, read the "changes to be committed" state, made a first commit, then used `git commit --amend` to rewrite the message and noticed the commit hash changed — connected that to why amending after pushing is bad. Ended on a clean working tree.
- note: `init`, `status`, `.gitignore`, `add`, `commit`, `commit --amend`, `log`, identity config all covered hands-on. LF/CRLF warning seen and explained (not configured away). Next: `git remote`, `push` (Section 2).

### git-branching
- status: seed
- depends-on: git-basics
- note: Branches, merging — introduced once the commit habit is solid.

### github-remote
- status: introduced
- date: 2026-09-07
- last-reviewed: 2026-09-07
- depends-on: git-basics
- status: practicing
- evidence: Created a public empty repo. Explained git vs GitHub and that GitHub only holds what you push. Added a remote with `git remote add origin <url>`; predicted correctly that it changes no files/commits (just a bookmark in `.git/config`). Confirmed with `git remote -v` (fetch + push directions). Renamed branch `master` → `main` with `git branch -M main`. Pushed with `git push -u origin main` — recovered calmly from an `orgin` typo by reading the error, then authenticated via the browser popup. Read the new "up to date with 'origin/main'" line and understood it as the tracking link `-u` set up.
- note: `remote`, `origin`, branch rename, `push -u`, upstream tracking, first-push auth all covered. `git push` only sends commits, never uncommitted changes — learner stated this.
- 2026-09-07 (task 3): matched local and GitHub commit hashes exactly; understood a hash is a commit's content fingerprint and that push copies the same commit object, not a new one. Read `(HEAD -> main, origin/main)` as both pointers on one commit. Then amended the already-pushed commit message: saw "have diverged, 1 and 1 different commits", hit the `non-fast-forward` push rejection, read it calmly, and resolved with `git push --force-with-lease`. Briefly worried amend had deleted the commit — reassured with the "same snapshot, new label, new hash; old commit orphaned but kept ~90 days" model. Now understands concretely why amending after push is trouble (and why it's fine solo). Also asked how git knows which commits each side has — got the hash-identity + parent-chain + remembered-`origin/main` explanation.
- 2026-09-07 (task 4): ran the full everyday cycle on real changes. Read a real `git diff`: decoded the `a/`/`b/`, `---`/`+++`, and `@@ -n,m +n,m @@` hunk headers, and identified a pure-addition hunk by the absence of flush-left `-` lines (distinguished from a markdown `---` divider in context). Held a misconception that plain `git diff` compares against the last commit; corrected by observing it show nothing after `git add`. Learned the trio: `git diff` (working vs staged), `git diff --staged` (staged vs commit), `git diff HEAD` (working vs commit); `HEAD` = current commit. Predicted correctly that after commit the branch is "ahead of origin/main by 1" and after push "up to date". Disabled the pager (`core.pager cat`). Later, unprompted, recalled the entire init→commit→remote→push sequence accurately with correct explanations of each flag (minor fixes: `.gitignore` is for unwanted not "important" files; `-M` also force-overwrites).

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
