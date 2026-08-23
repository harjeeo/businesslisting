export function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export interface ParsedAddress {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: "India" | "Canada";
}

// Best-effort split of a free-text Google Maps address into our structured
// fields. GMB addresses are typically "<street>, <city>, <state> <postal>,
// <country>" but the exact shape varies — treat this as a starting point;
// the admin should review/correct imported businesses.
export function parseAddress(raw: string): ParsedAddress {
  const parts = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  let country: "India" | "Canada" | "" = "";
  if (parts.length && /india/i.test(parts[parts.length - 1])) {
    country = "India";
    parts.pop();
  } else if (parts.length && /canada/i.test(parts[parts.length - 1])) {
    country = "Canada";
    parts.pop();
  }

  let state = "";
  let postalCode = "";
  if (parts.length) {
    const last = parts[parts.length - 1];
    const inMatch = last.match(/\b(\d{6})\b/);
    const caMatch = last.match(/\b([A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d)\b/);
    if (inMatch) {
      postalCode = inMatch[1];
      state = last.replace(inMatch[0], "").trim();
      parts.pop();
      if (!country) country = "India";
    } else if (caMatch) {
      postalCode = caMatch[1].toUpperCase();
      state = last.replace(caMatch[0], "").trim();
      parts.pop();
      if (!country) country = "Canada";
    }
  }

  const city = parts.length ? (parts.pop() as string) : "";
  const address = parts.join(", ");

  return { address, city, state, postalCode, country: country || "India" };
}
