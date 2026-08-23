import type { Request, Response, NextFunction } from "express";
import { env } from "../config/env.js";

// Separate from requireAuth (JWT admin sessions): the browser extension is
// a static installed tool, not a logged-in admin, so it authenticates with
// a single shared key instead. Set IMPORT_API_KEY in the backend .env and
// enter the same value into the extension's settings.
export function requireImportKey(req: Request, res: Response, next: NextFunction) {
  if (!env.importApiKey) {
    return res.status(503).json({
      error: "Import is not configured. Set IMPORT_API_KEY in the backend .env.",
    });
  }

  const key = req.headers["x-api-key"];
  if (key !== env.importApiKey) {
    return res.status(401).json({ error: "Invalid or missing API key" });
  }

  next();
}
