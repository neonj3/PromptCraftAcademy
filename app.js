const modules = [
  {
    id: "module-1",
    title: "1. Prompt Foundations",
    difficulty: "Beginner",
    xp: 100,
    summary: "Learn what makes a prompt useful: clear task, audience, tone, and expected output.",
    concept:
      "A prompt is not just a question. It is an instruction set that helps the model understand the role, task, context, and expected structure of the answer.",
    why:
      "Most weak AI results happen because the request is vague. Better prompts reduce retries and help beginners get dependable outputs faster.",
    pattern:
      "Ask for one task, one audience, one tone, and one format. Think: 'Act as...', 'Do...', 'For...', 'Return as...'.",
    scenario:
      "A school student wants help revising a chapter on climate change before an exam.",
    goal:
      "Rewrite the weak prompt so the AI explains the chapter clearly for a Class 10 student and returns a study-friendly answer.",
    starterPrompt: "Explain climate change.",
    scaffold:
      "Act as a friendly teacher. Explain climate change for a Class 10 student. Use simple language, five bullet points, and end with three quick quiz questions.",
    criteria: [
      { id: "role", label: "Assign a helpful role or angle", keywords: ["act as", "teacher", "tutor", "study coach"] },
      { id: "audience", label: "Specify the learner or audience", keywords: ["class 10", "beginner", "student", "school"] },
      { id: "task", label: "Describe the task clearly", keywords: ["explain", "summarize", "teach", "break down"] },
      { id: "format", label: "Ask for a usable format", keywords: ["bullet", "points", "table", "steps", "quiz"] }
    ],
    takeaway:
      "Real-life use: before asking any assistant for help, write who the answer is for and how you want it structured. That alone often cuts rework in half.",
    outcomes: [
      "Turn vague asks into practical prompts.",
      "Request answers for the right audience level."
    ]
  },
  {
    id: "module-2",
    title: "2. Context and Constraints",
    difficulty: "Beginner",
    xp: 140,
    summary: "Guide the model with enough context and tell it what to avoid.",
    concept:
      "Context is the background the model needs. Constraints are the guardrails that keep the output focused, safe, and useful.",
    why:
      "Without constraints, models often over-explain, invent assumptions, or return output that is too advanced, too long, or off-topic.",
    pattern:
      "Add limits such as word count, reading level, exclusions, and must-have sections. Constraints help the model trade breadth for usefulness.",
    scenario:
      "A small business owner wants Instagram captions for a bakery launch and needs them short, warm, and non-salesy.",
    goal:
      "Turn the starter prompt into a clear request with length, tone, and content constraints.",
    starterPrompt: "Write captions for my bakery launch.",
    scaffold:
      "Write 5 short Instagram captions for a local bakery grand opening. Keep each under 45 words, use a warm tone, mention fresh bakes, and avoid pushy sales language or hashtags.",
    criteria: [
      { id: "context", label: "Mention the bakery or launch context", keywords: ["bakery", "launch", "grand opening", "local"] },
      { id: "length", label: "Control answer length", keywords: ["under", "max", "short", "45 words", "50 words", "60 words"] },
      { id: "tone", label: "Set a tone", keywords: ["warm", "friendly", "playful", "welcoming"] },
      { id: "avoid", label: "Add a must-avoid rule", keywords: ["avoid", "do not", "without", "no hashtags", "not pushy"] }
    ],
    takeaway:
      "Real-life use: if an AI answer feels messy, your first fix is usually not a new tool. It is adding context plus one or two explicit limits.",
    outcomes: [
      "Add constraints that improve quality.",
      "Control tone and length for content tasks."
    ]
  },
  {
    id: "module-3",
    title: "3. Output Design and Evaluation",
    difficulty: "Beginner",
    xp: 170,
    summary: "Learn to ask for structured outputs and score them with a simple rubric.",
    concept:
      "The prompt should define success before the model answers. Output design means choosing the shape of the response. Evaluation means checking if it actually solved the problem.",
    why:
      "If you never define the format, AI answers become harder to verify, compare, or paste into the next step of your workflow.",
    pattern:
      "Ask for sections like summary, risks, assumptions, and next steps. Then review the result against relevance, clarity, completeness, and factual caution.",
    scenario:
      "You are comparing two laptops for a beginner video editor and want a fast decision memo.",
    goal:
      "Rewrite the prompt so the AI returns a comparison table plus a recommendation with reasons and caveats.",
    starterPrompt: "Compare these laptops for me.",
    scaffold:
      "Compare these two laptops for a beginner video editor. Return a table with price, RAM, storage, battery, and editing suitability. Then recommend one option, explain why, and list assumptions or missing information.",
    criteria: [
      { id: "format", label: "Request a structured format", keywords: ["table", "compare", "columns", "pros and cons"] },
      { id: "decision", label: "Ask for a recommendation", keywords: ["recommend", "best choice", "which one"] },
      { id: "reasons", label: "Ask for reasons or criteria", keywords: ["because", "reasons", "criteria", "based on"] },
      { id: "caution", label: "Request assumptions or caveats", keywords: ["assumptions", "caveats", "depends", "if information is missing"] }
    ],
    takeaway:
      "Real-life use: when the result must feed a report, sheet, or decision, ask for structure up front instead of cleaning the answer later.",
    outcomes: [
      "Design outputs for reuse.",
      "Evaluate AI responses with a practical rubric."
    ]
  },
  {
    id: "module-4",
    title: "4. Hallucinations and Verification",
    difficulty: "Intermediate",
    xp: 200,
    summary: "Spot risky answers and force the model to separate facts, assumptions, and unknowns.",
    concept:
      "A hallucination is when the model states something false or unsupported as if it were true. Verification prompts reduce this risk by requiring evidence-aware behavior.",
    why:
      "As you move into research, business writing, or technical tasks, confidence without verification becomes the biggest failure mode.",
    pattern:
      "Tell the model to say what is known, what is uncertain, and what should be checked in a source before acting on the answer.",
    scenario:
      "A student wants the AI to explain a scientific claim found on social media and distinguish fact from hype.",
    goal:
      "Rewrite the prompt so the AI explains the claim carefully, marks uncertainty, and avoids pretending to know unsupported facts.",
    starterPrompt: "Tell me if this science post is true.",
    scaffold:
      "Review this science claim carefully. Separate supported facts, assumptions, and unknowns. If evidence is unclear, say so directly and suggest what sources should be checked before trusting the claim.",
    criteria: [
      { id: "uncertainty", label: "Ask it to label uncertainty", keywords: ["uncertain", "unknown", "not enough information", "confidence"] },
      { id: "verify", label: "Request verification steps", keywords: ["verify", "check sources", "evidence", "cross-check"] },
      { id: "separate", label: "Separate facts from assumptions", keywords: ["facts", "assumptions", "claims", "separate"] },
      { id: "safe", label: "Avoid overclaiming", keywords: ["do not invent", "if unsure", "say so", "avoid making up"] }
    ],
    takeaway:
      "Real-life use: for anything factual, ask the model to surface uncertainty explicitly. That habit makes you safer and much more credible.",
    outcomes: [
      "Recognize hallucination risk.",
      "Prompt for evidence-aware responses."
    ]
  },
  {
    id: "module-5",
    title: "5. Few-shot Prompting and Workflow Chaining",
    difficulty: "Intermediate",
    xp: 230,
    summary: "Show the model examples and break complex work into steps.",
    concept:
      "Few-shot prompting means giving examples of the pattern you want. Workflow chaining means splitting one large task into smaller prompts or ordered subtasks.",
    why:
      "Examples reduce ambiguity, and smaller steps make difficult tasks more reliable than asking for everything at once.",
    pattern:
      "For complex writing or classification, provide one or two examples and ask the model to follow the same format for the new input.",
    scenario:
      "A job seeker wants help turning project notes into strong resume bullets using a consistent style.",
    goal:
      "Rewrite the prompt to include an example bullet pattern and ask the AI to create three matching bullets from rough notes.",
    starterPrompt: "Turn my project notes into resume bullets.",
    scaffold:
      "Use this example format: 'Led X, resulting in Y by doing Z.' First identify the key action, then the impact, then write 3 resume bullets in the same style from my project notes.",
    criteria: [
      { id: "example", label: "Include an example to imitate", keywords: ["example", "sample", "follow this format", "pattern"] },
      { id: "steps", label: "Break the task into steps or sequence", keywords: ["step", "first", "then", "process"] },
      { id: "quantity", label: "Specify how many outputs you want", keywords: ["three", "3", "three bullets"] },
      { id: "impact", label: "Ask for measurable impact or action language", keywords: ["impact", "result", "improved", "increased", "reduced"] }
    ],
    takeaway:
      "Real-life use: if you can show the AI one good example, you can often scale that pattern across many similar tasks.",
    outcomes: [
      "Use examples to shape outputs.",
      "Break work into more reliable AI steps."
    ]
  },
  {
    id: "module-6",
    title: "6. Grounding, RAG Basics, and Responsible Use",
    difficulty: "Intermediate",
    xp: 260,
    summary: "Teach the model to answer from provided material and behave responsibly when it does not know enough.",
    concept:
      "Grounding means forcing the model to rely on trusted source material. In simple terms, this is the idea behind retrieval-augmented generation, or RAG.",
    why:
      "Grounded workflows are what make GenAI useful in support bots, knowledge assistants, and internal tools where correctness matters.",
    pattern:
      "Tell the model to answer only from the provided notes, quote or cite the relevant section, and say when the answer is not present.",
    scenario:
      "You are building an internal HR helper that should answer from the company leave policy and never make up rules.",
    goal:
      "Rewrite the prompt so the assistant uses only the supplied policy text, cites the matching section, and refuses to guess when the answer is missing.",
    starterPrompt: "Answer employee leave questions.",
    scaffold:
      "Answer employee leave questions using only the provided policy text. Cite the exact section used. If the answer is missing from the policy, say that clearly and ask for more context instead of guessing.",
    criteria: [
      { id: "source", label: "Limit the model to provided material", keywords: ["only use", "provided policy", "source text", "based only on"] },
      { id: "cite", label: "Ask for citations or section references", keywords: ["cite", "section", "quote", "reference"] },
      { id: "fallback", label: "Define what happens if information is missing", keywords: ["if not found", "say not found", "do not guess", "ask for more context"] },
      { id: "responsible", label: "Add a safety or policy boundary", keywords: ["policy", "sensitive", "responsible", "avoid legal advice"] }
    ],
    takeaway:
      "Real-life use: grounded prompts are the bridge from casual AI use to production-ready assistants. They make responses more traceable and safer.",
    outcomes: [
      "Understand simple RAG behavior.",
      "Design safer assistants for real workflows."
    ]
  }
];

const DB_NAME = "promptcraft_academy_db";
const DB_VERSION = 1;
const SESSION_KEY = "promptcraft-current-user-id";
const EXPORT_TYPE = "export";

const state = {
  db: null,
  currentUser: null,
  activeModuleId: modules[0].id,
  xp: 0,
  completed: {},
  streak: 0,
  lastCompletedAt: null,
  draftByModule: {},
  authMode: "register",
  popupShown: false
};

const elements = {
  moduleTitle: document.getElementById("module-title"),
  moduleDifficulty: document.getElementById("module-difficulty"),
  moduleSummary: document.getElementById("module-summary"),
  conceptText: document.getElementById("concept-text"),
  whyText: document.getElementById("why-text"),
  patternText: document.getElementById("pattern-text"),
  missionTitle: document.getElementById("mission-title"),
  missionXp: document.getElementById("mission-xp"),
  scenarioText: document.getElementById("scenario-text"),
  goalText: document.getElementById("goal-text"),
  criteriaList: document.getElementById("criteria-list"),
  starterPrompt: document.getElementById("starter-prompt"),
  promptEditor: document.getElementById("prompt-editor"),
  feedbackScore: document.getElementById("feedback-score"),
  feedbackPoints: document.getElementById("feedback-points"),
  missionMap: document.getElementById("mission-map"),
  reflectionBox: document.getElementById("reflection-box"),
  outcomesList: document.getElementById("outcomes-list"),
  xpValue: document.getElementById("xp-value"),
  levelValue: document.getElementById("level-value"),
  completedValue: document.getElementById("completed-value"),
  streakValue: document.getElementById("streak-value"),
  xpBar: document.getElementById("xp-bar"),
  progressSummary: document.getElementById("progress-summary"),
  resetButton: document.getElementById("reset-progress"),
  authTitle: document.getElementById("auth-title"),
  authSubtitle: document.getElementById("auth-subtitle"),
  authBadge: document.getElementById("auth-badge"),
  logoutButton: document.getElementById("logout-button"),
  openRegister: document.getElementById("open-register"),
  openLogin: document.getElementById("open-login"),
  exportExcel: document.getElementById("export-excel"),
  exportJson: document.getElementById("export-json"),
  exportStatus: document.getElementById("export-status"),
  analyticsUsers: document.getElementById("analytics-users"),
  analyticsAttempts: document.getElementById("analytics-attempts"),
  analyticsPasses: document.getElementById("analytics-passes"),
  analyticsExports: document.getElementById("analytics-exports"),
  coachTitle: document.getElementById("coach-title"),
  coachSummary: document.getElementById("coach-summary"),
  coachPoints: document.getElementById("coach-points"),
  draftMeter: document.getElementById("draft-meter"),
  activityFeed: document.getElementById("activity-feed"),
  authModal: document.getElementById("auth-modal"),
  modalMessage: document.getElementById("modal-message"),
  modalHeading: document.getElementById("modal-heading"),
  authForm: document.getElementById("auth-form"),
  authName: document.getElementById("auth-name"),
  authEmail: document.getElementById("auth-email"),
  authPassword: document.getElementById("auth-password"),
  passwordHint: document.getElementById("password-hint"),
  submitAuth: document.getElementById("submit-auth"),
  switchRegister: document.getElementById("switch-register"),
  switchLogin: document.getElementById("switch-login"),
  closeModal: document.getElementById("close-modal"),
  toastStack: document.getElementById("toast-stack"),
  surprisePrompt: document.getElementById("surprise-prompt"),
  evaluatePrompt: document.getElementById("evaluate-prompt"),
  useStarter: document.getElementById("use-starter")
};

function getDefaultProgress() {
  return {
    activeModuleId: modules[0].id,
    xp: 0,
    completed: {},
    streak: 0,
    lastCompletedAt: null,
    draftByModule: {}
  };
}

function applyProgress(progress) {
  state.activeModuleId = progress.activeModuleId || modules[0].id;
  state.xp = Number(progress.xp) || 0;
  state.completed = progress.completed || {};
  state.streak = Number(progress.streak) || 0;
  state.lastCompletedAt = progress.lastCompletedAt || null;
  state.draftByModule = progress.draftByModule || {};
}

function resetStateProgress() {
  applyProgress(getDefaultProgress());
}

function getActiveModule() {
  return modules.find((module) => module.id === state.activeModuleId) || modules[0];
}

function getLevelLabel(xp) {
  if (xp >= 700) return "Workflow Architect";
  if (xp >= 450) return "Prompt Builder";
  if (xp >= 220) return "Applied Learner";
  if (xp >= 80) return "Explorer";
  return "Starter";
}

function getCompletionCount() {
  return Object.values(state.completed).filter(Boolean).length;
}

function showToast(title, message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<strong>${title}</strong><span>${message}</span>`;
  elements.toastStack.appendChild(toast);

  window.setTimeout(() => {
    toast.remove();
  }, 3600);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains("users")) {
        const users = db.createObjectStore("users", { keyPath: "id" });
        users.createIndex("email", "email", { unique: true });
      }

      if (!db.objectStoreNames.contains("progress")) {
        db.createObjectStore("progress", { keyPath: "userId" });
      }

      if (!db.objectStoreNames.contains("activity")) {
        const activity = db.createObjectStore("activity", { keyPath: "id", autoIncrement: true });
        activity.createIndex("userId", "userId", { unique: false });
        activity.createIndex("type", "type", { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function requestToPromise(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function withStore(storeNames, mode, executor) {
  return new Promise((resolve, reject) => {
    const transaction = state.db.transaction(storeNames, mode);
    const stores = Array.isArray(storeNames)
      ? storeNames.map((name) => transaction.objectStore(name))
      : transaction.objectStore(storeNames);

    let result;

    transaction.oncomplete = () => resolve(result);
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);

    result = executor(stores, transaction);
  });
}

async function getUserByEmail(email) {
  return withStore("users", "readonly", (store) => requestToPromise(store.index("email").get(email.toLowerCase())));
}

async function getUserById(userId) {
  return withStore("users", "readonly", (store) => requestToPromise(store.get(userId)));
}

async function saveUser(user) {
  return withStore("users", "readwrite", (store) => requestToPromise(store.put(user)));
}

async function saveProgressRecord(progress) {
  return withStore("progress", "readwrite", (store) => requestToPromise(store.put(progress)));
}

async function getProgressRecord(userId) {
  return withStore("progress", "readonly", (store) => requestToPromise(store.get(userId)));
}

async function addActivity(activity) {
  return withStore("activity", "readwrite", (store) => requestToPromise(store.add(activity)));
}

async function getAllFromStore(storeName) {
  return withStore(storeName, "readonly", (store) => requestToPromise(store.getAll()));
}

async function getActivityByUser(userId) {
  return withStore("activity", "readonly", (store) => requestToPromise(store.index("userId").getAll(userId)));
}

async function hashPassword(password) {
  const buffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password));
  return Array.from(new Uint8Array(buffer))
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("");
}

function formatDate(dateValue) {
  const value = typeof dateValue === "string" ? new Date(dateValue) : dateValue;
  return value.toLocaleString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

async function recordActivity(type, payload = {}) {
  if (!state.currentUser) {
    return;
  }

  const activity = {
    userId: state.currentUser.id,
    userName: state.currentUser.name,
    type,
    moduleId: payload.moduleId || null,
    moduleTitle: payload.moduleTitle || null,
    score: payload.score ?? null,
    status: payload.status || null,
    promptPreview: payload.promptPreview || "",
    createdAt: new Date().toISOString()
  };

  await addActivity(activity);
}

async function persistProgress() {
  if (!state.currentUser) {
    return;
  }

  const progress = {
    userId: state.currentUser.id,
    activeModuleId: state.activeModuleId,
    xp: state.xp,
    completed: state.completed,
    streak: state.streak,
    lastCompletedAt: state.lastCompletedAt,
    draftByModule: state.draftByModule,
    updatedAt: new Date().toISOString()
  };

  await saveProgressRecord(progress);
}

async function loadUserProgress(userId) {
  const progress = await getProgressRecord(userId);
  applyProgress(progress || getDefaultProgress());
}

async function updateCurrentUser(user) {
  state.currentUser = user;
  if (user) {
    localStorage.setItem(SESSION_KEY, user.id);
    await loadUserProgress(user.id);
  } else {
    localStorage.removeItem(SESSION_KEY);
    resetStateProgress();
  }
  renderAuthState();
  render();
  await renderAnalytics();
  await renderActivityFeed();
}

async function restoreSession() {
  const userId = localStorage.getItem(SESSION_KEY);
  if (!userId) {
    renderAuthState();
    render();
    await renderAnalytics();
    await renderActivityFeed();
    return;
  }

  const user = await getUserById(userId);
  if (!user) {
    localStorage.removeItem(SESSION_KEY);
    renderAuthState();
    render();
    await renderAnalytics();
    await renderActivityFeed();
    return;
  }

  state.currentUser = user;
  await loadUserProgress(user.id);
  renderAuthState();
  render();
  await renderAnalytics();
  await renderActivityFeed();
}

function renderAuthState() {
  if (state.currentUser) {
    elements.authTitle.textContent = `Welcome, ${state.currentUser.name}`;
    elements.authSubtitle.textContent = `Logged in as ${state.currentUser.email}. Your progress, attempts, and exports are now saved in the browser database on this device.`;
    elements.authBadge.textContent = "Signed In";
    elements.logoutButton.classList.remove("hidden");
  } else {
    elements.authTitle.textContent = "Guest Mode";
    elements.authSubtitle.textContent = "Explore freely, then register to save progress, login on this device, and export your learning data to Excel.";
    elements.authBadge.textContent = "Browser Auth";
    elements.logoutButton.classList.add("hidden");
  }
}

function updateProgressUI() {
  const completionCount = getCompletionCount();
  const total = modules.length;
  const currentLevel = getLevelLabel(state.xp);
  const progressPercent = Math.min((state.xp / 900) * 100, 100);

  elements.xpValue.textContent = state.xp;
  elements.levelValue.textContent = currentLevel;
  elements.completedValue.textContent = `${completionCount}/${total}`;
  elements.streakValue.textContent = state.streak;
  elements.xpBar.style.width = `${progressPercent}%`;

  if (!state.currentUser) {
    elements.progressSummary.textContent = "Preview mode is active. Register to save progress and export your data.";
  } else if (completionCount === 0) {
    elements.progressSummary.textContent = "Finish your first mission to unlock deeper lessons.";
  } else if (completionCount === total) {
    elements.progressSummary.textContent = "All missions complete. Replay modules to strengthen your real-world prompting habits.";
  } else {
    elements.progressSummary.textContent =
      `You have completed ${completionCount} mission${completionCount > 1 ? "s" : ""}. Keep going to unlock intermediate concepts like verification and grounding.`;
  }
}

function renderMissionMap() {
  elements.missionMap.innerHTML = "";

  modules.forEach((module, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "mission-node";
    if (module.id === state.activeModuleId) {
      card.classList.add("active");
    }
    if (state.completed[module.id]) {
      card.classList.add("complete");
    }

    const status = state.completed[module.id] ? "Complete" : "Open";
    card.innerHTML = `
      <div class="node-topline">
        <span class="node-title">${module.title}</span>
        <span class="chip">${status}</span>
      </div>
      <p class="node-meta">${module.difficulty} · ${module.xp} XP</p>
      <p>${module.summary}</p>
    `;

    card.addEventListener("click", async () => {
      persistDraft();
      state.activeModuleId = module.id;
      await persistProgress();
      render();
      const isFirstVisit = index > 0 && !state.completed[modules[index - 1].id];
      if (isFirstVisit) {
        elements.feedbackScore.textContent = "Tip: you can jump ahead, but the modules build on each other.";
      }
    });

    elements.missionMap.appendChild(card);
  });
}

function renderOutcomes(module) {
  elements.outcomesList.innerHTML = "";
  module.outcomes.forEach((outcome) => {
    const item = document.createElement("li");
    item.textContent = outcome;
    elements.outcomesList.appendChild(item);
  });
}

function getCurrentDraftForModule(module) {
  return state.draftByModule[module.id] || module.starterPrompt;
}

function renderModuleDetails(module) {
  elements.moduleTitle.textContent = module.title;
  elements.moduleDifficulty.textContent = module.difficulty;
  elements.moduleSummary.textContent = module.summary;
  elements.conceptText.textContent = module.concept;
  elements.whyText.textContent = module.why;
  elements.patternText.textContent = module.pattern;
  elements.missionTitle.textContent = module.title;
  elements.missionXp.textContent = `+${module.xp} XP`;
  elements.scenarioText.textContent = module.scenario;
  elements.goalText.textContent = module.goal;
  elements.starterPrompt.textContent = module.starterPrompt;
  elements.criteriaList.innerHTML = "";

  module.criteria.forEach((criterion) => {
    const item = document.createElement("li");
    item.textContent = criterion.label;
    elements.criteriaList.appendChild(item);
  });

  renderOutcomes(module);

  elements.promptEditor.value = getCurrentDraftForModule(module);
  elements.promptEditor.dataset.moduleId = module.id;

  elements.reflectionBox.textContent = state.completed[module.id]
    ? module.takeaway
    : "Complete this mission to unlock the practical takeaway for real-world use.";
}

function containsKeywordGroup(text, group) {
  const normalizedText = text.toLowerCase();
  return group.some((keyword) => normalizedText.includes(keyword));
}

function getDraftSignals(module, draft) {
  const normalizedPrompt = draft.trim();
  const totalWords = normalizedPrompt ? normalizedPrompt.split(/\s+/).length : 0;
  const notes = [];
  let hits = 0;

  module.criteria.forEach((criterion) => {
    const matched = containsKeywordGroup(normalizedPrompt, criterion.keywords);
    if (matched) {
      hits += 1;
      notes.push(`You already covered ${criterion.label.toLowerCase()}.`);
    } else {
      notes.push(`Try adding ${criterion.label.toLowerCase()}.`);
    }
  });

  if (totalWords >= 18) {
    hits += 0.5;
    notes.push("Good: the draft has enough detail to reduce ambiguity.");
  } else {
    notes.push("Add a bit more detail so the AI knows the intended outcome.");
  }

  if (containsKeywordGroup(normalizedPrompt, ["bullet", "table", "steps", "json", "format", "sections"])) {
    hits += 0.5;
    notes.push("Nice: you asked for a response format.");
  } else {
    notes.push("Consider asking for bullets, a table, or another specific output format.");
  }

  const percentage = Math.round(Math.min(hits / (module.criteria.length + 1), 1) * 100);
  return {
    percentage,
    notes
  };
}

function updateCoach() {
  const module = getActiveModule();
  const draft = elements.promptEditor.value;
  const signals = getDraftSignals(module, draft);
  elements.draftMeter.style.width = `${signals.percentage}%`;

  if (signals.percentage >= 80) {
    elements.coachTitle.textContent = "Prompt power meter";
    elements.coachSummary.textContent = "This draft is looking strong and reusable.";
  } else if (signals.percentage >= 50) {
    elements.coachTitle.textContent = "Prompt power meter";
    elements.coachSummary.textContent = "You have a solid start. Add a few guardrails and a stronger format.";
  } else {
    elements.coachTitle.textContent = "Prompt power meter";
    elements.coachSummary.textContent = "This prompt is still vague. Add role, audience, constraints, and structure.";
  }

  elements.coachPoints.innerHTML = "";
  signals.notes.slice(0, 4).forEach((note) => {
    const item = document.createElement("li");
    item.textContent = note;
    elements.coachPoints.appendChild(item);
  });
}

function evaluatePrompt(module, prompt) {
  const normalizedPrompt = prompt.trim();
  const notes = [];
  let hits = 0;

  if (normalizedPrompt.length < 40) {
    notes.push("Your rewrite is still very short. Add more guidance so the model knows exactly what good output looks like.");
  }

  module.criteria.forEach((criterion) => {
    if (containsKeywordGroup(normalizedPrompt, criterion.keywords)) {
      hits += 1;
      notes.push(`Strong: you covered "${criterion.label.toLowerCase()}".`);
    } else {
      notes.push(`Missing: add something that covers "${criterion.label.toLowerCase()}".`);
    }
  });

  const structureSignals = ["bullet", "table", "steps", "sections", "json", "format"];
  const hasStructure = containsKeywordGroup(normalizedPrompt, structureSignals);
  const hasContextWords = normalizedPrompt.split(/\s+/).length >= 18;

  if (hasStructure) {
    hits += 0.5;
    notes.push("Bonus: you specified a response structure, which makes answers easier to reuse.");
  }

  if (hasContextWords) {
    hits += 0.5;
    notes.push("Bonus: the prompt includes enough detail to reduce ambiguity.");
  }

  const maxScore = module.criteria.length + 1;
  const rawScore = Math.min(hits / maxScore, 1);
  const percentage = Math.round(rawScore * 100);

  let verdict = "Needs work";
  if (percentage >= 85) verdict = "Excellent";
  else if (percentage >= 65) verdict = "Strong";
  else if (percentage >= 45) verdict = "Good start";

  return {
    percentage,
    verdict,
    notes
  };
}

function updateStreak() {
  const today = new Date().toISOString().slice(0, 10);
  if (state.lastCompletedAt === today) {
    return;
  }

  const previous = state.lastCompletedAt ? new Date(state.lastCompletedAt) : null;
  const current = new Date(today);

  if (!previous) {
    state.streak = 1;
  } else {
    const diffDays = Math.round((current - previous) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      state.streak += 1;
    } else if (diffDays > 1) {
      state.streak = 1;
    }
  }

  state.lastCompletedAt = today;
}

async function applyMissionRewards(module, score, prompt) {
  const passed = score.percentage >= 65;
  const alreadyCompleted = Boolean(state.completed[module.id]);

  if (passed && !alreadyCompleted) {
    state.xp += module.xp;
    state.completed[module.id] = true;
    updateStreak();
    elements.reflectionBox.textContent = module.takeaway;
  } else if (passed) {
    updateStreak();
  }

  await recordActivity("evaluation", {
    moduleId: module.id,
    moduleTitle: module.title,
    score: score.percentage,
    status: passed ? "pass" : "retry",
    promptPreview: prompt.slice(0, 150)
  });

  await persistProgress();
  await renderAnalytics();
  await renderActivityFeed();

  if (passed) {
    showToast("Mission cleared", `${module.title} passed with ${score.percentage}/100.`);
  } else {
    showToast("Keep refining", "You are close. Use the coach tips and try again.");
  }
}

function renderFeedback(score) {
  elements.feedbackScore.textContent = `${score.verdict} · ${score.percentage}/100`;
  elements.feedbackPoints.innerHTML = "";

  score.notes.forEach((note) => {
    const item = document.createElement("li");
    item.textContent = note;
    elements.feedbackPoints.appendChild(item);
  });
}

function render() {
  const module = getActiveModule();
  renderMissionMap();
  renderModuleDetails(module);
  updateProgressUI();
  updateCoach();
}

function persistDraft() {
  const moduleId = elements.promptEditor.dataset.moduleId || state.activeModuleId;
  state.draftByModule[moduleId] = elements.promptEditor.value;
}

function openAuthModal(mode = "register", message = "") {
  state.authMode = mode;
  renderAuthMode();
  elements.modalMessage.textContent = message || "Create an account to save progress on this device, unlock login, and export users plus activity into Excel.";
  elements.authModal.classList.remove("hidden");
  elements.authModal.setAttribute("aria-hidden", "false");
}

function closeAuthModal() {
  elements.authModal.classList.add("hidden");
  elements.authModal.setAttribute("aria-hidden", "true");
  elements.authForm.reset();
}

function renderAuthMode() {
  const registerMode = state.authMode === "register";
  elements.switchRegister.classList.toggle("active", registerMode);
  elements.switchLogin.classList.toggle("active", !registerMode);
  elements.authName.parentElement?.classList?.remove("hidden");
  elements.authName.previousElementSibling?.classList?.remove("hidden");

  if (registerMode) {
    elements.modalHeading.textContent = "Register to save your learning trail";
    elements.submitAuth.textContent = "Create account";
    elements.authName.required = true;
    elements.authName.previousElementSibling.classList.remove("hidden");
    elements.authName.classList.remove("hidden");
    elements.passwordHint.textContent = "Use at least 8 characters. This is browser-side demo auth suitable for static GitHub deployment.";
  } else {
    elements.modalHeading.textContent = "Login to continue learning";
    elements.submitAuth.textContent = "Login";
    elements.authName.required = false;
    elements.authName.previousElementSibling.classList.add("hidden");
    elements.authName.classList.add("hidden");
    elements.passwordHint.textContent = "Your credentials are checked in the browser database on this device.";
  }
}

async function handleRegister(name, email, password) {
  const existing = await getUserByEmail(email);
  if (existing) {
    throw new Error("An account with this email already exists on this device.");
  }

  const now = new Date().toISOString();
  const user = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: email.toLowerCase(),
    passwordHash: await hashPassword(password),
    createdAt: now,
    lastLoginAt: now
  };

  await saveUser(user);
  await saveProgressRecord({
    userId: user.id,
    ...getDefaultProgress(),
    updatedAt: now
  });
  await recordActivityForNewUser(user);
  await updateCurrentUser(user);
  closeAuthModal();
  showToast("Registration complete", "Your account has been created and progress saving is now active.");
}

async function recordActivityForNewUser(user) {
  const previousUser = state.currentUser;
  state.currentUser = user;
  await recordActivity("registration", {
    status: "created",
    promptPreview: "New learner registered."
  });
  state.currentUser = previousUser;
}

async function handleLogin(email, password) {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("No account was found with that email on this device.");
  }

  const passwordHash = await hashPassword(password);
  if (passwordHash !== user.passwordHash) {
    throw new Error("Incorrect password. Please try again.");
  }

  user.lastLoginAt = new Date().toISOString();
  await saveUser(user);
  await updateCurrentUser(user);
  await recordActivity("login", {
    status: "success",
    promptPreview: "Learner logged in."
  });
  closeAuthModal();
  showToast("Welcome back", `Logged in as ${user.name}.`);
}

async function handleLogout() {
  await updateCurrentUser(null);
  showToast("Logged out", "You are now back in guest mode.");
}

async function renderAnalytics() {
  const users = await getAllFromStore("users");
  const activity = await getAllFromStore("activity");
  const attempts = activity.filter((item) => item.type === "evaluation").length;
  const passes = activity.filter((item) => item.type === "evaluation" && item.status === "pass").length;
  const exports = activity.filter((item) => item.type === EXPORT_TYPE).length;

  elements.analyticsUsers.textContent = String(users.length);
  elements.analyticsAttempts.textContent = String(attempts);
  elements.analyticsPasses.textContent = String(passes);
  elements.analyticsExports.textContent = String(exports);
}

async function renderActivityFeed() {
  if (!state.currentUser) {
    elements.activityFeed.textContent = "Register or login to start building an activity history.";
    return;
  }

  const rows = await getActivityByUser(state.currentUser.id);
  const latest = rows.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6);
  if (!latest.length) {
    elements.activityFeed.textContent = "Your activity will appear here once you start learning.";
    return;
  }

  elements.activityFeed.innerHTML = "";
  latest.forEach((entry) => {
    const item = document.createElement("article");
    item.className = "activity-item";
    item.innerHTML = `
      <div class="activity-head">
        <span class="activity-pill">${entry.type}</span>
        <span class="activity-time">${formatDate(entry.createdAt)}</span>
      </div>
      <strong>${entry.moduleTitle || "Account activity"}</strong>
      <p>${entry.promptPreview || "Activity recorded in the browser database."}</p>
    `;
    elements.activityFeed.appendChild(item);
  });
}

async function exportDatabaseToExcel() {
  if (!window.XLSX) {
    throw new Error("Excel export library is not available.");
  }

  const users = await getAllFromStore("users");
  const progress = await getAllFromStore("progress");
  const activity = await getAllFromStore("activity");

  const workbook = XLSX.utils.book_new();
  const usersSheet = XLSX.utils.json_to_sheet(users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    lastLoginAt: user.lastLoginAt
  })));
  const progressSheet = XLSX.utils.json_to_sheet(progress.map((row) => ({
    userId: row.userId,
    activeModuleId: row.activeModuleId,
    xp: row.xp,
    completedCount: Object.values(row.completed || {}).filter(Boolean).length,
    streak: row.streak,
    lastCompletedAt: row.lastCompletedAt,
    updatedAt: row.updatedAt
  })));
  const activitySheet = XLSX.utils.json_to_sheet(activity.map((row) => ({
    id: row.id,
    userId: row.userId,
    userName: row.userName,
    type: row.type,
    moduleId: row.moduleId,
    moduleTitle: row.moduleTitle,
    score: row.score,
    status: row.status,
    promptPreview: row.promptPreview,
    createdAt: row.createdAt
  })));

  XLSX.utils.book_append_sheet(workbook, usersSheet, "Users");
  XLSX.utils.book_append_sheet(workbook, progressSheet, "Progress");
  XLSX.utils.book_append_sheet(workbook, activitySheet, "Activity");

  XLSX.writeFile(workbook, "promptcraft-academy-data.xlsx");

  if (state.currentUser) {
    await recordActivity(EXPORT_TYPE, {
      status: "xlsx",
      promptPreview: "Excel workbook exported."
    });
  }

  elements.exportStatus.textContent = "Export complete. The workbook includes Users, Progress, and Activity sheets.";
  await renderAnalytics();
  await renderActivityFeed();
  showToast("Excel exported", "Your browser database has been copied into an Excel workbook.");
}

async function exportDatabaseToJson() {
  const users = await getAllFromStore("users");
  const progress = await getAllFromStore("progress");
  const activity = await getAllFromStore("activity");
  const blob = new Blob([JSON.stringify({ users, progress, activity }, null, 2)], {
    type: "application/json"
  });

  downloadBlob(blob, "promptcraft-academy-data.json");

  if (state.currentUser) {
    await recordActivity(EXPORT_TYPE, {
      status: "json",
      promptPreview: "JSON export downloaded."
    });
  }

  elements.exportStatus.textContent = "JSON export complete. Use this if you want a raw database backup.";
  await renderAnalytics();
  await renderActivityFeed();
  showToast("JSON exported", "A raw backup of the browser database was downloaded.");
}

async function resetProgress() {
  resetStateProgress();
  await persistProgress();
  render();
  await recordActivity("reset", {
    status: "progress_reset",
    promptPreview: "Progress was reset by the learner."
  });
  await renderAnalytics();
  await renderActivityFeed();
  showToast("Progress reset", "The learner profile has been reset for this account.");
}

function maybeOpenTimedPopup() {
  if (state.currentUser || state.popupShown) {
    return;
  }

  state.popupShown = true;
  window.setTimeout(() => {
    if (!state.currentUser) {
      openAuthModal("register", "Register in a few seconds and you can keep your progress, login later on this device, and export your database to Excel.");
    }
  }, 3500);
}

async function initializeApp() {
  state.db = await openDatabase();
  await restoreSession();
  maybeOpenTimedPopup();
}

elements.useStarter.addEventListener("click", async () => {
  const module = getActiveModule();
  elements.promptEditor.value = module.starterPrompt;
  persistDraft();
  updateCoach();
  await persistProgress();
  elements.feedbackScore.textContent = "Starter prompt restored. Now improve it.";
  elements.feedbackPoints.innerHTML = "";
});

elements.surprisePrompt.addEventListener("click", async () => {
  const module = getActiveModule();
  elements.promptEditor.value = module.scaffold;
  persistDraft();
  updateCoach();
  await persistProgress();
  showToast("Scaffold added", "A stronger prompt template has been inserted for this mission.");
});

elements.promptEditor.addEventListener("input", async () => {
  persistDraft();
  updateCoach();
  if (state.currentUser) {
    await persistProgress();
  }
});

elements.evaluatePrompt.addEventListener("click", async () => {
  if (!state.currentUser) {
    openAuthModal("register", "Please register or login before evaluating missions so your results can be saved to the browser database and exported later.");
    showToast("Account needed", "Login or register to save progress and use the activity database.");
    return;
  }

  const module = getActiveModule();
  const prompt = elements.promptEditor.value;
  const score = evaluatePrompt(module, prompt);
  renderFeedback(score);
  await applyMissionRewards(module, score, prompt);
  renderMissionMap();
  updateProgressUI();
});

elements.resetButton.addEventListener("click", async () => {
  if (!state.currentUser) {
    resetStateProgress();
    render();
    showToast("Preview reset", "Guest progress was reset.");
    return;
  }

  await resetProgress();
});

elements.openRegister.addEventListener("click", () => openAuthModal("register"));
elements.openLogin.addEventListener("click", () => openAuthModal("login"));
elements.logoutButton.addEventListener("click", async () => handleLogout());

elements.switchRegister.addEventListener("click", () => {
  state.authMode = "register";
  renderAuthMode();
});

elements.switchLogin.addEventListener("click", () => {
  state.authMode = "login";
  renderAuthMode();
});

elements.closeModal.addEventListener("click", closeAuthModal);

elements.authModal.addEventListener("click", (event) => {
  const target = event.target;
  if (target instanceof HTMLElement && target.dataset.closeModal === "true") {
    closeAuthModal();
  }
});

elements.authForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = elements.authName.value.trim();
  const email = elements.authEmail.value.trim();
  const password = elements.authPassword.value.trim();

  if (!email || !password) {
    showToast("Missing details", "Email and password are required.");
    return;
  }

  if (state.authMode === "register" && password.length < 8) {
    showToast("Password too short", "Use at least 8 characters for registration.");
    return;
  }

  try {
    if (state.authMode === "register") {
      if (!name) {
        showToast("Name required", "Please add your name before registering.");
        return;
      }
      await handleRegister(name, email, password);
    } else {
      await handleLogin(email, password);
    }
  } catch (error) {
    showToast("Authentication error", error.message);
  }
});

elements.exportExcel.addEventListener("click", async () => {
  try {
    await exportDatabaseToExcel();
  } catch (error) {
    showToast("Export failed", error.message);
  }
});

elements.exportJson.addEventListener("click", async () => {
  try {
    await exportDatabaseToJson();
  } catch (error) {
    showToast("Export failed", error.message);
  }
});

initializeApp().catch((error) => {
  console.error(error);
  showToast("Startup error", "The browser database could not be initialized.");
});
