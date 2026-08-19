import PageHeader from "../components/ui/PageHeader";
import Table, { type Column } from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import ActionButton from "../components/ui/ActionButton";
import { categories, type Category } from "../data/dummy";

const columns: Column<Category>[] = [
  {
    header: "Category",
    render: (row) => (
      <span className={row.parent ? "pl-4 text-gray-600" : "font-medium text-gray-900"}>
        {row.parent ? `— ${row.name}` : row.name}
      </span>
    ),
  },
  { header: "Parent", render: (row) => row.parent ?? "—" },
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
      <div className="flex gap-2">
        <ActionButton label="Edit" />
        <ActionButton label="Delete" tone="danger" />
      </div>
    ),
  },
];

export default function Categories() {
  return (
    <div>
      <PageHeader
        title="Categories"
        subtitle="Manage categories, sub-categories and child categories"
        addLabel="Add Category"
        onSearch
      />
      <Table columns={columns} rows={categories} />
    </div>
  );
}
