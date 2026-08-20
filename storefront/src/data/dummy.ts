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

export interface BusinessProduct {
  name: string;
  price: string;
  image: string;
}

export interface BusinessReview {
  name: string;
  rating: number;
  date: string;
  comment: string;
}

export interface BusinessFaq {
  question: string;
  answer: string;
}

export interface BusinessDetail {
  slug: string;
  name: string;
  category: string;
  subCategory: string;
  city: string;
  state: string;
  country: "India" | "Canada";
  address: string;
  postalCode: string;
  lat: number;
  lng: number;
  logo: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  description: string;
  businessType: string;
  establishedYear: string;
  employees: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  hours: string;
  products: BusinessProduct[];
  services: string[];
  gallery: string[];
  reviewsList: BusinessReview[];
  faqs: BusinessFaq[];
}

export const businessDetails: BusinessDetail[] = [
  {
    slug: "sharma-electronics",
    name: "Sharma Electronics",
    category: "Electronics",
    subCategory: "Mobile Phones",
    city: "Ludhiana",
    state: "Punjab",
    country: "India",
    address: "123 Model Town Road",
    postalCode: "141002",
    lat: 30.901,
    lng: 75.8573,
    logo: "🔌",
    rating: 4.6,
    reviewCount: 128,
    verified: true,
    description:
      "Leading electronics retailer in Ludhiana offering LED lighting, CCTV systems and mobile accessories. Serving homes and businesses across Punjab for over a decade.",
    businessType: "Retailer",
    establishedYear: "2012",
    employees: "11-50",
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    email: "contact@sharmaelectronics.in",
    website: "https://sharmaelectronics.in",
    hours: "Mon–Sat, 10:00 AM – 8:00 PM",
    products: [
      { name: "LED Panel Light 24W", price: "₹450", image: "💡" },
      { name: "CCTV Camera Kit (4ch)", price: "₹8,999", image: "📹" },
      { name: "Smart Doorbell", price: "₹2,199", image: "🔔" },
    ],
    services: ["CCTV Installation", "Home Wiring", "Warranty Support"],
    gallery: ["🏬", "💡", "📹", "🔧"],
    reviewsList: [
      { name: "Rahul Verma", rating: 5, date: "2026-07-01", comment: "Great service and fast delivery." },
      { name: "Simran Kaur", rating: 4, date: "2026-06-12", comment: "Good pricing, installation was quick." },
    ],
    faqs: [
      { question: "Do you offer installation?", answer: "Yes, we offer CCTV and lighting installation across Ludhiana." },
      { question: "Is there a warranty on products?", answer: "All products come with a minimum 1-year manufacturer warranty." },
    ],
  },
  {
    slug: "maple-web-studio",
    name: "Maple Web Studio",
    category: "IT Services",
    subCategory: "Web Development",
    city: "Toronto",
    state: "Ontario",
    country: "Canada",
    address: "45 King Street West",
    postalCode: "M5H 1J8",
    lat: 43.6511,
    lng: -79.3832,
    logo: "💻",
    rating: 4.8,
    reviewCount: 64,
    verified: true,
    description:
      "Web design and development studio serving small businesses across Ontario with modern, fast websites and e-commerce solutions.",
    businessType: "Service Provider",
    establishedYear: "2018",
    employees: "1-10",
    phone: "+1 416 555 0134",
    whatsapp: "+1 416 555 0134",
    email: "hello@maplewebstudio.ca",
    website: "https://maplewebstudio.ca",
    hours: "Mon–Fri, 9:00 AM – 6:00 PM",
    products: [],
    services: ["Website Design & Development", "E-commerce Setup", "SEO Optimization"],
    gallery: ["💻", "🖥️", "🎨"],
    reviewsList: [
      { name: "Emily Johnson", rating: 5, date: "2026-06-18", comment: "Brought in genuine leads from week one." },
    ],
    faqs: [
      { question: "How long does a website take?", answer: "Typically 3-4 weeks depending on scope." },
    ],
  },
  {
    slug: "delhi-packaging-co",
    name: "Delhi Packaging Co.",
    category: "Manufacturing",
    subCategory: "Packaging Materials",
    city: "Delhi",
    state: "Delhi",
    country: "India",
    address: "Plot 22, Okhla Industrial Area",
    postalCode: "110020",
    lat: 28.5355,
    lng: 77.2725,
    logo: "📦",
    rating: 4.3,
    reviewCount: 41,
    verified: false,
    description:
      "Manufacturer of corrugated boxes and packaging solutions for B2B clients, supplying retailers and e-commerce warehouses across North India.",
    businessType: "Manufacturer",
    establishedYear: "2005",
    employees: "51-200",
    phone: "+91 98111 22334",
    whatsapp: "+91 98111 22334",
    email: "sales@delhipackaging.in",
    website: "",
    hours: "Mon–Sat, 9:00 AM – 7:00 PM",
    products: [
      { name: "Corrugated Shipping Box", price: "₹18/pc", image: "📦" },
      { name: "Bubble Wrap Roll", price: "₹350", image: "🎁" },
    ],
    services: ["Bulk Custom Packaging", "Design Consultation"],
    gallery: ["🏭", "📦", "🚚"],
    reviewsList: [
      { name: "Amit Sharma", rating: 4, date: "2026-08-17", comment: "Reliable for bulk orders." },
    ],
    faqs: [
      { question: "What is the minimum order quantity?", answer: "MOQ starts at 1,000 units for custom packaging." },
    ],
  },
  {
    slug: "brampton-grocers",
    name: "Brampton Grocers",
    category: "Retail",
    subCategory: "Grocery Store",
    city: "Brampton",
    state: "Ontario",
    country: "Canada",
    address: "88 Queen Street East",
    postalCode: "L6V 1B2",
    lat: 43.6852,
    lng: -79.7594,
    logo: "🛒",
    rating: 4.7,
    reviewCount: 96,
    verified: true,
    description:
      "Indian grocery store offering fresh produce, spices and imported goods for the South Asian community in Brampton.",
    businessType: "Retailer",
    establishedYear: "2015",
    employees: "11-50",
    phone: "+1 905 555 0198",
    whatsapp: "+1 905 555 0198",
    email: "info@bramptongrocers.ca",
    website: "https://bramptongrocers.ca",
    hours: "Daily, 9:00 AM – 10:00 PM",
    products: [
      { name: "Organic Basmati Rice 5kg", price: "CAD 22.99", image: "🍚" },
      { name: "Assorted Spice Box", price: "CAD 14.99", image: "🌶️" },
    ],
    services: ["Home Delivery", "Bulk Ordering"],
    gallery: ["🛒", "🍚", "🥭"],
    reviewsList: [
      { name: "Michael Lee", rating: 5, date: "2026-05-25", comment: "Best grocery store in the area!" },
    ],
    faqs: [
      { question: "Do you deliver?", answer: "Yes, we deliver across Brampton and Mississauga." },
    ],
  },
  {
    slug: "singh-interiors",
    name: "Singh Interiors",
    category: "Construction",
    subCategory: "Interior Design",
    city: "Chandigarh",
    state: "Chandigarh",
    country: "India",
    address: "SCO 145, Sector 34",
    postalCode: "160022",
    lat: 30.7194,
    lng: 76.7654,
    logo: "🛋️",
    rating: 4.5,
    reviewCount: 53,
    verified: true,
    description:
      "Interior design and modular furniture studio for residential and commercial spaces across Chandigarh tricity.",
    businessType: "Service Provider",
    establishedYear: "2010",
    employees: "11-50",
    phone: "+91 98140 55667",
    whatsapp: "+91 98140 55667",
    email: "studio@singhinteriors.in",
    website: "",
    hours: "Mon–Sat, 10:00 AM – 7:00 PM",
    products: [{ name: "Modular Kitchen Cabinet", price: "On Request", image: "🍽️" }],
    services: ["Home Interior Consultation", "Modular Furniture", "Space Planning"],
    gallery: ["🛋️", "🏠", "🎨"],
    reviewsList: [
      { name: "Neha Gupta", rating: 4, date: "2026-04-30", comment: "Great design ideas for small spaces." },
    ],
    faqs: [
      { question: "Do you offer free consultation?", answer: "Yes, first consultation is free of charge." },
    ],
  },
  {
    slug: "toronto-legal-group",
    name: "Toronto Legal Group",
    category: "Professional Services",
    subCategory: "Immigration Law",
    city: "Toronto",
    state: "Ontario",
    country: "Canada",
    address: "200 Bay Street",
    postalCode: "M5J 2J1",
    lat: 43.6462,
    lng: -79.3806,
    logo: "⚖️",
    rating: 4.9,
    reviewCount: 87,
    verified: true,
    description:
      "Immigration and business law firm serving newcomers to Canada with visa applications, PR filings and corporate law.",
    businessType: "Professional",
    establishedYear: "2009",
    employees: "11-50",
    phone: "+1 416 555 0177",
    whatsapp: "+1 416 555 0177",
    email: "info@torontolegalgroup.ca",
    website: "https://torontolegalgroup.ca",
    hours: "Mon–Fri, 9:00 AM – 5:00 PM",
    products: [],
    services: ["Immigration Document Filing", "Business Incorporation", "Legal Consultation"],
    gallery: ["⚖️", "🏢", "📄"],
    reviewsList: [
      { name: "Priya Kaur", rating: 5, date: "2026-08-14", comment: "Handled our PR application smoothly." },
    ],
    faqs: [
      { question: "Do you offer free case evaluation?", answer: "Yes, the first 15-minute consultation is free." },
    ],
  },
];

export function getBusinessBySlug(slug: string): BusinessDetail | undefined {
  return businessDetails.find((b) => b.slug === slug);
}

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
