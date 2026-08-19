import { useNavigate } from "react-router-dom";
import PageHeader from "../components/ui/PageHeader";
import Table, { type Column } from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import ActionButton from "../components/ui/ActionButton";
import { useAdminData } from "../context/AdminDataContext";
import type { LocationRow } from "../data/dummy";

export default function Locations() {
  const navigate = useNavigate();
  const { locations, deleteLocation } = useAdminData();

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
          <ActionButton label="View" onClick={() => navigate(`/locations/${row.id}`)} />
          <ActionButton
            label="Edit"
            onClick={() => navigate(`/locations/${row.id}/edit`)}
          />
          <ActionButton
            label="Delete"
            tone="danger"
            onClick={() => deleteLocation(row.id)}
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
        onAdd={() => navigate("/locations/new")}
        onSearch
      />
      <Table columns={columns} rows={locations} />
    </div>
  );
}
