import { useNavigate } from "react-router-dom";
import PageHeader from "../components/ui/PageHeader";
import Table, { type Column } from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import ActionButton from "../components/ui/ActionButton";
import { useAdminData } from "../context/AdminDataContext";
import type { User } from "../data/dummy";

export default function Users() {
  const navigate = useNavigate();
  const { users, toggleUserBlock } = useAdminData();

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
      render: (row) => (
        <div className="flex gap-2">
          <ActionButton label="View" onClick={() => navigate(`/users/${row.id}`)} />
          <ActionButton
            label={row.status === "Active" ? "Block" : "Unblock"}
            tone="danger"
            onClick={() => toggleUserBlock(row.id)}
          />
        </div>
      ),
    },
  ];

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
