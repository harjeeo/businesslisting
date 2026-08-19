export interface Business {
  id: number;
  name: string;
  category: string;
  country: "India" | "Canada";
  city: string;
  status: "Verified" | "Pending" | "Suspended";
  leads: number;
  joined: string;
}

export const businesses: Business[] = [
  { id: 1, name: "Sharma Electronics", category: "Electronics", country: "India", city: "Ludhiana", status: "Verified", leads: 42, joined: "2026-01-12" },
  { id: 2, name: "Maple Web Studio", category: "IT Services", country: "Canada", city: "Toronto", status: "Verified", leads: 18, joined: "2026-02-03" },
  { id: 3, name: "Delhi Packaging Co.", category: "Manufacturing", country: "India", city: "Delhi", status: "Pending", leads: 5, joined: "2026-03-21" },
  { id: 4, name: "Brampton Grocers", category: "Retail", country: "Canada", city: "Brampton", status: "Verified", leads: 27, joined: "2026-02-18" },
  { id: 5, name: "Singh Interiors", category: "Construction", country: "India", city: "Chandigarh", status: "Suspended", leads: 3, joined: "2025-11-30" },
  { id: 6, name: "Toronto Legal Group", category: "Professional Services", country: "Canada", city: "Toronto", status: "Pending", leads: 9, joined: "2026-04-02" },
];

export interface User {
  id: number;
  name: string;
  email: string;
  role: "Customer" | "Business Owner";
  country: "India" | "Canada";
  status: "Active" | "Blocked";
  joined: string;
}

export const users: User[] = [
  { id: 1, name: "Rahul Verma", email: "rahul.verma@example.com", role: "Customer", country: "India", status: "Active", joined: "2026-01-05" },
  { id: 2, name: "Emily Johnson", email: "emily.j@example.com", role: "Business Owner", country: "Canada", status: "Active", joined: "2026-02-14" },
  { id: 3, name: "Amit Sharma", email: "amit.sharma@example.com", role: "Business Owner", country: "India", status: "Active", joined: "2026-01-22" },
  { id: 4, name: "Priya Kaur", email: "priya.kaur@example.com", role: "Customer", country: "Canada", status: "Blocked", joined: "2026-03-09" },
  { id: 5, name: "Michael Lee", email: "michael.lee@example.com", role: "Customer", country: "Canada", status: "Active", joined: "2026-02-27" },
];

export interface Category {
  id: number;
  name: string;
  parent: string | null;
  businesses: number;
  status: "Active" | "Inactive";
}

export const categories: Category[] = [
  { id: 1, name: "Electronics", parent: null, businesses: 128, status: "Active" },
  { id: 2, name: "Mobile Phones", parent: "Electronics", businesses: 54, status: "Active" },
  { id: 3, name: "Construction", parent: null, businesses: 76, status: "Active" },
  { id: 4, name: "Contractors", parent: "Construction", businesses: 31, status: "Active" },
  { id: 5, name: "Professional Services", parent: null, businesses: 92, status: "Active" },
  { id: 6, name: "Lawyers", parent: "Professional Services", businesses: 40, status: "Inactive" },
];

export interface LocationRow {
  id: number;
  country: "India" | "Canada";
  state: string;
  city: string;
  businesses: number;
  status: "Active" | "Inactive";
}

export const locations: LocationRow[] = [
  { id: 1, country: "India", state: "Punjab", city: "Ludhiana", businesses: 145, status: "Active" },
  { id: 2, country: "India", state: "Delhi", city: "New Delhi", businesses: 320, status: "Active" },
  { id: 3, country: "India", state: "Chandigarh", city: "Chandigarh", businesses: 88, status: "Active" },
  { id: 4, country: "Canada", state: "Ontario", city: "Toronto", businesses: 210, status: "Active" },
  { id: 5, country: "Canada", state: "Ontario", city: "Brampton", businesses: 97, status: "Active" },
  { id: 6, country: "Canada", state: "British Columbia", city: "Vancouver", businesses: 64, status: "Inactive" },
];

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: "Super Admin" | "Admin" | "Moderator";
  status: "Active" | "Inactive";
  lastActive: string;
}

export const adminUsers: AdminUser[] = [
  { id: 1, name: "Tanvir Kalsi", email: "tanvirkalsi93@gmail.com", role: "Super Admin", status: "Active", lastActive: "2026-08-19" },
  { id: 2, name: "Neha Gupta", email: "neha.gupta@example.com", role: "Admin", status: "Active", lastActive: "2026-08-18" },
  { id: 3, name: "James Miller", email: "james.miller@example.com", role: "Moderator", status: "Inactive", lastActive: "2026-08-01" },
];
