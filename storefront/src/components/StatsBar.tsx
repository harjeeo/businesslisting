const stats = [
  { label: "Businesses Listed", value: "10,000+" },
  { label: "Cities Covered", value: "50+" },
  { label: "Verified Businesses", value: "6,200+" },
  { label: "Countries", value: "India & Canada" },
];

export default function StatsBar() {
  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:grid-cols-4 sm:px-6 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-xl font-semibold text-gray-900 sm:text-2xl">{stat.value}</p>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
