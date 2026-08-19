import type { ReactNode } from "react";

export interface Column<T> {
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
}

export default function Table<T extends { id: string | number }>({
  columns,
  rows,
}: {
  columns: Column<T>[];
  rows: T[];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {columns.map((col) => (
                <th
                  key={col.header}
                  className="whitespace-nowrap px-5 py-3 font-medium text-gray-500"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
              >
                {columns.map((col) => (
                  <td
                    key={col.header}
                    className={`whitespace-nowrap px-5 py-3.5 text-gray-700 ${col.className ?? ""}`}
                  >
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rows.length === 0 && (
        <div className="py-10 text-center text-sm text-gray-400">
          No records found
        </div>
      )}

      <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3 text-sm text-gray-500">
        <span>
          Showing {rows.length} of {rows.length} results
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-md border border-gray-200 px-3 py-1.5 text-gray-500 hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            type="button"
            className="rounded-md border border-gray-200 px-3 py-1.5 text-gray-500 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
