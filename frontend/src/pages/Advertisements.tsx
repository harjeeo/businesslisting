import PageHeader from "../components/ui/PageHeader";
import Table, { type Column } from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import ActionButton from "../components/ui/ActionButton";
import { advertisements, type Advertisement } from "../data/dummy";

const statusTone: Record<Advertisement["status"], "green" | "violet" | "gray"> = {
  Active: "green",
  Scheduled: "violet",
  Expired: "gray",
};

const columns: Column<Advertisement>[] = [
  {
    header: "Business",
    render: (row) => <span className="font-medium text-gray-900">{row.business}</span>,
  },
  { header: "Placement", render: (row) => row.placement },
  { header: "Duration", render: (row) => `${row.startDate} → ${row.endDate}` },
  { header: "Clicks", render: (row) => row.clicks },
  {
    header: "Status",
    render: (row) => <Badge label={row.status} tone={statusTone[row.status]} />,
  },
  {
    header: "Actions",
    render: () => (
      <div className="flex gap-2">
        <ActionButton label="Edit" />
        <ActionButton label="Remove" tone="danger" />
      </div>
    ),
  },
];

export default function Advertisements() {
  return (
    <div>
      <PageHeader
        title="Advertisements"
        subtitle="Manage paid placements and featured listings"
        addLabel="Add Advertisement"
        onSearch
      />
      <Table columns={columns} rows={advertisements} />
    </div>
  );
}
