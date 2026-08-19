import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft01Icon } from "hugeicons-react";

export default function FormPageLayout({
  title,
  subtitle,
  children,
  onSubmit,
  submitLabel,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onSubmit: () => void;
  submitLabel: string;
}) {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-2xl">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft01Icon size={18} />
        Back
      </button>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="space-y-4">{children}</div>

        <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-5">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
