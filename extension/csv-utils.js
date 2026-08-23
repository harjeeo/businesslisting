const CSV_HEADERS = [
  "Name",
  "Address",
  "Phone",
  "Website",
  "Hours",
  "Email",
  "Category",
  "Rating",
  "Images",
  "Maps URL",
  "Captured At",
];

function csvEscape(value) {
  const str = (value ?? "").toString();
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function buildCsv(listings) {
  const rows = [CSV_HEADERS.join(",")];
  for (const item of listings) {
    rows.push(
      [
        csvEscape(item.name),
        csvEscape(item.address),
        csvEscape(item.phone),
        csvEscape(item.website),
        csvEscape(item.hours),
        csvEscape(item.email),
        csvEscape(item.category),
        csvEscape(item.rating),
        csvEscape((item.images || []).join(" | ")),
        csvEscape(item.mapsUrl),
        csvEscape(item.capturedAt),
      ].join(",")
    );
  }
  return rows.join("\r\n");
}

function downloadCsv(listings) {
  if (!listings.length) return;
  const csv = buildCsv(listings);
  // data: URL keeps working even if the popup window closes right after
  // the click, unlike a blob: URL which is tied to the page's lifetime.
  const dataUrl = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
  const stamp = new Date().toISOString().slice(0, 10);
  chrome.downloads.download({
    url: dataUrl,
    filename: `gmb-listings-${stamp}.csv`,
    saveAs: true,
  });
}
