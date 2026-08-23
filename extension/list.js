const STORAGE_KEY = "gmb_listings";
const PAGE_SIZE = 30;

let allListings = [];
let filtered = [];
let visibleCount = PAGE_SIZE;

const subtitleEl = document.getElementById("subtitle");
const searchEl = document.getElementById("search");
const tbody = document.getElementById("tbody");
const tableWrap = document.getElementById("tableWrap");
const emptyState = document.getElementById("emptyState");
const loadMoreBtn = document.getElementById("loadMore");
const remainingCountEl = document.getElementById("remainingCount");
const exportCsvBtn = document.getElementById("exportCsv");
const clearAllBtn = document.getElementById("clearAll");
const sendToPlatformBtn = document.getElementById("sendToPlatform");
const openSettingsBtn = document.getElementById("openSettings");

const settingsModal = document.getElementById("settingsModal");
const settingsApiUrlEl = document.getElementById("settingsApiUrl");
const settingsApiKeyEl = document.getElementById("settingsApiKey");
const settingsSaveBtn = document.getElementById("settingsSave");
const settingsCancelBtn = document.getElementById("settingsCancel");

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function escapeHtml(str) {
  return (str || "").replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[c])
  );
}

function showToast(message, tone = "success") {
  const existing = document.getElementById("__list_toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "__list_toast";
  toast.textContent = message;
  toast.className = tone === "error" ? "toast-error" : "toast-success";
  Object.assign(toast.style, {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    color: "#fff",
    padding: "12px 18px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
    zIndex: 2000,
    maxWidth: "360px",
  });
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

function applyFilter() {
  const q = searchEl.value.trim().toLowerCase();
  filtered = !q
    ? allListings
    : allListings.filter(
        (item) =>
          item.name?.toLowerCase().includes(q) ||
          item.address?.toLowerCase().includes(q)
      );
  visibleCount = PAGE_SIZE;
  render();
}

function render() {
  const total = allListings.length;
  subtitleEl.textContent = `${total} listing${total === 1 ? "" : "s"}${
    filtered.length !== total ? ` (${filtered.length} match)` : ""
  }`;

  exportCsvBtn.disabled = total === 0;
  clearAllBtn.disabled = total === 0;
  sendToPlatformBtn.disabled = total === 0;

  if (total === 0) {
    emptyState.hidden = false;
    tableWrap.hidden = true;
    loadMoreBtn.hidden = true;
    return;
  }

  emptyState.hidden = true;
  tableWrap.hidden = false;

  const rows = filtered.slice(0, visibleCount);
  tbody.innerHTML = rows
    .map((item) => {
      const images = item.images || [];
      const thumbs = images
        .slice(0, 3)
        .map(
          (url) =>
            `<a href="${escapeHtml(url)}" target="_blank" rel="noopener"><img class="img-thumb" src="${escapeHtml(url)}" loading="lazy" /></a>`
        )
        .join("");
      const moreCount = images.length - 3;
      const imagesCell = images.length
        ? `<div class="img-thumb-row">${thumbs}${moreCount > 0 ? `<span class="img-more">+${moreCount}</span>` : ""}</div>`
        : `<span class="muted">—</span>`;

      // Timing can be a full weekly table joined with " | " — show just the
      // first segment inline, full text available on hover (and always in CSV).
      const hoursFull = item.hours || "";
      const hoursPreview = hoursFull.split(" | ")[0] || "";
      const hoursHasMore = hoursFull.includes(" | ");

      const website = item.website || "";
      const platformCell = item.sentToPlatform
        ? `<span class="platform-badge sent">☁️ Sent</span>`
        : `<span class="platform-badge pending">Pending</span>`;

      return `
      <tr data-id="${item.id}">
        <td class="name-cell">${escapeHtml(item.name)}</td>
        <td class="address-cell">${escapeHtml(item.address)}</td>
        <td>${escapeHtml(item.phone)}</td>
        <td class="muted truncate" title="${escapeHtml(website)}">${escapeHtml(website)}</td>
        <td class="muted truncate" title="${escapeHtml(hoursFull)}">${escapeHtml(hoursPreview)}${hoursHasMore ? " …" : ""}</td>
        <td class="muted truncate" title="${escapeHtml(item.email)}">${escapeHtml(item.email)}</td>
        <td>${imagesCell}</td>
        <td class="muted truncate" title="${escapeHtml(item.category)}">${escapeHtml(item.category)}</td>
        <td class="muted">${escapeHtml(item.rating)}</td>
        <td class="muted">${formatDate(item.capturedAt)}</td>
        <td>${platformCell}</td>
        <td><button class="delete-btn" data-id="${item.id}">Hatao</button></td>
      </tr>`;
    })
    .join("");

  const remaining = filtered.length - rows.length;
  loadMoreBtn.hidden = remaining <= 0;
  remainingCountEl.textContent = remaining;
}

async function loadListings() {
  const result = await chrome.storage.local.get(STORAGE_KEY);
  allListings = result[STORAGE_KEY] || [];
  applyFilter();
}

async function deleteListing(id) {
  allListings = allListings.filter((item) => item.id !== id);
  await chrome.storage.local.set({ [STORAGE_KEY]: allListings });
  // local state will also refresh via storage.onChanged, no need to call render() twice
}

async function markSentToPlatform(ids) {
  const idSet = new Set(ids);
  allListings = allListings.map((item) =>
    idSet.has(item.id) ? { ...item, sentToPlatform: true } : item
  );
  await chrome.storage.local.set({ [STORAGE_KEY]: allListings });
}

searchEl.addEventListener("input", applyFilter);

loadMoreBtn.addEventListener("click", () => {
  visibleCount += PAGE_SIZE;
  render();
});

tbody.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    deleteListing(e.target.dataset.id);
  }
});

exportCsvBtn.addEventListener("click", () => {
  downloadCsv(filtered.length !== allListings.length ? filtered : allListings);
});

clearAllBtn.addEventListener("click", async () => {
  const confirmed = confirm(
    "Kya aap pakka saari captured listings delete karna chahte ho? Ye undo nahi ho sakta."
  );
  if (!confirmed) return;
  await chrome.storage.local.set({ [STORAGE_KEY]: [] });
});

// ---------- Settings modal ----------

openSettingsBtn.addEventListener("click", async () => {
  const settings = await getPlatformSettings();
  settingsApiUrlEl.value = settings.apiUrl || "";
  settingsApiKeyEl.value = settings.apiKey || "";
  settingsModal.hidden = false;
});

settingsCancelBtn.addEventListener("click", () => {
  settingsModal.hidden = true;
});

settingsModal.addEventListener("click", (e) => {
  if (e.target === settingsModal) settingsModal.hidden = true;
});

settingsSaveBtn.addEventListener("click", async () => {
  await savePlatformSettings({
    apiUrl: settingsApiUrlEl.value.trim().replace(/\/+$/, ""),
    apiKey: settingsApiKeyEl.value.trim(),
  });
  settingsModal.hidden = true;
  showToast("Settings save ho gayi.");
});

// ---------- Send to platform ----------

sendToPlatformBtn.addEventListener("click", async () => {
  const settings = await getPlatformSettings();
  if (!settings.apiUrl || !settings.apiKey) {
    showToast("Pehle Settings mein Platform API URL aur Key set karo.", "error");
    settingsModal.hidden = false;
    return;
  }

  const target = (filtered.length !== allListings.length ? filtered : allListings).filter(
    (item) => !item.sentToPlatform
  );

  if (target.length === 0) {
    showToast("Sab listings pehle se platform par bhej di gayi hain.");
    return;
  }

  sendToPlatformBtn.disabled = true;
  sendToPlatformBtn.textContent = `Bhej rahe hain... (0/${target.length})`;

  const result = await sendListingsToPlatform(target);

  sendToPlatformBtn.disabled = false;
  sendToPlatformBtn.textContent = "☁️ Platform ko bhejo";

  if (!result.ok) {
    const messages = {
      "no-settings": "Platform settings set nahi hain.",
      network: "Platform tak connect nahi ho paaya. Kya backend chal raha hai?",
    };
    showToast(messages[result.error] || `Bhejne mein error: ${result.error}`, "error");
    if (result.sentIds.length) await markSentToPlatform(result.sentIds);
    return;
  }

  await markSentToPlatform(result.sentIds);
  showToast(
    `✓ ${result.sentIds.length} listing bhej di gayi (${result.created} nayi, ${result.updated} update hui).`
  );
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes[STORAGE_KEY]) {
    allListings = changes[STORAGE_KEY].newValue || [];
    applyFilter();
  }
});

loadListings();
