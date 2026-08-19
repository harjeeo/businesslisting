import { useNavigate } from "react-router-dom";
import PageHeader from "../components/ui/PageHeader";
import Table, { type Column } from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import ActionButton from "../components/ui/ActionButton";
import { useAdminData } from "../context/AdminDataContext";
import type { AdminUser } from "../data/dummy";

const roleTone: Record<AdminUser["role"], "violet" | "gray"> = {
  "Super Admin": "violet",
  Admin: "gray",
  Moderator: "gray",
};

export default function AdminUsers() {
  const navigate = useNavigate();
  const { adminUsers, deleteAdminUser } = useAdminData();

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
      render: (row) => (
        <div className="flex gap-2">
          <ActionButton label="View" onClick={() => navigate(`/admin-users/${row.id}`)} />
          <ActionButton
            label="Edit"
            onClick={() => navigate(`/admin-users/${row.id}/edit`)}
          />
          <ActionButton
            label="Remove"
            tone="danger"
            onClick={() => deleteAdminUser(row.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Admin Users"
        subtitle="Manage admin accounts and their permissions"
        addLabel="Invite Admin"
        onAdd={() => navigate("/admin-users/new")}
      />
      <Table columns={columns} rows={adminUsers} />
    </div>
  );
}
