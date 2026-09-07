(function () {
  "use strict";

  const STORAGE_KEY = "wgu-cs-course-status";
  const CATEGORY_ORDER = ["General Education", "Core", "Additional", "Program Specific"];
  const CATEGORY_CLASS = {
    "General Education": "cat-gened",
    "Core": "cat-core",
    "Additional": "cat-additional",
    "Program Specific": "cat-specific",
  };
  const STATUS_LABEL = {
    "not-started": "Not started",
    "in-progress": "In progress",
    "done": "Done",
  };

  const state = {
    status: loadStatus(),
    search: "",
    statusFilters: new Set(),
    transferFilters: new Set(),
  };

  function loadStatus() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function saveStatus() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.status));
    } catch (e) {
      /* storage unavailable — status just won't persist */
    }
  }

  function getStatus(id) {
    return state.status[id] || "not-started";
  }

  function setStatus(id, value) {
    state.status[id] = value;
    saveStatus();
    renderHeroStats();
  }

  function matchesFilters(course) {
    const statusOk =
      state.statusFilters.size === 0 || state.statusFilters.has(getStatus(course.id));

    const transferOk =
      state.transferFilters.size === 0 ||
      (state.transferFilters.has("Sophia") && course.sophia) ||
      (state.transferFilters.has("Study.com") && course.study) ||
      (state.transferFilters.has("none") && !course.sophia && !course.study);

    let searchOk = true;
    if (state.search) {
      const q = state.search.toLowerCase();
      searchOk =
        course.name.toLowerCase().includes(q) ||
        course.id.toLowerCase().includes(q) ||
        (course.sophia && course.sophia.toLowerCase().includes(q)) ||
        (course.study && course.study.toLowerCase().includes(q));
    }

    return statusOk && transferOk && searchOk;
  }

  function renderHeroStats() {
    const total = COURSES.length;
    const totalUnits = COURSES.reduce((sum, c) => sum + c.units, 0);
    const done = COURSES.filter((c) => getStatus(c.id) === "done").length;
    const inProgress = COURSES.filter((c) => getStatus(c.id) === "in-progress").length;

    const stats = [
      { value: total, label: "courses" },
      { value: totalUnits, label: "total units" },
      { value: done, label: "done" },
      { value: inProgress, label: "in progress" },
    ];

    const el = document.getElementById("heroStats");
    el.innerHTML = stats
      .map(
        (s) => `
        <div class="hero-stat">
          <span class="hero-stat-value">${s.value}</span>
          <span class="hero-stat-label">${s.label}</span>
        </div>`
      )
      .join("");
  }

  function courseCard(course) {
    const status = getStatus(course.id);
    const catClass = CATEGORY_CLASS[course.category] || "cat-gened";

    const sourceBadges =
      (course.sophia ? `<span class="source-badge src-sophia">Sophia</span>` : "") +
      (course.study ? `<span class="source-badge src-study">Study.com</span>` : "") +
      (!course.sophia && !course.study ? `<span class="source-badge src-none">Non-transferable</span>` : "");

    const transferRow = `
      ${sourceBadges ? `<div class="meta-row">${sourceBadges}</div>` : ""}
      ${
        course.sophia
          ? `<div class="meta-row" title="${escapeAttr(course.sophia)}">
               <span class="meta-tag">Sophia</span>
               <span class="meta-transfer">${escapeHtml(course.sophia)}</span>
             </div>`
          : ""
      }
      ${
        course.study
          ? `<div class="meta-row" title="${escapeAttr(course.study)}">
               <span class="meta-tag">Study.com</span>
               <span class="meta-transfer">${escapeHtml(course.study)}</span>
             </div>`
          : ""
      }`;

    const certsRow = course.certs
      ? `<div class="meta-certs" title="${escapeAttr(course.certs)}">🎓 ${escapeHtml(course.certs)}</div>`
      : "";

    return `
      <article class="course-card ${catClass}" data-id="${course.id}">
        <div class="card-top">
          <span class="course-id">${course.id} · ${course.units} ${course.units === 1 ? "unit" : "units"}</span>
          <select class="status-select" data-status="${status}" data-id="${course.id}" aria-label="Status for ${escapeAttr(course.name)}">
            <option value="not-started" ${status === "not-started" ? "selected" : ""}>Not started</option>
            <option value="in-progress" ${status === "in-progress" ? "selected" : ""}>In progress</option>
            <option value="done" ${status === "done" ? "selected" : ""}>Done</option>
          </select>
        </div>
        <h3 class="course-name">${escapeHtml(course.name)}</h3>
        <div class="card-meta">
          ${transferRow}
          ${certsRow}
        </div>
      </article>`;
  }

  function render() {
    const container = document.getElementById("courseSections");
    const emptyState = document.getElementById("emptyState");
    container.innerHTML = "";

    let visibleTotal = 0;

    CATEGORY_ORDER.forEach((category) => {
      const coursesInCategory = COURSES.filter((c) => c.category === category);
      const visible = coursesInCategory.filter(matchesFilters);
      if (visible.length === 0) return;

      visibleTotal += visible.length;
      const catClass = CATEGORY_CLASS[category];

      const section = document.createElement("section");
      section.className = "category-section";
      section.innerHTML = `
        <h2 class="category-heading">
          <span class="category-dot ${catClass}-dot"></span>
          ${category}
          <span class="category-count">${visible.length} of ${coursesInCategory.length}</span>
        </h2>
        <div class="course-grid">
          ${visible.map(courseCard).join("")}
        </div>`;
      container.appendChild(section);
    });

    emptyState.hidden = visibleTotal !== 0;
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  }
  function escapeAttr(str) {
    return escapeHtml(str).replace(/"/g, "&quot;");
  }

  // ---------- Wiring ----------
  // Each group behaves as a multi-select: clicking a specific option toggles
  // it on/off (independent of the others), and several can be active ("black")
  // at once — the results match ANY of the active options. Clicking "All"
  // clears the group back to showing everything.
  function setupSegmented(groupId, filterSet) {
    const group = document.getElementById(groupId);
    group.addEventListener("click", (e) => {
      const btn = e.target.closest(".segmented-btn");
      if (!btn) return;
      const value = btn.dataset.value;

      if (value === "all") {
        filterSet.clear();
      } else {
        if (filterSet.has(value)) {
          filterSet.delete(value);
        } else {
          filterSet.add(value);
        }
      }
      updateSegmentedUI(group, filterSet);
      render();
    });
  }

  function updateSegmentedUI(group, filterSet) {
    group.querySelectorAll(".segmented-btn").forEach((b) => {
      const isAllBtn = b.dataset.value === "all";
      b.classList.toggle("is-active", isAllBtn ? filterSet.size === 0 : filterSet.has(b.dataset.value));
    });
  }

  document.getElementById("searchInput").addEventListener("input", (e) => {
    state.search = e.target.value.trim();
    render();
  });

  setupSegmented("statusFilter", state.statusFilters);
  setupSegmented("transferFilter", state.transferFilters);

  document.getElementById("resetBtn").addEventListener("click", () => {
    state.search = "";
    state.statusFilters.clear();
    state.transferFilters.clear();
    document.getElementById("searchInput").value = "";
    updateSegmentedUI(document.getElementById("statusFilter"), state.statusFilters);
    updateSegmentedUI(document.getElementById("transferFilter"), state.transferFilters);
    render();
  });

  document.getElementById("courseSections").addEventListener("change", (e) => {
    const select = e.target.closest(".status-select");
    if (!select) return;
    const id = select.dataset.id;
    const value = select.value;
    setStatus(id, value);
    select.dataset.status = value;
    // If a status filter other than "all" is active, the card may need to disappear.
    render();
  });

  // ---------- Init ----------
  renderHeroStats();
  render();
})();
