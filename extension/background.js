const STORAGE_KEY = "gmb_listings";

async function updateBadge() {
  const result = await chrome.storage.local.get(STORAGE_KEY);
  const count = (result[STORAGE_KEY] || []).length;
  chrome.action.setBadgeText({ text: count ? String(count) : "" });
  chrome.action.setBadgeBackgroundColor({ color: "#175C54" });
}

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes[STORAGE_KEY]) {
    updateBadge();
  }
});

chrome.runtime.onInstalled.addListener(updateBadge);
chrome.runtime.onStartup.addListener(updateBadge);
updateBadge();
