/**
 * Talks to the Business Listing Marketplace backend's GMB import endpoint
 * (POST {apiUrl}/import/gmb, header x-api-key). Settings are stored in
 * chrome.storage.local under SETTINGS_KEY so they persist across sessions.
 */

const SETTINGS_KEY = "gmb_platform_settings";
const BATCH_SIZE = 20;

async function getPlatformSettings() {
  const result = await chrome.storage.local.get(SETTINGS_KEY);
  return result[SETTINGS_KEY] || { apiUrl: "", apiKey: "" };
}

async function savePlatformSettings(settings) {
  await chrome.storage.local.set({ [SETTINGS_KEY]: settings });
}

function toApiPayload(listing) {
  return {
    name: listing.name,
    category: listing.category || "",
    address: listing.address || "",
    phone: listing.phone || "",
    website: listing.website || "",
    hours: listing.hours || "",
    email: listing.email || "",
    images: listing.images || [],
    mapsUrl: listing.mapsUrl || "",
  };
}

/**
 * Sends listings to the platform in batches. Returns
 * { ok, sentIds, created, updated, error }.
 */
async function sendListingsToPlatform(listings) {
  const settings = await getPlatformSettings();
  if (!settings.apiUrl || !settings.apiKey) {
    return { ok: false, error: "no-settings" };
  }

  const baseUrl = settings.apiUrl.replace(/\/+$/, "");
  const sentIds = [];
  let created = 0;
  let updated = 0;

  for (let i = 0; i < listings.length; i += BATCH_SIZE) {
    const batch = listings.slice(i, i + BATCH_SIZE);
    let res;
    try {
      res = await fetch(`${baseUrl}/import/gmb`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": settings.apiKey,
        },
        body: JSON.stringify({ listings: batch.map(toApiPayload) }),
      });
    } catch {
      return { ok: false, error: "network", sentIds, created, updated };
    }

    if (!res.ok) {
      let message = `HTTP ${res.status}`;
      try {
        const body = await res.json();
        if (body?.error) message = body.error;
      } catch {
        // ignore
      }
      return { ok: false, error: message, sentIds, created, updated };
    }

    const data = await res.json();
    created += data.created || 0;
    updated += data.updated || 0;
    batch.forEach((item) => sentIds.push(item.id));
  }

  return { ok: true, sentIds, created, updated };
}
