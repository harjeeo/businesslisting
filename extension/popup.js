const STORAGE_KEY = "gmb_listings";

const countEl = document.getElementById("count");
const openListBtn = document.getElementById("openList");
const exportCsvBtn = document.getElementById("exportCsv");
const clearAllBtn = document.getElementById("clearAll");

async function getListings() {
  const result = await chrome.storage.local.get(STORAGE_KEY);
  return result[STORAGE_KEY] || [];
}

async function refreshCount() {
  const listings = await getListings();
  countEl.textContent = listings.length;
  const empty = listings.length === 0;
  exportCsvBtn.disabled = empty;
  clearAllBtn.disabled = empty;
}

openListBtn.addEventListener("click", () => {
  chrome.tabs.create({ url: chrome.runtime.getURL("list.html") });
});

exportCsvBtn.addEventListener("click", async () => {
  const listings = await getListings();
  downloadCsv(listings);
});

clearAllBtn.addEventListener("click", async () => {
  const confirmed = confirm(
    "Kya aap pakka saari captured listings delete karna chahte ho? Ye undo nahi ho sakta."
  );
  if (!confirmed) return;
  await chrome.storage.local.set({ [STORAGE_KEY]: [] });
  refreshCount();
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes[STORAGE_KEY]) {
    refreshCount();
  }
});

refreshCount();
