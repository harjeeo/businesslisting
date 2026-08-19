export interface Business {
  id: number;
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

export const businesses: Business[] = [
  { id: 1, name: "Sharma Electronics", businessType: "Retailer", category: "Electronics", subCategory: "Mobile Phones", description: "Leading electronics retailer in Ludhiana offering LED lighting, CCTV and mobile accessories.", establishedYear: "2012", employees: "11-50", country: "India", state: "Punjab", city: "Ludhiana", address: "123 Model Town Road", postalCode: "141002", lat: 30.901, lng: 75.8573, phone: "+91 98765 43210", whatsapp: "+91 98765 43210", email: "contact@sharmaelectronics.in", website: "https://sharmaelectronics.in", logoUrl: "", coverUrl: "", galleryUrls: [], videoUrl: "", status: "Verified", leads: 42, joined: "2026-01-12" },
  { id: 2, name: "Maple Web Studio", businessType: "Service Provider", category: "IT Services", subCategory: "Web Development", description: "Web design and development studio serving small businesses across Ontario.", establishedYear: "2018", employees: "1-10", country: "Canada", state: "Ontario", city: "Toronto", address: "45 King Street West", postalCode: "M5H 1J8", lat: 43.6511, lng: -79.3832, phone: "+1 416 555 0134", whatsapp: "+1 416 555 0134", email: "hello@maplewebstudio.ca", website: "https://maplewebstudio.ca", logoUrl: "", coverUrl: "", galleryUrls: [], videoUrl: "", status: "Verified", leads: 18, joined: "2026-02-03" },
  { id: 3, name: "Delhi Packaging Co.", businessType: "Manufacturer", category: "Manufacturing", subCategory: "Packaging Materials", description: "Manufacturer of corrugated boxes and packaging solutions for B2B clients.", establishedYear: "2005", employees: "51-200", country: "India", state: "Delhi", city: "Delhi", address: "Plot 22, Okhla Industrial Area", postalCode: "110020", lat: 28.5355, lng: 77.2725, phone: "+91 98111 22334", whatsapp: "+91 98111 22334", email: "sales@delhipackaging.in", website: "", logoUrl: "", coverUrl: "", galleryUrls: [], videoUrl: "", status: "Pending", leads: 5, joined: "2026-03-21" },
  { id: 4, name: "Brampton Grocers", businessType: "Retailer", category: "Retail", subCategory: "Grocery Store", description: "Indian grocery store offering fresh produce and imported goods.", establishedYear: "2015", employees: "11-50", country: "Canada", state: "Ontario", city: "Brampton", address: "88 Queen Street East", postalCode: "L6V 1B2", lat: 43.6852, lng: -79.7594, phone: "+1 905 555 0198", whatsapp: "+1 905 555 0198", email: "info@bramptongrocers.ca", website: "https://bramptongrocers.ca", logoUrl: "", coverUrl: "", galleryUrls: [], videoUrl: "", status: "Verified", leads: 27, joined: "2026-02-18" },
  { id: 5, name: "Singh Interiors", businessType: "Service Provider", category: "Construction", subCategory: "Interior Design", description: "Interior design and modular furniture for residential and commercial spaces.", establishedYear: "2010", employees: "11-50", country: "India", state: "Chandigarh", city: "Chandigarh", address: "SCO 145, Sector 34", postalCode: "160022", lat: 30.7194, lng: 76.7654, phone: "+91 98140 55667", whatsapp: "+91 98140 55667", email: "studio@singhinteriors.in", website: "", logoUrl: "", coverUrl: "", galleryUrls: [], videoUrl: "", status: "Suspended", leads: 3, joined: "2025-11-30" },
  { id: 6, name: "Toronto Legal Group", businessType: "Professional", category: "Professional Services", subCategory: "Immigration Law", description: "Immigration and business law firm serving newcomers to Canada.", establishedYear: "2009", employees: "11-50", country: "Canada", state: "Ontario", city: "Toronto", address: "200 Bay Street", postalCode: "M5J 2J1", lat: 43.6462, lng: -79.3806, phone: "+1 416 555 0177", whatsapp: "+1 416 555 0177", email: "info@torontolegalgroup.ca", website: "https://torontolegalgroup.ca", logoUrl: "", coverUrl: "", galleryUrls: [], videoUrl: "", status: "Pending", leads: 9, joined: "2026-04-02" },
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

export interface Product {
  id: number;
  name: string;
  business: string;
  category: string;
  price: string;
  status: "Active" | "Pending" | "Rejected";
  createdAt: string;
}

export const products: Product[] = [
  { id: 1, name: "LED Panel Light 24W", business: "Sharma Electronics", category: "Electronics", price: "₹450", status: "Active", createdAt: "2026-05-02" },
  { id: 2, name: "CCTV Camera Kit (4ch)", business: "Sharma Electronics", category: "Electronics", price: "₹8,999", status: "Pending", createdAt: "2026-07-14" },
  { id: 3, name: "Corrugated Shipping Box", business: "Delhi Packaging Co.", category: "Manufacturing", price: "₹18/pc", status: "Active", createdAt: "2026-04-20" },
  { id: 4, name: "Organic Basmati Rice 5kg", business: "Brampton Grocers", category: "Retail", price: "CAD 22.99", status: "Active", createdAt: "2026-06-11" },
  { id: 5, name: "Modular Kitchen Cabinet", business: "Singh Interiors", category: "Construction", price: "On Request", status: "Rejected", createdAt: "2026-03-08" },
];

export interface Service {
  id: number;
  name: string;
  business: string;
  category: string;
  priceFrom: string;
  status: "Active" | "Pending" | "Rejected";
  createdAt: string;
}

export const services: Service[] = [
  { id: 1, name: "Website Design & Development", business: "Maple Web Studio", category: "IT Services", priceFrom: "CAD 1,200", status: "Active", createdAt: "2026-02-10" },
  { id: 2, name: "Home Interior Consultation", business: "Singh Interiors", category: "Construction", priceFrom: "₹2,000", status: "Active", createdAt: "2026-03-15" },
  { id: 3, name: "Immigration Document Filing", business: "Toronto Legal Group", category: "Professional Services", priceFrom: "CAD 350", status: "Pending", createdAt: "2026-07-01" },
  { id: 4, name: "Packaging Design Consultation", business: "Delhi Packaging Co.", category: "Manufacturing", priceFrom: "₹5,000", status: "Active", createdAt: "2026-05-19" },
];

export interface Lead {
  id: number;
  business: string;
  customer: string;
  interest: string;
  status: "New" | "Contacted" | "In Discussion" | "Quotation Sent" | "Won" | "Lost";
  createdAt: string;
}

export const leads: Lead[] = [
  { id: 1, business: "Sharma Electronics", customer: "Rahul Verma", interest: "CCTV Camera Kit (4ch)", status: "New", createdAt: "2026-08-15" },
  { id: 2, business: "Maple Web Studio", customer: "Emily Johnson", interest: "Website Design & Development", status: "In Discussion", createdAt: "2026-08-10" },
  { id: 3, business: "Brampton Grocers", customer: "Michael Lee", interest: "Organic Basmati Rice 5kg", status: "Won", createdAt: "2026-07-28" },
  { id: 4, business: "Toronto Legal Group", customer: "Priya Kaur", interest: "Immigration Document Filing", status: "Quotation Sent", createdAt: "2026-08-02" },
  { id: 5, business: "Delhi Packaging Co.", customer: "Amit Sharma", interest: "Corrugated Shipping Box", status: "Lost", createdAt: "2026-06-30" },
  { id: 6, business: "Singh Interiors", customer: "Neha Gupta", interest: "Modular Kitchen Cabinet", status: "Contacted", createdAt: "2026-08-17" },
];

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

export const rfqs: Rfq[] = [
  { id: 1, product: "Corrugated Shipping Box", customer: "Rahul Verma", quantity: "10,000 pcs", budget: "₹1,80,000", quotes: 3, status: "Open", createdAt: "2026-08-12" },
  { id: 2, product: "LED Panel Light 24W", customer: "Amit Sharma", quantity: "500 units", budget: "₹2,00,000", quotes: 1, status: "Quoted", createdAt: "2026-08-05" },
  { id: 3, product: "Website Design & Development", customer: "Emily Johnson", quantity: "1 project", budget: "CAD 1,500", quotes: 2, status: "Closed", createdAt: "2026-07-20" },
  { id: 4, product: "Organic Basmati Rice 5kg", customer: "Michael Lee", quantity: "200 kg", budget: "CAD 900", quotes: 0, status: "Open", createdAt: "2026-08-16" },
];

export interface GrowthPoint {
  month: string;
  users: number;
  businesses: number;
}

export const growthData: GrowthPoint[] = [
  { month: "Mar", users: 120, businesses: 18 },
  { month: "Apr", users: 180, businesses: 26 },
  { month: "May", users: 240, businesses: 34 },
  { month: "Jun", users: 310, businesses: 45 },
  { month: "Jul", users: 410, businesses: 58 },
  { month: "Aug", users: 520, businesses: 72 },
];

export interface Review {
  id: number;
  business: string;
  customer: string;
  rating: number;
  comment: string;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: string;
}

export const reviews: Review[] = [
  { id: 1, business: "Sharma Electronics", customer: "Rahul Verma", rating: 5, comment: "Great service and fast delivery.", status: "Approved", createdAt: "2026-07-01" },
  { id: 2, business: "Maple Web Studio", customer: "Emily Johnson", rating: 4, comment: "Good work, minor delays.", status: "Approved", createdAt: "2026-06-18" },
  { id: 3, business: "Toronto Legal Group", customer: "Priya Kaur", rating: 2, comment: "Slow response times.", status: "Pending", createdAt: "2026-08-14" },
  { id: 4, business: "Delhi Packaging Co.", customer: "Amit Sharma", rating: 1, comment: "This looks like a fake/spam review.", status: "Pending", createdAt: "2026-08-17" },
  { id: 5, business: "Brampton Grocers", customer: "Michael Lee", rating: 5, comment: "Best grocery store in the area!", status: "Approved", createdAt: "2026-05-25" },
];

export interface SubscriptionPlan {
  id: number;
  name: string;
  price: string;
  billingCycle: "Monthly" | "Yearly";
  subscribers: number;
  status: "Active" | "Inactive";
}

export const subscriptionPlans: SubscriptionPlan[] = [
  { id: 1, name: "Free", price: "₹0 / CAD 0", billingCycle: "Monthly", subscribers: 210, status: "Active" },
  { id: 2, name: "Basic", price: "₹999 / CAD 19", billingCycle: "Monthly", subscribers: 84, status: "Active" },
  { id: 3, name: "Premium", price: "₹2,499 / CAD 49", billingCycle: "Monthly", subscribers: 37, status: "Active" },
  { id: 4, name: "Premium Annual", price: "₹24,999 / CAD 490", billingCycle: "Yearly", subscribers: 12, status: "Active" },
];

export interface Transaction {
  id: number;
  business: string;
  plan: string;
  amount: string;
  gateway: "Razorpay" | "Stripe";
  status: "Success" | "Pending" | "Failed";
  date: string;
}

export const transactions: Transaction[] = [
  { id: 1, business: "Sharma Electronics", plan: "Basic", amount: "₹999", gateway: "Razorpay", status: "Success", date: "2026-08-01" },
  { id: 2, business: "Maple Web Studio", plan: "Premium", amount: "CAD 49", gateway: "Stripe", status: "Success", date: "2026-08-03" },
  { id: 3, business: "Toronto Legal Group", plan: "Basic", amount: "CAD 19", gateway: "Stripe", status: "Pending", date: "2026-08-15" },
  { id: 4, business: "Delhi Packaging Co.", plan: "Premium", amount: "₹2,499", gateway: "Razorpay", status: "Failed", date: "2026-08-10" },
  { id: 5, business: "Brampton Grocers", plan: "Basic", amount: "CAD 19", gateway: "Stripe", status: "Success", date: "2026-07-29" },
];

export interface Advertisement {
  id: number;
  business: string;
  placement: "Homepage Banner" | "Search Results" | "Category Page" | "Featured Listing";
  startDate: string;
  endDate: string;
  clicks: number;
  status: "Active" | "Scheduled" | "Expired";
}

export const advertisements: Advertisement[] = [
  { id: 1, business: "Sharma Electronics", placement: "Homepage Banner", startDate: "2026-08-01", endDate: "2026-08-31", clicks: 1240, status: "Active" },
  { id: 2, business: "Maple Web Studio", placement: "Featured Listing", startDate: "2026-07-15", endDate: "2026-08-15", clicks: 860, status: "Active" },
  { id: 3, business: "Brampton Grocers", placement: "Search Results", startDate: "2026-09-01", endDate: "2026-09-30", clicks: 0, status: "Scheduled" },
  { id: 4, business: "Toronto Legal Group", placement: "Category Page", startDate: "2026-06-01", endDate: "2026-06-30", clicks: 430, status: "Expired" },
];

export interface CmsPage {
  id: number;
  title: string;
  slug: string;
  status: "Published" | "Draft";
  updatedAt: string;
}

export const cmsPages: CmsPage[] = [
  { id: 1, title: "Home", slug: "/", status: "Published", updatedAt: "2026-08-10" },
  { id: 2, title: "About Us", slug: "/about-us", status: "Published", updatedAt: "2026-06-02" },
  { id: 3, title: "Contact Us", slug: "/contact-us", status: "Published", updatedAt: "2026-05-20" },
  { id: 4, title: "FAQ", slug: "/faq", status: "Published", updatedAt: "2026-07-11" },
  { id: 5, title: "Terms & Conditions", slug: "/terms", status: "Published", updatedAt: "2026-01-15" },
  { id: 6, title: "Privacy Policy", slug: "/privacy", status: "Published", updatedAt: "2026-01-15" },
  { id: 7, title: "Cookie Policy", slug: "/cookie-policy", status: "Draft", updatedAt: "2026-08-16" },
  { id: 8, title: "Refund Policy", slug: "/refund-policy", status: "Draft", updatedAt: "2026-08-16" },
  { id: 9, title: "Advertising Policy", slug: "/advertising-policy", status: "Published", updatedAt: "2026-04-09" },
  { id: 10, title: "Business Guidelines", slug: "/business-guidelines", status: "Published", updatedAt: "2026-03-22" },
];

export interface Banner {
  id: number;
  title: string;
  position: "Homepage Top" | "Homepage Middle" | "Category Page";
  status: "Active" | "Inactive";
}

export const banners: Banner[] = [
  { id: 1, title: "Diwali Business Signup Offer", position: "Homepage Top", status: "Active" },
  { id: 2, title: "Canada Expansion Announcement", position: "Homepage Middle", status: "Active" },
  { id: 3, title: "List Your Business Free", position: "Category Page", status: "Inactive" },
];

export interface Faq {
  id: number;
  question: string;
  answer: string;
  status: "Published" | "Draft";
}

export const faqs: Faq[] = [
  { id: 1, question: "How do I list my business?", answer: "Register as a business owner and complete your profile.", status: "Published" },
  { id: 2, question: "Is listing free?", answer: "Yes, the Free plan lets you create a basic listing.", status: "Published" },
  { id: 3, question: "How does business verification work?", answer: "We verify via email, mobile OTP and admin review.", status: "Draft" },
];

export interface BlogPost {
  id: number;
  title: string;
  author: string;
  status: "Published" | "Draft";
  publishedAt: string;
}

export const blogPosts: BlogPost[] = [
  { id: 1, title: "5 Tips to Get More Leads as a Local Business", author: "Neha Gupta", status: "Published", publishedAt: "2026-07-20" },
  { id: 2, title: "Expanding Your Business from India to Canada", author: "Tanvir Kalsi", status: "Published", publishedAt: "2026-06-05" },
  { id: 3, title: "How Verified Badges Build Customer Trust", author: "Neha Gupta", status: "Draft", publishedAt: "2026-08-18" },
];
