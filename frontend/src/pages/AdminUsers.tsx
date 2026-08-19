import PageHeader from "../components/ui/PageHeader";
import Table, { type Column } from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import { adminUsers, type AdminUser } from "../data/dummy";

const roleTone: Record<AdminUser["role"], "violet" | "gray"> = {
  "Super Admin": "violet",
  Admin: "gray",
  Moderator: "gray",
};

const columns: Column<AdminUser>[] = [
  {
    header: "Admin",
    render: (row) => (
      <div>
        <p className="font-medium text-gray-900">{row.name}</p>
        <p className="text-xs text-gray-400">{row.email}</p>
      </div>
    ),
  },
  {
    header: "Role",
    render: (row) => <Badge label={row.role} tone={roleTone[row.role]} />,
  },
  { header: "Last Active", render: (row) => row.lastActive },
  {
    header: "Status",
    render: (row) => (
      <Badge label={row.status} tone={row.status === "Active" ? "green" : "gray"} />
    ),
  },
  {
    header: "Actions",
    render: () => (
      <div className="flex gap-3 text-sm font-medium text-violet-600">
        <button type="button" className="hover:underline">
          Edit
        </button>
        <button type="button" className="hover:underline">
          Remove
        </button>
      </div>
    ),
  },
];

export default function AdminUsers() {
  return (
    <div>
      <PageHeader
        title="Admin Users"
        subtitle="Manage admin accounts and their permissions"
        addLabel="Invite Admin"
      />
      <Table columns={columns} rows={adminUsers} />
    </div>
  );
}
