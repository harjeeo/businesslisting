"use client";

import { useState } from "react";
import { Search01Icon, Location01Icon } from "hugeicons-react";

const popularSearches = [
  "Web Development",
  "Packaging Manufacturers",
  "Electronics Store",
  "Immigration Services",
  "Interior Designers",
];

export default function Hero() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  return (
    <section className="border-b border-gray-200 bg-gradient-to-b from-violet-50 to-white">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700">
          Now live in India &amp; Canada
        </span>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          Find trusted businesses, products &amp; services
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-gray-500 sm:text-lg">
          Search verified manufacturers, suppliers, retailers and professionals
          near you &mdash; and get quotes in minutes.
        </p>

        <form className="mx-auto mt-8 flex max-w-2xl flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-lg shadow-violet-100/50 sm:flex-row">
          <div className="flex flex-1 items-center gap-2 px-3 py-2.5">
            <Search01Icon size={20} className="shrink-0 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search businesses, products or services"
              className="w-full bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
            />
          </div>
          <div className="hidden w-px bg-gray-200 sm:block" />
          <div className="flex items-center gap-2 px-3 py-2.5 sm:w-56">
            <Location01Icon size={20} className="shrink-0 text-gray-400" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City or location"
              className="w-full bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="rounded-xl bg-violet-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-violet-700"
          >
            Search
          </button>
        </form>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500">
          <span>Popular:</span>
          {popularSearches.map((term) => (
            <button
              key={term}
              type="button"
              className="rounded-full border border-gray-200 px-3 py-1 hover:border-violet-300 hover:text-violet-600"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
