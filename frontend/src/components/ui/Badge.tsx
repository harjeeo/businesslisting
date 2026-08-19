type BadgeTone = "green" | "yellow" | "red" | "gray" | "violet";

const toneClasses: Record<BadgeTone, string> = {
  green: "bg-green-50 text-green-700",
  yellow: "bg-yellow-50 text-yellow-700",
  red: "bg-red-50 text-red-700",
  gray: "bg-gray-100 text-gray-600",
  violet: "bg-violet-50 text-violet-700",
};

export default function Badge({
  label,
  tone = "gray",
}: {
  label: string;
  tone?: BadgeTone;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${toneClasses[tone]}`}
    >
      {label}
    </span>
  );
}
