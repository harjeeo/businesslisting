import PageHeader from "../components/ui/PageHeader";
import Table, { type Column } from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import ActionButton from "../components/ui/ActionButton";
import { businesses, type Business } from "../data/dummy";

const statusTone: Record<Business["status"], "green" | "yellow" | "red"> = {
  Verified: "green",
  Pending: "yellow",
  Suspended: "red",
};

const columns: Column<Business>[] = [
  {
    header: "Business",
    render: (row) => (
      <div>
        <p className="font-medium text-gray-900">{row.name}</p>
        <p className="text-xs text-gray-400">{row.category}</p>
      </div>
    ),
  },
  { header: "Location", render: (row) => `${row.city}, ${row.country}` },
  { header: "Leads", render: (row) => row.leads },
  { header: "Joined", render: (row) => row.joined },
  {
    header: "Status",
    render: (row) => <Badge label={row.status} tone={statusTone[row.status]} />,
  },
  {
    header: "Actions",
    render: () => (
      <div className="flex gap-2">
        <ActionButton label="View" />
        <ActionButton label="Edit" />
      </div>
    ),
  },
];

export default function Businesses() {
  return (
    <div>
      <PageHeader
        title="Businesses"
        subtitle="Manage all registered businesses across India and Canada"
        addLabel="Add Business"
        onSearch
      />
      <Table columns={columns} rows={businesses} />
    </div>
  );
}
