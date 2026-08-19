import Link from "next/link";
import { categories } from "@/data/dummy";

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Browse by Category</h2>
          <p className="mt-1 text-sm text-gray-500">Find businesses across popular categories</p>
        </div>
        <Link href="/categories" className="text-sm font-medium text-violet-600 hover:underline">
          View all
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            className="flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-5 text-center transition-colors hover:border-violet-300 hover:bg-violet-50"
          >
            <span className="text-3xl">{cat.icon}</span>
            <span className="text-sm font-medium text-gray-900">{cat.name}</span>
            <span className="text-xs text-gray-400">{cat.count.toLocaleString()} listings</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
