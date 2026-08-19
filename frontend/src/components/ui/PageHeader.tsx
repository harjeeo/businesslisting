import type { ReactNode } from "react";
import { Add01Icon, Search01Icon } from "hugeicons-react";

export default function PageHeader({
  title,
  subtitle,
  addLabel,
  onAdd,
  onSearch,
  extra,
}: {
  title: string;
  subtitle?: string;
  addLabel?: string;
  onAdd?: () => void;
  onSearch?: boolean;
  extra?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {onSearch && (
          <div className="relative">
            <Search01Icon
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-56 rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
            />
          </div>
        )}
        {extra}
        {addLabel && (
          <button
            type="button"
            onClick={onAdd}
            className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-700"
          >
            <Add01Icon size={18} />
            {addLabel}
          </button>
        )}
      </div>
    </div>
  );
}
