import PageHeader from "../components/ui/PageHeader";
import Table, { type Column } from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import ActionButton from "../components/ui/ActionButton";
import { users, type User } from "../data/dummy";

const columns: Column<User>[] = [
  {
    header: "User",
    render: (row) => (
      <div>
        <p className="font-medium text-gray-900">{row.name}</p>
        <p className="text-xs text-gray-400">{row.email}</p>
      </div>
    ),
  },
  {
    header: "Role",
    render: (row) => <Badge label={row.role} tone="violet" />,
  },
  { header: "Country", render: (row) => row.country },
  { header: "Joined", render: (row) => row.joined },
  {
    header: "Status",
    render: (row) => (
      <Badge label={row.status} tone={row.status === "Active" ? "green" : "red"} />
    ),
  },
  {
    header: "Actions",
    render: () => (
      <div className="flex gap-2">
        <ActionButton label="View" />
        <ActionButton label="Block" tone="danger" />
      </div>
    ),
  },
];

export default function Users() {
  return (
    <div>
      <PageHeader
        title="Users"
        subtitle="All customers and business owners on the platform"
        onSearch
      />
      <Table columns={columns} rows={users} />
    </div>
  );
}
