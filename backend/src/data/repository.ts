import { prisma } from "./prisma.js";
import { createPrismaCollection } from "./store.js";

export const businesses = createPrismaCollection(prisma.business);
export const users = createPrismaCollection(prisma.user);
export const categories = createPrismaCollection(prisma.category);
export const locations = createPrismaCollection(prisma.location);
export const adminUsers = createPrismaCollection(prisma.adminUser);
export const products = createPrismaCollection(prisma.product);
export const services = createPrismaCollection(prisma.service);
export const leads = createPrismaCollection(prisma.lead);
export const rfqs = createPrismaCollection(prisma.rfq);
export const reviews = createPrismaCollection(prisma.review);
