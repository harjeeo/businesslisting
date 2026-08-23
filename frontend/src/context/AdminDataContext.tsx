import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { api } from "../lib/api";
import { slugify } from "../lib/slug";
import {
  businessFromApi,
  userFromApi,
  adminUserFromApi,
  adminUserRoleToApi,
  leadFromApi,
  mapLeadStatusToApi,
  withShortDate,
} from "../lib/mappers";
import type {
  Business,
  Category,
  LocationRow,
  AdminUser,
  User,
  Product,
  Service,
  Lead,
  Rfq,
  Review,
} from "../data/dummy";

type BusinessInput = Omit<Business, "id" | "leads" | "joined">;
type CategoryInput = Pick<Category, "name" | "parent" | "status">;
type LocationInput = Pick<LocationRow, "country" | "state" | "city" | "status">;
type AdminUserInput = Pick<AdminUser, "name" | "email" | "role" | "status"> & {
  password?: string;
};

interface AdminDataContextValue {
  loading: boolean;

  businesses: Business[];
  addBusiness: (data: BusinessInput) => Promise<void>;
  updateBusiness: (id: number, data: BusinessInput) => Promise<void>;
  deleteBusiness: (id: number) => Promise<void>;

  users: User[];
  toggleUserBlock: (id: number) => Promise<void>;

  categories: Category[];
  addCategory: (data: CategoryInput) => Promise<void>;
  updateCategory: (id: number, data: CategoryInput) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;

  locations: LocationRow[];
  addLocation: (data: LocationInput) => Promise<void>;
  updateLocation: (id: number, data: LocationInput) => Promise<void>;
  deleteLocation: (id: number) => Promise<void>;

  adminUsers: AdminUser[];
  addAdminUser: (data: AdminUserInput) => Promise<void>;
  updateAdminUser: (id: number, data: AdminUserInput) => Promise<void>;
  deleteAdminUser: (id: number) => Promise<void>;

  products: Product[];
  setProductStatus: (id: number, status: Product["status"]) => Promise<void>;

  services: Service[];
  setServiceStatus: (id: number, status: Service["status"]) => Promise<void>;

  leads: Lead[];
  setLeadStatus: (id: number, status: Lead["status"]) => Promise<void>;

  rfqs: Rfq[];

  reviews: Review[];
  setReviewStatus: (id: number, status: Review["status"]) => Promise<void>;
}

const AdminDataContext = createContext<AdminDataContextValue | null>(null);

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<LocationRow[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [rfqs, setRfqs] = useState<Rfq[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    Promise.all([
      api.get<Business[]>("/businesses").then((rows) => rows.map(businessFromApi)),
      api
        .get<(Omit<User, "role"> & { role: string })[]>("/users")
        .then((rows) => rows.map(userFromApi)),
      api.get<Category[]>("/categories"),
      api.get<LocationRow[]>("/locations"),
      api
        .get<(Omit<AdminUser, "role"> & { role: string })[]>("/admin-users")
        .then((rows) => rows.map(adminUserFromApi)),
      api.get<Product[]>("/products").then((rows) => rows.map(withShortDate)),
      api.get<Service[]>("/services").then((rows) => rows.map(withShortDate)),
      api
        .get<(Omit<Lead, "status"> & { status: string })[]>("/leads")
        .then((rows) => rows.map(leadFromApi)),
      api.get<Rfq[]>("/rfqs").then((rows) => rows.map(withShortDate)),
      api.get<Review[]>("/reviews").then((rows) => rows.map(withShortDate)),
    ])
      .then(
        ([
          businessRows,
          userRows,
          categoryRows,
          locationRows,
          adminRows,
          productRows,
          serviceRows,
          leadRows,
          rfqRows,
          reviewRows,
        ]) => {
          setBusinesses(businessRows);
          setUsers(userRows);
          setCategories(categoryRows);
          setLocations(locationRows);
          setAdminUsers(adminRows);
          setProducts(productRows);
          setServices(serviceRows);
          setLeads(leadRows);
          setRfqs(rfqRows);
          setReviews(reviewRows);
        }
      )
      .finally(() => setLoading(false));
  }, []);

  const value: AdminDataContextValue = {
    loading,

    businesses,
    addBusiness: async (data) => {
      const created = await api.post<Business>("/businesses", {
        ...data,
        slug: slugify(data.name),
      });
      setBusinesses((prev) => [...prev, businessFromApi(created)]);
    },
    updateBusiness: async (id, data) => {
      const updated = await api.put<Business>(`/businesses/${id}`, data);
      setBusinesses((prev) =>
        prev.map((b) => (b.id === id ? businessFromApi(updated) : b))
      );
    },
    deleteBusiness: async (id) => {
      await api.delete(`/businesses/${id}`);
      setBusinesses((prev) => prev.filter((b) => b.id !== id));
    },

    users,
    toggleUserBlock: async (id) => {
      const user = users.find((u) => u.id === id);
      if (!user) return;
      const status = user.status === "Active" ? "Blocked" : "Active";
      const updated = await api.put<Omit<User, "role"> & { role: string }>(
        `/users/${id}`,
        { status }
      );
      setUsers((prev) => prev.map((u) => (u.id === id ? userFromApi(updated) : u)));
    },

    categories,
    addCategory: async (data) => {
      const created = await api.post<Category>("/categories", data);
      setCategories((prev) => [...prev, created]);
    },
    updateCategory: async (id, data) => {
      const updated = await api.put<Category>(`/categories/${id}`, data);
      setCategories((prev) => prev.map((c) => (c.id === id ? updated : c)));
    },
    deleteCategory: async (id) => {
      await api.delete(`/categories/${id}`);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    },

    locations,
    addLocation: async (data) => {
      const created = await api.post<LocationRow>("/locations", data);
      setLocations((prev) => [...prev, created]);
    },
    updateLocation: async (id, data) => {
      const updated = await api.put<LocationRow>(`/locations/${id}`, data);
      setLocations((prev) => prev.map((l) => (l.id === id ? updated : l)));
    },
    deleteLocation: async (id) => {
      await api.delete(`/locations/${id}`);
      setLocations((prev) => prev.filter((l) => l.id !== id));
    },

    adminUsers,
    addAdminUser: async (data) => {
      const created = await api.post<Omit<AdminUser, "role"> & { role: string }>(
        "/admin-users",
        { ...data, role: adminUserRoleToApi(data.role) }
      );
      setAdminUsers((prev) => [...prev, adminUserFromApi(created)]);
    },
    updateAdminUser: async (id, data) => {
      const updated = await api.put<Omit<AdminUser, "role"> & { role: string }>(
        `/admin-users/${id}`,
        { ...data, role: adminUserRoleToApi(data.role) }
      );
      setAdminUsers((prev) =>
        prev.map((a) => (a.id === id ? adminUserFromApi(updated) : a))
      );
    },
    deleteAdminUser: async (id) => {
      await api.delete(`/admin-users/${id}`);
      setAdminUsers((prev) => prev.filter((a) => a.id !== id));
    },

    products,
    setProductStatus: async (id, status) => {
      const updated = await api.put<Product>(`/products/${id}`, { status });
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? withShortDate(updated) : p))
      );
    },

    services,
    setServiceStatus: async (id, status) => {
      const updated = await api.put<Service>(`/services/${id}`, { status });
      setServices((prev) =>
        prev.map((s) => (s.id === id ? withShortDate(updated) : s))
      );
    },

    leads,
    setLeadStatus: async (id, status) => {
      const updated = await api.put<Omit<Lead, "status"> & { status: string }>(
        `/leads/${id}`,
        { status: mapLeadStatusToApi(status) }
      );
      setLeads((prev) => prev.map((l) => (l.id === id ? leadFromApi(updated) : l)));
    },

    rfqs,

    reviews,
    setReviewStatus: async (id, status) => {
      const updated = await api.put<Review>(`/reviews/${id}`, { status });
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? withShortDate(updated) : r))
      );
    },
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
