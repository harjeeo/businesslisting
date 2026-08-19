import { StarIcon } from "hugeicons-react";
import { testimonials } from "@/data/dummy";

export default function Testimonials() {
  return (
    <section className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-900">What People Say</h2>
          <p className="mt-1 text-sm text-gray-500">Trusted by customers and businesses alike</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="flex gap-0.5 text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    size={14}
                    className={i < t.rating ? "fill-yellow-400" : "text-gray-200"}
                  />
                ))}
              </div>
              <p className="mt-3 text-sm text-gray-600">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-4 text-sm font-medium text-gray-900">{t.name}</p>
              <p className="text-xs text-gray-400">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
