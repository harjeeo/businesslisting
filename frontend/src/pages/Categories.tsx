import { useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import Table, { type Column } from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import ActionButton from "../components/ui/ActionButton";
import CategoryFormModal from "../components/forms/CategoryFormModal";
import { categories as initialCategories, type Category } from "../data/dummy";

export default function Categories() {
  const [categories, setCategories] = useState(initialCategories);
  const [editing, setEditing] = useState<Category | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const parentOptions = categories
    .filter((c) => c.parent === null)
    .map((c) => c.name);

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
          <ActionButton label="Edit" onClick={() => setEditing(row)} />
          <ActionButton
            label="Delete"
            tone="danger"
            onClick={() =>
              setCategories((prev) => prev.filter((c) => c.id !== row.id))
            }
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
        onAdd={() => setShowAdd(true)}
        onSearch
      />
      <Table columns={columns} rows={categories} />

      {showAdd && (
        <CategoryFormModal
          parentOptions={parentOptions}
          onClose={() => setShowAdd(false)}
          onSave={(data) => {
            setCategories((prev) => [
              ...prev,
              {
                ...data,
                id: Math.max(0, ...prev.map((c) => c.id)) + 1,
                businesses: 0,
              },
            ]);
            setShowAdd(false);
          }}
        />
      )}

      {editing && (
        <CategoryFormModal
          category={editing}
          parentOptions={parentOptions.filter((p) => p !== editing.name)}
          onClose={() => setEditing(null)}
          onSave={(data) => {
            setCategories((prev) =>
              prev.map((c) => (c.id === editing.id ? { ...c, ...data } : c))
            );
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}
