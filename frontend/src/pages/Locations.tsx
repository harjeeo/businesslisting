import PageHeader from "../components/ui/PageHeader";
import Table, { type Column } from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import { locations, type LocationRow } from "../data/dummy";

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
    render: () => (
      <div className="flex gap-3 text-sm font-medium text-violet-600">
        <button type="button" className="hover:underline">
          Edit
        </button>
        <button type="button" className="hover:underline">
          Delete
        </button>
      </div>
    ),
  },
];

export default function Locations() {
  return (
    <div>
      <PageHeader
        title="Locations"
        subtitle="Countries, states/provinces, cities and areas"
        addLabel="Add Location"
        onSearch
      />
      <Table columns={columns} rows={locations} />
    </div>
  );
}
