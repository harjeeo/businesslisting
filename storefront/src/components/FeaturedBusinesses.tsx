import Link from "next/link";
import { StarIcon, CheckmarkBadge01Icon } from "hugeicons-react";
import { featuredBusinesses } from "@/data/dummy";

export default function FeaturedBusinesses() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Featured Businesses</h2>
          <p className="mt-1 text-sm text-gray-500">Verified businesses trusted by customers</p>
        </div>
        <Link href="/businesses" className="text-sm font-medium text-violet-600 hover:underline">
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featuredBusinesses.map((biz) => (
          <Link
            key={biz.name}
            href={`/business/${biz.name.toLowerCase().replace(/\s+/g, "-")}`}
            className="rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-2xl">
                {biz.logo}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="truncate font-medium text-gray-900">{biz.name}</p>
                  {biz.verified && (
                    <CheckmarkBadge01Icon size={16} className="shrink-0 text-violet-600" />
                  )}
                </div>
                <p className="text-xs text-gray-400">
                  {biz.category} · {biz.city}, {biz.country}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1 text-sm text-gray-700">
                <StarIcon size={15} className="fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{biz.rating}</span>
                <span className="text-gray-400">({biz.reviews})</span>
              </div>
              <span className="text-xs font-medium text-violet-600">Get Quote →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
