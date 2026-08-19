import Link from "next/link";
import { Store01Icon } from "hugeicons-react";

const navLinks = [
  { label: "Categories", href: "/categories" },
  { label: "Locations", href: "/locations" },
  { label: "RFQ", href: "/rfq" },
  { label: "Pricing", href: "/pricing" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600 text-white">
            <Store01Icon size={20} />
          </span>
          <span className="text-lg font-semibold text-gray-900">BizListing</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-violet-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden text-sm font-medium text-gray-600 hover:text-violet-600 sm:block"
          >
            Login
          </Link>
          <Link
            href="/list-your-business"
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
          >
            List Your Business
          </Link>
        </div>
      </div>
    </header>
  );
}
