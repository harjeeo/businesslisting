import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { adminUsers } from "../data/seed.js";
import { env } from "../config/env.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

router.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid email or password format" });
  }

  const { email, password } = parsed.data;
  const admin = adminUsers.all().find((a) => a.email.toLowerCase() === email.toLowerCase());

  if (!admin || !admin.passwordHash || admin.status !== "Active") {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: admin.id, email: admin.email, role: admin.role },
    env.jwtSecret,
    { expiresIn: "7d" }
  );

  const { passwordHash: _omit, ...safeAdmin } = admin;
  res.json({ token, admin: safeAdmin });
});

router.get("/me", requireAuth, (req, res) => {
  const admin = adminUsers.find(req.user!.id);
  if (!admin) return res.status(404).json({ error: "Not found" });
  const { passwordHash: _omit, ...safeAdmin } = admin;
  res.json(safeAdmin);
});

export default router;
