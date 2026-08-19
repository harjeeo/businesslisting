import { useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import Table, { type Column } from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import ActionButton from "../components/ui/ActionButton";
import AdminUserFormModal from "../components/forms/AdminUserFormModal";
import { adminUsers as initialAdminUsers, type AdminUser } from "../data/dummy";

const roleTone: Record<AdminUser["role"], "violet" | "gray"> = {
  "Super Admin": "violet",
  Admin: "gray",
  Moderator: "gray",
};

export default function AdminUsers() {
  const [adminUsers, setAdminUsers] = useState(initialAdminUsers);
  const [editing, setEditing] = useState<AdminUser | null>(null);
  const [showAdd, setShowAdd] = useState(false);

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
          <ActionButton label="Edit" onClick={() => setEditing(row)} />
          <ActionButton
            label="Remove"
            tone="danger"
            onClick={() =>
              setAdminUsers((prev) => prev.filter((a) => a.id !== row.id))
            }
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
        onAdd={() => setShowAdd(true)}
      />
      <Table columns={columns} rows={adminUsers} />

      {showAdd && (
        <AdminUserFormModal
          onClose={() => setShowAdd(false)}
          onSave={(data) => {
            setAdminUsers((prev) => [
              ...prev,
              {
                ...data,
                id: Math.max(0, ...prev.map((a) => a.id)) + 1,
                lastActive: new Date().toISOString().slice(0, 10),
              },
            ]);
            setShowAdd(false);
          }}
        />
      )}

      {editing && (
        <AdminUserFormModal
          admin={editing}
          onClose={() => setEditing(null)}
          onSave={(data) => {
            setAdminUsers((prev) =>
              prev.map((a) => (a.id === editing.id ? { ...a, ...data } : a))
            );
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}
