export default function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white">
      <p className="text-gray-500">{title} — coming soon</p>
    </div>
  );
}
