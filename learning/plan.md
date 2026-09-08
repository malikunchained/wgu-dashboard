# Build Plan — WGU CS Course Tracker

Learning goals driving this plan: **git**, **how web apps work**, **HTML syntax**, **reading JavaScript line by line** (added 2026-09-07 at the learner's request).

See [project.md](project.md) for scope, [file-map.md](file-map.md) for the file ledger,
[knowledge-graph.md](knowledge-graph.md) for concept tracking.

`/next-lesson` breaks one section at a time into small steps. This file is sections only.

**Teaching grain (from 2026-09-07):** code lessons walk the code one line at a time, naming every piece of syntax — not chunk-by-chunk. Applies to every remaining section.

---

## Inherited decisions (chosen by Claude Code, now yours to own)

| Decision | Plain-language | Status | Revisited in |
|---|---|---|---|
| Plain HTML/CSS/JS, no framework, no build step | Files a browser opens directly; no React, no npm, no bundler | **still fuzzy** — learner can't yet spot the signs in a repo | Section 1 |
| `localStorage` for saving progress | A storage box inside one browser on one computer | **introduced** — knows it's per-machine, empty elsewhere | Section 6 |
| Course data hard-coded in `courses.js` | Data is a JavaScript array in a code file, not a database | **introduced** — "like a database"; editing data = editing code | Section 5 |
| Google Fonts loaded from the web | `index.html` pulls fonts from Google's servers at load | **still fuzzy** | Section 1 |
| No hosting yet | Site exists only as local files on D: | decided: **deploy via GitHub Pages**, repo **public** from the start (free) | Section 8 |

---

## Section 1 — Solid ground: nothing can be lost

**Payload source:** fixed first section of every adoption + learner goal (git is #1).

- Confirm the app runs in the browser and note how (open `index.html`, no server needed).
- Install/verify git. `git init` in the project root.
- Write a `.gitignore` (at minimum `learning/` stays IN; ignore OS cruft like `Thumbs.db`, `.DS_Store`).
- Write a short `README.md` — what the app is, who it's for, how to run it.
- First commit: the whole project + `learning/` as the baseline.
- Learn the core loop: `git status` → `git add` → `git commit` → `git log`, and how to write a message.

**Reclaim task:** `index.html` structure. Read it top to bottom together and label every tag. Then break it on purpose — remove the `<link rel="stylesheet">` on line 10, predict what the page will look like, open it, confirm, restore, commit nothing (or commit the restore). Flips `html-structure` toward known.

**You can see:** `git log` showing your first commit; a README a stranger could follow.

### Tasks

- [x] 1. Open `index.html` in the browser; confirm the app runs and note *how* (double-click the file, no server).
- [x] 2. `git init` in the project root; read `git status` together and understand "untracked".
- [x] 3. Write `.gitignore`; confirm git now ignores what it should.
- [x] 4. Write `README.md` — what the app is, who it's for, how to run it.
- [x] 5. First commit: `git add` → `git commit` → `git log`; write your own message.
- [ ] 6. Reclaim: tour `index.html` tag by tag, break the stylesheet link, predict, observe, restore.

---

## Section 2 — Your code, backed up on GitHub

**Payload source:** learner goal ("I wanna learn GitHub").

- Create a GitHub account if needed. Create a **public** repo (free GitHub Pages needs it, and there's nothing sensitive here — course data and your own code).
- Connect it: `git remote add origin ...`, `git push`.
- Browse your own code on github.com — see that a commit there matches `git log` locally.
- Make one small real change (e.g. fix a typo in the footer or README), commit, push — feel the full local→remote loop.
- Understand the three places code lives: working files → staged → committed → pushed.

**Reclaim task:** how the browser loads the page. In `index.html`, the last two lines load `courses.js` then `app.js` — in that order. Swap them. Predict what breaks and why. Open the page, read the browser's error console together (`COURSES is not defined`), swap back, commit the fix-then-revert understanding as a note. Flips `how-the-browser-loads-a-page` toward known.

**You can see:** your repo on github.com with real commit history.

### Tasks

- [x] 1. Create a GitHub account (if needed) and a new **public**, empty repo named `wgu-dashboard`.
- [x] 2. Connect local to remote: `git remote add origin`, rename branch `master` → `main`, `git push -u origin main` (first push triggers login).
- [x] 3. Browse the pushed code on github.com; match a commit hash to local `git log`. (Also: amended the pushed commit's message, hit the non-fast-forward rejection, and fixed it with `git push --force-with-lease` — a live demo of why amending after push is trouble.)
- [x] 4. Make one small real change → `git status` → `git diff` → `add` → `commit` → `push`; watch it update on GitHub. Nail down working → staged → committed → pushed.
- [x] 5. Reclaim: swap the `courses.js` / `app.js` script order in `index.html`, predict, read the browser console error, fix, commit.

---

## Section 3 — A filter bar that isn't ugly

> **PAUSED after Task 1** (2026-09-07). Learner wanted the JavaScript walkthrough first — resume Tasks 2–5 after Section 4.

**Payload source:** project.md ("the filter is kinda sloppy and the gui for it ugly").

- Walk `matchesFilters()` in `app.js` so you understand what the buttons actually do before restyling them.
- Rework the controls markup in `index.html` and the `.controls` / `.segmented` rules in `styles.css` — spacing, alignment, making active state obvious, mobile layout.
- No behavior change — this is HTML structure + CSS only. Good, safe practice ground.

**Reclaim task:** `filtering-logic`. Change one condition in `matchesFilters()` (e.g. make transfer-source filtering use AND instead of OR), predict what the filter buttons will do, test in the browser, revert. Flips `filtering-logic` toward known; touches `js-set`, `array-methods`.

**You can see:** the filter bar looks and behaves noticeably better, on desktop and phone width.

### Tasks

- [x] 1. Read `matchesFilters()` and the filter markup in `index.html` together — how search + status + transfer combine (AND across groups, OR within a group). No code change.
- [ ] 2. Restyle the `.controls` container in `styles.css` — layout, spacing, alignment of the groups.
- [ ] 3. Restyle `.segmented` / `.segmented-btn` — make the active state obvious, clean up hover.
- [ ] 4. Responsive pass — check and improve the narrow-screen `@media` block.
- [ ] 5. Reclaim: change one condition in `matchesFilters()`, predict, test in the browser, revert; commit the section.

---

## Section 4 — Read your JavaScript, line by line

**Payload source:** learner request (2026-09-07) — "I understand the concepts, but knowing what each line does will be very useful."

- Walk **all of `app.js`** top to bottom in small passes. Every construct gets named and explained, one line at a time:
  - `(function () { ... })();` (IIFE), `"use strict";`
  - `const` vs `let`, scope, why the file wraps itself
  - object literals, `Set`, `new Set()`
  - function declarations, **arrow functions `=>`**, parameters, `return`
  - `if`, `||` / `&&` short-circuit + truthiness, ternary `? :`
  - **template literals** with `${ }`, multi-line strings
  - array methods: `.map()`, `.filter()`, `.reduce()`, `.forEach()`, `.join()`
  - DOM: `document.getElementById`, `.innerHTML`, `.createElement`, `.appendChild`
  - events: `.addEventListener`, the event object `e`, `e.target`, `.closest()`, `.dataset`
  - `.classList.toggle`, `.querySelectorAll`
- **Deliverable:** you add your own `//` comments through `app.js` explaining each section in your own words, and can read any single line aloud and say what it does.

**Reclaim task:** `js-functions` + `array-methods`. Pull ~5 small expressions straight from `app.js` (a `.map`, a ternary, a `&&`, a `.reduce`), predict each one's result, run them in the browser console, compare. Flips `js-functions`, `array-methods`, `arrow-functions`, `template-literals` toward known.

**You can see:** an annotated `app.js` that's all yours — no mystery lines.

---

## Section 5 — "How someone passed this course" Reddit links

**Payload source:** project.md — the app's intended edge.

- Add a `reddit` field to course objects in `courses.js` (a URL, or `null`). Fill in a handful to start.
- Render it in `courseCard()` as a link on the card — only when present.
- Learn: JavaScript objects gaining fields, template literals building HTML, conditional chunks (`course.reddit ? ... : ""`), why links need `target="_blank"` and `rel="noopener"`.

**Reclaim task:** `template-literals` + `html-escaping`. In `courseCard()`, temporarily remove the `escapeHtml(...)` around `course.name` and add a fake course named `<script>alert(1)</script>` or with an `&` in it. Predict what renders. See it. Restore the escaping. Flips `template-literals` and `html-escaping` toward known; introduces `xss-basics`.

**You can see:** cards with a clickable "read how someone passed this" link.

---

## Section 6 — Check off what you did today (module checklist)

**Payload source:** project.md — daily-engagement progress tracking.

- Extend the course data: each course gets a list of modules/units (start with 2–3 real courses).
- Render a checklist of clickable checkboxes per course card.
- Save the checked set to `localStorage` alongside the existing status; load it on startup.
- Learn: `<input type="checkbox">`, `data-*` attributes to tie a checkbox to a module, the `change` event, `JSON.stringify`/`parse`, extending the storage shape without breaking old saved data.

**Reclaim task:** `localstorage` + `json`. Break `saveStatus()` — remove the `JSON.stringify` so it tries to store a raw object. Predict what gets saved and what happens on reload. Observe (`[object Object]` in storage, checklist resets). Fix. Flips `localstorage`, `json` toward known; touches `error-handling-trycatch`.

**You can see:** click bullets on a course to check off modules; reload the page, they're still checked.

---

## Section 7 — Progress bars

**Payload source:** project.md ("a progress bar for the course im working on"; completion levels too far apart).

- Compute each course's percent complete from its checked modules.
- Render a progress bar on the card (and/or in the hero stats).
- Optionally derive the coarse status (not-started / in-progress / done) from the percentage instead of a manual dropdown.
- Learn: `.filter().length`, `.reduce()`, turning a fraction into a width, keeping the bar in sync on every check.

**Reclaim task:** `array-methods`. Break the percentage math — change the `.reduce` starting value or the divisor. Predict the bar's behavior (over 100%, NaN, always 0). See it. Fix. Add a couple of manual test cases you check by hand each time (this is where light testing starts to matter). Flips `array-methods` toward known; introduces `testing-basics`.

**You can see:** a live progress bar per course that moves as you check modules.

---

## Section 8 — Live on the internet

**Payload source:** decided in planning — deployment as a learning goal.

- Repo is already public (from Section 2) — enable GitHub Pages, get your URL.
- Understand: static hosting = "serve these exact files to anyone who asks"; why this app needs no server; what a 404 from a wrong path looks like.
- Set up the push→deploy habit: commit, push, site updates.

**Reclaim task:** `deployment-static-site` + `github-remote`. Deliberately reference a file with the wrong case or path (e.g. `Styles.css`), push, load the live site, see the styling gone and the 404 in the network tab. Fix, push, confirm. Flips `deployment-static-site`, `github-remote` toward known.

**You can see:** a real URL you can open on your phone and share.

---

## Later / parking lot (not scheduled yet)

- Automated tests as a real suite (not just manual checks) — when the logic gets big enough to warrant it.
- Sync progress across devices — needs a real backend; large.
- Editing course data without touching code — an admin screen or a data file format; only if maintaining `courses.js` becomes painful.

---

## What you now own

- A **file map** with no mystery boxes — every file has an honest label.
- A **knowledge graph** that tells the truth about what you can and can't yet explain.
- A **plan** that builds your app forward (filters → Reddit links → real progress tracking → deployed) while reclaiming understanding backward, one section at a time.

Next step: run `/next-lesson`.
**Never ship a line of code you can't explain — and from now on, that includes the lines you didn't write.**
