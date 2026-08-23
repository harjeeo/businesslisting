/**
 * GMB Listing Capture — content script
 * Runs on Google Maps pages. When a business detail panel is open, shows a
 * floating "Save" button. Clicking it extracts Name / Address / Phone /
 * Website / Hours / Email (best-effort) / Rating / up to 10 Images and
 * saves it to chrome.storage.local.
 *
 * IMPORTANT: on some Maps URLs (e.g. a place opened while the search
 * results sidebar stays visible) the page has MULTIPLE elements with
 * role="main" — one for the sidebar list, one for the actual place panel.
 * All extraction below is scoped to the panel that actually contains the
 * address/phone button, not just "the first role=main on the page", so it
 * doesn't accidentally read data from the sidebar.
 */

const STORAGE_KEY = "gmb_listings";
const DEBUG = true; // set to false to silence console logs

let currentSignature = null;
let debounceTimer = null;
const savedThisSession = new Set();

function log(...args) {
  if (DEBUG) console.debug("[GMB Capture]", ...args);
}

// ---------- text cleanup ----------

function sanitizeText(str) {
  if (!str) return "";
  return str
    .replace(/[\u{E000}-\u{F8FF}]/gu, "") // strip icon-font ligature glyphs (render as tofu boxes off-page)
    .replace(/[ \t]+/g, " ")
    .replace(/\s*\n\s*/g, " ")
    .trim();
}

function cleanButtonText(el) {
  if (!el) return "";
  return sanitizeText(el.textContent || "");
}

// ---------- find the correct panel root ----------
// Anchors on the address or phone button (only ever present once, inside the
// real place panel) and walks up to the nearest role="main" ancestor that
// actually contains it. Falls back sensibly if nothing is found yet.

function getPlacePanelRoot() {
  const anchor =
    document.querySelector('button[data-item-id="address"]') ||
    document.querySelector('button[data-item-id^="phone:tel:"]') ||
    document.querySelector('a[href^="tel:"]');

  if (anchor) {
    const mains = document.querySelectorAll('[role="main"]');
    for (const m of mains) {
      if (m.contains(anchor)) return m;
    }
    const closestMain = anchor.closest('[role="main"]');
    if (closestMain) return closestMain;
  }

  // nothing anchored yet — best guess, may briefly be wrong while loading
  return document.querySelector('[role="main"]') || document.body;
}

// ---------- field extraction (all scoped to a given panel root) ----------

function getName(root) {
  let name = root.querySelector("h1")?.textContent;
  name = sanitizeText(name);
  if (name) return name;

  // tab title is reliably "<Business Name> - Google Maps" regardless of layout
  const title = document.title || "";
  if (title.includes(" - Google Maps")) {
    return sanitizeText(title.replace(" - Google Maps", ""));
  }
  return "";
}

function getAddress(root) {
  return cleanButtonText(root.querySelector('button[data-item-id="address"]'));
}

function getPhone(root) {
  const btn = root.querySelector('button[data-item-id^="phone:tel:"]');
  const fromText = cleanButtonText(btn);
  if (fromText) return fromText;
  const id = btn?.getAttribute("data-item-id") || "";
  if (id) return sanitizeText(id.replace("phone:tel:", ""));

  // fallback: some listings render the phone as a plain tel: link, not a button
  const telLink = root.querySelector('a[href^="tel:"]');
  if (telLink) {
    const fromLinkText = cleanButtonText(telLink);
    if (fromLinkText) return fromLinkText;
    return sanitizeText((telLink.getAttribute("href") || "").replace("tel:", ""));
  }
  return "";
}

function getWebsite(root) {
  const el = root.querySelector('a[data-item-id="authority"]');
  return cleanButtonText(el) || sanitizeText(el?.getAttribute("href") || "");
}

function getCategory(root) {
  const el =
    root.querySelector('button[jsaction*="category"]') ||
    root.querySelector('h1 ~ div button');
  return cleanButtonText(el);
}

function getRating(root) {
  const el = root.querySelector('[aria-label*="stars"]');
  const label = el?.getAttribute("aria-label") || "";
  const match = label.match(/[\d.]+/);
  return match ? match[0] : "";
}

function getHours(root) {
  // 1) known data-item-id used for the opening-hours row on many layouts
  let summary = cleanButtonText(root.querySelector('[data-item-id="oh"]'));

  // 2) fallback: a row whose text starts with Open/Closed/Opens/Closes
  if (!summary) {
    const rows = root.querySelectorAll("button, div");
    for (const row of rows) {
      const t = sanitizeText(row.textContent);
      if (/^(Open|Closed|Opens|Closes)\b/.test(t) && t.length < 80) {
        summary = t;
        break;
      }
    }
  }

  // 3) if a full weekly hours table is already in the DOM, prefer it (richer data)
  const table = root.querySelector("table");
  if (table) {
    const rows = Array.from(table.querySelectorAll("tr"))
      .map((tr) =>
        sanitizeText(
          Array.from(tr.querySelectorAll("td, th"))
            .map((cell) => sanitizeText(cell.textContent))
            .filter(Boolean)
            .join(" ")
        )
      )
      .filter(Boolean);
    if (rows.length) return rows.join(" | ");
  }

  return summary || "";
}

function getEmail(root) {
  // Google Maps does not normally display a business email address — this
  // is a best-effort scan of the visible panel text for an email pattern
  // (occasionally present in a business's description/About text).
  const text = root.innerText || "";
  const match = text.match(/[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}/);
  return match ? match[0] : "";
}

function normalizeGooglePhotoUrl(url) {
  if (!url) return url;
  if (/googleusercontent\.com/.test(url) && url.includes("=")) {
    return url.split("=")[0] + "=w1600";
  }
  return url;
}

function getImages(root) {
  const urls = new Set();

  root
    .querySelectorAll(
      'img[src*="googleusercontent.com"], img[src*="ggpht.com"], img[src*="streetviewpixels"]'
    )
    .forEach((img) => {
      const src = img.getAttribute("src");
      if (src) urls.add(normalizeGooglePhotoUrl(src));
    });

  root.querySelectorAll('[style*="background-image"]').forEach((el) => {
    const style = el.getAttribute("style") || "";
    const match = style.match(/url\((['"]?)(https:\/\/[^'")]+)\1\)/);
    if (
      match &&
      /googleusercontent\.com|ggpht\.com|streetviewpixels/.test(match[2])
    ) {
      urls.add(normalizeGooglePhotoUrl(match[2]));
    }
  });

  return Array.from(urls).slice(0, 5);
}

function extractListing() {
  const root = getPlacePanelRoot();
  const listing = {
    name: getName(root),
    category: getCategory(root),
    address: getAddress(root),
    phone: getPhone(root),
    website: getWebsite(root),
    hours: getHours(root),
    email: getEmail(root),
    rating: getRating(root),
    images: getImages(root),
    mapsUrl: window.location.href,
  };
  log("extraction →", { ...listing, images: `${listing.images.length} image(s)` });
  return listing;
}

// ---------- storage ----------

function isDuplicate(existingList, listing) {
  const norm = (s) => (s || "").trim().toLowerCase();
  return existingList.some(
    (item) => norm(item.name) === norm(listing.name) && norm(item.address) === norm(listing.address)
  );
}

async function persistListing(listing) {
  const result = await chrome.storage.local.get(STORAGE_KEY);
  const existingList = result[STORAGE_KEY] || [];

  if (isDuplicate(existingList, listing)) {
    log("duplicate, not re-saving:", listing.name);
    return { status: "duplicate" };
  }

  const entry = {
    id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    ...listing,
    capturedAt: new Date().toISOString(),
  };
  existingList.unshift(entry);
  await chrome.storage.local.set({ [STORAGE_KEY]: existingList });
  log("saved:", { ...entry, images: `${entry.images.length} image(s)` });
  return { status: "saved", entry };
}

// ---------- floating save button ----------

let btnEl = null;

function ensureButton() {
  if (btnEl) return btnEl;
  btnEl = document.createElement("button");
  btnEl.id = "__gmb_capture_btn";
  Object.assign(btnEl.style, {
    position: "fixed",
    bottom: "80px",
    right: "24px",
    zIndex: 999999,
    background: "#175C54",
    color: "#fff",
    border: "none",
    borderRadius: "999px",
    padding: "12px 18px",
    fontFamily: "Roboto, Arial, sans-serif",
    fontSize: "13.5px",
    fontWeight: "600",
    boxShadow: "0 4px 14px rgba(0,0,0,0.28)",
    cursor: "pointer",
    display: "none",
    alignItems: "center",
    gap: "8px",
  });
  btnEl.addEventListener("click", onSaveClick);
  document.body.appendChild(btnEl);
  return btnEl;
}

function setButtonState(state) {
  const btn = ensureButton();
  if (state === "hidden") {
    btn.style.display = "none";
    return;
  }
  btn.style.display = "flex";
  btn.disabled = false;
  btn.style.cursor = "pointer";

  if (state === "idle") {
    btn.textContent = "📥 List mein Save Karo";
    btn.style.background = "#175C54";
  } else if (state === "saving") {
    btn.textContent = "Saving...";
    btn.disabled = true;
    btn.style.cursor = "not-allowed";
    btn.style.background = "#5b6b67";
  } else if (state === "saved") {
    btn.textContent = "✓ Save ho gaya";
    btn.style.background = "#3f7d55";
  } else if (state === "duplicate") {
    btn.textContent = "✓ Pehle se list mein hai";
    btn.style.background = "#3f7d55";
  }
}

function showToast(message) {
  const existing = document.getElementById("__gmb_capture_toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "__gmb_capture_toast";
  toast.textContent = message;
  Object.assign(toast.style, {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    background: "#175C54",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: "8px",
    fontFamily: "Roboto, Arial, sans-serif",
    fontSize: "13px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
    zIndex: 999999,
    opacity: "0",
    transition: "opacity 0.2s ease",
    pointerEvents: "none",
  });
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
  });
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 2200);
}

async function onSaveClick() {
  // re-extract fresh at click time — some fields (images, hours) can finish
  // loading slightly after the name/address first appear
  const listing = extractListing();
  if (!listing.name) return;

  setButtonState("saving");
  const signature = `${listing.name}|${listing.address}`.toLowerCase();
  const { status } = await persistListing(listing);

  savedThisSession.add(signature);
  if (status === "duplicate") {
    setButtonState("duplicate");
    showToast(`Pehle se list mein hai: ${listing.name}`);
  } else {
    setButtonState("saved");
    showToast(`✓ Save ho gaya: ${listing.name} (${listing.images.length} image${listing.images.length === 1 ? "" : "s"})`);
  }
}

// ---------- detect panel open/change (no auto-save) ----------

function tryDetect() {
  const root = getPlacePanelRoot();
  const name = getName(root);
  const address = getAddress(root);

  if (!name) {
    currentSignature = null;
    setButtonState("hidden");
    return;
  }

  const signature = `${name}|${address}`.toLowerCase();
  if (signature === currentSignature) return; // same business, nothing changed

  currentSignature = signature;
  log("business panel detected:", name);
  setButtonState(savedThisSession.has(signature) ? "saved" : "idle");
}

function scheduleDetect() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(tryDetect, 900);
}

const observer = new MutationObserver(() => {
  scheduleDetect();
});

function startObserving() {
  log("content script loaded");
  ensureButton();
  observer.observe(document.body, { childList: true, subtree: true });
  scheduleDetect();
}

if (document.readyState === "complete" || document.readyState === "interactive") {
  startObserving();
} else {
  window.addEventListener("DOMContentLoaded", startObserving);
}

let lastUrl = window.location.href;
setInterval(() => {
  if (window.location.href !== lastUrl) {
    lastUrl = window.location.href;
    currentSignature = null; // force re-detect on navigation
    scheduleDetect();
  }
}, 800);
