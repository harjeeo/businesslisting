import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.adminUser.count();
  if (existing > 0) {
    console.log("Database already seeded, skipping.");
    return;
  }

  await prisma.business.createMany({
    data: [
      {
        slug: "sharma-electronics",
        name: "Sharma Electronics",
        businessType: "Retailer",
        category: "Electronics",
        subCategory: "Mobile Phones",
        description: "Leading electronics retailer in Ludhiana offering LED lighting, CCTV systems and mobile accessories.",
        establishedYear: "2012",
        employees: "11-50",
        country: "India",
        state: "Punjab",
        city: "Ludhiana",
        address: "123 Model Town Road",
        postalCode: "141002",
        lat: 30.901,
        lng: 75.8573,
        phone: "+91 98765 43210",
        whatsapp: "+91 98765 43210",
        email: "contact@sharmaelectronics.in",
        website: "https://sharmaelectronics.in",
        status: "Verified",
        leads: 42,
        joined: new Date("2026-01-12"),
      },
      {
        slug: "maple-web-studio",
        name: "Maple Web Studio",
        businessType: "Service Provider",
        category: "IT Services",
        subCategory: "Web Development",
        description: "Web design and development studio serving small businesses across Ontario.",
        establishedYear: "2018",
        employees: "1-10",
        country: "Canada",
        state: "Ontario",
        city: "Toronto",
        address: "45 King Street West",
        postalCode: "M5H 1J8",
        lat: 43.6511,
        lng: -79.3832,
        phone: "+1 416 555 0134",
        whatsapp: "+1 416 555 0134",
        email: "hello@maplewebstudio.ca",
        website: "https://maplewebstudio.ca",
        status: "Verified",
        leads: 18,
        joined: new Date("2026-02-03"),
      },
      {
        slug: "delhi-packaging-co",
        name: "Delhi Packaging Co.",
        businessType: "Manufacturer",
        category: "Manufacturing",
        subCategory: "Packaging Materials",
        description: "Manufacturer of corrugated boxes and packaging solutions for B2B clients.",
        establishedYear: "2005",
        employees: "51-200",
        country: "India",
        state: "Delhi",
        city: "Delhi",
        address: "Plot 22, Okhla Industrial Area",
        postalCode: "110020",
        lat: 28.5355,
        lng: 77.2725,
        phone: "+91 98111 22334",
        whatsapp: "+91 98111 22334",
        email: "sales@delhipackaging.in",
        website: "",
        status: "Pending",
        leads: 5,
        joined: new Date("2026-03-21"),
      },
      {
        slug: "brampton-grocers",
        name: "Brampton Grocers",
        businessType: "Retailer",
        category: "Retail",
        subCategory: "Grocery Store",
        description: "Indian grocery store offering fresh produce and imported goods.",
        establishedYear: "2015",
        employees: "11-50",
        country: "Canada",
        state: "Ontario",
        city: "Brampton",
        address: "88 Queen Street East",
        postalCode: "L6V 1B2",
        lat: 43.6852,
        lng: -79.7594,
        phone: "+1 905 555 0198",
        whatsapp: "+1 905 555 0198",
        email: "info@bramptongrocers.ca",
        website: "https://bramptongrocers.ca",
        status: "Verified",
        leads: 27,
        joined: new Date("2026-02-18"),
      },
      {
        slug: "singh-interiors",
        name: "Singh Interiors",
        businessType: "Service Provider",
        category: "Construction",
        subCategory: "Interior Design",
        description: "Interior design and modular furniture for residential and commercial spaces.",
        establishedYear: "2010",
        employees: "11-50",
        country: "India",
        state: "Chandigarh",
        city: "Chandigarh",
        address: "SCO 145, Sector 34",
        postalCode: "160022",
        lat: 30.7194,
        lng: 76.7654,
        phone: "+91 98140 55667",
        whatsapp: "+91 98140 55667",
        email: "studio@singhinteriors.in",
        website: "",
        status: "Suspended",
        leads: 3,
        joined: new Date("2025-11-30"),
      },
      {
        slug: "toronto-legal-group",
        name: "Toronto Legal Group",
        businessType: "Professional",
        category: "Professional Services",
        subCategory: "Immigration Law",
        description: "Immigration and business law firm serving newcomers to Canada.",
        establishedYear: "2009",
        employees: "11-50",
        country: "Canada",
        state: "Ontario",
        city: "Toronto",
        address: "200 Bay Street",
        postalCode: "M5J 2J1",
        lat: 43.6462,
        lng: -79.3806,
        phone: "+1 416 555 0177",
        whatsapp: "+1 416 555 0177",
        email: "info@torontolegalgroup.ca",
        website: "https://torontolegalgroup.ca",
        status: "Pending",
        leads: 9,
        joined: new Date("2026-04-02"),
      },
    ],
  });

  await prisma.user.createMany({
    data: [
      { name: "Rahul Verma", email: "rahul.verma@example.com", role: "Customer", country: "India", status: "Active", joined: new Date("2026-01-05") },
      { name: "Emily Johnson", email: "emily.j@example.com", role: "BusinessOwner", country: "Canada", status: "Active", joined: new Date("2026-02-14") },
      { name: "Amit Sharma", email: "amit.sharma@example.com", role: "BusinessOwner", country: "India", status: "Active", joined: new Date("2026-01-22") },
      { name: "Priya Kaur", email: "priya.kaur@example.com", role: "Customer", country: "Canada", status: "Blocked", joined: new Date("2026-03-09") },
      { name: "Michael Lee", email: "michael.lee@example.com", role: "Customer", country: "Canada", status: "Active", joined: new Date("2026-02-27") },
    ],
  });

  await prisma.category.createMany({
    data: [
      { name: "Electronics", parent: null, businesses: 128, status: "Active" },
      { name: "Mobile Phones", parent: "Electronics", businesses: 54, status: "Active" },
      { name: "Construction", parent: null, businesses: 76, status: "Active" },
      { name: "Contractors", parent: "Construction", businesses: 31, status: "Active" },
      { name: "Professional Services", parent: null, businesses: 92, status: "Active" },
      { name: "Lawyers", parent: "Professional Services", businesses: 40, status: "Inactive" },
    ],
  });

  await prisma.location.createMany({
    data: [
      { country: "India", state: "Punjab", city: "Ludhiana", businesses: 145, status: "Active" },
      { country: "India", state: "Delhi", city: "New Delhi", businesses: 320, status: "Active" },
      { country: "India", state: "Chandigarh", city: "Chandigarh", businesses: 88, status: "Active" },
      { country: "Canada", state: "Ontario", city: "Toronto", businesses: 210, status: "Active" },
      { country: "Canada", state: "Ontario", city: "Brampton", businesses: 97, status: "Active" },
      { country: "Canada", state: "British Columbia", city: "Vancouver", businesses: 64, status: "Inactive" },
    ],
  });

  const passwordHash = await bcrypt.hash("password123", 10);
  await prisma.adminUser.createMany({
    data: [
      { name: "Tanvir Kalsi", email: "tanvirkalsi93@gmail.com", passwordHash, role: "SuperAdmin", status: "Active", lastActive: new Date("2026-08-19") },
      { name: "Neha Gupta", email: "neha.gupta@example.com", passwordHash, role: "Admin", status: "Active", lastActive: new Date("2026-08-18") },
      { name: "James Miller", email: "james.miller@example.com", passwordHash, role: "Moderator", status: "Inactive", lastActive: new Date("2026-08-01") },
    ],
  });

  await prisma.product.createMany({
    data: [
      { name: "LED Panel Light 24W", business: "Sharma Electronics", category: "Electronics", price: "₹450", status: "Active", createdAt: new Date("2026-05-02") },
      { name: "CCTV Camera Kit (4ch)", business: "Sharma Electronics", category: "Electronics", price: "₹8,999", status: "Pending", createdAt: new Date("2026-07-14") },
      { name: "Corrugated Shipping Box", business: "Delhi Packaging Co.", category: "Manufacturing", price: "₹18/pc", status: "Active", createdAt: new Date("2026-04-20") },
      { name: "Organic Basmati Rice 5kg", business: "Brampton Grocers", category: "Retail", price: "CAD 22.99", status: "Active", createdAt: new Date("2026-06-11") },
      { name: "Modular Kitchen Cabinet", business: "Singh Interiors", category: "Construction", price: "On Request", status: "Rejected", createdAt: new Date("2026-03-08") },
    ],
  });

  await prisma.service.createMany({
    data: [
      { name: "Website Design & Development", business: "Maple Web Studio", category: "IT Services", priceFrom: "CAD 1,200", status: "Active", createdAt: new Date("2026-02-10") },
      { name: "Home Interior Consultation", business: "Singh Interiors", category: "Construction", priceFrom: "₹2,000", status: "Active", createdAt: new Date("2026-03-15") },
      { name: "Immigration Document Filing", business: "Toronto Legal Group", category: "Professional Services", priceFrom: "CAD 350", status: "Pending", createdAt: new Date("2026-07-01") },
      { name: "Packaging Design Consultation", business: "Delhi Packaging Co.", category: "Manufacturing", priceFrom: "₹5,000", status: "Active", createdAt: new Date("2026-05-19") },
    ],
  });

  await prisma.lead.createMany({
    data: [
      { business: "Sharma Electronics", customer: "Rahul Verma", interest: "CCTV Camera Kit (4ch)", status: "New", createdAt: new Date("2026-08-15") },
      { business: "Maple Web Studio", customer: "Emily Johnson", interest: "Website Design & Development", status: "InDiscussion", createdAt: new Date("2026-08-10") },
      { business: "Brampton Grocers", customer: "Michael Lee", interest: "Organic Basmati Rice 5kg", status: "Won", createdAt: new Date("2026-07-28") },
      { business: "Toronto Legal Group", customer: "Priya Kaur", interest: "Immigration Document Filing", status: "QuotationSent", createdAt: new Date("2026-08-02") },
      { business: "Delhi Packaging Co.", customer: "Amit Sharma", interest: "Corrugated Shipping Box", status: "Lost", createdAt: new Date("2026-06-30") },
      { business: "Singh Interiors", customer: "Neha Gupta", interest: "Modular Kitchen Cabinet", status: "Contacted", createdAt: new Date("2026-08-17") },
    ],
  });

  await prisma.rfq.createMany({
    data: [
      { product: "Corrugated Shipping Box", customer: "Rahul Verma", quantity: "10,000 pcs", budget: "₹1,80,000", quotes: 3, status: "Open", createdAt: new Date("2026-08-12") },
      { product: "LED Panel Light 24W", customer: "Amit Sharma", quantity: "500 units", budget: "₹2,00,000", quotes: 1, status: "Quoted", createdAt: new Date("2026-08-05") },
      { product: "Website Design & Development", customer: "Emily Johnson", quantity: "1 project", budget: "CAD 1,500", quotes: 2, status: "Closed", createdAt: new Date("2026-07-20") },
      { product: "Organic Basmati Rice 5kg", customer: "Michael Lee", quantity: "200 kg", budget: "CAD 900", quotes: 0, status: "Open", createdAt: new Date("2026-08-16") },
    ],
  });

  await prisma.review.createMany({
    data: [
      { business: "Sharma Electronics", customer: "Rahul Verma", rating: 5, comment: "Great service and fast delivery.", status: "Approved", createdAt: new Date("2026-07-01") },
      { business: "Maple Web Studio", customer: "Emily Johnson", rating: 4, comment: "Good work, minor delays.", status: "Approved", createdAt: new Date("2026-06-18") },
      { business: "Toronto Legal Group", customer: "Priya Kaur", rating: 2, comment: "Slow response times.", status: "Pending", createdAt: new Date("2026-08-14") },
      { business: "Delhi Packaging Co.", customer: "Amit Sharma", rating: 1, comment: "This looks like a fake/spam review.", status: "Pending", createdAt: new Date("2026-08-17") },
      { business: "Brampton Grocers", customer: "Michael Lee", rating: 5, comment: "Best grocery store in the area!", status: "Approved", createdAt: new Date("2026-05-25") },
    ],
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
