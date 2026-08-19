import { Router } from "express";
import type { Collection } from "../data/store.js";
import { requireAuth } from "../middleware/auth.js";

// Builds a standard REST router (list/get/create/update/delete) over an
// in-memory Collection. All routes require a valid Super Admin session.
export function createCrudRouter<T extends { id: number }>(collection: Collection<T>) {
  const router = Router();

  router.use(requireAuth);

  router.get("/", (_req, res) => {
    res.json(collection.all());
  });

  router.get("/:id", (req, res) => {
    const row = collection.find(Number(req.params.id));
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(row);
  });

  router.post("/", (req, res) => {
    const row = collection.create(req.body);
    res.status(201).json(row);
  });

  router.put("/:id", (req, res) => {
    const row = collection.update(Number(req.params.id), req.body);
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(row);
  });

  router.delete("/:id", (req, res) => {
    const deleted = collection.remove(Number(req.params.id));
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.status(204).send();
  });

  return router;
}
