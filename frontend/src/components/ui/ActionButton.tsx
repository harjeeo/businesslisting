type ActionTone = "default" | "danger";

const toneClasses: Record<ActionTone, string> = {
  default:
    "border-gray-200 text-gray-600 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700",
  danger:
    "border-gray-200 text-gray-600 hover:border-red-300 hover:bg-red-50 hover:text-red-600",
};

export default function ActionButton({
  label,
  tone = "default",
  onClick,
}: {
  label: string;
  tone?: ActionTone;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${toneClasses[tone]}`}
    >
      {label}
    </button>
  );
}
