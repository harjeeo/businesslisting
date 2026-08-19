import {
  Building06Icon,
  UserMultipleIcon,
  ChartUpIcon,
  Package01Icon,
} from "hugeicons-react";

const stats = [
  { label: "Total Businesses", value: "0", icon: Building06Icon },
  { label: "Total Users", value: "0", icon: UserMultipleIcon },
  { label: "Total Leads", value: "0", icon: ChartUpIcon },
  { label: "Total Products", value: "0", icon: Package01Icon },
];

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
            <Icon size={22} />
          </span>
          <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
