import Link from "next/link";

export default function CtaBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-violet-600 px-8 py-12 text-center sm:flex-row sm:text-left">
        <div>
          <h2 className="text-2xl font-semibold text-white">List your business for free</h2>
          <p className="mt-2 max-w-md text-sm text-violet-100">
            Reach thousands of customers across India and Canada. Create your profile in minutes.
          </p>
        </div>
        <Link
          href="/list-your-business"
          className="shrink-0 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-violet-700 hover:bg-violet-50"
        >
          Get Started Free
        </Link>
      </div>
    </section>
  );
}
