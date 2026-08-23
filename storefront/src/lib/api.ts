const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

export interface ApiBusiness {
  id: number;
  slug: string;
  name: string;
  businessType: string;
  category: string;
  subCategory: string;
  description: string;
  establishedYear: string;
  employees: string;
  country: "India" | "Canada";
  state: string;
  city: string;
  address: string;
  postalCode: string;
  lat: number;
  lng: number;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  logoUrl: string;
  coverUrl: string;
  galleryUrls: string[];
  videoUrl: string;
  status: "Verified" | "Pending" | "Suspended";
  leads: number;
  joined: string;
}

export async function getPublicBusinesses(): Promise<ApiBusiness[]> {
  try {
    const res = await fetch(`${API_URL}/public/businesses`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function getPublicBusinessBySlug(
  slug: string
): Promise<ApiBusiness | null> {
  try {
    const res = await fetch(`${API_URL}/public/businesses/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
