import PageHeader from "../components/ui/PageHeader";
import Table, { type Column } from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import { useAdminData } from "../context/AdminDataContext";
import type { Lead } from "../data/dummy";

const statusTone: Record<Lead["status"], "gray" | "violet" | "yellow" | "green" | "red"> = {
  New: "gray",
  Contacted: "violet",
  "In Discussion": "violet",
  "Quotation Sent": "yellow",
  Won: "green",
  Lost: "red",
};

const statusOptions: Lead["status"][] = [
  "New",
  "Contacted",
  "In Discussion",
  "Quotation Sent",
  "Won",
  "Lost",
];

export default function Leads() {
  const { leads, setLeadStatus } = useAdminData();

  const columns: Column<Lead>[] = [
    {
      header: "Customer",
      render: (row) => (
        <div>
          <p className="font-medium text-gray-900">{row.customer}</p>
          <p className="text-xs text-gray-400">{row.interest}</p>
        </div>
      ),
    },
    { header: "Business", render: (row) => row.business },
    { header: "Received", render: (row) => row.createdAt },
    {
      header: "Status",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Badge label={row.status} tone={statusTone[row.status]} />
          <select
            value={row.status}
            onChange={(e) => setLeadStatus(row.id, e.target.value as Lead["status"])}
            className="rounded-md border border-gray-200 px-2 py-1 text-xs text-gray-600 focus:border-violet-400 focus:outline-none"
          >
            {statusOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Leads"
        subtitle="Enquiries submitted by customers to businesses"
        onSearch
      />
      <Table columns={columns} rows={leads} />
    </div>
  );
}
