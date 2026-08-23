import { Router } from "express";
import { prisma } from "../data/prisma.js";

const router = Router();

router.get("/businesses", async (_req, res, next) => {
  try {
    const businesses = await prisma.business.findMany({
      where: { status: { in: ["Verified", "Pending"] } },
      orderBy: { joined: "desc" },
    });
    res.json(businesses);
  } catch (err) {
    next(err);
  }
});

router.get("/businesses/:slug", async (req, res, next) => {
  try {
    const business = await prisma.business.findUnique({
      where: { slug: req.params.slug },
    });
    if (!business) return res.status(404).json({ error: "Not found" });
    res.json(business);
  } catch (err) {
    next(err);
  }
});

router.get("/categories", async (_req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      where: { status: "Active" },
    });
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

router.get("/locations", async (_req, res, next) => {
  try {
    const locations = await prisma.location.findMany({
      where: { status: "Active" },
    });
    res.json(locations);
  } catch (err) {
    next(err);
  }
});

export default router;
