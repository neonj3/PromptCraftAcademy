const SITE_CONTENT_PATH = "data/site-content.json";
const STORAGE_KEYS = {
  session: "promptcraft.github.session",
  github: "promptcraft.github.config",
  practice: "promptcraft.practice.progress"
};

const WORKBOOK_HEADERS = {
  Users: ["userId", "name", "email", "passwordHash", "createdAt", "updatedAt", "status", "source"],
  Sessions: ["sessionId", "userId", "email", "event", "timestamp", "branch", "page"],
  Progress: ["entryId", "userId", "email", "moduleId", "moduleTitle", "score", "xp", "completed", "timestamp"],
  Activity: ["activityId", "userId", "email", "type", "title", "details", "timestamp"],
  Meta: ["key", "value"]
};

const DEFAULT_GITHUB_CONFIG = {
  owner: "neonj3",
  repo: "PromptCraftAcademy",
  branch: "testing-features",
  path: "data/promptcraft-github-database.xlsx",
  token: ""
};

const PRACTICE_MODULES = [
  {
    id: "prompt-foundations",
    title: "Prompt Foundations",
    xp: 100,
    difficulty: "Beginner",
    brief: "Turn a vague learner question into a clean prompt with role, audience, and format.",
    starter: "Explain climate change.",
    scaffold: "Act as a friendly teacher. Explain climate change for a Class 10 student using simple language, five bullet points, and three quiz questions.",
    criteria: [
      { label: "Set a role", keywords: ["act as", "teacher", "coach", "tutor"] },
      { label: "Name the audience", keywords: ["student", "beginner", "class 10", "learner"] },
      { label: "Describe the task", keywords: ["explain", "teach", "summarize", "break down"] },
      { label: "Ask for a format", keywords: ["bullet", "table", "steps", "quiz"] }
    ],
    takeaway: "Strong prompts name the role, the learner, the task, and the output format before the model starts talking."
  },
  {
    id: "constraints",
    title: "Context and Constraints",
    xp: 120,
    difficulty: "Beginner",
    brief: "Guide the model with tone, word limits, and clear must-avoid instructions.",
    starter: "Write captions for my bakery launch.",
    scaffold: "Write 5 short Instagram captions for a local bakery grand opening. Keep each under 45 words, use a warm tone, mention fresh bakes, and avoid pushy sales language or hashtags.",
    criteria: [
      { label: "Add business context", keywords: ["bakery", "grand opening", "local", "launch"] },
      { label: "Control length", keywords: ["under", "max", "short", "45 words"] },
      { label: "Set a tone", keywords: ["warm", "friendly", "welcoming", "playful"] },
      { label: "Define what to avoid", keywords: ["avoid", "do not", "without", "no hashtags"] }
    ],
    takeaway: "If an answer feels messy, add context plus two or three boundaries before you try a new tool."
  },
  {
    id: "evaluation",
    title: "Output Design and Evaluation",
    xp: 140,
    difficulty: "Beginner",
    brief: "Ask for structured answers that are easy to compare, review, and reuse.",
    starter: "Compare these laptops for me.",
    scaffold: "Compare these two laptops for a beginner video editor. Return a table with price, RAM, storage, battery, and editing suitability. Then recommend one option and list your assumptions.",
    criteria: [
      { label: "Request a structure", keywords: ["table", "compare", "columns", "pros and cons"] },
      { label: "Ask for a recommendation", keywords: ["recommend", "best choice", "which one"] },
      { label: "Explain the reasoning", keywords: ["because", "reason", "criteria", "based on"] },
      { label: "Surface caveats", keywords: ["assumptions", "depends", "missing information", "caveats"] }
    ],
    takeaway: "When AI output will feed a document or decision, ask for structure first and cleanup second."
  },
  {
    id: "verification",
    title: "Hallucinations and Verification",
    xp: 160,
    difficulty: "Intermediate",
    brief: "Force the assistant to separate facts, assumptions, and unknowns instead of sounding overconfident.",
    starter: "Tell me if this science post is true.",
    scaffold: "Review this science claim carefully. Separate supported facts, assumptions, and unknowns. If evidence is unclear, say so directly and suggest what sources should be checked.",
    criteria: [
      { label: "Label uncertainty", keywords: ["uncertain", "unknown", "not enough information", "confidence"] },
      { label: "Ask for verification steps", keywords: ["verify", "check sources", "evidence", "cross-check"] },
      { label: "Separate claims", keywords: ["facts", "assumptions", "claims", "separate"] },
      { label: "Avoid invention", keywords: ["if unsure", "say so", "do not invent", "avoid making up"] }
    ],
    takeaway: "In factual work, asking the model to show uncertainty is often more valuable than asking it to sound polished."
  },
  {
    id: "few-shot",
    title: "Few-shot Prompting and Workflow Chaining",
    xp: 180,
    difficulty: "Intermediate",
    brief: "Use examples and step-based instructions to make complex tasks easier to repeat.",
    starter: "Turn my project notes into resume bullets.",
    scaffold: "Use this example format: 'Led X, resulting in Y by doing Z.' First identify the key action, then the impact, then write 3 resume bullets in the same style from my project notes.",
    criteria: [
      { label: "Include an example", keywords: ["example", "sample", "follow this format", "pattern"] },
      { label: "Break the task into steps", keywords: ["first", "then", "step", "process"] },
      { label: "Specify quantity", keywords: ["three", "3", "three bullets"] },
      { label: "Ask for impact language", keywords: ["impact", "result", "improved", "increased", "reduced"] }
    ],
    takeaway: "One good example can turn AI from a guesser into a pattern follower."
  },
  {
    id: "grounding",
    title: "Grounding and Simple RAG",
    xp: 200,
    difficulty: "Intermediate",
    brief: "Teach the assistant to answer only from trusted source material and say when the answer is missing.",
    starter: "Answer employee leave questions.",
    scaffold: "Answer employee leave questions using only the provided policy text. Cite the exact section used. If the answer is missing from the policy, say that clearly and ask for more context instead of guessing.",
    criteria: [
      { label: "Limit the source", keywords: ["only use", "provided policy", "source text", "based only on"] },
      { label: "Ask for citation", keywords: ["cite", "section", "quote", "reference"] },
      { label: "Define fallback behavior", keywords: ["if not found", "do not guess", "ask for more context", "say not found"] },
      { label: "Set a safety boundary", keywords: ["policy", "responsible", "avoid legal advice", "sensitive"] }
    ],
    takeaway: "Grounded answers are the bridge between casual AI use and dependable workflow automation."
  }
];

const state = {
  currentPage: "",
  content: null,
  session: loadJson(STORAGE_KEYS.session),
  github: { ...DEFAULT_GITHUB_CONFIG, ...loadJson(STORAGE_KEYS.github) },
  practice: loadJson(STORAGE_KEYS.practice) || { completed: {}, xp: 0, streak: 0, activeModuleId: PRACTICE_MODULES[0].id },
  authMode: "register",
  workbookSummary: null,
  selectedTeacherId: null
};

document.addEventListener("DOMContentLoaded", () => {
  state.currentPage = document.body.dataset.page || "home";
  init().catch((error) => {
    console.error(error);
    document.getElementById("site-root").innerHTML = `
      <div class="shell">
        <section class="panel hero-error">
          <p class="eyebrow">Load error</p>
          <h1>PromptCraft Academy could not load.</h1>
          <p>${escapeHtml(error.message || "Unknown error")}</p>
        </section>
      </div>
    `;
  });
});

async function init() {
  state.content = await loadSiteContent();
  state.selectedTeacherId = state.content.teachers[0]?.teacherId || null;
  renderShell();
  bindGlobalEvents();
  updateHeaderState();
  renderCurrentPage();
  if (!state.session) {
    window.setTimeout(() => {
      if (!state.session) {
        openAuthModal(
          "register",
          "Register after your quick tour and your account will be saved into the GitHub workbook database for this site."
        );
      }
    }, 4200);
  }
  if (hasGitHubWriteAccess()) {
    await refreshWorkbookSummary();
  }
}

async function loadSiteContent() {
  const response = await fetch(SITE_CONTENT_PATH);
  if (!response.ok) {
    throw new Error(`Could not load ${SITE_CONTENT_PATH}`);
  }
  return response.json();
}

function renderShell() {
  const root = document.getElementById("site-root");
  const pageTitle = getPageMeta(state.currentPage).title;
  root.innerHTML = `
    <div class="shell">
      <header class="site-header panel">
        <div class="brand-lockup">
          <a class="brand-link" href="index.html">
            <span class="brand-mark">PC</span>
            <div>
              <p class="eyebrow">GitHub-ready AI learning</p>
              <h1>PromptCraft Academy</h1>
            </div>
          </a>
          <p class="header-copy">${escapeHtml(state.content.site.description)}</p>
        </div>
        <div class="header-actions">
          <div class="status-chip-group">
            <span class="chip" id="sync-chip">GitHub workbook pending</span>
            <span class="chip chip-soft" id="session-chip">Guest mode</span>
          </div>
          <div class="auth-actions">
            <button class="ghost-button" id="open-login" type="button">Login</button>
            <button class="primary-button" id="open-register" type="button">Register</button>
            <button class="secondary-button hidden" id="logout-button" type="button">Logout</button>
          </div>
        </div>
      </header>

      <nav class="top-nav panel">
        ${buildNav()}
      </nav>

      <section class="page-hero panel">
        <div>
          <p class="eyebrow">${escapeHtml(pageTitle)}</p>
          <h2>${escapeHtml(getPageMeta(state.currentPage).heading)}</h2>
          <p class="lead">${escapeHtml(getPageMeta(state.currentPage).description)}</p>
        </div>
        <div class="hero-badges">
          ${state.content.highlights.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
        </div>
      </section>

      <main id="page-content" class="page-content"></main>

      <footer class="site-footer">
        <p>&copy; <span id="footer-year"></span> PromptCraft Academy. All rights reserved.</p>
      </footer>
    </div>

    <div id="auth-modal" class="modal hidden" aria-hidden="true">
      <div class="modal-backdrop" data-close-modal="true"></div>
      <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="auth-modal-heading">
        <button class="modal-close" id="close-modal" type="button" aria-label="Close account popup">&times;</button>
        <p class="eyebrow">GitHub workbook access</p>
        <h3 id="auth-modal-heading">Register or login</h3>
        <p class="muted" id="auth-modal-message">
          To make registration and login work on GitHub Pages, save a GitHub token on the Account page. The token lets this site read and update the workbook file inside the repo branch.
        </p>
        <div class="mode-switch">
          <button class="mode-button active" id="switch-register" type="button">Register</button>
          <button class="mode-button" id="switch-login" type="button">Login</button>
        </div>
        <form id="auth-form" class="stack-form">
          <label class="field-label" for="auth-name">Name</label>
          <input class="text-input" id="auth-name" type="text" placeholder="Your full name">

          <label class="field-label" for="auth-email">Email</label>
          <input class="text-input" id="auth-email" type="email" placeholder="you@example.com" required>

          <label class="field-label" for="auth-password">Password</label>
          <input class="text-input" id="auth-password" type="password" placeholder="Create a password" required>

          <p class="mini-note" id="auth-mode-note">
            This site stores users in the GitHub workbook file and hashes passwords in the browser before syncing them.
          </p>

          <button class="primary-button full-width" id="submit-auth" type="submit">Create account</button>
        </form>
      </div>
    </div>

    <div id="toast-stack" class="toast-stack" aria-live="polite"></div>
  `;

  document.getElementById("footer-year").textContent = String(new Date().getFullYear());
}

function buildNav() {
  const items = [
    ["home", "Home", "index.html"],
    ["curriculum", "Curriculum", "curriculum.html"],
    ["chapters", "Chapters", "chapters.html"],
    ["revision", "Revision", "revision.html"],
    ["teachers", "Teachers", "teachers.html"],
    ["practice", "Practice", "practice.html"],
    ["account", "Account", "account.html"]
  ];
  return items
    .map(([page, label, href]) => {
      const cls = page === state.currentPage ? "nav-link active" : "nav-link";
      return `<a class="${cls}" href="${href}">${label}</a>`;
    })
    .join("");
}

function getPageMeta(page) {
  const meta = {
    home: {
      title: "Home",
      heading: "A multi-page GenAI website built from your uploaded workbooks",
      description: "Use the curriculum map to browse the full 100-page workbook, the detailed beginner chapters, the revision guide, teacher perspectives, and a GitHub-backed account flow."
    },
    curriculum: {
      title: "Curriculum",
      heading: "The complete 100-lesson workbook explorer",
      description: "Each track contains five bite-sized lessons so a beginner can move from AI foundations to benchmarking without getting lost."
    },
    chapters: {
      title: "Detailed chapters",
      heading: "Expanded beginner chapters with exercises and recap notes",
      description: "These sections carry the longer teaching blocks from the detailed workbook so the site remains useful both for study and revision."
    },
    revision: {
      title: "Revision guide",
      heading: "Quick revision topics for fast review",
      description: "Use this page when you want short, digestible concept notes before an interview, exam, or project session."
    },
    teachers: {
      title: "Teacher voices",
      heading: "Five GenAI teaching styles woven into the website",
      description: "The site highlights five instructors so the content feels more dynamic and grounded in different learning approaches."
    },
    practice: {
      title: "Practice lab",
      heading: "Prompt drills that help you apply the workbook in real life",
      description: "Practice turns the reading material into usable GenAI instincts with fast missions around prompting, grounding, evaluation, and safety."
    },
    account: {
      title: "Account and sync",
      heading: "GitHub workbook login, registration, and live data settings",
      description: "This page handles the GitHub token, workbook connection, session state, and the organized read/write flow that powers this static deployment."
    }
  };
  return meta[page] || meta.home;
}

function bindGlobalEvents() {
  document.getElementById("open-register").addEventListener("click", () => openAuthModal("register"));
  document.getElementById("open-login").addEventListener("click", () => openAuthModal("login"));
  document.getElementById("logout-button").addEventListener("click", logout);
  document.getElementById("switch-register").addEventListener("click", () => setAuthMode("register"));
  document.getElementById("switch-login").addEventListener("click", () => setAuthMode("login"));
  document.getElementById("close-modal").addEventListener("click", closeAuthModal);
  document.querySelector("[data-close-modal='true']").addEventListener("click", closeAuthModal);
  document.getElementById("auth-form").addEventListener("submit", handleAuthSubmit);
}

function renderCurrentPage() {
  const outlet = document.getElementById("page-content");
  const page = state.currentPage;
  if (page === "home") {
    outlet.innerHTML = buildHomePage();
    bindHomePage();
  } else if (page === "curriculum") {
    outlet.innerHTML = buildCurriculumPage();
    bindCurriculumPage();
  } else if (page === "chapters") {
    outlet.innerHTML = buildChaptersPage();
  } else if (page === "revision") {
    outlet.innerHTML = buildRevisionPage();
  } else if (page === "teachers") {
    outlet.innerHTML = buildTeachersPage();
    bindTeachersPage();
    renderTeacherSpotlight(state.selectedTeacherId);
  } else if (page === "practice") {
    outlet.innerHTML = buildPracticePage();
    bindPracticePage();
    renderPracticeModule(state.practice.activeModuleId || PRACTICE_MODULES[0].id);
  } else if (page === "account") {
    outlet.innerHTML = buildAccountPage();
    bindAccountPage();
    renderAccountState();
  } else {
    outlet.innerHTML = buildHomePage();
    bindHomePage();
  }
}

function buildHomePage() {
  const featuredTracks = state.content.tracks.slice(0, 6);
  return `
    <section class="grid-two">
      <article class="panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Workbook reach</p>
            <h3>What is inside this website</h3>
          </div>
          <span class="chip">${state.content.stats.lessons} lessons</span>
        </div>
        <div class="stats-grid stats-grid-wide">
          <article class="stat-card"><span class="stat-label">Tracks</span><strong>${state.content.stats.tracks}</strong></article>
          <article class="stat-card"><span class="stat-label">Chapters</span><strong>${state.content.stats.chapters}</strong></article>
          <article class="stat-card"><span class="stat-label">Revision topics</span><strong>${state.content.stats.revisionTopics}</strong></article>
          <article class="stat-card"><span class="stat-label">Teachers</span><strong>${state.content.stats.teachers}</strong></article>
        </div>
        <p class="microcopy">The 100-page workbook is the backbone. The detailed and revision workbooks are layered in so the site supports both deep study and quick review.</p>
      </article>

      <article class="panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">GitHub data flow</p>
            <h3>How the login system works</h3>
          </div>
          <span class="chip chip-soft">Static hosting compatible</span>
        </div>
        <ol class="number-list">
          <li>Save the repo owner, repo name, branch, workbook path, and a GitHub token on the Account page.</li>
          <li>Register or login through the popup. The site hashes the password in the browser.</li>
          <li>The GitHub workbook file is read, updated, and written back through the GitHub Contents API.</li>
        </ol>
        <a class="text-link" href="account.html">Open Account and Sync settings</a>
      </article>
    </section>

    <section class="panel">
      <div class="panel-head">
        <div>
          <p class="eyebrow">Start here</p>
          <h3>Featured topic tracks</h3>
        </div>
        <a class="text-link" href="curriculum.html">See all 20 tracks</a>
      </div>
      <div class="card-grid">
        ${featuredTracks.map((track) => buildTrackCard(track)).join("")}
      </div>
    </section>

    <section class="grid-two">
      <article class="panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Beginner flow</p>
            <h3>Recommended study order</h3>
          </div>
        </div>
        <div class="timeline-list">
          <div class="timeline-item"><strong>1. Browse Home and Curriculum</strong><span>Understand the full map before diving into the details.</span></div>
          <div class="timeline-item"><strong>2. Read the Detailed Chapters</strong><span>These give you the longest explanations and exercises.</span></div>
          <div class="timeline-item"><strong>3. Use Revision for memory refresh</strong><span>Perfect before applying concepts or answering questions.</span></div>
          <div class="timeline-item"><strong>4. Practice inside the Prompt Lab</strong><span>Use missions to turn concepts into repeatable prompt habits.</span></div>
        </div>
      </article>

      <article class="panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Teacher spotlight</p>
            <h3>Who is guiding the content</h3>
          </div>
          <a class="text-link" href="teachers.html">Meet all teachers</a>
        </div>
        <div class="teacher-mini-grid">
          ${state.content.teachers
            .map(
              (teacher) => `
                <button class="teacher-mini-card" data-teacher-link="${teacher.teacherId}" type="button">
                  <strong>${escapeHtml(teacher.teacherName)}</strong>
                  <span>${escapeHtml(teacher.domain)}</span>
                </button>
              `
            )
            .join("")}
        </div>
      </article>
    </section>
  `;
}

function bindHomePage() {
  document.querySelectorAll("[data-teacher-link]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-teacher-link");
      window.location.href = `teachers.html#${id}`;
    });
  });
}

function buildTrackCard(track) {
  const teacher = getTeacherById(track.teacherId);
  return `
    <article class="track-card">
      <p class="eyebrow">${escapeHtml(track.pageRange)} · ${track.lessonCount} lessons</p>
      <h4>${escapeHtml(track.title)}</h4>
      <p>${escapeHtml(track.summary)}</p>
      <div class="card-meta">
        <span>${escapeHtml(teacher.teacherName)}</span>
        <span>${escapeHtml(teacher.channel)}</span>
      </div>
    </article>
  `;
}

function buildCurriculumPage() {
  return `
    <section class="panel">
      <div class="panel-head">
        <div>
          <p class="eyebrow">Curriculum search</p>
          <h3>Find a lesson, track, or concept</h3>
        </div>
      </div>
      <input class="text-input" id="curriculum-search" type="search" placeholder="Search by page number, track, or lesson title">
    </section>

    <section id="curriculum-results" class="stack-section">
      ${state.content.tracks.map((track) => buildCurriculumTrack(track)).join("")}
    </section>
  `;
}

function buildCurriculumTrack(track) {
  const lessons = state.content.lessons.filter((lesson) => lesson.track === track.title);
  const teacher = getTeacherById(track.teacherId);
  return `
    <details class="panel curriculum-track" open data-track-card="${escapeHtml(track.id)}">
      <summary class="curriculum-summary">
        <div>
          <p class="eyebrow">${escapeHtml(track.pageRange)}</p>
          <h3>${escapeHtml(track.title)}</h3>
        </div>
        <span class="chip">${escapeHtml(teacher.teacherName)}</span>
      </summary>
      <p class="muted">${escapeHtml(track.summary)}</p>
      <div class="lesson-list">
        ${lessons.map((lesson) => buildLessonCard(lesson)).join("")}
      </div>
    </details>
  `;
}

function buildLessonCard(lesson) {
  return `
    <article class="lesson-card" data-lesson-card="${escapeHtml(
      `${lesson.page} ${lesson.title} ${lesson.track} ${lesson.content}`
    ).toLowerCase()}">
      <div class="lesson-topline">
        <strong>Page ${escapeHtml(lesson.page)}</strong>
        <span>${escapeHtml(getTeacherById(lesson.teacherId).teacherName)}</span>
      </div>
      <h4>${escapeHtml(lesson.title)}</h4>
      <p>${escapeHtml(lesson.content)}</p>
      <div class="lesson-notes">
        <div>
          <span class="brief-label">How to think about it</span>
          <p>${escapeHtml(lesson.thinking)}</p>
        </div>
        <div>
          <span class="brief-label">Mini recap</span>
          <p>${escapeHtml(lesson.recap)}</p>
        </div>
      </div>
    </article>
  `;
}

function bindCurriculumPage() {
  const search = document.getElementById("curriculum-search");
  const lessonCards = [...document.querySelectorAll("[data-lesson-card]")];
  const trackCards = [...document.querySelectorAll("[data-track-card]")];
  search.addEventListener("input", () => {
    const term = search.value.trim().toLowerCase();
    lessonCards.forEach((card) => {
      const match = card.getAttribute("data-lesson-card").includes(term);
      card.classList.toggle("hidden", !match);
    });
    trackCards.forEach((trackCard) => {
      const hasVisible = trackCard.querySelector(".lesson-card:not(.hidden)");
      trackCard.classList.toggle("hidden", !hasVisible);
      if (term && hasVisible) {
        trackCard.setAttribute("open", "open");
      }
    });
  });
}

function buildChaptersPage() {
  return `
    <section class="stack-section">
      ${state.content.chapters
        .map(
          (chapter) => `
            <article class="panel chapter-card">
              <div class="panel-head">
                <div>
                  <p class="eyebrow">Chapter ${chapter.number}</p>
                  <h3>${escapeHtml(chapter.title)}</h3>
                </div>
                <span class="chip">${chapter.sections.length} sections</span>
              </div>
              <div class="chapter-section-grid">
                ${chapter.sections
                  .map(
                    (section) => `
                      <article class="chapter-section">
                        <h4>${escapeHtml(section.heading)}</h4>
                        <p>${escapeHtml(section.summary)}</p>
                        <p class="microcopy"><strong>Beginner explanation:</strong> ${escapeHtml(section.beginnerTip)}</p>
                      </article>
                    `
                  )
                  .join("")}
              </div>
              <div class="chapter-footer-grid">
                <div class="practice-box">
                  <span class="brief-label">Exercises</span>
                  <ul class="plain-list">
                    ${chapter.exercises.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                  </ul>
                </div>
                <div class="practice-box">
                  <span class="brief-label">Mini recap</span>
                  <p>${escapeHtml(chapter.recap)}</p>
                </div>
              </div>
            </article>
          `
        )
        .join("")}
    </section>
  `;
}

function buildRevisionPage() {
  return `
    <section class="stack-section">
      ${state.content.revisionTopics
        .map(
          (topic) => `
            <details class="panel revision-card" ${topic.number <= 3 ? "open" : ""}>
              <summary class="curriculum-summary">
                <div>
                  <p class="eyebrow">Revision topic ${topic.number}</p>
                  <h3>${escapeHtml(topic.title)}</h3>
                </div>
              </summary>
              <ul class="plain-list">
                ${topic.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
              </ul>
              <p class="mini-note"><strong>Beginner tip:</strong> ${escapeHtml(topic.beginnerTip)}</p>
            </details>
          `
        )
        .join("")}
    </section>
  `;
}

function buildTeachersPage() {
  return `
    <section class="grid-two teacher-page-layout">
      <article class="panel teacher-selector-panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Teacher selector</p>
            <h3>Choose a teaching style</h3>
          </div>
          <span class="chip">${state.content.teachers.length} teachers</span>
        </div>
        <div class="teacher-selector-list">
          ${state.content.teachers
            .map(
              (teacher) => `
                <button class="teacher-pick" type="button" data-teacher-pick="${teacher.teacherId}">
                  <strong>${escapeHtml(teacher.teacherName)}</strong>
                  <span>${escapeHtml(teacher.domain)}</span>
                </button>
              `
            )
            .join("")}
        </div>
      </article>

      <article class="panel" id="teacher-spotlight"></article>
    </section>

    <section class="panel">
      <div class="panel-head">
        <div>
          <p class="eyebrow">Teacher-led curriculum</p>
          <h3>How lessons are distributed</h3>
        </div>
      </div>
      <div class="teacher-distribution-grid">
        ${state.content.teachers
          .map((teacher) => {
            const lessons = state.content.teacherLessons.filter((lesson) => lesson.teacherId === teacher.teacherId);
            return `
              <article class="teacher-distribution-card">
                <h4>${escapeHtml(teacher.teacherName)}</h4>
                <p>${escapeHtml(teacher.summary)}</p>
                <p class="microcopy">${lessons.length} assigned workbook lessons</p>
              </article>
            `;
          })
          .join("")}
      </div>
    </section>
  `;
}

function bindTeachersPage() {
  const fromHash = window.location.hash.replace("#", "");
  if (fromHash) {
    state.selectedTeacherId = fromHash;
  }
  document.querySelectorAll("[data-teacher-pick]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedTeacherId = button.getAttribute("data-teacher-pick");
      renderTeacherSpotlight(state.selectedTeacherId);
      history.replaceState(null, "", `teachers.html#${state.selectedTeacherId}`);
    });
  });
}

function renderTeacherSpotlight(teacherId) {
  const teacher = getTeacherById(teacherId) || state.content.teachers[0];
  state.selectedTeacherId = teacher.teacherId;
  const lessons = state.content.teacherLessons.filter((lesson) => lesson.teacherId === teacher.teacherId).slice(0, 12);
  const spotlight = document.getElementById("teacher-spotlight");
  if (!spotlight) {
    return;
  }
  spotlight.innerHTML = `
    <div class="panel-head">
      <div>
        <p class="eyebrow">${escapeHtml(teacher.channel)}</p>
        <h3>${escapeHtml(teacher.teacherName)}</h3>
      </div>
      <span class="chip chip-soft">${escapeHtml(teacher.domain)}</span>
    </div>
    <p>${escapeHtml(teacher.summary)}</p>
    <div class="teacher-columns">
      <div class="practice-box">
        <span class="brief-label">Teaching style</span>
        <p>${escapeHtml(teacher.teachingStyle)}</p>
      </div>
      <div class="practice-box">
        <span class="brief-label">Teacher voice</span>
        <p>${escapeHtml(teacher.teacherVoice)}</p>
      </div>
    </div>
    <div class="practice-box">
      <span class="brief-label">Signature topics</span>
      <div class="pill-row">
        ${teacher.signatureTopics.map((topic) => `<span class="pill">${escapeHtml(topic)}</span>`).join("")}
      </div>
    </div>
    <div class="practice-box">
      <span class="brief-label">Sample lesson playlist</span>
      <ul class="plain-list compact-list">
        ${lessons.map((lesson) => `<li>Page ${escapeHtml(lesson.page)}: ${escapeHtml(lesson.moduleTitle)}</li>`).join("")}
      </ul>
    </div>
  `;
  document.querySelectorAll("[data-teacher-pick]").forEach((button) => {
    button.classList.toggle("active", button.getAttribute("data-teacher-pick") === teacher.teacherId);
  });
}

function buildPracticePage() {
  return `
    <section class="grid-two practice-layout">
      <article class="panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Mission list</p>
            <h3>Choose a prompt drill</h3>
          </div>
          <span class="chip">${PRACTICE_MODULES.length} modules</span>
        </div>
        <div class="practice-map" id="practice-map"></div>
      </article>

      <article class="panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Current mission</p>
            <h3 id="practice-title">Prompt drill</h3>
          </div>
          <span class="chip chip-soft" id="practice-meta">+0 XP</span>
        </div>
        <p id="practice-brief" class="muted"></p>
        <div class="practice-box">
          <span class="brief-label">Starter prompt</span>
          <div class="prompt-box" id="practice-starter"></div>
        </div>
        <div class="practice-box">
          <span class="brief-label">Rewrite it</span>
          <textarea class="prompt-area" id="practice-editor" placeholder="Write a stronger prompt here..."></textarea>
          <div class="auth-actions">
            <button class="ghost-button" id="use-practice-starter" type="button">Use starter</button>
            <button class="secondary-button" id="use-practice-scaffold" type="button">Add scaffold</button>
            <button class="primary-button" id="grade-practice" type="button">Evaluate</button>
          </div>
        </div>
        <div class="practice-box">
          <span class="brief-label">Checklist</span>
          <ul class="plain-list compact-list" id="practice-criteria"></ul>
        </div>
        <div class="feedback-card" id="practice-feedback">
          <p class="feedback-title">Feedback will appear here after evaluation.</p>
          <div class="feedback-score" id="practice-score"></div>
          <ul class="plain-list compact-list" id="practice-points"></ul>
        </div>
        <div class="practice-box">
          <span class="brief-label">Takeaway</span>
          <p id="practice-takeaway">Finish a mission to capture the real-world habit it teaches.</p>
        </div>
      </article>
    </section>
  `;
}

function bindPracticePage() {
  renderPracticeMap();
  document.getElementById("use-practice-starter").addEventListener("click", () => {
    const module = getActivePracticeModule();
    document.getElementById("practice-editor").value = module.starter;
  });
  document.getElementById("use-practice-scaffold").addEventListener("click", () => {
    const module = getActivePracticeModule();
    document.getElementById("practice-editor").value = module.scaffold;
  });
  document.getElementById("grade-practice").addEventListener("click", async () => {
    const module = getActivePracticeModule();
    const prompt = document.getElementById("practice-editor").value.trim();
    if (!prompt) {
      showToast("Add a prompt", "Write your improved prompt first.");
      return;
    }
    const result = evaluatePracticePrompt(module, prompt);
    renderPracticeFeedback(result);
    const alreadyCompleted = Boolean(state.practice.completed[module.id]);
    if (result.score >= module.criteria.length) {
      state.practice.completed[module.id] = true;
      if (!alreadyCompleted) {
        state.practice.xp += module.xp;
      }
    }
    persistPracticeState();
    document.getElementById("practice-takeaway").textContent = module.takeaway;
    renderPracticeMap();
    if (state.session && hasGitHubWriteAccess()) {
      await saveProgressEntry(module, result);
    }
  });
}

function renderPracticeMap() {
  const target = document.getElementById("practice-map");
  if (!target) {
    return;
  }
  target.innerHTML = PRACTICE_MODULES
    .map((module) => {
      const completed = Boolean(state.practice.completed[module.id]);
      const active = module.id === state.practice.activeModuleId;
      return `
        <button class="practice-node ${completed ? "completed" : ""} ${active ? "active" : ""}" data-practice-module="${module.id}" type="button">
          <span>${escapeHtml(module.title)}</span>
          <small>${escapeHtml(module.difficulty)} · ${module.xp} XP</small>
        </button>
      `;
    })
    .join("");
  target.querySelectorAll("[data-practice-module]").forEach((button) => {
    button.addEventListener("click", () => {
      const moduleId = button.getAttribute("data-practice-module");
      state.practice.activeModuleId = moduleId;
      persistPracticeState();
      renderPracticeMap();
      renderPracticeModule(moduleId);
    });
  });
}

function renderPracticeModule(moduleId) {
  const module = PRACTICE_MODULES.find((item) => item.id === moduleId) || PRACTICE_MODULES[0];
  state.practice.activeModuleId = module.id;
  document.getElementById("practice-title").textContent = module.title;
  document.getElementById("practice-meta").textContent = `${module.difficulty} · +${module.xp} XP`;
  document.getElementById("practice-brief").textContent = module.brief;
  document.getElementById("practice-starter").textContent = module.starter;
  document.getElementById("practice-editor").value = module.starter;
  document.getElementById("practice-criteria").innerHTML = module.criteria
    .map((criterion) => `<li>${escapeHtml(criterion.label)}</li>`)
    .join("");
  renderPracticeFeedback(null);
}

function getActivePracticeModule() {
  return PRACTICE_MODULES.find((item) => item.id === state.practice.activeModuleId) || PRACTICE_MODULES[0];
}

function evaluatePracticePrompt(module, prompt) {
  const lower = prompt.toLowerCase();
  let score = 0;
  const points = module.criteria.map((criterion) => {
    const matched = criterion.keywords.some((keyword) => lower.includes(keyword));
    if (matched) {
      score += 1;
      return { ok: true, text: `${criterion.label}: strong` };
    }
    return { ok: false, text: `${criterion.label}: improve this part` };
  });
  const bonus = prompt.length > 80 ? 1 : 0;
  if (bonus) {
    score += 1;
    points.push({ ok: true, text: "Clarity bonus: the prompt has enough detail to guide the model." });
  } else {
    points.push({ ok: false, text: "Clarity bonus: add more detail so the assistant can respond consistently." });
  }
  const maxScore = module.criteria.length + 1;
  const percentage = Math.round((score / maxScore) * 100);
  return { score, maxScore, percentage, points };
}

function renderPracticeFeedback(result) {
  const scoreEl = document.getElementById("practice-score");
  const pointsEl = document.getElementById("practice-points");
  const titleEl = document.querySelector("#practice-feedback .feedback-title");
  if (!result) {
    titleEl.textContent = "Feedback will appear here after evaluation.";
    scoreEl.textContent = "";
    pointsEl.innerHTML = "";
    return;
  }
  titleEl.textContent = result.percentage >= 70 ? "Strong draft" : "Good start, but tighten it up";
  scoreEl.textContent = `${result.percentage}/100`;
  pointsEl.innerHTML = result.points
    .map((point) => `<li class="${point.ok ? "ok" : "warn"}">${escapeHtml(point.text)}</li>`)
    .join("");
  showToast("Practice scored", `Your prompt earned ${result.percentage}/100.`);
}

function buildAccountPage() {
  return `
    <section class="grid-two">
      <article class="panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">GitHub sync settings</p>
            <h3>Connect the workbook file</h3>
          </div>
          <span class="chip" id="account-sync-status">Not connected</span>
        </div>
        <form id="github-config-form" class="stack-form">
          <label class="field-label" for="github-owner">Repo owner</label>
          <input class="text-input" id="github-owner" type="text" value="${escapeHtml(state.github.owner)}">

          <label class="field-label" for="github-repo">Repo name</label>
          <input class="text-input" id="github-repo" type="text" value="${escapeHtml(state.github.repo)}">

          <label class="field-label" for="github-branch">Branch</label>
          <input class="text-input" id="github-branch" type="text" value="${escapeHtml(state.github.branch)}">

          <label class="field-label" for="github-path">Workbook path</label>
          <input class="text-input" id="github-path" type="text" value="${escapeHtml(state.github.path)}">

          <label class="field-label" for="github-token">GitHub token</label>
          <input class="text-input" id="github-token" type="password" value="${escapeHtml(state.github.token)}" placeholder="GitHub classic or fine-grained token with contents write access">

          <div class="auth-actions">
            <button class="primary-button" type="submit">Save settings</button>
            <button class="secondary-button" id="test-connection" type="button">Test connection</button>
            <button class="ghost-button" id="download-workbook" type="button">Download workbook</button>
          </div>
        </form>
        <p class="mini-note">Because this site is fully static, GitHub write access is handled with a token stored in your browser. That is convenient for zero-cost deployment, but it is not a production-grade auth architecture.</p>
      </article>

      <article class="panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Session</p>
            <h3>Current account state</h3>
          </div>
          <span class="chip chip-soft" id="account-session-badge">Guest</span>
        </div>
        <div id="account-session-copy" class="stack-copy"></div>
        <div class="auth-actions">
          <button class="secondary-button" id="account-register" type="button">Register</button>
          <button class="ghost-button" id="account-login" type="button">Login</button>
          <button class="ghost-button hidden" id="account-logout" type="button">Logout</button>
        </div>
      </article>
    </section>

    <section class="grid-two">
      <article class="panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Workbook records</p>
            <h3>Database overview</h3>
          </div>
        </div>
        <div class="stats-grid stats-grid-wide">
          <article class="stat-card"><span class="stat-label">Users</span><strong id="summary-users">0</strong></article>
          <article class="stat-card"><span class="stat-label">Sessions</span><strong id="summary-sessions">0</strong></article>
          <article class="stat-card"><span class="stat-label">Progress</span><strong id="summary-progress">0</strong></article>
          <article class="stat-card"><span class="stat-label">Activity</span><strong id="summary-activity">0</strong></article>
        </div>
        <p class="microcopy" id="summary-updated">Save your GitHub settings and test the connection to load workbook counts.</p>
      </article>

      <article class="panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Organized write flow</p>
            <h3>What gets written into GitHub</h3>
          </div>
        </div>
        <ul class="plain-list">
          <li><strong>Users:</strong> registration details with hashed password and timestamps.</li>
          <li><strong>Sessions:</strong> login and logout activity with page and branch context.</li>
          <li><strong>Progress:</strong> practice mission scores and XP events.</li>
          <li><strong>Activity:</strong> general account and content events.</li>
        </ul>
      </article>
    </section>
  `;
}

function bindAccountPage() {
  document.getElementById("github-config-form").addEventListener("submit", (event) => {
    event.preventDefault();
    saveGitHubSettingsFromForm();
  });
  document.getElementById("test-connection").addEventListener("click", async () => {
    try {
      saveGitHubSettingsFromForm();
      await refreshWorkbookSummary();
      showToast("Connection ready", "The workbook was loaded from GitHub successfully.");
    } catch (error) {
      showToast("Connection failed", error.message);
    }
  });
  document.getElementById("download-workbook").addEventListener("click", async () => {
    try {
      saveGitHubSettingsFromForm();
      const bundle = await fetchWorkbookBundle();
      downloadBytes(bundle.bytes, "promptcraft-github-database.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      showToast("Workbook downloaded", "A local copy of the current GitHub workbook was downloaded.");
    } catch (error) {
      showToast("Download failed", error.message);
    }
  });
  document.getElementById("account-register").addEventListener("click", () => openAuthModal("register"));
  document.getElementById("account-login").addEventListener("click", () => openAuthModal("login"));
  document.getElementById("account-logout").addEventListener("click", logout);
}

function renderAccountState() {
  const sessionBadge = document.getElementById("account-session-badge");
  const sessionCopy = document.getElementById("account-session-copy");
  const logoutButton = document.getElementById("account-logout");
  const syncStatus = document.getElementById("account-sync-status");

  syncStatus.textContent = hasGitHubWriteAccess() ? "Token saved" : "Token missing";
  syncStatus.classList.toggle("chip-soft", !hasGitHubWriteAccess());

  if (state.session) {
    sessionBadge.textContent = state.session.email;
    sessionCopy.innerHTML = `
      <p><strong>Name:</strong> ${escapeHtml(state.session.name || "Learner")}</p>
      <p><strong>Email:</strong> ${escapeHtml(state.session.email)}</p>
      <p><strong>Source:</strong> ${escapeHtml(state.session.source || "github-workbook")}</p>
      <p><strong>Signed in at:</strong> ${escapeHtml(formatDateTime(state.session.timestamp))}</p>
    `;
    logoutButton.classList.remove("hidden");
  } else {
    sessionBadge.textContent = "Guest";
    sessionCopy.innerHTML = `
      <p>Guest users can browse the site, but registration and login write into the GitHub workbook only after a token has been saved.</p>
      <p>That design keeps the site zero-cost and static-host friendly, even though it is not a secure enterprise auth model.</p>
    `;
    logoutButton.classList.add("hidden");
  }

  updateWorkbookSummaryUI();
}

async function handleAuthSubmit(event) {
  event.preventDefault();
  if (!hasGitHubWriteAccess()) {
    showToast("GitHub token required", "Open the Account page, save your GitHub token, and then try again.");
    window.location.href = "account.html";
    return;
  }

  const name = document.getElementById("auth-name").value.trim();
  const email = document.getElementById("auth-email").value.trim().toLowerCase();
  const password = document.getElementById("auth-password").value;

  if (!email || !password) {
    showToast("Missing details", "Email and password are required.");
    return;
  }
  if (state.authMode === "register" && !name) {
    showToast("Name required", "Please add your name before registering.");
    return;
  }
  if (password.length < 8) {
    showToast("Password too short", "Use at least 8 characters.");
    return;
  }

  try {
    if (state.authMode === "register") {
      await registerUser(name, email, password);
      showToast("Registration saved", "Your account was written into the GitHub workbook.");
    } else {
      await loginUser(email, password);
      showToast("Login successful", "Your session is now active on this browser.");
    }
    closeAuthModal();
    updateHeaderState();
    if (state.currentPage === "account") {
      renderAccountState();
    }
    await refreshWorkbookSummary();
  } catch (error) {
    showToast("Auth failed", error.message);
  }
}

async function registerUser(name, email, password) {
  const passwordHash = await hashText(password);
  const bundle = await fetchWorkbookBundle();
  const data = workbookToData(bundle.workbook);
  const existing = data.Users.find((row) => normalizeEmail(row.email) === email);
  if (existing) {
    throw new Error("This email is already registered in the workbook.");
  }
  const timestamp = new Date().toISOString();
  const userId = createId("user");
  data.Users.push({
    userId,
    name,
    email,
    passwordHash,
    createdAt: timestamp,
    updatedAt: timestamp,
    status: "active",
    source: "github-pages"
  });
  data.Sessions.push({
    sessionId: createId("session"),
    userId,
    email,
    event: "register",
    timestamp,
    branch: state.github.branch,
    page: state.currentPage
  });
  data.Activity.push({
    activityId: createId("activity"),
    userId,
    email,
    type: "register",
    title: "New registration",
    details: `Registered from ${state.currentPage} page`,
    timestamp
  });
  writeDataToWorkbook(bundle.workbook, organizeWorkbookData(data));
  await saveWorkbookBundle(bundle.workbook, bundle.sha, `Register ${email} via PromptCraft Academy`);
  state.session = { userId, name, email, timestamp, source: "github-workbook" };
  saveJson(STORAGE_KEYS.session, state.session);
}

async function loginUser(email, password) {
  const passwordHash = await hashText(password);
  const bundle = await fetchWorkbookBundle();
  const data = workbookToData(bundle.workbook);
  const existing = data.Users.find(
    (row) => normalizeEmail(row.email) === email && row.passwordHash === passwordHash && row.status !== "disabled"
  );
  if (!existing) {
    throw new Error("The email or password does not match the workbook records.");
  }
  const timestamp = new Date().toISOString();
  data.Sessions.push({
    sessionId: createId("session"),
    userId: existing.userId,
    email,
    event: "login",
    timestamp,
    branch: state.github.branch,
    page: state.currentPage
  });
  data.Activity.push({
    activityId: createId("activity"),
    userId: existing.userId,
    email,
    type: "login",
    title: "User login",
    details: `Logged in from ${state.currentPage} page`,
    timestamp
  });
  writeDataToWorkbook(bundle.workbook, organizeWorkbookData(data));
  await saveWorkbookBundle(bundle.workbook, bundle.sha, `Login ${email} via PromptCraft Academy`);
  state.session = { userId: existing.userId, name: existing.name, email, timestamp, source: "github-workbook" };
  saveJson(STORAGE_KEYS.session, state.session);
}

async function logout() {
  if (state.session && hasGitHubWriteAccess()) {
    try {
      const bundle = await fetchWorkbookBundle();
      const data = workbookToData(bundle.workbook);
      const timestamp = new Date().toISOString();
      data.Sessions.push({
        sessionId: createId("session"),
        userId: state.session.userId,
        email: state.session.email,
        event: "logout",
        timestamp,
        branch: state.github.branch,
        page: state.currentPage
      });
      data.Activity.push({
        activityId: createId("activity"),
        userId: state.session.userId,
        email: state.session.email,
        type: "logout",
        title: "User logout",
        details: `Logged out from ${state.currentPage} page`,
        timestamp
      });
      writeDataToWorkbook(bundle.workbook, organizeWorkbookData(data));
      await saveWorkbookBundle(bundle.workbook, bundle.sha, `Logout ${state.session.email} via PromptCraft Academy`);
    } catch (error) {
      console.warn("Logout sync failed", error);
    }
  }

  state.session = null;
  saveJson(STORAGE_KEYS.session, null);
  updateHeaderState();
  if (state.currentPage === "account") {
    renderAccountState();
  }
  showToast("Logged out", "Your local session was cleared.");
}

async function saveProgressEntry(module, result) {
  const bundle = await fetchWorkbookBundle();
  const data = workbookToData(bundle.workbook);
  const timestamp = new Date().toISOString();
  data.Progress.push({
    entryId: createId("progress"),
    userId: state.session.userId,
    email: state.session.email,
    moduleId: module.id,
    moduleTitle: module.title,
    score: result.percentage,
    xp: result.percentage >= 70 ? module.xp : 0,
    completed: result.percentage >= 70 ? "yes" : "no",
    timestamp
  });
  data.Activity.push({
    activityId: createId("activity"),
    userId: state.session.userId,
    email: state.session.email,
    type: "practice",
    title: module.title,
    details: `Scored ${result.percentage}/100 in the practice lab`,
    timestamp
  });
  writeDataToWorkbook(bundle.workbook, organizeWorkbookData(data));
  await saveWorkbookBundle(bundle.workbook, bundle.sha, `Practice progress for ${state.session.email}`);
  await refreshWorkbookSummary();
}

function saveGitHubSettingsFromForm() {
  state.github = {
    owner: document.getElementById("github-owner").value.trim(),
    repo: document.getElementById("github-repo").value.trim(),
    branch: document.getElementById("github-branch").value.trim(),
    path: document.getElementById("github-path").value.trim(),
    token: document.getElementById("github-token").value.trim()
  };
  saveJson(STORAGE_KEYS.github, state.github);
  updateHeaderState();
  if (state.currentPage === "account") {
    renderAccountState();
  }
  showToast("Settings saved", "GitHub workbook settings were saved to this browser.");
}

function updateHeaderState() {
  const syncChip = document.getElementById("sync-chip");
  const sessionChip = document.getElementById("session-chip");
  const logoutButton = document.getElementById("logout-button");
  syncChip.textContent = hasGitHubWriteAccess() ? `Workbook: ${state.github.branch}` : "GitHub token missing";
  syncChip.classList.toggle("chip-soft", !hasGitHubWriteAccess());
  if (state.session) {
    sessionChip.textContent = state.session.email;
    document.getElementById("open-login").classList.add("hidden");
    document.getElementById("open-register").classList.add("hidden");
    logoutButton.classList.remove("hidden");
  } else {
    sessionChip.textContent = "Guest mode";
    document.getElementById("open-login").classList.remove("hidden");
    document.getElementById("open-register").classList.remove("hidden");
    logoutButton.classList.add("hidden");
  }
}

async function refreshWorkbookSummary() {
  const bundle = await fetchWorkbookBundle();
  const data = workbookToData(bundle.workbook);
  state.workbookSummary = {
    users: data.Users.length,
    sessions: data.Sessions.length,
    progress: data.Progress.length,
    activity: data.Activity.length,
    updatedAt: new Date().toISOString()
  };
  updateWorkbookSummaryUI();
}

function updateWorkbookSummaryUI() {
  if (!state.workbookSummary || state.currentPage !== "account") {
    return;
  }
  document.getElementById("summary-users").textContent = String(state.workbookSummary.users);
  document.getElementById("summary-sessions").textContent = String(state.workbookSummary.sessions);
  document.getElementById("summary-progress").textContent = String(state.workbookSummary.progress);
  document.getElementById("summary-activity").textContent = String(state.workbookSummary.activity);
  document.getElementById("summary-updated").textContent = `Last refreshed ${formatDateTime(state.workbookSummary.updatedAt)} from ${state.github.owner}/${state.github.repo}@${state.github.branch}`;
}

function openAuthModal(mode = "register", message = "") {
  setAuthMode(mode);
  document.getElementById("auth-modal-message").textContent =
    message ||
    "Save a GitHub token on the Account page so this site can read and write the workbook file inside your repository branch.";
  document.getElementById("auth-modal").classList.remove("hidden");
  document.getElementById("auth-modal").setAttribute("aria-hidden", "false");
}

function closeAuthModal() {
  document.getElementById("auth-modal").classList.add("hidden");
  document.getElementById("auth-modal").setAttribute("aria-hidden", "true");
}

function setAuthMode(mode) {
  state.authMode = mode;
  const isRegister = mode === "register";
  const nameInput = document.getElementById("auth-name");
  const nameLabel = nameInput.previousElementSibling;
  document.getElementById("switch-register").classList.toggle("active", isRegister);
  document.getElementById("switch-login").classList.toggle("active", !isRegister);
  document.getElementById("submit-auth").textContent = isRegister ? "Create account" : "Login";
  document.getElementById("auth-mode-note").textContent = isRegister
    ? "This site stores users in the GitHub workbook file and hashes passwords in the browser before syncing them."
    : "Login checks the GitHub workbook file for your email and password hash before opening a session in this browser.";
  nameLabel.classList.toggle("hidden", !isRegister);
  nameInput.classList.toggle("hidden", !isRegister);
}

function hasGitHubWriteAccess() {
  return Boolean(state.github.owner && state.github.repo && state.github.branch && state.github.path && state.github.token);
}

async function fetchWorkbookBundle() {
  if (!hasGitHubWriteAccess()) {
    throw new Error("GitHub owner, repo, branch, workbook path, and token are required.");
  }
  if (!window.XLSX) {
    throw new Error("SheetJS could not be loaded.");
  }
  const path = state.github.path.split("/").map(encodeURIComponent).join("/");
  const url = `https://api.github.com/repos/${encodeURIComponent(state.github.owner)}/${encodeURIComponent(
    state.github.repo
  )}/contents/${path}?ref=${encodeURIComponent(state.github.branch)}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${state.github.token}`,
      Accept: "application/vnd.github+json"
    }
  });
  if (!response.ok) {
    throw new Error(`GitHub workbook request failed with status ${response.status}.`);
  }
  const payload = await response.json();
  const bytes = base64ToBytes(payload.content.replace(/\n/g, ""));
  const workbook = XLSX.read(bytes, { type: "array" });
  return { workbook, sha: payload.sha, bytes };
}

async function saveWorkbookBundle(workbook, sha, message) {
  const path = state.github.path.split("/").map(encodeURIComponent).join("/");
  const url = `https://api.github.com/repos/${encodeURIComponent(state.github.owner)}/${encodeURIComponent(
    state.github.repo
  )}/contents/${path}`;
  const bytes = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const content = bytesToBase64(bytes);
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${state.github.token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message,
      content,
      sha,
      branch: state.github.branch
    })
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub workbook update failed: ${response.status} ${text}`);
  }
}

function workbookToData(workbook) {
  const data = {};
  Object.entries(WORKBOOK_HEADERS).forEach(([sheetName, headers]) => {
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) {
      data[sheetName] = [];
      return;
    }
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });
    data[sheetName] = rows.map((row) => {
      const normalized = {};
      headers.forEach((header) => {
        normalized[header] = row[header] ?? "";
      });
      return normalized;
    });
  });
  return data;
}

function writeDataToWorkbook(workbook, data) {
  Object.entries(WORKBOOK_HEADERS).forEach(([sheetName, headers]) => {
    const rows = data[sheetName] || [];
    const matrix = [headers, ...rows.map((row) => headers.map((header) => row[header] ?? ""))];
    const sheet = XLSX.utils.aoa_to_sheet(matrix);
    workbook.Sheets[sheetName] = sheet;
    if (!workbook.SheetNames.includes(sheetName)) {
      workbook.SheetNames.push(sheetName);
    }
  });
}

function organizeWorkbookData(data) {
  return {
    ...data,
    Users: [...data.Users].sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt))),
    Sessions: [...data.Sessions].sort((a, b) => String(b.timestamp).localeCompare(String(a.timestamp))),
    Progress: [...data.Progress].sort((a, b) => String(b.timestamp).localeCompare(String(a.timestamp))),
    Activity: [...data.Activity].sort((a, b) => String(b.timestamp).localeCompare(String(a.timestamp))),
    Meta: data.Meta
  };
}

function createId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`;
}

async function hashText(value) {
  const bytes = new TextEncoder().encode(value);
  const hashBuffer = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(hashBuffer)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function base64ToBytes(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function bytesToBase64(value) {
  const bytes = value instanceof Uint8Array ? value : new Uint8Array(value);
  let binary = "";
  const chunk = 0x8000;
  for (let index = 0; index < bytes.length; index += chunk) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunk));
  }
  return btoa(binary);
}

function downloadBytes(bytes, filename, mimeType) {
  const blob = new Blob([bytes], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function persistPracticeState() {
  saveJson(STORAGE_KEYS.practice, state.practice);
}

function getTeacherById(teacherId) {
  return state.content.teachers.find((teacher) => teacher.teacherId === teacherId) || state.content.teachers[0];
}

function saveJson(key, value) {
  if (value === null || value === undefined) {
    localStorage.removeItem(key);
    return;
  }
  localStorage.setItem(key, JSON.stringify(value));
}

function loadJson(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn(`Could not parse localStorage key ${key}`, error);
    return null;
  }
}

function formatDateTime(value) {
  if (!value) {
    return "Not available";
  }
  return new Date(value).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function showToast(title, message) {
  const stack = document.getElementById("toast-stack");
  if (!stack) {
    return;
  }
  const item = document.createElement("div");
  item.className = "toast";
  item.innerHTML = `<strong>${escapeHtml(title)}</strong><span>${escapeHtml(message)}</span>`;
  stack.appendChild(item);
  window.setTimeout(() => {
    item.classList.add("fade-out");
    window.setTimeout(() => item.remove(), 320);
  }, 3200);
}
