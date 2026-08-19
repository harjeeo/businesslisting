import { createContext, useContext, useState, type ReactNode } from "react";
import {
  businesses as initialBusinesses,
  categories as initialCategories,
  locations as initialLocations,
  adminUsers as initialAdminUsers,
  users as initialUsers,
  products as initialProducts,
  services as initialServices,
  leads as initialLeads,
  rfqs as initialRfqs,
  reviews as initialReviews,
  type Business,
  type Category,
  type LocationRow,
  type AdminUser,
  type User,
  type Product,
  type Service,
  type Lead,
  type Rfq,
  type Review,
} from "../data/dummy";

type BusinessInput = Omit<Business, "id" | "leads" | "joined">;
type CategoryInput = Pick<Category, "name" | "parent" | "status">;
type LocationInput = Pick<LocationRow, "country" | "state" | "city" | "status">;
type AdminUserInput = Pick<AdminUser, "name" | "email" | "role" | "status">;

interface AdminDataContextValue {
  businesses: Business[];
  addBusiness: (data: BusinessInput) => void;
  updateBusiness: (id: number, data: BusinessInput) => void;
  deleteBusiness: (id: number) => void;

  users: User[];
  toggleUserBlock: (id: number) => void;

  categories: Category[];
  addCategory: (data: CategoryInput) => void;
  updateCategory: (id: number, data: CategoryInput) => void;
  deleteCategory: (id: number) => void;

  locations: LocationRow[];
  addLocation: (data: LocationInput) => void;
  updateLocation: (id: number, data: LocationInput) => void;
  deleteLocation: (id: number) => void;

  adminUsers: AdminUser[];
  addAdminUser: (data: AdminUserInput) => void;
  updateAdminUser: (id: number, data: AdminUserInput) => void;
  deleteAdminUser: (id: number) => void;

  products: Product[];
  setProductStatus: (id: number, status: Product["status"]) => void;

  services: Service[];
  setServiceStatus: (id: number, status: Service["status"]) => void;

  leads: Lead[];
  setLeadStatus: (id: number, status: Lead["status"]) => void;

  rfqs: Rfq[];

  reviews: Review[];
  setReviewStatus: (id: number, status: Review["status"]) => void;
}

const AdminDataContext = createContext<AdminDataContextValue | null>(null);

const nextId = (ids: number[]) => Math.max(0, ...ids) + 1;
const today = () => new Date().toISOString().slice(0, 10);

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [businesses, setBusinesses] = useState(initialBusinesses);
  const [users, setUsers] = useState(initialUsers);
  const [categories, setCategories] = useState(initialCategories);
  const [locations, setLocations] = useState(initialLocations);
  const [adminUsers, setAdminUsers] = useState(initialAdminUsers);
  const [products, setProducts] = useState(initialProducts);
  const [services, setServices] = useState(initialServices);
  const [leads, setLeads] = useState(initialLeads);
  const [rfqs] = useState(initialRfqs);
  const [reviews, setReviews] = useState(initialReviews);

  const value: AdminDataContextValue = {
    businesses,
    addBusiness: (data) =>
      setBusinesses((prev) => [
        ...prev,
        { ...data, id: nextId(prev.map((b) => b.id)), leads: 0, joined: today() },
      ]),
    updateBusiness: (id, data) =>
      setBusinesses((prev) => prev.map((b) => (b.id === id ? { ...b, ...data } : b))),
    deleteBusiness: (id) => setBusinesses((prev) => prev.filter((b) => b.id !== id)),

    users,
    toggleUserBlock: (id) =>
      setUsers((prev) =>
        prev.map((u) =>
          u.id === id
            ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" }
            : u
        )
      ),

    categories,
    addCategory: (data) =>
      setCategories((prev) => [
        ...prev,
        { ...data, id: nextId(prev.map((c) => c.id)), businesses: 0 },
      ]),
    updateCategory: (id, data) =>
      setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c))),
    deleteCategory: (id) => setCategories((prev) => prev.filter((c) => c.id !== id)),

    locations,
    addLocation: (data) =>
      setLocations((prev) => [
        ...prev,
        { ...data, id: nextId(prev.map((l) => l.id)), businesses: 0 },
      ]),
    updateLocation: (id, data) =>
      setLocations((prev) => prev.map((l) => (l.id === id ? { ...l, ...data } : l))),
    deleteLocation: (id) => setLocations((prev) => prev.filter((l) => l.id !== id)),

    adminUsers,
    addAdminUser: (data) =>
      setAdminUsers((prev) => [
        ...prev,
        { ...data, id: nextId(prev.map((a) => a.id)), lastActive: today() },
      ]),
    updateAdminUser: (id, data) =>
      setAdminUsers((prev) => prev.map((a) => (a.id === id ? { ...a, ...data } : a))),
    deleteAdminUser: (id) => setAdminUsers((prev) => prev.filter((a) => a.id !== id)),

    products,
    setProductStatus: (id, status) =>
      setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p))),

    services,
    setServiceStatus: (id, status) =>
      setServices((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s))),

    leads,
    setLeadStatus: (id, status) =>
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l))),

    rfqs,

    reviews,
    setReviewStatus: (id, status) =>
      setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r))),
  };

  return (
    <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const ctx = useContext(AdminDataContext);
  if (!ctx) throw new Error("useAdminData must be used within AdminDataProvider");
  return ctx;
}
