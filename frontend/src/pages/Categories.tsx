import { useNavigate } from "react-router-dom";
import PageHeader from "../components/ui/PageHeader";
import Table, { type Column } from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import ActionButton from "../components/ui/ActionButton";
import { useAdminData } from "../context/AdminDataContext";
import type { Category } from "../data/dummy";

export default function Categories() {
  const navigate = useNavigate();
  const { categories, deleteCategory } = useAdminData();

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
      render: (row) => (
        <div className="flex gap-2">
          <ActionButton
            label="Edit"
            onClick={() => navigate(`/categories/${row.id}/edit`)}
          />
          <ActionButton
            label="Delete"
            tone="danger"
            onClick={() => deleteCategory(row.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Categories"
        subtitle="Manage categories, sub-categories and child categories"
        addLabel="Add Category"
        onAdd={() => navigate("/categories/new")}
        onSearch
      />
      <Table columns={columns} rows={categories} />
    </div>
  );
}
