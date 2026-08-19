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

export interface User {
  id: number;
  name: string;
  email: string;
  role: "Customer" | "Business Owner";
  country: "India" | "Canada";
  status: "Active" | "Blocked";
  joined: string;
}

export interface Category {
  id: number;
  name: string;
  parent: string | null;
  businesses: number;
  status: "Active" | "Inactive";
}

export interface LocationRow {
  id: number;
  country: "India" | "Canada";
  state: string;
  city: string;
  businesses: number;
  status: "Active" | "Inactive";
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: "Super Admin" | "Admin" | "Moderator";
  status: "Active" | "Inactive";
  lastActive: string;
  passwordHash?: string;
}

export interface Product {
  id: number;
  name: string;
  business: string;
  category: string;
  price: string;
  status: "Active" | "Pending" | "Rejected";
  createdAt: string;
}

export interface Service {
  id: number;
  name: string;
  business: string;
  category: string;
  priceFrom: string;
  status: "Active" | "Pending" | "Rejected";
  createdAt: string;
}

export interface Lead {
  id: number;
  business: string;
  customer: string;
  interest: string;
  status: "New" | "Contacted" | "In Discussion" | "Quotation Sent" | "Won" | "Lost";
  createdAt: string;
}

export interface Rfq {
  id: number;
  product: string;
  customer: string;
  quantity: string;
  budget: string;
  quotes: number;
  status: "Open" | "Quoted" | "Closed";
  createdAt: string;
}

export interface Review {
  id: number;
  business: string;
  customer: string;
  rating: number;
  comment: string;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: string;
}
