// ============================================
// TYPES
// ============================================

interface CounterSession {
  id: string;
  count: number;
  category: string;
  description: string;
  createdAt: string;
}

// ============================================
// STORAGE
// ============================================

const STORAGE_KEY = "counter-pwa-sessions";
const THEME_KEY = "counter-pwa-theme";

// ============================================
// APP STATE
// ============================================

let count = 0;
let step = 1;
let currentCategory = "عام";

let sessions: CounterSession[] = [];

const categories = ["عام", "رياضة", "أهداف"];

// ============================================
// DOM ELEMENTS
// ============================================

// Counter
const counterDisplay = document.getElementById(
  "counter-display",
) as HTMLDivElement;

const incrementBtn = document.getElementById(
  "btn-increment",
) as HTMLButtonElement;

const decrementBtn = document.getElementById(
  "btn-decrement",
) as HTMLButtonElement;

const resetBtn = document.getElementById("btn-reset") as HTMLButtonElement;

// Save
const saveBtn = document.getElementById("btn-save") as HTMLButtonElement;

// Description
const descriptionInput = document.getElementById(
  "session-description",
) as HTMLTextAreaElement;

// Categories
const categoryPills = document.getElementById(
  "category-pills",
) as HTMLDivElement;

// History
const historyList = document.getElementById("history-list") as HTMLDivElement;

const emptyState = document.getElementById("empty-state") as HTMLDivElement;

const clearHistoryBtn = document.getElementById(
  "btn-clear-history",
) as HTMLButtonElement;

const historyBadge = document.getElementById(
  "history-badge",
) as HTMLSpanElement;

// Template
const historyTemplate = document.getElementById(
  "history-card-template",
) as HTMLTemplateElement;

// Toast
const toast = document.getElementById("toast") as HTMLDivElement;

// Tabs
const tabButtons = document.querySelectorAll(".tab-btn");

const tabPanels = document.querySelectorAll(".tab-panel");

// Theme
const themeBtn = document.getElementById("btn-theme") as HTMLButtonElement;

const moonIcon = document.getElementById("icon-moon") as HTMLElement;

const sunIcon = document.getElementById("icon-sun") as HTMLElement;

// Steps
const stepButtons = document.querySelectorAll(".step-btn");

// ============================================
// COUNTER RENDER
// ============================================

function renderCounter(): void {
  counterDisplay.textContent = count.toString();

  counterDisplay.classList.remove("bump");

  void counterDisplay.offsetWidth;

  counterDisplay.classList.add("bump");
}

// ============================================
// TOAST
// ============================================

function showToast(message: string): void {
  toast.textContent = message;

  toast.classList.remove("opacity-0", "translate-y-2");

  toast.classList.add("opacity-100", "translate-y-0");

  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-2");
  }, 2200);
}

// ============================================
// CATEGORY PILLS
// ============================================

function renderCategories(): void {
  categoryPills.innerHTML = "";

  categories.forEach((category) => {
    const button = document.createElement("button");

    button.textContent = category;

    button.className =
      "category-pill px-4 py-2 rounded-xl border border-slate-700 text-sm font-semibold transition-all";

    if (category === currentCategory) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      currentCategory = category;

      renderCategories();
    });

    categoryPills.appendChild(button);
  });
}

// ============================================
// STORAGE
// ============================================

function saveSessions(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

function loadSessions(): void {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    sessions = [];
    return;
  }

  sessions = JSON.parse(data);
}

// ============================================
// HISTORY BADGE
// ============================================

function renderHistoryBadge(): void {
  if (sessions.length === 0) {
    historyBadge.classList.add("hidden");
    return;
  }

  historyBadge.classList.remove("hidden");

  historyBadge.textContent = sessions.length.toString();
}

// ============================================
// HISTORY RENDER
// ============================================

function renderHistory(): void {
  historyList.innerHTML = "";

  if (sessions.length === 0) {
    emptyState.classList.remove("hidden");

    renderHistoryBadge();

    return;
  }

  emptyState.classList.add("hidden");

  const reversedSessions = [...sessions].reverse();

  reversedSessions.forEach((session) => {
    const template = historyTemplate.content.cloneNode(
      true,
    ) as DocumentFragment;

    const card = template.querySelector(".history-card") as HTMLElement;

    const category = template.querySelector(
      ".card-category",
    ) as HTMLSpanElement;

    const date = template.querySelector(".card-date") as HTMLTimeElement;

    const description = template.querySelector(
      ".card-description",
    ) as HTMLParagraphElement;

    const value = template.querySelector(".card-value") as HTMLDivElement;

    const deleteBtn = template.querySelector(
      ".btn-delete-card",
    ) as HTMLButtonElement;

    category.textContent = session.category;

    value.textContent = session.count.toString();

    description.textContent = session.description || "بدون وصف";

    date.textContent = new Date(session.createdAt).toLocaleString("ar-EG");

    deleteBtn.addEventListener("click", () => {
      deleteSession(session.id);
    });

    historyList.appendChild(card);
  });

  renderHistoryBadge();
}

// ============================================
// CREATE SESSION
// ============================================

function createSession(): CounterSession {
  return {
    id: crypto.randomUUID(),
    count,
    category: currentCategory,
    description: descriptionInput.value.trim(),
    createdAt: new Date().toISOString(),
  };
}

// ============================================
// SAVE SESSION
// ============================================

function saveCurrentSession(): void {
  const session = createSession();

  sessions.push(session);

  saveSessions();

  renderHistory();

  showToast("تم حفظ الجلسة بنجاح");

  resetCurrentSession();
}

// ============================================
// DELETE SESSION
// ============================================

function deleteSession(id: string): void {
  sessions = sessions.filter((session) => session.id !== id);

  saveSessions();

  renderHistory();

  showToast("تم حذف الجلسة");
}

// ============================================
// CLEAR HISTORY
// ============================================

function clearHistory(): void {
  const confirmed = confirm("هل تريد حذف جميع الجلسات؟");

  if (!confirmed) {
    return;
  }

  sessions = [];

  saveSessions();

  renderHistory();

  showToast("تم مسح السجل");
}

// ============================================
// RESET CURRENT SESSION
// ============================================

function resetCurrentSession(): void {
  count = 0;

  currentCategory = "عام";

  descriptionInput.value = "";

  renderCounter();

  renderCategories();
}

// ============================================
// THEME
// ============================================

function applyTheme(theme: "dark" | "light"): void {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");

    moonIcon.classList.remove("hidden");

    sunIcon.classList.add("hidden");
  } else {
    document.documentElement.classList.remove("dark");

    moonIcon.classList.add("hidden");

    sunIcon.classList.remove("hidden");
  }

  localStorage.setItem(THEME_KEY, theme);
}

function toggleTheme(): void {
  const isDark = document.documentElement.classList.contains("dark");

  applyTheme(isDark ? "light" : "dark");
}

function loadTheme(): void {
  const storedTheme = localStorage.getItem(THEME_KEY) as
    | "dark"
    | "light"
    | null;

  applyTheme(storedTheme || "dark");
}

// ============================================
// TABS
// ============================================

function switchTab(targetTab: string): void {
  tabButtons.forEach((btn) => {
    const button = btn as HTMLButtonElement;

    const isActive = button.dataset.tab === targetTab;

    button.setAttribute("aria-selected", String(isActive));

    button.classList.toggle("bg-slate-700", isActive);

    button.classList.toggle("text-slate-100", isActive);

    button.classList.toggle("text-slate-400", !isActive);
  });

  tabPanels.forEach((panel) => {
    const element = panel as HTMLDivElement;

    element.classList.toggle("active", element.id === `panel-${targetTab}`);
  });
}

// ============================================
// STEP SYSTEM
// ============================================

function setStep(newStep: number): void {
  step = newStep;

  stepButtons.forEach((btn) => {
    const button = btn as HTMLButtonElement;

    const isActive = Number(button.dataset.step) === newStep;

    button.classList.toggle("active-step", isActive);

    if (isActive) {
      button.classList.add(
        "border-indigo-500/40",
        "bg-indigo-500/10",
        "text-indigo-300",
      );

      button.classList.remove("border-slate-700", "text-slate-400");
    } else {
      button.classList.remove(
        "border-indigo-500/40",
        "bg-indigo-500/10",
        "text-indigo-300",
      );

      button.classList.add("border-slate-700", "text-slate-400");
    }
  });
}

// ============================================
// EVENTS
// ============================================

// Increment
incrementBtn.addEventListener("click", () => {
  count += step;

  renderCounter();
});

// Decrement
decrementBtn.addEventListener("click", () => {
  count -= step;

  renderCounter();
});

// Reset
resetBtn.addEventListener("click", () => {
  count = 0;

  renderCounter();

  showToast("تم تصفير العداد");
});

// Save
saveBtn.addEventListener("click", saveCurrentSession);

// Clear history
clearHistoryBtn.addEventListener("click", clearHistory);

// Theme
themeBtn.addEventListener("click", toggleTheme);

// Tabs
tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tab = (btn as HTMLButtonElement).dataset.tab;

    if (!tab) return;

    switchTab(tab);
  });
});

// Steps
stepButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = Number((btn as HTMLButtonElement).dataset.step);

    setStep(value);
  });
});

// ============================================
// INIT
// ============================================

function init(): void {
  loadSessions();

  renderCounter();

  renderCategories();

  renderHistory();

  loadTheme();

  setStep(1);
}

// ============================================
// PWA INSTALL
// ============================================

let deferredPrompt: any = null;

const installBtn = document.getElementById(
  "btn-install"
) as HTMLButtonElement;

window.addEventListener(
  "beforeinstallprompt",
  (event) => {
    event.preventDefault();

    deferredPrompt = event;

    installBtn.classList.remove("hidden");

    installBtn.classList.add("flex");
  }
);

installBtn.addEventListener(
  "click",
  async () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();

    const result =
      await deferredPrompt.userChoice;

    if (result.outcome === "accepted") {
      showToast("تم تثبيت التطبيق");
    }

    deferredPrompt = null;

    installBtn.classList.add("hidden");
  }
);

init();

// ============================================
// SERVICE WORKER
// ============================================

if ("serviceWorker" in navigator) {
  window.addEventListener(
    "load",
    async () => {
      try {
        await navigator.serviceWorker.register(
          "./service-worker.js"
        );

        console.log(
          "Service Worker Registered"
        );
      } catch (error) {
        console.error(
          "Service Worker Error:",
          error
        );
      }
    }
  );
}