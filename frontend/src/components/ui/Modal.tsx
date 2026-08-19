import type { ReactNode } from "react";
import { Cancel01Icon } from "hugeicons-react";

export default function Modal({
  title,
  subtitle,
  onClose,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative flex max-h-[90vh] w-full max-w-lg flex-col rounded-xl bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h3 className="text-base font-semibold text-gray-900">{title}</h3>
            {subtitle && (
              <p className="mt-0.5 text-sm text-gray-500">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <Cancel01Icon size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>

        <div className="flex justify-end gap-3 border-t border-gray-100 px-6 py-4">
          {footer}
        </div>
      </div>
    </div>
  );
}
