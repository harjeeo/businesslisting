// Small adapters between the backend's Prisma-flavoured JSON (PascalCase
// enums, ISO datetimes) and the frontend's display-friendly string unions
// (spaced labels, YYYY-MM-DD dates) used throughout the admin UI.
import type { Business, User, AdminUser, Lead } from "../data/dummy";

const shortDate = (iso: string) => iso.slice(0, 10);

export function businessFromApi(row: Business): Business {
  return { ...row, joined: shortDate(row.joined) };
}

const userRoleFromApi: Record<string, User["role"]> = {
  Customer: "Customer",
  BusinessOwner: "Business Owner",
};
export function userFromApi(row: Omit<User, "role"> & { role: string }): User {
  return {
    ...row,
    role: userRoleFromApi[row.role] ?? "Customer",
    joined: shortDate(row.joined),
  };
}

const adminRoleFromApi: Record<string, AdminUser["role"]> = {
  SuperAdmin: "Super Admin",
  Admin: "Admin",
  Moderator: "Moderator",
};
const adminRoleToApi: Record<AdminUser["role"], string> = {
  "Super Admin": "SuperAdmin",
  Admin: "Admin",
  Moderator: "Moderator",
};

export function adminUserFromApi(
  row: Omit<AdminUser, "role"> & { role: string }
): AdminUser {
  return {
    ...row,
    role: adminRoleFromApi[row.role] ?? "Admin",
    lastActive: shortDate(row.lastActive),
  };
}

export function adminUserRoleToApi(role: AdminUser["role"]) {
  return adminRoleToApi[role];
}

const leadStatusFromApi: Record<string, Lead["status"]> = {
  New: "New",
  Contacted: "Contacted",
  InDiscussion: "In Discussion",
  QuotationSent: "Quotation Sent",
  Won: "Won",
  Lost: "Lost",
};
const leadStatusToApi: Record<Lead["status"], string> = {
  New: "New",
  Contacted: "Contacted",
  "In Discussion": "InDiscussion",
  "Quotation Sent": "QuotationSent",
  Won: "Won",
  Lost: "Lost",
};

export function leadFromApi(row: Omit<Lead, "status"> & { status: string }): Lead {
  return {
    ...row,
    status: leadStatusFromApi[row.status] ?? "New",
    createdAt: shortDate(row.createdAt),
  };
}

export function mapLeadStatusToApi(status: Lead["status"]) {
  return leadStatusToApi[status];
}

export function withShortDate<T extends { createdAt: string }>(row: T): T {
  return { ...row, createdAt: shortDate(row.createdAt) };
}
