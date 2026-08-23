import { Router } from "express";
import { z } from "zod";
import { prisma } from "../data/prisma.js";
import { requireImportKey } from "../middleware/importAuth.js";
import { slugify, parseAddress } from "../lib/gmbImport.js";

const router = Router();
router.use(requireImportKey);

const gmbListingSchema = z.object({
  name: z.string().min(1),
  category: z.string().optional().default(""),
  address: z.string().optional().default(""),
  phone: z.string().optional().default(""),
  website: z.string().optional().default(""),
  hours: z.string().optional().default(""),
  email: z.string().optional().default(""),
  images: z.array(z.string()).optional().default([]),
  mapsUrl: z.string().optional().default(""),
});

const bodySchema = z.object({
  listings: z.array(gmbListingSchema).min(1),
});

router.post("/gmb", async (req, res, next) => {
  try {
    const parsed = bodySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid payload", details: parsed.error.issues });
    }

    const results: { name: string; status: "created" | "updated"; slug: string }[] = [];

    for (const listing of parsed.data.listings) {
      const { address, city, state, postalCode, country } = parseAddress(listing.address);
      const baseSlug = slugify(listing.name);

      const data = {
        name: listing.name,
        category: listing.category || "Uncategorized",
        address,
        city,
        state,
        postalCode,
        country,
        phone: listing.phone,
        whatsapp: listing.phone,
        email: listing.email,
        website: listing.website,
        hours: listing.hours,
        galleryUrls: listing.images,
        coverUrl: listing.images[0] ?? "",
        source: "GMB Import",
        sourceUrl: listing.mapsUrl,
      };

      const existing = await prisma.business.findFirst({ where: { slug: baseSlug } });

      if (existing) {
        const updated = await prisma.business.update({ where: { id: existing.id }, data });
        results.push({ name: updated.name, status: "updated", slug: updated.slug });
      } else {
        let slug = baseSlug;
        let n = 2;
        // eslint-disable-next-line no-await-in-loop
        while (await prisma.business.findUnique({ where: { slug } })) {
          slug = `${baseSlug}-${n++}`;
        }
        const created = await prisma.business.create({
          data: { ...data, slug, status: "Pending" },
        });
        results.push({ name: created.name, status: "created", slug: created.slug });
      }
    }

    res.status(201).json({
      imported: results.length,
      created: results.filter((r) => r.status === "created").length,
      updated: results.filter((r) => r.status === "updated").length,
      results,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
