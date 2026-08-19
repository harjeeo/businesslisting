import Link from "next/link";
import { Location01Icon } from "hugeicons-react";
import { cities } from "@/data/dummy";

export default function CityGrid() {
  return (
    <section className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Popular Locations</h2>
            <p className="mt-1 text-sm text-gray-500">Explore businesses across India and Canada</p>
          </div>
          <Link href="/locations" className="text-sm font-medium text-violet-600 hover:underline">
            View all
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {cities.map((city) => (
            <Link
              key={city.name}
              href={`/locations/${city.name.toLowerCase()}`}
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:border-violet-300"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                <Location01Icon size={18} />
              </span>
              <div>
                <p className="text-sm font-medium text-gray-900">{city.name}</p>
                <p className="text-xs text-gray-400">
                  {city.country} · {city.count.toLocaleString()} businesses
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
