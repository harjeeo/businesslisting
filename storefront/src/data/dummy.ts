export interface Category {
  name: string;
  slug: string;
  count: number;
  icon: string;
}

export const categories: Category[] = [
  { name: "Electronics", slug: "electronics", count: 1280, icon: "📱" },
  { name: "Construction", slug: "construction", count: 760, icon: "🏗️" },
  { name: "Professional Services", slug: "professional-services", count: 920, icon: "💼" },
  { name: "Manufacturing", slug: "manufacturing", count: 540, icon: "🏭" },
  { name: "Retail", slug: "retail", count: 1105, icon: "🛍️" },
  { name: "IT Services", slug: "it-services", count: 430, icon: "💻" },
  { name: "Home Services", slug: "home-services", count: 610, icon: "🛠️" },
  { name: "Legal & Immigration", slug: "legal-immigration", count: 275, icon: "⚖️" },
  { name: "Restaurants", slug: "restaurants", count: 890, icon: "🍽️" },
  { name: "Automotive", slug: "automotive", count: 405, icon: "🚗" },
];

export interface CityCard {
  name: string;
  country: "India" | "Canada";
  count: number;
}

export const cities: CityCard[] = [
  { name: "Delhi", country: "India", count: 3200 },
  { name: "Ludhiana", country: "India", count: 1450 },
  { name: "Chandigarh", country: "India", count: 880 },
  { name: "Mumbai", country: "India", count: 2600 },
  { name: "Toronto", country: "Canada", count: 2100 },
  { name: "Brampton", country: "Canada", count: 970 },
  { name: "Vancouver", country: "Canada", count: 640 },
  { name: "Surrey", country: "Canada", count: 410 },
];

export interface FeaturedBusiness {
  name: string;
  category: string;
  city: string;
  country: "India" | "Canada";
  rating: number;
  reviews: number;
  verified: boolean;
  logo: string;
}

export const featuredBusinesses: FeaturedBusiness[] = [
  { name: "Sharma Electronics", category: "Electronics", city: "Ludhiana", country: "India", rating: 4.6, reviews: 128, verified: true, logo: "🔌" },
  { name: "Maple Web Studio", category: "IT Services", city: "Toronto", country: "Canada", rating: 4.8, reviews: 64, verified: true, logo: "💻" },
  { name: "Delhi Packaging Co.", category: "Manufacturing", city: "Delhi", country: "India", rating: 4.3, reviews: 41, verified: false, logo: "📦" },
  { name: "Brampton Grocers", category: "Retail", city: "Brampton", country: "Canada", rating: 4.7, reviews: 96, verified: true, logo: "🛒" },
  { name: "Singh Interiors", category: "Construction", city: "Chandigarh", country: "India", rating: 4.5, reviews: 53, verified: true, logo: "🛋️" },
  { name: "Toronto Legal Group", category: "Professional Services", city: "Toronto", country: "Canada", rating: 4.9, reviews: 87, verified: true, logo: "⚖️" },
];

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  { name: "Rahul Verma", role: "Customer, Delhi", quote: "Found a reliable packaging supplier within a day. The enquiry process was super smooth.", rating: 5 },
  { name: "Emily Johnson", role: "Business Owner, Toronto", quote: "Listing my web studio here brought in genuine leads from week one.", rating: 5 },
  { name: "Amit Sharma", role: "Customer, Ludhiana", quote: "Comparing verified electronics stores near me saved a lot of time.", rating: 4 },
];
