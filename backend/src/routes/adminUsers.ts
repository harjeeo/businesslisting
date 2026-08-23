import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "../data/prisma.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

const SELECT = {
  id: true,
  name: true,
  email: true,
  role: true,
  status: true,
  lastActive: true,
} as const;

const createSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6).optional(),
  role: z.enum(["SuperAdmin", "Admin", "Moderator"]),
  status: z.enum(["Active", "Inactive"]),
});

const updateSchema = createSchema.partial();

router.get("/", async (_req, res, next) => {
  try {
    res.json(await prisma.adminUser.findMany({ select: SELECT }));
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const admin = await prisma.adminUser.findUnique({
      where: { id: Number(req.params.id) },
      select: SELECT,
    });
    if (!admin) return res.status(404).json({ error: "Not found" });
    res.json(admin);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const parsed = createSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid admin user data" });
    }
    const { password, ...rest } = parsed.data;
    const passwordHash = await bcrypt.hash(password ?? "password123", 10);
    const admin = await prisma.adminUser.create({
      data: { ...rest, passwordHash },
      select: SELECT,
    });
    res.status(201).json(admin);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const parsed = updateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid admin user data" });
    }
    const { password, ...rest } = parsed.data;
    const data: Record<string, unknown> = { ...rest };
    if (password) data.passwordHash = await bcrypt.hash(password, 10);

    const admin = await prisma.adminUser.update({
      where: { id: Number(req.params.id) },
      data,
      select: SELECT,
    });
    res.json(admin);
  } catch {
    res.status(404).json({ error: "Not found" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await prisma.adminUser.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch {
    res.status(404).json({ error: "Not found" });
  }
});

export default router;
