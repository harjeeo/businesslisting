import { useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import Table, { type Column } from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import ActionButton from "../components/ui/ActionButton";
import BusinessFormModal from "../components/forms/BusinessFormModal";
import { businesses as initialBusinesses, type Business } from "../data/dummy";

const statusTone: Record<Business["status"], "green" | "yellow" | "red"> = {
  Verified: "green",
  Pending: "yellow",
  Suspended: "red",
};

export default function Businesses() {
  const [businesses, setBusinesses] = useState(initialBusinesses);
  const [editing, setEditing] = useState<Business | null>(null);
  const [showAdd, setShowAdd] = useState(false);

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
      render: (row) => (
        <div className="flex gap-2">
          <ActionButton label="View" />
          <ActionButton label="Edit" onClick={() => setEditing(row)} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Businesses"
        subtitle="Manage all registered businesses across India and Canada"
        addLabel="Add Business"
        onAdd={() => setShowAdd(true)}
        onSearch
      />
      <Table columns={columns} rows={businesses} />

      {showAdd && (
        <BusinessFormModal
          onClose={() => setShowAdd(false)}
          onSave={(data) => {
            setBusinesses((prev) => [
              ...prev,
              {
                ...data,
                id: Math.max(0, ...prev.map((b) => b.id)) + 1,
                leads: 0,
                joined: new Date().toISOString().slice(0, 10),
              },
            ]);
            setShowAdd(false);
          }}
        />
      )}

      {editing && (
        <BusinessFormModal
          business={editing}
          onClose={() => setEditing(null)}
          onSave={(data) => {
            setBusinesses((prev) =>
              prev.map((b) => (b.id === editing.id ? { ...b, ...data } : b))
            );
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}
