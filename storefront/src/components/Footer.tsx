import Link from "next/link";
import { Store01Icon } from "hugeicons-react";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Contact Us", href: "/contact-us" },
      { label: "Blog", href: "/blog" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "For Businesses",
    links: [
      { label: "List Your Business", href: "/list-your-business" },
      { label: "Advertise With Us", href: "/advertising" },
      { label: "Business Guidelines", href: "/business-guidelines" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Categories", href: "/categories" },
      { label: "Locations", href: "/locations" },
      { label: "Featured Businesses", href: "/businesses" },
      { label: "Submit RFQ", href: "/rfq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "Refund Policy", href: "/refund-policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600 text-white">
                <Store01Icon size={20} />
              </span>
              <span className="text-lg font-semibold text-gray-900">BizListing</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-gray-500">
              Discover and connect with verified businesses across India and Canada.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-gray-900">{col.title}</h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-violet-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-gray-100 pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} BizListing. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
