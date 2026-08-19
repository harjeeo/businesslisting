import { useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import Table, { type Column } from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import ActionButton from "../components/ui/ActionButton";
import LocationFormModal from "../components/forms/LocationFormModal";
import { locations as initialLocations, type LocationRow } from "../data/dummy";

export default function Locations() {
  const [locations, setLocations] = useState(initialLocations);
  const [editing, setEditing] = useState<LocationRow | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const columns: Column<LocationRow>[] = [
    { header: "Country", render: (row) => row.country },
    { header: "State/Province", render: (row) => row.state },
    { header: "City", render: (row) => <span className="font-medium text-gray-900">{row.city}</span> },
    { header: "Businesses", render: (row) => row.businesses },
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
            label="Delete"
            tone="danger"
            onClick={() =>
              setLocations((prev) => prev.filter((l) => l.id !== row.id))
            }
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Locations"
        subtitle="Countries, states/provinces, cities and areas"
        addLabel="Add Location"
        onAdd={() => setShowAdd(true)}
        onSearch
      />
      <Table columns={columns} rows={locations} />

      {showAdd && (
        <LocationFormModal
          onClose={() => setShowAdd(false)}
          onSave={(data) => {
            setLocations((prev) => [
              ...prev,
              {
                ...data,
                id: Math.max(0, ...prev.map((l) => l.id)) + 1,
                businesses: 0,
              },
            ]);
            setShowAdd(false);
          }}
        />
      )}

      {editing && (
        <LocationFormModal
          location={editing}
          onClose={() => setEditing(null)}
          onSave={(data) => {
            setLocations((prev) =>
              prev.map((l) => (l.id === editing.id ? { ...l, ...data } : l))
            );
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}
