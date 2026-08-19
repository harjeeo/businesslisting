import { Router } from "express";
import type { Collection } from "../data/store.js";
import { requireAuth } from "../middleware/auth.js";

// Builds a standard REST router (list/get/create/update/delete) over a
// Collection. All routes require a valid Super Admin session.
export function createCrudRouter<T extends { id: number }>(collection: Collection<T>) {
  const router = Router();

  router.use(requireAuth);

  router.get("/", async (_req, res, next) => {
    try {
      res.json(await collection.all());
    } catch (err) {
      next(err);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      const row = await collection.find(Number(req.params.id));
      if (!row) return res.status(404).json({ error: "Not found" });
      res.json(row);
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const row = await collection.create(req.body);
      res.status(201).json(row);
    } catch (err) {
      next(err);
    }
  });

  router.put("/:id", async (req, res, next) => {
    try {
      const row = await collection.update(Number(req.params.id), req.body);
      if (!row) return res.status(404).json({ error: "Not found" });
      res.json(row);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const deleted = await collection.remove(Number(req.params.id));
      if (!deleted) return res.status(404).json({ error: "Not found" });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  });

  return router;
}
